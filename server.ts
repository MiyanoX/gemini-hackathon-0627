import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialize Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error("GEMINI_API_KEY 环境变量未设置。请在设置 > 密钥中配置您的 API 密钥。");
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// 1. AI 智能建站 / 页面生成
app.post("/api/generate-page", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "请输入生成主题" });
    }

    const ai = getGeminiClient();
    const promptText = `
    你是一个专业的网页排版师和内容策划。请根据用户的输入主题: "${prompt}"，策划生成一个精美的单页数字名片/自媒体聚合主页内容。
    主页需要包含：
    1. 标题 (title): 比如店铺名、个人昵称、工作室名称等。
    2. 简介 (bio): 1-2句吸引人、温馨或专业的描述。
    3. 头像建议 (avatarSuggestion): 提供一个适合该主题的头像关键词描述，英文，比如 "artisanal coffee cup with matcha latte art" 或 "professional minimalist tech executive headshot"。
    4. 3-4个推荐的链接块 (links): 每个链接块需要有唯一id、标题 (title)、示例链接 (url) 以及类型图标 (icon)。
       - 图标支持: 'calendar' (预约/活动), 'video' (视频/直播), 'link' (通用链接), 'mail' (邮箱), 'phone' (电话), 'map' (地址/地图), 'store' (商店), 'instagram' (社交/相册), 'music' (音乐)。
    5. 推荐的主题配色与样式 (theme):
       - background: 渐变色或背景色，例如: "bg-gradient-to-b from-[#fdfbf7] to-[#f5ebd8]" (温暖风), "bg-[#111111]" (暗黑炫酷), "bg-gradient-to-tr from-[#1e1b4b] to-[#311042]" (深邃梦幻), "bg-white" (极致简约)。
       - accentColor: 强调色(HEX码)，例如: "#8b5cf6" (紫色), "#f97316" (橙色), "#10b981" (绿色), "#3b82f6" (蓝色)。
       - buttonStyle: 按钮样式，只能是 "solid" 或 "outline" 或 "glass" 之一。
       - borderRadius: 按钮圆角，范围 0 到 100（数字，0是直角，100是药丸型圆角）。
       
    请严格返回符合以下 JSON 结构的响应。不需要任何 markdown 包装，直接返回 JSON 串。
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["title", "bio", "avatarSuggestion", "links", "theme"],
          properties: {
            title: { type: Type.STRING, description: "主页标题" },
            bio: { type: Type.STRING, description: "主页简介" },
            avatarSuggestion: { type: Type.STRING, description: "推荐头像的描述（英文关键词，用于匹配高品质图片）" },
            links: {
              type: Type.ARRAY,
              description: "推荐链接块，3到4个",
              items: {
                type: Type.OBJECT,
                required: ["id", "title", "url", "icon"],
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING, description: "链接标题，如'预约免费咨询'、'查看咖啡菜单'、'关注我的小红书'" },
                  url: { type: Type.STRING, description: "示例跳转链接" },
                  icon: { type: Type.STRING, description: "图标名称，只能是 calendar, video, link, mail, phone, map, store, instagram, music 之一" }
                }
              }
            },
            theme: {
              type: Type.OBJECT,
              required: ["background", "accentColor", "buttonStyle", "borderRadius"],
              properties: {
                background: { type: Type.STRING, description: "背景色或Tailwind渐变CSS，如 bg-gradient-to-b from-gray-50 to-gray-200" },
                accentColor: { type: Type.STRING, description: "强调色HEX值，如 #8b5cf6" },
                buttonStyle: { type: Type.STRING, description: "solid, outline, 或 glass" },
                borderRadius: { type: Type.INTEGER, description: "0到100" }
              }
            }
          }
        }
      }
    });

    const pageData = JSON.parse(response.text || "{}");
    
    // 给一些默认头像
    let avatarUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuA0Hf6CZ9W6NcIVy-24g8Q9dI8GQVPRoBDG3RVQO85_8I49n-1LoLCjEZf5k8CYoFGyfNKxoff0XKZ9qYDrDRS2IxWIqnpns27jZkJ1LmXqPMwC5qYSkzsvNRmNLYCqTJEYBB2LbmwOtfgjkMyjSX4sxP_TLy6MNdWao7OEnRKZRod1FRtbzWL7RTcP9fLls1HFYxZInpZte0o3jKNgIBJDDZyuSF-Vu9DhAx5VfTUZzX6iOVbIlVT0Mt88mS-RQfiDjwN_86jH8Sw";
    
    // 根据关键词简单分配精美高质图片
    const suggestion = (pageData.avatarSuggestion || "").toLowerCase();
    if (suggestion.includes("coffee") || suggestion.includes("cafe")) {
      avatarUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuB1tNZsNU86r5Z9U4mC1ZO9TeJFGxRIR0r45Vv455jWwNuZWAIY2IZ5QgC8y2VkLu0dE8AY0ZaVPWZ4u29LRUzoi19JdDXH4hvqpCuvXgZhT-ocJqp_Prr_xo-e_J2w09mF2AN5PH-MfLIXccKe63asv1gRYQcsM8D5863U6P5VTDZu4A4EuQ_MxbMx9syLUKcpwS4wbxTPKR1V4y2BCMpzdncqD5guL4E7WMbkU0V-uNo-7CZHy8p0ABf_IWvuTAyucRQ6wCkTBVU";
    } else if (suggestion.includes("executive") || suggestion.includes("business") || suggestion.includes("engineer") || suggestion.includes("eleanor")) {
      avatarUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuDu_ppPFIvRQdpt0Bc6vxK4liG0n5yYRDGGedFvKXkr_2iHf8AVlHtThQhGTFGRkp38FgMbX-h5mpDYwojXo36pwQSCNYEUe-yPt1QqjyDc9uBWjkk1BZ5HcldQbNEuPGmnp0d-hmg5fAKuzSdX2Oj0QsamF8neNBQ2jcHdE9hpShdkQfv7bHUIS-wlsA2kLvzUPcr_MSYVKi5kg-7_j8ypO0qobAb6X38-PudWSVTdP4zQJYXjkZq2tr4Q2lKpdOey4mD83vj-Vak";
    } else if (suggestion.includes("trainer") || suggestion.includes("fitness") || suggestion.includes("coach") || suggestion.includes("mia")) {
      avatarUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuA0Hf6CZ9W6NcIVy-24g8Q9dI8GQVPRoBDG3RVQO85_8I49n-1LoLCjEZf5k8CYoFGyfNKxoff0XKZ9qYDrDRS2IxWIqnpns27jZkJ1LmXqPMwC5qYSkzsvNRmNLYCqTJEYBB2LbmwOtfgjkMyjSX4sxP_TLy6MNdWao7OEnRKZRod1FRtbzWL7RTcP9fLls1HFYxZInpZte0o3jKNgIBJDDZyuSF-Vu9DhAx5VfTUZzX6iOVbIlVT0Mt88mS-RQfiDjwN_86jH8Sw";
    } else if (suggestion.includes("flower") || suggestion.includes("design") || suggestion.includes("art")) {
      avatarUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuDXtRTYeCRaskPY9RWrQUOnXaCFnmeTMDCtrdna8nrsbH9C_m1wn1Q32P7VCflsF3AbAgmwAMuDl6cj6XIgnOxlQ7uOesGNdF0NyDFe29e3TPApWla_loHI7vKk5Em3kE_OIGS_NvN6wbE1tGYMBC3VD1oOtfCx49aIBu33rSxekNDilwBHPSITe_7oLpK_EdWzfurmVQuly2qd1oHxixIKi533s8bSFpjYFvL9M2FDjAVX4hMbn6z-DnrDUNVPMuJTdnWxjvErHBE";
    }

    res.json({
      ...pageData,
      avatarUrl
    });
  } catch (error: any) {
    console.error("生成页面失败:", error);
    res.status(500).json({ error: error.message || "生成主页失败，请稍后重试" });
  }
});

// 2. AI 润色文本 / 自动重写
app.post("/api/optimize-text", async (req, res) => {
  try {
    const { text, type } = req.body;
    if (!text) {
      return res.status(400).json({ error: "请输入需要润色的文本" });
    }

    const ai = getGeminiClient();
    const systemInstruction = type === "title" 
      ? "你是一个文案大师。请将用户输入的这句标题改写成更高级、更有吸引力、简短精炼的短标题（10字以内），直接返回改写后的内容，不要有解释或引号。"
      : "你是一个文案大师。请将用户输入的这段个人/商户简介润色成更优雅、吸引人、具有感染力的中文简介（50字以内），直接返回润色后的内容，不要有解释或引号。";

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: text,
      config: {
        systemInstruction
      }
    });

    res.json({ result: (response.text || "").trim() });
  } catch (error: any) {
    console.error("润色文本失败:", error);
    res.status(500).json({ error: error.message || "润色文案失败" });
  }
});

// 3. 实时模拟 AI 智能助理对话 (Ask My Assistant)
app.post("/api/assistant-chat", async (req, res) => {
  try {
    const { message, history, persona } = req.body;
    if (!message) {
      return res.status(400).json({ error: "请输入消息" });
    }

    const ai = getGeminiClient();
    const { name, bio, title } = persona || { name: "Mia Fitness", bio: "健身教练" };
    
    // 构建上下文，让 AI 完全融入该人设
    const systemInstruction = `
    你正在扮演一个基于网页的 AI 专属助理。你的主人/代表的实体是: "${name}"。
    他的头衔/行业背景是: "${title || "专业创作者"}"。
    他的简介描述是: "${bio}"。
    
    你现在的职责是以他的专属 AI 助理身份，向访问该网页的访客提供接待与解答。
    
    行为规范：
    1. 称呼来访者为“您”。用热情、礼貌、专业且符合 "${name}" 特征的语调进行交谈。
    2. 回答要简明扼要（一般控制在80字以内），非常适合在手机底部的小对话框中阅读。
    3. 如果访客询问预约、项目、营业时间或服务，应积极推荐主页上的相关链接，并引导他们点击。
    4. 坚守此人设！不要透露你是一个通用 AI 语言模型。如果问到不相关的问题，优雅地将话题引回到 "${name}" 的服务上。
    
    格式：
    直接返回对话回答内容，不要有任何 Markdown 或特殊符号。
    `;

    // 格式化历史
    const chatContents = [];
    if (history && history.length > 0) {
      for (const msg of history) {
        chatContents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        });
      }
    }
    chatContents.push({ role: "user", parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: chatContents as any,
      config: {
        systemInstruction
      }
    });

    res.json({ reply: (response.text || "").trim() });
  } catch (error: any) {
    console.error("智能助理对话失败:", error);
    res.status(500).json({ error: error.message || "对话失败，小助手开小差了..." });
  }
});

// Vite Middleware & Static Serving setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
