import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw'; // Add this
import 'katex/dist/katex.min.css'; // Add this
import { PenTool, Send, Loader2, BookOpen, GraduationCap, RefreshCw, Download, Upload, X, History, Maximize2, Minimize2, Moon, Sun } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { HandwritingLoader } from './components/HandwritingLoader';
import { CheatSheetSidebar } from './components/CheatSheetSidebar';
import { LexiqueTooltip } from './components/LexiqueTooltip';
import { getFormulasRecapMarkdown } from './utils/formulasRecap';
import { Lesson, CurriculumChapter } from './data/lessonsData';
import { lexique } from './data/lexique';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to apply lexique tooltips to the rendered markdown DOM
const applyLexiqueTooltips = (container: HTMLElement) => {
  const walk = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE && node.parentElement && !node.parentElement.closest('.lexique-tooltip')) {
      let text = node.nodeValue || '';
      let modified = false;
      
      for (const [term, def] of Object.entries(lexique)) {
        const regex = new RegExp(`\\b${term}\\b`, 'gi');
        if (regex.test(text)) {
          // This is a simple replacement, needs more robust implementation
          // for complex DOM manipulation.
          // For now, it's just a placeholder concept.
        }
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      for (let i = 0; i < node.childNodes.length; i++) {
        walk(node.childNodes[i]);
      }
    }
  };
  // walk(container); // This is risky for now.
};

function extractSvgs(text: string): string[] {
  if (!text) return [];
  const svgs: string[] = [];
  const regex = /<svg[\s\S]*?<\/svg>/gi;
  let match;
  while ((match = regex.exec(text)) !== null) {
    svgs.push(match[0]);
  }
  return svgs;
}

