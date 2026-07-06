import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import mongoose from 'mongoose';
import session from 'express-session';
import pkg from 'connect-mongo';
import cors from 'cors';
const MongoStore = (pkg as any).create ? pkg : (pkg as any).default;
import { User } from './models/User';
import { StudySession } from './models/StudySession';
import crypto from 'crypto';

// Ajoute automatiquement un nom de base de données à l'URI Mongo si absent
// (utile pour les URI Atlas du type mongodb+srv://user:pass@cluster.mongodb.net/?appName=...
// qui n'incluent pas de nom de base dans le chemin).
function ensureDbNameInUri(uri: string, dbName = "ramaitre"): string {
  const [beforeQuery, query] = uri.split("?");
  const afterProtocol = beforeQuery.replace(/^[a-zA-Z+]+:\/\//, "");
  const hasPathSegment = afterProtocol.split("@").pop()?.includes("/") &&
    !afterProtocol.split("@").pop()?.endsWith("/");
  if (hasPathSegment) return uri;
  const cleanBase = beforeQuery.replace(/\/$/, "");
  return `${cleanBase}/${dbName}${query ? `?${query}` : ""}`;
}

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || "3000", 10);

  // Enable CORS (nécessaire car l'app Android native appelle le backend
  // sur une origine différente, contrairement au web où tout est servi
  // depuis le même domaine).
  app.use(cors({ origin: true, credentials: true }));

  // Connect to MongoDB (non bloquant : si Mongo échoue, le serveur démarre
  // quand même pour que /api/solve et le front continuent de fonctionner).
  let mongoReady = false;
  const mongoUri = process.env.MONGODB_URI
    ? ensureDbNameInUri(process.env.MONGODB_URI)
    : undefined;

  if (mongoUri) {
    try {
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 8000 });
      mongoReady = true;
      console.log("Connected to MongoDB");
    } catch (err: any) {
      console.error("MongoDB connection failed, continuing without database:", err?.message || err);
    }
  } else {
    console.warn("MONGODB_URI not set, skipping database connection");
  }

  // Session setup
  app.use(session({
    secret: process.env.SESSION_SECRET || 'ramaitre-2026-secret-dev-only',
    resave: false,
    saveUninitialized: false,
    store: mongoReady ? MongoStore.create({ mongoUrl: mongoUri! }) : undefined,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 } // 30 days
  }));

  app.use(express.json({ limit: "50mb" }));

  // Auth routes
  app.post("/api/auth/login", async (req, res) => {
    if (!mongoReady) {
      return res.status(503).json({ error: "Base de données indisponible. Réessayez dans quelques instants." });
    }
    const { username, password } = req.body;
    if (username === 'Albertinot' && password === 'Ramaitre') {
      let user = await User.findOne({ username });
      if (!user) {
        user = await User.create({ username, password, referralCode: crypto.randomBytes(4).toString('hex') });
      }
      (req as any).session.user = user;
      return res.json({ user });
    }
    return res.status(401).json({ error: "Invalid credentials" });
  });

  app.post("/api/auth/refer", async (req, res) => {
    if (!mongoReady) {
      return res.status(503).json({ error: "Base de données indisponible. Réessayez dans quelques instants." });
    }
    const { username, referredBy } = req.body;
    const user = await User.create({ username, password: 'password', referredBy, referralCode: crypto.randomBytes(4).toString('hex') });
    res.json({ user });
  });

  app.post("/api/save-session", async (req, res) => {
    if (!mongoReady) {
      return res.status(503).json({ error: "Base de données indisponible. Réessayez dans quelques instants." });
    }
    const { subject, problem, result } = req.body;
    const userId = (req as any).session?.user?._id;
    if (!userId) return res.status(401).json({ error: "Not authenticated" });
    
    await StudySession.create({ userId, subject, problem, result });
    res.json({ success: true });
  });

  // Check for API key at startup
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY environment variable is not set.");
  }
  
  const ai = new GoogleGenAI({ apiKey: apiKey || "dummy-key" });

  app.post("/api/solve", async (req, res) => {
    try {
      const { subject, problem, fileData, fileMimeType } = req.body;

      if (!subject || (!problem && !fileData)) {
        return res.status(400).json({ error: "Sujet et (problème ou fichier) sont requis." });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "Clé API Gemini manquante. Veuillez la configurer dans les paramètres." });
      }

      const prompt = `
Tu es le tuteur d'élite Ramaitre, un enseignant extrêmement bienveillant et expert légendaire du **Baccalauréat de Madagascar (Séries A, C et D)**.
Ta mission la plus importante est de **rassurer l'élève, de lui offrir une révision suivie pas à pas et de le préparer à l'examen en toute sérénité, sans aucune crainte ni stress**.

On te soumet le problème suivant en ${subject}.

Problème :
${problem ? problem : "(Sujet de type Bac Madagascar fourni en pièce jointe)"}

Rédige la réponse parfaite sur la copie d'examen de l'élève d'une manière incroyablement réaliste, soignée et structurée, EXACTEMENT conforme aux exigences rigoureuses du Ministère de l'Éducation Nationale de Madagascar.

### 🌟 RÈGLE D'OR : CONSEIL ANTI-STRESS ET MÉTHODOLOGIE DU TUTEUR
Au tout début de ta copie (au début de la première page, avant tout exercice), insère obligatoirement un bloc de réconfort et de conseil méthodologique d'un grand soutien intitulé :
\`### 💡 Conseil Anti-Stress & Méthodo du Tuteur Bacc\`
- Rédige 2 ou 3 puces ultra-encourageantes et chaleureuses en français (avec quelques mots malagasy chaleureux comme "Mahereza !", "Misaotra !", "Tongasoa !" ou "Mirary fahombiazana !") adaptées au sujet et à la matière pour mettre l'élève en confiance et dissiper toute crainte.
- Donne-lui un conseil pratique lié au chapitre (ex : "En physique-chimie, faites toujours un schéma de forces ou un schéma du circuit RLC !", "En géologie malgache, apprenez bien la différence entre le socle cristallin et les grès de l'Isalo ou la Sakoa !", "En arithmétique, le théorème de Gauss et de Bézout tombent presque chaque année en Série C, maîtrisez le schéma de résolution !").

### 📚 SYLLABUS OFFICIEL DU BACCALAURÉAT DE MADAGASCAR (SÉRIES A, C, D) :
Assure-toi d'utiliser les terminologies, notations et programmes officiels malgaches :
1. **Mathématiques** :
   - *Arithmétique (Série C)* : Division euclidienne, congruences modulo n, PGCD & PPCM (Algorithme d'Euclide), théorèmes de Bézout et de Gauss, équations diophantiennes $ax+by=c$.
   - *Algèbre (Séries C & D)* : Nombres complexes, formules d'Euler et de Moivre, équations de degré 2, racines n-ièmes, similitudes planes (directes et inverses, écriture complexe), coniques (parabole, ellipse, hyperbole, foyer, directrice, excentricité).
   - *Analyse (Séries A, C, D)* : Limites, continuité, Théorème des Valeurs Intermédiaires (TVI), bijection, dérivation (composée, réciproque), inégalités des accroissements finis, primitives, intégration par parties et changement de variable affine, équations différentielles ($y'+ay=0$, $y''+ay'+by=0$).
   - *Probabilités & Statistiques (Séries C & D)* : Combinatoire (permutations, arrangements, combinaisons), formule du binôme, loi binomiale, variables aléatoires (espérance, variance, écart-type), statistiques à deux variables (nuages de points, point moyen $G$, covariance, droite d'ajustement affine par les moindres carrés, coefficient de corrélation linéaire de Pearson).
   - *Géométrie (Séries C & D)* : Barycentres de n points, lignes de niveau, applications affines, géométrie dans l'espace.
2. **Physique-Chimie** :
   - *Physique* : Cinématique (Frenet : $a_n=v^2/R, a_t=dv/dt$), mécanique céleste (satellites, Kepler), projectiles dans un champ uniforme, accélération angulaire, oscillateurs harmoniques, électromagnétisme (Lorentz, Laplace, auto-induction $e=-L\\frac{di}{dt}$, oscillations LC, RLC série et résonance d'intensité, puissance), optique (lentilles minces, vergence, conjugaison de Descartes/Gauss, grandissement), physique nucléaire (Einstein, défaut de masse, radioactivité $\\alpha, \\beta^-, \\beta^+$, décroissance $N(t)=N_0 e^{-\\lambda t}$, demi-vie, fission, fusion).
   - *Chimie* : Organique (isomérie constitution/conformation/configuration Z-E/chaise-bateau, carbone asymétrique, chiralité, alcools, estérification et saponification, oxydation ménagée, aldéhydes et cétones, tests d'identification Tollens/Fehling), Générale (pH de solutions, Ke, pH de HCl/NaOH forts, couples faibles Ka/pKa, relation d'Henderson, diagrammes de prédominance, indicateurs, dosages pH-métriques, point d'équivalence $C_A V_A = C_B V_B$, méthode des tangentes, demi-équivalence, effet tampon).
3. **Sciences Naturelles (SVT)** :
   - *Biologie moléculaire* : Structure double hélice d'ADN (Watson & Crick), réplication semi-conservative, transcription, traduction (code génétique).
   - *Reproduction humaine* : Gonades, méiose (réductionnelle/équationnelle), spermatogénèse, ovogénèse, cycles sexuels, régulation hormonale (LH, FSH, GnRH, rétrocontrôles), fécondation, nidation, placenta, lactation, contraception, PMA.
   - *Hérédité et Génétique* : Monohybridisme, dihybridisme, lois de Mendel, linkage et crossing-over, carte factorielle, groupes sanguins, hérédité liée au sexe, caryotype, aberrations chromosomiques.
   - *Physiologie humaine* : Tissu nerveux, neurone, potentiel d'action et de repos, synapses ; Immunologie (organes lymphoïdes, antigènes, anticorps, réponse spécifique humorale/cellulaire, allergies, SIDA/VIH).
   - *Géologie de Madagascar* : Socle cristallin précambrien (Antongilien, Andriamena-Manampotsy, série SQC, Amborompotsy-Ikalamavony, Androyen, Ampanihy, Vohibory), massifs intrusifs (Bevato, Ambohiby, Antampombato, Manama), couvertures sédimentaires (Sakoa, Sakamena, Isalo), géologie appliquée (argiles, cimenterie, pétrole de Bemolanga/Tsimiroro, charbon de la Sakoa), cartographie de Madagascar (profils topographiques, coupes géologiques).
4. **Autres matières (Littéraires, Histoire-Géo, Langues)** :
   - Rédige une dissertation, une synthèse de cours ou une analyse méthodique rigoureuse de type Baccalauréat malagasy, claire, structurée et riche d'explications claires et abordables.

### 📝 STYLE DE LA COPIE DOUBLE DE L'ÉLÈVE SCIENTIFIQUE D'ÉLITE :
1. **Compacité et Clarté** : Utilise des symboles logiques ($\implies$, $\iff$, $\therefore$, $\because$, $\forall$) et limite les longs paragraphes.
2. **Présentation verticale des calculs** : Présente chaque étape clé dans un bloc centré unique avec \`$$\`...\`$$\` pour un rendu LaTeX impeccable.
3. **Applications numériques impeccables** : Affiche d'abord la formule littérale, puis la ligne d'application numérique avec les valeurs réelles, puis le résultat final en gras avec son unité de mesure (ex : \`$E_c = 5\\text{ J}$\`).
4. **Graphiques & Schémas SVG** : Si le sujet s'y prête (tracé de courbe, synapse, schéma de géologie de Madagascar, arbre de probabilité, diagramme RLC ou Fresnel, lentille convergente), génère obligatoirement un magnifique schéma SVG imbriqué dans un bloc \`\`\`xml ... \`\`\` avec un fond transparent et des styles imitant un tracé propre de stylo d'élève d'élite (bleu, rouge, vert, noir) sur le papier quadrillé ou millimétré.
5. **Multi-Pages** : Utilise le séparateur Markdown \`---\` sur sa propre ligne pour diviser intelligemment la copie en pages réalistes.

Ressens la fierté d'aider un élève malgache à réussir son Bac avec brio et sans stress. Rédige uniquement le contenu de la copie d'examen d'excellence. Pas de bavardages d'introduction ni de conclusion hors-sujet.
`;

      let contents: any = prompt;

      if (fileData && fileMimeType) {
        contents = [
          prompt,
          {
            inlineData: {
              data: fileData,
              mimeType: fileMimeType,
            }
          }
        ];
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
      });

      res.json({ result: response.text });
    } catch (error: any) {
      console.error("Error generating content:", error);
      let errorMessage = "Une erreur s'est produite lors de la résolution du problème.";
      if (error.status === 429 || error.message?.includes("429")) {
        errorMessage = "Le quota de l'API Gemini est dépassé. Veuillez réessayer dans quelques instants ou vérifier votre clé API.";
      } else if (error.status === 503 || error.message?.includes("503")) {
        errorMessage = "Le modèle d'IA est actuellement surchargé. Veuillez réessayer plus tard.";
      }
      res.status(500).json({ error: errorMessage });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Le paramètre 'messages' est requis et doit être un tableau." });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "Clé API Gemini manquante. Veuillez la configurer dans les paramètres." });
      }

      const systemInstruction = `
Tu es le tuteur d'élite Ramaitre, un enseignant extrêmement bienveillant et expert légendaire du Baccalauréat de Madagascar (Séries A, C et D).
Ta mission est d'assister l'élève s'il a des questions, des problèmes, ou s'il a besoin d'explications supplémentaires sur les cours, les exercices ou sa copie de bac blanc.
Sois toujours chaleureux, encourageant et dynamique. N'hésite pas à utiliser quelques expressions malgaches de réconfort et d'encouragement comme "Mahereza !", "Misaotra !", "Tongasoa !", "Faly mihaona !" ou "Mirary fahombiazana !".
Donne des explications méthodologiques rigoureuses, étape par étape, adaptées au programme du Bac malgache (Syllabus de mathématiques, physique-chimie, SVT et matières littéraires).
Reste humble, pédagogue, et aide l'élève à surmonter tout stress ou difficulté.
`;

      const contents = messages.map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction,
        }
      });

      res.json({ result: response.text });
    } catch (error: any) {
      console.error("Error in chat endpoint:", error);
      let errorMessage = "Une erreur s'est produite lors de la discussion.";
      if (error.status === 429 || error.message?.includes("429")) {
        errorMessage = "Le quota de l'API Gemini est dépassé. Veuillez réessayer dans quelques instants.";
      } else if (error.status === 503 || error.message?.includes("503")) {
        errorMessage = "Le modèle d'IA est actuellement surchargé. Veuillez réessayer plus tard.";
      }
      res.status(500).json({ error: errorMessage });
    }
  });

  app.post("/api/explain-concept", async (req, res) => {
    try {
      const { concept, subject } = req.body;
      if (!concept || !concept.trim()) {
        return res.status(400).json({ error: "Le concept est requis." });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "Clé API Gemini manquante. Veuillez la configurer dans les paramètres." });
      }

      const systemInstruction = `
Tu es le tuteur d'élite Ramaitre, un enseignant expert et extrêmement bienveillant du Baccalauréat de Madagascar (Séries A, C et D).
Ta mission est d'expliquer de manière simple, vivante et imagée un concept académique complexe ou un mot difficile dans la matière "${subject || 'Général'}".
Utilise une analogie concrète de la vie de tous les jours (par exemple inspirée de Madagascar : le riz national, les taxis-brousses, le zébu majestueux, le grand baobab, etc.) pour rendre l'explication mémorable.
Structure ta réponse au format Markdown clair en 3 courtes rubriques :
1. **🔍 En mots simples** : Une explication sans jargon en 1 ou 2 phrases courtes.
2. **💡 L'analogie de Ramaitre** : Une image de la vie de tous les jours très facile à visualiser.
3. **🎓 Au Baccalauréat** : Pourquoi ce concept est crucial pour l'épreuve et comment l'aborder.

Termine toujours par un mot d'encouragement dynamique et bienveillant comme "Mahereza !" ou "Faly manampy !".
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Explique-moi le concept ou terme académique suivant : "${concept}" de la matière "${subject || 'Général'}".`,
        config: {
          systemInstruction,
        }
      });

      res.json({ result: response.text });
    } catch (error: any) {
      console.error("Error in explain-concept endpoint:", error);
      let errorMessage = "Une erreur s'est produite lors de l'explication.";
      if (error.status === 429 || error.message?.includes("429")) {
        errorMessage = "Le quota de l'API Gemini est dépassé. Veuillez réessayer dans quelques instants.";
      } else if (error.status === 503 || error.message?.includes("503")) {
        errorMessage = "Le modèle d'IA est actuellement surchargé. Veuillez réessayer plus tard.";
      }
      res.status(500).json({ error: errorMessage });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
