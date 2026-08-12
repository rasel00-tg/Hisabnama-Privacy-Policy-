import React from 'react';
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
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { POLICY_SECTIONS } from '../data/policyContent';
import { Language } from '../types';

interface SidebarTocProps {
  language: Language;
  activeSectionId: number;
  onSelectSection: (id: number) => void;
  filterQuery: string;
}

const sectionIcons: Record<string, React.ReactNode> = {
  Info: <Info className="w-4 h-4" />,
  Database: <Database className="w-4 h-4" />,
  Cake: <Cake className="w-4 h-4" />,
  Clock: <Clock className="w-4 h-4" />,
  Bell: <Bell className="w-4 h-4" />,
  Calculator: <Calculator className="w-4 h-4" />,
  CalendarDays: <CalendarDays className="w-4 h-4" />,
  Share2: <Share2 className="w-4 h-4" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4" />,
  UserCheck: <UserCheck className="w-4 h-4" />,
  FileText: <FileText className="w-4 h-4" />,
  CheckCircle2: <CheckCircle2 className="w-4 h-4" />,
  Mail: <Mail className="w-4 h-4" />,
};

export const SidebarToc: React.FC<SidebarTocProps> = ({
  language,
  activeSectionId,
  onSelectSection,
  filterQuery,
}) => {
  const filteredSections = POLICY_SECTIONS.filter((section) => {
    if (!filterQuery) return true;
    const query = filterQuery.toLowerCase();
    const title = language === 'en' ? section.titleEn : section.titleBn;
    const content = (language === 'en' ? section.contentEn : section.contentBn).join(' ');
    return title.toLowerCase().includes(query) || content.toLowerCase().includes(query);
  });

  return (
    <nav className="sticky top-20 space-y-4 max-h-[calc(100vh-6rem)] overflow-y-auto pr-1 custom-scrollbar">
      
      {/* TOC Header Box */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700/60">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
            <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{language === 'en' ? 'Table of Contents' : 'সূচিপত্র (১৩টি ধারা)'}</span>
          </div>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
            {language === 'en' ? '13 Clauses' : '১৩টি ধারা'}
          </span>
        </div>

        {/* List of 13 Sections */}
        <div className="mt-3 space-y-1">
          {filteredSections.map((section) => {
            const isActive = activeSectionId === section.id;
            return (
              <button
                key={section.id}
                onClick={() => onSelectSection(section.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-all group ${
                  isActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200/80 dark:border-emerald-800/80'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className={`${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}>
                    {sectionIcons[section.iconName] || <FileText className="w-4 h-4" />}
                  </span>
                  <span className="truncate">
                    {language === 'en' ? section.titleEn : section.titleBn}
                  </span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                  isActive ? 'text-emerald-600 dark:text-emerald-400 translate-x-0.5' : 'text-slate-300 dark:text-slate-600 group-hover:translate-x-0.5'
                }`} />
              </button>
            );
          })}

          {filteredSections.length === 0 && (
            <div className="p-3 text-center text-xs text-slate-400">
              {language === 'en' ? 'No matching sections found.' : 'কোনো সেকশন পাওয়া যায়নি।'}
            </div>
          )}
        </div>
      </div>

      {/* Quick App Privacy Info Box */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-900/10 to-teal-900/10 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-200/60 dark:border-emerald-800/60 text-xs space-y-2">
        <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          {language === 'en' ? 'HISABNAMA Privacy Standard' : 'হিসাবনামা প্রাইভেসি মানদণ্ড'}
        </h4>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
          {language === 'en'
            ? 'Designed for maximum offline privacy. All calculations run strictly on your device.'
            : 'সর্বোচ্চ তথ্যের গোপনীয়তা নিশ্চিত করতে তৈরি। অ্যাপের সমস্ত গণনা আপনার ডিভাইসে সংরক্ষিত থাকে।'}
        </p>
      </div>

    </nav>
  );
};
