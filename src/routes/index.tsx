import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, MapPin, Clock, Phone, Instagram, Star, ChevronDown, Menu, X, ExternalLink, MessageCircle } from "lucide-react";
import { SALON, SERVICES, type Service } from "@/lib/salon";
import { BookingModal } from "@/components/BookingModal";
import before from "@/assets/hair-before.png";
import after from "@/assets/hair-after.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sofia Cabelos — Salão em Nazaré, Natal/RN | Solicite seu horário" },
      { name: "description", content: "Morena iluminada, loiros, platinados e vermelhos em Nossa Senhora de Nazaré, Natal. Solicite seu horário pelo WhatsApp." },
      { property: "og:title", content: "Sofia Cabelos — Mais que beleza, experiência única" },
      { property: "og:description", content: "Salão de beleza em Nossa Senhora de Nazaré, Natal/RN. Solicite seu horário pelo WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [["Serviços", "#servicos"], ["Antes e depois", "#antes-depois"], ["Avaliações", "#avaliacoes"], ["Dúvidas", "#faq"]];

function Index() {
  const [modal, setModal] = useState<{ open: boolean; service: string | null }>({ open: false, service: null });
  const book = (service: string | null = null) => setModal({ open: true, service });
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Header onBook={() => book()} />
      <Hero onBook={() => book()} />
      <ServiceMarquee />
      <Services onBook={book} />
      <BeforeAfter />
      <Reviews />
      <GoogleMaps />
      <Faq />
      <Footer />
      <BookingModal open={modal.open} initialService={modal.service} onClose={() => setModal({ open: false, service: null })} />
    </div>
  );
}

function Logo() {
  return (
    <a href="#" className="leading-tight">
      <span className="block font-display text-2xl tracking-tight">Sofia <em className="text-brand">Cabelos</em></span>
      <span className="block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Salão de beleza · Natal</span>
    </a>
  );
}

