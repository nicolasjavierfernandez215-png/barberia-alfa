import { useEffect, useRef, useState } from "react";
import {
  Scissors,
  Sparkles,
  Star,
  MapPin,
  Phone,
  Instagram,
  Clock,
  Calendar,
  Gift,
  MessageCircle,
  ChevronRight,
  Check,
  Menu,
  X,
} from "lucide-react";

import heroImg from "@/assets/hero.jpg";
import gabrielImg from "@/assets/gabriel.jpg";
import interiorImg from "@/assets/interior.jpg";
import experienceImg from "@/assets/experience.jpg";
import gFade from "@/assets/gallery-fade.jpg";
import gBeard from "@/assets/gallery-beard.jpg";
import gClippers from "@/assets/gallery-clippers.jpg";
import gClassic from "@/assets/gallery-classic.jpg";
import gShave from "@/assets/gallery-shave.jpg";
import gTools from "@/assets/gallery-tools.jpg";

const BOOK_URL = "https://agendapro.com/site/ar/alfabarbershopsa/383871";
const WA_URL =
  "https://wa.me/541124678281?text=Hola%20vengo%20desde%20la%20web%20de%20Alfa%20Barbershop";
const IG_URL = "https://instagram.com/alfabarber.shop";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Av.+Presidente+Juan+Domingo+Per%C3%B3n+3903+San+Andr%C3%A9s+Buenos+Aires";

/* ----------------------------------- DATA ---------------------------------- */

const services = [
  {
    name: "Alfa Experiencia",
    desc: "Corte + cejas + lavado + masaje. El ritual más reservado.",
    time: "30 min",
    price: "$25.000",
    badge: "MÁS RESERVADO",
  },
  { name: "Corte Fade / Clásico", desc: "Técnica precisa, terminaciones limpias.", time: "30 min", price: "$15.000" },
  { name: "Corte y Barba", desc: "Tu look completo en una sola sesión.", time: "45 min", price: "$22.000" },
  { name: "Barba", desc: "Diseño, perfilado y toalla caliente.", time: "20 min", price: "$10.000" },
  { name: "Perfilado de Cejas", desc: "Mirada definida, trazo natural.", time: "10 min", price: "$5.000" },
  { name: "Color Global", desc: "Tono uniforme con productos premium.", time: "60 min", price: "$28.000" },
  { name: "Mechas / Claritos", desc: "Iluminación a medida y con técnica.", time: "75 min", price: "$32.000" },
  { name: "Limpieza Facial Profunda", desc: "Renovación y cuidado de la piel.", time: "40 min", price: "$18.000" },
];

const gallery = [
  { src: gFade, tag: "Fade", h: "row-span-2" },
  { src: gBeard, tag: "Barba", h: "" },
  { src: gTools, tag: "Detalle", h: "" },
  { src: gClippers, tag: "Técnica", h: "row-span-2" },
  { src: gClassic, tag: "Clásico", h: "" },
  { src: gShave, tag: "Afeitado", h: "" },
];

const testimonials = [
  {
    text: "Te atienden muy bien, podría decirse que es una barbería premium.",
    author: "Cliente Google",
  },
  {
    text: "La verdad que es un capo el Alfa. Salís como Brad Pitt después de cortarte el pelo con él.",
    author: "Nicolás Fernández",
  },
  { text: "El mejor barbero de San Martín.", author: "Tomás Tobar" },
  { text: "Siempre al detalle para que el cliente quede conforme.", author: "Facundo Rey" },
  { text: "Excelente trabajo, excelente trato.", author: "Hugo" },
];

const navItems = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#galeria", label: "Galería" },
  { href: "#opiniones", label: "Opiniones" },
  { href: "#contacto", label: "Contacto" },
];

/* --------------------------------- HOOKS ---------------------------------- */

function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function useRevealOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal-on-scroll");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCounter(target: number, start: boolean, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return val;
}

/* ------------------------------- COMPONENTS ------------------------------- */

