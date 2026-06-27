import React, { useState, useRef, useEffect } from "react";
import { ThemeSettings, Persona } from "../types";
import { Language, TRANSLATIONS } from "../i18n";
import { 
  Calendar, 
  Video, 
  Link as LinkIcon, 
  Mail, 
  Phone, 
  MapPin, 
  Store, 
  Instagram, 
  Music, 
  Send, 
  Sparkles, 
  Loader2, 
  ChevronRight, 
  X,
  ArrowLeft,
  Check,
  Globe,
  Share2
} from "lucide-react";

interface LivePreviewProps {
  lang: Language;
  persona: Persona;
  theme: ThemeSettings;
  assistantName: string;
  assistantGreeting: string;
  assistantPrompts: string[];
  gallery?: string[];
  onClose: () => void;
  mode: "preview" | "publish";
}

const getShortKeyword = (prompt: string): string => {
  if (!prompt) return "";
  const lowercase = prompt.toLowerCase();
  
  // 1. Core Action / Topic mapping for both Japanese & English
  if (prompt.includes("注文") || lowercase.includes("order") || lowercase.includes("buy") || lowercase.includes("purchase")) {
    return /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(prompt) ? "注文方法" : "Order";
  }
  if (prompt.includes("シングル") || prompt.includes("曲") || prompt.includes("音楽") || lowercase.includes("music") || lowercase.includes("track") || lowercase.includes("listen") || lowercase.includes("single")) {
    return /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(prompt) ? "最新曲" : "Music";
  }
  if (prompt.includes("実績") || prompt.includes("コラボ") || prompt.includes("ブランド") || lowercase.includes("brand") || lowercase.includes("collab") || lowercase.includes("client")) {
    return /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(prompt) ? "実績・コラボ" : "Brands";
  }
  if (prompt.includes("連絡") || prompt.includes("コンタクト") || lowercase.includes("contact") || lowercase.includes("touch") || lowercase.includes("reach") || lowercase.includes("email")) {
    return /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(prompt) ? "連絡先" : "Contact";
  }
  if (prompt.includes("おすすめ") || prompt.includes("お勧め") || prompt.includes("推薦") || lowercase.includes("recommend") || lowercase.includes("special") || lowercase.includes("featured")) {
    return /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(prompt) ? "おすすめ" : "Featured";
  }
  if (prompt.includes("経歴") || prompt.includes("履歴") || prompt.includes("職歴") || prompt.includes("キャリア") || lowercase.includes("experience") || lowercase.includes("resume") || lowercase.includes("career") || lowercase.includes("history")) {
    return /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(prompt) ? "経歴紹介" : "Experience";
  }
  if (prompt.includes("プロジェクト") || prompt.includes("作品") || prompt.includes("ポートフォリオ") || lowercase.includes("project") || lowercase.includes("portfolio") || lowercase.includes("work")) {
    return /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(prompt) ? "主要実績" : "Portfolio";
  }
  if (prompt.includes("詳細") || prompt.includes("詳しく") || lowercase.includes("details") || lowercase.includes("learn more") || lowercase.includes("info")) {
    return /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(prompt) ? "詳細情報" : "About";
  }
  if (prompt.includes("メニュー") || prompt.includes("今日") || lowercase.includes("menu") || lowercase.includes("today") || lowercase.includes("bake") || lowercase.includes("drink")) {
    return /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(prompt) ? "メニュー" : "Menu";
  }
  if (prompt.includes("予約") || prompt.includes("アポ") || lowercase.includes("reserve") || lowercase.includes("book") || lowercase.includes("appointment")) {
    return /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(prompt) ? "予約窓口" : "Book Now";
  }

  // 2. Fallback filtering for English non-matching prompts
  const isJapanese = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(prompt);
  if (!isJapanese) {
    // Strip punctuation and split into words
    const clean = prompt.replace(/[？\?！!。、,.:;'"()]/g, "");
    const words = clean.trim().split(/\s+/).filter(Boolean);
    
    // English stop words lists
    const stopWords = new Set([
      "what", "are", "can", "i", "you", "your", "with", "her", "his", "their", 
      "our", "the", "a", "an", "to", "for", "in", "on", "at", "about", "how", 
      "do", "get", "is", "of", "and", "or", "who", "where", "why", "we", "us", "me", "tell", "show"
    ]);

    // Keep words that are not stop words
    const meaningfulWords = words.filter(w => !stopWords.has(w.toLowerCase()));
    
    if (meaningfulWords.length > 0) {
      // Capitalize first letter of each meaningful word
      const capitalized = meaningfulWords.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
      return capitalized.slice(0, 2).join(" ");
    }
    
    // Safe ultimate fallback
    return "More Info";
  }

  // 3. Fallback for Japanese
  const cleanJa = prompt.replace(/[？\?！!。、,]/g, "");
  if (cleanJa.length > 5) {
    const parts = cleanJa.split(/[のはをがにで]/);
    if (parts[0] && parts[0].length >= 2) return parts[0].slice(0, 5);
    return cleanJa.slice(0, 4);
  }
  return cleanJa;
};

export default function LivePreview({
  lang,
  persona,
  theme,
  assistantName,
  assistantGreeting,
  assistantPrompts,
  gallery,
  onClose,
  mode
}: LivePreviewProps) {
  const t = TRANSLATIONS[lang];
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, chatOpen]);

  // Initial greeting
  useEffect(() => {
    setMessages([
      { role: "assistant", text: assistantGreeting }
    ]);
  }, [assistantGreeting]);

  // Chat message submission
  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg = textToSend.trim();
    setInputMessage("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/assistant-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          history: messages.slice(-6).map(m => ({ role: m.role, text: m.text })),
          persona: {
            name: persona.name,
            bio: persona.bio,
            title: persona.title
          }
        })
      });

      const data = await response.json();
      if (response.ok) {
        setMessages(prev => [...prev, { role: "assistant", text: data.reply }]);
      } else {
        const errMsg = lang === "ja" 
          ? `エラー: ${data.error || "アシスタントに接続できません"}`
          : `Error: ${data.error || "Unable to connect to assistant"}`;
        setMessages(prev => [...prev, { role: "assistant", text: errMsg }]);
      }
    } catch (err: any) {
      const timeoutMsg = lang === "ja"
        ? `タイムアウトまたはエラーが発生しました。"設定 > 鍵"にGEMINI_API_KEYを正しく构成してください。`
        : `Timeout or error. Please check your GEMINI_API_KEY is configured correctly in Settings.`;
      setMessages(prev => [...prev, { role: "assistant", text: timeoutMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonStyles = (accent: string, radius: number) => {
    const radiusStyle = { borderRadius: `${radius / 4}px` };
    
    switch (theme.buttonStyle) {
      case "outline":
        return {
          style: { 
            borderColor: accent, 
            color: accent,
            ...radiusStyle 
          },
          className: "w-full py-4 px-6 border bg-transparent hover:bg-opacity-10 font-semibold text-sm hover:scale-98 transition-all flex items-center justify-between group shadow-sm bg-white/40"
        };
      case "glass":
        return {
          style: { 
            borderColor: `${accent}33`, 
            color: accent,
            ...radiusStyle 
          },
          className: "w-full py-4 px-6 border bg-white/10 backdrop-blur-md hover:bg-white/20 font-semibold text-sm hover:scale-98 transition-all flex items-center justify-between group shadow-sm"
        };
      case "solid":
      default:
        return {
          style: { 
            backgroundColor: accent, 
            color: "#ffffff",
            ...radiusStyle 
          },
          className: "w-full py-4 px-6 font-semibold text-sm hover:scale-98 transition-all flex items-center justify-between group shadow-lg shadow-black/10"
        };
    }
  };

  const isDarkBg = theme.background.includes("bg-[#131313]") || theme.background.includes("bg-[#111111]");

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareTooltip(true);
    setTimeout(() => setShowShareTooltip(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col w-screen h-screen overflow-hidden bg-gray-950 font-sans antialiased text-gray-800 animate-fade-in">
      
      {/* 1. Preview Top Control Banner */}
      <div className="h-14 bg-gray-900 border-b border-gray-800 px-4 md:px-8 flex items-center justify-between text-white shrink-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors text-xs font-bold text-gray-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === "ja" ? "エディタに戻る" : "Back to Editor"}</span>
          </button>
          
          <div className="h-4 w-px bg-gray-800"></div>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            {mode === "publish" ? (
              <span className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded-md border border-emerald-500/20">
                <Check className="w-3 h-3" />
                <span>{lang === "ja" ? "公開済み" : "Published Live"}</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 bg-indigo-500/10 text-indigo-400 font-bold px-2 py-0.5 rounded-md border border-indigo-500/20">
                <Globe className="w-3 h-3" />
                <span>{lang === "ja" ? "プレビュー中" : "Preview Mode"}</span>
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleShare}
            className="relative flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors text-xs font-bold text-gray-200 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{lang === "ja" ? "リンクをコピー" : "Share Link"}</span>
            {showShareTooltip && (
              <div className="absolute top-10 right-0 bg-gray-800 border border-gray-700 text-[10px] text-white px-2 py-1 rounded shadow-lg whitespace-nowrap">
                {lang === "ja" ? "コピーしました！" : "Link copied!"}
              </div>
            )}
          </button>
        </div>
      </div>

      {/* 2. Fullscreen Render Container */}
      <div className={`flex-1 overflow-y-auto w-full relative transition-all duration-300 ${theme.background} flex justify-center py-10 px-4 md:py-16`}>
        {/* Decorative blur spot */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ backgroundColor: theme.accentColor }}></div>

        {/* Constrained responsive card */}
        <div className="w-full max-w-xl relative z-10 flex flex-col items-center">
          
          {/* Profile Details */}
          <div className="flex flex-col items-center w-full mb-8 text-center mt-4">
            <div className="relative mb-5">
              <img 
                alt={persona.name} 
                className="w-28 h-28 rounded-full border-4 border-white shadow-xl object-cover"
                src={persona.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"}
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-1 right-2 bg-emerald-500 w-5 h-5 rounded-full border-2 border-white"></div>
            </div>
            
            <h1 className={`text-3xl font-black mb-1.5 tracking-tight ${isDarkBg ? 'text-white' : 'text-gray-900'}`}>{persona.name}</h1>
            {persona.title && (
              <p className="text-sm font-bold px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-gray-500 dark:text-gray-300 mb-3 inline-block">
                {persona.title}
              </p>
            )}
            <p className={`text-sm max-w-[420px] leading-relaxed ${isDarkBg ? 'text-gray-300' : 'text-gray-600'}`}>
              {persona.bio}
            </p>
          </div>

          {/* Gallery Showcase */}
          {gallery && gallery.length > 0 && (
            <div className="w-full mb-8 animate-fade-in">
              <div className={`grid gap-3 ${
                gallery.length === 1 ? "grid-cols-1" : gallery.length === 2 ? "grid-cols-2" : "grid-cols-3"
              }`}>
                {gallery.map((url, idx) => (
                  <div 
                    key={idx} 
                    className="aspect-square overflow-hidden shadow-md border border-white/20 group relative cursor-pointer"
                    style={{ borderRadius: `${Math.max(8, theme.borderRadius)}px` }}
                  >
                    <img 
                      src={url} 
                      alt={`Showcase ${idx}`} 
                      className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dopes Panel (Recommended Questions) */}
          <div className="w-full flex flex-col gap-4 mt-2">
            <div className={`text-2xl font-black text-left ${isDarkBg ? "text-white" : "text-black"} tracking-tight mb-1`}>
              Dopes
            </div>
            <div className="grid grid-cols-2 gap-3 w-full">
              {assistantPrompts.length === 0 ? (
                <div className="col-span-2 text-center py-12 px-6 rounded-2xl border border-dashed border-gray-300/40 bg-white/10 backdrop-blur-sm">
                  <p className="text-sm text-gray-500">{t.chatNoPrompts}</p>
                </div>
              ) : (
                assistantPrompts.map((prompt, idx) => {
                  const buttonStyles = getButtonStyles(theme.accentColor, theme.borderRadius);
                  const shortLabel = getShortKeyword(prompt);
                  return (
                    <button 
                      key={idx}
                      onClick={() => {
                        setChatOpen(true);
                        handleSendMessage(prompt);
                      }}
                      {...buttonStyles}
                      className={`${buttonStyles.className} text-center text-sm md:text-base justify-center group cursor-pointer w-full py-4 px-4 font-black hover:scale-102 transition-all`}
                      title={prompt}
                    >
                      <span className="truncate font-black text-center">{shortLabel}</span>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Bottom Space */}
          <div className="h-32"></div>

        </div>
      </div>

      {/* 3. Floating Interactive Chat Widget */}
      {!chatOpen ? (
        <button 
          onClick={() => setChatOpen(true)}
          className="fixed bottom-8 right-8 z-40 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 py-3.5 px-6 flex items-center gap-2.5 border border-white/20 font-bold text-sm text-white cursor-pointer whitespace-nowrap"
          style={{ 
            backgroundColor: theme.accentColor,
            borderRadius: '9999px',
            boxShadow: `0 10px 25px ${theme.accentColor}4d`
          }}
        >
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>{t.clickToChat}</span>
        </button>
      ) : (
        <div 
          className="fixed bottom-8 right-8 z-40 flex flex-col bg-white border border-gray-100/80 shadow-2xl overflow-hidden h-[450px] w-[360px] max-w-[calc(100vw-2rem)] transition-all duration-300 animate-fade-in"
          style={{ borderRadius: "24px" }}
        >
          {/* Header */}
          <div className="h-14 px-5 flex items-center justify-between border-b border-gray-50 bg-gray-50/50 select-none shrink-0">
            <div className="flex items-center gap-2.5">
              <div 
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${theme.accentColor}1a`, color: theme.accentColor }}
              >
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-sm font-extrabold text-gray-800">{assistantName || t.chatHeaderDefault}</span>
            </div>
            <button 
              onClick={() => setChatOpen(false)}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 flex flex-col overflow-hidden bg-gray-50/10">
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs md:text-sm">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'text-white rounded-tr-none' 
                        : 'bg-white text-gray-800 border border-gray-100/50 rounded-tl-none'
                    }`}
                    style={msg.role === 'user' ? { backgroundColor: theme.accentColor } : undefined}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-2 text-gray-400 text-xs">
                    <Loader2 className="w-4 h-4 animate-spin" style={{ color: theme.accentColor }} />
                    <span>{lang === "ja" ? "AIは考え中..." : "AI is thinking..."}</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick-action prompt chips inside the chat */}
            {assistantPrompts.length > 0 && (
              <div className="px-4 py-2.5 flex gap-2 bg-gray-50/80 border-t border-gray-100/50 overflow-x-auto scrollbar-none shrink-0 w-full">
                {assistantPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(p)}
                    className="text-xs px-3 py-1.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all shadow-sm cursor-pointer whitespace-nowrap text-gray-700 font-bold shrink-0 flex items-center gap-1"
                    style={{ borderRadius: '9999px' }}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{p}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputMessage);
              }}
              className="p-3 bg-white border-t border-gray-100 flex items-center gap-2 shrink-0"
            >
              <input 
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={t.chatInputPlaceholder}
                disabled={isLoading}
                className="flex-1 bg-gray-50 border border-gray-100 rounded-full px-4 py-2.5 text-xs md:text-sm focus:outline-none focus:bg-white transition-all text-gray-800"
              />
              <button 
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="w-9 h-9 rounded-full disabled:opacity-40 text-white flex items-center justify-center shrink-0 shadow-md transition-all duration-200 cursor-pointer"
                style={{ 
                  backgroundColor: theme.accentColor, 
                  boxShadow: `0 4px 12px ${theme.accentColor}33`
                }}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
