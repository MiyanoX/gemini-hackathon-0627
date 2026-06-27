export type Language = "en" | "ja" | "zh";

export interface TranslationDict {
  brandSubtitle: string;
  navContent: string;
  navStyle: string;
  navAnalytics: string;
  navSettings: string;
  navProfile: string;
  upgradeTitle: string;
  upgradeDesc: string;
  upgradeBtn: string;
  editorTitle: string;
  versionTag: string;
  previewBtn: string;
  publishBtn: string;
  aiGenTitle: string;
  aiGenDesc: string;
  aiGenPlaceholder: string;
  aiGenBtn: string;
  aiGenLoading: string;
  personaSection: string;
  avatarLabel: string;
  avatarPlaceholder: string;
  nameLabel: string;
  namePlaceholder: string;
  titleLabel: string;
  titlePlaceholder: string;
  bioLabel: string;
  bioPlaceholder: string;
  optimizeBtn: string;
  optimizing: string;
  assistantPromptsSection: string;
  promptsCount: string;
  promptsDesc: string;
  promptNo: string;
  addPromptPlaceholder: string;
  addPromptBtn: string;
  saveBtn: string;
  cancelBtn: string;
  editPromptTitle: string;
  gallerySection: string;
  galleryDesc: string;
  addImgPlaceholder: string;
  addImgBtn: string;
  tabTemplates: string;
  tabStyle: string;
  tabAssistant: string;
  templatesTitle: string;
  applyingTag: string;
  solidBtn: string;
  outlineBtn: string;
  glassBtn: string;
  bgTitle: string;
  accentTitle: string;
  btnStyleTitle: string;
  btnRadiusTitle: string;
  radiusStraight: string;
  radiusRound: string;
  radiusFull: string;
  customColorTitle: string;
  assistantSettingsDesc: string;
  assistantNameLabel: string;
  assistantNamePlaceholder: string;
  assistantGreetingLabel: string;
  assistantGreetingPlaceholder: string;
  assistantPromptsLabel: string;
  assistantPromptPlaceholder: string;
  recommendTitle: string;
  clickToChat: string;
  chatHeaderDefault: string;
  chatInputPlaceholder: string;
  chatSendBtn: string;
  chatLoadMore: string;
  chatNoPrompts: string;
  publishSuccess: string;
}

