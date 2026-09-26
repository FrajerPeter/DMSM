import React, { useState } from 'react';
import { AcademicDossier } from './AcademicDossier';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { FileText, BarChart3, Smartphone, Camera, ArrowLeft, ShieldAlert, Sparkles, ExternalLink } from 'lucide-react';
import { analytics } from '../utils/analytics';

interface CaseStudyHubProps {
  onBackToShop: () => void;
  onOpenMobileApp: () => void;
  onOpenInstagramStories: () => void;
  defaultTab?: 'dossier' | 'dashboard';
}

export const CaseStudyHub: React.FC<CaseStudyHubProps> = ({
  onBackToShop,
  onOpenMobileApp,
  onOpenInstagramStories,
  defaultTab = 'dossier'
}) => {
  const [activeTab, setActiveTab] = useState<'dossier' | 'dashboard'>(defaultTab);

  const handleTabChange = (tab: 'dossier' | 'dashboard') => {
    setActiveTab(tab);
    analytics.trackEvent('case_study_tab_switch', { tab });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070707] text-neutral-100 pb-20">
      {/* Top Academic Sub-Header */}
      <div className="bg-[#0b0b0b] border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <span className="px-2 py-0.5 bg-white text-black font-bold uppercase">
                  PROJECT / CASE STUDY
                </span>
                <span>·</span>
                <span>FAKULTA PODNIKATELSKÁ VUT BRNO</span>
              </div>
              <h1 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tight text-white">
                AKADEMICKÁ DOKUMENTACE & STRATEGIE E-SHOPU
              </h1>
              <p className="text-xs font-mono text-neutral-400 max-w-3xl leading-relaxed">
                Komplexní případová studie studentského streetwearového brandu: marketingový plán, produktová strategie, kalkulace nákladů, finanční plán a e-commerce analytika.
              </p>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs shrink-0">
              <button
                onClick={onBackToShop}
                className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-bold uppercase transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft size={14} />
                <span>ZPĚT DO OBCHODU</span>
              </button>
            </div>
          </div>

          {/* Quick-Launch Cards for Interactive Prototypes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-6 border-t border-neutral-800/80 font-mono text-xs">
            <button
              onClick={() => handleTabChange('dossier')}
              className={`p-3.5 border text-left transition-colors flex items-center justify-between ${
                activeTab === 'dossier'
                  ? 'bg-white text-black border-white font-bold'
                  : 'bg-black text-neutral-300 border-neutral-800 hover:border-neutral-600'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText size={16} />
                <div>
                  <span className="block uppercase">01 / DOKUMENTACE</span>
                  <span className={`text-[10px] ${activeTab === 'dossier' ? 'text-neutral-700' : 'text-neutral-400'}`}>30 akademických kapitol</span>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleTabChange('dashboard')}
              className={`p-3.5 border text-left transition-colors flex items-center justify-between ${
                activeTab === 'dashboard'
                  ? 'bg-white text-black border-white font-bold'
                  : 'bg-black text-neutral-300 border-neutral-800 hover:border-neutral-600'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BarChart3 size={16} />
                <div>
                  <span className="block uppercase">02 / KPI ANALYTICS</span>
                  <span className={`text-[10px] ${activeTab === 'dashboard' ? 'text-neutral-700' : 'text-neutral-400'}`}>Tržby, AOV, konverze</span>
                </div>
              </div>
            </button>

            <button
              onClick={onOpenMobileApp}
              className="p-3.5 bg-black hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-neutral-300 hover:text-white transition-colors text-left flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <Smartphone size={16} className="text-white" />
                <div>
                  <span className="block uppercase font-bold text-white">03 / APP PROTOTYP</span>
                  <span className="text-[10px] text-neutral-400">Interaktivní simulátor mobilní appky</span>
                </div>
              </div>
              <ExternalLink size={13} className="text-neutral-400 group-hover:text-white" />
            </button>

            <button
              onClick={onOpenInstagramStories}
              className="p-3.5 bg-black hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-neutral-300 hover:text-white transition-colors text-left flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <Camera size={16} className="text-white" />
                <div>
                  <span className="block uppercase font-bold text-white">04 / IG STORIES</span>
                  <span className="text-[10px] text-neutral-400">Kampaň pro studenty na sociálních sítích</span>
                </div>
              </div>
              <ExternalLink size={13} className="text-neutral-400 group-hover:text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="mt-6">
        {activeTab === 'dossier' && (
          <AcademicDossier />
        )}

        {activeTab === 'dashboard' && (
          <AnalyticsDashboard />
        )}
      </div>
    </div>
  );
};
