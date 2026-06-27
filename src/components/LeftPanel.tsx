import React, { useState } from "react";
import { LinkBlock, Persona, ThemeSettings } from "../types";
import { Language, TRANSLATIONS } from "../i18n";
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  Edit2, 
  Check, 
  Loader2, 
  EyeOff, 
  Eye,
  Calendar, 
  Video, 
  Link as LinkIcon, 
  Mail, 
  Phone, 
  MapPin, 
  Store, 
  Instagram, 
  Music,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown
} from "lucide-react";

interface LeftPanelProps {
  lang: Language;
  persona: Persona;
  setPersona: React.Dispatch<React.SetStateAction<Persona>>;
  theme: ThemeSettings;
  setTheme: React.Dispatch<React.SetStateAction<ThemeSettings>>;
  assistantName: string;
  setAssistantName: (name: string) => void;
  assistantGreeting: string;
  setAssistantGreeting: (greeting: string) => void;
  assistantPrompts: string[];
  setAssistantPrompts: React.Dispatch<React.SetStateAction<string[]>>;
  gallery: string[];
  setGallery: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function LeftPanel({
  lang,
  persona,
  setPersona,
  theme,
  setTheme,
  assistantName,
  setAssistantName,
  assistantGreeting,
  setAssistantGreeting,
  assistantPrompts,
  setAssistantPrompts,
  gallery,
  setGallery
}: LeftPanelProps) {
  const t = TRANSLATIONS[lang];
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRewritingBio, setIsRewritingBio] = useState(false);
  const [isRewritingTitle, setIsRewritingTitle] = useState(false);
  
  // Prompt / Tag block editor states
  const [editingPromptIndex, setEditingPromptIndex] = useState<number | null>(null);
  const [editingPromptText, setEditingPromptText] = useState("");
  const [newPromptText, setNewPromptText] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");

  // Helper to show corresponding Lucide icon
  const getIconPreview = (name: string) => {
    switch (name) {
      case "calendar": return <Calendar className="w-4 h-4" />;
      case "video": return <Video className="w-4 h-4" />;
      case "mail": return <Mail className="w-4 h-4" />;
      case "phone": return <Phone className="w-4 h-4" />;
      case "map": return <MapPin className="w-4 h-4" />;
      case "store": return <Store className="w-4 h-4" />;
      case "instagram": return <Instagram className="w-4 h-4" />;
      case "music": return <Music className="w-4 h-4" />;
      default: return <LinkIcon className="w-4 h-4" />;
    }
  };

