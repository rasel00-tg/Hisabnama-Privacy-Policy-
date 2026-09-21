import React from 'react';
import { 
  Banknote, 
  Clock, 
  Calendar, 
  Percent, 
  Calculator, 
  Bell, 
  UserCheck, 
  Sparkles,
  Database,
  ChevronRight
} from 'lucide-react';
import { APP_FEATURES } from '../data/policyContent';
import { Language } from '../types';

interface FeatureGridProps {
  language: Language;
  onSelectFeature?: (featureId: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Banknote: <Banknote className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  Clock: <Clock className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
  Calendar: <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
  Percent: <Percent className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
  Calculator: <Calculator className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  Bell: <Bell className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
  Sparkles: <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
  Database: <Database className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
};

export const FeatureGrid: React.FC<FeatureGridProps> = ({ language }) => {
  return (
    <div className="mb-10 p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            {language === 'en' ? 'App Scope' : 'অ্যাপের ফিচারসমূহ'}
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            {language === 'en' ? 'HISABNAMA Core Functionalities' : 'হিসাবনামা অ্যাপের প্রধান সুবিধাসমূহ'}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {APP_FEATURES.map((feature) => (
          <div
            key={feature.id}
            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-200 group"
          >
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 shadow-xs group-hover:scale-110 transition-transform">
                {iconMap[feature.icon] || <Calculator className="w-5 h-5 text-emerald-600" />}
              </div>
              <div>
                <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {language === 'en' ? feature.titleEn : feature.titleBn}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {language === 'en' ? feature.descEn : feature.descBn}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
