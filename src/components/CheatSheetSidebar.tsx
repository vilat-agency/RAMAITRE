import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, X, Search, ChevronRight, Calculator, Activity, FlaskConical, Check, Copy, HelpCircle, GraduationCap, ScrollText, Target, FileText, Layers, Compass, Dna, Languages, PenTool } from 'lucide-react';
import katex from 'katex';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { LESSONS_DATA, CURRICULUM_DATA, Lesson, CurriculumChapter } from '../data/lessonsData';

interface Formula {
  id: string;
  name: string;
  latex: string;
  explanation: string;
  useCase: string;
}

interface SubjectFormulas {
  subject: string;
  icon: React.ComponentType<any>;
  color: string;
  borderColor: string;
  bgColor: string;
  badgeColor: string;
  formulas: Formula[];
}

const FORMULAS_DATA: SubjectFormulas[] = [
  {
    subject: "Mathématiques",
    icon: Calculator,
    color: "text-emerald-700 bg-emerald-50",
    borderColor: "border-emerald-200",
    bgColor: "bg-emerald-50/45",
    badgeColor: "bg-emerald-100 text-emerald-800",
    formulas: [
      {
        id: "m1",
        name: "Dérivée de u^n",
        latex: "(u^n)' = n \\cdot u^{n-1} \\cdot u'",
        explanation: "Dérivée d'une fonction puissance composée d'une autre fonction.",
        useCase: "Utile pour calculer le sens de variation des polynômes."
      },
      {
        id: "m2",
        name: "Dérivée de ln(u)",
        latex: "(\\ln u)' = \\frac{u'}{u}",
        explanation: "Dérivée d'une fonction logarithme népérien composée.",
        useCase: "Indispensable pour étudier le comportement asymptotique de f(x)."
      },
      {
        id: "m3",
        name: "Dérivée de exp(u)",
        latex: "(e^u)' = u' \\cdot e^u",
        explanation: "Dérivée d'une fonction exponentielle composée.",
        useCase: "Modélisation de croissance et décroissance exponentielles."
      },
      {
        id: "m4",
        name: "Intégration par parties",
        latex: "\\int u \\cdot v' \\, dx = [u \\cdot v] - \\int u' \\cdot v \\, dx",
        explanation: "Méthode d'intégration pour un produit de deux fonctions continues.",
        useCase: "Calcul d'aires sous la courbe ou de valeurs moyennes."
      },
      {
        id: "m5",
        name: "Forme complexe exponentielle",
        latex: "z = r \\cdot e^{i\\theta} = r(\\cos\\theta + i\\sin\\theta)",
        explanation: "Représentation géométrique d'un nombre complexe de module r et d'argument θ.",
        useCase: "Calcul de distances, d'angles et d'isométries du plan complexe."
      },
      {
        id: "m6",
        name: "Équation de la tangente",
        latex: "y = f'(a)(x - a) + f(a)",
        explanation: "Équation cartésienne de la droite tangente à la courbe de f en x = a.",
        useCase: "Étude locale de la courbe et résolution d'approximations."
      },
      {
        id: "m7",
        name: "Relations d'Euler",
        latex: "\\cos\\theta = \\frac{e^{i\\theta} + e^{-i\\theta}}{2} \\quad \\sin\\theta = \\frac{e^{i\\theta} - e^{-i\\theta}}{2}",
        explanation: "Lien entre les fonctions trigonométriques et les exponentielles complexes.",
        useCase: "Linéarisation d'expressions trigonométriques pour l'intégration."
      }
    ]
  },
  {
    subject: "Physique",
    icon: Activity,
    color: "text-blue-700 bg-blue-50",
    borderColor: "border-blue-200",
    bgColor: "bg-blue-50/45",
    badgeColor: "bg-blue-100 text-blue-800",
    formulas: [
      {
        id: "p1",
        name: "Deuxième loi de Newton",
        latex: "\\sum \\vec{F}_{\\text{ext}} = m \\cdot \\vec{a}",
        explanation: "Principe fondamental de la dynamique : la somme des forces extérieures est égale au produit de la masse par l'accélération.",
        useCase: "Calcul de trajectoires de projectiles, satellites ou chutes libres."
      },
      {
        id: "p2",
        name: "Constante de temps RC",
        latex: "\\tau = R \\cdot C",
        explanation: "Temps caractéristique de charge ou de décharge d'un condensateur à 63%.",
        useCase: "Détermination du régime transitoire dans un circuit RC."
      },
      {
        id: "p3",
        name: "Tension aux bornes d'une bobine RL",
        latex: "u_L(t) = L \\cdot \\frac{di}{dt} + r \\cdot i",
        explanation: "Force électromotrice induite par l'auto-induction d'une bobine.",
        useCase: "Analyse des réponses de circuits RL à des échelons de tension."
      },
      {
        id: "p4",
        name: "Énergie mécanique",
        latex: "E_m = E_c + E_p = \\frac{1}{2}mv^2 + mgh",
        explanation: "Somme de l'énergie cinétique et de l'énergie potentielle de pesanteur.",
        useCase: "Conservation de l'énergie mécanique en l'absence de frottements."
      },
      {
        id: "p5",
        name: "Période propre d'un pendule élastique",
        latex: "T_0 = 2\\pi \\sqrt{\\frac{m}{k}}",
        explanation: "Durée d'une oscillation complète d'un système solide-ressort sans amortissement.",
        useCase: "Modélisation harmonique de vibrations mécaniques."
      }
    ]
  },
  {
    subject: "Chimie",
    icon: FlaskConical,
    color: "text-purple-700 bg-purple-50",
    borderColor: "border-purple-200",
    bgColor: "bg-purple-50/45",
    badgeColor: "bg-purple-100 text-purple-800",
    formulas: [
      {
        id: "c1",
        name: "Formule du pH",
        latex: "\\text{pH} = -\\log[\\text{H}_3\\text{O}^+]",
        explanation: "Mesure de l'activité des ions hydronium en solution aqueuse diluée.",
        useCase: "Classification acide/base et calcul de taux de dissociation."
      },
      {
        id: "c2",
        name: "Constante d'acidité Ka",
        latex: "K_a = \\frac{[\\text{A}^-]_{\\text{éq}} \\cdot [\\text{H}_3\\text{O}^+]_{\\text{éq}}}{[\\text{AH}]_{\\text{éq}}}",
        explanation: "Constante d'équilibre thermodynamique associée à la dissociation d'un acide.",
        useCase: "Comparaison de la force d'acides faibles en solution aqueuse."
      },
      {
        id: "c3",
        name: "Relation de Henderson-Hasselbalch",
        latex: "\\text{pH} = \\text{p}K_a + \\log\\left(\\frac{[\\text{A}^-]}{[\\text{AH}]}\\right)",
        explanation: "Relation liant le pH, le pKa et les concentrations de l'acide et de sa base conjuguée.",
        useCase: "Préparation de solutions tampons à pH contrôlé."
      },
      {
        id: "c4",
        name: "Vitesse volumique de réaction",
        latex: "v = \\frac{1}{V} \\cdot \\frac{dx}{dt}",
        explanation: "Variation temporelle de l'avancement x divisé par le volume V du milieu réactionnel.",
        useCase: "Suivi cinétique d'une transformation chimique par spectrophotométrie."
      },
      {
        id: "c5",
        name: "Produit ionique de l'eau",
        latex: "K_e = [\\text{H}_3\\text{O}^+][\\text{HO}^-] = 10^{-14}",
        explanation: "Constante d'équilibre d'auto-protolyse de l'eau pure à 25°C.",
        useCase: "Détermination de la concentration en ions hydroxyde OH⁻ connaissant le pH."
      }
    ]
  }
];

