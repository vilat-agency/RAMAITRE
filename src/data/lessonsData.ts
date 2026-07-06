export interface Lesson {
  id: string;
  title: string;
  subject: "Mathématiques" | "Physique-Chimie" | "Sciences Naturelles" | "Philosophie" | "Histoire-Géographie" | "Français" | "Malagasy" | "Anglais";
  summary: string;
  content: string; // Markdown / LaTeX content
}

export interface CurriculumChapter {
  id: string;
  title: string;
  subject: "Mathématiques" | "Physique-Chimie" | "Sciences Naturelles" | "Philosophie" | "Histoire-Géographie" | "Français" | "Malagasy" | "Anglais";
  notions: string[];
  skills: string[];
}

export const LESSONS_DATA: Lesson[] = [
  {
    id: "math-arithmetique",
    title: "Arithmétique (Terminale C)",
    subject: "Mathématiques",
    summary: "Division euclidienne, congruences modulo n, sous-groupes de Z, PGCD et PPCM, théorèmes de Bézout et Gauss, nombres premiers, numération binaire et décimale.",
    content: `### 1. Division Euclidienne et Congruences
Pour tout $a \\in \\mathbb{Z}$ et $b \\in \\mathbb{Z}^*$, il existe un unique couple $(q, r) \\in \\mathbb{Z} \\times \\mathbb{N}$ tel que :
$$a = bq + r \\quad \\text{avec} \\quad 0 \\le r < |b|$$

* **Congruence modulo n :** $a \\equiv b \\pmod n \\iff n \\text{ divise } (a-b)$.
* **Sous-groupes de $\\mathbb{Z}$ :** Tout sous-groupe de $(\\mathbb{Z}, +)$ est de la forme $n\\mathbb{Z}$ avec $n \\in \\mathbb{N}$.
* **Propriétés de la congruence :** Si $a \\equiv b \\pmod n$ et $c \\equiv d \\pmod n$, alors $a+c \\equiv b+d \\pmod n$, $ac \\equiv bd \\pmod n$ et $a^k \\equiv b^k \\pmod n$ ($k \\in \\mathbb{N}$).

### 2. PGCD, PPCM et Nombres Premiers
* **PGCD ($a \\wedge b$) et PPCM ($a \\vee b$) :** Relation fondamentale : $(a \\wedge b) \\times (a \\vee b) = |ab|$.
* **Théorème de Bézout :** $a \\wedge b = 1 \\iff \\exists (u, v) \\in \\mathbb{Z}^2$ tel que $au + bv = 1$.
* **Théorème de Gauss :** Si $a$ divise $bc$ et $a \\wedge b = 1$, alors $a$ divise $c$.
* **Nombres Premiers :** Un entier $p \\ge 2$ est premier s'il admet exactement deux diviseurs positifs : $1$ et $p$. Tout entier $n \\ge 2$ se décompose de façon unique en produit de facteurs premiers : $n = p_1^{\\alpha_1} p_2^{\\alpha_2} \\dots p_k^{\\alpha_k}$.

### 3. Systèmes de Numération (Binaire et Décimal)
* **Système Décimal (Base 10) :** Tout entier naturel $A$ s'écrit sous la forme :
$$A = \\overline{a_n a_{n-1} \\dots a_0}_{10} = a_n 10^n + a_{n-1} 10^{n-1} + \\dots + a_0 \\quad \\text{avec } a_i \\in \\{0, \\dots, 9\\}$$
* **Système Binaire (Base 2) :** Écriture avec les chiffres $\\{0, 1\\}$ :
$$A = \\overline{b_k b_{k-1} \\dots b_0}_2 = b_k 2^k + b_{k-1} 2^{k-1} + \\dots + b_0 \\quad \\text{avec } b_i \\in \\{0, 1\\}$$`
  },
  {
    id: "math-complexes",
    title: "Algèbre : Ensemble C & Outils Complexes",
    subject: "Mathématiques",
    summary: "Formes algébrique, trigonométrique et exponentielle, formules d'Euler et de Moivre, linéarisation, racines n-ièmes et équations du second degré.",
    content: `### 1. Formes d'un Nombre Complexe
Soit $z \\in \\mathbb{C}$.
* **Forme algébrique :** $z = x + iy$ avec $x = \\text{Re}(z)$ et $y = \\text{Im}(z)$ réels. $i^2 = -1$.
* **Conjugué et Module :** $\\bar{z} = x - iy$, $|z| = \\sqrt{z\\bar{z}} = \\sqrt{x^2+y^2}$.
* **Forme trigonométrique :** $z = r(\\cos \\theta + i \\sin \\theta)$ avec $r = |z|$ et $\\theta \\equiv \\arg(z) \\pmod{2\\pi}$.
* **Forme exponentielle :** $z = r e^{i\\theta}$.

### 2. Formules d'Euler et de Moivre
* **Formule de Moivre :** $(\\cos \\theta + i \\sin \\theta)^n = \\cos(n\\theta) + i \\sin(n\\theta) \\iff (e^{i\\theta})^n = e^{in\\theta}$.
* **Formules d'Euler :**
$$\\cos \\theta = \\frac{e^{i\\theta} + e^{-i\\theta}}{2} \\quad \\text{et} \\quad \\sin \\theta = \\frac{e^{i\\theta} - e^{-i\\theta}}{2i}$$
* **Linéarisation :** Consiste à transformer $\\cos^n \\theta$ ou $\\sin^n \\theta$ en somme de cosinus et sinus d'angles multiples à l'aide des formules d'Euler et du binôme de Newton.

### 3. Résolution d'Équations et Racines n-ièmes
* **Équation du second degré $az^2+bz+c=0$ ($a \\ne 0$) :**
  Calculer $\\Delta = b^2 - 4ac$. Trouver $\\delta \\in \\mathbb{C}$ tel que $\\delta^2 = \\Delta$. Les solutions sont $z = \\frac{-b \\pm \\delta}{2a}$.
* **Racines n-ièmes de $Z = R e^{i\\phi}$ ($n \\in \\mathbb{N}^*$) :**
$$z_k = \\sqrt[n]{R} e^{i \\left(\\frac{\\phi + 2k\\pi}{n}\\right)} \\quad \\text{pour} \\quad k \\in \\{0, 1, \\dots, n-1\\}$$`
  },
  {
    id: "math-analyse-limites-continuite-deriv",
    title: "Analyse : Limites, Continuité & Dérivation",
    subject: "Mathématiques",
    summary: "Limites de fonctions, asymptotes, Théorème des valeurs intermédiaires (TVI), continuité, dérivées de fonctions composées et réciproques, dérivées successives et inégalités des accroissements finis.",
    content: `### 1. Limites et Continuité
* **Asymptotes :**
  * Verticale : $\\lim_{x \\to a} f(x) = \\pm\\infty$ (droite $x = a$).
  * Horizontale : $\\lim_{x \\to \\pm\\infty} f(x) = L$ (droite $y = L$).
  * Oblique : $\\lim_{x \\to \\pm\\infty} [f(x) - (ax+b)] = 0$ (droite $y = ax+b$).
* **Théorème des Valeurs Intermédiaires (TVI) :** Si $f$ est continue sur $[a; b]$, alors pour tout réel $k$ compris entre $f(a)$ et $f(b)$, il existe au moins un réel $c \\in [a; b]$ tel que $f(c) = k$.
* **Corollaire de la bijection :** Si $f$ est continue et strictement monotone sur $[a; b]$, elle réalise une bijection de $[a; b]$ sur $I = f([a; b])$. L'équation $f(x)=k$ admet une unique solution dans $[a; b]$.

### 2. Dérivation et Accroissements Finis
* **Dérivée d'une fonction composée :** $(g \\circ f)'(x) = f'(x) \\times g'(f(x))$.
* **Dérivée de la réciproque $f^{-1}$ :** Si $f$ est dérivable sur un intervalle $I$ et si sa dérivée ne s'annule pas, alors $f^{-1}$ est dérivable sur $f(I)$ et :
$$(f^{-1})'(y) = \\frac{1}{f'(f^{-1}(y))}$$
* **Inégalité des Accroissements Finis (IAF) :** Si $f$ est continue sur $[a; b]$ et dérivable sur $]a; b[$, et s'il existe deux réels $m$ et $M$ tels que $m \\le f'(x) \\le M$ pour tout $x \\in ]a; b[$, alors :
$$m(b-a) \\le f(b) - f(a) \\le M(b-a)$$
  * Si $|f'(x)| \\le k$, alors $|f(b) - f(a)| \\le k|b-a|$.
* **Dérivées successives :** Notées $f^{(n)}(x)$, obtenues en dérivant $n$ fois de suite la fonction $f$.`
  },
  {
    id: "math-analyse-log-exp",
    title: "Analyse : Logarithmes, Exponentielles & Puissances",
    subject: "Mathématiques",
    summary: "Logarithme népérien et décimal, fonction exponentielle népérienne, fonctions puissances, propriétés algébriques, limites de référence, croissances comparées.",
    content: `### 1. Fonctions Logarithmes ($\\ln$ et $\\log$)
* **Logarithme Népérien ($\\ln$) :** Unique primitive de $x \\mapsto \\frac{1}{x}$ sur $]0; +\\infty[$ s'annulant en $1$.
  * Propriétés : $\\ln(ab) = \\ln a + \\ln b$, $\\ln(\\frac{a}{b}) = \\ln a - \\ln b$, $\\ln(a^r) = r\\ln a$.
  * Limites de référence : $\\lim_{x\\to 0^+} \\ln x = -\\infty$, $\\lim_{x\\to +\\infty} \\ln x = +\\infty$.
* **Logarithme Décimal ($\\log$) :** Défini par $\\log(x) = \\frac{\\ln x}{\\ln 10}$. Utilisé pour les échelles de pH, décibels, etc.

### 2. Fonction Exponentielle et Puissances
* **Fonction Exponentielle ($e^x$) :** Fonction réciproque de la fonction $\\ln$. Définie sur $\\mathbb{R}$.
  * Propriétés : $e^{a+b} = e^a \\cdot e^b$, $e^{-a} = \\frac{1}{e^a}$, $(e^a)^b = e^{ab}$.
  * Limites de référence : $\\lim_{x\\to -\\infty} e^x = 0$, $\\lim_{x\\to +\\infty} e^x = +\\infty$.
* **Fonction Puissance ($x^\\alpha$) :** Pour $x > 0$ et $\\alpha \\in \\mathbb{R}$ : $x^\\alpha = e^{\\alpha \\ln x}$.

### 3. Croissances Comparées (limites indispensables)
Pour tout entier $n > 0$ et $\\alpha > 0$ :
* $\\lim_{x\\to +\\infty} \\frac{e^x}{x^n} = +\\infty$
* $\\lim_{x\\to -\\infty} x^n e^x = 0$
* $\\lim_{x\\to +\\infty} \\frac{\\ln x}{x^\\alpha} = 0$
* $\\lim_{x\\to 0^+} x^\\alpha \\ln x = 0$`
  },
  {
    id: "math-analyse-integral-diff-suites",
    title: "Analyse : Intégrales, Équations Différentielles & Suites",
    subject: "Mathématiques",
    summary: "Calcul intégral (Chasles, linéarité), méthodes d'intégration (IPP, changement de variable affine), calcul d'aires, équations différentielles du 1er et 2nd ordre, suites numériques, récurrence, convergence et suites définies par une intégrale.",
    content: `### 1. Calcul Intégral et Primitives
* **Théorème fondamental :** Si $f$ est continue sur $[a; b]$ et $F$ est une primitive de $f$, alors $\\int_a^b f(x)dx = F(b) - F(a)$.
* **Propriétés de l'intégrale :** Linéarité, relation de Chasles ($\\int_a^b + \\int_b^c = \\int_a^c$), positivité ($f \\ge 0 \\implies \\int_a^b f \\ge 0$ pour $a \\le b$).
* **Méthodes d'intégration :**
  * *Intégration par parties (IPP) :* $\\int_a^b u(x)v'(x)dx = [u(x)v(x)]_a^b - \\int_a^b u'(x)v(x)dx$.
  * *Changement de variable affine :* $\\int_a^b f(\\alpha x + \\beta)dx = \\frac{1}{\\alpha} \\int_{\\alpha a + \\beta}^{\\alpha b + \\beta} f(t)dt$.
* **Calcul d'aires :** L'aire sous la courbe d'une fonction positive $f$ entre $x=a$ et $x=b$ est $\\mathcal{A} = \\int_a^b f(x)dx$ (en unités d'aire).

### 2. Équations Différentielles Linéaires
* **Premier Ordre $y' + ay = 0$ :** Solutions de la forme $y(x) = C e^{-ax}$ ($C \\in \\mathbb{R}$).
* **Second Ordre $y'' + ay' + by = 0$ ($a, b \\in \\mathbb{R}$) :** Équation caractéristique $r^2 + ar + b = 0$.
  * Si $\\Delta > 0$ : deux racines réelles $r_1, r_2$. Solutions : $y(x) = C_1 e^{r_1 x} + C_2 e^{r_2 x}$.
  * Si $\\Delta = 0$ : une racine double $r_0$. Solutions : $y(x) = (C_1 x + C_2) e^{r_0 x}$.
  * Si $\\Delta < 0$ : deux racines complexes conjuguées $\\alpha \\pm i\\beta$. Solutions : $y(x) = e^{\\alpha x} (C_1 \\cos(\\beta x) + C_2 \\sin(\\beta x))$.

### 3. Suites Numériques
* **Raisonnement par Récurrence :** Trois étapes : Initialisation, Hérédité, Conclusion.
* **Convergence :** Une suite croissante et majorée (ou décroissante et minorée) converge.
* **Suites récurrentes $U_{n+1} = f(U_n)$ :** Si la suite converge vers une limite $L$ et $f$ est continue en $L$, alors $L$ est solution de l'équation $f(L) = L$.
* **Suites définies par une intégrale :** Étude de suites du type $I_n = \\int_a^b x^n f(x) dx$. Souvent étudiées à l'aide d'un encadrement ou d'une IPP établissant une relation entre $I_{n+1}$ and $I_n$.`
  },
  {
    id: "math-proba-stats",
    title: "Probabilités & Statistiques (Séries C/D)",
    subject: "Mathématiques",
    summary: "Dénombrement (arrangements, combinaisons, binôme de Newton), loi de Bernoulli et loi binomiale, variables aléatoires, statistiques à deux variables (covariance, moindres carrés, corrélation) et systèmes d'équations linéaires dans R^3.",
    content: `### 1. Dénombrement et Probabilités
* **Arrangements ($A_n^k$) et Combinaisons ($\\binom{n}{k}$) :**
  * $A_n^k = \\frac{n!}{(n-k)!}$ (choix ordonné de $k$ éléments parmi $n$).
  * $\\binom{n}{k} = \\frac{n!}{k!(n-k)!}$ (choix non ordonné de $k$ éléments parmi $n$).
* **Binôme de Newton :**
$$(a+b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^k b^{n-k}$$
* **Loi Binomiale $\\mathcal{B}(n, p)$ :** Schéma de Bernoulli à $n$ épreuves indépendantes :
$$P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k}$$
  * Espérance : $E(X) = np$, Variance : $V(X) = np(1-p)$.

### 2. Statistiques à deux variables
* **Point Moyen $G(\\bar{x}; \\bar{y})$ :** Centre de gravité du nuage de points.
* **Covariance :** $\\text{cov}(x, y) = \\frac{1}{N} \\sum_{i=1}^N x_i y_i - \\bar{x}\\bar{y}$.
* **Ajustement linéaire par les moindres carrés :** Droite de régression d'équation $y = ax+b$ avec :
$$a = \\frac{\\text{cov}(x, y)}{V(x)} \\quad \\text{et} \\quad b = \\bar{y} - a\\bar{x}$$
* **Coefficient de corrélation linéaire $r$ :**
$$r = \\frac{\\text{cov}(x, y)}{\\sigma(x)\\sigma(y)}$$
  * Si $|r| > 0,85$, l'ajustement linéaire est excellent.

### 3. Spécificité Terminale D : Systèmes linéaires dans $\\mathbb{R}^3$
Résolution de systèmes à 3 équations et 3 inconnues du type :
$$\\begin{cases} a_1 x + b_1 y + c_1 z = d_1 \\\\ a_2 x + b_2 y + c_2 z = d_2 \\\\ a_3 x + b_3 y + c_3 z = d_3 \\end{cases}$$
* Méthode du pivot de Gauss pour trianguler le système.
* Résolution matricielle : $A X = B \\implies X = A^{-1} B$ (si le déterminant de $A$ est non nul).`
  },
  {
    id: "math-geometrie-bary-affines",
    title: "Géométrie : Barycentres & Applications Affines",
    subject: "Mathématiques",
    summary: "Barycentre de n points pondérés, coordonnées du barycentre, lignes de niveau, applications affines, expressions analytiques dans le plan et l'espace, transformations spatiales.",
    content: `### 1. Barycentre de points pondérés
Soit un système de points pondérés $\\{(A_1, \\alpha_1), (A_2, \\alpha_2), \\dots, (A_n, \\alpha_n)\\}$ tel que la somme des coefficients $\\sum \\alpha_i \\ne 0$.
* **Définition :** L'unique point $G$ vérifiant :
$$\\sum_{i=1}^{n} \\alpha_i \\vec{GA_i} = \\vec{0}$$
* **Coordonnées :** Dans un repère quelconque, les coordonnées de $G$ sont :
$$x_G = \\frac{\\sum \\alpha_i x_{A_i}}{\\sum \\alpha_i} \\quad \\text{et} \\quad y_G = \\frac{\\sum \\alpha_i y_{A_i}}{\\sum \\alpha_i}$$
* **Réduction vectorielle :** Pour tout point $M$ du plan, on a :
$$\\sum_{i=1}^{n} \\alpha_i \\vec{MA_i} = \\left(\\sum_{i=1}^{n} \\alpha_i\\right) \\vec{MG}$$
* **Lignes de niveau :** Ensembles de points $M$ vérifiant une relation métrique. Par exemple :
  * $MA^2 + MB^2 = k$ ou $MA/MB = k$ (cercles d'Apollonius).
  * $\\alpha MA^2 + \\beta MB^2 = k$ : se ramène à l'étude de $(\\alpha+\\beta)MG^2 + \\alpha GA^2 + \\beta GB^2 = k$ en introduisant le barycentre $G$.

### 2. Applications Affines et Expressions Analytiques
Une application affine $f$ associe à tout point $M(x, y)$ un point $M'(x', y')$ tel que :
* **Expression analytique plane :**
$$\\begin{cases} x' = a x + b y + c \\\\ y' = a' x + b' y + c' \\end{cases}$$
* **Expression analytique spatiale (Terminale C) :**
$$\\begin{cases} x' = a x + b y + c z + d \\\\ y' = a' x + b' y + c' z + d' \\\\ z' = a'' x + b'' y + c'' z + d'' \\end{cases}$$
* **Propriétés de conservation :** Les applications affines conservent le barycentre, le parallélisme, l'alignement, et le rapport de distances alignées.`
  },
  {
    id: "math-geometrie-isometries-similitudes",
    title: "Géométrie : Isométries & Similitudes Planes",
    subject: "Mathématiques",
    summary: "Isométries affines (translations, rotations, symétries orthogonales), classification des isométries planes, similitudes planes directes et inverses, expressions complexes et éléments caractéristiques.",
    content: `### 1. Isométries Planes
Une isométrie est une transformation qui conserve les distances.
* **Isométries directes (déplacements) :** Conservent les angles orientés.
  * *Translations :* Expression complexe $z' = z + b$. Pas de point fixe.
  * *Rotations :* Expression complexe $z' = e^{i\\theta}(z-\\omega) + \\omega$. Centre $\\Omega(\\omega)$, angle $\\theta$.
* **Isométries indirectes (antidéplacements) :** Inversent les angles orientés.
  * *Symétries orthogonales (réflexions) :* Par rapport à une droite. Un axe de points fixes.
  * *Symétries glissées :* Composée d'une réflexion d'axe $D$ et d'une translation de vecteur parallèle à $D$.

### 2. Similitudes Planes Directes et Inverses
Une similitude multiplie les distances par un rapport $k > 0$.
* **Similitude Directe :** Écriture complexe $z' = az + b$ ($a \\in \\mathbb{C}^*$).
  * Rapport : $k = |a|$.
  * Angle : $\\theta = \\arg(a) \\pmod{2\\pi}$.
  * Si $a = 1$ : Translation.
  * Si $a \\ne 1$ : Unique point fixe $\\Omega$ (centre) d'affixe $\\omega = \\frac{b}{1-a}$. C'est la composée d'une homothétie de centre $\\Omega$ et de rapport $k$ et d'une rotation de centre $\\Omega$ et d'angle $\\theta$.
* **Similitude Inverse :** Écriture complexe $z' = a\\bar{z} + b$ ($a \\in \\mathbb{C}^*$).
  * Rapport : $k = |a|$.
  * Pas d'angle défini.
  * Si $a\\bar{a} = 1$ : Isométrie indirecte (réflexion ou symétrie glissée).
  * Si $k \\ne 1$ : Unique point fixe $\\Omega$ (centre). C'est la composée d'une homothétie de centre $\\Omega$ et d'une réflexion d'axe passant par $\\Omega$.`
  },
  {
    id: "math-geometrie-coniques",
    title: "Géométrie : Les Coniques (Tle C)",
    subject: "Mathématiques",
    summary: "Définition par foyer, directrice et excentricité, équations réduites d'une parabole, ellipse et hyperbole, et représentations paramétriques.",
    content: `### 1. Définition Générale par Foyer et Directrice
Soit un point $F$ (foyer), une droite $D$ (directrice) ne passant pas par $F$, et un réel $e > 0$ (excentricité). Une conique $\\mathcal{C}$ est l'ensemble des points $M$ du plan vérifiant :
$$\\frac{MF}{d(M, D)} = e \\iff MF = e \\cdot d(M, D)$$
* Si $e = 1$ : la conique est une **Parabole**.
* Si $0 < e < 1$ : la conique est une **Ellipse**.
* Si $e > 1$ : la conique est une **Hyperbole**.

### 2. Équations Réduites et Propriétés
Dans un repère orthonormal adapté $(\\Omega; \\vec{i}, \\vec{j})$ lié aux sommets ou axes de symétrie :

#### A. La Parabole ($e=1$)
* Équation réduite : $y^2 = 2px$ (axe focal horizontal) ou $x^2 = 2py$ (axe focal vertical).
* Foyer : $F(\\frac{p}{2}; 0)$, Directrice : $x = -\\frac{p}{2}$ (pour $y^2=2px$).
* Sommet à l'origine $\\Omega(0,0)$.

#### B. L'Ellipse ($0 < e < 1$)
* Équation réduite :
$$\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 \\quad (\\text{avec } a > b > 0)$$
* Demi-grand axe $a$, demi-petit axe $b$.
* Foyers : $F(c; 0)$ et $F'(-c; 0)$ avec $c = \\sqrt{a^2-b^2}$.
* Excentricité : $e = \\frac{c}{a}$. Directrices : $x = \\frac{a^2}{c}$ et $x = -\\frac{a^2}{c}$.

#### C. L'Hyperbole ($e > 1$)
* Équation réduite :
$$\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1 \\quad (a > 0, b > 0)$$
* Foyers : $F(c; 0)$ et $F'(-c; 0)$ avec $c = \\sqrt{a^2+b^2}$.
* Excentricité : $e = \\frac{c}{a}$. Asymptotes : droites $y = \\pm \\frac{b}{a}x$.

### 3. Représentations Paramétriques
* **Cercle** (ellipse où $a=b=R$) : $\\begin{cases} x = R \\cos \\theta \\\\ y = R \\sin \\theta \\end{cases}$ ($\\theta \\in \\mathbb{R}$).
* **Ellipse** : $\\begin{cases} x = a \\cos \\theta \\\\ y = b \\sin \\theta \\end{cases}$ ($\\theta \\in \\mathbb{R}$).
* **Hyperbole** (branche principale) : $\\begin{cases} x = a \\cosh t \\\\ y = b \\sinh t \\end{cases}$ ou $\\begin{cases} x = \\frac{a}{\\cos \\theta} \\\\ y = b \\tan \\theta \\end{cases}$ ($t \\in \\mathbb{R}$).
* **Parabole** : $\\begin{cases} x = \\frac{t^2}{2p} \\\\ y = t \\end{cases}$ ($t \\in \\mathbb{R}$).`
  },
  {
    id: "phys-mecanique",
    title: "Mécanique : Newton, Satellites & Projectiles",
    subject: "Physique-Chimie",
    summary: "Cinématique, lois de Newton, mouvement de projectiles dans un champ uniforme, satellites et théorème de l'accélération angulaire.",
    content: `### 1. Cinématique et base de Frenet
Dans un repère courbe, le vecteur accélération s'exprime comme :
$$\\vec{a} = a_t \\vec{u} + a_n \\vec{n} = \\frac{dv}{dt} \\vec{u} + \\frac{v^2}{R} \\vec{n}$$
* Dans un mouvement circulaire uniforme ($v = \\text{Cte}$), l'accélération est purement normale (centripète) : $a = a_n = \\frac{v^2}{R}$.

### 2. Mouvement de Projectiles dans un champ uniforme
Dans le champ de pesanteur uniforme $\\vec{g}$ (ou champ électrostatique $\\vec{E}$), les équations horaires du mouvement s'obtiennent par double intégration de la deuxième loi de Newton ($\\vec{a} = \\vec{g}$) :
* **Vitesse :** $\\vec{v}(t) = \\vec{g}t + \\vec{v}_0$
* **Position :** $\\vec{OM}(t) = \\frac{1}{2}\\vec{g}t^2 + \\vec{v}_0t + \\vec{OM}_0$
* Permet de déterminer la **trajectoire** (parabolique), la **portée** (distance d'impact) et la **flèche** (altitude maximale).

### 3. Mouvement Circulaire des Satellites
Pour un satellite de masse $m$ en orbite circulaire de rayon $r$ autour d'un astre de masse $M$ :
* La force gravitationnelle est centripète : $F = G\\frac{Mm}{r^2} = m \\frac{v^2}{r}$.
* **Vitesse orbitale :**
$$v = \\sqrt{\\frac{GM}{r}}$$
* **Période de révolution :** $T = \\frac{2\\pi r}{v} = 2\\pi \\sqrt{\\frac{r^3}{GM}}$.
* **Troisième loi de Kepler :** $\\frac{T^2}{r^3} = \\frac{4\\pi^2}{GM} = \\text{Cte}$.

### 4. Théorème de l'Accélération Angulaire
Pour un solide en rotation autour d'un axe fixe $\\Delta$ avec un moment d'inertie $J_\\Delta$ :
$$\\sum M_{\\Delta}(\\vec{F}) = J_\\Delta \\ddot{\\theta}$$
* **Moment d'inertie usuels :**
  * Disque plein homogène : $J_\\Delta = \\frac{1}{2} M R^2$
  * Sphère pleine homogène : $J_\\Delta = \\frac{2}{5} M R^2$`
  },
  {
    id: "phys-electromagnetisme",
    title: "Électromagnétisme & Oscillations Électriques",
    subject: "Physique-Chimie",
    summary: "Forces de Lorentz et Laplace, f.e.m. d'auto-induction, circuits LC et oscillateurs RLC en régime sinusoïdal forcé.",
    content: `### 1. Forces de Lorentz et de Laplace
* **Force de Lorentz (particule de charge q dans un champ B) :**
$$\\vec{F} = q \\vec{v} \\wedge \\vec{B}$$
* **Force de Laplace (conducteur de longueur L parcouru par un courant I) :**
$$\\vec{F} = I \\vec{L} \\wedge \\vec{B}$$

### 2. Induction et Auto-induction
* **F.e.m. d'auto-induction :** Créée par la variation de l'intensité du courant dans une bobine d'inductance $L$ :
$$e = -L \\frac{di}{dt}$$
* **Loi d'Ohm pour une bobine inductive :** $u = Ri + L \\frac{di}{dt}$.
* **Énergie magnétique emmagasinée :** $E_m = \\frac{1}{2} L i^2$.

### 3. Oscillations Électriques LC et RLC
* **Circuit LC oscillant non amorti (équation différentielle en charge q) :**
$$\\ddot{q} + \\omega_0^2 q = 0 \\quad \\text{avec} \\quad \\omega_0 = \\frac{1}{\\sqrt{LC}}$$
  * Énergie totale conservée : $E = \\frac{1}{2}\\frac{q^2}{C} + \\frac{1}{2} L i^2 = \\text{Cte}$.
* **Circuit RLC série en régime sinusoïdal forcé (alimentation u(t) = U_m \\cos(\\omega t + \\phi)) :**
  * **Impédance du circuit :** $Z = \\sqrt{R^2 + \\left(L\\omega - \\frac{1}{C\\omega}\\right)^2}$
  * **Résonance d'intensité :** Obtenue lorsque $L\\omega = \\frac{1}{C\\omega} \\iff \\omega = \\omega_0$. L'impédance est alors minimale ($Z = R$) et le courant $I$ est maximal.
  * **Puissance moyenne consommée :** Consommée uniquement par effet Joule dans la résistance :
$$P = R I^2 = U I \\cos \\phi \\quad (\\text{où } \\cos \\phi = \\frac{R}{Z} \\text{ est le facteur de puissance})$$`
  },
  {
    id: "chem-acide-base",
    title: "Équilibres Acide-Base & Dosages",
    subject: "Physique-Chimie",
    summary: "Réactions acido-basiques, pH, autoprotolyse de l'eau, constante d'acidité Ka, diagrammes de prédominance et courbes de dosage.",
    content: `### 1. Définition de Brønsted
* Un **acide** est une espèce chimique capable de libérer un proton $H^+$.
* Une **base** est une espèce chimique capable de capter un proton $H^+$.
Couple acide/base : $AH / A^-$ d'équation de demi-réaction : $AH \\rightleftharpoons A^- + H^+$.

### 2. Le pH et l'autoprotolyse de l'eau
* $\\text{pH} = -\\log[\\text{H}_3\\text{O}^+] \\iff [\\text{H}_3\\text{O}^+] = 10^{-\\text{pH}}$.
* Produit ionique de l'eau : $K_e = [\\text{H}_3\\text{O}^+][\\text{HO}^-] = 10^{-14}$ (à 25°C).

### 3. Force des acides et bases
* Un **acide fort** (resp. base forte) réagit totalement avec l'eau. Pour un acide fort de concentration $C_A$ : $\\text{pH} = -\\log(C_A)$. Pour une base forte de concentration $C_B$ : $\\text{pH} = 14 + \\log(C_B)$.
* Un **acide faible** (resp. base faible) réagit de façon limitée avec l'eau, caractérisé par la constante d'acidité $K_a$ :
$$K_a = \\frac{[A^-]_{\\text{éq}} \\cdot [H_3O^+]_{\\text{éq}}}{[AH]_{\\text{éq}}}$$
* Relation d'Henderson :
$$\\text{pH} = \\text{p}K_a + \\log\\left(\\frac{[A^-]}{[AH]}\\right)$$

### 4. Dosages Acide-Base
Au point d'équivalence d'un dosage d'acide par une base : la quantité de matière de réactif titrant ajouté est égale à la quantité de matière de réactif titré initialement présent :
$$C_A V_A = C_B V_B$$
* **Méthode des tangentes :** Permet de repérer graphiquement le point d'équivalence $E(V_E, \\text{pH}_E)$ sur une courbe de dosage.
* **Demi-équivalence :** Pour le dosage d'un acide faible par une base forte, à la demi-équivalence, on a $\\text{pH} = \\text{p}K_a$. La solution possède alors un **effet tampon** (le pH varie très peu par ajout d'acides ou bases, ou par dilution).`
  },
  {
    id: "phys-optique",
    title: "Optique : Lentilles Minces",
    subject: "Physique-Chimie",
    summary: "Notions d'objets et images (réels/virtuels) à travers les lentilles minces, vergence et relations de conjugaison.",
    content: `### 1. Lentilles Minces
* **Définitions :** Une lentille est convergente ($f > 0$) ou divergente ($f < 0$).
* **Éléments :** Axe principal, centre optique, foyer principal objet ($F$) et image ($F'$).
* **Vergence ($C$) :** $C = 1/f'$ (en dioptries), avec $f' = \\overline{OF'}$.
* **Formule de conjugaison de Descartes (origine au centre optique O) :**
  $$\\frac{1}{\\overline{OA'}} - \\frac{1}{\\overline{OA}} = \\frac{1}{f'}$$
  où $A$ est la position de l'objet et $A'$ celle de l'image sur l'axe optique.
* **Grandissement ($\\gamma$) :** $\\gamma = \\frac{\\overline{A'B'}}{\\overline{AB}} = \\frac{\\overline{OA'}}{\\overline{OA}}$.`
  },
  {
    id: "phys-atomique-nucleaire",
    title: "Physique Atomique & Nucléaire",
    subject: "Physique-Chimie",
    summary: "Noyau atomique, énergie de liaison, radioactivité (alpha, beta, gamma) et réactions nucléaires (fission, fusion).",
    content: `### 1. Le Noyau Atomique
* **Composition :** Nucléons (protons et neutrons).
* **Énergie de liaison :** Correspond au défaut de masse $\\delta m$ selon la relation d'Einstein : $E_l = \\delta m \\cdot c^2$.
* **Stabilité :** Les noyaux stables ont un nombre de masse $A$ généralement compris entre 20 et 190 (au-delà, la radioactivité $\\alpha$ et la fission spontanée dominent, jusqu'au dernier isotope quasi-stable, le bismuth 209).

### 2. Radioactivité et Réactions Nucléaires
* **Radioactivité :** Transformation spontanée d'un noyau instable (père) en un noyau plus stable (fils) avec émission de rayonnement ($\\alpha, \\beta^-, \\beta^+, \\gamma$).
* **Loi de décroissance :** $N(t) = N_0 e^{-\\lambda t}$.
* **Fission :** Division d'un noyau lourd en noyaux plus légers (ex: centrales nucléaires).
* **Fusion :** Union de deux noyaux légers en un noyau plus lourd (ex: étoiles, très exoénergétique).`
  },
  {
    id: "bio-moleculaire",
    title: "Biologie Moléculaire : ADN & Synthèse des Protéines",
    subject: "Sciences Naturelles",
    summary: "Structure de l'ADN, réplication semi-conservative, mécanisme de transcription et étapes de la traduction.",
    content: `### 1. Structure de l'ADN (Watson et Crick)
L'acide désoxyribonucléique (ADN) est le support universel de l'information génétique.
* Structure en **double hélice** formée de deux brins polynucléotidiques enroulés en sens inverse (antiparallèles).
* **Nucléotides :** Composés d'un sucre (désoxyribose), d'un groupement phosphate, et d'une base azotée parmi : Adénine (A), Thymine (T), Cytosine (C), Guanine (G).
* **Complémentarité des bases :** Unies par liaisons hydrogènes ($A-T$ par 2 liaisons, $C-G$ par 3 liaisons).

### 2. Réplication de l'ADN
Processus **semi-conservatif** ayant lieu pendant la phase S de l'interphase du cycle cellulaire.
* L'hélicase ouvre la double hélice en rompant les liaisons hydrogènes.
* L'ADN polymérase synthétise deux nouveaux brins complémentaires en utilisant chaque brin parental comme matrice.
* Assure la conservation intégrale de l'information génétique lors de la mitose (division conforme).

### 3. Expression de l'information génétique
La synthèse des protéines à partir de l'ADN comprend deux étapes majeures :
#### A. La Transcription (dans le noyau)
Synthèse d'une molécule d'ARN messager (ARNm) complémentaire du brin transcrit d'ADN par l'ARN polymérase.
* L'ARNm contient de l'Uracile (U) à la place de la Thymine (T) et du Ribose à la place du désoxyribose.

#### B. La Traduction (dans le cytoplasme, au niveau des ribosomes)
Synthèse d'une chaîne polypeptidique à partir de la séquence de l'ARNm.
* **Le code génétique :** Système de correspondance associant un codon (triplet de nucléotides de l'ARNm) à un acide aminé. Il est universel, redondant (plusieurs codons pour un même acide aminé) et non ambigu.
* **Étapes de la traduction :**
  1. *Initiation :* Fixation du ribosome sur le codon d'initiation AUG.
  2. *Élongation :* Déplacement du ribosome de codon en codon et liaison des acides aminés (apportés par les ARNt) par liaisons peptidiques.
  3. *Terminaison :* Rencontre d'un codon stop (UAA, UAG, UGA), libération de la protéine et dissociation du ribosome.`
  },
  {
    id: "bio-reproduction",
    title: "Reproduction Humaine & Maîtrise de la Procréation",
    subject: "Sciences Naturelles",
    summary: "Structure des gonades, méiose, spermatogénèse et ovogénèse, régulation hormonale, fécondation, lactation et contraception.",
    content: `### 1. Gamétogénèse et Méiose
La gamétogénèse est la formation de cellules sexuelles haploïdes ($n$ chromosomes) à partir de cellules germinales diploïdes ($2n$ chromosomes).
* **Méiose :** Deux divisions cellulaires successives précédées d'une seule réplication :
  * *Division réductionnelle :* Séparation des chromosomes homologues ($2n \\to n$).
  * *Division équationnelle :* Séparation des chromatides sœurs ($n \\to n$).
* **Spermatogénèse (dans les testicules) :** Continue de la puberté à la fin de la vie. Produit 4 spermatozoïdes à partir d'un spermatocyte I.
* **Ovogénèse (dans les ovaires) :** Discontinue. Bloquée en prophase I chez le fœtus, reprend à la puberté à chaque cycle (bloquée en métaphase II). Produit 1 ovocyte II et des globules polaires.

### 2. Régulation Hormonale (Axe Hypothalamo-Hypophysaire)
* L'hypothalamus sécrète la GnRH qui stimule l'hypophyse.
* L'hypophyse antérieure sécrète :
  * **FSH (Hormone folliculo-stimulante) :** Stimule le développement des follicules (femme) et la spermatogénèse via les cellules de Sertoli (homme).
  * **LH (Hormone lutéinisante) :** Déclenche l'ovulation vers le 14ème jour (femme) et stimule la production de testostérone par les cellules de Leydig (homme).
* **Rétrocontrôles :** Les hormones ovariennes (œstrogènes, progestérone) et testiculaires exercent des rétrocontrôles négatifs (ou positif pour déclencher l'ovulation) sur l'axe hypothalamo-hypophysaire.

### 3. Fécondation et Développement Embryonnaire
* **Fécondation :** Rencontre de l'ovocyte II et d'un spermatozoïde dans l'ampoule de la trompe utérine. Fusion des noyaux (caryogamie) pour former le zygote ($2n$). Un blocage de la polyspermie empêche la pénétration d'autres spermatozoïdes.
* **Nidation :** L'œuf se divise (segmentation, morula, blastocyste) et s'implante dans l'endomètre utérin vers le 7ème jour.
* **Lactation :** Stimulée par la prolactine (production de lait) et l'ocytocine (éjection du lait lors de la tétée).

### 4. Maîtrise de la procréation
* **Contraception :** Méthodes préventives (hormonales comme la pilule bloquant l'ovulation, locales comme le préservatif, d'urgence).
* **Reproduction Médicalement Assistée (PMA) :** Insémination artificielle, Fécondation in Vitro et Transfert d'Embryon (FIVETE).`
  },
  {
    id: "bio-genetique",
    title: "Génétique, Lois de Mendel & Hérédité Humaine",
    subject: "Sciences Naturelles",
    summary: "Lois de Mendel, monohybridisme et dihybridisme, brassages chromosomiques, crossing-over et anomalies du caryotype.",
    content: `### 1. Monohybridisme et Lois de Mendel
Étude de la transmission d'un seul caractère.
* **1ère Loi de Mendel (Uniformité des hybrides de F1) :** Le croisement de deux lignées pures de phénotypes différents donne une génération F1 homogène.
* **2ème Loi de Mendel (Pureté des gamètes) :** Lors de la formation des gamètes de F1, les allèles se séparent (ségrégation), donnant en F2 des proportions de $3/4$ phénotype dominant, $1/4$ récessif.
* **Croisement-test (Backcross) :** Croisement d'un individu de phénotype dominant avec un homozygote récessif pour déterminer son génotype.

### 2. Dihybridisme et Brassages Chromosomiques
Étude de la transmission de deux caractères.
* **3ème Loi de Mendel (Ségrégation indépendante des allèles) :** Les allèles de gènes différents se séparent de façon indépendante lors de la méiose, donnant en F2 des proportions $9/3/3/1$ (si les gènes sont indépendants).
* **Gènes Indépendants (Brassage Interchromosomique) :** Portés par des paires de chromosomes différentes. Orientation aléatoire des chromosomes à l'anaphase I.
* **Gènes Liés (Linkage et Brassage Intrachromosomique) :** Portés par le même chromosome.
  * **Crossing-over (enjambement) :** Échange de fragments de chromatides entre chromosomes homologues en prophase I. Permet la création de phénotypes recombinés minoritaires.

### 3. Hérédité Humaine et Maladies Génétiques
* **Hérédité liée au sexe :** Gène porté par les chromosomes sexuels (X ou Y). L'hémophilie et le daltonisme sont des maladies récessives liées à l'X (touchent majoritairement les hommes).
* **Aberrations chromosomiques (Anomalies du Caryotype) :**
  * *Trisomie 21 (Syndrome de Down) :* Présence de 3 chromosomes 21.
  * *Syndrome de Klinefelter :* Homme possédant XXY.
  * *Syndrome de Turner :* Femme possédant un seul X (X0).`
  },
  {
    id: "bio-geologie-madagascar",
    title: "Géologie de Madagascar & Cartographie",
    subject: "Sciences Naturelles",
    summary: "Socle cristallin malgache, couvertures sédimentaires (Sakoa, Sakamena, Isalo), géologie appliquée et profils topographiques.",
    content: `### 1. Le Socle Cristallin Malgache
Madagascar possède un vieux socle précambrien occupant les deux tiers de l'île (dans le Centre et l'Est).
* **Au nord de la ligne Bongolava-Ranotsara :**
  * *Système Antongilien :* Le plus ancien faciès pétrographique (migmatites, granites).
  * *Système Andriamena-Manampotsy :* Riche en roches basiques et ultrabasiques (chromite, nickel).
* **Au niveau de la ligne Bongolava-Ranotsara :**
  * *Série SQC (Schisto-Quartzo-Calcaire) :* Formations sédimentaires métamorphisées.
  * *Série Amborompotsy-Ikalamavony :* Métasédiments et quartzites.
* **Au sud de la ligne Bongolava-Ranotsara :**
  * *Système Androyen :* Faciès très métamorphisé (leptynites, cordiérite).
  * *Série d'Ampanihy :* Riche en graphite et anorthosites.
  * *Série Vohibory :* Métamorphisme de degré moindre (amphibolites, cuivre).

### 2. Les Couvertures Sédimentaires à Madagascar
Elles occupent le tiers Ouest et sont formées de bassins sédimentaires majeurs (Majunga, Morondava).
* **Le Groupe du Karroo (Permien à Jurassique moyen) :**
  * *Groupe de la Sakoa :* Contient d'importants gisements de charbon (houille) et des tillites glaciaires.
  * *Groupe de la Sakamena :* Schistes et grès riches en fossiles de reptiles et de plantes.
  * *Groupe de l'Isalo :* Grès continentaux massifs formant les paysages ruiniformes (Isalo).
* **Formations Post-Karroo :** Formations marines crétacées, tertiaires et volcanisme quaternaire récent.

### 3. Géologie Appliquée : Matières Premières
* **L'argile :** Utilisée pour la fabrication des briques, poteries et céramiques.
* **Le calcaire :** Utilisé comme matière première pour la fabrication du ciment (cuisson du calcaire et de l'argile pour faire du clinker).
* **Le pétrole :** Formation par sédimentation de matière organique en milieu anaérobie (pièges structuraux comme à Bemolanga/Tsimiroro).

### 4. Cartographie : Profils et Coupes
* **Carte topographique :** Représente le relief à l'aide de courbes de niveau.
* **Profil topographique :** Dessin de la coupe verticale du terrain suivant un axe donné.
* **Carte géologique :** Représente la répartition des terrains affleurants.
* **Coupe géologique :** Représente la structure souterraine des roches en tenant compte de la chronologie des couches, des plis et des failles.`
  },
  {
    id: "philo-etat-liberte",
    title: "Philosophie : Programme Terminales A, C, D",
    subject: "Philosophie",
    summary: "Introduction à la philosophie, l'homme et la science, l'homme et la société.",
    content: `### 1. La Nature Humaine
* **Vision sociologique :** L'homme comme être social.
* **Vision scientifique :** Réduction de l'homme à la matérialité.
* **Vision philosophique :** Être pensant, animal raisonnable, âme et corps.

### 2. Capacités Cognitives et Problèmes d'Existence
* **Capacités :** Facultés sensibles et facultés intellectuelles.
* **Problèmes métaphysiques :** Origine, destinée, sens de l'existence.

### 3. L'Essence de la Philosophie
* **Définition :** Exigence de la vérité, réflexion sur l'homme et le monde, interrogation sur le réel.
* **Méthodes et domaines :** Interrogation, argumentation philosophique, pluralité des philosophies.
* **Valeur et nécessité :** Intimité entre l'homme et la philosophie, nécessité de la réflexion philosophique pour se situer dans le monde.`
  },
  {
    id: "hist-decol-madagascar",
    title: "Histoire : Relations Internationales & Décolonisation (Terminale C)",
    subject: "Histoire-Géographie",
    summary: "Relations internationales de 1945 à nos jours (Guerre froide, Détente) et décolonisation de Madagascar.",
    content: `### 1. Relations Internationales de 1945 à nos jours
* **Bilan de la 2ème Guerre Mondiale :** Déclin de l'Europe, montée des nouvelles puissances (USA, URSS), création de l'ONU.
* **Guerre Froide (1947-1962) :** Bipolarisation du monde, organisations économiques (Plan Marshall, CAEM), crises majeures (Berlin, Corée, Indochine, Cuba).
* **La Détente (1962-1975) et la Crise (1975-1985).**
* **La nouvelle détente depuis 1985 :** Gorbatchev, effondrement du communisme en Europe de l'Est, éclatements de l'URSS.

### 2. La Décolonisation et l'émergence du Tiers Monde
* **Origines :** Facteurs internes (inégalités sociales, réaction nationaliste) et externes (affaiblissement des métropoles, Charte des Nations Unies).
* **Étapes :** Asie, Afrique.
* **Tiers Monde :** Apparition sur la scène internationale, mouvement des non-alignés (Bandung).

### 3. Madagascar depuis 1945
* **Marche vers l'indépendance :** Insurrection de 1947, Loi Cadre de 1956, République au sein de la Communauté (1958), Indépendance (1960).
* **Institutions :** Ière, IIème et IIIème Républiques.
* **Économie :** Périodes coloniale, Ière, IIème et IIIème Républiques.`
  },
  {
    id: "geo-economie-madagascar",
    title: "Géographie : L'Économie de Madagascar",
    subject: "Histoire-Géographie",
    summary: "Contrastes et inégalités mondiales (Nord/Sud) et réalités économiques de Madagascar.",
    content: `### 1. Le Monde actuel : Contrastes et inégalités
* **Nouvel ordre mondial :** Fin de la bipolarisation, monde multipolaire.
* **Nord vs Sud :** Critères de développement (PIB, IDH), échanges internationaux, formes de domination (commerciale, technologique).
* **Centres de puissance :** USA (suprématie), Japon, Union Européenne.

### 2. Madagascar : Pays en voie de développement
* **Indicateurs :** Démographiques, sociaux, économiques.
* **Agriculture :** Diversifiée mais fragile (riz, vanille, café), blocages (infrastructures, climat).
* **Secteurs :** Artisanat, industrie (zones franches), services (tourisme).
* **Rôle régional :** Madagascar dans la Commission de l'Océan Indien (COI).`
  },
  {
    id: "francais-methode-bacc",
    title: "Français : Dissertation & Commentaire Littéraire",
    subject: "Français",
    summary: "La méthodologie pas à pas pour réussir l'épreuve de français au Baccalauréat de Madagascar : dissertation littéraire, résumé de texte et questions de compréhension.",
    content: `### 1. L'Épreuve de Français au Bacc : Structure Générale
L'épreuve propose généralement deux sujets au choix :
* **Sujet I : Analyse de texte et écriture d'invention / résumé.** Comprend des questions de compréhension de texte, de vocabulaire, de grammaire et un résumé de texte suivi d'une dissertation ou discussion sur le thème.
* **Sujet II : Dissertation littéraire générale.** Un sujet portant sur la littérature, la poésie, le roman ou le théâtre.

### 2. Méthode pas à pas de la Dissertation Littéraire
La dissertation littéraire est un exercice de démonstration logique s'appuyant sur des œuvres d'auteurs français et francophones (notamment malgaches comme Jean-Joseph Rabearivelo, Jacques Rabemananjara ou Flavien Ranaivo).

#### A. L'analyse du sujet et la problématique
1. **Repérer les mots-clés :** Identifier le thème littéraire (ex: la poésie comme expression de la douleur, le roman comme miroir de la société).
2. **Dégager le présupposé :** Que sous-entend le sujet ?
3. **Poser la problématique :** Formuler la question centrale sous forme interrogative directe ou indirecte.

#### B. La structure du plan dialectique (le plus courant)
* **Thèse (I) :** Validation de l'opinion proposée par le sujet avec des arguments littéraires précis.
* **Antithèse (II) :** Nuance ou limitation de la thèse en montrant d'autres aspects (ex: la poésie n'est pas qu'un chant de tristesse, elle est aussi combat social ou jeu de langage).
* **Synthèse (III) :** Dépassement de la contradiction. Conciliation des points de vue en montrant la richesse globale de la création littéraire.

#### C. L'importance de l'exemple littéraire
Chaque argument doit être illustré par une citation ou une référence précise à une œuvre.
* *Exemple :* "La poésie est un cri d'exil et d'engagement patriotique." $\\implies$ Citer Jacques Rabemananjara dans *Sur les marches du soir* ou Aimé Césaire dans *Cahier d'un retour au pays natal*.

### 3. Méthode du Résumé de texte et Commentaire
1. **Le résumé :** Réduire le texte au quart de sa longueur initiale (avec une marge de 10 % autorisée). Il faut reformuler fidèlement sans recopier des phrases entières et respecter le système d'énonciation.
2. **Le commentaire composé :** Expliquer le texte de manière ordonnée en dégageant ses centres d'intérêt littéraires et stylistiques.`
  },
  {
    id: "malagasy-terminale-c",
    title: "Malagasy : Ny Malagasy sy ny fiheverany ny tontolony (Terminale C/D)",
    subject: "Malagasy",
    summary: "Ny fiheveran'ny Malagasy ny olombelona sy ny fifandraisany, ny tsiny sy ny tody, ny finoana ny hery tsy hita, ary ny fitsimbinana ny aina.",
    content: `### 1. Ny amin'ny olombelona sy ny fifandraisany
* **Ny fanahy :** Ny hasina, ny saina, ny eritreritra, ny aina, ny hery.
* **Ny lanjan'ny "Fanahy" :** Eo amin'ny fampivoarana ny maha-olona.

### 2. Ny Tsiny sy ny Tody
* **Famaritana :** Ny toetrany sy ny loharanony.
* **Ny finoana :** Ny finoana ny tsiny sy ny tody manoloana ny fampandrosoana.

### 3. Ny finoana sy ny hery tsy hita
* **Ny anjara, ny lahatra, ny vintana ary ny tendry :** Famaritana ny toetrany sy ny lanjany.
* **Andriamanitra, ny Zanahary ary ny Razana :** Ny toetrany sy ny lanjan'ny finoana azy.

### 4. Ny fitsimbinana ny aina sy ny faharetan'ny taranaka
* **Fototra :** Ny tahotra ny aina sy ny hampaharitra ny "karazana".`
  },
  {
    id: "english-grammar-essay",
    title: "Anglais : Grammar & Essay Writing for Bacc",
    subject: "Anglais",
    summary: "Mastering essential grammar tools (Active/Passive voice, Conditionals) and the structure of essay writing for the Madagascar Baccalaureate English exam.",
    content: `### 1. Active and Passive Voice
The passive voice is very frequently tested in the English paper of the Bacc Madagascar.
* **Rule:** Subject + Verb + Object (Active) $\\implies$ Object + **to be (in the tense of the active verb)** + **Past Participle** + by + Subject (Passive).
* **Examples:**
  * *Present Simple:* "The student writes an essay." $\\implies$ "An essay **is written** by the student."
  * *Past Simple:* "The President signed the law." $\\implies$ "The law **was signed** by the President."
  * *Present Perfect:* "Scientists have discovered a new species." $\\implies$ "A new species **has been discovered** by scientists."

### 2. Conditionals (The If-Clauses)
Conditionals express conditions and their results. There are three main types:
* **Type 1 (Real/Possible in the present/future) :**
  $$\\text{If + Present Simple} \\implies \\text{Will + Verb (Base form)}$$
  * *Example:* "If you study hard, you **will pass** your Bacc."
* **Type 2 (Unreal/Imaginary in the present) :**
  $$\\text{If + Past Simple} \\implies \\text{Would + Verb (Base form)}$$
  * *Example:* "If I **were** rich, I would travel around Madagascar." (Note: "were" is used for all pronouns in Type 2 conditional).
* **Type 3 (Unreal/Regret in the past) :**
  $$\\text{If + Past Perfect} \\implies \\text{Would have + Past Participle}$$
  * *Example:* "If she **had revised** her lessons, she **would have passed** the exam."

### 3. Essay Writing Structure
The writing section usually asks you to write an essay of about 120 to 150 words on a topic such as environmental protection, tourism, or the importance of technology for education in Madagascar.

#### A. Introduction
* **Hook:** Give general information about the topic.
* **Thesis Statement:** Express your opinion or state the main purpose of your essay.

#### B. Body Paragraphs (usually 2)
* **Paragraph 1:** Develop your first point with arguments and examples (use link words: *firstly, moreover, in addition*).
* **Paragraph 2:** Develop your second or opposing point (use contrast link words: *however, on the other hand, whereas*).

#### C. Conclusion
* **Summary:** Summarize your main points.

### 4. Transition Words to Memorize
* **Addition:** *Furthermore, Besides, Also, Moreover*
* **Contrast:** *However, Although, Nevertheless, On the one hand... on the other hand*
* **Cause & Effect:** *Because, Consequently, As a result, Therefore*
* **Conclusion:** *To sum up, In conclusion, All in all*`
  }
];

