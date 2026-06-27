import React, { useState, useRef, useEffect } from "react";
import { LinkBlock, ThemeSettings, Persona } from "../types";
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
  X
} from "lucide-react";

interface PhonePreviewProps {
  lang: Language;
  persona: Persona;
  theme: ThemeSettings;
  assistantName: string;
  assistantGreeting: string;
  assistantPrompts: string[];
  gallery?: string[];
}

export default function PhonePreview({
  lang,
  persona,
  theme,
  assistantName,
  assistantGreeting,
  assistantPrompts,
  gallery
}: PhonePreviewProps) {
  const t = TRANSLATIONS[lang];
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  
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

  // Get matching icon for link blocks
  const getLinkIcon = (iconName: string, color: string) => {
    const props = { className: "w-5 h-5", style: { color } };
    switch (iconName.toLowerCase()) {
      case "calendar":
        return <Calendar {...props} />;
      case "video":
        return <Video {...props} />;
      case "mail":
        return <Mail {...props} />;
      case "phone":
        return <Phone {...props} />;
      case "map":
        return <MapPin {...props} />;
      case "store":
        return <Store {...props} />;
      case "instagram":
        return <Instagram {...props} />;
      case "music":
        return <Music {...props} />;
      default:
        return <LinkIcon {...props} />;
    }
  };

  // Chat message submission
  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg = textToSend.trim();
    setInputMessage("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setIsLoading(true);

    try {
      // 传递当前的人设，让后端模型能够生成切合的人格
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
        const errMsg = lang === "zh" 
          ? `出错了: ${data.error || "无法连线小助手"}` 
          : lang === "ja" 
            ? `エラー: ${data.error || "アシスタントに接続できません"}`
            : `Error: ${data.error || "Unable to connect to assistant"}`;
        setMessages(prev => [...prev, { role: "assistant", text: errMsg }]);
      }
    } catch (err: any) {
      const timeoutMsg = lang === "zh"
        ? `连接超时或出错了，请确认在"设置 > 密钥"里正确配置了 GEMINI_API_KEY。`
        : lang === "ja"
          ? `タイムアウトまたはエラーが発生しました。"設定 > 鍵"にGEMINI_API_KEYを正しく構成してください。`
          : `Timeout or error. Please check your GEMINI_API_KEY is configured correctly in Settings.`;
      setMessages(prev => [...prev, { role: "assistant", text: timeoutMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Button class generator based on buttonStyle selection
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

  return (
    <div className="relative w-[390px] h-[812px] rounded-[3rem] border-[14px] border-gray-900 bg-white shadow-2xl overflow-hidden shrink-0 flex flex-col select-none my-auto">
      {/* Phone Status Bar / Notch */}
      <div className="absolute top-0 inset-x-0 h-8 flex justify-center z-50">
        <div className="w-36 h-5 bg-gray-900 rounded-b-2xl flex items-center justify-between px-6">
          <span className="text-[10px] text-white font-medium">9:41</span>
          <div className="w-12 h-1 bg-gray-700 rounded-full"></div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-white/40 scale-75"></div>
            <div className="w-3.5 h-2 bg-white rounded-sm scale-75"></div>
          </div>
        </div>
      </div>

      {/* Main Screen Content */}
      <div className={`flex-1 overflow-y-auto scrollbar-none w-full flex flex-col items-center py-12 px-6 relative transition-all duration-300 ${theme.background}`}>
        {/* Soft Background blur spot for glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ backgroundColor: theme.accentColor }}></div>

        {/* Profile Section */}
        <div className="relative z-10 flex flex-col items-center w-full mt-6 mb-8 text-center">
          <div className="relative mb-4 group/p">
            <img 
              alt={persona.name} 
              className="w-24 h-24 rounded-full border-4 border-white/80 shadow-md object-cover transition-transform group-hover/p:scale-105 duration-300"
              src={persona.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"}
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-1 right-1 bg-emerald-500 w-4 h-4 rounded-full border-2 border-white"></div>
          </div>
          
          <h1 className={`text-xl font-bold mb-1 ${isDarkBg ? 'text-white' : 'text-gray-900'}`}>{persona.name}</h1>
          {persona.title && (
            <p className="text-xs font-semibold px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 text-gray-500 dark:text-gray-300 mb-2 inline-block">
              {persona.title}
            </p>
          )}
          <p className={`text-xs max-w-[280px] leading-relaxed ${isDarkBg ? 'text-gray-300' : 'text-gray-600'}`}>
            {persona.bio}
          </p>
        </div>

        {/* Gallery / Image Showcase Section */}
        {gallery && gallery.length > 0 && (
          <div className="relative z-10 w-full mb-6 animate-fade-in">
            <div className={`grid gap-2 ${
              gallery.length === 1 ? "grid-cols-1" : gallery.length === 2 ? "grid-cols-2" : "grid-cols-3"
            }`}>
              {gallery.map((url, idx) => (
                <div 
                  key={idx} 
                  className="aspect-square overflow-hidden shadow-sm border border-white/20 group relative cursor-pointer"
                  style={{ borderRadius: `${Math.max(4, Math.min(theme.borderRadius / 4, 20))}px` }}
                >
                  <img 
                    src={url} 
                    alt={`Showcase ${idx}`} 
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-108"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle hover overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                    <span className="text-[9px] text-white/90 font-medium translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                      {lang === "zh" ? "大图" : lang === "ja" ? "画像" : "Image"} {idx + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Visitor Tags / Prompts directly on the Home Screen */}
        <div className="relative z-10 w-full flex-1 flex flex-col gap-3.5 mt-2">
          <div className="space-y-3">
            {assistantPrompts.length === 0 ? (
              <div className="text-center py-8 px-4 rounded-2xl border border-dashed border-gray-300/40 bg-white/10 backdrop-blur-sm">
                <p className="text-xs text-gray-500">{t.chatNoPrompts}</p>
              </div>
            ) : (
              assistantPrompts.map((prompt, idx) => {
                // Generate button style matching the theme
                const buttonStyles = getButtonStyles(theme.accentColor, theme.borderRadius);
                return (
                  <button 
                    key={idx}
                    onClick={() => {
                      setChatOpen(true);
                      handleSendMessage(prompt);
                    }}
                    {...buttonStyles}
                    className={`${buttonStyles.className} text-left text-xs flex items-center justify-between group cursor-pointer w-full`}
                  >
                    <span className="truncate pr-2 font-medium">{prompt}</span>
                    <ChevronRight className="w-4 h-4 opacity-55 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Space pusher */}
        <div className="h-20"></div>
      </div>

      {/* Floating Chat Widget */}
      {!chatOpen ? (
        /* Floating Button Pill */
        <button 
          onClick={() => setChatOpen(true)}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 shadow-lg hover:shadow-xl hover:scale-102 active:scale-95 transition-all duration-200 py-2.5 px-5 flex items-center gap-2 border border-white/20 font-semibold text-xs text-white cursor-pointer whitespace-nowrap"
          style={{ 
            backgroundColor: theme.accentColor,
            borderRadius: '9999px',
            boxShadow: `0 8px 20px ${theme.accentColor}4d`
          }}
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>{t.clickToChat}</span>
        </button>
      ) : (
        /* Floating Dialog Box Card */
        <div 
          className="absolute bottom-6 inset-x-4 z-30 flex flex-col bg-white border border-gray-100/80 shadow-2xl overflow-hidden h-[360px] transition-all duration-300 animate-fade-in"
          style={{ borderRadius: `${Math.max(12, theme.borderRadius)}px` }}
        >
          {/* Dialog Header */}
          <div 
            className="h-11 px-4 flex items-center justify-between border-b border-gray-50 bg-gray-50/50 select-none shrink-0"
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${theme.accentColor}1a`, color: theme.accentColor }}
              >
                <Sparkles className="w-3 h-3" />
              </div>
              <span className="text-xs font-bold text-gray-800">{assistantName || t.chatHeaderDefault}</span>
            </div>
            <button 
              onClick={() => setChatOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              title={lang === "zh" ? "收起" : lang === "ja" ? "閉じる" : "Close"}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 flex flex-col overflow-hidden bg-gray-50/20">
            {/* Scrollable messages panel */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3 scrollbar-none text-xs">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 shadow-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'text-white rounded-tr-none' 
                        : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                    }`}
                    style={msg.role === 'user' ? { backgroundColor: theme.accentColor } : undefined}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-2 text-gray-400">
                    <Loader2 className="w-4 h-4 animate-spin" style={{ color: theme.accentColor }} />
                    <span>{lang === "zh" ? "AI 正在思考..." : lang === "ja" ? "AIは考え中..." : "AI is thinking..."}</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Suggestions Row */}
            {assistantPrompts.length > 0 && (
              <div className="px-3 py-1.5 border-t border-gray-100/60 bg-white flex gap-1.5 overflow-x-auto scrollbar-none shrink-0">
                {assistantPrompts.map((prompt, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="shrink-0 bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100 text-[10px] text-gray-600 px-2.5 py-1 rounded-full cursor-pointer"
                  >
                    {prompt}
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
              className="p-2 bg-white border-t border-gray-100 flex items-center gap-2 shrink-0"
            >
              <input 
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={t.chatInputPlaceholder}
                disabled={isLoading}
                className="flex-1 bg-gray-50 border border-gray-100 rounded-full px-3.5 py-1.5 text-xs focus:outline-none focus:bg-white transition-all text-gray-800"
              />
              <button 
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="w-7 h-7 rounded-full disabled:opacity-40 text-white flex items-center justify-center shrink-0 shadow-md transition-all duration-200 cursor-pointer"
                style={{ 
                  backgroundColor: theme.accentColor, 
                  boxShadow: `0 4px 10px ${theme.accentColor}33`
                }}
              >
                <Send className="w-3 h-3" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Safe Area Indicator */}
      <div className="absolute bottom-1 inset-x-0 h-1 flex justify-center pointer-events-none z-50">
        <div className="w-28 h-1 bg-gray-800 rounded-full opacity-60"></div>
      </div>
    </div>
  );
}
