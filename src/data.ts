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
      assistantPrompts: ["What are today's recommendations?", "What are your business hours?", "Can I make a weekend reservation?", "Where is your shop located?"],
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
      assistantPrompts: ["Tell me about her career milestones", "How can I contact her?", "View her recent digital projects", "What is her current role?"],
      gallery: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80"
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
      assistantPrompts: ["How can I order a custom digital artwork?", "Listen to the latest electronic track", "What brands have you collaborated with?", "Can I license your music?"],
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
      assistantPrompts: ["本日のおすすめは？", "営業時間を教えてください", "週末の席予約はできますか？", "お店の場所はどこですか？"],
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
        }
      ],
      assistantName: "EleanorのAIビジネス秘书",
      assistantGreeting: "こんにちは。エレノアのAI秘书です。彼女の経歴、専門分野、またはビジネス提携について何でもご質問ください。",
      assistantPrompts: ["仕事の経歴を教えてください", "連絡を取るにはどうすればいい？", "最近のデジタルプロジェクトを見る", "現在の役職は何ですか？"],
      gallery: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: "artist",
      name: "クリエイティブ・アーティスト 🎨",
      description: "デジタルイラストレーター、電子音楽制作者、トレンドクリエイターに最適。",
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
      assistantPrompts: ["デジタルアートの注文方法は？", "最新のシングルを聴きたい", "これまでの主なコラボ実績は？", "音楽のライセンスは可能ですか？"],
      gallery: [
        "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80"
      ]
    }
  ]
};

// Fallback old single export for safety (backward compatible)
export const TEMPLATES: Template[] = LOCALIZED_TEMPLATES.en;
