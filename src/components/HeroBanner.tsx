import React from 'react';
import { ShieldCheck, UserX, Lock, Bell, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { APP_INFO } from '../data/policyContent';

interface HeroBannerProps {
  language: Language;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ language }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-teal-900 to-slate-900 text-white pt-10 pb-12 px-4 sm:px-6 lg:px-8 rounded-3xl shadow-xl my-6 border border-emerald-800/40">
      
      {/* Background Decorative Grid/Blobs */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent_40%)] pointer-events-none" />
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center space-y-6">
        
        {/* Top Pills */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-md text-emerald-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>
            {language === 'en'
              ? `Official Privacy Policy • Last Updated: ${APP_INFO.lastUpdated}`
              : `অফিসিয়াল প্রাইভেসি পলিসি • আপডেট: ${APP_INFO.lastUpdatedBn}`}
          </span>
        </div>

        {/* Main Title */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {language === 'en' ? (
              <>
                <span className="text-emerald-400">{APP_INFO.appName}</span> Privacy Policy
              </>
            ) : (
              <>
                <span className="text-emerald-400">{APP_INFO.appNameBn}</span> প্রাইভেসি পলিসি
              </>
            )}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {language === 'en' ? APP_INFO.taglineEn : APP_INFO.taglineBn}
          </p>
        </div>

        {/* 4 Core Guarantees Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 text-left">
          
          <div className="bg-white/10 dark:bg-slate-800/50 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex items-start gap-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl shrink-0 mt-0.5">
              <UserX className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">
                {language === 'en' ? 'No Account Needed' : 'অ্যাকাউন্ট প্রয়োজন নেই'}
              </h4>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                {language === 'en'
                  ? 'No name, phone, email or login required'
                  : 'নাম, ফোন বা পাসওয়ার্ড ছাড়াই অ্যাপ ব্যবহার'}
              </p>
            </div>
          </div>

          <div className="bg-white/10 dark:bg-slate-800/50 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex items-start gap-3">
            <div className="p-2 bg-teal-500/20 text-teal-300 rounded-xl shrink-0 mt-0.5">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">
                {language === 'en' ? '100% On-Device Data' : 'ডিভাইসে ডেটা প্রসেসিং'}
              </h4>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                {language === 'en'
                  ? 'Calculator inputs & birth dates stay on your phone'
                  : 'ক্যালকুলেটর ও বয়স গণনার ডেটা আপনার ফোনেই থাকে'}
              </p>
            </div>
          </div>

          <div className="bg-white/10 dark:bg-slate-800/50 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex items-start gap-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-300 rounded-xl shrink-0 mt-0.5">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">
                {language === 'en' ? 'District Prayer Times' : 'জেলা ভিত্তিক সময়'}
              </h4>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                {language === 'en'
                  ? 'Prayer times calculated based on selected district'
                  : 'পছন্দকৃত জেলার ভিত্তিতে সঠিক সালাতের সময়'}
              </p>
            </div>
          </div>

          <div className="bg-white/10 dark:bg-slate-800/50 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex items-start gap-3">
            <div className="p-2 bg-amber-500/20 text-amber-300 rounded-xl shrink-0 mt-0.5">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">
                {language === 'en' ? 'Opt-In Reminders' : 'ঐচ্ছিক নোটিফিকেশন'}
              </h4>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                {language === 'en'
                  ? 'Prayer notifications sent only if permission granted'
                  : 'শুধুমাত্র আপনার অনুমতি সাপেক্ষে নোটিফিকেশন প্রদান'}
              </p>
            </div>
          </div>

        </div>

        {/* Consent Note */}
        <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            {language === 'en'
              ? 'By using HISABNAMA, you agree to these privacy terms.'
              : 'হিসাবনামা অ্যাপ ব্যবহার করে আপনি এই প্রাইভেসি শর্তাবলীতে সম্মতি প্রদান করছেন।'}
          </span>
        </div>

      </div>
    </section>
  );
};
