export interface LinkBlock {
  id: string;
  title: string;
  url: string;
  icon: string;
  enabled: boolean;
}

export interface ThemeSettings {
  background: string; // Tailwind class, e.g., bg-gradient-to-b from-[#fdfbf7] to-[#f5ebd8] or background-color hex/gradient
  accentColor: string; // Hex, e.g., #8b5cf6
  buttonStyle: "solid" | "outline" | "glass";
  borderRadius: number; // 0 to 100
}

export interface Persona {
  name: string;
  bio: string;
  avatarUrl: string;
  title?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  persona: Persona;
  theme: ThemeSettings;
  links: LinkBlock[];
  assistantName: string;
  assistantGreeting: string;
  assistantPrompts: string[];
  gallery?: string[]; // 可选的精选图画廊
}
