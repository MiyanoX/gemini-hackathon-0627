import { Template, LinkBlock } from "./types";
import { Language } from "./i18n";

export const LOCALIZED_TEMPLATES: Record<Language, Template[]> = {
  en: [
    {
      id: "cafe",
      name: "Specialty Cafe ☕️",
      description: "Perfect for independent coffee shops, creative bakeries, and aesthetic spaces.",
      persona: {
        name: "Mint & Peach",
        bio: "A sun-drenched aesthetic space offering hand-crafted coffee, fresh-baked pastries, and curated lifestyle goods.",
        avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1tNZsNU86r5Z9U4mC1ZO9TeJFGxRIR0r45Vv455jWwNuZWAIY2IZ5QgC8y2VkLu0dE8AY0ZaVPWZ4u29LRUzoi19JdDXH4hvqpCuvXgZhT-ocJqp_Prr_xo-e_J2w09mF2AN5PH-MfLIXccKe63asv1gRYQcsM8D5863U6P5VTDZu4A4EuQ_MxbMx9syLUKcpwS4wbxTPKR1V4y2BCMpzdncqD5guL4E7WMbkU0V-uNo-7CZHy8p0ABf_IWvuTAyucRQ6wCkTBVU",
        title: "Specialty Coffee & Aesthetic Space"
      },
      theme: {
        background: "bg-gradient-to-b from-[#fdfbf7] to-[#f5ebd8]",
        accentColor: "#B7791F",
        buttonStyle: "solid",
        borderRadius: 100
      },
      links: [
        {
          id: "cafe_1",
          title: "🥐 Today's Fresh Pastry Menu",
          url: "https://example.com/menu",
          icon: "store",
          enabled: true
        },
        {
          id: "cafe_2",
          title: "📅 Reserve Afternoon Tea / Private Event",
          url: "https://example.com/book",
          icon: "calendar",
          enabled: true
        },
        {
          id: "cafe_3",
          title: "📍 Directions / Find Us",
          url: "https://example.com/map",
          icon: "map",
          enabled: true
        }
      ],
      assistantName: "Cafe Owner's AI Helper",
      assistantGreeting: "Welcome! Feel free to ask about our menu, business hours, or today's special recommendations!",
      assistantPrompts: ["What are today's recommendations?", "What are your business hours?", "Can I make a weekend reservation?"],
      gallery: [
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: "business",
      name: "Executive Card 💼",
      description: "Ideal for executives, consultants, AI engineers, and independent professionals.",
      persona: {
        name: "Eleanor Vance",
        bio: "VP of Strategic Initiatives at Nexus Corp. Driving transformation and growth through AI and digital solutions.",
        avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDu_ppPFIvRQdpt0Bc6vxK4liG0n5yYRDGGedFvKXkr_2iHf8AVlHtThQhGTFGRkp38FgMbX-h5mpDYwojXo36pwQSCNYEUe-yPt1QqjyDc9uBWjkk1BZ5HcldQbNEuPGmnp0d-hmg5fAKuzSdX2Oj0QsamF8neNBQ2jcHdE9hpShdkQfv7bHUIS-wlsA2kLvzUPcr_MSYVKi5kg-7_j8ypO0qobAb6X38-PudWSVTdP4zQJYXjkZq2tr4Q2lKpdOey4mD83vj-Vak",
        title: "VP of Strategic Initiatives @ Nexus Corp"
      },
      theme: {
        background: "bg-[#fbfbfb]",
        accentColor: "#1E3A8A",
        buttonStyle: "solid",
        borderRadius: 100
      },
      links: [
        {
          id: "biz_1",
          title: "✉️ Email Me",
          url: "mailto:eleanor@nexuscorp.com",
          icon: "mail",
          enabled: true
        },
        {
          id: "biz_2",
          title: "📞 Save Contact",
          url: "https://example.com/vcard/eleanor",
          icon: "phone",
          enabled: true
        },
        {
          id: "biz_3",
          title: "🔗 LinkedIn Profile",
          url: "https://linkedin.com",
          icon: "link",
          enabled: true
        },
        {
          id: "biz_4",
          title: "✨ Latest Digital Transformation Case Studies",
          url: "https://example.com/portfolio",
          icon: "link",
          enabled: true
        }
      ],
      assistantName: "Eleanor's AI Business Secretary",
      assistantGreeting: "Hello! I am Eleanor's AI Secretary. I can provide details on her background, career milestones, or help you book a meeting.",
      assistantPrompts: ["Tell me about her career milestones", "How can I contact her?", "View her recent digital projects"],
      gallery: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: "fitness",
      name: "Fitness & Health Coach 🏋️‍♀️",
      description: "Perfect for personal trainers, yoga teachers, nutritionists, and fitness influencers.",
      persona: {
        name: "Coach Mia",
        bio: "Senior female body shaping coach. Empowering busy modern women to build strength, confidence, and vibrant health through scientific training and nutrition.",
        avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0Hf6CZ9W6NcIVy-24g8Q9dI8GQVPRoBDG3RVQO85_8I49n-1LoLCjEZf5k8CYoFGyfNKxoff0XKZ9qYDrDRS2IxWIqnpns27jZkJ1LmXqPMwC5qYSkzsvNRmNLYCqTJEYBB2LbmwOtfgjkMyjSX4sxP_TLy6MNdWao7OEnRKZRod1FRtbzWL7RTcP9fLls1HFYxZInpZte0o3jKNgIBJDDZyuSF-Vu9DhAx5VfTUZzX6iOVbIlVT0Mt88mS-RQfiDjwN_86jH8Sw",
        title: "Senior Personal Trainer / Nutritionist"
      },
      theme: {
        background: "bg-gradient-to-b from-[#f9fafb] to-[#e5e7eb]",
        accentColor: "#2563EB",
        buttonStyle: "solid",
        borderRadius: 100
      },
      links: [
        {
          id: "fit_1",
          title: "📅 Book Free 1-on-1 Consultation",
          url: "https://example.com/book",
          icon: "calendar",
          enabled: true
        },
        {
          id: "fit_2",
          title: "📺 Watch My Latest Home Workout Videos",
          url: "https://youtube.com",
          icon: "video",
          enabled: true
        },
        {
          id: "fit_3",
          title: "💪 Follow My Instagram Fitness Journey",
          url: "https://instagram.com",
          icon: "instagram",
          enabled: true
        }
      ],
      assistantName: "Mia's AI Fitness Assistant",
      assistantGreeting: "Ready to transform your life? I'm Mia's AI Fitness Assistant. Ask me about classes, training packages, or fitness tips!",
      assistantPrompts: ["What is included in the free assessment?", "Is this suitable for beginners?", "What shaping programs are available?"],
      gallery: [
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: "artist",
      name: "Future Creative 🎨",
      description: "Best for designers, digital illustrators, music producers, and trendsetters.",
      persona: {
        name: "Neon Dreamer",
        bio: "Digital art explorer and electronic music producer in Web3. Merging light, algorithms, and cyberpunk aesthetics.",
        avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXtRTYeCRaskPY9RWrQUOnXaCFnmeTMDCtrdna8nrsbH9C_m1wn1Q32P7VCflsF3AbAgmwAMuDl6cj6XIgnOxlQ7uOesGNdF0NyDFe29e3TPApWla_loHI7vKk5Em3kE_OIGS_NvN6wbE1tGYMBC3VD1oOtfCx49aIBu33rSxekNDilwBHPSITe_7oLpK_EdWzfurmVQuly2qd1oHxixIKi533s8bSFpjYFvL9M2FDjAVX4hMbn6z-DnrDUNVPMuJTdnWxjvErHBE",
        title: "Digital Visual Artist / Electronic Producer"
      },
      theme: {
        background: "bg-[#131313]",
        accentColor: "#d0bcff",
        buttonStyle: "glass",
        borderRadius: 16
      },
      links: [
        {
          id: "art_1",
          title: "🎵 Stream My Latest Tracks on Spotify",
          url: "https://spotify.com",
          icon: "music",
          enabled: true
        },
        {
          id: "art_2",
          title: "🖼️ View My Digital Art Gallery & NFT Drops",
          url: "https://opensea.io",
          icon: "store",
          enabled: true
        },
        {
          id: "art_3",
          title: "📧 Commercial Collaborations & Commission Inquiries",
          url: "mailto:neon@art.com",
          icon: "mail",
          enabled: true
        }
      ],
      assistantName: "Neon AI Muse",
      assistantGreeting: "Welcome to the neon dreamscape! Ask me about music, art commissions, commercial licensing, or future collabs.",
      assistantPrompts: ["How can I order a custom digital artwork?", "Listen to the latest electronic track", "What brands have you collaborated with?"],
      gallery: [
        "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80"
      ]
    }
  ],
  ja: [
    {
      id: "cafe",
      name: "スペシャルティカフェ ☕️",
      description: "独立系カフェ、ベーカリー、お洒落な空間デザインに最適。",
      persona: {
        name: "薄荷と桃 (Mint & Peach)",
        bio: "日の光が溢れる美しい空間で、手作りのスペシャルティコーヒー、焼き立てのパン、厳選されたライフスタイル雑貨をお届けします。",
        avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1tNZsNU86r5Z9U4mC1ZO9TeJFGxRIR0r45Vv455jWwNuZWAIY2IZ5QgC8y2VkLu0dE8AY0ZaVPWZ4u29LRUzoi19JdDXH4hvqpCuvXgZhT-ocJqp_Prr_xo-e_J2w09mF2AN5PH-MfLIXccKe63asv1gRYQcsM8D5863U6P5VTDZu4A4EuQ_MxbMx9syLUKcpwS4wbxTPKR1V4y2BCMpzdncqD5guL4E7WMbkU0V-uNo-7CZHy8p0ABf_IWvuTAyucRQ6wCkTBVU",
        title: "スペシャルティコーヒー＆美しい空間"
      },
      theme: {
        background: "bg-gradient-to-b from-[#fdfbf7] to-[#f5ebd8]",
        accentColor: "#B7791F",
        buttonStyle: "solid",
        borderRadius: 100
      },
      links: [
        {
          id: "cafe_1",
          title: "🥐 本日の焼き立てパンメニュー",
          url: "https://example.com/menu",
          icon: "store",
          enabled: true
        },
        {
          id: "cafe_2",
          title: "📅 アフタヌーンティー・貸切予約",
          url: "https://example.com/book",
          icon: "calendar",
          enabled: true
        },
        {
          id: "cafe_3",
          title: "📍 アクセス・店舗情報",
          url: "https://example.com/map",
          icon: "map",
          enabled: true
        }
      ],
      assistantName: "カフェマスター AIアシスタント",
      assistantGreeting: "いらっしゃいませ！メニュー、営業時間、または本日のスペシャルおすすめについて何でもお尋ねください！",
      assistantPrompts: ["本日のおすすめは？", "営業時間を教えてください", "週末の席予約はできますか？"],
      gallery: [
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: "business",
      name: "エグゼクティブ名刺 💼",
      description: "企業役員、コンサルタント、AIエンジニア、フリーランスの専門家に最適。",
      persona: {
        name: "エレノア・ヴァンス (Eleanor Vance)",
        bio: "Nexus Corpの戦略イニシアチブ副社長。AIとデジタル転換を通じて、企業の変革と持続的な成長を支援。",
        avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDu_ppPFIvRQdpt0Bc6vxK4liG0n5yYRDGGedFvKXkr_2iHf8AVlHtThQhGTFGRkp38FgMbX-h5mpDYwojXo36pwQSCNYEUe-yPt1QqjyDc9uBWjkk1BZ5HcldQbNEuPGmnp0d-hmg5fAKuzSdX2Oj0QsamF8neNBQ2jcHdE9hpShdkQfv7bHUIS-wlsA2kLvzUPcr_MSYVKi5kg-7_j8ypO0qobAb6X38-PudWSVTdP4zQJYXjkZq2tr4Q2lKpdOey4mD83vj-Vak",
        title: "戦略計画副社長 @ Nexus Corp"
      },
      theme: {
        background: "bg-[#fbfbfb]",
        accentColor: "#1E3A8A",
        buttonStyle: "solid",
        borderRadius: 100
      },
      links: [
        {
          id: "biz_1",
          title: "✉️ メールを送信",
          url: "mailto:eleanor@nexuscorp.com",
          icon: "mail",
          enabled: true
        },
        {
          id: "biz_2",
          title: "📞 連絡先を保存",
          url: "https://example.com/vcard/eleanor",
          icon: "phone",
          enabled: true
        },
        {
          id: "biz_3",
          title: "🔗 LinkedIn プロフィール",
          url: "https://linkedin.com",
          icon: "link",
          enabled: true
        },
        {
          id: "biz_4",
          title: "✨ 最新デジタル変革のポートフォリオ",
          url: "https://example.com/portfolio",
          icon: "link",
          enabled: true
        }
      ],
      assistantName: "EleanorのAIビジネス秘書",
      assistantGreeting: "こんにちは。エレノアのAI秘書です。彼女の経歴、専門分野、またはビジネス提携について何でもご質問ください。",
      assistantPrompts: ["仕事の経歴を教えてください", "連絡を取るにはどうすればいい？", "最近のデジタルプロジェクトを見る"],
      gallery: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: "fitness",
      name: "フィットネス＆健康コーチ 🏋️‍♀️",
      description: "パーソナルトレーナー、ヨガインストラクター、栄養士、健康系インフルエンサーに最適。",
      persona: {
        name: "ミア・フィットネス (Mia Fitness)",
        bio: "女性向けボディシェイピングトレーナー。科学的なトレーニングとバランスの取れた食事法で、忙しい現代女性の健康美をサポートします。",
        avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0Hf6CZ9W6NcIVy-24g8Q9dI8GQVPRoBDG3RVQO85_8I49n-1LoLCjEZf5k8CYoFGyfNKxoff0XKZ9qYDrDRS2IxWIqnpns27jZkJ1LmXqPMwC5qYSkzsvNRmNLYCqTJEYBB2LbmwOtfgjkMyjSX4sxP_TLy6MNdWao7OEnRKZRod1FRtbzWL7RTcP9fLls1HFYxZInpZte0o3jKNgIBJDDZyuSF-Vu9DhAx5VfTUZzX6iOVbIlVT0Mt88mS-RQfiDjwN_86jH8Sw",
        title: "シニアパーソナルトレーナー / 栄養士"
      },
      theme: {
        background: "bg-gradient-to-b from-[#f9fafb] to-[#e5e7eb]",
        accentColor: "#2563EB",
        buttonStyle: "solid",
        borderRadius: 100
      },
      links: [
        {
          id: "fit_1",
          title: "📅 1対1無料体験＆カウンセリングを予約",
          url: "https://example.com/book",
          icon: "calendar",
          enabled: true
        },
        {
          id: "fit_2",
          title: "📺 自宅でできる美尻・美脚トレーニング動画",
          url: "https://youtube.com",
          icon: "video",
          enabled: true
        },
        {
          id: "fit_3",
          title: "💪 インスタグラムでフィットネスライフをフォロー",
          url: "https://instagram.com",
          icon: "instagram",
          enabled: true
        }
      ],
      assistantName: "MiaのAIフィットネス助手",
      assistantGreeting: "素晴らしい変化を始める準備はできていますか？ミアのAIフィットネス助手です。レッスン予約や食事法について何でもご質問ください！",
      assistantPrompts: ["無料カウンセリングの内容は？", "初心者でも受けられますか？", "どのようなボディメイクコースがありますか？"],
      gallery: [
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: "artist",
      name: "クリエイティブ・アーティスト 🎨",
      description: "デジタルイラストレーター、音楽制作者、トレンドクリエイターに最適。",
      persona: {
        name: "ネオン・ドリーマー (Neon Dreamer)",
        bio: "Web3のデジタルアート探求者であり、電子音楽制作者。光、アルゴリズム、サイバーパンクの美学を融合します。",
        avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXtRTYeCRaskPY9RWrQUOnXaCFnmeTMDCtrdna8nrsbH9C_m1wn1Q32P7VCflsF3AbAgmwAMuDl6cj6XIgnOxlQ7uOesGNdF0NyDFe29e3TPApWla_loHI7vKk5Em3kE_OIGS_NvN6wbE1tGYMBC3VD1oOtfCx49aIBu33rSxekNDilwBHPSITe_7oLpK_EdWzfurmVQuly2qd1oHxixIKi533s8bSFpjYFvL9M2FDjAVX4hMbn6z-DnrDUNVPMuJTdnWxjvErHBE",
        title: "デジタルビジュアルアーティスト / 電子音楽家"
      },
      theme: {
        background: "bg-[#131313]",
        accentColor: "#d0bcff",
        buttonStyle: "glass",
        borderRadius: 16
      },
      links: [
        {
          id: "art_1",
          title: "🎵 音楽配信サイトで最新シングルを聴く",
          url: "https://spotify.com",
          icon: "music",
          enabled: true
        },
        {
          id: "art_2",
          title: "🖼️ デジタルギャラリー＆NFT作品を見る",
          url: "https://opensea.io",
          icon: "store",
          enabled: true
        },
        {
          id: "art_3",
          title: "📧 商業提携・オーダーメイド制作の問い合わせ",
          url: "mailto:neon@art.com",
          icon: "mail",
          enabled: true
        }
      ],
      assistantName: "ネオン AI ミューズ",
      assistantGreeting: "サイバー空間へようこそ！音楽、デジタルアートのご注文、商業提携について何でもご質問ください。",
      assistantPrompts: ["デジタルアートの注文方法は？", "最新のシングルを聴きたい", "これまでの主なコラボ実績は？"],
      gallery: [
        "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80"
      ]
    }
  ],
  zh: [
    {
      id: "cafe",
      name: "精品咖啡馆 ☕️",
      description: "适合独立咖啡店、创意烘焙坊和美学空间",
      persona: {
        name: "薄荷与桃 (Mint & Peach)",
        bio: "阳光洒满的美学空间，为您提供精品手作咖啡、新鲜现烤欧包以及精选质感生活好物。",
        avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1tNZsNU86r5Z9U4mC1ZO9TeJFGxRIR0r45Vv455jWwNuZWAIY2IZ5QgC8y2VkLu0dE8AY0ZaVPWZ4u29LRUzoi19JdDXH4hvqpCuvXgZhT-ocJqp_Prr_xo-e_J2w09mF2AN5PH-MfLIXccKe63asv1gRYQcsM8D5863U6P5VTDZu4A4EuQ_MxbMx9syLUKcpwS4wbxTPKR1V4y2BCMpzdncqD5guL4E7WMbkU0V-uNo-7CZHy8p0ABf_IWvuTAyucRQ6wCkTBVU",
        title: "精品咖啡 & 美学空间"
      },
      theme: {
        background: "bg-gradient-to-b from-[#fdfbf7] to-[#f5ebd8]",
        accentColor: "#B7791F",
        buttonStyle: "solid",
        borderRadius: 100
      },
      links: [
        {
          id: "cafe_1",
          title: "🥐 查看今日新鲜烘焙单 (Menu)",
          url: "https://example.com/menu",
          icon: "store",
          enabled: true
        },
        {
          id: "cafe_2",
          title: "📅 预约周末下午茶或包场 (Reserve)",
          url: "https://example.com/book",
          icon: "calendar",
          enabled: true
        },
        {
          id: "cafe_3",
          title: "📍 导航到店 / 寻找我们 (Directions)",
          url: "https://example.com/map",
          icon: "map",
          enabled: true
        }
      ],
      assistantName: "咖啡馆主理人 AI 小助",
      assistantGreeting: "有什么可以帮您的？您可以询问菜单、营业时间或今日推荐哦！",
      assistantPrompts: ["有什么今日推荐？", "你们的营业时间是？", "周末可以预约位置吗？"],
      gallery: [
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: "business",
      name: "高级商务名片 💼",
      description: "适合企业高管、顾问、AI 工程师及独立专业人士",
      persona: {
        name: "艾琳诺·凡斯 (Eleanor Vance)",
        bio: "Nexus Corp 战略计划副总裁。专注于通过人工智能与数字化转型推动企业变革与创新增长。",
        avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDu_ppPFIvRQdpt0Bc6vxK4liG0n5yYRDGGedFvKXkr_2iHf8AVlHtThQhGTFGRkp38FgMbX-h5mpDYwojXo36pwQSCNYEUe-yPt1QqjyDc9uBWjkk1BZ5HcldQbNEuPGmnp0d-hmg5fAKuzSdX2Oj0QsamF8neNBQ2jcHdE9hpShdkQfv7bHUIS-wlsA2kLvzUPcr_MSYVKi5kg-7_j8ypO0qobAb6X38-PudWSVTdP4zQJYXjkZq2tr4Q2lKpdOey4mD83vj-Vak",
        title: "战略计划副总裁 @ Nexus Corp"
      },
      theme: {
        background: "bg-[#fbfbfb]",
        accentColor: "#1E3A8A",
        buttonStyle: "solid",
        borderRadius: 100
      },
      links: [
        {
          id: "biz_1",
          title: "✉️ 给我发邮件 (Email Me)",
          url: "mailto:eleanor@nexuscorp.com",
          icon: "mail",
          enabled: true
        },
        {
          id: "biz_2",
          title: "📞 保存联系方式 (Save Contact)",
          url: "https://example.com/vcard/eleanor",
          icon: "phone",
          enabled: true
        },
        {
          id: "biz_3",
          title: "🔗 我的领英主页 (LinkedIn)",
          url: "https://linkedin.com",
          icon: "link",
          enabled: true
        },
        {
          id: "biz_4",
          title: "✨ 查看最新数字化转型案例 (Portfolio)",
          url: "https://example.com/portfolio",
          icon: "link",
          enabled: true
        }
      ],
      assistantName: "Eleanor 的 AI 商务秘书",
      assistantGreeting: "您好！我是 Eleanor 的 AI 秘书，可以为您提供她的工作履历、合作预约等咨询。",
      assistantPrompts: ["了解她的工作履历", "如何与她取得联系？", "查看最新的数字化项目"],
      gallery: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: "fitness",
      name: "运动健康教练 🏋️‍♀️",
      description: "适合私人教练、瑜伽导师、营养师及健身达人",
      persona: {
        name: "米娅教练 (Mia Fitness)",
        bio: "资深女子私人塑形教练。致力于帮助忙碌的都市女性通过科学训练与合理膳食，打造自信力量美学。",
        avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0Hf6CZ9W6NcIVy-24g8Q9dI8GQVPRoBDG3RVQO85_8I49n-1LoLCjEZf5k8CYoFGyfNKxoff0XKZ9qYDrDRS2IxWIqnpns27jZkJ1LmXqPMwC5qYSkzsvNRmNLYCqTJEYBB2LbmwOtfgjkMyjSX4sxP_TLy6MNdWao7OEnRKZRod1FRtbzWL7RTcP9fLls1HFYxZInpZte0o3jKNgIBJDDZyuSF-Vu9DhAx5VfTUZzX6iOVbIlVT0Mt88mS-RQfiDjwN_86jH8Sw",
        title: "资深私人教练 / 运动营养师"
      },
      theme: {
        background: "bg-gradient-to-b from-[#f9fafb] to-[#e5e7eb]",
        accentColor: "#2563EB",
        buttonStyle: "solid",
        borderRadius: 100
      },
      links: [
        {
          id: "fit_1",
          title: "📅 预约 1对1 免费体测与咨询 (Book Consultation)",
          url: "https://example.com/book",
          icon: "calendar",
          enabled: true
        },
        {
          id: "fit_2",
          title: "📺 观看我最新的家庭臀腿塑形教学 (Watch Tutorials)",
          url: "https://youtube.com",
          icon: "video",
          enabled: true
        },
        {
          id: "fit_3",
          title: "💪 关注我的小红书健身打卡 (My Socials)",
          url: "https://instagram.com",
          icon: "instagram",
          enabled: true
        }
      ],
      assistantName: "Mia 的 AI 健身助教",
      assistantGreeting: "准备好开启蜕变之旅了吗？我是 Mia 的 AI 助教，可以帮您解答课时安排或健身疑惑哦！",
      assistantPrompts: ["一对一体测预约包含什么？", "零基础可以学吗？", "有哪些针对性塑形课程？"],
      gallery: [
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: "artist",
      name: "未来潮流创意人 🎨",
      description: "适合独立设计师、数字插画师、DJ 音乐人及潮流博主",
      persona: {
        name: "霓虹浪人 (Neon Dreamer)",
        bio: "活跃在 Web3 的数字艺术探索者、独立电子乐制作人。在光影与算法中寻找赛博朋克美学灵感。",
        avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXtRTYeCRaskPY9RWrQUOnXaCFnmeTMDCtrdna8nrsbH9C_m1wn1Q32P7VCflsF3AbAgmwAMuDl6cj6XIgnOxlQ7uOesGNdF0NyDFe29e3TPApWla_loHI7vKk5Em3kE_OIGS_NvN6wbE1tGYMBC3VD1oOtfCx49aIBu33rSxekNDilwBHPSITe_7oLpK_EdWzfurmVQuly2qd1oHxixIKi533s8bSFpjYFvL9M2FDjAVX4hMbn6z-DnrDUNVPMuJTdnWxjvErHBE",
        title: "数字视觉艺术家 / 电子音乐人"
      },
      theme: {
        background: "bg-[#131313]",
        accentColor: "#d0bcff",
        buttonStyle: "glass",
        borderRadius: 16
      },
      links: [
        {
          id: "art_1",
          title: "🎵 在网易云音乐收听我的最新单曲 (My Music)",
          url: "https://spotify.com",
          icon: "music",
          enabled: true
        },
        {
          id: "art_2",
          title: "🖼️ 查看数字艺术画廊 & NFT 发售 (Art Gallery)",
          url: "https://opensea.io",
          icon: "store",
          enabled: true
        },
        {
          id: "art_3",
          title: "📧 商业合作与定制稿件预约 (Cooperate)",
          url: "mailto:neon@art.com",
          icon: "mail",
          enabled: true
        }
      ],
      assistantName: "霓虹 AI 灵感漫游者",
      assistantGreeting: "欢迎来到赛博梦境！有什么音乐、画稿定制或商业联名合作的疑问，尽管问我吧！",
      assistantPrompts: ["如何定制数字画作？", "听听最新的电子单曲", "有哪些商业合作品牌？"],
      gallery: [
        "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80"
      ]
    }
  ]
};

// Fallback old single export for safety (backward compatible)
export const TEMPLATES: Template[] = LOCALIZED_TEMPLATES.zh;
