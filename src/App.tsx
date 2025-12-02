import React, { useState } from "react";
import {
  Compass,
  Heart,
  ShieldCheck,
  GraduationCap,
  PlayCircle,
  User,
  Globe,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./index.css";

// --- Types & Translations ---

type Language = "no" | "en";

const content = {
  no: {
    nav: {
      home: "Hjem",
      courses: "Kurs",
      about: "Om oss",
      login: "Min Profil",
      donate: "Doner",
    },
    hero: {
      title: "Finn din indre ro. Styrk din familie.",
      subtitle:
        "Online kurs og veiledning med terapeut Renate Justnes. Vi gir deg verktøyene for livsglede og trygg oppdragelse.",
      cta_primary: "Start din reise",
      cta_secondary: "Se kursoversikt",
    },
    features: {
      title: "Hvorfor velge Trygghetskompasset?",
      f1_title: "Diplom & Kompetanse",
      f1_desc:
        "Få kompetansebevis etter fullført online kurs. Bygg din CV mens du bygger deg selv.",
      f2_title: "Studentbevis",
      f2_desc:
        "Alle våre medlemmer mottar offisielt studentbevis. Spar penger mens du lærer.",
      f3_title: "Terapeutisk Veiledning",
      f3_desc:
        "Faglig forankret veiledning fra utdannet terapeut for bedre mental helse.",
    },
    pricing: {
      title: "Invester i din fremtid",
      semester: "per semester",
      popular: "Mest Populær",
      std_price: "499,-",
      std_title: "Ordinært Medlemskap",
      std_desc:
        "Full tilgang til online kurs, personlig profil og studentbevis.",
      discount_price: "299,-",
      discount_title: "Student",
      discount_desc:
        "For deg som allerede er student ved en annen institusjon.",
      benefit_one: "Online kurs",
      benefit_two: "Studentbevis inkludert",
      benefit_three: "Diplom & kompetansebevis",
      benefit_four: "Ekstra tilbud & rabatter fra våre partnere",
      cta: "Bestill og start nå",
      guarantee: "Sikker betaling via Vipps/Kort",
    },
    about: {
      title: "Møt din veileder",
      name: "Renate Justnes",
      role: "Utdannet Terapeut & Grunnlegger",
      desc: "Med et hjerte for mennesker og faglig tyngde, veileder Renate deg gjennom livets utfordringer. Fra barneoppdragelse til egenkjærlighet – her er det rom for å vokse.",
    },
    footer: {
      rights: "© 2025 Trygghetskompasset. Alle rettigheter reservert.",
    },
  },
  en: {
    nav: {
      home: "Home",
      courses: "Courses",
      about: "About us",
      login: "My Profile",
      donate: "Donate",
    },
    hero: {
      title: "Find your inner peace. Strengthen your family.",
      subtitle:
        "Online courses and guidance with therapist Renate Justnes. We give you the tools for joy and safe parenting.",
      cta_primary: "Start your journey",
      cta_secondary: "View Courses",
    },
    features: {
      title: "Why choose Trygghetskompasset?",
      f1_title: "Diploma & Certification",
      f1_desc:
        "Receive a certificate of competence upon completing online courses. Build your CV while building yourself.",
      f2_title: "Student ID",
      f2_desc:
        "All our members receive an official student ID. Save money while you learn.",
      f3_title: "Therapeutic Guidance",
      f3_desc:
        "Professionally grounded guidance from a trained therapist for better mental health.",
    },
    pricing: {
      title: "Invest in your future",
      semester: "per semester",
      popular: "Most Popular",
      std_price: "499,-",
      std_title: "Standard Membership",
      std_desc:
        "Full access to online courses, personal profile, and student ID.",
      discount_price: "299,-",
      discount_title: "Existing Student",
      discount_desc: "For those already studying at another institution.",
      benefit_one: "Online courses",
      benefit_two: "Student ID included",
      benefit_three: "Diploma & certificate of competence",
      benefit_four: "Extra offers & discounts from our partners",
      cta: "Order & Start Now",
      guarantee: "Secure payment",
    },
    about: {
      title: "Meet your guide",
      name: "Renate Justnes",
      role: "Trained Therapist & Founder",
      desc: "With a heart for people and professional expertise, Renate guides you through life's challenges. From parenting to self-love – there is room to grow here.",
    },
    footer: {
      rights: "© 2025 Trygghetskompasset. All rights reserved.",
    },
  },
};

// --- Components ---

const Button = ({
  children,
  variant = "primary",
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
  onClick?: () => void;
}) => {
  const baseStyle =
    "px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-sm flex items-center justify-center gap-2";

  const variants = {
    primary:
      "bg-brand-primary text-brand-text hover:shadow-lg hover:brightness-105",
    secondary:
      "bg-brand-secondary text-white hover:shadow-lg hover:brightness-105",
    outline:
      "border-2 border-brand-primary text-brand-text hover:bg-brand-primary/10",
    ghost: "bg-transparent text-brand-text hover:bg-brand-accent3/20",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white rounded-3xl p-8 shadow-soft hover:shadow-xl transition-all duration-500 border border-brand-accent3/30 ${className}`}
  >
    {children}
  </div>
);

// --- Main App ---

function App() {
  const [lang, setLang] = useState<Language>("no");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = content[lang];
  const navigate = useNavigate();

  const toggleLang = () => setLang((prev) => (prev === "no" ? "en" : "no"));

  return (
    <div className="min-h-screen font-sans text-brand-text selection:bg-brand-primary/30">
      <nav className="fixed w-full z-50 bg-brand-bg/90 backdrop-blur-md border-b border-brand-accent3/50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-brand-secondary p-2 rounded-full text-white">
                <Compass size={28} />
              </div>
              <span className="text-xl font-bold tracking-tight text-brand-text">
                Trygghetskompasset
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#courses"
                className="hover:text-brand-secondary transition-colors"
              >
                {t.nav.courses}
              </a>
              <a
                href="#about"
                className="hover:text-brand-secondary transition-colors"
              >
                {t.nav.about}
              </a>

              <div className="h-6 w-px bg-brand-accent3"></div>

              <button
                onClick={toggleLang}
                className="flex items-center gap-1 text-sm font-semibold hover:text-brand-secondary"
              >
                <Globe size={16} />
                {lang.toUpperCase()}
              </button>

              {/* <Button
                variant="ghost"
                onClick={() => {}}
                className="text-sm px-4 py-2"
              >
                {t.nav.donate}
              </Button> */}
              <Button
                variant="secondary"
                onClick={() => {
                  navigate("./profile");
                }}
                className="text-sm px-5 py-2"
              >
                <User size={16} />
                {t.nav.login}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={toggleLang} className="text-sm font-bold">
                {lang.toUpperCase()}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-brand-bg border-t border-brand-accent3 p-4 shadow-xl">
            <div className="flex flex-col gap-4">
              <a href="#courses" className="text-lg font-medium">
                {t.nav.courses}
              </a>
              <a href="#about" className="text-lg font-medium">
                {t.nav.about}
              </a>
              <Button variant="primary" className="w-full justify-start">
                {t.nav.donate}
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                {t.nav.login}
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight drop-shadow-sm">
              {t.hero.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="primary"
                className="text-lg px-8 py-4 shadow-brand-primary/30 shadow-lg"
              >
                {t.hero.cta_primary} <ArrowRight size={20} />
              </Button>
              <Button variant="outline" className="text-lg px-8 py-4">
                {t.hero.cta_secondary}
              </Button>
            </div>
          </div>
          <div className="relative">
            {/* Abstract Background Blobs */}
            <div className="absolute -top-10 -left-10 w-72 h-72 bg-brand-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 -right-10 w-72 h-72 bg-brand-secondary/20 rounded-full blur-3xl"></div>

            {/* Image Placeholder */}
            <div className="relative bg-gradient-to-br from-brand-accent3 to-white rounded-[3rem] p-4 shadow-soft rotate-2 hover:rotate-0 transition-transform duration-700">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Happy friends holding hands"
                className="rounded-[2.5rem] w-full object-cover h-[500px] shadow-inner"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-lg flex items-center gap-3">
                <div className="bg-brand-accent1 p-2 rounded-full text-white">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Sertifisert</p>
                  <p className="font-bold text-brand-text">Trygghet først</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Offering */}
      <section className="py-20 bg-white/50" id="courses">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">{t.features.title}</h2>
            <div className="h-1 w-20 bg-brand-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}

            {/* Feature 2 */}
            <Card className="hover:-translate-y-2">
              <div className="w-14 h-14 bg-brand-primary/20 rounded-2xl flex items-center justify-center mb-6 text-brand-primary">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.features.f3_title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t.features.f3_desc}
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className="hover:-translate-y-2">
              <div className="w-14 h-14 bg-brand-accent1/30 rounded-2xl flex items-center justify-center mb-6 text-brand-accent1">
                <User size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.features.f2_title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t.features.f2_desc}
              </p>
            </Card>

            <Card className="hover:-translate-y-2">
              <div className="w-14 h-14 bg-brand-accent2/30 rounded-2xl flex items-center justify-center mb-6 text-brand-secondary">
                <GraduationCap size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.features.f1_title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t.features.f1_desc}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t.pricing.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Standard Plan */}
          <div className="relative bg-white rounded-3xl p-8 shadow-xl border-2 border-brand-primary flex flex-col">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-primary text-brand-text px-4 py-1 rounded-full text-sm font-bold shadow-sm">
              {t.pricing.popular}
            </div>
            <h3 className="text-2xl font-bold text-brand-text mb-2">
              {t.pricing.std_title}
            </h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold">{t.pricing.std_price}</span>
              <span className="text-gray-500 text-sm">
                / {t.pricing.semester}
              </span>
            </div>
            <p className="text-gray-600 mb-8 flex-grow">{t.pricing.std_desc}</p>
            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-center gap-2">
                <PlayCircle size={18} className="text-brand-secondary" />
                {t.pricing.benefit_one}
              </li>

              <li className="flex items-center gap-2">
                <GraduationCap size={18} className="text-brand-secondary" />{" "}
                {t.pricing.benefit_two}
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-brand-secondary" />{" "}
                {t.pricing.benefit_three}
              </li>
            </ul>
            <Button variant="primary" className="w-full text-lg shadow-lg">
              {t.pricing.cta}
            </Button>
          </div>

          {/* Student Plan */}
          <div className="bg-brand-accent2/20 rounded-3xl p-8 flex flex-col border border-transparent hover:border-brand-accent2 transition-colors">
            <h3 className="text-2xl font-bold text-brand-text mb-2">
              {t.pricing.discount_title}
            </h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-brand-secondary">
                {t.pricing.discount_price}
              </span>
              <span className="text-gray-500 text-sm">
                / {t.pricing.semester}
              </span>
            </div>
            <p className="text-gray-600 mb-8 flex-grow">
              {t.pricing.discount_desc}
            </p>
            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-center gap-2">
                <PlayCircle size={18} className="text-brand-secondary" />
                {t.pricing.benefit_one}
              </li>

              <li className="flex items-center gap-2">
                <GraduationCap size={18} className="text-brand-secondary" />{" "}
                {t.pricing.benefit_three}
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-brand-secondary" />{" "}
                {t.pricing.benefit_four}
              </li>
            </ul>
            <Button variant="outline" className="w-full bg-white/50">
              {t.pricing.cta}
            </Button>
          </div>
        </div>
        <p className="text-center text-gray-400 text-sm mt-8 flex justify-center items-center gap-2">
          <ShieldCheck size={14} /> {t.pricing.guarantee}
        </p>
      </section>

      {/* About Section */}
      <section className="py-20 bg-brand-accent3/20" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-soft flex flex-col md:flex-row items-center gap-12">
            <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Renate Justnes"
                className="w-full h-full object-cover rounded-full border-4 border-brand-accent1 shadow-lg"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">{t.about.name}</h2>
              <p className="text-brand-secondary font-semibold mb-4 uppercase tracking-wide text-sm">
                {t.about.role}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                "{t.about.desc}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-text text-brand-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Compass size={24} className="text-brand-primary" />
            <span className="font-bold text-lg">Trygghetskompasset</span>
          </div>
          <div className="text-sm text-gray-400">{t.footer.rights}</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-brand-primary transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-brand-primary transition-colors">
              Facebook
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