interface CheatSheetSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertFormula?: (latex: string) => void;
  onGenerateFullRecap?: () => void;
  onInsertLesson?: (lesson: Lesson) => void;
  onInsertCurriculumChapter?: (chapter: CurriculumChapter) => void;
}

function KatexFormula({ math }: { math: string }) {
  try {
    const html = katex.renderToString(math, {
      displayMode: true,
      throwOnError: false,
    });
    return (
      <div 
        className="text-slate-800 py-2 overflow-x-auto max-w-full text-center scrollbar-thin"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch (error) {
    return (
      <div className="text-center py-2 text-sm font-mono text-red-500">
        {math}
      </div>
    );
  }
}

const getSubjectBadgeStyle = (subject: string, filled = false) => {
  if (filled) {
    switch (subject) {
      case "Mathématiques": return "bg-emerald-100 text-emerald-800";
      case "Physique-Chimie": return "bg-blue-100 text-blue-800";
      case "Sciences Naturelles": return "bg-purple-100 text-purple-800";
      case "Philosophie": return "bg-amber-100 text-amber-800";
      case "Histoire-Géographie": return "bg-rose-100 text-rose-800";
      case "Français": return "bg-indigo-100 text-indigo-800";
      case "Malagasy": return "bg-orange-100 text-orange-800";
      case "Anglais": return "bg-teal-100 text-teal-800";
      default: return "bg-slate-100 text-slate-800";
    }
  } else {
    switch (subject) {
      case "Mathématiques": return "bg-emerald-50 text-emerald-700 border border-emerald-100";
      case "Physique-Chimie": return "bg-blue-50 text-blue-700 border border-blue-100";
      case "Sciences Naturelles": return "bg-purple-50 text-purple-700 border border-purple-100";
      case "Philosophie": return "bg-amber-50 text-amber-700 border border-amber-100";
      case "Histoire-Géographie": return "bg-rose-50 text-rose-700 border border-rose-100";
      case "Français": return "bg-indigo-50 text-indigo-700 border border-indigo-100";
      case "Malagasy": return "bg-orange-50 text-orange-700 border border-orange-100";
      case "Anglais": return "bg-teal-50 text-teal-700 border border-teal-100";
      default: return "bg-slate-50 text-slate-700 border border-slate-100";
    }
  }
};

export function CheatSheetSidebar({ 
  isOpen, 
  onClose, 
  onInsertFormula, 
  onGenerateFullRecap,
  onInsertLesson,
  onInsertCurriculumChapter
}: CheatSheetSidebarProps) {
  const [activeTab, setActiveTab] = useState<'formulas' | 'lessons' | 'curriculum'>('formulas');
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [checkedSkills, setCheckedSkills] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('bac_double_checked_skills');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const handleToggleSkill = (skillId: string) => {
    setCheckedSkills(prev => {
      const updated = { ...prev, [skillId]: !prev[skillId] };
      localStorage.setItem('bac_double_checked_skills', JSON.stringify(updated));
      return updated;
    });
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSubjectFilter = (subj: string | null) => {
    setActiveSubject(subj);
    setSelectedLesson(null);
  };

  // Filter formulas
  const filteredFormulas = FORMULAS_DATA.map(subjectBlock => {
    if (activeSubject) {
      if (activeSubject === "Mathématiques" && subjectBlock.subject !== "Mathématiques") return null;
      if (activeSubject === "Physique-Chimie" && (subjectBlock.subject !== "Physique" && subjectBlock.subject !== "Chimie")) return null;
      if (activeSubject === "Physique" && subjectBlock.subject !== "Physique") return null;
      if (activeSubject === "Chimie" && subjectBlock.subject !== "Chimie") return null;
    }
    const matchingFormulas = subjectBlock.formulas.filter(f => 
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.explanation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.useCase.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.latex.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (matchingFormulas.length === 0) return null;
    return { ...subjectBlock, formulas: matchingFormulas };
  }).filter(Boolean) as SubjectFormulas[];

  // Filter lessons
  const filteredLessons = LESSONS_DATA.filter(lesson => {
    if (activeSubject && lesson.subject !== activeSubject) return false;
    return (
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Filter curriculum chapters
  const filteredCurriculum = CURRICULUM_DATA.filter(chapter => {
    if (activeSubject && chapter.subject !== activeSubject) return false;
    return (
      chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chapter.notions.some(n => n.toLowerCase().includes(searchTerm.toLowerCase())) ||
      chapter.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40 lg:hidden"
          />

          {/* Retractable Sidebar Panel */}
          <motion.aside
            initial={{ x: "100%", opacity: 0.9 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.9 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-[400px] sm:w-[460px] max-w-full bg-slate-50 shadow-2xl border-l border-slate-200 z-50 flex flex-col h-full"
            id="formula-cheatsheet-sidebar"
          >
            {/* Header */}
            <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Espace Révisions</h3>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Notebook de Maths, PC & Sciences Naturelles</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-lg transition-colors focus:outline-none"
                title="Fermer le panneau"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab selection menu */}
            <div className="px-3 py-2 bg-slate-100/80 border-b border-slate-200 flex gap-1.5 shrink-0 select-none">
              <button
                onClick={() => { setActiveTab('formulas'); setSelectedLesson(null); }}
                className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'formulas'
                    ? "bg-white text-blue-700 shadow-sm border border-blue-100"
                    : "text-slate-600 hover:text-slate-800 hover:bg-white/50"
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Formules</span>
              </button>
              <button
                onClick={() => { setActiveTab('lessons'); setSelectedLesson(null); }}
                className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'lessons'
                    ? "bg-white text-blue-700 shadow-sm border border-blue-100"
                    : "text-slate-600 hover:text-slate-800 hover:bg-white/50"
                }`}
              >
                <ScrollText className="w-3.5 h-3.5" />
                <span>Notebook</span>
              </button>
              <button
                onClick={() => { setActiveTab('curriculum'); setSelectedLesson(null); }}
                className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'curriculum'
                    ? "bg-white text-blue-700 shadow-sm border border-blue-100"
                    : "text-slate-600 hover:text-slate-800 hover:bg-white/50"
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Programme</span>
              </button>
            </div>

            {/* Quick action or Lesson details sub-panel */}
            {selectedLesson ? (
              /* LESSON DETAIL VIEW PANEL */
              <div className="flex-1 flex flex-col min-h-0 bg-white">
                <div className="p-3 bg-slate-50 border-b border-slate-150 flex items-center justify-between shrink-0">
                  <button
                    onClick={() => setSelectedLesson(null)}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
                  >
                    <ChevronRight className="w-4 h-4 transform rotate-180" />
                    <span>Retour</span>
                  </button>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${getSubjectBadgeStyle(selectedLesson.subject, true)}`}>
                    {selectedLesson.subject}
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  <h4 className="text-base font-bold text-slate-900 border-b pb-2">
                    {selectedLesson.title}
                  </h4>
                  
                  {/* Markdown Content of Lesson */}
                  <div className="markdown-body text-xs text-slate-700 leading-relaxed font-sans space-y-3 prose max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm, remarkMath]}
                      rehypePlugins={[rehypeKatex]}
                    >
                      {selectedLesson.content}
                    </ReactMarkdown>
                  </div>
                </div>
                {/* Actions at bottom of Lesson view */}
                <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-2.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopy(selectedLesson.content, selectedLesson.id)}
                    className="flex-1 py-2 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-800 flex items-center justify-center gap-1.5 transition-colors bg-white"
                  >
                    {copiedId === selectedLesson.id ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span className="text-emerald-600">Texte copié</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-400" />
                        <span>Copier Cours</span>
                      </>
                    )}
                  </button>
                  {onInsertLesson && (
                    <button
                      type="button"
                      onClick={() => {
                        onInsertLesson(selectedLesson);
                      }}
                      className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow"
                    >
                      <ScrollText className="w-4 h-4 text-white" />
                      <span>Charger la leçon</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* MAIN TABS LIST VIEW */
              <>
                {/* Controls: Search and Subject Quick Filters */}
                <div className="p-4 bg-white border-b border-slate-200 space-y-3 shrink-0">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder={
                        activeTab === 'formulas' 
                          ? "Rechercher une formule, loi, concept..." 
                          : activeTab === 'lessons'
                            ? "Rechercher un cours (ex: limites, acides...)"
                            : "Rechercher un chapitre, compétence, notion..."
                      }
                      className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50 placeholder:text-slate-400"
                    />
                    {searchTerm && (
                      <button 
                        onClick={() => setSearchTerm("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                      >
                        Effacer
                      </button>
                    )}
                  </div>

                  {/* Subject Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    <button 
                      onClick={() => handleSubjectFilter(null)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                        activeSubject === null 
                          ? "bg-slate-800 text-white" 
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      Tous
                    </button>
                    <button 
                      onClick={() => handleSubjectFilter("Mathématiques")}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 transition-all ${
                        activeSubject === "Mathématiques" 
                          ? "bg-emerald-100 text-emerald-800 ring-1 ring-offset-1 ring-emerald-400" 
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      <Calculator className="w-3 h-3" />
                      <span>Maths</span>
                    </button>
                    <button 
                      onClick={() => handleSubjectFilter("Physique-Chimie")}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 transition-all ${
                        activeSubject === "Physique-Chimie" 
                          ? "bg-blue-100 text-blue-800 ring-1 ring-offset-1 ring-blue-400" 
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      <Activity className="w-3 h-3" />
                      <span>Physique-Chimie</span>
                    </button>
                    <button 
                      onClick={() => handleSubjectFilter("Sciences Naturelles")}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 transition-all ${
                        activeSubject === "Sciences Naturelles" 
                          ? "bg-purple-100 text-purple-800 ring-1 ring-offset-1 ring-purple-400" 
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      <Dna className="w-3 h-3" />
                      <span>SVT / Biologie-Géologie</span>
                    </button>
                    <button 
                      onClick={() => handleSubjectFilter("Philosophie")}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 transition-all ${
                        activeSubject === "Philosophie" 
                          ? "bg-amber-100 text-amber-800 ring-1 ring-offset-1 ring-amber-400" 
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      <ScrollText className="w-3 h-3" />
                      <span>Philosophie</span>
                    </button>
                    <button 
                      onClick={() => handleSubjectFilter("Histoire-Géographie")}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 transition-all ${
                        activeSubject === "Histoire-Géographie" 
                          ? "bg-rose-100 text-rose-800 ring-1 ring-offset-1 ring-rose-400" 
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      <Compass className="w-3 h-3" />
                      <span>Hist-Géo</span>
                    </button>
                    <button 
                      onClick={() => handleSubjectFilter("Français")}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 transition-all ${
                        activeSubject === "Français" 
                          ? "bg-indigo-100 text-indigo-800 ring-1 ring-offset-1 ring-indigo-400" 
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>Français</span>
                    </button>
                    <button 
                      onClick={() => handleSubjectFilter("Malagasy")}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 transition-all ${
                        activeSubject === "Malagasy" 
                          ? "bg-orange-100 text-orange-800 ring-1 ring-offset-1 ring-orange-400" 
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      <PenTool className="w-3 h-3" />
                      <span>Malagasy</span>
                    </button>
                    <button 
                      onClick={() => handleSubjectFilter("Anglais")}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 transition-all ${
                        activeSubject === "Anglais" 
                          ? "bg-teal-100 text-teal-800 ring-1 ring-offset-1 ring-teal-400" 
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      <Languages className="w-3 h-3" />
                      <span>Anglais</span>
                    </button>
                  </div>
                </div>

                {/* TAB 1: FORMULAS LIST */}
                {activeTab === 'formulas' && (
                  <div className="flex-1 overflow-y-auto p-4 space-y-5">
                    {onGenerateFullRecap && (
                      <div className="mb-2 shrink-0">
                        <button
                          type="button"
                          onClick={onGenerateFullRecap}
                          className="w-full py-2 px-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all hover:shadow-md focus:outline-none focus:ring-1 focus:ring-emerald-400"
                        >
                          <GraduationCap className="w-4 h-4 text-white" />
                          <span>Générer Fiche Formules Complète (Bac)</span>
                        </button>
                      </div>
                    )}

                    {filteredFormulas.length > 0 ? (
                      filteredFormulas.map(group => {
                        const Icon = group.icon;
                        return (
                          <div key={group.subject} className="space-y-2.5">
                            {/* Section header */}
                            <div className="flex items-center gap-1.5 px-1 py-0.5 border-b border-slate-200/60">
                              <Icon className={`w-4 h-4 ${group.color.split(' ')[0]}`} />
                              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">{group.subject}</h4>
                              <span className="text-[10px] text-slate-400 ml-auto font-mono">{group.formulas.length} formule(s)</span>
                            </div>

                            {/* Formula list in group */}
                            <div className="grid grid-cols-1 gap-3">
                              {group.formulas.map(formula => (
                                <div 
                                  key={formula.id} 
                                  className="p-4 bg-white border border-slate-150 rounded-xl hover:shadow-md transition-shadow flex flex-col gap-3"
                                >
                                  <div className="flex items-start justify-between">
                                    <h5 className="font-bold text-slate-800 text-xs">
                                      {formula.name}
                                    </h5>
                                    <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest font-mono">
                                      ID: {formula.id}
                                    </span>
                                  </div>

                                  {/* Beautifully Formatted KaTeX equation */}
                                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-center overflow-x-auto select-all">
                                    <KatexFormula math={formula.latex} />
                                  </div>

                                  {/* Detail explanations */}
                                  <div className="space-y-1 text-slate-600 text-[11px] leading-relaxed">
                                    <p className="flex items-start gap-1">
                                      <span className="font-bold text-slate-700 shrink-0">Loi :</span>
                                      <span>{formula.explanation}</span>
                                    </p>
                                    <p className="flex items-start gap-1 text-indigo-700 font-medium">
                                      <HelpCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-indigo-500" />
                                      <span>{formula.useCase}</span>
                                    </p>
                                  </div>

                                  {/* Action Buttons */}
                                  <div className="flex gap-2 pt-1 border-t border-slate-100 mt-1 shrink-0">
                                    <button 
                                      type="button"
                                      onClick={() => handleCopy(formula.latex, formula.id)}
                                      className="flex-1 py-1.5 border border-slate-200 hover:border-slate-300 rounded-lg text-[10px] font-bold text-slate-600 hover:text-slate-800 flex items-center justify-center gap-1.5 transition-colors"
                                    >
                                      {copiedId === formula.id ? (
                                        <>
                                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                                          <span className="text-emerald-600">Copié !</span>
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="w-3.5 h-3.5" />
                                          <span>Copier LaTeX</span>
                                        </>
                                      )}
                                    </button>
                                    
                                    {onInsertFormula && (
                                      <button 
                                        type="button"
                                        onClick={() => onInsertFormula(formula.latex)}
                                        className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold flex items-center justify-center gap-1.5 transition-colors"
                                      >
                                        <ChevronRight className="w-3.5 h-3.5" />
                                        <span>Insérer</span>
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-2">
                        <BookOpen className="w-8 h-8 text-slate-300" />
                        <p className="text-xs italic text-center">Aucune formule ne correspond à votre recherche.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: LESSONS NOTEBOOK */}
                {activeTab === 'lessons' && (
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {filteredLessons.length > 0 ? (
                      filteredLessons.map(lesson => (
                        <div 
                          key={lesson.id} 
                          className="bg-white border border-slate-150 rounded-xl p-4 hover:shadow-md transition-shadow flex flex-col gap-2.5 relative overflow-hidden"
                        >
                          <div className="flex justify-between items-start gap-2">
                            <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${getSubjectBadgeStyle(lesson.subject)}`}>
                              {lesson.subject}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Cours</span>
                          </div>
                          
                          <div>
                            <h4 className="font-bold text-slate-800 text-xs">
                              {lesson.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                              {lesson.summary}
                            </p>
                          </div>

                          <div className="flex gap-2 pt-2 border-t border-slate-100 shrink-0">
                            <button
                              type="button"
                              onClick={() => setSelectedLesson(lesson)}
                              className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-colors"
                            >
                              <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                              <span>Lire le cours</span>
                            </button>
                            
                            {onInsertLesson && (
                              <button
                                type="button"
                                onClick={() => onInsertLesson(lesson)}
                                className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-all"
                              >
                                <ChevronRight className="w-3.5 h-3.5 text-white" />
                                <span>Charger copie</span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-2">
                        <FileText className="w-8 h-8 text-slate-300" />
                        <p className="text-xs italic text-center">Aucune leçon ne correspond à votre recherche.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 3: CURRICULUM OBJECTIVES */}
                {activeTab === 'curriculum' && (
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* General explanation card */}
                    <div className="p-3.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl space-y-1 shrink-0">
                      <h4 className="text-[11px] font-bold text-blue-800 flex items-center gap-1.5">
                        <Target className="w-4 h-4 text-blue-600" />
                        <span>Progression & Programme Officiel</span>
                      </h4>
                      <p className="text-[10px] text-blue-700 leading-relaxed">
                        Cochez les compétences révisées au fur et à mesure de votre préparation au Baccalauréat.
                      </p>
                    </div>

                    {filteredCurriculum.length > 0 ? (
                      filteredCurriculum.map(chapter => {
                        // Count completed skills in this chapter
                        const chapterSkills = chapter.skills;
                        const completedInChapter = chapterSkills.filter(s => checkedSkills[`${chapter.id}-${s}`]).length;
                        const pct = chapterSkills.length > 0 ? Math.round((completedInChapter / chapterSkills.length) * 100) : 0;

                        return (
                          <div 
                            key={chapter.id} 
                            className="bg-white border border-slate-150 rounded-xl p-4 hover:shadow-md transition-shadow flex flex-col gap-3"
                          >
                            <div className="flex justify-between items-start gap-2">
                              <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${getSubjectBadgeStyle(chapter.subject)}`}>
                                {chapter.subject}
                              </span>
                              <div className="flex items-center gap-1">
                                <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${pct === 100 ? 'bg-emerald-500' : 'bg-blue-600'}`} 
                                    style={{ width: `${pct}%` }} 
                                  />
                                </div>
                                <span className="text-[9px] font-mono font-bold text-slate-500">{pct}%</span>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-bold text-slate-800 text-xs">
                                {chapter.title}
                              </h4>
                            </div>

                            {/* Notions list */}
                            <div className="space-y-1">
                              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Notions Clés :</span>
                              <div className="flex flex-wrap gap-1">
                                {chapter.notions.map((notion, idx) => (
                                  <span key={idx} className="bg-slate-50 border border-slate-100 text-slate-600 rounded px-1.5 py-0.5 text-[9px]">
                                    {notion}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Skills checklist */}
                            <div className="space-y-1.5 pt-1 border-t border-slate-100">
                              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Compétences exigibles :</span>
                              <div className="space-y-1">
                                {chapter.skills.map((skill, idx) => {
                                  const skillId = `${chapter.id}-${skill}`;
                                  const isChecked = !!checkedSkills[skillId];
                                  return (
                                    <label 
                                      key={idx}
                                      className="flex items-start gap-2 p-1.5 hover:bg-slate-50/80 rounded border border-transparent hover:border-slate-100 cursor-pointer transition-colors text-[10px] text-slate-700 leading-tight"
                                    >
                                      <input 
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => handleToggleSkill(skillId)}
                                        className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3 w-3"
                                      />
                                      <span className={isChecked ? "line-through text-slate-400" : ""}>
                                        {skill}
                                      </span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Action to insert curriculum outline or trigger exercise */}
                            {onInsertCurriculumChapter && (
                              <button
                                type="button"
                                onClick={() => onInsertCurriculumChapter(chapter)}
                                className="w-full mt-1 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-lg text-[9px] font-bold text-slate-600 flex items-center justify-center gap-1 transition-all"
                              >
                                <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                                <span>Générer un sujet sur ce chapitre</span>
                              </button>
                            )}

                          </div>
                        );
                      })
                    ) : (
                      <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-2">
                        <Compass className="w-8 h-8 text-slate-300" />
                        <p className="text-xs italic text-center">Aucun chapitre ne correspond à votre recherche.</p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Footer */}
            <div className="p-3 bg-white border-t border-slate-200 text-center shrink-0 text-[10px] text-slate-400 flex items-center justify-center gap-1">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span>Copie Double Bac IA • Programme de Terminale</span>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