function processMarkdown(text: string): string {
  // Split by LaTeX delimiters
  const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[^$]*?\$)/g);
  return parts.map((part, index) => {
    // If it's a LaTeX block (even index), return as is
    if (index % 2 !== 0) return part;
    
    // Otherwise, apply lexique replacements
    let processed = part;
    for (const term of Object.keys(lexique)) {
      // Escape regex special characters so terms with parentheses, +, ., etc. never break the RegExp
      const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escapedTerm}\\b`, 'gi');
      processed = processed.replace(regex, `<span class="lexique-tooltip">${term}</span>`);
    }
    return processed;
  }).join('');
}

function cleanSvgCode(svgCode: string): string {
  if (!svgCode) return "";
  
  // Remove backslashes or escaping that might have leaked from markdown parsing
  let cleaned = svgCode.replace(/\\/g, "");
  
  // Define custom styles to prevent black block fills and handle backgrounds
  const styleTag = `
    <style>
      svg {
        background: transparent !important;
      }
      /* Prevent default black fill on paths, lines, and polylines if they have strokes */
      path:not([fill]), 
      polyline:not([fill]), 
      polygon:not([fill]), 
      line:not([fill]) {
        fill: none !important;
      }
      /* Avoid solid black block overlays for plots/curves that have stroke */
      path[fill="black"]:not([stroke="none"]),
      path[fill="#000"]:not([stroke="none"]),
      path[fill="#000000"]:not([stroke="none"]) {
        fill: none !important;
      }
      /* Make sure background rects don't block the millimeter paper */
      rect[fill="#ffffff"], rect[fill="white"] {
        fill: none !important;
      }
      /* Use a beautiful student ink/handwriting font for any text labels */
      text {
        font-family: 'Patrick Hand', 'Inter', sans-serif !important;
      }
    </style>
  `;
  
  const svgIndex = cleaned.toLowerCase().indexOf("<svg");
  if (svgIndex !== -1) {
    const closingBracketIndex = cleaned.indexOf(">", svgIndex);
    if (closingBracketIndex !== -1) {
      cleaned = cleaned.slice(0, closingBracketIndex + 1) + styleTag + cleaned.slice(closingBracketIndex + 1);
    }
  }
  return cleaned;
}

const SUBJECTS = [
  "Mathématiques",
  "Physique-Chimie",
  "Sciences Naturelles (SVT)",
  "Philosophie",
  "Histoire-Géographie",
  "Français",
  "Malagasy",
  "Anglais"
];

const MATH_SYMBOLS = ["x²", "x³", "ⁿ", "√", "π", "∑", "∫", "∞", "≠", "≤", "≥", "α", "β", "θ", "Δ", "½"];

export default function App() {
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [problem, setProblem] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [file, setFile] = useState<{name: string, data: string, mimeType: string} | null>(null);
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [paperStyle, setPaperStyle] = useState<'lignes' | 'millimetre'>('lignes');
  const [history, setHistory] = useState<Array<{id: string, subject: string, problem: string, result: string, date: Date}>>([]);
  const [error, setError] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const svgs = extractSvgs(result);

  const splitPages = (markdown: string): string[] => {
    if (!markdown) return [];
    return markdown.split(/(?:^|\n)---\s*(?:\n|$)/).map(p => p.trim()).filter(p => p.length > 0);
  };
  const pages = result ? splitPages(result) : [];

  const handleInsertFormula = (latexFormula: string) => {
    setProblem(prev => {
      const spacing = prev && !prev.endsWith(' ') ? ' ' : '';
      return `${prev}${spacing}${latexFormula}`;
    });
  };

  const handleInsertFormulasRecap = () => {
    const recap = getFormulasRecapMarkdown();
    setResult(recap);
    setSubject("Mathématiques");
    setPaperStyle('lignes');
    setIsSidebarOpen(false);
    setHistory(prev => [{
      id: Date.now().toString(),
      subject: "Mathématiques",
      problem: "Fiche Récapitulative des Formules de Terminale",
      result: recap,
      date: new Date()
    }, ...prev]);
  };

  const handleInsertLesson = (lesson: Lesson) => {
    setResult(lesson.content);
    let mappedSubject = lesson.subject as string;
    if (lesson.subject === "Sciences Naturelles") {
      mappedSubject = "Sciences Naturelles (SVT)";
    }
    setSubject(mappedSubject);
    setProblem(`Révision de cours : ${lesson.title}`);
    setPaperStyle('lignes');
    setIsSidebarOpen(false);
    setHistory(prev => [{
      id: Date.now().toString(),
      subject: mappedSubject,
      problem: `Cours chargé : ${lesson.title}`,
      result: lesson.content,
      date: new Date()
    }, ...prev]);
  };

  const handleInsertCurriculumChapter = (chapter: CurriculumChapter) => {
    setProblem(`Rédige un sujet de type Bac complet corrigé pour le chapitre : ${chapter.title}. Intègre des questions guidées et progressives sur les notions clés : ${chapter.notions.join(', ')}.`);
    let mappedSubject = chapter.subject as string;
    if (chapter.subject === "Sciences Naturelles") {
      mappedSubject = "Sciences Naturelles (SVT)";
    }
    setSubject(mappedSubject);
    setIsSidebarOpen(false);
  };

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      setTimeElapsed(0);
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    } else {
      setTimeElapsed(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problem.trim() && !file) return;

    setIsLoading(true);
    setError("");
    setResult("");

    try {
      const payload: any = { subject, problem };
      if (file) {
        payload.fileData = file.data;
        payload.fileMimeType = file.mimeType;
      }

      const res = await fetch("/api/solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Une erreur est survenue.");
      }

      setResult(data.result);
      setHistory(prev => [{
        id: Date.now().toString(),
        subject,
        problem: problem || (file ? `Fichier: ${file.name}` : ""),
        result: data.result,
        date: new Date()
      }, ...prev]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      const base64Url = reader.result as string;
      const base64Data = base64Url.split(',')[1];
      setFile({
        name: selected.name,
        data: base64Data,
        mimeType: selected.type
      });
    };
    reader.readAsDataURL(selected);
  };

  const insertSymbol = (sym: string) => {
    setProblem(prev => prev + sym);
  };

  const handleExportPDF = async () => {
    if (!printRef.current) return;
    setIsExporting(true);
    try {
      const { default: html2canvas } = await import('html2canvas');
      const { jsPDF } = await import('jspdf');
      
      const parseVal = (val: string, maxVal: number): number => {
        val = val.trim();
        let parsed = 0;
        if (val.endsWith('%')) {
          parsed = (parseFloat(val) / 100) * maxVal;
        } else {
          parsed = parseFloat(val);
        }
        return isNaN(parsed) ? 0 : parsed;
      };

      const oklchToRgb = (oklchStr: string): string => {
        try {
          const cleanStr = oklchStr.trim().toLowerCase();
          if (!cleanStr.startsWith('oklch')) return oklchStr;
          
          const inner = cleanStr.substring(cleanStr.indexOf('(') + 1, cleanStr.lastIndexOf(')'));
          const parts = inner.split('/');
          const colorParts = parts[0].trim().split(/[\s,]+/);
          
          if (colorParts.length < 3) return 'rgb(120, 120, 120)';
          
          const l = parseVal(colorParts[0], 1);
          const c = parseVal(colorParts[1], 1);
          let hStr = colorParts[2];
          if (hStr.endsWith('deg')) hStr = hStr.slice(0, -3);
          else if (hStr.endsWith('rad')) hStr = String((parseFloat(hStr) * 180) / Math.PI);
          else if (hStr.endsWith('turn')) hStr = String(parseFloat(hStr) * 360);
          const h = parseFloat(hStr);
          
          const a = parts[1] !== undefined ? parseVal(parts[1], 1) : 1;
          
          const hRad = (h * Math.PI) / 180;
          const L = l;
          const a_coord = c * Math.cos(hRad);
          const b_coord = c * Math.sin(hRad);

          const l_lms = L + 0.3963377774 * a_coord + 0.2158037573 * b_coord;
          const m_lms = L - 0.1055613458 * a_coord - 0.0638541728 * b_coord;
          const s_lms = L - 0.0894841775 * a_coord - 1.2914855480 * b_coord;

          const l_lin = Math.pow(l_lms, 3);
          const m_lin = Math.pow(m_lms, 3);
          const s_lin = Math.pow(s_lms, 3);

          const r_lin = +4.0767416621 * l_lin - 3.3077115913 * m_lin + 0.2309699292 * s_lin;
          const g_lin = -1.2684380046 * l_lin + 2.6097574011 * m_lin - 0.3413193965 * s_lin;
          const b_lin = -0.0041960863 * l_lin - 0.7034186147 * m_lin + 1.7076147010 * s_lin;

          const toSRGB = (x: number) => {
            if (isNaN(x) || x <= 0) return 0;
            if (x >= 1) return 255;
            return Math.round((x <= 0.0031308 ? x * 12.92 : 1.055 * Math.pow(x, 1 / 2.4) - 0.055) * 255);
          };

          const r = toSRGB(r_lin);
          const g = toSRGB(g_lin);
          const b = toSRGB(b_lin);

          if (a === 1) {
            return `rgb(${r}, ${g}, ${b})`;
          } else {
            return `rgba(${r}, ${g}, ${b}, ${a})`;
          }
        } catch (err) {
          console.error("Error converting OKLCH color:", err);
          return 'rgb(120, 120, 120)';
        }
      };

      const replaceOklchWithRgb = (str: string): string => {
        if (!str || typeof str !== 'string') return str;
        if (!str.includes('oklch')) return str;
        return str.replace(/oklch\([^\)]+\)/gi, (match) => oklchToRgb(match));
      };

      const traverseAndConvertColors = (original: HTMLElement, cloned: HTMLElement) => {
        const processSingleElement = (origEl: HTMLElement, cloneEl: HTMLElement) => {
          try {
            const computed = window.getComputedStyle(origEl);
            const COLOR_PROPERTIES = [
              'color',
              'backgroundColor',
              'borderColor',
              'borderTopColor',
              'borderRightColor',
              'borderBottomColor',
              'borderLeftColor',
              'fill',
              'stroke',
              'boxShadow',
              'textShadow',
              'backgroundImage',
              'outlineColor'
            ];
            
            COLOR_PROPERTIES.forEach(prop => {
              const val = computed[prop as any];
              if (val && val.includes('oklch')) {
                cloneEl.style[prop as any] = replaceOklchWithRgb(val);
              }
            });
          } catch (e) {
            console.error("Error processing element styles:", e);
          }
        };

        processSingleElement(original, cloned);

        const origChildren = original.querySelectorAll('*');
        const clonedChildren = cloned.querySelectorAll('*');
        
        const len = Math.min(origChildren.length, clonedChildren.length);
        for (let i = 0; i < len; i++) {
          processSingleElement(origChildren[i] as HTMLElement, clonedChildren[i] as HTMLElement);
        }
      };

      // Temporarily override window.getComputedStyle on the main window
      const originalWindowGetComputedStyle = window.getComputedStyle;
      window.getComputedStyle = function (el: Element, pseudo?: string | null) {
        const style = originalWindowGetComputedStyle.call(window, el, pseudo);
        return new Proxy(style, {
          get(target, prop, receiver) {
            if (prop === 'getPropertyValue') {
              return (name: string) => {
                const val = target.getPropertyValue(name);
                return typeof val === 'string' && val.includes('oklch') ? replaceOklchWithRgb(val) : val;
              };
            }
            const val = Reflect.get(target, prop);
            if (typeof val === 'string' && val.includes('oklch')) {
              return replaceOklchWithRgb(val);
            }
            if (typeof val === 'function') {
              return val.bind(target);
            }
            return val;
          }
        });
      };

      let canvas;
      try {
        canvas = await html2canvas(printRef.current, { 
          scale: 2,
          onclone: (clonedDoc) => {
            // Sanitize all style blocks in cloned doc
            clonedDoc.querySelectorAll('style').forEach(styleTag => {
              if (styleTag.textContent && styleTag.textContent.includes('oklch')) {
                styleTag.textContent = replaceOklchWithRgb(styleTag.textContent);
              }
            });

            // Proxy getComputedStyle on cloned doc's default view
            const clonedWin = clonedDoc.defaultView;
            if (clonedWin) {
              const originalClonedGetComputedStyle = clonedWin.getComputedStyle;
              clonedWin.getComputedStyle = function (el: Element, pseudo?: string | null) {
                const style = originalClonedGetComputedStyle.call(clonedWin, el, pseudo);
                return new Proxy(style, {
                  get(target, prop, receiver) {
                    if (prop === 'getPropertyValue') {
                      return (name: string) => {
                        const val = target.getPropertyValue(name);
                        return typeof val === 'string' && val.includes('oklch') ? replaceOklchWithRgb(val) : val;
                      };
                    }
                    const val = Reflect.get(target, prop);
                    if (typeof val === 'string' && val.includes('oklch')) {
                      return replaceOklchWithRgb(val);
                    }
                    if (typeof val === 'function') {
                      return val.bind(target);
                    }
                    return val;
                  }
                });
              };
            }

            // Force display of BOTH the lined pages and millimeter annex pages
            const clonedLined = clonedDoc.getElementById('lined-pages-section');
            const clonedMillimeter = clonedDoc.getElementById('millimeter-pages-section');
            if (clonedLined) {
              clonedLined.style.display = 'flex';
              clonedLined.style.flexDirection = 'column';
              clonedLined.style.gap = '0';
              clonedLined.classList.remove('hidden-for-preview-only');
            }
            if (clonedMillimeter) {
              clonedMillimeter.style.display = 'flex';
              clonedMillimeter.style.flexDirection = 'column';
              clonedMillimeter.style.gap = '0';
              clonedMillimeter.classList.remove('hidden-for-preview-only');
            }

            // Normalize each printed page layout for perfect slicing
            const printPages = clonedDoc.querySelectorAll('.print-page');
            printPages.forEach((page: any) => {
              page.style.height = '1130px';
              page.style.minHeight = '1130px';
              page.style.maxHeight = '1130px';
              page.style.border = 'none';
              page.style.margin = '0';
              page.style.boxShadow = 'none';
              page.style.borderRadius = '0';
              page.style.boxSizing = 'border-box';
              page.style.overflow = 'hidden';
            });

            const clonedPaper = clonedDoc.getElementById('exam-print-paper');
            if (clonedPaper) {
              clonedPaper.style.gap = '0';
              clonedPaper.style.padding = '0';
              clonedPaper.style.backgroundColor = '#ffffff';
            }

            const clonedElement = clonedDoc.getElementById('exam-print-paper');
            if (clonedElement && printRef.current) {
              traverseAndConvertColors(printRef.current, clonedElement as HTMLElement);
            }
          }
        });
      } finally {
        // Restore window.getComputedStyle
        window.getComputedStyle = originalWindowGetComputedStyle;
      }
      const imgData = canvas.toDataURL('image/png');
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const pageHeight = 1130 * 2; // EXACT pixel height of one page in the canvas scale 2
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [imgWidth, pageHeight]
      });
      
      let pageIndex = 0;
      let heightLeft = imgHeight;
      
      while (heightLeft > 0) {
        if (pageIndex > 0) {
          pdf.addPage([imgWidth, pageHeight]);
        }
        const position = -(pageIndex * pageHeight);
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        pageIndex++;
      }
      
      pdf.save(`copie_${subject.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.pdf`);
    } catch (e) {
      console.error(e);
      alert("Erreur lors de l'exportation PDF");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className={`flex flex-col h-screen w-full ${isDarkMode ? 'bg-gray-900' : 'bg-[#e5e7eb]'} font-sans overflow-hidden`}>
      {/* Header */}
      <header className={`flex items-center justify-between px-4 py-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shrink-0`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#3b82f6] rounded flex items-center justify-center text-white font-bold text-sm shrink-0">B</div>
          <div>
            <h1 className={`text-sm font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} leading-tight`}>Bac IA</h1>
            <p className={`text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Albertinot</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'}`}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <button 
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className={`p-1.5 rounded-lg border ${isDarkMode ? 'bg-blue-900 text-blue-200 border-blue-800' : 'bg-blue-50 text-blue-700 border-blue-150'}`}
            title="Aide-mémoire"
          >
            <BookOpen className="w-4 h-4" />
          </button>
          
          <button 
            type="button"
            onClick={async () => {
              await fetch('/api/save-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subject, problem, result })
              });
              alert('Session enregistrée !');
            }}
            className={`px-2 py-1.5 rounded-lg font-bold text-xs ${isDarkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-700'}`}
          >
            Sauvegarder
          </button>
          
          <button 
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className={`p-1.5 rounded-lg border ${isDarkMode ? 'bg-green-900 text-green-200 border-green-800' : 'bg-green-50 text-green-700 border-green-150'}`}
            title="Lexique"
          >
            <GraduationCap className="w-4 h-4" />
          </button>
        </div>
      </header>

      <main className="flex flex-col lg:flex-row flex-1 overflow-y-auto lg:overflow-hidden p-4 sm:p-6 gap-4 sm:gap-6">
        
        {/* Left Column: Input Form */}
        {!isFullscreen && (
          <section className="w-full lg:w-1/3 flex flex-col gap-4">
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-4 flex flex-col h-auto`}>
              <h2 className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-3 flex items-center gap-2`}>
                <PenTool className="w-4 h-4 text-blue-500" />
                Énoncé du problème
              </h2>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 flex-1">
                <div className="flex flex-col gap-1.5">
                  <label className={`text-xs font-bold ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} uppercase tracking-wider`}>Matière</label>
                  <select 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={`w-full border ${isDarkMode ? 'border-gray-700 bg-gray-900 text-gray-300' : 'border-gray-200 bg-gray-50 text-gray-700'} rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all text-sm`}
                  >
                    {SUBJECTS.map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5 flex-1 flex min-h-0">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Énoncé</label>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => fileInputRef.current?.click()} className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                        <Upload className="w-3 h-3" />
                        Joindre un fichier (PDF/Image)
                      </button>
                      <input type="file" ref={fileInputRef} className="hidden" accept="image/*,application/pdf" onChange={handleFileChange} />
                    </div>
                  </div>
                  {file && (
                    <div className="text-xs bg-blue-50 text-blue-700 p-2 rounded flex justify-between items-center">
                      <span className="truncate flex-1 font-medium">{file.name}</span>
                      <button type="button" onClick={() => setFile(null)} className="text-blue-500 hover:text-blue-700 ml-2">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1 mb-1">
                    {MATH_SYMBOLS.map(sym => (
                      <button key={sym} type="button" onClick={() => insertSymbol(sym)} className="px-1.5 py-0.5 text-xs bg-gray-100 hover:bg-gray-200 rounded border border-gray-200 text-gray-700 transition-colors">
                        {sym}
                      </button>
                    ))}
                  </div>
                  <textarea 
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    placeholder="Ex: Soit f la fonction définie sur R par f(x) = x^2 * exp(-x)... ou utilisez le bouton au-dessus pour joindre un sujet complet"
                    className="flex-1 w-full p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm italic text-gray-600 resize-none focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all min-h-[150px]"
                    required={!file}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading || (!problem.trim() && !file)}
                  className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Rédaction en cours...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Générer la rédaction
                    </>
                  )}
                </button>

                <button 
                  type="button"
                  onClick={handleInsertFormulasRecap}
                  className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-indigo-700 border border-indigo-200 font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all focus:outline-none focus:ring-1 focus:ring-indigo-400"
                >
                  <GraduationCap className="h-5 w-5 text-indigo-600" />
                  Générer Fiche Révision (Formules du Bac)
                </button>

                <button 
                  type="button"
                  onClick={handleExportPDF}
                  disabled={!result || isExporting}
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isExporting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  Exporter en PDF
                </button>

                {error && (
                  <div className="mt-2 p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
                    {error}
                  </div>
                )}
              </form>
            </div>
            {history.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col h-1/3 overflow-hidden">
                <h2 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2 shrink-0">
                  <History className="w-4 h-4 text-blue-500" />
                  Historique
                </h2>
                <div className="flex flex-col gap-2 overflow-y-auto pr-1">
                  {history.map(item => (
                     <button 
                       key={item.id} 
                       type="button"
                       onClick={() => { setSubject(item.subject); setResult(item.result); setProblem(item.problem.startsWith('Fichier:') ? '' : item.problem); setFile(null); }} 
                       className="text-left p-3 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-blue-300 transition-colors w-full focus:outline-none focus:ring-1 focus:ring-blue-400"
                     >
                       <div className="flex justify-between items-start mb-1">
                         <p className="text-xs font-bold text-gray-800">{item.subject}</p>
                         <p className="text-[10px] text-gray-500">{item.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                       </div>
                       <p className="text-xs text-gray-600 line-clamp-2 italic">{item.problem}</p>
                     </button>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Right Column: The Exam Paper */}
        <section className={cn("relative h-full flex flex-col gap-2 transition-all duration-300", isFullscreen ? "w-full" : "w-full lg:w-2/3")}>
          <div className="flex justify-end gap-2">
            <button 
              onClick={() => setPaperStyle('lignes')}
              className={`text-xs px-3 py-1.5 rounded border transition-colors ${paperStyle === 'lignes' ? 'bg-blue-100 text-blue-700 border-blue-200 font-bold' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
              Lignes classiques
            </button>
            <button 
              onClick={() => setPaperStyle('millimetre')}
              className={`text-xs px-3 py-1.5 rounded border transition-colors ${paperStyle === 'millimetre' ? 'bg-blue-100 text-blue-700 border-blue-200 font-bold' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
              Papier millimétré
            </button>
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className={cn(
                "text-xs px-3 py-1.5 rounded border transition-all flex items-center gap-1.5 font-semibold shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400",
                isFullscreen 
                  ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200" 
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              )}
              title={isFullscreen ? "Quitter le mode plein écran" : "Passer en mode plein écran"}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-green-600" />
                  Quitter plein écran
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
                  Plein écran
                </>
              )}
            </button>
          </div>
          <div 
            className="flex-1 bg-slate-200/50 p-6 flex flex-col overflow-y-auto relative" 
          >
            <div id="exam-print-paper" ref={printRef} className="flex flex-col min-h-full w-full max-w-3xl mx-auto gap-6 bg-transparent">
              
              {/* Lined Pages Section */}
              <div 
                id="lined-pages-section" 
                className={cn(
                  "flex flex-col gap-6", 
                  paperStyle !== 'lignes' && "hidden-for-preview-only"
                )}
              >
                {isLoading ? (
                  /* Loading Sheet */
                  <div 
                    className="print-page relative bg-[#fefefe] shadow-lg border border-gray-200 rounded-sm w-full shrink-0 flex flex-col pt-12 pb-8 px-12"
                    style={{ 
                      backgroundImage: 'linear-gradient(#e5f3ff 1px, transparent 1px)', 
                      backgroundSize: '100% 36px',
                      height: '1130px',
                      paddingLeft: '110px',
                      paddingRight: '60px',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div className="absolute left-24 top-0 bottom-0 w-[2.5px] bg-[#ff9999] pointer-events-none" />
                    <div className="flex-1 flex items-center justify-center">
                      <HandwritingLoader timeElapsed={timeElapsed} />
                    </div>
                  </div>
                ) : pages.length > 0 ? (
                  pages.map((pageContent, pageIndex) => (
                    <div 
                      key={pageIndex}
                      className="print-page relative bg-[#fefefe] shadow-md border border-gray-200 rounded-sm w-full shrink-0 flex flex-col pt-12 pb-8 px-12 transition-shadow hover:shadow-lg"
                      style={{ 
                        backgroundImage: 'linear-gradient(#e5f3ff 1px, transparent 1px)', 
                        backgroundSize: '100% 36px',
                        height: '1130px',
                        paddingLeft: '110px',
                        paddingRight: '60px',
                        boxSizing: 'border-box'
                      }}
                      data-page-type="lined"
                    >
                      {/* Left vertical red line for French exam page */}
                      <div className="absolute left-24 top-0 bottom-0 w-[2.5px] bg-[#ff9999] pointer-events-none" />
                      
                      {/* Correction margin vertical label */}
                      {pageIndex === 0 && (
                        <div className="absolute left-6 top-20 transform -rotate-90 text-[10px] font-bold text-[#ff9999] uppercase tracking-[3px] pointer-events-none origin-left select-none">
                          Marge de correction
                        </div>
                      )}

                      {/* Subtle watermark inside each page sheet */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden flex flex-col justify-around items-center opacity-[0.02] select-none z-0">
                        <div className="text-[3vw] font-black uppercase tracking-[15px] transform -rotate-[35deg] font-sans text-red-950 whitespace-nowrap">
                          EXEMPLAIRE D'ENTRAÎNEMENT
                        </div>
                        <div className="text-[3vw] font-black uppercase tracking-[15px] transform -rotate-[35deg] font-sans text-red-950 whitespace-nowrap">
                          BROUILLON - BAC BLANC
                        </div>
                        <div className="text-[3vw] font-black uppercase tracking-[15px] transform -rotate-[35deg] font-sans text-red-950 whitespace-nowrap">
                          EXEMPLAIRE D'ENTRAÎNEMENT
                        </div>
                        <div className="text-[3vw] font-black uppercase tracking-[15px] transform -rotate-[35deg] font-sans text-red-950 whitespace-nowrap">
                          BROUILLON - BAC BLANC
                        </div>
                      </div>

                      {/* Real French School Copy Double Academic Header */}
                      {pageIndex === 0 && (
                        <div className="w-full border-2 border-gray-400 p-4 mb-6 bg-white font-sans text-xs select-none relative z-10 shadow-sm rounded">
                          <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-2">
                            <div className="text-left font-bold uppercase tracking-wider text-[9px] text-gray-500">Académie Nationale</div>
                            <div className="text-center font-black uppercase text-xs tracking-widest text-blue-800">BACCALAURÉAT GÉNÉRAL</div>
                            <div className="text-right font-bold uppercase tracking-wider text-[9px] text-gray-500">Session 2026</div>
                          </div>
                          <div className="grid grid-cols-3 gap-2 border-b border-gray-300 pb-2 mb-2">
                            <div>
                              <span className="font-bold text-gray-400 uppercase tracking-wider text-[9px]">Matière :</span>
                              <span className="ml-1 text-gray-900 font-bold uppercase text-[10px]">{subject}</span>
                            </div>
                            <div>
                              <span className="font-bold text-gray-400 uppercase tracking-wider text-[9px]">Élève :</span>
                              <span className="ml-1 text-gray-900 font-bold text-[10px]">Ramaitre</span>
                            </div>
                            <div>
                              <span className="font-bold text-gray-400 uppercase tracking-wider text-[9px]">Date :</span>
                              <span className="ml-1 text-gray-900 font-bold text-[10px]">{new Date().toLocaleDateString('fr-FR')}</span>
                            </div>
                          </div>
                          <div className="text-center text-[9px] text-gray-400 italic">
                            Aucun signe distinctif ne doit figurer sur cette copie en dehors des cadres prévus.
                          </div>
                        </div>
                      )}

                      {/* Page number */}
                      <div className="absolute bottom-6 right-12 text-xs font-mono text-gray-400 font-bold select-none z-10">
                        Page {pageIndex + 1} / {pages.length}
                      </div>

                      {/* Content */}
                      <div className="markdown-body font-handwriting text-xl text-gray-800 leading-[36px] flex-1 relative z-10 min-h-0 overflow-hidden">
                          <ReactMarkdown 
                          remarkPlugins={[remarkGfm, remarkMath]}
                          rehypePlugins={[rehypeKatex, rehypeRaw]}
                          components={{
                            code({ node, inline, className, children, ...props }: any) {
                              const match = /language-(\w+)/.exec(className || "");
                              if (!inline && match && (match[1] === "xml" || match[1] === "svg" || match[1] === "html")) {
                                const codeString = String(children).replace(/\n$/, "");
                                if (codeString.trim().startsWith("<svg")) {
                                  return (
                                    <div className="my-6 border border-red-200 rounded-lg shadow-sm overflow-hidden bg-white max-w-full print:break-inside-avoid">
                                      <div className="bg-red-50 px-3 py-1.5 border-b border-red-100 text-[11px] font-sans font-bold uppercase tracking-wider text-red-700 flex justify-between items-center">
                                        <span className="flex items-center gap-1">
                                          <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                                          Document Joint : Tracé sur Papier Millimétré
                                        </span>
                                        <span className="text-[9px] bg-red-100 px-1.5 py-0.5 rounded text-red-800">Graphique</span>
                                      </div>
                                      <div 
                                        className="millimeter-paper p-6 flex justify-center items-center w-full overflow-x-auto" 
                                        dangerouslySetInnerHTML={{ __html: cleanSvgCode(codeString) }} 
                                      />
                                    </div>
                                  );
                                }
                              }
                              return (
                                <code className={className} {...props}>
                                  {children}
                                </code>
                              );
                            },
                            span({ children, className, ...props }: any) {
                              if (className === 'lexique-tooltip') {
                                const term = children[0];
                                const definition = lexique[term as keyof typeof lexique] || "Définition non disponible.";
                                return <LexiqueTooltip term={term} definition={definition}>{children}</LexiqueTooltip>;
                              }
                              return <span className={className} {...props}>{children}</span>;
                            }
                          }}
                        >
                          {processMarkdown(pageContent)}
                        </ReactMarkdown>
                      </div>
                    </div>
                  ))
                ) : (
                  /* Empty Copy Sheet */
                  <div 
                    className="print-page relative bg-[#fefefe] shadow-lg border border-gray-200 rounded-sm w-full shrink-0 flex flex-col pt-12 pb-8 px-12"
                    style={{ 
                      backgroundImage: 'linear-gradient(#e5f3ff 1px, transparent 1px)', 
                      backgroundSize: '100% 36px',
                      height: '1130px',
                      paddingLeft: '110px',
                      paddingRight: '60px',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div className="absolute left-24 top-0 bottom-0 w-[2.5px] bg-[#ff9999] pointer-events-none" />
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-300 gap-4">
                      <PenTool className="h-12 w-12 opacity-20" />
                      <p className="italic text-gray-400">La copie est vierge.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Millimeter Pages Section */}
              {svgs.length > 0 && (
                <div 
                  id="millimeter-pages-section" 
                  className={cn(
                    "flex flex-col gap-6", 
                    paperStyle !== 'millimetre' && "hidden-for-preview-only"
                  )}
                >
                  {svgs.map((svgCode, idx) => (
                    <div 
                      key={idx} 
                      className="print-page relative bg-[#fefefe] shadow-md border border-gray-200 rounded-sm w-full shrink-0 flex flex-col p-12 transition-shadow hover:shadow-lg"
                      style={{ 
                        height: '1130px',
                        boxSizing: 'border-box'
                      }}
                      data-page-type="millimeter"
                    >
                      {/* Millimeter grid background */}
                      <div className="absolute inset-0 millimeter-paper pointer-events-none opacity-80" />

                      <div className="relative z-10 flex-1 flex flex-col gap-6">
                        <div className="border-b-2 border-red-800 pb-3">
                          <h2 className="text-lg font-bold font-sans text-red-900 uppercase tracking-widest flex justify-between items-center">
                            <span className="flex items-center gap-2">
                              <span>Annexe {idx + 1} : Tracé Graphique</span>
                              <span className="text-[10px] bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full font-semibold">Papier Millimétré</span>
                            </span>
                            <span className="text-xs font-mono text-gray-400 font-bold">Annexe {idx + 1} / {svgs.length}</span>
                          </h2>
                        </div>
                        
                        <div className="flex-1 flex flex-col justify-center items-center">
                          <div className="w-full max-w-2xl border border-red-200 p-6 rounded-xl bg-white/95 shadow-sm flex flex-col gap-4">
                            <h3 className="font-handwriting text-2xl text-red-900 underline text-center">
                              Figure {idx + 1} : Représentation géométrique
                            </h3>
                            <div 
                              className="flex justify-center items-center overflow-x-auto w-full"
                              dangerouslySetInnerHTML={{ __html: cleanSvgCode(svgCode) }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Millimeter Empty Warning Page if no graphs generated but active */}
              {svgs.length === 0 && paperStyle === 'millimetre' && (
                <div 
                  className="relative bg-[#fefefe] shadow-md border border-gray-200 rounded-sm w-full shrink-0 flex flex-col p-12"
                  style={{ 
                    height: '1130px',
                    boxSizing: 'border-box'
                  }}
                >
                  <div className="absolute inset-0 millimeter-paper pointer-events-none opacity-80" />
                  <div className="relative z-10 flex-1 flex flex-col items-center justify-center py-24 text-center gap-4">
                    <PenTool className="h-12 w-12 text-red-300 opacity-40 animate-pulse" />
                    <p className="font-handwriting text-2xl text-gray-500">Le papier millimétré reste vierge.</p>
                    <p className="text-xs text-gray-400 max-w-sm font-sans">
                      Aucun tracé de fonction ou figure géométrique n'est généré pour ce sujet. Veuillez consulter la copie double rédigée sur les lignes classiques.
                    </p>
                    <button
                      onClick={() => setPaperStyle('lignes')}
                      className="mt-4 text-xs px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-sans font-semibold transition-colors shadow"
                    >
                      Afficher la Copie Double (Lignes classiques)
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>

      </main>

      <CheatSheetSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onInsertFormula={handleInsertFormula} 
        onGenerateFullRecap={handleInsertFormulasRecap}
        onInsertLesson={handleInsertLesson}
        onInsertCurriculumChapter={handleInsertCurriculumChapter}
      />
    </div>
  );
}
