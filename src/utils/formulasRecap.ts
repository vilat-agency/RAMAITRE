export function getFormulasRecapMarkdown(): string {
  return `# FICHE RÉCAPITULATIVE DES FORMULES DE TERMINALE
---
## I.- MATHÉMATIQUES (Analyse, complexes et trigonométrie)

### 1.- Dérivées et primitives composées
Soit $u$ une fonction dérivable sur un intervalle $I$ de $\mathbb{R}$ :

$$ (u^n)' = n \cdot u^{n-1} \cdot u' $$

$$ (\ln u)' = \frac{u'}{u} $$

$$ (e^u)' = u' \cdot e^u $$

---
### 2.- Intégration par parties (IPP)
Pour toutes fonctions $u$ et $v$ dérivables à dérivées continues sur un intervalle $[a, b]$ :

$$ \int_{a}^{b} u(x) v'(x) \, dx = \left[ u(x) v(x) \right]_{a}^{b} - \int_{a}^{b} u'(x) v(x) \, dx $$

### 3.- Forme complexe exponentielle
Représentation géométrique d'un nombre complexe de module $r = |z|$ et d'argument $\theta = \arg(z)$ :

$$ z = r \cdot e^{i\theta} = r \left( \cos\theta + i \sin\theta \right) $$

### 4.- Relations d'Euler
Lien d'équivalence entre fonctions trigonométriques et exponentielles complexes :

$$ \cos\theta = \frac{e^{i\theta} + e^{-i\theta}}{2} $$

$$ \sin\theta = \frac{e^{i\theta} - e^{-i\theta}}{2} $$

### 5.- Équation de la tangente
Équation cartésienne de la tangente à la courbe de la fonction $f$ au point d'abscisse $a$ :

$$ y = f'(a)(x - a) + f(a) $$

---
## II.- PHYSIQUE-CHIMIE (Mécanique, circuits RC/RL et pH)

### 1.- Deuxième loi de Newton (PFD)
Dans un référentiel galiléen, la somme des forces extérieures appliquées à un système de masse $m$ constante est :

$$ \sum \vec{F}_{\text{ext}} = m \cdot \vec{a} $$

### 2.- Énergie mécanique d'un système
Somme de l'énergie cinétique $E_c$ et de l'énergie potentielle $E_p$ :

$$ E_m = E_c + E_p = \frac{1}{2} m v^2 + m g h $$

---
### 3.- Électricité (Constante de temps & Bobine RL)
Constante de temps caractéristique de charge d'un dipôle $RC$ :

$$ \tau = R \cdot C $$

Tension électrique aux bornes d'une bobine d'induction $L$ et de résistance interne $r$ :

$$ u_L(t) = L \cdot \frac{di}{dt} + r \cdot i $$

### 4.- Oscillations libres (Pendule élastique)
Période propre $T_0$ d'un système solide-ressort non amorti :

$$ T_0 = 2\pi \sqrt{\frac{m}{k}} $$

---
### 5.- Chimie des solutions aqueuses (Échelles de pH)
Mesure de l'activité des ions hydronium $\text{H}_3\text{O}^+$ en solution diluée :

$$ \text{pH} = -\log \left[ \text{H}_3\text{O}^+ \right] $$

$$ \left[ \text{H}_3\text{O}^+ \right] = 10^{-\text{pH}} $$

Constante d'acidité $K_a$ d'un couple acide/base $\text{AH}/\text{A}^-$ :

$$ K_a = \frac{\left[ \text{H}_3\text{O}^+ \right]_{\text{éq}} \cdot \left[ \text{A}^- \right]_{\text{éq}}}{\left[ \text{AH} \right]_{\text{éq}}} $$

Relation de Henderson-Hasselbalch :

$$ \text{pH} = \text{p}K_a + \log \left( \frac{\left[ \text{A}^- \right]}{\left[ \text{AH} \right]} \right) $$

### 6.- Autoprotolyse de l'eau
Produit ionique de l'eau pure à $25^\circ\text{C}$ :

$$ K_e = \left[ \text{H}_3\text{O}^+ \right] \cdot \left[ \text{HO}^- \right] = 10^{-14} $$

### 7.- Vitesse volumique de réaction
Vitesse de transformation chimique dans un volume constant $V$ :

$$ v(t) = \frac{1}{V} \cdot \frac{dx}{dt} $$
`;
}
