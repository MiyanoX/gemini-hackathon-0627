import React, { useState } from "react";
import { LinkBlock, Persona, ThemeSettings } from "./types";
import { LOCALIZED_TEMPLATES } from "./data";
import { Language, TRANSLATIONS } from "./i18n";
import LeftPanel from "./components/LeftPanel";
import PhonePreview from "./components/PhonePreview";
import RightPanel from "./components/RightPanel";
import { 
  Edit3, 
  Palette, 
  BarChart2, 
  Settings as SettingsIcon, 
  User, 
  Rocket, 
  Eye, 
  Smartphone,
  Globe,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function App() {
  const [lang, setLang] = useState<Language>("en");
  const t = TRANSLATIONS[lang];

  // Start with default template "cafe" (Coffee shop) in English (the default)
  const defaultTemplate = LOCALIZED_TEMPLATES[lang].find(t => t.id === "cafe") || LOCALIZED_TEMPLATES[lang][0];

  const [activeTemplateId, setActiveTemplateId] = useState<string>(defaultTemplate.id);
  const [persona, setPersona] = useState<Persona>({ ...defaultTemplate.persona });
  const [theme, setTheme] = useState<ThemeSettings>({ ...defaultTemplate.theme });
  const [links, setLinks] = useState<LinkBlock[]>([...defaultTemplate.links]);
  const [gallery, setGallery] = useState<string[]>(defaultTemplate.gallery || []);
  
  // Assistant states
  const [assistantName, setAssistantName] = useState(defaultTemplate.assistantName);
  const [assistantGreeting, setAssistantGreeting] = useState(defaultTemplate.assistantGreeting);
  const [assistantPrompts, setAssistantPrompts] = useState<string[]>([...defaultTemplate.assistantPrompts]);

  // Publish / feedback notification
  const [publishStatus, setPublishStatus] = useState<"idle" | "success" | "error">("idle");

  // Template select trigger
  const handleSelectTemplate = (templateId: string) => {
    const templatesList = LOCALIZED_TEMPLATES[lang];
    const template = templatesList.find(t => t.id === templateId);
    if (template) {
      setActiveTemplateId(templateId);
      setPersona({ ...template.persona });
      setTheme({ ...template.theme });
      setLinks([...template.links]);
      setGallery(template.gallery || []);
      setAssistantName(template.assistantName);
      setAssistantGreeting(template.assistantGreeting);
      setAssistantPrompts([...template.assistantPrompts]);
    }
  };

  // Language switcher trigger
  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    const templatesList = LOCALIZED_TEMPLATES[newLang];
    const template = templatesList.find(t => t.id === activeTemplateId) || templatesList[0];
    
    // Automatically swap core editable content values to matching template in the new language
    setPersona({ ...template.persona });
    setTheme({ ...template.theme });
    setLinks([...template.links]);
    setGallery(template.gallery || []);
    setAssistantName(template.assistantName);
    setAssistantGreeting(template.assistantGreeting);
    setAssistantPrompts([...template.assistantPrompts]);
  };

  // Simulated Publish
  const handlePublish = () => {
    setPublishStatus("success");
    setTimeout(() => {
      setPublishStatus("idle");
    }, 3000);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50/50 text-gray-800 font-sans antialiased">
      
      {/* 1. Left Sidebar Navigation */}
      <aside className="hidden lg:flex flex-col w-64 bg-gray-900 border-r border-gray-800 p-5 shrink-0 select-none">
        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-indigo-900/30">
            D
          </div>
          <div>
            <h1 className="font-bold text-white text-md tracking-tight leading-none">Doppel</h1>
            <p className="text-[10px] text-indigo-400 font-semibold mt-1">{t.brandSubtitle}</p>
          </div>
        </div>

        {/* Navigation Link list */}
        <nav className="flex-1 space-y-1 text-xs">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-xl font-semibold transition-all">
            <Edit3 className="w-4 h-4" />
            <span>{t.navContent}</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-semibold transition-all cursor-pointer">
            <Palette className="w-4 h-4" />
            <span>{t.navStyle}</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-semibold transition-all cursor-pointer">
            <BarChart2 className="w-4 h-4" />
            <span>{t.navAnalytics}</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-semibold transition-all cursor-pointer">
            <SettingsIcon className="w-4 h-4" />
            <span>{t.navSettings}</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-semibold transition-all cursor-pointer">
            <User className="w-4 h-4" />
            <span>{t.navProfile}</span>
          </button>
        </nav>

        {/* Upgrade / Footer Info */}
        <div className="mt-auto">
          <div className="bg-gradient-to-tr from-indigo-950/40 to-slate-900/40 border border-indigo-500/10 rounded-2xl p-4 mb-4 text-center">
            <Rocket className="w-5 h-5 text-indigo-400 mx-auto mb-2 animate-bounce" />
            <h5 className="text-[11px] text-white font-bold mb-1">{t.upgradeTitle}</h5>
            <p className="text-[9px] text-gray-400 leading-normal">{t.upgradeDesc}</p>
          </div>
          <button className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-md shadow-indigo-900/10">
            {t.upgradeBtn}
          </button>
        </div>
      </aside>

      {/* 2. Main Workspace (Right Side container) */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top App Header */}
        <header className="h-16 border-b border-gray-100 bg-white flex justify-between items-center px-6 shrink-0 z-10 select-none">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-gray-800 text-sm tracking-tight">{t.editorTitle}</h2>
            <span className="text-[9px] font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md border border-indigo-100">{t.versionTag}</span>
          </div>

          {/* Action buttons with language switcher in top-right corner */}
          <div className="flex items-center gap-3 text-xs">
            {/* Elegant Language Selector */}
            <div className="flex items-center bg-gray-100 border border-gray-200 p-0.5 rounded-xl gap-0.5 mr-2">
              <span className="p-1 text-gray-400 hidden sm:inline-block" title="Select Language">
                <Globe className="w-3.5 h-3.5" />
              </span>
              <button 
                onClick={() => handleLanguageChange("en")}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                  lang === "en" 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                EN
              </button>
              <button 
                onClick={() => handleLanguageChange("ja")}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                  lang === "ja" 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                JP
              </button>
              <button 
                onClick={() => handleLanguageChange("zh")}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                  lang === "zh" 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                ZH
              </button>
            </div>

            {/* View indicators */}
            <div className="flex items-center bg-gray-50 border border-gray-100 p-0.5 rounded-lg mr-2">
              <button className="p-1.5 rounded-md text-gray-400 hover:text-gray-800 cursor-pointer" title="预览">
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-md text-indigo-600 bg-white shadow-sm font-semibold flex items-center gap-1" title="移动端视图">
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            <button className="px-4 py-2 border border-gray-200 text-gray-600 font-bold rounded-full hover:bg-gray-50 transition-colors cursor-pointer">
              {t.previewBtn}
            </button>
            <button 
              onClick={handlePublish}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full shadow-sm shadow-indigo-100 transition-colors cursor-pointer"
            >
              {t.publishBtn}
            </button>
          </div>
        </header>

        {/* Central columns workspace */}
        <div className="flex-1 flex min-h-0 relative">
          
          {/* Column A: Link Blocks / Content Editor */}
          <LeftPanel 
            lang={lang}
            persona={persona}
            setPersona={setPersona}
            theme={theme}
            setTheme={setTheme}
            assistantName={assistantName}
            setAssistantName={setAssistantName}
            assistantGreeting={assistantGreeting}
            setAssistantGreeting={setAssistantGreeting}
            assistantPrompts={assistantPrompts}
            setAssistantPrompts={setAssistantPrompts}
            gallery={gallery}
            setGallery={setGallery}
          />

          {/* Column B: Interactive Phone Simulator */}
          <div className="flex-1 bg-gray-100/70 overflow-y-auto flex justify-center p-8 relative">
            <PhonePreview 
              lang={lang}
              persona={persona}
              theme={theme}
              gallery={gallery}
              assistantName={assistantName}
              assistantGreeting={assistantGreeting}
              assistantPrompts={assistantPrompts}
            />
          </div>

          {/* Column C: Visual Customizer / Settings Panel */}
          <RightPanel 
            lang={lang}
            activeTemplateId={activeTemplateId}
            onSelectTemplate={handleSelectTemplate}
            theme={theme}
            setTheme={setTheme}
            assistantName={assistantName}
            setAssistantName={setAssistantName}
            assistantGreeting={assistantGreeting}
            setAssistantGreeting={setAssistantGreeting}
            assistantPrompts={assistantPrompts}
            setAssistantPrompts={setAssistantPrompts}
          />

        </div>

      </div>

      {/* Floating Global Notifications */}
      {publishStatus === "success" && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 border border-gray-800 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{t.publishSuccess}</span>
        </div>
      )}

    </div>
  );
}
