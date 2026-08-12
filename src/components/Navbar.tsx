import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  Printer, 
  Copy, 
  Check, 
  Download, 
  Mail, 
  Moon, 
  Sun,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { Language } from '../types';
import { APP_INFO } from '../data/policyContent';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenContact: () => void;
  onPrint: () => void;
  onCopyAll: () => void;
  copiedAll: boolean;
  onDownloadTxt: () => void;
  toggleMobileMenu: () => void;
  mobileMenuOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  setLanguage,
  searchQuery,
  setSearchQuery,
  darkMode,
  setDarkMode,
  onOpenContact,
  onPrint,
  onCopyAll,
  copiedAll,
  onDownloadTxt,
  toggleMobileMenu,
  mobileMenuOpen,
}) => {
  const [showExportDropdown, setShowExportDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo & App Name */}
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleMobileMenu} 
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                  {APP_INFO.appName}
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    Policy
                  </span>
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 -mt-1 hidden sm:inline">
                  {language === 'en' ? 'Privacy & Data Terms' : 'প্রাইভেসি পলিসি পেজ'}
                </span>
              </div>
            </a>
          </div>

          {/* Search Bar in Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'en' ? 'Search privacy topics (e.g. prayer, age, notifications)...' : 'প্রাইভেসি টপিক খুঁজুন (যেমন: নামায, বয়স, নোটিফিকেশন)...'}
                className="w-full pl-10 pr-4 py-1.5 text-sm rounded-full bg-slate-100 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 border border-slate-200 dark:border-slate-700/60 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            
            {/* Language Switcher Button */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-full border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                  language === 'en'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('bn')}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                  language === 'bn'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                বাংলা
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Export / Print Dropdown */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setShowExportDropdown(!showExportDropdown)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/70 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{language === 'en' ? 'Export' : 'ডাউনলোড'}</span>
              </button>

              {showExportDropdown && (
                <div 
                  className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setShowExportDropdown(false)}
                >
                  <button
                    onClick={() => {
                      onPrint();
                      setShowExportDropdown(false);
                    }}
                    className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-left"
                  >
                    <Printer className="w-4 h-4 text-slate-500" />
                    <span>{language === 'en' ? 'Print / Save PDF' : 'প্রিন্ট / পিডিএফ'}</span>
                  </button>

                  <button
                    onClick={() => {
                      onCopyAll();
                      setShowExportDropdown(false);
                    }}
                    className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-left"
                  >
                    {copiedAll ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-500" />
                    )}
                    <span>{copiedAll ? (language === 'en' ? 'Copied!' : 'কপি হয়েছে!') : (language === 'en' ? 'Copy Full Text' : 'সম্পূর্ণ টেক্সট কপি')}</span>
                  </button>

                  <button
                    onClick={() => {
                      onDownloadTxt();
                      setShowExportDropdown(false);
                    }}
                    className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-left"
                  >
                    <Download className="w-4 h-4 text-slate-500" />
                    <span>{language === 'en' ? 'Download .TXT' : 'টেক্সট ফাইল ডাউনলোড'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Contact Developer Button */}
            <button
              onClick={onOpenContact}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/20 transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{language === 'en' ? 'Contact' : 'যোগাযোগ'}</span>
            </button>

          </div>
        </div>

        {/* Search Bar for Mobile */}
        <div className="md:hidden pb-3 pt-1">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'en' ? 'Search privacy topics...' : 'প্রাইভেসি টপিক খুঁজুন...'}
              className="w-full pl-10 pr-4 py-1.5 text-xs rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

      </div>
    </header>
  );
};