function Header() {
  const scrolled = useScrolled(60);
  const [open, setOpen] = useState(false);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ink/80 backdrop-blur-xl border-b border-white/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#inicio" className="flex items-center gap-2">
          <span className="font-display text-3xl tracking-widest text-foreground">
            ALFA
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.3em] text-gold sm:inline">
            Barbershop
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="font-sub text-xs uppercase tracking-[0.18em] text-foreground/80 transition-colors hover:text-gold"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden items-center gap-2 border border-gold bg-gold px-5 py-2.5 font-sub text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-all hover:bg-transparent hover:text-gold sm:inline-flex"
          >
            Reservar Turno
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menú"
            className="rounded-sm border border-white/10 p-2 text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden">
          <div className="mx-6 mt-3 border border-white/10 bg-carbon/95 p-6 backdrop-blur-xl">
            <nav className="flex flex-col gap-4">
              {navItems.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="font-sub text-sm uppercase tracking-[0.18em] text-foreground/80 hover:text-gold"
                >
                  {n.label}
                </a>
              ))}
              <a
                href={BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 bg-gold px-5 py-3 font-sub text-xs font-semibold uppercase tracking-[0.18em] text-ink"
              >
                Reservar Turno
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen w-full overflow-hidden">
      <img
        src={heroImg}
        alt="Barbero realizando un fade en Alfa Barbershop"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover object-top animate-fade-slow"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-32 pb-24">
        <div className="max-w-3xl animate-reveal">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-12 bg-gold" />
            <span className="font-sub text-[11px] uppercase tracking-[0.35em] text-gold">
              Est. San Andrés · Buenos Aires
            </span>
          </div>
          <h1 className="font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] tracking-tight">
            DONDE EL <br />
            <span className="gold-gradient">ESTILO</span> SE CONVIERTE
            <br /> EN <span className="italic font-heading font-light">identidad</span>
          </h1>
          <p className="mt-8 max-w-xl font-sub text-base text-foreground/75 sm:text-lg">
            Cortes fade, clásicos, barba, coloración y experiencias premium en
            el corazón de San Andrés. Vienes por el corte. Te quedás por la
            experiencia.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-gold px-8 py-4 font-sub text-sm font-semibold uppercase tracking-[0.2em] text-ink transition-all hover:bg-gold-soft"
            >
              <Calendar className="h-4 w-4" />
              Reservar Turno
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-white/25 px-8 py-4 font-sub text-sm font-semibold uppercase tracking-[0.2em] text-foreground transition-all hover:border-gold hover:text-gold"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-8">
            <RatingPill label="Google" value="4.8" />
            <RatingPill label="AgendaPro" value="4.9" />
            <div className="font-sub text-xs uppercase tracking-[0.18em] text-foreground/60">
              + 60 reseñas verificadas
            </div>
          </div>
        </div>
      </div>

      <a
        href="#trust"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 font-sub text-[10px] uppercase tracking-[0.3em] text-foreground/50 md:flex"
      >
        Scroll
        <span className="h-10 w-px animate-pulse bg-gold/60" />
      </a>
    </section>
  );
}

function RatingPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <Star className="h-4 w-4 fill-gold text-gold" />
      <span className="font-display text-xl text-foreground">{value}</span>
      <span className="font-sub text-[11px] uppercase tracking-[0.18em] text-foreground/60">
        {label}
      </span>
    </div>
  );
}

function TrustStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setStart(true),
      { threshold: 0.3 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const reviews = useCounter(60, start);
  const rating = useCounter(49, start);

  return (
    <section id="trust" ref={ref} className="border-y border-white/10 bg-carbon">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 lg:grid-cols-4">
        <TrustCell
          k={
            <>
              +{reviews}
              <span className="text-gold">.</span>
            </>
          }
          label="Opiniones en Google"
        />
        <TrustCell
          k={
            <>
              {(rating / 10).toFixed(1)}
              <span className="text-gold">/5</span>
            </>
          }
          label="AgendaPro"
        />
        <TrustCell k="24/7" label="Turnos Online" />
        <TrustCell k="1:1" label="Atención personalizada" />
      </div>
    </section>
  );
}

