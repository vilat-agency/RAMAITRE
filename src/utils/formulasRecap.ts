export function getFormulasRecapMarkdown(): string {
  return `# FICHE RÉCAPITULATIVE DES FORMULES DE TERMINALE
---
## I.- MATHÉMATIQUES (Analyse, complexes et trigonométrie)

### 1.- Dérivées et primitives composées
Soit $u$ une fonction dérivable sur un intervalle $I$ de $\\mathbb{R}$ :

$$ (u^n)' = n \\cdot u^{n-1} \\cdot u' $$

$$ (\\ln u)' = \\frac{u'}{u} $$

$$ (e^u)' = u' \\cdot e^u $$

---
### 2.- Intégration par parties (IPP)
Pour toutes fonctions $u$ et $v$ dérivables à dérivées continues sur un intervalle $[a, b]$ :

$$ \\int_{a}^{b} u(x) v'(x) \\, dx = \\left[ u(x) v(x) \\right]_{a}^{b} - \\int_{a}^{b} u'(x) v(x) \\, dx $$

### 3.- Forme complexe exponentielle
Représentation géométrique d'un nombre complexe de module $r = |z|$ et d'argument $\\theta = \\arg(z)$ :

$$ z = r \\cdot e^{i\\theta} = r \\left( \\cos\\theta + i \\sin\\theta \\right) $$

### 4.- Relations d'Euler
Lien d'équivalence entre fonctions trigonométriques et exponentielles complexes :

$$ \\cos\\theta = \\frac{e^{i\\theta} + e^{-i\\theta}}{2} $$

$$ \\sin\\theta = \\frac{e^{i\\theta} - e^{-i\\theta}}{2} $$

### 5.- Équation de la tangente
Équation cartésienne de la tangente à la courbe de la fonction $f$ au point d'abscisse $a$ :

$$ y = f'(a)(x - a) + f(a) $$

---
## I bis.- ARITHMÉTIQUE, PROBABILITÉS & STATISTIQUES (Terminale C/D)

### 1.- Bézout et Gauss
$$ a \\wedge b = 1 \\iff \\exists (u,v) \\in \\mathbb{Z}^2,\\ au + bv = 1 $$

Relation PGCD-PPCM : $$ (a \\wedge b) \\times (a \\vee b) = |ab| $$

### 2.- Dénombrement
$$ A_n^k = \\frac{n!}{(n-k)!} \\qquad \\binom{n}{k} = \\frac{n!}{k!(n-k)!} $$

### 3.- Loi binomiale $\\mathcal{B}(n,p)$
$$ P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k} \\qquad E(X) = np \\qquad V(X) = np(1-p) $$

### 4.- Ajustement affine (moindres carrés)
$$ a = \\frac{\\text{cov}(x,y)}{V(x)} \\qquad b = \\bar{y} - a\\bar{x} \\qquad r = \\frac{\\text{cov}(x,y)}{\\sigma(x)\\sigma(y)} $$

---
## II.- PHYSIQUE-CHIMIE (Mécanique, circuits RC/RL et pH)

### 1.- Deuxième loi de Newton (PFD)
Dans un référentiel galiléen, la somme des forces extérieures appliquées à un système de masse $m$ constante est :

$$ \\sum \\vec{F}_{\\text{ext}} = m \\cdot \\vec{a} $$

### 2.- Énergie mécanique d'un système
Somme de l'énergie cinétique $E_c$ et de l'énergie potentielle $E_p$ :

$$ E_m = E_c + E_p = \\frac{1}{2} m v^2 + m g h $$

---
### 3.- Électricité (Constante de temps & Bobine RL)
Constante de temps caractéristique de charge d'un dipôle $RC$ :

$$ \\tau = R \\cdot C $$

Tension électrique aux bornes d'une bobine d'induction $L$ et de résistance interne $r$ :

$$ u_L(t) = L \\cdot \\frac{di}{dt} + r \\cdot i $$

### 4.- Oscillations libres (Pendule élastique)
Période propre $T_0$ d'un système solide-ressort non amorti :

$$ T_0 = 2\\pi \\sqrt{\\frac{m}{k}} $$

### 4 bis.- Satellites et lois de Kepler
Pour un satellite en orbite circulaire de rayon $r$ autour d'un astre de masse $M$ :

$$ v = \\sqrt{\\frac{GM}{r}} \\qquad T = 2\\pi\\sqrt{\\frac{r^3}{GM}} \\qquad \\frac{T^2}{r^3} = \\frac{4\\pi^2}{GM} $$

### 4 ter.- Circuit RLC série : résonance d'intensité
$$ Z = \\sqrt{R^2 + \\left(L\\omega - \\frac{1}{C\\omega}\\right)^2} \\qquad \\text{Résonance : } \\omega = \\omega_0 = \\frac{1}{\\sqrt{LC}} \\ (Z_{min}=R) $$

### 4 quater.- Radioactivité
$$ N(t) = N_0\\, e^{-\\lambda t} \\qquad t_{1/2} = \\frac{\\ln 2}{\\lambda} \\qquad E_l = |\\Delta m| \\cdot c^2 $$

---
### 5.- Chimie des solutions aqueuses (Échelles de pH)
Mesure de l'activité des ions hydronium $\\text{H}_3\\text{O}^+$ en solution diluée :

$$ \\text{pH} = -\\log \\left[ \\text{H}_3\\text{O}^+ \\right] $$

$$ \\left[ \\text{H}_3\\text{O}^+ \\right] = 10^{-\\text{pH}} $$

Constante d'acidité $K_a$ d'un couple acide/base $\\text{AH}/\\text{A}^-$ :

$$ K_a = \\frac{\\left[ \\text{H}_3\\text{O}^+ \\right]_{\\text{éq}} \\cdot \\left[ \\text{A}^- \\right]_{\\text{éq}}}{\\left[ \\text{AH} \\right]_{\\text{éq}}} $$

Relation de Henderson-Hasselbalch :

$$ \\text{pH} = \\text{p}K_a + \\log \\left( \\frac{\\left[ \\text{A}^- \\right]}{\\left[ \\text{AH} \\right]} \\right) $$

### 6.- Autoprotolyse de l'eau
Produit ionique de l'eau pure à $25^\\circ\\text{C}$ :

$$ K_e = \\left[ \\text{H}_3\\text{O}^+ \\right] \\cdot \\left[ \\text{HO}^- \\right] = 10^{-14} $$

### 7.- Vitesse volumique de réaction
Vitesse de transformation chimique dans un volume constant $V$ :

$$ v(t) = \\frac{1}{V} \\cdot \\frac{dx}{dt} $$
`;
}
