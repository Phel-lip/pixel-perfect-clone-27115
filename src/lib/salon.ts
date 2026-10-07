import hero from "@/assets/sofia-hero.jpg";
import destaque1 from "@/assets/sofia-destaque-1.jpg";
import destaque2 from "@/assets/sofia-destaque-2.jpg";
import morena1 from "@/assets/sofia-morena-1.jpg";
import morena2 from "@/assets/sofia-morena-2.jpg";
import loiro1 from "@/assets/sofia-loiro-1.jpg";
import loiro2 from "@/assets/sofia-loiro-2.jpg";
import loiro3 from "@/assets/sofia-loiro-3.jpg";
import loiro4 from "@/assets/sofia-loiro-4.jpg";
import platinado1 from "@/assets/sofia-platinado-1.jpg";
import vermelho1 from "@/assets/sofia-vermelho-1.jpg";
import destaque3 from "@/assets/sofia-destaque-3.jpg";

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
  heroThumbs: [destaque2, destaque3],
};

export type Service = {
  id: string;
  title: string;
  copy: string;
  cta: string;
  imgs: string[];
  thumb?: string;
  pros: string[];
};

export const SERVICES: Service[] = [
  { id: "morena-iluminada", title: "Morena iluminada", copy: "Luzes que trazem dimensão e brilho para cabelos castanhos, com transição suave da raiz às pontas.", cta: "Quero horário para morena iluminada", imgs: [morena1, morena2, destaque1], pros: [] },
  { id: "loiro-iluminado", title: "Loiro iluminado", copy: "Loiros luminosos, do mel ao mais claro, finalizados com ondas e movimento.", cta: "Quero horário para loiro", imgs: [loiro1, loiro2, loiro3, loiro4], pros: [] },
  { id: "platinadas", title: "Platinadas", copy: "Tons platinados e acinzentados para quem quer um loiro bem frio e claro.", cta: "Quero horário para platinado", imgs: [platinado1], thumb: platinado1, pros: [] },
  { id: "vermelho", title: "Vermelho", copy: "Ruivos e vermelhos intensos, com cor viva e brilho.", cta: "Quero horário para vermelho", imgs: [vermelho1], thumb: vermelho1, pros: [] },
];

export const PERIODS = ["Manhã (9h–12h)", "Tarde (12h–18h)"];
export const NO_PREF = "Sem preferência";
