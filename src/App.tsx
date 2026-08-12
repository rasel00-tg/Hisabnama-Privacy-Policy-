import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FeatureGrid } from './components/FeatureGrid';
import { SidebarToc } from './components/SidebarToc';
import { PolicyCard } from './components/PolicyCard';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';
import { POLICY_SECTIONS, APP_INFO } from './data/policyContent';
import { Language } from './types';
import { ShieldCheck, BookOpen, AlertCircle, Sparkles, Check, Copy } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('bn'); // Default to Bangla for Bangladeshi audience, fast toggle to English
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<number>(1);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle Dark Mode class on <html> element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // IntersectionObserver to highlight active section in TOC on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const section of POLICY_SECTIONS) {
        const element = document.getElementById(`section-${section.id}`);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSectionId(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectSection = (id: number) => {
    setActiveSectionId(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(`section-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyAll = () => {
    const fullText = POLICY_SECTIONS.map((sec) => {
      const title = language === 'en' ? sec.titleEn : sec.titleBn;
      const content = (language === 'en' ? sec.contentEn : sec.contentBn).join('\n');
      const highlights = (language === 'en' ? sec.highlightsEn : sec.highlightsBn);
      return `${title}\n\n${content}${
        highlights ? '\n\nHighlights:\n' + highlights.map((h) => `- ${h}`).join('\n') : ''
      }`;
    }).join('\n\n-------------------------------\n\n');

    const header = `${APP_INFO.appName} - Privacy Policy\nLast Updated: ${
      language === 'en' ? APP_INFO.lastUpdated : APP_INFO.lastUpdatedBn
    }\n\n`;

    navigator.clipboard.writeText(header + fullText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const handleDownloadTxt = () => {
    const fullText = POLICY_SECTIONS.map((sec) => {
      const title = language === 'en' ? sec.titleEn : sec.titleBn;
      const content = (language === 'en' ? sec.contentEn : sec.contentBn).join('\n');
      const highlights = (language === 'en' ? sec.highlightsEn : sec.highlightsBn);
      return `${title}\n\n${content}${
        highlights ? '\n\nHighlights:\n' + highlights.map((h) => `- ${h}`).join('\n') : ''
      }`;
    }).join('\n\n===============================\n\n');

    const fileContent = `${APP_INFO.appName} Privacy Policy\nLast Updated: ${APP_INFO.lastUpdated}\n\n${fullText}\n\n${APP_INFO.copyright}`;
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `HISABNAMA_Privacy_Policy_${language.toUpperCase()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredSections = POLICY_SECTIONS.filter((sec) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const title = (language === 'en' ? sec.titleEn : sec.titleBn).toLowerCase();
    const content = (language === 'en' ? sec.contentEn : sec.contentBn).join(' ').toLowerCase();
    const highlights = (language === 'en' ? sec.highlightsEn : sec.highlightsBn)?.join(' ').toLowerCase() || '';
    return title.includes(query) || content.includes(query) || highlights.includes(query);
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      
      {/* Top Sticky Navbar */}
      <Navbar
        language={language}
        setLanguage={setLanguage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenContact={() => setIsContactOpen(true)}
        onPrint={handlePrint}
        onCopyAll={handleCopyAll}
        copiedAll={copiedAll}
        onDownloadTxt={handleDownloadTxt}
        toggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        mobileMenuOpen={mobileMenuOpen}
      />

      {/* Main Page Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {/* Top Hero Banner */}
        <HeroBanner language={language} />

        {/* Feature Overview Grid */}
        <FeatureGrid language={language} />

        {/* Main Content Layout (Sidebar TOC + Policy Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Sidebar TOC */}
          <aside className="hidden lg:block lg:col-span-4 print:hidden">
            <SidebarToc
              language={language}
              activeSectionId={activeSectionId}
              onSelectSection={handleSelectSection}
              filterQuery={searchQuery}
            />
          </aside>

          {/* Mobile TOC Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs p-4 flex justify-end">
              <div className="w-full max-w-xs bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-2xl overflow-y-auto max-h-[90vh]">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-700">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    <span>{language === 'en' ? 'Select Clause' : 'সূচিপত্র নির্বাচন'}</span>
                  </h3>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-200"
                  >
                    Close
                  </button>
                </div>
                <SidebarToc
                  language={language}
                  activeSectionId={activeSectionId}
                  onSelectSection={handleSelectSection}
                  filterQuery={searchQuery}
                />
              </div>
            </div>
          )}

          {/* Policy Sections Feed */}
          <section className="lg:col-span-8 space-y-6">
            
            {/* Search result count notice */}
            {searchQuery && (
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>
                    {language === 'en'
                      ? `Found ${filteredSections.length} section(s) matching "${searchQuery}"`
                      : `"${searchQuery}" এর সাথে সম্পর্কিত ${filteredSections.length}টি ধারা পাওয়া গেছে`}
                  </span>
                </div>
                <button
                  onClick={() => setSearchQuery('')}
                  className="font-bold underline hover:no-underline"
                >
                  {language === 'en' ? 'Reset' : 'রিসেট'}
                </button>
              </div>
            )}

            {/* List of Policy Cards */}
            {filteredSections.map((section) => (
              <PolicyCard
                key={section.id}
                section={section}
                language={language}
                searchQuery={searchQuery}
                isHighlighted={activeSectionId === section.id && !searchQuery}
              />
            ))}

            {filteredSections.length === 0 && (
              <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <ShieldCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                  {language === 'en' ? 'No Matching Privacy Clauses Found' : 'কোনো সেকশন পাওয়া যায়নি'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  {language === 'en'
                    ? 'Try searching with different keywords like "calculator", "age", "prayer", "district", or "notification".'
                    : 'অন্য কোনো কি-ওয়ার্ড দিয়ে চেষ্টা করুন যেমন "ক্যালকুলেটর", "নামাজ", "বয়স", "জেলা" অথবা "নোটিফিকেশন"।'}
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 text-white"
                >
                  {language === 'en' ? 'Show All Clauses' : 'সকল ধারা দেখুন'}
                </button>
              </div>
            )}

          </section>

        </div>

      </main>

      {/* Developer Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        language={language}
      />

      {/* Footer */}
      <Footer
        language={language}
        onScrollTop={handleScrollTop}
        onOpenContact={() => setIsContactOpen(true)}
      />

    </div>
  );
}
