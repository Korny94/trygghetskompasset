import React, { useState, useEffect } from "react";
import {
  User,
  CreditCard,
  PlayCircle,
  Mail,
  LogOut,
  Edit2,
  Compass,
  CheckCircle,
  Save,
  ChevronLeft,
  ChevronRight,
  Download,
  Award,
  Calendar,
  Phone,
  MapPin,
  RefreshCw,
  Globe,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { clsx } from "clsx";

// --- Types ---

type Language = "no" | "en";

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
  studentId: string;
  avatarUrl: string;
  validUntil: string;
}

interface CourseVideo {
  id: string;
  title: string;
  duration: string;
  youtubeId: string;
}

// --- Mock Data ---

const INITIAL_USER: UserProfile = {
  fullName: "Karoline Nordmann",
  email: "karoline.nordmann@example.com",
  phone: "+47 912 34 567",
  address: "Lykkestien 42, 4000 Stavanger",
  dob: "1990-05-15",
  studentId: "TK-2025-8842",
  avatarUrl:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  validUntil: "31.12.2025",
};

const COURSE_VIDEOS: CourseVideo[] = [
  {
    id: "1",
    title: "Introduksjon: Finne roen i hverdagen",
    duration: "12:30",
    youtubeId: "vXAr5dh23zU",
  }, // Placeholder ID
  {
    id: "2",
    title: "Modul 1: Grensesetting for foreldre",
    duration: "45:15",
    youtubeId: "zoCiHlFjo04",
  },
  {
    id: "3",
    title: "Modul 2: Kommunikasjon med barn",
    duration: "38:20",
    youtubeId: "X1RETMlk8rc",
  },
];

// --- Translations ---

const content = {
  no: {
    nav: { back: "Tilbake til forsiden", logout: "Logg ut" },
    headers: {
      profile: "Min Profil",
      studentId: "Digitalt Studentbevis",
      courses: "Mine Kurs",
      contact: "Kontakt Veileder",
      certs: "Dine Utmerkelser",
    },
    userInfo: {
      edit: "Rediger",
      save: "Lagre endringer",
      labels: {
        name: "Fullt Navn",
        email: "E-post",
        phone: "Telefon",
        address: "Adresse",
        dob: "Fødselsdato",
      },
    },
    studentId: {
      status_valid: "GYLDIG MEDLEM",
      status_invalid: "UTLØPT",
      expires: "Gyldig til:",
      validate_btn: "Verifiser Gyldighet",
      validating: "Verifiserer mot register...",
      verified_msg: "Bekreftet i sanntid: ",
    },
    courses: {
      continue: "Fortsett der du slapp",
      progress: "65% Fullført",
      next_mod: "Neste Modul",
    },
    contact: {
      desc: "Har du spørsmål om kurset eller trenger veiledning? Send en melding direkte til Renate.",
      subject: "Emne",
      message: "Din melding",
      send: "Send Melding",
      success: "Melding sendt!",
    },
    certs: {
      download: "Last ned diplom",
      completed: "Fullført",
      completed_courses: "Fullførte kurs:",
      welcome: "Velkommen tilbake, ",
      streak: "Dager i strekk",
      module: "Modul ",
    },
  },
  en: {
    nav: { back: "Back to Home", logout: "Log out" },
    headers: {
      profile: "My Profile",
      studentId: "Digital Student ID",
      courses: "My Courses",
      contact: "Contact Guide",
      certs: "Your Achievements",
    },
    userInfo: {
      edit: "Edit",
      save: "Save Changes",
      labels: {
        name: "Full Name",
        email: "Email",
        phone: "Phone",
        address: "Address",
        dob: "Date of Birth",
      },
    },
    studentId: {
      status_valid: "VALID MEMBER",
      status_invalid: "EXPIRED",
      expires: "Valid until:",
      validate_btn: "Verify Validity",
      validating: "Verifying with registry...",
      verified_msg: "Verified Real-time: ",
    },
    courses: {
      continue: "Continue where you left off",
      progress: "65% Completed",
      next_mod: "Next Module",
    },
    contact: {
      desc: "Questions about the course or need guidance? Send a message directly to Renate.",
      subject: "Subject",
      message: "Your Message",
      send: "Send Message",
      success: "Message sent!",
    },
    certs: {
      download: "Download Diploma",
      completed: "Completed",
      completed_courses: "Completed courses:",
      welcome: "Welcome back, ",
      streak: "Days in a row",
      module: "Module ",
    },
  },
};