  // AI 智能建站 / 页面一键生成
  const handleGeneratePage = async () => {
    if (!aiPrompt.trim() || isGenerating) return;
    setIsGenerating(true);

    try {
      const response = await fetch("/api/generate-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt })
      });

      const data = await response.json();
      if (response.ok) {
        // 更新人设
        setPersona({
          name: data.title,
          bio: data.bio,
          avatarUrl: data.avatarUrl
        });

        // 更新主题
        setTheme({
          background: data.theme.background,
          accentColor: data.theme.accentColor,
          buttonStyle: data.theme.buttonStyle,
          borderRadius: data.theme.borderRadius
        });

        // 智能助理定制
        const isJa = lang === "ja";
        const generatedAssistantName = isJa 
          ? `${data.title} の AI アシスタント`
          : `${data.title}'s AI Assistant`;
        const generatedGreeting = isJa
          ? `こんにちは！${data.title} の AI 仮想アシスタントです。何かお手伝いできることはありますか？`
          : `Hello! I am the AI Assistant for ${data.title}. How can I assist you today?`;
        
        const defaultPrompts = isJa
          ? ["詳しく知りたい", "連絡先はどこ？", "おすすめサービスは？"]
          : ["Learn More", "How to Contact?", "Special Recommendations?"];

        setAssistantName(generatedAssistantName);
        setAssistantGreeting(generatedGreeting);
        setAssistantPrompts(defaultPrompts);

        setAiPrompt("");
      } else {
        alert(data.error || "Generation failed. Please try again.");
      }
    } catch (err: any) {
      alert("AI Generation request failed. Please check your GEMINI_API_KEY in Settings.");
    } finally {
      setIsGenerating(false);
    }
  };

  // AI 简介润色
  const handleRewriteBio = async () => {
    if (!persona.bio.trim() || isRewritingBio) return;
    setIsRewritingBio(true);

    try {
      const response = await fetch("/api/optimize-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: persona.bio, type: "bio" })
      });
      const data = await response.json();
      if (response.ok && data.result) {
        setPersona(prev => ({ ...prev, bio: data.result }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsRewritingBio(false);
    }
  };

  // AI 标语润色
  const handleRewriteTitle = async () => {
    if (!persona.title?.trim() || isRewritingTitle) return;
    setIsRewritingTitle(true);

    try {
      const response = await fetch("/api/optimize-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: persona.title, type: "title" })
      });
      const data = await response.json();
      if (response.ok && data.result) {
        setPersona(prev => ({ ...prev, title: data.result }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsRewritingTitle(false);
    }
  };

  // Add recommended prompt
  const handleAddPrompt = () => {
    if (!newPromptText.trim()) return;
    setAssistantPrompts(prev => [...prev, newPromptText.trim()]);
    setNewPromptText("");
  };

  // Save prompt edit
  const handleSavePrompt = (index: number) => {
    if (!editingPromptText.trim()) return;
    setAssistantPrompts(prev => prev.map((p, i) => i === index ? editingPromptText.trim() : p));
    setEditingPromptIndex(null);
    setEditingPromptText("");
  };

  // Delete prompt
  const handleDeletePrompt = (index: number) => {
    setAssistantPrompts(prev => prev.filter((_, i) => i !== index));
    if (editingPromptIndex === index) {
      setEditingPromptIndex(null);
      setEditingPromptText("");
    }
  };

  // Reorder prompts
  const movePrompt = (index: number, direction: "up" | "down") => {
    const nextIndex = direction === "up" ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= assistantPrompts.length) return;
    setAssistantPrompts(prev => {
      const updated = [...prev];
      const temp = updated[index];
      updated[index] = updated[nextIndex];
      updated[nextIndex] = temp;
      return updated;
    });
  };

  return (
    <div className="w-[410px] border-r border-gray-100 overflow-y-auto bg-white p-6 flex flex-col gap-6 select-none scrollbar-thin">
      
      {/* 1. AI Instant Generator Block */}
      <div className="border border-indigo-100/80 rounded-2xl p-5 bg-gradient-to-br from-indigo-50/20 via-white to-white shadow-sm flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-500 shrink-0" />
          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">{t.aiGenTitle}</h3>
        </div>
        <p className="text-[11px] text-gray-500 leading-relaxed -mt-1.5">
          {t.aiGenDesc}
        </p>

        <textarea 
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-indigo-300 text-gray-700 min-h-16 resize-none"
          placeholder={t.aiGenPlaceholder}
          rows={2}
        />

        <button
          onClick={handleGeneratePage}
          disabled={!aiPrompt.trim() || isGenerating}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-100 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
          <span>{isGenerating ? t.aiGenLoading : t.aiGenBtn}</span>
        </button>
      </div>

      {/* 2. 个人/主体基本信息设定 */}
      <div className="border border-gray-100 rounded-2xl p-5 bg-white shadow-sm flex flex-col gap-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.personaSection}</h3>
        
        {/* Avatar Setup Row */}
        <div className="flex items-center gap-4">
          <div className="relative group cursor-pointer w-16 h-16 rounded-full overflow-hidden border border-gray-100 shadow-sm shrink-0 bg-gray-50">
            <img 
              alt="Avatar Editor" 
              src={persona.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"} 
              className="w-full h-full object-cover group-hover:brightness-90 transition-all"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold text-gray-500">{t.avatarLabel}</label>
            <input 
              type="text" 
              value={persona.avatarUrl}
              onChange={(e) => setPersona({ ...persona, avatarUrl: e.target.value })}
              className="w-full p-2 text-[11px] rounded-lg border border-gray-200 focus:outline-none focus:border-indigo-300 text-gray-700 font-mono"
              placeholder={t.avatarPlaceholder}
            />
          </div>
        </div>

        {/* Name Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-gray-500">{t.nameLabel}</label>
          <input 
            type="text" 
            value={persona.name}
            onChange={(e) => setPersona({ ...persona, name: e.target.value })}
            className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-indigo-300 text-gray-800 font-semibold"
            placeholder={t.namePlaceholder}
          />
        </div>

        {/* Title Input */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <label className="text-[11px] font-semibold text-gray-500">{t.titleLabel}</label>
            <button
              onClick={handleRewriteTitle}
              disabled={isRewritingTitle || !persona.title}
              className="text-[10px] text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-0.5 disabled:opacity-40"
            >
              {isRewritingTitle ? <Loader2 className="w-2.5 h-2.5 animate-spin" /> : <Sparkles className="w-2.5 h-2.5" />}
              {isRewritingTitle ? t.optimizing : t.optimizeBtn}
            </button>
          </div>
          <input 
            type="text" 
            value={persona.title || ""}
            onChange={(e) => setPersona({ ...persona, title: e.target.value })}
            className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-indigo-300 text-gray-800"
            placeholder={t.titlePlaceholder}
          />
        </div>

        {/* Bio Text Area */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <label className="text-[11px] font-semibold text-gray-500">{t.bioLabel}</label>
            <button
              onClick={handleRewriteBio}
              disabled={isRewritingBio || !persona.bio}
              className="text-[10px] text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-0.5 disabled:opacity-40"
            >
              {isRewritingBio ? <Loader2 className="w-2.5 h-2.5 animate-spin" /> : <Sparkles className="w-2.5 h-2.5" />}
              {isRewritingBio ? t.optimizing : t.optimizeBtn}
            </button>
          </div>
          <textarea 
            value={persona.bio}
            onChange={(e) => setPersona({ ...persona, bio: e.target.value })}
            className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-indigo-300 text-gray-700 min-h-16 resize-none"
            placeholder={t.bioPlaceholder}
            rows={3}
          />
        </div>
      </div>

      {/* 3. AI 智能助理推荐访客问题 */}
      <div className="border border-gray-100 rounded-2xl p-5 bg-white shadow-sm flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.assistantPromptsLabel}</h3>
          <span className="text-[10px] bg-indigo-50 text-indigo-600 font-bold px-2.5 py-0.5 rounded-full">
            {assistantPrompts.length} {t.promptsCount}
          </span>
        </div>

        <p className="text-[11px] text-gray-500 leading-relaxed -mt-1">
          {t.promptsDesc}
        </p>

        {/* Prompts list */}
        <div className="space-y-3">
          {assistantPrompts.map((prompt, index) => {
            const isEditing = editingPromptIndex === index;
            return (
              <div 
                key={index} 
                className={`border rounded-xl p-3.5 transition-all bg-white relative ${
                  isEditing 
                    ? 'border-indigo-300 shadow-md shadow-indigo-50/50' 
                    : 'border-gray-100 shadow-sm hover:border-gray-200'
                }`}
              >
                {/* Regular Prompt Row */}
                {!isEditing ? (
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-indigo-500 font-mono">#{index + 1}</span>
                    <p className="flex-1 text-xs font-medium text-gray-800 truncate">
                      {prompt}
                    </p>

                    {/* Right utilities */}
                    <div className="flex items-center gap-1 shrink-0">
                      {/* Move Up */}
                      <button 
                        onClick={() => movePrompt(index, "up")}
                        disabled={index === 0}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-20 transition-opacity cursor-pointer"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      {/* Move Down */}
                      <button 
                        onClick={() => movePrompt(index, "down")}
                        disabled={index === assistantPrompts.length - 1}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-20 transition-opacity cursor-pointer"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>

                      {/* Edit */}
                      <button 
                        onClick={() => {
                          setEditingPromptIndex(index);
                          setEditingPromptText(prompt);
                        }}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                        title="Edit Question"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete */}
                      <button 
                        onClick={() => handleDeletePrompt(index)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  // Expanded Editable Form Block
                  <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between items-center pb-1.5 border-b border-gray-50">
                      <span className="text-[10px] font-bold text-indigo-600 uppercase">{t.editPromptTitle}</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setEditingPromptIndex(null)}
                          className="text-[10px] text-gray-400 hover:text-gray-600 font-semibold"
                        >
                          {t.cancelBtn}
                        </button>
                        <button 
                          onClick={() => handleSavePrompt(index)}
                          className="text-[10px] text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-0.5"
                        >
                          <Check className="w-3 h-3" />
                          <span>{t.saveBtn}</span>
                        </button>
                      </div>
                    </div>

                    <input 
                      type="text" 
                      value={editingPromptText}
                      onChange={(e) => setEditingPromptText(e.target.value)}
                      className="w-full p-2 text-xs rounded-lg border border-gray-200 focus:outline-none focus:border-indigo-300 text-gray-800"
                      placeholder="Edit recommend question..."
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Input box to add a new tag */}
        <div className="flex gap-2 pt-2">
          <input 
            type="text"
            value={newPromptText}
            onChange={(e) => setNewPromptText(e.target.value)}
            placeholder={t.addPromptPlaceholder}
            className="flex-1 p-2 text-xs rounded-lg border border-gray-200 focus:outline-none focus:border-indigo-300 text-gray-700"
          />
          <button
            onClick={handleAddPrompt}
            disabled={!newPromptText.trim()}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0"
          >
            {t.addPromptBtn}
          </button>
        </div>
      </div>

      {/* 3. 精选相册/图集展位 */}
      <div className="border border-gray-100 rounded-2xl p-5 bg-white shadow-sm flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.gallerySection}</h3>
          <span className="text-[10px] bg-indigo-50 text-indigo-600 font-bold px-2.5 py-0.5 rounded-full">
            {gallery.length} Images
          </span>
        </div>

        <p className="text-[11px] text-gray-500 leading-relaxed -mt-1">
          {t.galleryDesc}
        </p>

        {/* Gallery grid list */}
        {gallery.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {gallery.map((url, idx) => (
              <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group border border-gray-100 bg-gray-50">
                <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-1">
                  <button 
                    onClick={() => {
                      const updated = gallery.filter((_, i) => i !== idx);
                      setGallery(updated);
                    }}
                    className="p-1 rounded bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  {idx > 0 && (
                    <button 
                      onClick={() => {
                        const updated = [...gallery];
                        const temp = updated[idx];
                        updated[idx] = updated[idx - 1];
                        updated[idx - 1] = temp;
                        setGallery(updated);
                      }}
                      className="p-1 rounded bg-white/25 hover:bg-white/40 text-white cursor-pointer"
                      title="Move Forward"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {idx < gallery.length - 1 && (
                    <button 
                      onClick={() => {
                        const updated = [...gallery];
                        const temp = updated[idx];
                        updated[idx] = updated[idx + 1];
                        updated[idx + 1] = temp;
                        setGallery(updated);
                      }}
                      className="p-1 rounded bg-white/25 hover:bg-white/40 text-white cursor-pointer"
                      title="Move Backward"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 border border-dashed border-gray-100 rounded-xl bg-gray-50/50">
            <span className="text-[11px] text-gray-400 font-medium">No images yet, add some below</span>
          </div>
        )}

        {/* Custom image URL adder */}
        <div className="flex gap-2">
          <input 
            type="text"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            placeholder={t.addImgPlaceholder}
            className="flex-1 p-2 text-xs rounded-lg border border-gray-200 focus:outline-none focus:border-indigo-300 text-gray-700 font-mono"
          />
          <button
            onClick={() => {
              if (newImageUrl.trim()) {
                setGallery([...gallery, newImageUrl.trim()]);
                setNewImageUrl("");
              }
            }}
            disabled={!newImageUrl.trim()}
            className="px-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0"
          >
            {t.addImgBtn}
          </button>
        </div>

        {/* Curated Pre-set quick-add buttons */}
        <div className="flex flex-col gap-1.5 pt-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase">Quick Add Royalty-Free Photos</span>
          <div className="flex flex-wrap gap-1.5">
            {[
              { label: "🥐 Croissant", url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80" },
              { label: "🍵 Matcha", url: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=400&q=80" },
              { label: "💼 Office", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80" },
              { label: "💻 Code", url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80" },
              { label: "🧘‍♀️ Yoga", url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80" },
              { label: "🏃‍♀️ Sport", url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80" },
              { label: "🌌 Cyber Neon", url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=400&q=80" }
            ].map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setGallery([...gallery, p.url]);
                }}
                className="text-[9px] bg-gray-50 hover:bg-indigo-50 border border-gray-100 text-gray-600 hover:text-indigo-600 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
              >
                + {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
