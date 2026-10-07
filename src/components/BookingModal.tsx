import { useEffect, useMemo, useState } from "react";
import { X, Check, ChevronLeft, MessageCircle, Info } from "lucide-react";
import { SALON, SERVICES, PERIODS, NO_PREF } from "@/lib/salon";

type Step = "Serviço" | "Profissional" | "Preferências" | "Resumo";

function localToday() {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`;
}

function fmtDate(d: string) {
  if (!d) return "A combinar";
  const [y, m, dd] = d.split("-");
  return `${dd}/${m}/${y}`;
}

export function BookingModal({ open, initialService, onClose }: { open: boolean; initialService: string | null; onClose: () => void }) {
  const [step, setStep] = useState<Step>("Serviço");
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [pro, setPro] = useState(NO_PREF);
  const [date, setDate] = useState("");
  const [period, setPeriod] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!open) return;
    setServiceId(initialService);
    const s = SERVICES.find((x) => x.id === initialService);
    setStep(s ? (s.pros.length ? "Profissional" : "Preferências") : "Serviço");
    setPro(NO_PREF); setDate(""); setPeriod(""); setNotes("");
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open, initialService, onClose]);

  const service = SERVICES.find((s) => s.id === serviceId);
  const pros = [NO_PREF, ...(service?.pros ?? [])];
  const hasPros = (service?.pros.length ?? 0) > 0;
  const steps: Step[] = ["Serviço", ...(hasPros ? (["Profissional"] as Step[]) : []), "Preferências", "Resumo"];
  const idx = steps.indexOf(step);
  const back = () => setStep(steps[idx - 1]);
  const pick = (id: string) => {
    const s = SERVICES.find((x) => x.id === id)!;
    if (!s.pros.includes(pro)) setPro(NO_PREF);
    setServiceId(id);
    setStep(s.pros.length ? "Profissional" : "Preferências");
  };

  const waUrl = useMemo(() => {
    if (!service) return "";
    const lines = [
      `Olá, ${SALON.name}! Gostaria de solicitar um horário:`,
      ``,
      `• Serviço: ${service.title}`,
      `• Profissional: ${pro}`,
      `• Data preferida: ${fmtDate(date)}`,
      `• Período preferido: ${period || "A combinar"}`,
      ...(notes.trim() ? [`• Observação: ${notes.trim()}`] : []),
      ``,
      `Aguardo a confirmação da disponibilidade.`,
    ];
    return `https://wa.me/${SALON.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [service, pro, date, period, notes]);

  if (!open) return null;
  const today = localToday();

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-espresso/60 backdrop-blur-sm sm:items-center sm:p-4" onClick={onClose} role="dialog" aria-modal="true" aria-label="Solicitar horário">
      <div className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-card shadow-soft sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-2">
            {idx > 0 && (
              <button onClick={back} aria-label="Voltar" className="rounded-full p-1.5 hover:bg-muted"><ChevronLeft className="h-5 w-5" /></button>
            )}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary">Solicitação de horário</p>
              <h3 className="font-display text-2xl">{step}</h3>
            </div>
          </div>
          <button onClick={onClose} aria-label="Fechar" className="rounded-full p-2 hover:bg-muted"><X className="h-5 w-5" /></button>
        </div>
        <div className="flex gap-1.5 px-5 pt-4">
          {steps.map((s, i) => (
            <div key={s} className={`h-1 flex-1 rounded-full ${i <= idx ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {step === "Serviço" && (
            <div className="grid gap-2">
              {SERVICES.map((s) => (
                <button key={s.id} onClick={() => pick(s.id)}
                  className={`flex items-center gap-3 rounded-2xl border p-2 text-left transition hover:border-primary ${serviceId === s.id ? "border-primary bg-secondary" : ""}`}>
                  {s.imgs[0] ? <img src={s.imgs[0]} alt="" className="h-14 w-14 rounded-xl object-cover" /> : <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary font-display text-xl text-primary">{s.title[0]}</span>}
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.category} · Valor sob consulta</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === "Profissional" && (
            <div className="grid gap-2">
              <p className="mb-2 text-sm text-muted-foreground">Para <strong className="text-foreground">{service?.title}</strong>. Se preferir, o salão indica a melhor profissional disponível.</p>
              {pros.map((p) => (
                <button key={p} onClick={() => setPro(p)} className={`flex items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition hover:border-primary ${pro === p ? "border-primary bg-secondary" : ""}`}>
                  <span className="font-medium">{p}</span>
                  {pro === p && <Check className="h-4 w-4 text-primary" />}
                </button>
              ))}
            </div>
          )}

          {step === "Preferências" && (
            <div className="grid gap-5">
              <p className="text-sm text-muted-foreground">Tudo opcional. As preferências serão confirmadas pelo salão no WhatsApp.</p>
              <label className="grid gap-1.5">
                <span className="text-sm font-medium">Data preferida <span className="text-muted-foreground">(opcional)</span></span>
                <div className="flex gap-2">
                  <input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className="h-11 min-w-0 flex-1 rounded-xl border bg-background px-3" />
                  {date && <button onClick={() => setDate("")} className="rounded-xl border px-3 text-sm hover:bg-muted">Limpar</button>}
                </div>
              </label>
              <div className="grid gap-1.5">
                <span className="text-sm font-medium">Período <span className="text-muted-foreground">(opcional)</span></span>
                <div className="grid gap-2">
                  {PERIODS.map((p) => (
                    <button key={p} onClick={() => setPeriod(period === p ? "" : p)} className={`rounded-xl border px-4 py-3 text-left text-sm transition hover:border-primary ${period === p ? "border-primary bg-secondary font-medium" : ""}`}>{p}</button>
                  ))}
                </div>
              </div>
              <label className="grid gap-1.5">
                <span className="text-sm font-medium">Observação <span className="text-muted-foreground">(opcional)</span></span>
                <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Ex.: prefiro um corte na altura dos ombros." className="rounded-xl border bg-background p-3 text-sm" />
              </label>
            </div>
          )}

          {step === "Resumo" && service && (
            <div className="grid gap-4">
              <dl className="divide-y rounded-2xl border">
                {[["Serviço", service.title], ["Profissional", pro], ["Data preferida", fmtDate(date)], ["Período preferido", period || "A combinar"], ["Valor", "Sob consulta"], ...(notes.trim() ? [["Observação", notes.trim()]] : [])].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 px-4 py-3 text-sm">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-right font-medium break-words">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex gap-3 rounded-2xl bg-secondary p-4 text-sm text-secondary-foreground">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p>Isto é uma <strong>solicitação</strong>, não um agendamento confirmado. O salão vai confirmar a disponibilidade com você pelo WhatsApp.</p>
              </div>
            </div>
          )}
        </div>

        <div className="border-t px-5 py-4">
          {step === "Profissional" && <button onClick={() => setStep("Preferências")} className="h-12 w-full rounded-full bg-primary font-medium text-primary-foreground hover:opacity-90">Continuar</button>}
          {step === "Preferências" && <button onClick={() => setStep("Resumo")} className="h-12 w-full rounded-full bg-primary font-medium text-primary-foreground hover:opacity-90">Ver resumo</button>}
          {step === "Resumo" && (
            <><a href={waUrl} target="_blank" rel="noopener noreferrer" data-testid="wa-link" className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand font-medium text-primary-foreground hover:opacity-90">
              <MessageCircle className="h-5 w-5" /> Enviar solicitação pelo WhatsApp
            </a><p className="mt-2 text-center text-xs text-muted-foreground">O WhatsApp será aberto com a mensagem pronta. Você revisa e envia por lá.</p></>
          )}
          {step === "Serviço" && <p className="text-center text-xs text-muted-foreground">Escolha um serviço para continuar</p>}
        </div>
      </div>
    </div>
  );
}
