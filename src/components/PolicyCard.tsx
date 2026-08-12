import React, { useState } from 'react';
import { 
  Info, 
  Database, 
  Cake, 
  Clock, 
  Bell, 
  Calculator, 
  CalendarDays, 
  Share2, 
  ShieldCheck, 
  UserCheck, 
  FileText, 
  CheckCircle2, 
  Mail,
  Copy,
  Check,
  Link as LinkIcon,
  Sparkles
} from 'lucide-react';
import { PolicySection, Language } from '../types';

interface PolicyCardProps {
  section: PolicySection;
  language: Language;
  searchQuery: string;
  isHighlighted?: boolean;
}

const sectionIcons: Record<string, React.ReactNode> = {
  Info: <Info className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  Database: <Database className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
  Cake: <Cake className="w-5 h-5 text-rose-500 dark:text-rose-400" />,
  Clock: <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
  Bell: <Bell className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
  Calculator: <Calculator className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  CalendarDays: <CalendarDays className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
  Share2: <Share2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  UserCheck: <UserCheck className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
  FileText: <FileText className="w-5 h-5 text-slate-600 dark:text-slate-400" />,
  CheckCircle2: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  Mail: <Mail className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
};

export const PolicyCard: React.FC<PolicyCardProps> = ({
  section,
  language,
  searchQuery,
  isHighlighted,
}) => {
  const [copied, setCopied] = useState(false);

  const title = language === 'en' ? section.titleEn : section.titleBn;
  const paragraphs = language === 'en' ? section.contentEn : section.contentBn;
  const highlights = language === 'en' ? section.highlightsEn : section.highlightsBn;

  const handleCopySection = () => {
    const textToCopy = `${title}\n\n${paragraphs.join('\n')}${
      highlights ? '\n\nKey Points:\n' + highlights.map(h => `- ${h}`).join('\n') : ''
    }`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper function to highlight text matching searchQuery
  const renderHighlightedText = (text: string) => {
    if (!searchQuery.trim()) return text;

    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <mark key={index} className="bg-amber-200 dark:bg-amber-900/80 text-amber-900 dark:text-amber-100 px-1 py-0.5 rounded-sm font-semibold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <article
      id={`section-${section.id}`}
      className={`scroll-mt-24 p-6 sm:p-8 rounded-3xl transition-all duration-300 ${
        isHighlighted
          ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-2 border-emerald-500 shadow-md shadow-emerald-500/10'
          : 'bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:border-slate-300 dark:hover:border-slate-600'
      }`}
    >
      {/* Section Header */}
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700/60">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-700/60 shadow-xs">
            {sectionIcons[section.iconName] || <FileText className="w-5 h-5 text-emerald-600" />}
          </div>
          <div>
            <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
              Clause {section.id < 10 ? `0${section.id}` : section.id}
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-0.5 leading-snug">
              {renderHighlightedText(title)}
            </h2>
          </div>
        </div>

        {/* Copy Section Button */}
        <button
          onClick={handleCopySection}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shrink-0"
          title="Copy this section text"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{language === 'en' ? 'Copied' : 'কপি হয়েছে'}</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{language === 'en' ? 'Copy Clause' : 'কপি করুন'}</span>
            </>
          )}
        </button>
      </div>

      {/* Paragraphs */}
      <div className="mt-5 space-y-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
        {paragraphs.map((paragraph, idx) => (
          <p key={idx}>{renderHighlightedText(paragraph)}</p>
        ))}
      </div>

      {/* Bullet Point Highlights if available */}
      {highlights && highlights.length > 0 && (
        <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2.5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>{language === 'en' ? 'Key Features & Highlights' : 'প্রধান পয়েন্টসমূহ'}</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {highlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <span className="leading-snug">{renderHighlightedText(item)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

    </article>
  );
};
