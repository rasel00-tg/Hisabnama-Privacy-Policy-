import React from 'react';
import { ShieldCheck, ArrowUp, Mail, Lock } from 'lucide-react';
import { Language } from '../types';
import { APP_INFO } from '../data/policyContent';

interface FooterProps {
  language: Language;
  onScrollTop: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onScrollTop,
  onOpenContact,
}) => {
  return (
    <footer className="mt-16 bg-slate-900 text-slate-300 border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8 print:hidden">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Footer Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight flex items-center gap-2">
                {APP_INFO.appName}
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Privacy Policy
                </span>
              </span>
              <p className="text-xs text-slate-400 mt-0.5">
                {language === 'en' ? APP_INFO.taglineEn : APP_INFO.taglineBn}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenContact}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition-colors"
            >
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>{language === 'en' ? 'Contact Developer' : 'ডেভেলপারের সাথে যোগাযোগ'}</span>
            </button>

            <button
              onClick={onScrollTop}
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            {language === 'en' ? APP_INFO.copyright : APP_INFO.copyrightBn}
          </p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'en' ? `Last Updated: ${APP_INFO.lastUpdated}` : `সর্বশেষ আপডেট: ${APP_INFO.lastUpdatedBn}`}</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