function Header({ onBook }: { onBook: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {NAV.map(([l, h]) => <a key={h} href={h} className="text-muted-foreground transition hover:text-primary">{l}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={onBook} className="rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 sm:px-5">Solicitar horário</button>
          <button className="rounded-full p-2 md:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </div>
      {open && (
        <nav className="grid border-t px-5 py-2 md:hidden">
          {NAV.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="py-3 text-sm">{l}</a>)}
        </nav>
      )}
    </header>
  );
}

function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-secondary blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-12 md:grid-cols-[1.1fr_1fr] md:py-20">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border bg-card px-3.5 py-1.5 text-xs uppercase tracking-[0.2em] text-primary">
            <MapPin className="h-3.5 w-3.5" /> Nossa Senhora de Nazaré · Natal
          </p>
          <h1 className="font-display text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
            Mais que beleza, <em className="text-brand">experiência única.</em>
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Morena iluminada, loiros, platinados e vermelhos — cor feita com cuidado, do primeiro tom à finalização.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={onBook} className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-medium text-primary-foreground shadow-soft transition hover:opacity-90">
              Solicitar horário <ArrowRight className="h-4 w-4" />
            </button>
            <a href="#servicos" className="rounded-full border bg-card px-7 py-3.5 font-medium transition hover:border-primary">Ver serviços</a>
          </div>
          <p className="mt-8 flex items-center gap-2 text-sm text-muted-foreground"><Clock className="h-4 w-4 text-primary" /> {SALON.hours}</p>
        </div>
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-3 rotate-3 rounded-[2.5rem] bg-brand opacity-90" />
          <img src={SALON.heroImg} alt="Cliente com loiro iluminado e ondas no Sofia Cabelos" className="relative aspect-[4/5] w-full rounded-[2.5rem] object-cover shadow-soft" />
          <div className="absolute -bottom-6 -left-2 flex gap-2 sm:-left-6">
            {SALON.heroThumbs.map((t, i) => (
              <img key={i} src={t} alt="Trabalho de coloração do Sofia Cabelos" className="h-24 w-20 rounded-2xl border-4 border-card object-cover shadow-soft" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const MARQUEE_ITEMS = ["MORENA ILUMINADA", "LOIRO ILUMINADO", "PLATINADAS", "VERMELHO", "COLORAÇÃO"] as const;

function ServiceMarquee() {
  return (
    <div className="overflow-hidden border-y border-espresso-foreground/20 bg-espresso py-3.5 text-espresso-foreground md:py-[18px]" aria-label="Serviços do Sofia Cabelos">
      <div className="marquee-track flex w-max font-display text-xl uppercase tracking-[0.14em] sm:text-2xl">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-7 pr-7" aria-hidden={copy === 1}>
            {MARQUEE_ITEMS.map((item) => (
              <span key={item} className="flex shrink-0 items-center gap-7">
                <span>{item}</span>
                <span className="text-honey" aria-hidden="true">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-10 max-w-xl">
      <p className="mb-3 text-xs uppercase tracking-[0.25em] text-primary">{eyebrow}</p>
      <h2 className="font-display text-4xl leading-tight sm:text-5xl">{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}

function ServiceCard({ s, img, showCopy, onBook }: { s: Service; img: string; showCopy: boolean; onBook: (id: string) => void }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-card shadow-soft">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={img} alt={`${s.title} — trabalho do Sofia Cabelos`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-2xl leading-tight">{s.title}</h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{showCopy ? s.copy : null}</p>
        <p className="mt-4 text-xs uppercase tracking-wider text-primary">Valor sob consulta</p>
        <button onClick={() => onBook(s.id)} className="mt-3 rounded-full border border-primary px-4 py-2.5 text-sm font-medium text-primary transition hover:bg-primary hover:text-primary-foreground">{s.cta}</button>
      </div>
    </article>
  );
}

function Services({ onBook }: { onBook: (id: string) => void }) {
  const [tab, setTab] = useState<string>("todos");
  const active = SERVICES.find((s) => s.id === tab);
  const pill = (on: boolean) => `shrink-0 snap-start rounded-full border px-5 py-2.5 text-sm transition ${on ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary"}`;
  return (
    <section id="servicos" className="scroll-mt-20 bg-secondary/50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle eyebrow="Nossos serviços" title={<>Cor com <em className="text-brand">luz e movimento.</em></>} sub="Fotos de trabalhos do Sofia Cabelos. Escolha o serviço e solicite um horário." />
        <div className="-mx-5 mb-8 flex snap-x gap-3.5 overflow-x-auto px-5 pb-2 sm:gap-4" role="tablist" aria-label="Filtrar serviços">
          <button role="tab" aria-selected={tab === "todos"} onClick={() => setTab("todos")} className={pill(tab === "todos")}>Todos</button>
          {SERVICES.map((s) => (
            <button key={s.id} role="tab" aria-selected={tab === s.id} onClick={() => setTab(s.id)} className={pill(tab === s.id)}>{s.title}</button>
          ))}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {active
            ? active.imgs.map((img, i) => <ServiceCard key={`${active.id}-${i}`} s={active} img={img} showCopy={i === 0} onBook={onBook} />)
            : SERVICES.filter((s) => s.imgs.length).map((s) => <ServiceCard key={s.id} s={s} img={s.imgs[0]} showCopy onBook={onBook} />)}
        </div>
      </div>
    </section>
  );
}

function BeforeAfter() {
  const [pos, setPos] = useState(50);
  return (
    <section id="antes-depois" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2">
        <SectionTitle eyebrow="Antes e depois" title={<>Arraste e veja a <em className="text-brand">diferença.</em></>} sub="Compare os dois lados deslizando o controle sobre a foto." />
        <div>
          <div className="relative aspect-square w-full touch-none select-none overflow-hidden rounded-3xl shadow-soft">
            <img src={after} alt="Depois" className="absolute inset-0 h-full w-full object-cover" />
            <img src={before} alt="Antes" className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
            <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-card" style={{ left: `${pos}%` }}>
              <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-card text-primary shadow-soft">⇆</div>
            </div>
            <span className="absolute left-3 top-3 rounded-full bg-espresso/80 px-3 py-1 text-xs text-espresso-foreground">Antes</span>
            <span className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">Depois</span>
            <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(+e.target.value)} aria-label="Comparar antes e depois" className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Imagens ilustrativas para demonstrar o comparativo.</p>
        </div>
      </div>
    </section>
  );
}

const REVIEWS = [
  { text: "Maravilha, ótimo espaço!!", service: "Espaço" },
  { text: "Excelente serviço e atendimento VIP.", service: "Atendimento" },
  { text: "Visito sempre é amor as profissionais de lá !!", service: "Equipe" },
];

function Reviews() {
  return (
    <section id="avaliacoes" className="scroll-mt-20 bg-espresso py-16 text-espresso-foreground md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-honey">Avaliações</p>
            <h2 className="font-display text-4xl leading-tight sm:text-5xl">Quem vem, <em>volta.</em></h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-display text-5xl">4,8</span>
            <div>
              <div className="flex text-honey">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <p className="text-xs opacity-70">29 avaliações no Google</p>
            </div>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <figure key={i} className="rounded-3xl border border-espresso-foreground/15 p-6">
              <div className="mb-4 flex text-honey">{[...Array(5)].map((_, k) => <Star key={k} className="h-3.5 w-3.5 fill-current" />)}</div>
              <blockquote className="font-display text-xl italic leading-snug">“{r.text}”</blockquote>
              <figcaption className="mt-5 text-xs uppercase tracking-wider opacity-60">{r.service}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-6 text-xs opacity-60">Avaliações públicas de clientes no Google.</p>
        <div className="mt-8 flex flex-col items-center gap-5 rounded-3xl bg-card px-6 py-8 text-center text-card-foreground shadow-soft sm:flex-row sm:text-left">
          <div className="flex-1">
            <h3 className="font-display text-2xl sm:text-3xl">Foi atendida no {SALON.name}?</h3>
            <p className="mt-1 text-sm text-muted-foreground">Sua avaliação no Google ajuda outras pessoas a nos encontrarem.</p>
          </div>
          <a href={SALON.maps} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90">
            <Star className="h-4 w-4 fill-current" /> Avaliar no Google
          </a>
        </div>
      </div>
    </section>
  );
}

function GoogleMaps() {
  return (
    <section className="py-12">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 rounded-3xl border bg-card px-6 py-8 text-center shadow-soft sm:flex-row sm:text-left">
        <div className="flex-1">
          <h3 className="font-display text-3xl">Como chegar</h3>
          <p className="mt-1 text-sm text-muted-foreground">{SALON.address}</p>
        </div>
        <a href={SALON.maps} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90">
          <MapPin className="h-4 w-4" /> Ver no Google Maps
        </a>
      </div>
    </section>
  );
}

const FAQ = [
  ["Como funciona a solicitação de horário?", "Você escolhe o serviço e, se quiser, uma data, um período e uma observação. No final, o WhatsApp do salão abre com a mensagem pronta para você revisar e enviar."],
  ["O horário já fica confirmado?", "Ainda não. É uma solicitação: o salão confere a agenda e confirma a disponibilidade com você pelo WhatsApp."],
  ["Preciso escolher data e período?", "Não. Os dois são opcionais — se deixar em branco, aparece “A combinar” e vocês ajustam juntos pelo WhatsApp."],
  ["Como funcionam os valores sob consulta?", "O valor depende do serviço e do seu cabelo. O salão informa pelo WhatsApp ao responder a sua solicitação."],
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="scroll-mt-20 pb-16 pt-8 md:pb-24">
      <div className="mx-auto max-w-3xl px-5">
        <SectionTitle eyebrow="Dúvidas" title="Perguntas frequentes" />
        <div className="divide-y rounded-3xl border bg-card">
          {FAQ.map(([q, a], i) => (
            <div key={q}>
              <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-medium">
                {q}<ChevronDown className={`h-5 w-5 shrink-0 text-primary transition ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <p className="px-6 pb-5 text-sm text-muted-foreground">{a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-secondary/50">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground">{SALON.tagline}</p>
        </div>
        <a href={SALON.maps} target="_blank" rel="noopener noreferrer" className="flex gap-3 text-sm hover:text-primary"><MapPin className="h-4 w-4 shrink-0 text-primary" />{SALON.address}</a>
        <div className="grid gap-3 text-sm">
          <p className="flex gap-3"><Clock className="h-4 w-4 shrink-0 text-primary" />{SALON.hours}</p>
          <a href={`https://wa.me/${SALON.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-primary"><MessageCircle className="h-4 w-4 shrink-0 text-primary" />WhatsApp {SALON.whatsappLabel}</a>
          <a href={`tel:+${SALON.phone}`} className="flex gap-3 hover:text-primary"><Phone className="h-4 w-4 shrink-0 text-primary" />Telefone {SALON.phoneLabel}</a>
        </div>
        <a href={SALON.instagram} target="_blank" rel="noopener noreferrer" className="flex gap-3 text-sm hover:text-primary"><Instagram className="h-4 w-4 shrink-0 text-primary" />@sofiacabelos <ExternalLink className="h-3 w-3" /></a>
      </div>
      <p className="border-t py-5 text-center text-xs text-muted-foreground">© {SALON.name}</p>
    </footer>
  );
}