export const CURRICULUM_DATA: CurriculumChapter[] = [
  {
    id: "curr-math-c-1",
    title: "Mathématiques : Arithmétique & Structures (Terminale C)",
    subject: "Mathématiques",
    notions: ["Division euclidienne", "Congruences modulo n", "Sous-groupes de Z et congruences", "Anneau Z/nZ", "PGCD & PPCM", "Théorème de Bézout", "Théorème de Gauss", "Nombres premiers", "Équations diophantiennes ax+by=c"],
    skills: ["Calculer le quotient et le reste d'une division", "Résoudre des problèmes à l'aide des congruences", "Déterminer le PGCD par l'algorithme d'Euclide", "Démontrer que deux nombres sont premiers entre eux", "Résoudre une équation du premier degré dans Z x Z"]
  },
  {
    id: "curr-math-complexes",
    title: "Mathématiques : Nombres Complexes & Trigonométrie (Tle C/D)",
    subject: "Mathématiques",
    notions: ["Forme algébrique", "Conjugué et module", "Interprétation géométrique", "Forme trigonométrique et exponentielle", "Formules d'Euler et de Moivre", "Linéarisation de polynômes", "Équations du second degré dans C", "Racines n-ièmes d'un complexe"],
    skills: ["Effectuer toutes les opérations dans C", "Déterminer le module et un argument d'un complexe", "Linéariser des expressions trigonométriques", "Résoudre des équations à coefficients complexes", "Déterminer l'angle de deux vecteurs dont on connaît les affixes"]
  },
  {
    id: "curr-math-analyse",
    title: "Mathématiques : Analyse (Limites, Continuité, Dérivée, Primitives)",
    subject: "Mathématiques",
    notions: ["Limites de fonctions", "Théorèmes de comparaison et de la composée", "Continuité sur un intervalle", "Théorème des Valeurs Intermédiaires (TVI)", "Bijection et fonction réciproque", "Dérivée d'une composée et d'une réciproque", "Inégalités des accroissements finis", "Primitives de fonctionsusuelles et de types composés (u'/u, u'e^u)"],
    skills: ["Calculer des limites sans utiliser des dérivées", "Appliquer le TVI pour justifier de l'existence d'une solution", "Encadrer f(b)-f(a) par le théorème des accroissements finis", "Déterminer l'ensemble des primitives d'une fonction continue"]
  },
  {
    id: "curr-math-log-exp",
    title: "Mathématiques : Fonctions Logarithme & Exponentielle",
    subject: "Mathématiques",
    notions: ["Logarithme népérien et décimal", "Limites de référence et croissances comparées", "Fonction exponentielle népérienne", "Fonctions puissances x^a", "Équations, inéquations et systèmes de type ln ou exp"],
    skills: ["Étudier et représenter graphiquement les fonctions ln et exp", "Utiliser les croissances comparées pour calculer des limites complexes", "Résoudre des équations et inéquations logarithmiques et exponentielles"]
  },
  {
    id: "curr-math-integrale",
    title: "Mathématiques : Calcul Intégral & Équations Différentielles",
    subject: "Mathématiques",
    notions: ["Définition d'une intégrale", "Propriétés (Chasles, positivité, linéarité, valeur moyenne)", "Intégration par parties (IPP)", "Intégration par changement de variable affine", "Méthode des rectangles pour valeur approchée", "Équations différentielles y'+ay=0 et y''+ay'+by=0"],
    skills: ["Calculer des intégrales par primitives ou IPP", "Calculer l'aire d'une portion de plan délimitée par des courbes", "Déterminer la solution d'une équation différentielle vérifiant des conditions initiales"]
  },
  {
    id: "curr-math-suites",
    title: "Mathématiques : Suites Numériques",
    subject: "Mathématiques",
    notions: ["Raisonnement par récurrence", "Suites monotones, majorées, minorées, bornées", "Suites convergentes et divergentes", "Théorème de convergence monotone", "Suites arithmétiques et géométriques (révisions)", "Suites récurrentes du type u_{n+1}=f(u_n)"],
    skills: ["Démontrer une propriété par récurrence", "Étudier le sens de variation et la convergence d'une suite", "Déterminer graphiquement ou par le calcul la limite d'une suite récurrente"]
  },
  {
    id: "curr-math-probabilites",
    title: "Mathématiques : Dénombrement, Probabilités & Variables Aléatoires",
    subject: "Mathématiques",
    notions: ["Analyse combinatoire (permutations, arrangements, combinaisons)", "Formule du binôme de Newton et triangle de Pascal", "Notion de probabilité et équiprobabilité", "Probabilité conditionnelle et indépendance d'événements", "Formule des probabilités totales", "Schéma de Bernoulli et loi binomiale", "Variables aléatoires, espérance, variance et écart-type", "Séries statistiques à une et deux variables (covariance, droite de régression, corrélation)"],
    skills: ["Dénombrer des tirages complexes", "Construire et exploiter un arbre pondéré de probabilités", "Calculer des probabilités binomiales", "Déterminer la loi de probabilité d'une variable aléatoire", "Calculer une covariance et déterminer l'équation de la droite d'ajustement affine"]
  },
  {
    id: "curr-math-geometrie",
    title: "Mathématiques : Géométrie (Barycentres, Isométries, Coniques)",
    subject: "Mathématiques",
    notions: ["Barycentre de n points pondérés", "Lignes de niveau", "Applications affines et expressions analytiques", "Isométries planes (translations, rotations, symétries)", "Similitudes planes directes et inverses", "Coniques (parabole, ellipse, hyperbole, foyer, directrice, excentricité)", "Géométrie dans l'espace (transformations de l'espace)"],
    skills: ["Construire le barycentre de points pondérés", "Écrire l'expression analytique et complexe d'une transformation", "Déterminer les éléments géométriques d'une similitude d'après son expression complexe", "Déterminer la nature et les éléments caractéristiques d'une conique d'après son équation réduite"]
  },
  {
    id: "curr-phys-mecanique",
    title: "Physique-Chimie : Mécanique (Lois de Newton, Satellites & Oscillateurs)",
    subject: "Physique-Chimie",
    notions: ["Vecteurs position, vitesse, accélération dans le repère de Frenet", "Deuxième loi de Newton (PFD)", "Chute libre et mouvement de projectiles dans un champ uniforme g ou E", "Mouvement circulaire des satellites et lois de Kepler", "Théorème de l'accélération angulaire", "Moments d'inertie de solides simples (disque, sphère, tige)", "Oscillateurs harmoniques non amortis de translation et de rotation", "Conservation de l'énergie mécanique, énergie potentielle élastique et de torsion"],
    skills: ["Établir les équations horaires et de la trajectoire d'un projectile", "Déterminer l'expression de la vitesse d'un satellite et de sa période de révolution", "Appliquer le théorème de l'accélération angulaire pour un solide en rotation", "Établir l'équation différentielle du mouvement d'un oscillateur harmonique"]
  },
  {
    id: "curr-phys-electromagnetisme",
    title: "Physique-Chimie : Électromagnétisme & Oscillations Électriques",
    subject: "Physique-Chimie",
    notions: ["Champ magnétique B créé par un courant rectiligne, circulaire ou solénoïde", "Force de Lorentz", "Force de Laplace", "Induction et f.e.m. d'auto-induction e=-L di/dt", "Loi d'Ohm pour une bobine inductive u=Ri+L di/dt", "Énergie magnétique emmagasinée", "Équation différentielle du circuit LC et conservation d'énergie", "Circuit RLC série en régime sinusoïdal forcé, impédance, résonance d'intensité, puissance moyenne"],
    skills: ["Déterminer le sens du vecteur champ magnétique par la règle d'Ampère", "Étudier le mouvement d'une particule chargée dans un champ B uniforme", "Calculer une f.e.m. d'auto-induction et l'énergie d'une bobine", "Résoudre l'équation différentielle d'un circuit LC", "Calculer l'impédance et la puissance moyenne dans un circuit RLC"]
  },
  {
    id: "curr-phys-optique-atome",
    title: "Physique-Chimie : Optique, Ondes & Physique Nucléaire",
    subject: "Physique-Chimie",
    notions: ["Ondes progressives sinusoïdales, célérité, longueur d'onde, double périodicité", "Ondes sonores et célérité dans un gaz parfait", "Interférences lumineuses, fentes d'Young, interfrange i", "Lentilles minces convergentes et divergentes, vergence C=1/f", "Formules de conjugaison et de grandissement", "Structure du noyau, défaut de masse, relation d'Einstein E=mc^2", "Radioactivité alpha, beta, gamma, loi de décroissance radioactive, période, activité", "Fission et fusion nucléaire"],
    skills: ["Calculer l'interfrange d'un dispositif d'interférence", "Construire graphiquement l'image d'un objet par une lentille", "Appliquer les formules de conjugaison et de grandissement", "Écrire les équations-bilans de réactions nucléaires", "Calculer l'énergie de liaison d'un noyau et l'activité d'une source"]
  },
  {
    id: "curr-chem-organique",
    title: "Physique-Chimie : Chimie Organique",
    subject: "Physique-Chimie",
    notions: ["Isomérie de constitution, configuration (Z/E) et conformation", " Newman et représentations spatiales", "Chiralité, carbone asymétrique, énantiomères", "Nomenclature, structure et classes des alcools", "Hydratation des alcènes (Markovnikov) et déshydratation des alcools", "Oxydation ménagée des alcools, aldéhydes et cétones, tests d'identification", "Estérification et saponification des esters (fabrication des savons)"],
    skills: ["Identifier des énantiomères et dessiner des conformations d'éthane", "Nommer des alcools, aldéhydes, cétones, acides et esters", "Écrire les équations-bilans de réactions d'estérification et de saponification", "Écrire les demi-réactions d'oxydoréduction pour les tests d'aldéhydes"]
  },
  {
    id: "curr-chem-generale",
    title: "Physique-Chimie : Chimie Générale (Équilibres Acide-Base)",
    subject: "Physique-Chimie",
    notions: ["Autoprotolyse de l'eau, produit ionique Ke, pH de l'eau pure", "Solutions d'acide chlorhydrique (HCl) et d'hydroxyde de sodium (NaOH)", "pH des solutions d'acides forts et de bases fortes", "Couples acide-base faibles, constante d'acidité Ka et pKa", "Relation d'Henderson, diagramme de prédominance et indicateurs colorés", "Réactions acide-base (dosage, courbe de variation du pH, équivalence, effet tampon)"],
    skills: ["Calculer le pH de solutions d'acides ou bases fortes de concentration connue", "Exploiter la relation pH/pKa pour déterminer l'espèce prédominante", "Calculer une concentration inconnue par l'équation d'équivalence C_A V_A = C_B V_B", "Déterminer le point d'équivalence par la méthode des tangentes"]
  },
  {
    id: "curr-bio-moleculaire",
    title: "Sciences Naturelles : Biologie Moléculaire & Synthèse Protéique",
    subject: "Sciences Naturelles",
    notions: ["Structure en double hélice de l'ADN (Watson & Crick)", "Complémentarité des bases nucléotidiques", "Mécanisme de réplication semi-conservative", "Transcription de l'ADN en ARNm par l'ARN polymérase", "Traduction de l'ARNm par le ribosome, code génétique, codon stop"],
    skills: ["Représenter schématiquement un fragment d'ADN ou d'ARN", "Expliquer la réplication conforme de l'ADN lors de la mitose", "Déterminer la séquence d'acides aminés d'une protéine à partir de l'ADN à l'aide du code génétique"]
  },
  {
    id: "curr-bio-reproduction",
    title: "Sciences Naturelles : Reproduction Humaine & Maîtrise",
    subject: "Sciences Naturelles",
    notions: ["Méiose (divisions réductionnelle et équationnelle)", "Spermatogénèse et ovogénèse", "Régulation par l'axe hypothalamo-hypophysaire (LH, FSH, GnRH)", "Rétrocontrôles ovariens (œstrogènes, progestérone)", "Fécondation, nidation et développement embryonnaire (placenta, lactation)", "Contraception (hormonale, d'urgence) et PMA (insémination, FIVETE)"],
    skills: ["Décrire et schématiser les étapes de la méiose", "Analyser des courbes hormonales de cycles sexuels", "Expliquer le mécanisme de rétrocontrôle hormonal", "Comparer l'ovogénèse et la spermatogénèse"]
  },
  {
    id: "curr-bio-genetique",
    title: "Sciences Naturelles : Hérédité & Génétique",
    subject: "Sciences Naturelles",
    notions: ["Monohybridisme et lois de Mendel (uniformité de F1, ségrégation)", "Croisement-test (backcross)", "Dihybridisme, ségrégation indépendante ou liaison de caractères", "Brassages inter et intrachromosomiques (crossing-over)", "Carte factorielle de répartition des gènes", "Hérédité liée au sexe (hémophilie, daltonisme)", "Hérédité humaine, groupes sanguins, rhésus", "Anomalies du caryotype (trisomies, syndrome de Turner, Klinefelter)"],
    skills: ["Interpréter les résultats de croisements et dresser un échiquier de croisement", "Distinguer des gènes indépendants de gènes liés", "Établir une carte factorielle simple à partir de taux de recombinaison", "Analyser des arbres généalogiques humains de transmission de maladies"]
  },
  {
    id: "curr-bio-physio-immuno",
    title: "Sciences Naturelles : Physiologie Nerveuse & Immunologie",
    subject: "Sciences Naturelles",
    notions: ["Tissu nerveux, substance grise et blanche", "Neurone, excitabilité, potentiel de repos et potentiel d'action", "Influx nerveux, conductibilité et transmission synaptique", "Organes lymphoïdes primaires et secondaires, cellules immunocompétentes", "Antigènes, anticorps, complexes immuns", "Réponse immunitaire spécifique (à médiation cellulaire et humorale)", "Allergies, maladies auto-immunes, SIDA et VIH"],
    skills: ["Calculer la vitesse de propagation de l'influx nerveux", "Expliquer la genèse et la propagation du potentiel d'action", "Schématiser une synapse et décrire la transmission chimique", "Décrire les étapes de la réponse immunitaire spécifique humorale et cellulaire"]
  },
  {
    id: "curr-geo-madagascar",
    title: "Sciences Naturelles : Géologie de Madagascar & Cartographie",
    subject: "Sciences Naturelles",
    notions: ["Socle cristallin malgache précambrien (système Antongilien, Andriamena-Manampotsy, série SQC)", "Ligne Bongolava-Ranotsara", "Système Androyen, séries d'Ampanihy et Vohibory", "Formations intrusives (massif de Bevato, Ambohiby, Antampombato)", "Couvertures sédimentaires de Madagascar, groupe du Karroo (Sakoa, Sakamena, Isalo)", "Géologie appliquée (argiles, calcaire, cimenterie, formation de gisements de pétrole et houille)", "Cartographie, lecture de cartes topographiques et géologiques, profils et coupes de Madagascar"],
    skills: ["Repérer sur une carte géologique simplifiée le socle cristallin et les bassins sédimentaires de Madagascar", "Expliquer la formation de la houille ou du pétrole à Madagascar", "Dresser un profil topographique à partir d'une carte topographique de Madagascar", "Réaliser une coupe géologique simple montrant des failles ou des plis"]
  },
  {
    id: "curr-philo-general",
    title: "Philosophie : L'Homme, la Société, l'État et la Conscience (A/C/D)",
    subject: "Philosophie",
    notions: ["La Conscience et l'Inconscient", "Autrui et la Société", "L'État, la Justice et la Loi", "La Liberté et le Devoir", "La Vérité et la Science", "Le Travail et la Technique"],
    skills: ["Problématiser un sujet de dissertation", "Rédiger une introduction philosophique", "Mener une discussion antithétique ordonnée", "Analyser un texte philosophique d'auteur"]
  },
  {
    id: "curr-hist-geo-general",
    title: "Histoire-Géographie : Madagascar, la Décolonisation et la Mondialisation",
    subject: "Histoire-Géographie",
    notions: ["La Seconde Guerre Mondiale", "La décolonisation en Asie et en Afrique", "La décolonisation et l'histoire de Madagascar (1947, 1960)", "Les relations internationales depuis 1945", "Le relief, le climat et la population de Madagascar", "L'économie de Madagascar (secteurs primaire, secondaire, tertiaire)", "La mondialisation et le développement"],
    skills: ["Analyser et commenter un document d'histoire ou de géographie", "Construire un croquis de géographie de Madagascar", "Rédiger une dissertation d'histoire-géographie structurée"]
  },
  {
    id: "curr-francais-bacc",
    title: "Français : Dissertation Littéraire et Résumé de Texte",
    subject: "Français",
    notions: ["La poésie engagée, lyrique et formelle", "Le roman, miroir social ou œuvre d'art", "Le théâtre, conflit et représentation", "Le résumé de texte et l'analyse de vocabulaire", "La grammaire et la stylistique des textes littéraires"],
    skills: ["Résumer un texte au quart de sa longueur", "Rédiger une dissertation littéraire construite", "Expliquer et commenter des procédés stylistiques (métaphores, antithèses...)"]
  },
  {
    id: "curr-malagasy-bacc",
    title: "Malagasy : Ny Teny, ny Kolontsaina sy ny Famakafakan-kevitra",
    subject: "Malagasy",
    notions: ["Ny Fihavanana malagasy", "Ny kolontsaina, ny tany sy ny razana", "Ny tantaran'ny asa soratra malagasy (Ny ntaolo, ny mpitolona, ny mpanoratra ankehitriny)", "Ny ohabolana sy ny fomba fiteny", "Ny fiteny malagasy sy ny fivoarany"],
    skills: ["Mamakafaka lohahevitra (Famakafakan-kevitra)", "Mampiasa ohabolana mifanaraka amin'ny laza adina", "Manadihady lahatsoratra tsotra sy asa soratra malagasy"]
  },
  {
    id: "curr-english-bacc",
    title: "English: Grammar, Reading Comprehension & Writing",
    subject: "Anglais",
    notions: ["Verb Tenses (Present, Past, Future, Perfect aspects)", "Active and Passive Voice", "Conditionals (Types 1, 2, and 3)", "Reported Speech and Indirect Questions", "Reading Comprehension and Vocabulary in Context", "Guided and Free Writing Essays"],
    skills: ["Transform sentences from active to passive voice and vice-versa", "Apply correct conditional clauses based on context", "Write an essay with proper paragraph structure and linking words", "Extract and analyze information from a text in English"]
  }
];