function TrustCell({ k, label }: { k: React.ReactNode; label: string }) {
  return (
    <div className="reveal-on-scroll flex flex-col items-center justify-center gap-2 px-4 py-10">
      <div className="font-display text-4xl tracking-wider sm:text-5xl">{k}</div>
      <div className="text-center font-sub text-[10px] uppercase tracking-[0.25em] text-foreground/60">
        {label}
      </div>
    </div>
  );
}

function Experience() {
  return (
    <section id="experiencia" className="relative overflow-hidden py-28 lg:py-40">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:gap-16">
        <div className="reveal-on-scroll relative lg:col-span-6">
          <div className="absolute -left-4 -top-4 h-32 w-32 border-l border-t border-gold/60" />
          <div className="absolute -bottom-4 -right-4 h-32 w-32 border-b border-r border-gold/60" />
          <img
            src={experienceImg}
            alt="Experiencia Alfa - toalla caliente"
            loading="lazy"
            width={1024}
            height={1536}
            className="relative h-[640px] w-full object-cover"
          />
        </div>

        <div className="reveal-on-scroll flex flex-col justify-center lg:col-span-6">
          <span className="font-sub text-[11px] uppercase tracking-[0.35em] text-gold">
            La Experiencia Alfa
          </span>
          <h2 className="mt-4 font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
            Mucho más
            <br />
            que un <span className="gold-gradient">corte.</span>
          </h2>
          <p className="mt-6 max-w-lg font-sub text-foreground/75">
            Nuestro propósito es ser la mejor barbería de la zona. Creamos un
            espacio donde puedas despejarte mientras realizamos tu servicio con
            productos de calidad y atención personalizada. Cada detalle está
            pensado para que salgas renovado.
          </p>

          <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              "Corte profesional",
              "Perfilado de cejas",
              "Lavado de cabello",
              "Masaje relajante",
              "Asesoramiento personalizado",
              "Ambiente cómodo",
            ].map((it) => (
              <li
                key={it}
                className="flex items-center gap-3 border-l border-gold/40 pl-4 py-1"
              >
                <Check className="h-4 w-4 text-gold" />
                <span className="font-sub text-sm text-foreground/85">{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function HeroService() {
  return (
    <section className="relative overflow-hidden bg-carbon py-24">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(ellipse at top right, oklch(0.78 0.13 85 / 0.25), transparent 60%)`,
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="reveal-on-scroll grid items-center gap-12 border border-gold/30 bg-ink/60 p-10 backdrop-blur lg:grid-cols-2 lg:p-16">
          <div>
            <div className="inline-flex items-center gap-2 border border-gold/50 bg-gold/10 px-3 py-1 font-sub text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
              <Sparkles className="h-3 w-3" /> Más Reservado
            </div>
            <h3 className="mt-6 font-display text-5xl leading-none sm:text-6xl">
              ALFA <span className="gold-gradient">EXPERIENCIA</span>
            </h3>
            <p className="mt-4 font-heading text-lg font-light text-foreground/80">
              El servicio más elegido.
            </p>
            <ul className="mt-8 space-y-2 font-sub text-foreground/80">
              {["Corte", "Cejas", "Lavado", "Masaje relajante"].map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="h-px w-6 bg-gold" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-start lg:items-end">
            <div className="flex items-baseline gap-3">
              <span className="font-sub text-xs uppercase tracking-[0.2em] text-foreground/50">
                Desde
              </span>
              <span className="font-display text-7xl text-gold sm:text-8xl">
                $25.000
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2 font-sub text-sm text-foreground/60">
              <Clock className="h-4 w-4" /> 30 minutos · ARS
            </div>
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-3 bg-gold px-8 py-4 font-sub text-sm font-semibold uppercase tracking-[0.2em] text-ink transition-all hover:bg-gold-soft"
            >
              Reservar ahora
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicios" className="py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal-on-scroll flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="font-sub text-[11px] uppercase tracking-[0.35em] text-gold">
              Carta de Servicios
            </span>
            <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl lg:text-7xl">
              Técnica. Detalle.
              <br />
              <span className="gold-gradient">Identidad.</span>
            </h2>
          </div>
          <p className="max-w-md font-sub text-foreground/65">
            Cada servicio es ejecutado por profesionales con productos premium.
            Reservá el que mejor se adapte a tu estilo.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.name} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  name,
  desc,
  time,
  price,
  badge,
}: {
  name: string;
  desc: string;
  time: string;
  price: string;
  badge?: string;
}) {
  return (
    <div className="reveal-on-scroll group relative flex flex-col gap-4 bg-ink p-8 transition-colors duration-500 hover:bg-carbon">
      {badge && (
        <span className="absolute right-4 top-4 border border-gold/60 bg-gold/10 px-2 py-1 font-sub text-[9px] font-semibold uppercase tracking-[0.2em] text-gold">
          {badge}
        </span>
      )}
      <div className="flex items-center gap-3">
        <Scissors className="h-5 w-5 text-gold" />
        <h3 className="font-heading text-2xl font-medium uppercase tracking-wide">
          {name}
        </h3>
      </div>
      <p className="font-sub text-sm text-foreground/65">{desc}</p>
      <div className="mt-auto flex items-end justify-between border-t border-white/5 pt-5">
        <div>
          <div className="flex items-center gap-1.5 font-sub text-xs uppercase tracking-[0.18em] text-foreground/50">
            <Clock className="h-3 w-3" /> {time}
          </div>
          <div className="mt-1 font-display text-3xl text-gold">{price}</div>
        </div>
        <a
          href={BOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 border-b border-foreground/30 pb-0.5 font-sub text-xs font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:border-gold hover:text-gold"
        >
          Reservar <ChevronRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}

function Marquee() {
  const phrases = [
    "Te cambia la vida con un corte",
    "Salís como Brad Pitt",
    "El mejor barbero de San Martín",
    "Gabi capo total",
    "Experiencia premium",
  ];
  const items = [...phrases, ...phrases];
  return (
    <section className="overflow-hidden border-y border-white/10 bg-ink py-10">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((p, i) => (
          <div key={i} className="flex items-center gap-8 px-8">
            <span className="font-display text-4xl tracking-wider text-foreground/90 sm:text-5xl">
              {p}
            </span>
            <span className="text-3xl text-gold">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="galeria" className="py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal-on-scroll mb-12 max-w-3xl">
          <span className="font-sub text-[11px] uppercase tracking-[0.35em] text-gold">
            Galería
          </span>
          <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl lg:text-7xl">
            Trabajos que hablan
            <br />
            por <span className="gold-gradient">si solos.</span>
          </h2>
        </div>

        <div className="grid auto-rows-[220px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {gallery.map((g, i) => (
            <div
              key={i}
              className={`reveal-on-scroll group relative overflow-hidden ${g.h}`}
            >
              <img
                src={g.src}
                alt={g.tag}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-70 transition-opacity group-hover:opacity-90" />
              <span className="absolute bottom-4 left-4 font-sub text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
                {g.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="relative overflow-hidden bg-carbon py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:gap-20">
        <div className="reveal-on-scroll order-2 flex flex-col justify-center lg:order-1 lg:col-span-7">
          <span className="font-sub text-[11px] uppercase tracking-[0.35em] text-gold">
            Sobre Alfa
          </span>
          <h2 className="mt-3 font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
            La historia detrás
            <br />
            de <span className="gold-gradient">Alfa.</span>
          </h2>
          <p className="mt-4 font-heading text-xl font-light text-foreground/80">
            Barbería de barrio. Nivel premium.
          </p>
          <div className="mt-8 max-w-xl space-y-4 font-sub text-foreground/75">
            <p>
              <span className="text-gold">Gabriel Pieri</span> es el fundador
              de Alfa Barbershop y el profesional detrás de una experiencia
              que combina técnica, detalle y pasión por el cuidado masculino.
            </p>
            <p>
              Su objetivo es convertir a Alfa en la barbería referente de
              San Andrés y General San Martín — un lugar donde cada corte
              cuenta una historia.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            <Stat n="+8" l="Años de oficio" />
            <Stat n="+5K" l="Clientes atendidos" />
            <Stat n="100%" l="Pasión Alfa" />
          </div>
        </div>

        <div className="reveal-on-scroll relative order-1 lg:order-2 lg:col-span-5">
          <div className="absolute -left-3 -top-3 h-full w-full border border-gold/40" />
          <img
            src={gabrielImg}
            alt="Gabriel Pieri, fundador de Alfa Barbershop"
            loading="lazy"
            width={1024}
            height={1536}
            className="relative h-[640px] w-full object-cover"
          />
          <div className="absolute bottom-6 left-6 right-6 border border-gold/40 bg-ink/90 p-4 backdrop-blur">
            <div className="font-display text-2xl tracking-wider">GABRIEL PIERI</div>
            <div className="font-sub text-[10px] uppercase tracking-[0.25em] text-gold">
              Fundador · Master Barber
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-4xl text-gold">{n}</div>
      <div className="mt-1 font-sub text-[10px] uppercase tracking-[0.2em] text-foreground/60">
        {l}
      </div>
    </div>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);
  return (
    <section id="opiniones" className="py-28 lg:py-36">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <span className="font-sub text-[11px] uppercase tracking-[0.35em] text-gold">
          Opiniones
        </span>
        <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl lg:text-7xl">
          Lo que dicen <span className="gold-gradient">de nosotros.</span>
        </h2>

        <div className="relative mt-16 min-h-[260px]">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 flex flex-col items-center transition-all duration-700 ${
                idx === i ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <div className="flex gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-gold" />
                ))}
              </div>
              <blockquote className="mt-6 max-w-3xl font-heading text-2xl font-light leading-snug text-foreground/90 sm:text-3xl">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <div className="mt-6 font-sub text-[11px] uppercase tracking-[0.25em] text-foreground/60">
                — {t.author}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Testimonio ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-1 transition-all ${
                idx === i ? "w-10 bg-gold" : "w-4 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingFlow() {
  const steps = [
    { n: "01", t: "Elegí tu servicio", d: "Encontrá el ritual que se adapta a tu estilo." },
    { n: "02", t: "Seleccioná día y horario", d: "Disponibilidad en tiempo real." },
    { n: "03", t: "Confirmá la reserva", d: "Recibís tu turno al instante." },
    { n: "04", t: "Viví la experiencia Alfa", d: "Te esperamos con todo listo." },
  ];
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-ink py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal-on-scroll mx-auto max-w-3xl text-center">
          <span className="font-sub text-[11px] uppercase tracking-[0.35em] text-gold">
            Reservas
          </span>
          <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl lg:text-7xl">
            Reservá en menos
            <br />
            de un <span className="gold-gradient">minuto.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div
              key={s.n}
              className="reveal-on-scroll group relative flex flex-col gap-3 bg-ink p-8 transition-colors hover:bg-carbon"
            >
              <span className="font-display text-6xl text-gold/30 transition-colors group-hover:text-gold/70">
                {s.n}
              </span>
              <h3 className="font-heading text-xl font-medium uppercase tracking-wider">
                {s.t}
              </h3>
              <p className="font-sub text-sm text-foreground/60">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <a
            href={BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-gold px-10 py-5 font-sub text-sm font-semibold uppercase tracking-[0.2em] text-ink transition-all hover:bg-gold-soft"
          >
            <Calendar className="h-4 w-4" />
            Reservar Turno Ahora
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <p className="font-sub text-xs text-foreground/55">
            Cancelación hasta 3 horas antes · Modificación hasta 2 veces · Trabajamos con turnos para garantizar puntualidad.
          </p>
        </div>
      </div>
    </section>
  );
}

function GiftCard() {
  return (
    <section className="py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal-on-scroll relative grid items-center gap-10 overflow-hidden border border-gold/30 bg-carbon p-10 lg:grid-cols-12 lg:p-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage: `radial-gradient(circle at 80% 50%, oklch(0.78 0.13 85 / 0.4), transparent 50%)`,
            }}
          />
          <div className="relative lg:col-span-7">
            <span className="font-sub text-[11px] uppercase tracking-[0.35em] text-gold">
              Gift Cards
            </span>
            <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
              Regalá una <span className="gold-gradient">experiencia.</span>
            </h2>
            <p className="mt-6 max-w-lg font-sub text-foreground/70">
              El regalo perfecto para un padre, hermano, amigo o pareja.
              Una experiencia Alfa completa, lista para sorprender.
            </p>
            <ul className="mt-6 space-y-2 font-sub text-sm text-foreground/80">
              {["Corte", "Cejas", "Lavado", "Masaje relajante"].map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-gold" /> {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative lg:col-span-5">
            <div className="border border-gold bg-ink p-8 text-center shadow-[0_30px_80px_-30px_oklch(0.78_0.13_85/0.5)]">
              <Gift className="mx-auto h-8 w-8 text-gold" />
              <div className="mt-4 font-sub text-[10px] uppercase tracking-[0.3em] text-foreground/60">
                Gift Card · Alfa Experiencia
              </div>
              <div className="mt-4 font-display text-6xl text-gold">$18.000</div>
              <div className="mt-1 font-sub text-xs uppercase tracking-[0.2em] text-foreground/50 line-through">
                Valor $25.000
              </div>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-gold px-6 py-3.5 font-sub text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold-soft"
              >
                Comprar Gift Card
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Hours() {
  return (
    <section className="bg-carbon py-20">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 sm:grid-cols-2">
        <div className="reveal-on-scroll">
          <span className="font-sub text-[11px] uppercase tracking-[0.35em] text-gold">
            Horarios
          </span>
          <h3 className="mt-3 font-display text-4xl sm:text-5xl">
            Estamos abiertos.
          </h3>
          <p className="mt-3 font-sub text-sm text-foreground/65">
            Trabajamos principalmente con turnos reservados para minimizar
            tiempos de espera y garantizar atención personalizada.
          </p>
        </div>
        <div className="space-y-3 font-sub">
          {[
            ["Lunes — Sábado", "10:00 — 20:00"],
            ["Domingo", "Cerrado"],
          ].map(([d, h]) => (
            <div
              key={d}
              className="flex items-center justify-between border-b border-white/10 pb-3"
            >
              <span className="text-sm uppercase tracking-[0.15em] text-foreground/80">
                {d}
              </span>
              <span className="font-display text-2xl text-gold">{h}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contacto" className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal-on-scroll mx-auto mb-16 max-w-3xl text-center">
          <span className="font-sub text-[11px] uppercase tracking-[0.35em] text-gold">
            Visitanos
          </span>
          <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl lg:text-7xl">
            En el corazón de
            <br />
            <span className="gold-gradient">San Andrés.</span>
          </h2>
        </div>

        <div className="grid gap-px bg-white/5 lg:grid-cols-2">
          <div className="reveal-on-scroll flex flex-col gap-8 bg-ink p-10 lg:p-14">
            <ContactRow
              icon={<MapPin className="h-5 w-5 text-gold" />}
              title="Dirección"
              lines={[
                "Av. Presidente Juan Domingo Perón 3903",
                "San Andrés · Villa Yapeyú",
                "General San Martín, Buenos Aires",
              ]}
            />
            <ContactRow
              icon={<Phone className="h-5 w-5 text-gold" />}
              title="Teléfono / WhatsApp"
              lines={["(011) 2467-8281", "+54 11 2467-8281"]}
            />
            <ContactRow
              icon={<Instagram className="h-5 w-5 text-gold" />}
              title="Instagram"
              lines={["@alfabarber.shop"]}
            />

            <div className="flex flex-wrap gap-3 pt-4">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 font-sub text-xs font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:border-gold hover:text-gold"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a
                href={BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold px-5 py-3 font-sub text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-gold-soft"
              >
                <Calendar className="h-4 w-4" /> Reservar
              </a>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 font-sub text-xs font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:border-gold hover:text-gold"
              >
                <MapPin className="h-4 w-4" /> Cómo Llegar
              </a>
            </div>
          </div>

          <div className="reveal-on-scroll relative min-h-[400px] overflow-hidden bg-ink">
            <iframe
              title="Mapa Alfa Barbershop"
              src="https://www.google.com/maps?q=Av.%20Presidente%20Juan%20Domingo%20Per%C3%B3n%203903%20San%20Andr%C3%A9s%20Buenos%20Aires&output=embed"
              className="absolute inset-0 h-full w-full grayscale contrast-125"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  title,
  lines,
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
}) {
  return (
    <div className="flex gap-4">
      <div className="mt-1">{icon}</div>
      <div>
        <div className="font-sub text-[10px] uppercase tracking-[0.25em] text-foreground/55">
          {title}
        </div>
        <div className="mt-2 space-y-0.5 font-heading text-lg font-light text-foreground/90">
          {lines.map((l) => (
            <div key={l}>{l}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InteriorBanner() {
  return (
    <section
      className="relative h-[60vh] min-h-[420px] w-full overflow-hidden bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${interiorImg})` }}
    >
      <div className="absolute inset-0 bg-ink/70" />
      <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center">
        <span className="font-sub text-[11px] uppercase tracking-[0.35em] text-gold">
          Te esperamos
        </span>
        <h2 className="mt-4 font-display text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">
          Vienes por el corte.
          <br />
          Te quedás por la <span className="gold-gradient">experiencia.</span>
        </h2>
        <a
          href={BOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-3 border border-gold bg-gold/10 px-8 py-4 font-sub text-sm font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur transition-all hover:bg-gold hover:text-ink"
        >
          <Calendar className="h-4 w-4" /> Reservar tu turno
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink py-16">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-5xl tracking-widest">ALFA</span>
            <span className="font-sub text-[10px] uppercase tracking-[0.3em] text-gold">
              Barbershop
            </span>
          </div>
          <p className="mt-4 max-w-md font-heading text-lg font-light text-foreground/70">
            Donde el estilo se convierte en identidad.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-full border border-white/15 p-2.5 text-foreground/80 transition-colors hover:border-gold hover:text-gold"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="rounded-full border border-white/15 p-2.5 text-foreground/80 transition-colors hover:border-gold hover:text-gold"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <div className="font-sub text-[10px] uppercase tracking-[0.3em] text-gold">
            Navegación
          </div>
          <ul className="mt-4 space-y-2 font-sub text-sm">
            {navItems.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="text-foreground/70 transition-colors hover:text-gold"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-sub text-[10px] uppercase tracking-[0.3em] text-gold">
            Contacto
          </div>
          <ul className="mt-4 space-y-2 font-sub text-sm text-foreground/70">
            <li>Av. Pte. J. D. Perón 3903</li>
            <li>San Andrés, San Martín</li>
            <li>+54 11 2467-8281</li>
            <li>Lun a Sáb · 10–20h</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-7xl px-6">
        <div className="section-divider" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 font-sub text-[11px] uppercase tracking-[0.2em] text-foreground/40 sm:flex-row">
          <span>© {new Date().getFullYear()} Alfa Barbershop</span>
          <span>San Andrés · Buenos Aires · Argentina</span>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFloating() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
      className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-5px_rgba(37,211,102,0.6)] transition-transform hover:scale-110"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-[#25D366]" />
      </span>
    </a>
  );
}

/* ---------------------------------- PAGE ---------------------------------- */

export function AlfaLanding() {
  useRevealOnScroll();
  return (
    <div className="min-h-screen bg-ink text-foreground">
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Experience />
        <HeroService />
        <Services />
        <Marquee />
        <Gallery />
        <About />
        <Testimonials />
        <BookingFlow />
        <GiftCard />
        <Hours />
        <InteriorBanner />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloating />
    </div>
  );
}
