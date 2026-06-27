import React, { useState } from "react";
import { Template, ThemeSettings } from "../types";
import { LOCALIZED_TEMPLATES } from "../data";
import { Language, TRANSLATIONS } from "../i18n";
import { 
  Palette, 
  Settings, 
  Layers, 
  Check, 
  Sparkles,
  HelpCircle,
  Plus
} from "lucide-react";

interface RightPanelProps {
  lang: Language;
  activeTemplateId: string;
  onSelectTemplate: (templateId: string) => void;
  theme: ThemeSettings;
  setTheme: React.Dispatch<React.SetStateAction<ThemeSettings>>;
  assistantName: string;
  setAssistantName: (name: string) => void;
  assistantGreeting: string;
  setAssistantGreeting: (greeting: string) => void;
  assistantPrompts: string[];
  setAssistantPrompts: (prompts: string[]) => void;
}

export default function RightPanel({
  lang,
  activeTemplateId,
  onSelectTemplate,
  theme,
  setTheme,
  assistantName,
  setAssistantName,
  assistantGreeting,
  setAssistantGreeting,
  assistantPrompts,
  setAssistantPrompts
}: RightPanelProps) {
  const t = TRANSLATIONS[lang];
  const [activeTab, setActiveTab] = useState<"templates" | "style" | "assistant">("templates");

  const bgPresets = [
    { 
      name: lang === "zh" ? "柔和温暖" : lang === "ja" ? "柔らかな温かさ" : "Warm Sun", 
      value: "bg-gradient-to-b from-[#fdfbf7] to-[#f5ebd8]" 
    },
    { 
      name: lang === "zh" ? "极致高光" : lang === "ja" ? "クリーンライト" : "Clean Light", 
      value: "bg-gradient-to-b from-gray-50 to-gray-200" 
    },
    { 
      name: lang === "zh" ? "暗黑极客" : lang === "ja" ? "コズミックダーク" : "Cosmic Dark", 
      value: "bg-[#131313]" 
    },
    { 
      name: lang === "zh" ? "深蓝星夜" : lang === "ja" ? "スペースディープ" : "Space Deep", 
      value: "bg-gradient-to-tr from-[#1e1b4b] to-[#311042]" 
    },
    { 
      name: lang === "zh" ? "蔷薇暮光" : lang === "ja" ? "サンセットトワイライト" : "Sunset Twilight", 
      value: "bg-gradient-to-tr from-[#ede9fe] to-[#fbcfe8]" 
    },
    { 
      name: lang === "zh" ? "全白画布" : lang === "ja" ? "ピュアホワイト" : "Pure White", 
      value: "bg-white" 
    }
  ];

  const accentPresets = [
    "#4F46E5", // 经典深邃蓝 (Indigo)
    "#1E3A8A", // 商务精英蓝 (Navy Blue)
    "#0F172A", // 极简雅致黑 (Slate Black)
    "#0D9488", // 沉静松石绿 (Teal)
    "#10B981", // 活力健康绿 (Emerald)
    "#F97316", // 温暖蜜桔橙 (Orange)
    "#B7791F"  // 雅致尊贵金 (Warm Gold)
  ];

  const handlePromptChange = (idx: number, value: string) => {
    const updated = [...assistantPrompts];
    updated[idx] = value;
    setAssistantPrompts(updated);
  };

  return (
    <div className="w-[360px] border-l border-gray-100 bg-white overflow-y-auto flex flex-col select-none scrollbar-thin">
      
      {/* Sticky Tab Header */}
      <div className="p-4 border-b border-gray-50 sticky top-0 bg-white/95 backdrop-blur-md z-10">
        <div className="flex p-1 bg-gray-50 rounded-xl border border-gray-100">
          <button 
            onClick={() => setActiveTab("templates")}
            className={`flex-1 py-2 text-[11px] font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "templates" 
                ? 'bg-white shadow-sm text-gray-800 border border-gray-100' 
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t.tabTemplates}</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("style")}
            className={`flex-1 py-2 text-[11px] font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "style" 
                ? 'bg-white shadow-sm text-gray-800 border border-gray-100' 
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>{t.tabStyle}</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("assistant")}
            className={`flex-1 py-2 text-[11px] font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "assistant" 
                ? 'bg-white shadow-sm text-gray-800 border border-gray-100' 
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.tabAssistant}</span>
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      <div className="p-6 space-y-6 flex-1">
        
        {/* TAB 1: TEMPLATES */}
        {activeTab === "templates" && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.templatesTitle}</h4>
            <div className="flex flex-col gap-3">
              {LOCALIZED_TEMPLATES[lang].map((tmpl) => {
                const isActive = activeTemplateId === tmpl.id;
                return (
                  <div 
                    key={tmpl.id}
                    onClick={() => onSelectTemplate(tmpl.id)}
                    className={`border rounded-2xl p-4 cursor-pointer transition-all ${
                      isActive 
                        ? 'border-indigo-600 bg-indigo-50/10 shadow-sm' 
                        : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50/50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1.5">
                      <h5 className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                        {tmpl.name}
                      </h5>
                      {isActive && (
                        <span className="text-[10px] bg-indigo-100 text-indigo-600 font-bold px-2 py-0.5 rounded-full">
                          {t.applyingTag}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed mb-3">
                      {tmpl.description}
                    </p>
                    
                    {/* Visual specs preview dots */}
                    <div className="flex items-center gap-3 border-t border-gray-50 pt-3">
                      <div className="flex gap-1">
                        <span className="w-3.5 h-3.5 rounded-full border border-gray-200" style={{ backgroundColor: tmpl.theme.accentColor }}></span>
                      </div>
                      <span className="text-[10px] font-semibold text-gray-400 capitalize">
                        {tmpl.theme.buttonStyle === 'solid' ? t.solidBtn : tmpl.theme.buttonStyle === 'glass' ? t.glassBtn : t.outlineBtn}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: STYLE SETTINGS */}
        {activeTab === "style" && (
          <div className="space-y-6">
            
            {/* Background selection */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.bgTitle}</h4>
              <div className="grid grid-cols-2 gap-2">
                {bgPresets.map((preset) => {
                  const isActive = theme.background === preset.value;
                  return (
                    <button
                      key={preset.value}
                      onClick={() => setTheme({ ...theme, background: preset.value })}
                      className={`p-3 rounded-xl border text-[11px] font-semibold text-left transition-all truncate flex items-center justify-between ${
                        isActive 
                          ? 'border-indigo-500 bg-indigo-50/30 text-indigo-700' 
                          : 'border-gray-100 hover:border-gray-200 bg-white text-gray-600'
                      }`}
                    >
                      <span>{preset.name}</span>
                      {isActive && <Check className="w-3 h-3 shrink-0 text-indigo-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Accent Color Circle Selector */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.accentTitle}</h4>
              <div className="flex flex-wrap gap-2.5 pt-1">
                {accentPresets.map((color) => {
                  const isActive = theme.accentColor.toLowerCase() === color.toLowerCase();
                  return (
                    <button
                      key={color}
                      onClick={() => setTheme({ ...theme, accentColor: color })}
                      className="w-8 h-8 rounded-full border border-white relative transition-transform hover:scale-105 shadow-sm shrink-0 cursor-pointer flex items-center justify-center"
                      style={{ 
                        backgroundColor: color,
                        boxShadow: isActive ? `0 0 0 2.5px ${color}55` : "none" 
                      }}
                    >
                      {isActive && <Check className="w-4 h-4 text-white drop-shadow-sm" />}
                    </button>
                  );
                })}
                {/* Custom Color Input */}
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200 shadow-sm cursor-pointer hover:scale-105 transition-transform shrink-0">
                  <input 
                    type="color" 
                    value={theme.accentColor}
                    onChange={(e) => setTheme({ ...theme, accentColor: e.target.value })}
                    className="absolute inset-0 w-full h-full scale-150 cursor-pointer opacity-100 border-none p-0"
                    title={t.customColorTitle}
                  />
                </div>
              </div>
            </div>

            {/* Button Style selector */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.btnStyleTitle}</h4>
              <div className="grid grid-cols-3 gap-2 p-1 bg-gray-50 border border-gray-100 rounded-xl">
                {(["solid", "outline", "glass"] as const).map((style) => {
                  const isActive = theme.buttonStyle === style;
                  return (
                    <button
                      key={style}
                      onClick={() => setTheme({ ...theme, buttonStyle: style })}
                      className={`py-2 text-[10px] font-bold rounded-lg transition-all capitalize cursor-pointer ${
                        isActive 
                          ? 'bg-white shadow-sm text-gray-800' 
                          : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      {style === 'solid' ? t.solidBtn : style === 'glass' ? t.glassBtn : t.outlineBtn}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Corner Radius Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.btnRadiusTitle}</h4>
                <span className="text-[10px] font-bold text-gray-500">{theme.borderRadius}px</span>
              </div>
              <input 
                type="range"
                min="0"
                max="32"
                value={theme.borderRadius}
                onChange={(e) => setTheme({ ...theme, borderRadius: parseInt(e.target.value) })}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-semibold text-gray-400">
                <span>{t.radiusStraight}</span>
                <span>{t.radiusRound}</span>
                <span>{t.radiusFull}</span>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: AI ASSISTANT SETTINGS */}
        {activeTab === "assistant" && (
          <div className="space-y-5">
            
            <div className="bg-indigo-50/40 rounded-2xl p-4 border border-indigo-100/60 flex gap-3">
              <HelpCircle className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
              <p className="text-[10px] text-gray-500 leading-relaxed">
                {t.assistantSettingsDesc}
              </p>
            </div>

            {/* Assistant Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-500">{t.assistantNameLabel}</label>
              <input 
                type="text" 
                value={assistantName}
                onChange={(e) => setAssistantName(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-indigo-300 text-gray-800 font-semibold"
                placeholder={t.assistantNamePlaceholder}
              />
            </div>

            {/* Assistant Greeting */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-500">{t.assistantGreetingLabel}</label>
              <textarea 
                value={assistantGreeting}
                onChange={(e) => setAssistantGreeting(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-indigo-300 text-gray-700 resize-none h-20"
                placeholder={t.assistantGreetingPlaceholder}
                rows={3}
              />
            </div>

            {/* Suggestion Prompts */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-500 block">{t.assistantPromptsLabel}</label>
              {assistantPrompts.map((p, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-indigo-400">#{idx + 1}</span>
                  <input 
                    type="text" 
                    value={p}
                    onChange={(e) => handlePromptChange(idx, e.target.value)}
                    className="flex-1 p-2 text-xs rounded-lg border border-gray-200 focus:outline-none focus:border-indigo-300 text-gray-700"
                    placeholder={`${lang === "zh" ? "提示问句" : lang === "ja" ? "質問タグ" : "Suggested question"} ${idx + 1}`}
                  />
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
