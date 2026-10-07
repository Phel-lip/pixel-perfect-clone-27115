import hero from "@/assets/sofia-hero.jpg";
import destaque1 from "@/assets/sofia-destaque-1.jpg";
import destaque2 from "@/assets/sofia-destaque-2.jpg";
import morena1 from "@/assets/sofia-morena-1.jpg";
import morena2 from "@/assets/sofia-morena-2.jpg";
import loiro1 from "@/assets/sofia-loiro-1.jpg";
import loiro2 from "@/assets/sofia-loiro-2.jpg";
import loiro3 from "@/assets/sofia-loiro-3.jpg";

export const SALON = {
  name: "Sofia Cabelos",
  tagline: "Mais que beleza, experiência única.",
  address: "R. Rubens Mariz, 2195 — Nossa Senhora de Nazaré, Natal/RN",
  hours: "Ter, qua, qui e sáb · 9h às 18h",
  phoneLabel: "(84) 3654-1282",
  phone: "558436541282",
  // Número do link oficial na bio do Instagram (wa.me/8487887399), com o código do Brasil.
  whatsapp: "558487887399",
  whatsappLabel: "(84) 8788-7399",
  instagram: "https://www.instagram.com/sofiacabelos/",
  maps: "https://www.google.com/maps/search/?api=1&query=Sofia+Cabelos+R.+Rubens+Mariz+2195+Natal+RN",
  heroImg: hero,
  heroThumbs: [destaque1, destaque2],
};

export type Category = "Cabelos" | "Unhas" | "Sobrancelhas" | "Depilação";

export type Service = {
  id: string;
  title: string;
  category: Category;
  copy: string;
  cta: string;
  imgs: string[];
  pros: string[];
};

export const SERVICES: Service[] = [
  { id: "morena-iluminada", title: "Morena iluminada", category: "Cabelos", copy: "Luzes que trazem dimensão e brilho para cabelos castanhos, com transição suave da raiz às pontas.", cta: "Quero horário para morena iluminada", imgs: [morena1, morena2], pros: [] },
  { id: "loiro-platinado", title: "Loiro e platinado", category: "Cabelos", copy: "Loiros luminosos e platinados, do iluminado ao mais claro, finalizados com movimento.", cta: "Quero horário para loiro", imgs: [loiro1, loiro2, loiro3], pros: [] },
  { id: "manicure", title: "Manicure", category: "Unhas", copy: "Cuidado com as unhas para completar o visual.", cta: "Quero horário para manicure", imgs: [], pros: [] },
  { id: "sobrancelhas", title: "Sobrancelhas", category: "Sobrancelhas", copy: "Desenho de sobrancelhas para valorizar o olhar.", cta: "Quero horário para sobrancelhas", imgs: [], pros: [] },
  { id: "depilacao", title: "Depilação", category: "Depilação", copy: "Atendimento de depilação com profissionais de confiança.", cta: "Quero horário para depilação", imgs: [], pros: [] },
];

export const CATEGORIES: ("Todos" | Category)[] = ["Todos", "Cabelos", "Unhas", "Sobrancelhas", "Depilação"];
export const PERIODS = ["Manhã (9h–12h)", "Tarde (12h–18h)"];
export const NO_PREF = "Sem preferência";