// --- Components ---

const InputField = ({
  label,
  value,
  onChange,
  disabled,
  type = "text",
}: any) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-semibold text-brand-secondary uppercase tracking-wider">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={clsx(
        "w-full px-4 py-2 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-brand-primary outline-none",
        disabled
          ? "bg-brand-bg/50 border-transparent text-gray-600"
          : "bg-white border-brand-accent2 shadow-inner"
      )}
    />
  </div>
);

// --- Main Page Component ---

export default function MyProfile({ onLogout }: { onLogout: () => void }) {
  const [lang, setLang] = useState<Language>("no");
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [isEditing, setIsEditing] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [currentVideoIdx, setCurrentVideoIdx] = useState(0);
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const t = content[lang];
  const navigate = useNavigate();

  // Logic to simulate verifying the ID card against a live database
  const handleValidateId = () => {
    setIsValidating(true);
    setIsValidated(false);
    setTimeout(() => {
      setIsValidating(false);
      setIsValidated(true);
    }, 2000); // 2 second mock delay
  };

  const toggleLang = () => setLang((prev) => (prev === "no" ? "en" : "no"));

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans pb-20">
      {/* --- Top Navigation Bar --- */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-brand-accent3/50 px-6 py-4 flex justify-between items-center shadow-soft">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="flex items-center gap-2 text-gray-500 hover:text-brand-primary transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="hidden sm:inline font-medium">{t.nav.back}</span>
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 text-sm font-bold text-brand-secondary hover:text-brand-primary transition-colors"
          >
            <Globe size={16} /> {lang.toUpperCase()}
          </button>
          <div className="h-6 w-px bg-gray-200"></div>
          <button
            onClick={() => {
              navigate("/");
            }}
            className="flex items-center gap-2 bg-brand-bg px-4 py-2 rounded-full text-brand-text hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100"
          >
            <LogOut size={18} />
            <span className="font-semibold">{t.nav.logout}</span>
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* --- Page Header --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-brand-text mb-2">
              {t.headers.profile}
            </h1>
            <p className="text-brand-secondary text-lg">
              {t.certs.welcome} {user.fullName.split(" ")[0]}
            </p>
          </div>

          {/* Achievement Badges (Visual Only) */}
          <div className="flex gap-4">
            <div className="bg-brand-accent1/20 text-brand-accent1 p-3 rounded-2xl flex flex-col items-center justify-center w-24 h-24 border border-brand-accent1/30">
              <Award size={24} />
              <span className="text-xs font-bold mt-1">{t.certs.module} 1</span>
            </div>
            <div className="bg-brand-primary/20 text-brand-primary p-3 rounded-2xl flex flex-col items-center justify-center w-24 h-24 border border-brand-primary/30">
              <div className="text-xl font-bold">12</div>
              <span className="text-xs text-center leading-tight">
                {t.certs.streak}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- COLUMN 1: Student ID & Contact --- */}
          <div className="space-y-8">
            {/* Student ID Card */}
            <div className="relative group perspective">
              <div
                className={clsx(
                  "bg-gradient-to-br from-brand-secondary to-[#5E8E85] rounded-3xl p-6 text-white shadow-xl transition-all duration-700 relative overflow-hidden",
                  isValidated
                    ? "shadow-[0_0_30px_rgba(127,169,158,0.6)]"
                    : "shadow-soft"
                )}
              >
                {/* ID Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-2">
                    <Compass size={20} />

                    <span className="font-bold tracking-widest text-xs opacity-90">
                      TRYGGHETSKOMPASSET
                    </span>
                  </div>
                  {/* <img
                    src="/logo-placeholder.png"
                    alt="Logo"
                    className="h-8 opacity-50"
                  /> */}
                  <div className="p-1.5 bg-white/20 rounded-full backdrop-blur-sm">
                    <CreditCard size={20} />
                  </div>
                </div>

                {/* ID Body */}
                <div className="flex gap-5 items-center mb-6">
                  <div className="relative">
                    <img
                      src={user.avatarUrl}
                      alt="Student"
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-white/30 shadow-inner"
                    />
                    {isValidated && (
                      <div className="absolute -bottom-2 -right-2 bg-green-400 text-white rounded-full p-1 border-2 border-brand-secondary animate-bounce">
                        <CheckCircle size={16} />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold leading-tight">
                      {user.fullName}
                    </h3>
                    <p className="text-brand-accent3 text-sm font-mono mt-1">
                      {user.studentId}
                    </p>
                    <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold tracking-wider backdrop-blur-md">
                      {t.studentId.status_valid}
                    </div>
                  </div>
                </div>

                {/* ID Footer */}
                <div className="flex justify-between items-end border-t border-white/10 pt-4">
                  <div>
                    <p className="text-[10px] opacity-70 uppercase mb-0.5">
                      {t.studentId.expires}
                    </p>
                    <p className="font-mono font-bold">{user.validUntil}</p>
                  </div>

                  {/* Validation Logic */}
                  {!isValidated ? (
                    <button
                      onClick={handleValidateId}
                      disabled={isValidating}
                      className="bg-brand-primary text-brand-text text-xs font-bold px-4 py-2 rounded-full shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
                    >
                      {isValidating ? (
                        <RefreshCw size={14} className="animate-spin" />
                      ) : (
                        <CheckCircle size={14} />
                      )}
                      {isValidating
                        ? t.studentId.validating
                        : t.studentId.validate_btn}
                    </button>
                  ) : (
                    <div className="text-right">
                      <p className="text-[10px] text-green-200 font-bold animate-pulse">
                        {t.studentId.verified_msg}
                      </p>
                      <p className="text-xs font-mono">
                        {new Date().toLocaleTimeString()}
                      </p>
                    </div>
                  )}
                </div>

                {/* Shimmer Effect overlay when validated */}
                {isValidated && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-shimmer pointer-events-none" />
                )}
              </div>
            </div>

            {/* Contact Teacher Form */}
            <div className="bg-white rounded-3xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-brand-primary/20 p-2 rounded-full text-brand-primary">
                  <Mail size={24} />
                </div>
                <h2 className="text-xl font-bold">{t.headers.contact}</h2>
              </div>
              <p className="text-sm text-gray-500 mb-6">{t.contact.desc}</p>

              <div className="space-y-4">
                <InputField
                  label="Navn"
                  value={user.fullName}
                  disabled={true}
                />
                <InputField
                  label={t.contact.subject}
                  value={contactSubject}
                  onChange={(e: any) => setContactSubject(e.target.value)}
                />
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-brand-secondary uppercase tracking-wider">
                    {t.contact.message}
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 rounded-xl border border-brand-accent2 shadow-inner focus:ring-2 focus:ring-brand-primary outline-none resize-none bg-brand-bg/30"
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                  />
                </div>
                <button
                  className="w-full bg-brand-text text-white font-bold py-3 rounded-xl shadow-lg hover:bg-gray-800 transition-all flex justify-center items-center gap-2"
                  onClick={() => {
                    setContactMessage("");
                    setContactSubject("");
                    alert(t.contact.success);
                  }}
                >
                  <Mail size={18} /> {t.contact.send}
                </button>
              </div>
            </div>
          </div>

          {/* --- COLUMN 2 & 3: Info & Courses --- */}
          <div className="lg:col-span-2 space-y-8">
            {/* User Info Section */}
            <div className="bg-white rounded-3xl p-8 shadow-soft relative overflow-hidden">
              {/* Decorative background blob */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-accent3/30 rounded-full blur-2xl"></div>

              <div className="flex justify-between items-center mb-8 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-accent1/20 p-2 rounded-full text-brand-accent1">
                    <User size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">{t.headers.profile}</h2>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={clsx(
                    "px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all",
                    isEditing
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-brand-bg text-gray-600 hover:bg-gray-200"
                  )}
                >
                  {isEditing ? <Save size={16} /> : <Edit2 size={16} />}
                  {isEditing ? t.userInfo.save : t.userInfo.edit}
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6 relative z-10">
                <InputField
                  label={t.userInfo.labels.name}
                  value={user.fullName}
                  onChange={(e: any) =>
                    setUser({ ...user, fullName: e.target.value })
                  }
                  disabled={!isEditing}
                />
                <InputField
                  label={t.userInfo.labels.email}
                  value={user.email}
                  onChange={(e: any) =>
                    setUser({ ...user, email: e.target.value })
                  }
                  disabled={!isEditing}
                  type="email"
                />
                <InputField
                  label={t.userInfo.labels.phone}
                  value={user.phone}
                  onChange={(e: any) =>
                    setUser({ ...user, phone: e.target.value })
                  }
                  disabled={!isEditing}
                />
                <InputField
                  label={t.userInfo.labels.dob}
                  value={user.dob}
                  onChange={(e: any) =>
                    setUser({ ...user, dob: e.target.value })
                  }
                  disabled={!isEditing}
                  type="date"
                />
                <div className="md:col-span-2">
                  <InputField
                    label={t.userInfo.labels.address}
                    value={user.address}
                    onChange={(e: any) =>
                      setUser({ ...user, address: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            {/* Courses / Video Carousel */}
            <div className="bg-brand-text text-brand-bg rounded-3xl p-8 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <PlayCircle className="text-brand-primary" />{" "}
                  {t.headers.courses}
                </h2>
                <div className="text-sm font-mono text-gray-400">
                  {currentVideoIdx + 1} / {COURSE_VIDEOS.length}
                </div>
              </div>

              {/* Video Player Placeholder */}
              <div className="aspect-video bg-black rounded-2xl mb-6 relative overflow-hidden shadow-2xl border border-gray-700 group">
                <iframe
                  style={{ width: "100%", height: "100%" }}
                  src={`https://www.youtube.com/embed/${COURSE_VIDEOS[currentVideoIdx].youtubeId}`}
                />

                {/* <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                  <p className="text-gray-500">
                    Video Player (Mock ID:{" "}
                    {COURSE_VIDEOS[currentVideoIdx].youtubeId})
                  </p>
                </div> */}

                {/* Custom Overlay Controls for styling */}
                {/* <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center text-brand-text shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <PlayCircle size={32} fill="currentColor" />
                  </div>
                </div> */}
              </div>

              {/* Controls & Progress */}
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">
                    {COURSE_VIDEOS[currentVideoIdx].title}
                  </h3>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                      <RefreshCw size={12} />{" "}
                      {COURSE_VIDEOS[currentVideoIdx].duration}
                    </span>
                    <div className="h-2 w-32 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-primary w-[65%]"></div>
                    </div>
                    <span className="text-xs text-brand-primary font-bold">
                      {t.courses.progress}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setCurrentVideoIdx((prev) => Math.max(0, prev - 1))
                    }
                    disabled={currentVideoIdx === 0}
                    className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentVideoIdx((prev) =>
                        Math.min(COURSE_VIDEOS.length - 1, prev + 1)
                      )
                    }
                    disabled={currentVideoIdx === COURSE_VIDEOS.length - 1}
                    className="p-3 bg-brand-primary text-brand-text rounded-full hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            </div>

            {/* Additional: Certificates Section */}
            <div className="bg-white rounded-3xl p-8 shadow-soft flex items-center justify-between border border-brand-accent3/30">
              <div className="flex items-center gap-4">
                <div className="bg-brand-secondary/20 p-4 rounded-2xl text-brand-secondary">
                  <Award size={32} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{t.headers.certs}</h3>
                  <p className="text-sm text-gray-500">
                    {t.certs.completed_courses} 1
                  </p>
                </div>
              </div>
              <button className="px-6 py-3 border-2 border-brand-accent2 rounded-xl font-bold text-gray-600 hover:bg-brand-bg hover:border-brand-primary transition-all flex items-center gap-2">
                <Download size={18} />
                <span className="hidden sm:inline">{t.certs.download}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation for Shimmer */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite linear;
        }
      `}</style>
    </div>
  );
}