export const TRANSLATIONS: Record<Language, TranslationDict> = {
  en: {
    brandSubtitle: "AI Visual Builder",
    navContent: "Content Editor",
    navStyle: "Visual Style",
    navAnalytics: "Analytics",
    navSettings: "Settings",
    navProfile: "Profile",
    upgradeTitle: "Upgrade to Doppel Pro",
    upgradeDesc: "Unlock custom domains, unlimited styling, and deep AI agents.",
    upgradeBtn: "Upgrade Free",
    editorTitle: "Doppel Editor",
    versionTag: "Global Edition",
    previewBtn: "Preview Page",
    publishBtn: "Publish Page",
    aiGenTitle: "AI Instant Page Builder",
    aiGenDesc: "Describe your brand or store, and Gemini will design a stunning layout, write high-conversion copy, and configure custom styles instantly.",
    aiGenPlaceholder: "e.g., A minimalist specialty coffee shop offering hand-brew espresso and home-roasted beans in downtown...",
    aiGenBtn: "Generate Page with AI",
    aiGenLoading: "Generating...",
    personaSection: "1. Basic Profile & Branding",
    avatarLabel: "Avatar URL",
    avatarPlaceholder: "Paste avatar image URL",
    nameLabel: "Brand Name / Nickname",
    namePlaceholder: "e.g., Mint & Peach Cafe",
    titleLabel: "Job Title / Subtitle",
    titlePlaceholder: "e.g., Specialty Coffee & Aesthetic Space",
    bioLabel: "Bio / Introduction",
    bioPlaceholder: "A warm, catchy description of your brand...",
    optimizeBtn: "Rewrite with AI",
    optimizing: "Optimizing...",
    assistantPromptsSection: "2. AI Assistant Recommended Questions",
    promptsCount: "prompts",
    promptsDesc: "These recommended questions appear as quick-click tag cards on your home screen. Visitors click to chat instantly with your AI Assistant.",
    promptNo: "Question",
    addPromptPlaceholder: "Type a new recommended question...",
    addPromptBtn: "Add Question",
    saveBtn: "Save",
    cancelBtn: "Cancel",
    editPromptTitle: "Edit Question",
    gallerySection: "3. Curated Gallery Showcase",
    galleryDesc: "Add high-quality image URLs to showcase your products, space, or artworks.",
    addImgPlaceholder: "Enter image URL...",
    addImgBtn: "Add Image",
    tabTemplates: "Templates",
    tabStyle: "Style",
    tabAssistant: "AI Assistant",
    templatesTitle: "Choose a Stunning Layout Theme",
    applyingTag: "Active",
    solidBtn: "Solid Button",
    outlineBtn: "Outline Button",
    glassBtn: "Glass Button",
    bgTitle: "Canvas Background",
    accentTitle: "Accent Theme Color",
    btnStyleTitle: "Button Theme Style",
    btnRadiusTitle: "Button Border Radius",
    radiusStraight: "Straight (0px)",
    radiusRound: "Rounded (12px)",
    radiusFull: "Pill (32px)",
    customColorTitle: "Choose custom color",
    assistantSettingsDesc: "Customize your virtual AI assistant here! It will automatically interact with visitors using your defined persona, bio, and greeting.",
    assistantNameLabel: "AI Assistant Name",
    assistantNamePlaceholder: "e.g., Cafe Virtual Assistant",
    assistantGreetingLabel: "Initial Welcome Message",
    assistantGreetingPlaceholder: "What visitors see when they open the chat widget...",
    assistantPromptsLabel: "Visitor Starter Questions",
    assistantPromptPlaceholder: "Quick helper question...",
    recommendTitle: "Recommended Questions:",
    clickToChat: "Click to start talking",
    chatHeaderDefault: "AI Assistant",
    chatInputPlaceholder: "Ask me anything or say hello...",
    chatSendBtn: "Send",
    chatLoadMore: "Add more tags in Left Panel",
    chatNoPrompts: "Add some questions in the editor!",
    publishSuccess: "Congratulations! Your page is successfully published to the cloud!"
  },
  ja: {
    brandSubtitle: "AIビジュアルビルダー",
    navContent: "コンテンツ編集",
    navStyle: "ビジュアルスタイル",
    navAnalytics: "アクセス解析",
    navSettings: "基本設定",
    navProfile: "マイページ",
    upgradeTitle: "Doppel Proへアップグレード",
    upgradeDesc: "カスタムドメイン、無制限のスタイル、高度なAIアシスタントを解放。",
    upgradeBtn: "無料で試す",
    editorTitle: "Doppel エディタ",
    versionTag: "グローバル版",
    previewBtn: "プレビュー",
    publishBtn: "ページを公開",
    aiGenTitle: "AIワンクリック・ページ生成",
    aiGenDesc: "ブランドやショップの紹介を入力するだけで、Geminiが美しいレイアウト、魅力的なコピー、最適な配色を瞬時に設計します。",
    aiGenPlaceholder: "例：都内でハンドドリップコーヒーと自家焙煎豆を提供するミニマルなスペシャルティコーヒーショップ...",
    aiGenBtn: "AIでページを生成",
    aiGenLoading: "生成中...",
    personaSection: "1. プロフィールとブランディング",
    avatarLabel: "アバター画像URL",
    avatarPlaceholder: "アバター画像のURLを貼り付け",
    nameLabel: "ブランド名 / ニックネーム",
    namePlaceholder: "例：薄荷と桃 (Mint & Peach)",
    titleLabel: "肩書き / サブタイトル",
    titlePlaceholder: "例：スペシャリティコーヒー＆美しい空間",
    bioLabel: "自己紹介 / キャッチコピー",
    bioPlaceholder: "ブランドの魅力を伝える温かみのある説明文...",
    optimizeBtn: "AIでリライト",
    optimizing: "最適化中...",
    assistantPromptsSection: "2. AIアシスタントおすすめ質問タグ",
    promptsCount: "個の質問",
    promptsDesc: "おすすめ of 質問は、ホーム画面にクイッククリックタグとして表示されます。訪問者はクリックするだけでAIアシスタントとすぐに対話を開始できます。",
    promptNo: "質問",
    addPromptPlaceholder: "おすすめの質問を入力してください...",
    addPromptBtn: "質問を追加",
    saveBtn: "保存",
    cancelBtn: "キャンセル",
    editPromptTitle: "質問を編集",
    gallerySection: "3. 厳選フォトギャラリー",
    galleryDesc: "商品や店舗、作品の魅力を伝える高品質な画像のURLを追加してください。",
    addImgPlaceholder: "画像のURLを入力...",
    addImgBtn: "画像を追加",
    tabTemplates: "テンプレート",
    tabStyle: "スタイル",
    tabAssistant: "AIアシスタント",
    templatesTitle: "美しいレイアウトテーマを選択",
    applyingTag: "適用中",
    solidBtn: "ソリッド",
    outlineBtn: "アウトライン",
    glassBtn: "グラス",
    bgTitle: "キャンバス背景",
    accentTitle: "アクセントカラー",
    btnStyleTitle: "ボタンのスタイル",
    btnRadiusTitle: "ボタンの角丸",
    radiusStraight: "直角 (0px)",
    radiusRound: "角丸 (12px)",
    radiusFull: "カプセル (32px)",
    customColorTitle: "カスタムカラーを選択",
    assistantSettingsDesc: "ここで仮想AIアシスタントをカスタマイズできます！定義されたプロフィールや挨拶に基づいて、訪問者の問い合わせにスマートに対応します。",
    assistantNameLabel: "AIアシスタント名",
    assistantNamePlaceholder: "例：カフェ・バーチャルアシスタント",
    assistantGreetingLabel: "最初の挨拶メッセージ",
    assistantGreetingPlaceholder: "訪問者がチャットを開いたときに表示されるメッセージ...",
    assistantPromptsLabel: "最初の質問候補",
    assistantPromptPlaceholder: "質問を追加...",
    recommendTitle: "おすすめの質問：",
    clickToChat: "クリックして会話を開始",
    chatHeaderDefault: "AIアシスタント",
    chatInputPlaceholder: "質問を入力するか、挨拶を送信...",
    chatSendBtn: "送信",
    chatLoadMore: "左側のパネルで質問を追加できます",
    chatNoPrompts: "エディターで質問を追加してください！",
    publishSuccess: "おめでとうございます！ページがクラウドに正常に公開されました！"
  },
  zh: {
    brandSubtitle: "AI 可视化页面生成器",
    navContent: "内容编辑 (Content)",
    navStyle: "风格主题 (Style)",
    navAnalytics: "流量分析 (Analytics)",
    navSettings: "后台配置 (Settings)",
    navProfile: "个人中心 (Profile)",
    upgradeTitle: "升级到 Doppel Pro",
    upgradeDesc: "解锁无限自定义、自定义域名与深度 AI 接待服务",
    upgradeBtn: "免费升级",
    editorTitle: "Doppel 编辑器",
    versionTag: "多语言全能版",
    previewBtn: "预览页面 (Preview)",
    publishBtn: "一键发布 (Publish)",
    aiGenTitle: "AI 智能建站 / 页面一键生成",
    aiGenDesc: "只需输入您的品牌、实体店或个人诉求，Gemini 将为您智能设计排版主题、撰写高转化率文案并配置专属色系。",
    aiGenPlaceholder: "例如: 在市中心的一家极简风格咖啡馆，主打手冲和精品意式、自家烘焙咖啡豆...",
    aiGenBtn: "开始 AI 智能生成",
    aiGenLoading: "智能策划生成中...",
    personaSection: "1. 聚合主页基础信息定制",
    avatarLabel: "圆形头像照片 (Avatar)",
    avatarPlaceholder: "输入头像图片链接",
    nameLabel: "主页大标题 (Name)",
    namePlaceholder: "输入名字、昵称或店铺名",
    titleLabel: "小标题 / 行业身份标签 (Title)",
    titlePlaceholder: "例如: 精品手冲咖啡馆",
    bioLabel: "主页简介 / 温馨文案 (Bio)",
    bioPlaceholder: "输入一段暖心的简介或核心介绍文案...",
    optimizeBtn: "AI 智能润色",
    optimizing: "智能润色中...",
    assistantPromptsSection: "2. AI 智能助理推荐访客问题",
    promptsCount: "个推荐问题",
    promptsDesc: "这些问题将作为高亮快捷 Tags 展现在您的主页上。访客只需点击即可与您的 AI 虚拟助理开启智能对话。",
    promptNo: "推荐问题",
    addPromptPlaceholder: "输入新的访客推荐问题...",
    addPromptBtn: "添加问题",
    saveBtn: "保存",
    cancelBtn: "取消",
    editPromptTitle: "编辑问题内容",
    gallerySection: "3. 精选相册/图集展位 (Gallery)",
    galleryDesc: "在移动端展示几张美轮美奂的精选图画。输入图片链接并按回车即可添加：",
    addImgPlaceholder: "输入图片 URL 地址并回车...",
    addImgBtn: "回车添加",
    tabTemplates: "套用模版",
    tabStyle: "视觉样式",
    tabAssistant: "智能助理",
    templatesTitle: "选择精美排版主题",
    applyingTag: "正在套用",
    solidBtn: "实色按钮",
    outlineBtn: "描边按钮",
    glassBtn: "毛玻璃按钮",
    bgTitle: "画布背景",
    accentTitle: "系统强调色",
    btnStyleTitle: "按钮风格",
    btnRadiusTitle: "按钮圆角弧度",
    radiusStraight: "直角 (0px)",
    radiusRound: "微圆角 (12px)",
    radiusFull: "高圆角 (32px)",
    customColorTitle: "选择自定义颜色",
    assistantSettingsDesc: "在这里定制主页底部的虚拟 AI 小助手！它会根据您提供的人设和简介，在手机模拟器中智能地回答访客的咨询。",
    assistantNameLabel: "AI 助手代称 (Name)",
    assistantNamePlaceholder: "如: 咖啡馆主理人 AI",
    assistantGreetingLabel: "首次开场白 (Greeting)",
    assistantGreetingPlaceholder: "输入 AI 开启对话时的欢迎语...",
    assistantPromptsLabel: "推荐访客提问 (Quick Prompts)",
    assistantPromptPlaceholder: "提示问句...",
    recommendTitle: "推荐您这样向我提问：",
    clickToChat: "点击开始交谈",
    chatHeaderDefault: "AI 智能助理",
    chatInputPlaceholder: "发送提问或打招呼...",
    chatSendBtn: "发送",
    chatLoadMore: "在左侧添加更多问题",
    chatNoPrompts: "在左侧添加一些推荐问题吧！",
    publishSuccess: "恭喜！您的聚合个人主页已成功发布到云端服务！"
  }
};
