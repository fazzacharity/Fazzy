import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ActivePage, Program, Comment, BlogItem } from "./types";
import { Navbar } from "./components/Navbar";
import { ServicePages } from "./components/ServicePages";
import { PremiumDonateButton } from "./components/PremiumDonateButton";
import { translate, translateParagraph, TOP_LANGUAGES } from "./translation";
import { 
  SPONSORS, 
  TEAM_MEMBERS, 
  PROGRAMS, 
  EVENTS, 
  SUCCESS_STORIES, 
  BLOG_POSTS, 
  FAQS, 
  COMMENTS 
} from "./data";
import { 
  Heart, 
  Sparkles, 
  Globe, 
  Users, 
  BookOpen, 
  Shield, 
  Activity, 
  FileText, 
  Phone, 
  ArrowRight, 
  Search, 
  ChevronRight, 
  DollarSign, 
  Calendar, 
  MapPin, 
  Clock, 
  Grid, 
  Camera, 
  Video, 
  AlertTriangle, 
  CheckCircle, 
  MessageSquare, 
  ThumbsUp, 
  Filter,
  Lock,
  Compass,
  Award,
  Briefcase,
  HelpCircle,
  HeartHandshake, 
  Lock, 
  PieChart, 
  Send, 
  Star, 
  User,
  Plus,
  Compass,
  ArrowUp,
  Award,
  Mail,
  Youtube,
  Share2
} from "lucide-react";

const getPageHeaderInfo = (page: ActivePage): { img: string; tag: string; title: string; sub: string } => {
  switch (page) {
    case "about":
      return {
        img: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1600",
        tag: "ABOUT THE FOUNDATION",
        title: "About Prince Fazza Charity Foundation",
        sub: "A Global Covenant of Direct Relief: Operating Across 25 Nations with 100% Direct-to-Field Resource Flow."
      };
    case "founder-chronicle":
      return {
        img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1600",
        tag: "THE FOUNDER'S CHRONICLE",
        title: "Founder's Chronicle",
        sub: "Legacy of Systemic Grace: A Personal endowing pledge from His Highness Prince Fazza Al-Sayyid."
      };
    case "board-directors":
      return {
        img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1600",
        tag: "STEWARDSHIP TEAM",
        title: "Board of Directors Office",
        sub: "Sovereign Trustees & Ethical Stewards: Defining Strict Protocols Under Zero Administrative Leakage Metrics."
      };
    case "org-structure":
      return {
        img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600",
        tag: "WORKFLOW TOPOLOGY",
        title: "Organizational Structure & Internal Flow",
        sub: "Synergistic System Flow: Engineering swift field interventions with high double-entry ledger audits."
      };
    case "hiv-support":
      return {
        img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80",
        tag: "CLINICAL HIV OUTREACH",
        title: "HIV Critical Support Systems",
        sub: "Access free clinical diagnostics, absolute double-blind privacy coordinates, certified immunotherapy, and personalized nutrition support."
      };
    case "halfway-house":
      return {
        img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        tag: "COMMUNITY INTEGRATION MODULE",
        title: "Fazza Safehouse & Transition Residences",
        sub: "Safe temporary housing, structured career placement courses, and legal assistance for individuals transition back into the workforce."
      };
    case "vulnerable-foreigners":
      return {
        img: "https://images.unsplash.com/photo-1511632765486-a96cb75a8986?q=80&w=1600",
        tag: "GLOBAL IMMIGRANT DEFENSE COVENANT",
        title: "Vulnerable Foreign Citizens Support",
        sub: "Emergency food, placement protocols, linguistic translations, and consular guidance for vulnerable non-native residents."
      };
    case "seminar-request":
      return {
        img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
        tag: "ONCOLOGICAL LECTURES & WORKSHOPS",
        title: "Request an Educational Seminar",
        sub: "Book professional workshops on preventative oncology, cancer survivor therapy, and psychological tools for local communities."
      };
    case "health-ambassadors":
      return {
        img: "https://images.unsplash.com/photo-1576091158221-1241f92e22fc?w=800&q=80",
        tag: "VERIFIED REGIONAL MEDICAL NETWORK",
        title: "Fazza Certified Health Ambassadors Database",
        sub: "Direct secure access to our network of registered pediatricians, mobile emergency clinics, and oncology specialists."
      };
    case "children-home":
      return {
        img: "https://images.unsplash.com/photo-1489659639091-8b687bc4386e?w=800&q=80",
        tag: "YOUTH REUNIFICATION PROTOCOL",
        title: "Children Came Home Initiative",
        sub: "Identifying displaced youth, coordinating legal protection guardians, and restoring young souls back with original families."
      };
    case "shelter-placement":
      return {
        img: "https://images.unsplash.com/photo-1469571486040-af250c558d63?w=800&q=80",
        tag: "EMERGENCY PLACEMENT INFRASTRUCTURE",
        title: "Emergency Shelter & Housing Placement",
        sub: "Deploying high-quality shelter networks equipped with continuous power, running clean water, and on-site psychological medics."
      };
    case "medical-care":
      return {
        img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
        tag: "ONCOLOGY SURGERY ENDOWMENTS",
        title: "Hospital Subsidies & Surgical Care Operations",
        sub: "Full coverage for diagnostic oncology, emergency surgical operations, and complex clinical treatments for vulnerable families."
      };
    case "mother-child":
      return {
        img: "https://images.unsplash.com/photo-1531983412531-1f49a365f698?q=80&w=1600",
        tag: "MATERNITY CLINICAL WINGS",
        title: "Mother & Baby Protection Havens",
        sub: "Specialized maternal medical monitoring, safe postpartum housing, and dispatch stations for vital infant formula."
      };
    case "visit-care":
      return {
        img: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=1600",
        tag: "VISIT & CARE PROGRAM",
        title: "On-Site Visit & Continuous Care Program",
        sub: "Join local teams visiting remote clinical quarters, assisting mobile medic caravans, and delivering care packages to beneficiaries."
      };
    case "programs":
      return {
        img: "https://images.unsplash.com/photo-1579684389783-bdf560104271?w=800&q=80",
        tag: "OUR ACTIVE FRAMEWORK",
        title: "Fazza Humanitarian Framework Modules",
        sub: "Empowering communities with certified healthcare diagnostic pathways, secure placement modules, and active emergency support protocols."
      };
    case "newsroom":
      return {
        img: "https://images.unsplash.com/photo-1579684389783-bdf560104271?q=80&w=1600",
        tag: "OFFICIAL PRESS OFFICE",
        title: "Fazza Chronicles & Field Briefs",
        sub: "Certified field bulletins, financial audit publications, oncology triumph narratives, and regional transition reports."
      };
    case "campaigns":
    case "emergency-relief":
    case "scholarships":
    case "water-projects":
      return {
        img: "https://images.unsplash.com/photo-1541816521255-ff76dbc5c120?w=800&q=80",
        tag: "CAMPAIGNS TRACKER Portal",
        title: "Active Human Sponsorship Targets",
        sub: "Verify continuous fundraising achievement parameters and targeted logistics registries."
      };
    case "donate":
      return {
        img: "https://images.unsplash.com/photo-1532938911079-1b06ac7ce2ec?q=80&w=1600",
        tag: "DONATION PORTAL",
        title: "Sovereign Contribution Portal",
        sub: "Support direct humanitarian action under certified tax-exempt 501(c)(3) guidelines."
      };
    case "commentary":
      return {
        img: "https://images.unsplash.com/photo-1518398046578-8cca57782e17?q=80&w=1600",
        tag: "COOPERATIVE LIVE DIALOGUE",
        title: "Reviews & Public Testimonials",
        sub: "Sustained dialogues built directly from field medical caravans, engineering drill units, and direct student beneficiaries."
      };
    case "volunteer":
      return {
        img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
        tag: "HUMANITARIAN MOBILIZATION",
        title: "Volunteer Registration Registry",
        sub: "Partner directly with our rapid triage response teams, clinic drivers, and native language translators."
      };
    case "partner":
      return {
        img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
        tag: "GLOBAL ALLIANCES",
        title: "Corporate Partnership Board",
        sub: "Align your organization with regional development grids and sovereign continuous audit protocols."
      };
    case "careers":
      return {
        img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
        tag: "PROFESSIONAL DISPATCH",
        title: "Logistical Careers & Internships",
        sub: "Join our international on-site administrative staff and fast-track your humanitarian deployment."
      };
    case "faq":
      return {
        img: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80",
        tag: "INFORMATION DEPOT",
        title: "Fazza Frequently Asked Questions",
        sub: "Verify our operational guidelines, continuous audit parameters, and children sponsorship programs."
      };
    case "annual-reports":
    case "financial-transparency":
      return {
        img: "https://images.unsplash.com/photo-1576091158221-1241f92e22fc?q=80&w=1600",
        tag: "TRANSPARENCY LEDGER",
        title: "Sovereign Audit Ledger Database",
        sub: "Public disclosure of international fund flows, zero-leakage certifications, and IRS 501(c)(3) filing metrics."
      };
    case "stories":
      return {
        img: "https://images.unsplash.com/photo-1541816521255-ff76dbc5c120?q=80&w=1600",
        tag: "TRIUMPHANT CHRONICLES",
        title: "Humanitarian Beneficiary Stories",
        sub: "Personal testimonies of dignity restored, sight recovered, and clean springs unlocked in distant provinces."
      };
    case "blog":
      return {
        img: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1600",
        tag: "FIELD REPORTS",
        title: "Humanitarian Field Briefs",
        sub: "Updates directly from our medical pilots and water construction crews in active global sectors."
      };
    case "events":
      return {
        img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600",
        tag: "COORDINATED ACTIONS",
        title: "Outreach Events & Public Lectures",
        sub: "Register for local charity seminars, academic conferences, and regional outpatient screenings near you."
      };
    case "gallery":
      return {
        img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1600",
        tag: "VISUAL DIALOGUE",
        title: "Sovereign Field Photography Archive",
        sub: "A curated timeline of absolute human grace, direct surgical interventions, and water drill operations."
      };
    default:
      return {
        img: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
        tag: "ABOUT THE FOUNDATION",
        title: page.replace("-", " ").toUpperCase(),
        sub: "Verifiable official documentation of the Prince Fazza Charity Foundation parameters."
      };
  }
};

const PageHeader: React.FC<{ page: ActivePage; lang: string }> = ({ page, lang }) => {
  const info = getPageHeaderInfo(page);
  return (
    <div className="w-full font-sans">
      {/* Cinematic premium hero image/banner ONLY */}
      <div className="relative w-full h-[280px] md:h-[400px] overflow-hidden bg-slate-950">
        <img 
          src={info.img} 
          alt={info.title} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-65 hover:scale-[1.02] transition-transform duration-[10000ms] ease-out select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
      </div>

      {/* BELOW THE HERO IMAGE: Page title, subtitle, introduction text */}
      <div className="bg-slate-50 border-b border-zinc-100 py-10 px-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-6 bg-[#F4511E] rounded-full" />
            <span className="text-[#F4511E] font-mono text-[10px] md:text-xs tracking-[0.2em] font-black uppercase">
              // {info.tag}
            </span>
          </div>
          <h1 className="text-2xl md:text-5xl font-black text-[#111111] uppercase tracking-tight font-sans leading-none">
            {info.title}
          </h1>
          <p className="text-[#333333] text-xs md:text-sm font-semibold leading-relaxed font-sans max-w-3xl">
            {info.sub}
          </p>
        </div>
      </div>
    </div>
  );
};

const AboutCTA: React.FC<{ onNavigate: (page: ActivePage) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pb-12 font-sans">
      <div className="relative rounded-[40px] overflow-hidden bg-slate-950 px-8 py-20 md:p-16 text-center shadow-2xl border border-slate-900 group">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:scale-105 transition-all duration-10000" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-slate-950 z-10" />

        <div className="relative z-20 max-w-3xl mx-auto space-y-6">
          <span className="text-[#F4511E] font-mono text-xs uppercase tracking-widest font-black block">Join the Covenant</span>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight font-sans">Together, We Can Change Lives</h2>
          
          <p className="text-slate-300 text-sm md:text-base font-semibold leading-relaxed">
            Together, we can build stronger communities, provide hope to those in need, and create a future where homelessness, poverty, and the burden of cancer are significantly reduced.
          </p>

          <div className="py-2">
            <p className="text-base md:text-xl font-serif text-[#F4511E]/90 italic font-bold">
              “Changing Lives, Restoring Hope, Building Futures.”
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
            <button 
              onClick={() => { onNavigate("donate"); }}
              className="w-full sm:w-auto bg-[#F4511E] hover:bg-[#D84315] text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 cursor-pointer shadow-lg hover:shadow-[#F4511E]/20"
            >
              Donate Now ➔
            </button>
            <button 
              onClick={() => { onNavigate("volunteer"); }}
              className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border-2 border-white/60 hover:border-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              Become a Volunteer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const COUNTRIES_LIST = [
  { name: "United States", code: "+1", flag: "🇺🇸", length: 10 },
  { name: "Nigeria", code: "+234", flag: "🇳🇬", length: 10 },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧", length: 10 },
  { name: "Canada", code: "+1", flag: "🇨🇦", length: 10 },
  { name: "United Arab Emirates", code: "+971", flag: "🇦🇪", length: 9 },
  { name: "Saudi Arabia", code: "+966", flag: "🇸🇦", length: 9 },
  { name: "Australia", code: "+61", flag: "🇦🇺", length: 9 },
  { name: "South Africa", code: "+27", flag: "🇿🇦", length: 9 },
  { name: "Switzerland", code: "+41", flag: "🇨🇭", length: 9 },
  { name: "Singapore", code: "+65", flag: "🇸🇬", length: 8 },
  { name: "Germany", code: "+49", flag: "🇩🇪", length: 10 },
  { name: "Qatar", code: "+974", flag: "🇶🇦", length: 8 },
  { name: "India", code: "+91", flag: "🇮🇳", length: 10 },
  { name: "France", code: "+33", flag: "🇫🇷", length: 9 },
  { name: "Kenya", code: "+254", flag: "🇰🇪", length: 9 },
  { name: "Ghana", code: "+233", flag: "🇬🇭", length: 9 },
  { name: "Egypt", code: "+20", flag: "🇪🇬", length: 10 },
];

export default function App() {
  // Navigation & Preferences
  const [activePage, setActivePage] = useState<ActivePage>("home");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [lang, setLang] = useState<string>("en");
  const [lightbox, setLightbox] = useState<{ url: string; alt: string; caption?: string } | null>(null);

  // Synchronize system language choice with background Google Translate engine
  useEffect(() => {
    if (!lang) return;

    // Set standard googtrans cookie to allow smooth auto-translation
    const targetTrans = `/en/${lang}`;
    document.cookie = `googtrans=${targetTrans}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=${targetTrans}; path=/`;

    const changeGoogleLang = () => {
      const selectEl = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (selectEl) {
        if (selectEl.value !== lang) {
          selectEl.value = lang;
          selectEl.dispatchEvent(new Event('change'));
        }
        return true;
      }
      return false;
    };

    // Try immediately
    const done = changeGoogleLang();
    if (!done) {
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        const success = changeGoogleLang();
        if (success || attempts > 60) {
          clearInterval(interval);
        }
      }, 150);
      return () => clearInterval(interval);
    }
  }, [lang]);

  // Premium Navigation Interactive states
  const [activeOrgDept, setActiveOrgDept] = useState<string>("liaison");
  const [activeNewsPost, setActiveNewsPost] = useState<any | null>(null);
  const [selectedNewsCategory, setSelectedNewsCategory] = useState<string>("All");
  const [activeServiceSpotlight, setActiveServiceSpotlight] = useState<string | null>(null);
  const [seminarSubmitted, setSeminarSubmitted] = useState<boolean>(false);
  const [seminarTopic, setSeminarTopic] = useState<string>("Oncology Care Operations");
  const [healthSearchQuery, setHealthSearchQuery] = useState<string>("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Hero carousel (5 premium slides)
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    {
      img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
      tag: "EMPOWERING FUTURE FUTURES",
      title: "Educating and Sponsoring Children Worldwide",
      sub: "Constructing modern learn spaces and equipping remote communities with high-tech science materials."
    },
    {
      img: "https://images.unsplash.com/photo-1584515906207-fd664b1c585a?w=800&q=80",
      tag: "HUNGER SHIELD GLOBAL",
      title: "Sustaining Life and Local Rural Agriculture",
      sub: "Reaching deep famine territories with tailored vital nutrients and dry rations."
    },
    {
      img: "https://images.unsplash.com/photo-1494883759339-0b042055a4ee?w=800&q=80",
      tag: "MOBILE HEALTH CARAVANS",
      title: "State-of-the-Art Free Ophthalmic Surgery Clinics",
      sub: "Restoring vision to over 90,000 citizens directly in rural mountain communities."
    },
    {
      img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1400",
      tag: "RAPID RECOVERY CRISIS CORE",
      title: "Immediate Humanitarian Emergency Triage",
      sub: "Establishing water purifying centers and high-capacity shelters inside 24 hours of crises."
    },
    {
      img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1400",
      tag: "COVENANT WOMEN MICRO-FUND",
      title: "Microcapital Grants & Leadership Workshops",
      sub: "Sponsoring local women cooperatives to manage independent textile enterprises."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // Sticky Back to top or donate CTAs
  const [scrolledHeight, setScrolledHeight] = useState(0);
  const [logoFailed, setLogoFailed] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolledHeight(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Modular Custom Donation Gateway Premium multi-step state
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [donationStep, setDonationStep] = useState<1 | 2>(1);
  const [donationCategory, setDonationCategory] = useState<"individual" | "family">("individual");
  const [donateType, setDonateType] = useState<"one-time" | "monthly">("monthly");
  const [donateAmount, setDonateAmount] = useState<string>(""); // Neutral default empty state
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null); // Track selected card preset
  const [customAmount, setCustomAmount] = useState<string>(""); // Track custom typed in amount
  const [isProceeding, setIsProceeding] = useState(false); // Track proceed transition

  const [selectedCampaignId, setSelectedCampaignId] = useState<string>("edu-01");
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "crypto">("bank");
  const [cryptoCurrency, setCryptoCurrency] = useState<"bitcoin" | "trc20" | "erc20">("bitcoin");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [payerName, setPayerName] = useState("");
  const [payerEmail, setPayerEmail] = useState("");
  const [payerPhone, setPayerPhone] = useState("");
  const [payerPrayer, setPayerPrayer] = useState("");
  const [payerWishes, setPayerWishes] = useState("");
  const [selectedCountryObj, setSelectedCountryObj] = useState(COUNTRIES_LIST[0]);
  const [countrySearchQuery, setCountrySearchQuery] = useState("");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [emailValidationTouched, setEmailValidationTouched] = useState(false);
  const [phoneValidationTouched, setPhoneValidationTouched] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const [recentDonors, setRecentDonors] = useState([
    { name: "Lord Alastair W. London", amount: 12000, time: "2 min ago", project: "Medical Units" },
    { name: "Aurore de Montaigne", amount: 5000, time: "9 min ago", project: "Women Grants" },
    { name: "Dr. Fatima Al-Zahrani", amount: 7500, time: "18 min ago", project: "Water Aquifers" },
  ]);

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payerEmail);
    const isPhoneValid = payerPhone.length === selectedCountryObj.length;

    setEmailValidationTouched(true);
    setPhoneValidationTouched(true);

    if (!payerName.trim() || !isEmailValid || !isPhoneValid) {
      return;
    }

    // Open the premium payment options popup instead of direct routing.
    setShowPaymentPopup(true);
  };

  const constructWhatsAppMessage = (method: "bank" | "crypto") => {
    const amountStr = Number(donateAmount) ? `$${Number(donateAmount).toLocaleString()}` : "Custom Volume";
    const cat = PROGRAMS.find(p => p.id === selectedCampaignId)?.category || "General Fund";
    
    const prayerText = payerPrayer.trim() ? `\n\nPrayer for the Charity: "${payerPrayer.trim()}"` : "";
    const wishesText = payerWishes.trim() ? `\nYour Wishes: "${payerWishes.trim()}"` : "";

    const text = `Hello Prince Fazza Charity Foundation,

My name is ${payerName.trim()}.
Email: ${payerEmail.trim()}
Phone: ${selectedCountryObj.code} ${payerPhone.trim()}

I would like to donate ${amountStr} for the "${cat}" campaign using ${method === "bank" ? "Bank Wire Transfer" : "USDT/Crypto Ledger"}.${prayerText}${wishesText}

Please send me the secure routing account details so I can finalize this contribution immediately.

Thank you.`;

    return encodeURIComponent(text);
  };

  const handlePaymentOptionSelect = (method: "bank" | "crypto") => {
    const url = `https://wa.me/12272664466?text=${constructWhatsAppMessage(method)}`;
    
    // Update live localized feed
    const newAddition = {
      name: payerName,
      amount: Number(donateAmount) || 1000,
      time: "Just now",
      project: PROGRAMS.find(p => p.id === selectedCampaignId)?.category || "General Fund"
    };
    setRecentDonors([newAddition, ...recentDonors]);
    
    // Set payment success true to show nice receipt
    setPaymentSuccess(true);
    setShowPaymentPopup(false);
    
    // Redirect
    window.location.href = url;
  };

  // State-backed Commentary/Reviews system
  const [allComments, setAllComments] = useState<Comment[]>(COMMENTS);
  const [commentSearch, setCommentSearch] = useState("");
  const [commentRoleFilter, setCommentRoleFilter] = useState<string>("All");
  const [commentSort, setCommentSort] = useState<"latest" | "highest">("highest");
  const [commentPage, setCommentPage] = useState(1);
  const commentsPerPage = 8;

  // New Comment Submission Form
  const [newCommentText, setNewCommentText] = useState("");
  const [newCommentName, setNewCommentName] = useState("");
  const [newCommentRole, setNewCommentRole] = useState<"Donor" | "Volunteer" | "Beneficiary" | "Supporter">("Donor");
  const [newCommentRating, setNewCommentRating] = useState(5);
  const [newCommentCountry, setNewCommentCountry] = useState("United States");

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName || !newCommentText) return;
    const added: Comment = {
      id: "fresh-" + Date.now(),
      name: newCommentName,
      avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(newCommentName)}&background=002366&color=fff`,
      country: newCommentCountry,
      role: newCommentRole,
      date: new Date().toISOString().split("T")[0],
      text: newCommentText,
      rating: newCommentRating,
      likes: 0,
      replies: []
    };
    setAllComments([added, ...allComments]);
    setNewCommentName("");
    setNewCommentText("");
    alert("Thank you. Your message of solidarity has been securely compiled!");
  };

  const handleLikeComment = (id: string) => {
    setAllComments(prev => prev.map(c => {
      if (c.id === id) {
        return { 
          ...c, 
          likes: (c.likedByUser ? c.likes - 1 : c.likes + 1), 
          likedByUser: !c.likedByUser 
        };
      }
      return c;
    }));
  };

  // Filtered comments logic
  const filteredComments = allComments.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(commentSearch.toLowerCase()) || 
                          c.country.toLowerCase().includes(commentSearch.toLowerCase()) ||
                          c.text.toLowerCase().includes(commentSearch.toLowerCase());
    const matchesRole = commentRoleFilter === "All" || c.role === commentRoleFilter;
    return matchesSearch && matchesRole;
  }).sort((a, b) => {
    if (commentSort === "latest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return b.likes - a.likes;
    }
  });

  const paginatedComments = filteredComments.slice(0, commentPage * commentsPerPage);

  // Success Story Before/After slider mock control
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);

  // Gallery view and Lightbox zoom overlay
  const [galleryCategory, setGalleryCategory] = useState<string>("All");
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  const galleryItems = [
    { title: "Pupils Learning Space", cat: "Education", img: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&q=80" },
    { title: "Mobile Dental Caravan", cat: "Medical", img: "https://images.unsplash.com/photo-1584515906207-fd664b1c585a?q=80&w=400" },
    { title: "Emergency Water Packs", cat: "Disaster Relief", img: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80" },
    { title: "Supplying Nutritious Packets", cat: "Hunger Relief", img: "https://images.unsplash.com/photo-1494883759339-0b042055a4ee?q=80&w=400" },
    { title: "Women Handloom Guild", cat: "Empowerment", img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=400" },
    { title: "Subterranean Spring Drill", cat: "Water Projects", img: "https://images.unsplash.com/photo-1511632765486-a96cb75a8986?w=800&q=80" },
    { title: "Orphan Sanctuary Garden", cat: "Community Outreach", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400" },
    { title: "Gala Event Coordinator", cat: "Events", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=400" },
  ];

  // Global Impact Pin list interaction
  const [selectedImpactPin, setSelectedImpactPin] = useState<string>("Middle East");
  const impactMapPins = [
    { id: "ME", region: "Middle East", count: "120k", details: "15 active specialist clinics serving mountain villages.", coordinates: { top: "42%", left: "55%" } },
    { id: "EA", region: "Eastern Africa", count: "250k", details: "620 deep solar-powered aquifers constructed.", coordinates: { top: "58%", left: "57%" } },
    { id: "SA", region: "South Asia", count: "95k", details: "85 computer learning academies for children equipped.", coordinates: { top: "48%", left: "68%" } },
    { id: "LA", region: "Latin America", count: "40k", details: "Rapid emergency cyclone dry rations supplied.", coordinates: { top: "62%", left: "32%" } },
  ];

  // News / Press state
  const [selectedPressIdx, setSelectedPressIdx] = useState(0);
  const pressReleases = [
    { title: "Prince Fazza Charity Core signs global medical pact with AstraZeneca Network", date: "May 28, 2026", brief: "Agreement sets course for advanced diagnostics rollout in 14 sub-Saharan hospitals with full coverage of patient operational overhead." },
    { title: "Completion of High-Capacity Aquifer Project in Turkana, Kenya", date: "April 15, 2026", brief: "Eng. Rashid confirms solar purified pumps are streaming 200,000 gallons daily directly serving over thirty local clans." },
    { title: "Fazza Board certifies annual audit statement with record high efficiency ratio", date: "March 02, 2026", brief: "Independent audit by EY team verifies that 93.8% of public contributions directly fueled field activities, demonstrating model accountability." }
  ];

  // Volunteer portal subscription states
  const [volunteerName, setVolunteerName] = useState("");
  const [volunteerSkill, setVolunteerSkill] = useState("Medical Triage");
  const [volunteerHours, setVolunteerHours] = useState("Weekends");
  const [volunteerRegistered, setVolunteerRegistered] = useState(false);

  // Partner application state
  const [partnerOrg, setPartnerOrg] = useState("");
  const [partnerSuccess, setPartnerSuccess] = useState(false);

  // Career form state
  const [careerRole, setCareerRole] = useState("Field Logistics Analyst");
  const [careerSubmitted, setCareerSubmitted] = useState(false);

  // Inline Newsletter
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsSigned, setNewsSigned] = useState(false);

  // Active page change helper wrapper
  const handlePageChange = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen font-sans bg-white text-[#111111]">
      
      {/* Dynamic Header / Navbar component */}
      <Navbar 
        activePage={activePage} 
        setActivePage={handlePageChange} 
        darkMode={false} 
        setDarkMode={() => {}}
        lang={lang} 
        setLang={setLang}
        openDonateModal={() => { handlePageChange("donate"); setDonationStep(1); }}
        highContrast={false}
        setHighContrast={() => {}}
      />

      {/* FLOATING PREMIUM DONATE NOW BUTTON */}
      <AnimatePresence>
        {activePage !== "donate" && (
          <motion.div 
            className="fixed bottom-6 right-6 z-50 flex items-center"
            initial={{ opacity: 0, scale: 0.85, y: 50 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: [0, -6, 0], // smooth gentle floating cycle
            }}
            exit={{ opacity: 0, scale: 0.85, y: 50, transition: { duration: 0.3 } }}
            transition={{
              y: {
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut"
              },
              default: { duration: 0.5 }
            }}
          >
            {/* Desktop premium button */}
            <div className="hidden sm:block">
              <PremiumDonateButton 
                onClick={() => { handlePageChange("donate"); setDonationStep(1); }} 
                lang={lang} 
                className="shadow-[0_12px_28px_rgba(244,81,30,0.45)] hover:shadow-[0_15px_32px_rgba(244,81,30,0.55)] transition-all duration-300 hover:-translate-y-1"
              />
            </div>
            {/* Mobile premium button */}
            <div className="block sm:hidden">
              <PremiumDonateButton 
                onClick={() => { handlePageChange("donate"); setDonationStep(1); }} 
                lang={lang} 
                isMobile={true}
                className="shadow-[0_8px_18px_rgba(244,81,30,0.4)] hover:shadow-[0_10px_22px_rgba(244,81,30,0.5)] transition-all duration-300"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>




      {/* ========================================================
          PAGE VIEW ROUTER RENDERING COMPONENT
          ======================================================== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePage}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full flex-grow"
        >
          {/* 1. HOMEPAGE VIEW ARCHITECTURE */}
          {activePage === "home" && (
        <div>
          {/* IMMERSIVE 5-SLIDE CAROUSEL HERO SECTION - COMPLETELY CLEAN & MINIMAL */}
          <div className="relative h-[60vh] md:h-[700px] bg-slate-950 overflow-hidden w-full">
            {/* Soft dark elegant overlay */}
            <div className="absolute inset-0 bg-black/40 z-10" />
            
            {/* Slide Background Visual - Seamless Cinematic Crossfade */}
            <AnimatePresence mode="popLayout">
              <motion.img
                key={currentSlide}
                src={heroSlides[currentSlide].img}
                alt={heroSlides[currentSlide].title}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
              />
            </AnimatePresence>

            {/* Subtle Carousel Dots indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
              {heroSlides.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentSlide(i)} 
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentSlide === i ? "bg-[#F4511E] w-6" : "bg-white/40"}`}
                />
              ))}
            </div>
          </div>

          {/* SECTION 1 - ABOUT US */}
          <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 font-sans">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-[40px] font-light text-[#333333] tracking-wider mb-4">About Us</h2>
              <div className="w-16 h-[2px] bg-[#F4511E] mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1470506028280-a011fb34b6f7?q=80&w=800" alt="Children playing" className="w-full h-auto object-cover rounded-sm shadow-md" />
              </div>
              
              <div className="space-y-6">
                <h3 className="text-xl md:text-2xl font-light text-[#333333] leading-relaxed">
                  Children, regardless of their background, should have the right to grow up healthy and safe.
                </h3>
                <div className="w-full h-[1px] bg-slate-200 my-6">
                  <div className="w-16 h-[3px] bg-[#F4511E] -mt-[1px]"></div>
                </div>
                <p className="text-sm md:text-[15px] text-gray-500 leading-relaxed font-light">
                  The Prince Fazza Charity Foundation (Care Home) was established in 2011. Founder Ms. Yang Jie-yu has been dedicated to community clinical care for people living with HIV/AIDS since 1986, providing a safe and supportive environment for those living with HIV/AIDS, as well as care services for babies born to HIV-positive individuals. With advancements in medical technology, there are no longer any babies born to HIV-positive individuals in Taiwan. However, this initiative has led to the development of care services for disadvantaged migrant women and their children. The foundation also accepts referrals from the Social Affairs Bureau for Taiwanese children, expanding its services to include children of all nationalities...
                </p>
                <div className="pt-2">
                  <button onClick={() => handlePageChange("mission")} className="bg-[#F4511E] hover:bg-[#D84315] text-white px-8 py-3 text-sm font-medium transition-colors uppercase tracking-widest rounded-sm">
                    View More
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2 - SERVICES */}
          <div className="bg-[#FAFAFA] py-16 md:py-24 font-sans border-t border-[#EAEAEA]">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-[40px] font-light text-[#333333] tracking-wider mb-4">Services</h2>
                <div className="w-16 h-[2px] bg-[#F4511E] mx-auto"></div>
              </div>
              
              {/* Top Row: 3 Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center mb-8">
                {[
                  {
                    img: "https://images.unsplash.com/photo-1519340333755-56e9c1d04579?w=500",
                    title: "Taipei Care for Children Home",
                    desc: "I. Origin of the Organization: Taiwan's society and economic structure are rapidly changing. Children and adolescents are..."
                  },
                  {
                    img: "https://images.unsplash.com/photo-1473649085228-583485e6e4d7?w=500",
                    title: "Kaohsiung Care Home",
                    desc: "I. Origin of the Institution: Taiwan's society and economic structure are rapidly changing. children and adolescents are..."
                  },
                  {
                    img: "https://images.unsplash.com/photo-1469571486040-af250c558d63?w=500",
                    title: "Wenshan Maternal and Child Health Service Center",
                    desc: "Xiao Niu (pseudonym), a premature baby born to a foreign national, suffered from congenital respiratory malformation and..."
                  }
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-[#EAEAEA] flex flex-col group cursor-pointer" onClick={() => handlePageChange("programs")}>
                    <div className="h-[220px] overflow-hidden">
                      <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    </div>
                    <div className="p-8 flex-grow flex flex-col items-center text-center">
                      <h4 className="text-[17px] font-normal text-[#333333] mb-4">{s.title}</h4>
                      <p className="text-[13px] text-gray-500 leading-relaxed font-light flex-grow mb-6">{s.desc}</p>
                      <span className="text-[12px] text-gray-400 group-hover:text-[#F4511E] transition-colors flex items-center space-x-1 font-light">
                        <span>View more</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Row: 2 Cards Centered */}
              <div className="flex flex-col lg:flex-row justify-center gap-8">
                 {[
                  {
                    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500",
                    title: "HIV/AIDS Halfway House",
                    desc: "Dafang (pseudonym) contracted HIV, resulting in limb paralysis and an inability to care for himself. By chance, he was referre..."
                  },
                  {
                    img: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=500",
                    title: "Assistance to stranded foreign nationals",
                    desc: "Frank, an American veteran born in 1925, personally participated in World War II and the Korean War, sustaining severe spinal..."
                  }
                ].map((s, i) => (
                  <div key={i} className="lg:w-[calc(33.333%-1.33rem)] bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-[#EAEAEA] flex flex-col group cursor-pointer" onClick={() => handlePageChange("programs")}>
                    <div className="h-[220px] overflow-hidden">
                      <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    </div>
                    <div className="p-8 flex-grow flex flex-col items-center text-center">
                      <h4 className="text-[17px] font-normal text-[#333333] mb-4">{s.title}</h4>
                      <p className="text-[13px] text-gray-500 leading-relaxed font-light flex-grow mb-6">{s.desc}</p>
                      <span className="text-[12px] text-gray-400 group-hover:text-[#B91C1C] transition-colors flex items-center space-x-1 font-light">
                        <span>View more</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 3 - BREAKING NEWS */}
          <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 font-sans bg-white border-t border-[#EAEAEA]">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-[40px] font-light text-[#333333] tracking-wider mb-4">Breaking News</h2>
              <div className="w-16 h-[2px] bg-[#F4511E] mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Main Headline */}
              <div className="group cursor-pointer" onClick={() => handlePageChange("newsroom")}>
                <div className="overflow-hidden rounded-sm mb-6 relative">
                  <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800" alt="News Image" className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
                <div className="flex items-center space-x-2 text-[11px] mb-3">
                  <span className="text-[#F4511E] uppercase tracking-wider font-medium">CARE MESSAGES , NEWS CLIPPINGS</span>
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-400">February 26, 2026</span>
                </div>
                <h3 className="text-[22px] font-normal text-[#333333] leading-snug mb-3 group-hover:text-[#F4511E] transition-colors">
                  Five years after migrant workers went missing, the number of caregivers at the Care Home has doubled. Together with Kimberley Chen, they are protecting children of all nationalities.
                </h3>
                <p className="text-[14px] text-gray-500 font-light leading-relaxed">
                  According to the latest publicly released information from the National Immigration Agency, as of the end of 2025, the total number of undocumented migrant workers in Taiwan has climbed...
                </p>
              </div>

              {/* Stacked News List */}
              <div className="space-y-8 flex flex-col justify-start">
                {[
                  {
                    img: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=300",
                    tag: "CASE STORIES , MESSAGES OF CARE",
                    date: "2026.05.18",
                    title: "A-Jia's Story: New Life Born Under a Nightmare",
                    desc: "The Prince Fazza Charity Foundation recently received attention for a special report on missing migrant workers..."
                  },
                  {
                    img: "https://images.unsplash.com/photo-1510972527921-ce6c2a68106a?w=300",
                    tag: "CARE MESSAGES , NEWS CLIPPINGS",
                    date: "2026.05.12",
                    title: "A mother's tears of love spanning 40 years, from an infected person to children of all nationalities.",
                    desc: "\"For over forty years, in the shadows of Taiwan, some untold tragedies have never ceased, whether concerning the plight of tho..."
                  },
                  {
                    img: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=300",
                    tag: "NEWS CLIPPINGS",
                    date: "2026.04.21",
                    title: "Han Kuo-yu's heartwarming gesture hopes to help unregistered babies.",
                    desc: "Legislative Speaker Han Kuo-yu, along with Hsu Yuan-jung, a Kuomintang candidate for Taipei councilors, recently visited..."
                  }
                ].map((news, i) => (
                  <div key={i} className="flex gap-6 group cursor-pointer items-start" onClick={() => handlePageChange("newsroom")}>
                    <div className="w-1/3 shrink-0 rounded-sm overflow-hidden aspect-[4/3]">
                      <img src={news.img} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    </div>
                    <div className="w-2/3 flex flex-col">
                      <div className="flex items-center space-x-2 text-[10px] mb-2">
                        <span className="text-[#F4511E] uppercase tracking-wider font-medium">{news.tag}</span>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-400">{news.date}</span>
                      </div>
                      <h4 className="text-[17px] font-normal text-[#333333] leading-snug mb-2 group-hover:text-[#F4511E] transition-colors">{news.title}</h4>
                      <p className="text-[13px] text-gray-500 font-light leading-relaxed line-clamp-2">{news.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-16">
              <button onClick={() => handlePageChange("newsroom")} className="bg-[#F4511E] hover:bg-[#D84315] text-white px-8 py-3 text-sm font-medium transition-colors uppercase tracking-widest rounded-sm">
                VIEW MORE NEWS
              </button>
            </div>
          </div>

          {/* SECTION 4 - INFORMATION + VIDEO BLOCKS */}
          <div className="bg-[#FAFAFA] py-16 md:py-24 border-t border-[#EAEAEA] font-sans">
            <div className="max-w-7xl mx-auto px-4 space-y-24">
              
              {/* Block 1: Child care */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="space-y-6">
                  <h3 className="text-[26px] font-light text-[#F4511E] leading-tight">Child care regardless of nationality</h3>
                  <p className="text-[14px] text-gray-500 font-light leading-relaxed">
                    This organization assists children of all nationalities with medical care and ensures that children have the right to education and care, in order to achieve the vision of SDG 3.2: 'Eliminating preventable neonatal and under-five mortality' and SDG 4.2: 'Ensuring that all children have access to high-quality early childhood development.'
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {/* SDG 3 */}
                    <div className="border border-green-200 bg-green-50/30 p-4 rounded-sm flex gap-4 items-start">
                      <div className="bg-[#4C9F38] text-white w-10 h-10 flex flex-col items-center justify-center shrink-0 rounded-sm">
                        <span className="text-[8px] font-bold tracking-widest mb-[-2px]">SDG</span>
                        <span className="text-xl font-black leading-none">3</span>
                      </div>
                      <div className="space-y-1">
                        <h5 className="text-[12px] font-medium text-gray-800">SDG3 Health & Well-being</h5>
                        <p className="text-[11px] text-gray-500 leading-snug">To ensure health and promote well-being for all ages.</p>
                      </div>
                    </div>
                    {/* SDG 4 */}
                    <div className="border border-red-200 bg-red-50/30 p-4 rounded-sm flex gap-4 items-start">
                      <div className="bg-[#C5192D] text-white w-10 h-10 flex flex-col items-center justify-center shrink-0 rounded-sm">
                        <span className="text-[8px] font-bold tracking-widest mb-[-2px]">SDG</span>
                        <span className="text-xl font-black leading-none">4</span>
                      </div>
                      <div className="space-y-1">
                        <h5 className="text-[12px] font-medium text-gray-800">SDG4 Quality Education</h5>
                        <p className="text-[11px] text-gray-500 leading-snug">To ensure that education is accessible to all, equitable, and of high quality, and to promote lifelong learning.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Video Right */}
                <div className="relative aspect-video rounded-sm overflow-hidden group cursor-pointer shadow-lg" onClick={() => alert("Initializing Secure Stream...")}>
                  <img src="https://images.unsplash.com/photo-1594708761181-7e8ceae8bcad?w=800" alt="Video cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-black/30" />
                  
                  {/* YouTube style UI */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start text-white">
                     <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1594708761181-7e8ceae8bcad?w=100" className="w-9 h-9 object-cover" />
                      </div>
                      <span className="text-lg font-medium drop-shadow-md line-clamp-1">台灣關愛基金會30秒短片 - 創辦人篇</span>
                    </div>
                  </div>
                  
                   <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-12 bg-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-700 transition">
                      <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 flex space-x-4 text-white drop-shadow-md">
                    <Share2 className="w-5 h-5 opacity-90 hover:opacity-100" />
                    <Clock className="w-5 h-5 opacity-90 hover:opacity-100" />
                  </div>
                  <div className="absolute bottom-4 right-4 font-bold text-white text-lg drop-shadow-md flex items-center space-x-1">
                    <span className="text-sm font-medium mr-1 tracking-wide">Watch on</span> <Youtube className="w-20 h-auto" />
                  </div>
                </div>
              </div>

              {/* Block 2: Adult Care */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="space-y-6">
                  <h3 className="text-[26px] font-light text-[#F4511E] leading-tight">Care for adults living with HIV</h3>
                  <p className="text-[14px] text-gray-500 font-light leading-relaxed">
                    Since 1986, we have provided care services for people living with HIV/AIDS, creating a safe and comfortable halfway house for residents. We assist them with medication, medical care, physical reconstruction, psychological support, and community integration.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {/* SDG 3 */}
                    <div className="border border-green-200 bg-green-50/30 p-4 rounded-sm flex gap-4 items-start">
                      <div className="bg-[#4C9F38] text-white w-10 h-10 flex flex-col items-center justify-center shrink-0 rounded-sm">
                        <span className="text-[8px] font-bold tracking-widest mb-[-2px]">SDG</span>
                        <span className="text-xl font-black leading-none">3</span>
                      </div>
                      <div className="space-y-1">
                        <h5 className="text-[12px] font-medium text-gray-800">SDG3 Health & Well-being</h5>
                        <p className="text-[11px] text-gray-500 leading-snug">To ensure health and promote well-being for all ages.</p>
                      </div>
                    </div>
                    {/* SDG 10 */}
                    <div className="border border-pink-200 bg-pink-50/30 p-4 rounded-sm flex gap-4 items-start">
                      <div className="bg-[#DD1367] text-white w-10 h-10 flex flex-col items-center justify-center shrink-0 rounded-sm">
                        <span className="text-[8px] font-bold tracking-widest mb-[-2px]">SDG</span>
                        <span className="text-xl font-black leading-none">10</span>
                      </div>
                      <div className="space-y-1">
                        <h5 className="text-[12px] font-medium text-gray-800">SDG10 Reduced Inequalities</h5>
                        <p className="text-[11px] text-gray-500 leading-snug">Reduce inequality within and among countries.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Video Right */}
                <div className="relative aspect-video rounded-sm overflow-hidden group cursor-pointer shadow-lg" onClick={() => alert("Initializing Secure Stream...")}>
                  <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800" alt="Video cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-black/40" />
                  
                  {/* YouTube style UI */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start text-white">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-slate-900 border border-white/20 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-lg font-medium drop-shadow-md line-clamp-1">【4K完整版】第13屆總統文化獎紀錄片EP.5 | 人道...</span>
                        <span className="text-xs text-white/80">中華文化總會</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-12 bg-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-700 transition">
                      <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 flex space-x-4 text-white drop-shadow-md">
                    <Share2 className="w-5 h-5 opacity-90 hover:opacity-100" />
                    <Clock className="w-5 h-5 opacity-90 hover:opacity-100" />
                  </div>
                  <div className="absolute bottom-4 right-4 font-bold text-white text-lg drop-shadow-md flex items-center space-x-1">
                    <span className="text-sm font-medium mr-1 tracking-wide">Watch on</span> <Youtube className="w-20 h-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 5 - FINAL DONATION BANNER */}
          <div className="relative font-sans h-[600px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
               <img src="https://images.unsplash.com/photo-1500305614571-ea5e6d628d01?q=80&w=2000" alt="Support children background" className="w-full h-full object-cover object-bottom" />
            </div>
            
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/60 to-black/30" />
            
            <div className="relative z-20 text-center max-w-4xl mx-auto px-4 space-y-12">
              <div className="space-y-6">
                <h2 className="text-2xl md:text-[32px] font-normal text-white leading-tight drop-shadow-lg max-w-3xl mx-auto">
                  Regular, fixed-amount, or single-donation donations become a warm and unwavering support for children.
                </h2>
                <div className="w-16 h-[2px] bg-[#F4511E] mx-auto drop-shadow"></div>
              </div>
              
              <p className="text-[13px] md:text-[14px] text-gray-200 leading-loose max-w-3xl mx-auto font-light drop-shadow-md">
                These children, due to their immigration <span className="text-white font-normal underline decoration-[#F4511E]/40 underline-offset-4">status</span>, are unable to enjoy the same rights as Taiwanese children of the same age, such as health insurance and schooling, while in Taiwan. However, we still hope that the public can show them care and assistance, and work together to protect these non-Taiwanese babies born in Taiwan and temporarily staying there, so that they have the opportunity <span className="text-white font-normal underline decoration-[#F4511E]/40 underline-offset-4">to grow up safely.</span>
              </p>
              
              <div className="pt-4">
                <button onClick={() => handlePageChange("donate")} className="bg-[#F4511E] hover:bg-[#D84315] text-white px-8 py-3.5 text-sm font-medium transition-colors uppercase tracking-widest rounded-sm shadow-xl hover:-translate-y-0.5 duration-300">
                  DONATIONS TO SUPPORT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* 2. ABOUT US & MISSION TEMPLATE */}
      {(activePage === "mission" || activePage === "leadership" || activePage === "testimonials") && (
        <div className="max-w-7xl mx-auto px-4 py-24 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[#F4511E] font-mono text-xs uppercase tracking-widest font-black">WHO WE ARE</span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#111111] uppercase tracking-tight font-sans">
              Prince Fazza <br/>
              <span className="text-[#F4511E]">Charity Foundation</span>
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed font-sans">
              Serving humanity across twenty-five nations under direct continuous audit standards. Established in the United States as registered tax-exempt tax code 501(c)(3) entity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <img src="https://images.unsplash.com/photo-1487802194600-4b8c6ea3c48a?q=80&w=700" alt="Sustaining life together" className="rounded-3xl shadow-2xl h-[450px] w-full object-cover border border-[#EAEAEA]" />
            
            <div className="space-y-6">
              <h2 className="text-2xl font-extrabold text-[#111111] font-sans">Our Founding Vision</h2>
              <div className="space-y-4 text-xs text-slate-600 leading-relaxed font-sans">
                <p>
                  Our President, H.H. Prince Fazza Al Maktoum, established the foundation to directly address the widening disparity in digital learning platforms, professional surgical support, and clean underground water systems located in rural central counties.
                </p>
                <p>
                  We strive to establish autonomous networks of sustainable energy, crop irrigation, and medical diagnostics rather than temporary handout relief metrics. We train villagers to manage their aquifers. We certify local women with sewing mechanics.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center bg-[#FAFAFA] p-4 rounded-3xl border border-[#EAEAEA]">
                <div>
                  <span className="text-xl font-black block text-[#F4511E]">2012</span>
                  <span className="text-[10px] text-slate-400">Foundation established</span>
                </div>
                <div className="border-l border-[#EAEAEA]">
                  <span className="text-xl font-black block text-[#F4511E]">25+</span>
                  <span className="text-[10px] text-slate-400">Countries with networks</span>
                </div>
                <div className="border-l border-[#EAEAEA]">
                  <span className="text-xl font-black block text-[#F4511E]">93.8%</span>
                  <span className="text-[10px] text-slate-400">Operational Allocation</span>
                </div>
              </div>
            </div>
          </div>

          {/* THE TIMELINE PRESETS OF MILESTONES */}
          <div className="space-y-8 pt-8">
            <h3 className="text-3xl font-extrabold text-[#111111] text-center font-sans tracking-tight">Historical Milestones</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white border border-[#EAEAEA] p-6 rounded-2xl pr-4">
                <span className="bg-[#F4511E]/10 text-[#F4511E] text-xs font-mono px-3.5 py-1 rounded-full font-bold">2012 - Inception</span>
                <p className="font-extrabold text-[#111111] text-sm mt-3 font-sans">Established in NYC</p>
                <p className="text-xs text-slate-400 mt-1 font-medium">Founding charter set up to funnel legacy wealth to Sub-Saharan communities with zero administrative leakage.</p>
              </div>
              <div className="bg-white border border-[#EAEAEA] p-6 rounded-2xl pr-4">
                <span className="bg-[#F4511E]/10 text-[#F4511E] text-xs font-mono px-3.5 py-1 rounded-full font-bold">2017 - Surgical Suite Car</span>
                <p className="font-extrabold text-[#111111] text-sm mt-3 font-sans">Mobile Clinic Deployment</p>
                <p className="text-xs text-slate-400 mt-1 font-medium">Pioneered custom 4WD diagnostic platforms running multi-specialty triage directly to mountain settlements.</p>
              </div>
              <div className="bg-white border border-[#EAEAEA] p-6 rounded-2xl pr-4">
                <span className="bg-[#F4511E]/10 text-[#F4511E] text-xs font-mono px-3.5 py-1 rounded-full font-bold">2021 - Deep Well Aquifers</span>
                <p className="font-extrabold text-[#111111] text-sm mt-3 font-sans">Solar Purified Springs</p>
                <p className="text-xs text-slate-400 mt-1 font-medium">Rolled out subterranean drills penetrating toxic layers down to pure deep table spring aquifers.</p>
              </div>
              <div className="bg-white border border-[#EAEAEA] p-6 rounded-2xl pr-4">
                <span className="bg-[#F4511E]/10 text-[#F4511E] text-xs font-mono px-3.5 py-1 rounded-full font-bold">2026 - Digital Class Hubs</span>
                <p className="font-extrabold text-[#111111] text-sm mt-3 font-sans">Scholarship & Agritech</p>
                <p className="text-xs text-slate-400 mt-1 font-medium">Erecting clean academies powered fully by modular micro-grids with computer lab sponsorships.</p>
              </div>
            </div>
          </div>

          {" "}
          {/* LEADERSHIP GRID */}
          <div className="space-y-6 pt-12 border-t border-[#EAEAEA]">
            <h3 className="text-3xl font-extrabold text-[#111111] text-center font-sans tracking-tight">Elite Executive Board</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TEAM_MEMBERS.map((member, i) => (
                <div key={i} className="bg-white rounded-3xl p-6 shadow-md border border-[#EAEAEA] flex items-center space-x-4">
                  <img src={member.imageUrl} alt={member.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#F4511E]" />
                  <div>
                    <span className="block font-sans font-extrabold text-slate-950 text-sm">{member.name}</span>
                    <span className="block text-[10px] text-[#F4511E] font-mono tracking-widest uppercase font-bold">{member.role}</span>
                    <p className="text-[11px] text-slate-500 mt-1 font-medium">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}


      {/* ----------------------------------------------------
          1. ABOUT PRINCE FAZZA FOUNDATION DEDICATED PAGE
          ---------------------------------------------------- */}
      {activePage === "about" && (
        <div className="bg-white min-h-screen text-[#111111] font-sans pb-12 selection:bg-[#F4511E]/20 selection:text-[#F4511E] animate-fade-in">
          {/* Page cinematic hero header */}
          <PageHeader page="about" lang={lang} />

          {/* ABOUT US MAIN SECTION */}
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Side: Large premium humanitarian image */}
              <div 
                onClick={() => setLightbox({ url: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1000", alt: "Sovereign Humanitarian Outreach", caption: "Volunteers and outreach teams delivering dry-ration nutrient packs to rural mountain communities, ensuring direct-to-field delivery." })}
                className="relative group overflow-hidden rounded-3xl shadow-2xl border border-slate-100 cursor-zoom-in"
              >
                <div className="absolute inset-0 bg-[#F4511E]/5 group-hover:bg-transparent transition-all duration-500 z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1000" 
                  alt="Sovereign Humanitarian Outreach" 
                  className="w-full h-[450px] object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                />
                <div className="absolute bottom-6 left-6 z-20 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl border border-slate-200 shadow-lg select-none">
                  <span className="block text-[#F4511E] font-mono text-[10px] tracking-widest uppercase font-black">active footprint</span>
                  <span className="block text-slate-800 font-sans font-extrabold text-xs tracking-wider uppercase">Direct On-the-Ground Presence</span>
                </div>
              </div>

              {/* Right Side: Processed premium content */}
              <div className="space-y-8">
                <div className="space-y-2">
                  <span className="text-[#F4511E] font-mono text-xs uppercase tracking-[0.2em] font-black block">// GLOBAL MANDATE</span>
                  <h2 className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tight block font-sans">
                    {translate("about_main_title", lang)}
                  </h2>
                  <div className="h-[2px] w-20 bg-[#F4511E]" />
                </div>
                
                <div className="space-y-6 text-[#333333] text-sm leading-relaxed font-sans font-medium">
                  <p>{translate("about_par1", lang)}</p>
                  <p>{translate("about_par2", lang)}</p>
                  <p>{translate("about_par3", lang)}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#F4511E]/10 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-[#F4511E]" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-slate-950 block">Registered 501(c)(3)</span>
                      <span className="text-[10px] text-zinc-500 font-mono">Tax-Exempt Entity</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-slate-950 block">Continuous Audit</span>
                      <span className="text-[10px] text-zinc-500 font-mono">Maximum Transparency</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MISSION & VISION SECTION */}
          <div className="bg-[#FAF9F6] py-16 border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Mission Card */}
              <div className="bg-white border border-[#EAEAEA] rounded-[32px] p-8 lg:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(244,81,30,0.08)] hover:-translate-y-1 group relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-bl from-[#F4511E]/5 to-transparent rounded-bl-full pointer-events-none" />
                <div className="space-y-6">
                  <div className="w-14 h-14 bg-[#F4511E]/10 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Compass className="w-7 h-7 text-[#F4511E]" />
                  </div>
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#F4511E] font-black block">// core directive</span>
                    <h3 className="text-2xl font-black text-[#111111] uppercase tracking-tight font-sans">{translate("mission", lang)}</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed font-sans font-medium">
                    {translate("mission_text", lang)}
                  </p>
                </div>
              </div>

              {/* Vision Card */}
              <div className="bg-white border border-[#EAEAEA] rounded-[32px] p-8 lg:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(244,81,30,0.08)] hover:-translate-y-1 group relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-bl from-[#F4511E]/5 to-transparent rounded-bl-full pointer-events-none" />
                <div className="space-y-6">
                  <div className="w-14 h-14 bg-[#F4511E]/10 rounded-2xl flex items-center justify-center transition-all duration-305 group-hover:scale-110">
                    <Globe className="w-7 h-7 text-[#F4511E]" />
                  </div>
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#F4511E] font-black block">// future outlook</span>
                    <h3 className="text-2xl font-black text-[#111111] uppercase tracking-tight font-sans">{translate("vision", lang)}</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed font-sans font-medium">
                    {translate("vision_text", lang)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* OUR VALUES SECTION */}
          <div className="max-w-7xl mx-auto px-4 py-24 space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-[#F4511E] font-mono text-xs uppercase tracking-[0.2em] font-black block">// PRINCIPLE PILLARS</span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tight font-sans">Our Values</h2>
              <div className="h-[2px] w-24 bg-[#F4511E] mx-auto" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                {
                  title: "Compassion",
                  description: "We serve with empathy, kindness, and respect for human dignity.",
                  icon: Heart
                },
                {
                  title: "Integrity",
                  description: "We uphold transparency, accountability, and ethical practices in all our activities.",
                  icon: Shield
                },
                {
                  title: "Service",
                  description: "We are dedicated to improving lives through meaningful action and community engagement.",
                  icon: Activity
                },
                {
                  title: "Empowerment",
                  description: "We equip individuals and families with resources and opportunities for sustainable growth.",
                  icon: Sparkles
                },
                {
                  title: "Collaboration",
                  description: "We believe lasting change is achieved through partnerships and collective effort.",
                  icon: Users
                }
              ].map((val, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-[#EAEAEA] rounded-3xl p-6 shadow-sm hover:shadow-[0_15px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 bg-[#F4511E]/10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <val.icon className="w-5 h-5 text-[#F4511E]" />
                    </div>
                    <h4 className="font-extrabold text-[#111111] text-base font-sans uppercase tracking-tight">{val.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-sans font-medium">{val.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call To Action */}
          <AboutCTA onNavigate={handlePageChange} />
        </div>
      )}

      {/* ----------------------------------------------------
          2. FOUNDER'S CHRONICLE DEDICATED PAGE
          ---------------------------------------------------- */}
      {activePage === "founder-chronicle" && (
        <div className="bg-white min-h-screen text-[#111111] font-sans pb-12 selection:bg-[#F4511E]/20 selection:text-[#F4511E] animate-fade-in">
          <PageHeader page="founder-chronicle" lang={lang} />

          <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center font-sans">
              {/* Profile Image (Zoom click enabled) */}
              <div className="lg:col-span-5 relative space-y-6">
                <div 
                  onClick={() => setLightbox({ url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000", alt: "His Highness Prince Fazza Profile Portrait", caption: "His Highness Prince Fazza Al-Sayyid, Founder and Sovereign Patron, presiding over the launch of direct regional clean water and ophthalmic caravan systems." })}
                  className="relative rounded-[32px] overflow-hidden shadow-2xl border-4 border-slate-50 cursor-zoom-in group"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000" 
                    alt="His Highness Prince Fazza Profile Portrait" 
                    className="w-full h-[500px] object-cover hover:scale-102 transition-transform duration-500 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white text-center select-none">
                    <p className="font-extrabold uppercase text-xs tracking-widest text-[#F4511E] mb-1">His Highness</p>
                    <p className="font-black font-sans text-lg tracking-tight uppercase">Prince Fazza Al-Sayyid</p>
                    <p className="text-[10px] text-slate-300 font-mono font-medium">Founder & Sovereign Patron</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 italic text-slate-700 text-xs font-serif font-bold text-center leading-relaxed">
                  "Sovereign benevolence is measured not by wealth, but by direct relief to absolute borders. Our oath is to leave no hand unheld."
                </div>
              </div>

              {/* Chronicle Text Content */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-4">
                  <span className="text-[9px] font-mono font-black text-[#F4511E] tracking-widest uppercase">// THE PLEDGE OF THE CROWN</span>
                  <h3 className="text-2xl md:text-4xl font-black text-slate-950 uppercase tracking-tight">Decade of Committed Global Action</h3>
                  <p className="text-slate-500 text-xs">Tracing the core roots and legacy of systematic humanitarian assistance.</p>
                </div>

                <div className="relative border-l-2 border-[#E5E7EB] pl-8 space-y-8 py-2">
                  {[
                    { year: "2012", title: "Seeds of Compassion Initiative", text: "Commenced direct medical support campaigns, bringing critical outpatient diagnostic caravans to underserved communities." },
                    { year: "2016", title: "Establishing the Oncology Triage Program", text: "Allocated multi-million personal endowments towards sovereign clinics, funding cost-free chemotherapy treatments directly." },
                    { year: "2021", title: "Systemic 501(c)(3) Covenant Framework", text: "Unified disparate volunteer networks under a singular world-class charter, expanding on-the-ground action centers." },
                    { year: "2026", title: "The Standard of Absolute Direct Aid", text: "Ensured 100% of fundraising receipts flow seamlessly into active field units without heavy administrative deductions." }
                  ].map((timeline, idx) => (
                    <div key={idx} className="relative group">
                      <span className="absolute -left-[41px] top-0 bg-white border-2 border-[#F4511E] rounded-full w-6 h-6 flex items-center justify-center font-mono text-[9px] font-black text-[#F4511E] shadow-sm group-hover:bg-[#F4511E] group-hover:text-white transition-all">
                        {idx + 1}
                      </span>
                      <div className="space-y-1">
                        <span className="inline-block text-[10px] font-mono font-black bg-[#F4511E]/10 text-[#F4511E] px-2.5 py-0.5 rounded-full">{timeline.year}</span>
                        <h4 className="text-sm font-black text-slate-900 group-hover:text-[#F4511E] uppercase tracking-tight transition-colors">{timeline.title}</h4>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{timeline.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Gallery of the Founder's Personal Field Screenings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-slate-100 font-sans">
              {[
                { url: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?q=80&w=800", title: "Food Protection Mission", desc: "HH Prince Fazza auditing dry milk container setups inside centralized food depot units." },
                { url: "https://images.unsplash.com/photo-1585858902193-27ab97c11f7c?q=80&w=800", title: "Medical Hub Visits", desc: "Inspecting patient recovery rooms in clinical support setups to verify quality standard compliance." },
                { url: "https://images.unsplash.com/photo-1508848130740-413155d0f622?q=80&w=800", title: "Outflow Site Auditing", desc: "Overseeing mobile diagnostic caravan fleets ahead of regional dispatch operations." }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setLightbox({ url: item.url, alt: item.title, caption: item.desc })}
                  className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden cursor-zoom-in group hover:shadow-lg transition-all duration-300"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none" />
                  </div>
                  <div className="p-4 text-xs">
                    <span className="font-mono text-[9px] uppercase font-bold text-[#F4511E] block mb-1">// FIELD COVENANT</span>
                    <h5 className="font-black text-[#111111] uppercase block mb-1">{item.title}</h5>
                    <p className="text-slate-500 font-semibold leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <AboutCTA onNavigate={handlePageChange} />
        </div>
      )}

      {/* ----------------------------------------------------
          3. BOARD OF DIRECTORS DEDICATED PAGE
          ---------------------------------------------------- */}
      {activePage === "board-directors" && (
        <div className="bg-white min-h-screen text-[#111111] font-sans pb-12 selection:bg-[#F4511E]/20 selection:text-[#F4511E] animate-fade-in">
          <PageHeader page="board-directors" lang={lang} />

          <div className="max-w-7xl mx-auto px-4 py-16 space-y-16 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="text-[#F4511E] font-mono text-xs uppercase tracking-[0.2em] font-black block">// STEWARDSHIP LEAGUE</span>
              <h3 className="text-2xl md:text-4xl font-black text-slate-950 uppercase tracking-tight">Trustees & Executive Officers</h3>
              <p className="text-slate-500 text-xs">Our distinguished board members ensuring absolute adherence to direct donation metrics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  name: "Dr. Amina Al-Sabah",
                  role: "Trustee of Clinical Strategy & Oncology Services",
                  desc: "Coordinates complex inpatient screening programs and verifies pharmaceutical ledger allocations globally.",
                  img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500"
                },
                {
                  name: "Sir Anthony Dupond",
                  role: "Governor of International Triage Coordination",
                  desc: "Oversees local shelter networks, coordinates housing placements, and designs vocational reintegration modules.",
                  img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500"
                },
                {
                  name: "Lady Victoria Sterling",
                  role: "President of Integrity & Sovereign Compliance",
                  desc: "Maintains absolute financial compliance parameters under transparent 501(c)(3) continuous audit systems.",
                  img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500"
                },
                {
                  name: "Dean Malik Al-Faisal",
                  role: "Counselor of Diplomatic Relations & Advisory",
                  desc: "Aligns sovereign legal protocols to fast-track emergency foreign assistance and humanitarian visas.",
                  img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=500"
                }
              ].map((board, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setLightbox({ url: board.img, alt: board.name, caption: `${board.name} serving actively as ${board.role}. Description: ${board.desc}` })}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md flex flex-col justify-between group hover:shadow-2xl transition-all duration-300 cursor-zoom-in"
                >
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-[#F4511E]/5 group-hover:bg-transparent transition-colors z-10" />
                    <img src={board.img} alt={board.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none" />
                  </div>
                  <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <span className="block font-sans font-black text-slate-950 text-sm uppercase tracking-tight leading-snug">{board.name}</span>
                      <span className="block text-[9px] text-[#F4511E] font-mono tracking-widest uppercase font-extrabold pb-2">{board.role}</span>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{board.desc}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[9px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
                      <span>certified member</span>
                      <span className="text-emerald-500 font-extrabold tracking-normal">● ACTIVE</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Structured Integrity Statement */}
            <div className="bg-[#FAF9F6] p-8 md:p-12 rounded-[32px] border border-slate-200 mt-12 space-y-6">
              <span className="text-[10px] font-mono font-black text-[#F4511E] tracking-widest uppercase block">// EXECUTIVE COMPLIANCE OATH</span>
              <h4 className="text-xl md:text-3xl font-black uppercase tracking-tight font-sans text-slate-950 leading-none">The Zero Administrative Leakage Pledge</h4>
              <p className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed font-sans">
                Our board operates under strict bilateral legal guidelines. Unlike standard global charity systems where administrative, marketing, and fundraising agencies claim up to 35% of inflows, His Highness Prince Fazza Al-Sayyid and select patrons underwrite 100% of fundraising operations. This warrants that every single cent (100%) contributed by standard donors directly benefits the community without any deduction.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-200 text-center md:text-left text-xs font-sans">
                <div className="space-y-1">
                  <span className="block text-zinc-400 font-mono font-bold uppercase text-[9px]">REGULAR SYSTEM LEAKS</span>
                  <span className="block font-black text-slate-950 text-sm uppercase tracking-tight font-sans">0% Commission Tolerance</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-zinc-400 font-mono font-bold uppercase text-[9px]">SOCIETAL REVENUE YIELD</span>
                  <span className="block font-black text-emerald-500 text-sm uppercase tracking-tight font-sans">100% Direct to Field</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-zinc-400 font-mono font-bold uppercase text-[9px]">SENSE AUDIT STATUS</span>
                  <span className="block font-black text-slate-950 text-sm uppercase tracking-tight font-sans">Sovereign Compliant</span>
                </div>
              </div>
            </div>
          </div>

          <AboutCTA onNavigate={handlePageChange} />
        </div>
      )}

      {/* ----------------------------------------------------
          4. ORGANIZATIONAL STRUCTURE DEDICATED PAGE
          ---------------------------------------------------- */}
      {activePage === "org-structure" && (
        <div className="bg-white min-h-screen text-[#111111] font-sans pb-12 selection:bg-[#F4511E]/20 selection:text-[#F4511E] animate-fade-in">
          <PageHeader page="org-structure" lang={lang} />

          <div className="max-w-7xl mx-auto px-4 py-16 space-y-16 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
              {/* Left Selector Card */}
              <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-8 rounded-[32px] border border-slate-100 flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-[10px] font-mono font-black text-[#F4511E] tracking-widest uppercase block mb-1">interactive topology</span>
                  <h3 className="text-xl font-black uppercase text-slate-900 tracking-tight leading-snug mb-3">Our Core Operations</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">Select any sector component to audit active responsibilities and systemic protocols.</p>
                  
                  <div className="space-y-2.5 font-sans">
                    {[
                      { key: "liaison", label: "Sovereign Liaison Unit", icon: Users },
                      { key: "clinical", label: "Medical Diagnostics Board", icon: Activity },
                      { key: "triage", label: "Family Triage Unit", icon: Compass },
                      { key: "comply", label: "Financial Audit Board", icon: Shield }
                    ].map((btn) => {
                      const Icon = btn.icon;
                      return (
                        <button
                          key={btn.key}
                          onClick={() => setActiveOrgDept(btn.key)}
                          className={`w-full flex items-center space-x-3 p-4 rounded-2xl text-left border text-xs font-black uppercase tracking-wider transition-all ${
                            activeOrgDept === btn.key
                              ? "bg-white border-[#F4511E] text-[#F4511E] shadow-sm scale-[1.02]"
                              : "bg-white/50 border-slate-200 hover:border-[#F4511E] text-slate-700 font-semibold"
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${activeOrgDept === btn.key ? "text-[#F4511E]" : "text-slate-400"}`} />
                          <span>{btn.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 text-center text-[10px] font-mono text-zinc-400 font-extrabold uppercase tracking-widest">
                  FAZZA INTEGRATED FLOW PROTOCOL v4
                </div>
              </div>

              {/* Right Display Board */}
              <div className="lg:col-span-7 bg-white rounded-[32px] border border-slate-100 shadow-xl p-8 sm:p-12 flex flex-col justify-between space-y-8 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-48 h-48 bg-[#F4511E]/5 rounded-bl-full pointer-events-none" />
                
                {activeOrgDept === "liaison" && (
                  <div className="space-y-6 animate-fade-in font-sans">
                    <span className="text-[10px] font-mono font-black bg-[#F4511E]/10 text-[#F4511E] px-3.5 py-1 rounded-full uppercase tracking-wider font-extrabold">SECTOR 1 • DIPLOMACY UNIT</span>
                    <h4 className="text-2xl font-black uppercase tracking-tight text-slate-900 font-sans leading-none">Sovereign Liaison Unit</h4>
                    <p className="text-slate-600 text-xs font-semibold leading-relaxed">
                      This division operates at the crucial junction of global coordinates. It bridges alliances with foreign municipal councils and sovereign high offices to guarantee that international aid dispatches clear regional ports without customs delays.
                    </p>
                    <div className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <p className="text-[11px] font-mono font-bold text-slate-800 uppercase tracking-wide">// STANDARDIZED PROTOCOLS:</p>
                      <ul className="space-y-2 text-slate-500 text-xs font-semibold">
                        <li>• Coordinate with global health networks and UN councils directly.</li>
                        <li>• Negotiate cost-free logistical air bridges with regional carriers.</li>
                        <li>• Audit foreign visa and protective custody allocations.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeOrgDept === "clinical" && (
                  <div className="space-y-6 animate-fade-in font-sans">
                    <span className="text-[10px] font-mono font-black bg-[#F4511E]/10 text-[#F4511E] px-3.5 py-1 rounded-full uppercase tracking-wider font-extrabold">SECTOR 2 • DIAGNOSTICS</span>
                    <h4 className="text-2xl font-black uppercase tracking-tight text-slate-900 font-sans leading-none">Medical Diagnostics Board</h4>
                    <p className="text-slate-600 text-xs font-semibold leading-relaxed">
                      Composed of specialized oncologists and mobile clinic pilots. This department screens applicants for serious diseases, approves financial payouts to third-party surgical centers, and runs weekly mobile outpatient operations.
                    </p>
                    <div className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <p className="text-[11px] font-mono font-bold text-slate-800 uppercase tracking-wide">// SYSTEMIC RESPONSIBILITIES:</p>
                      <ul className="space-y-2 text-slate-500 text-xs font-semibold">
                        <li>• Direct validation of regional oncologist screen records.</li>
                        <li>• Allocate prescription and formula distributions.</li>
                        <li>• Manage the live regional clinicians database.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeOrgDept === "triage" && (
                  <div className="space-y-6 animate-fade-in font-sans">
                    <span className="text-[10px] font-mono font-black bg-[#F4511E]/10 text-[#F4511E] px-3.5 py-1 rounded-full uppercase tracking-wider font-extrabold">SECTOR 3 • HUMANITARIAN RECOVERY</span>
                    <h4 className="text-2xl font-black uppercase tracking-tight text-slate-900 font-sans leading-none">Family Triage Unit</h4>
                    <p className="text-slate-600 text-xs font-semibold leading-relaxed">
                      The core response mechanism targeting extreme poverty and homelessness. Our caseworkers intervene on sight, transporting vulnerable mother-child groups to warm halfway houses and establishing local career pathways.
                    </p>
                    <div className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <p className="text-[11px] font-mono font-bold text-slate-800 uppercase tracking-wide">// CORE METADATA VALUES:</p>
                      <ul className="space-y-2 text-slate-500 text-xs font-semibold">
                        <li>• Manage 9 transition houses and shelter networks.</li>
                        <li>• Issue immediate nutritional parcels on structural calls.</li>
                        <li>• Reunite displaced youth with validated parents.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeOrgDept === "comply" && (
                  <div className="space-y-6 animate-fade-in font-sans">
                    <span className="text-[10px] font-mono font-black bg-[#F4511E]/10 text-[#F4511E] px-3.5 py-1 rounded-full uppercase tracking-wider font-extrabold">SECTOR 4 • AUDIT COMMAND</span>
                    <h4 className="text-2xl font-black uppercase tracking-tight text-slate-900 font-sans leading-none">Financial Audit Board</h4>
                    <p className="text-slate-600 text-xs font-semibold leading-relaxed">
                      Ensuring structural compliance of all funding streams. Operates independently of the advisory board. Generates daily financial legers and verifies that administrative spending stays beneath the mandated threshold.
                    </p>
                    <div className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <p className="text-[11px] font-mono font-bold text-slate-800 uppercase tracking-wide">// ETHICAL Directives:</p>
                      <ul className="space-y-2 text-slate-500 text-xs font-semibold">
                        <li>• Double-entry ledger tracking published for public review.</li>
                        <li>• Zero personal expense allocations for board members.</li>
                        <li>• Underwrite 100% direct-to-field sponsorship flows.</li>
                      </ul>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[#888888] text-[10px] font-mono">
                  <span>SYSTEM STATUS: COMPLIANT</span>
                  <span className="text-emerald-500 font-bold uppercase text-[9px]">Audited By Continuous Ledger Protocol</span>
                </div>
              </div>
            </div>
          </div>

          <AboutCTA onNavigate={handlePageChange} />
        </div>
      )}

      {/* BRAND NEW PREMIUM "ABOUT US" PAGE */}
      {activePage === "about-legacy" && (
        <div className="bg-white min-h-screen text-[#111111] font-sans pb-24 selection:bg-[#F4511E]/20 selection:text-[#F4511E]">
          {/* PAGE HEADER / HERO SECTION */}
          <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
            {/* Ultra-premium cinematic hero image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 scale-105 hover:scale-100" 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=1600')" }}
            />
            {/* Cinematic dark overlay */}
            <div className="absolute inset-0 bg-slate-950/75 z-10" />
            
            {/* Centered Content */}
            <div className="relative z-20 text-center max-w-4xl mx-auto px-6 space-y-6 flex flex-col items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center space-x-2 bg-[#F4511E]/10 border border-[#F4511E]/30 px-4 py-2 rounded-full backdrop-blur-md"
              >
                <Sparkles className="w-4 h-4 text-[#F4511E] animate-pulse" />
                <span className="text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase font-black text-white">
                  {translate("about_foundation", lang)}
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="text-3xl md:text-6xl font-black text-white uppercase tracking-tight leading-[1.1]"
              >
                {translate("hero_title", lang)}
              </motion.h1>
              
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "96px" }}
                transition={{ duration: 1, delay: 0.4 }}
                className="h-[3px] bg-[#F4511E] rounded-full mx-auto"
              />
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-slate-300 text-sm md:text-lg font-medium leading-relaxed max-w-2xl"
              >
                {translate("hero_subtext", lang)}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="pt-8"
              >
                <div className="flex flex-col items-center space-y-2 cursor-pointer" onClick={() => window.scrollTo({ top: 620, behavior: "smooth" })}>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#F4511E] font-extrabold animate-pulse">explore our mission</span>
                  <div className="w-5 h-8 border-2 border-slate-500 rounded-full flex items-start justify-center p-1">
                    <motion.div 
                      animate={{ y: [0, 8, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="w-1.5 h-1.5 bg-[#F4511E] rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ABOUT US MAIN SECTION */}
          <div className="max-w-7xl mx-auto px-4 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Side: Large premium humanitarian image */}
              <div className="relative group overflow-hidden rounded-3xl shadow-2xl border border-slate-100">
                <div className="absolute inset-0 bg-[#F4511E]/5 group-hover:bg-transparent transition-all duration-500 z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1000" 
                  alt="Sovereign humanitarian outreach" 
                  className="w-full h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-6 left-6 z-20 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl border border-slate-200 shadow-lg">
                  <span className="block text-[#F4511E] font-mono text-[10px] tracking-widest uppercase font-black">active footprint</span>
                  <span className="block text-slate-800 font-sans font-extrabold text-xs tracking-wider uppercase">Direct On-the-Ground Presence</span>
                </div>
              </div>

              {/* Right Side: Processed premium content */}
              <div className="space-y-8">
                <div className="space-y-2">
                  <span className="text-[#F4511E] font-mono text-xs uppercase tracking-[0.2em] font-black block">// GLOBAL MANDATE</span>
                  <h2 className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tight block font-sans">
                    {translate("about_main_title", lang)}
                  </h2>
                  <div className="h-[2px] w-20 bg-[#F4511E]" />
                </div>
                
                <div className="space-y-6 text-[#333333] text-sm leading-relaxed font-sans font-medium">
                  <p>{translate("about_par1", lang)}</p>
                  <p>{translate("about_par2", lang)}</p>
                  <p>{translate("about_par3", lang)}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#F4511E]/10 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-[#F4511E]" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-slate-950 block">Registered 501(c)(3)</span>
                      <span className="text-[10px] text-slate-500 font-mono">Tax-Exempt Entity</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-slate-950 block">Continuous Audit</span>
                      <span className="text-[10px] text-slate-500 font-mono">Maximum Transparency</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MISSION & VISION SECTION */}
          <div className="bg-[#FAF9F6] py-24 border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Mission Card */}
              <div className="bg-white border border-[#EAEAEA] rounded-[32px] p-8 lg:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(244,81,30,0.08)] hover:-translate-y-1 group relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-bl from-[#F4511E]/5 to-transparent rounded-bl-full pointer-events-none" />
                <div className="space-y-6">
                  <div className="w-14 h-14 bg-[#F4511E]/10 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Compass className="w-7 h-7 text-[#F4511E]" />
                  </div>
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#F4511E] font-black block">// core directive</span>
                    <h3 className="text-2xl font-black text-[#111111] uppercase tracking-tight font-sans">{translate("mission", lang)}</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed font-sans font-medium">
                    {translate("mission_text", lang)}
                  </p>
                </div>
              </div>

              {/* Vision Card */}
              <div className="bg-white border border-[#EAEAEA] rounded-[32px] p-8 lg:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(244,81,30,0.08)] hover:-translate-y-1 group relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-bl from-[#F4511E]/5 to-transparent rounded-bl-full pointer-events-none" />
                <div className="space-y-6">
                  <div className="w-14 h-14 bg-[#F4511E]/10 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Globe className="w-7 h-7 text-[#F4511E]" />
                  </div>
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#F4511E] font-black block">// future outlook</span>
                    <h3 className="text-2xl font-black text-[#111111] uppercase tracking-tight font-sans">{translate("vision", lang)}</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed font-sans font-medium">
                    {translate("vision_text", lang)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CINEMATIC FOUNDER'S CHRONICLE */}
          <div id="founders-chronicle" className="max-w-7xl mx-auto px-4 py-28 space-y-16 scroll-mt-24">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-[#F4511E] font-mono text-xs uppercase tracking-[0.2em] font-black block">// THE FOUNDER’S DIETARY</span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tight font-sans">
                {translate("founder_chronicle", lang)}
              </h2>
              <div className="h-[2px] w-24 bg-[#F4511E] mx-auto" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 relative space-y-6">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-50">
                  <img 
                    src="https://images.unsplash.com/photo-1532938911079-1b06ac7ce2ec?w=800&q=80" 
                    alt="His Highness Prince Fazza Profile Portrait" 
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white text-center">
                    <p className="font-extrabold uppercase text-xs tracking-widest text-[#F4511E] mb-1">His Highness</p>
                    <p className="font-black font-sans text-lg tracking-tight uppercase">Prince Fazza Al-Sayyid</p>
                    <p className="text-[10px] text-slate-300 font-mono font-medium">Founder & Sovereign Patron</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 italic text-slate-700 text-xs font-serif font-bold text-center leading-relaxed">
                  "Sovereign benevolence is measured not by wealth, but by direct relief to absolute borders. Our oath is to leave no hand unheld."
                </div>
              </div>

              <div className="lg:col-span-7 space-y-8 font-sans">
                <div className="space-y-4">
                  <span className="text-[9px] font-mono font-black text-[#F4511E] tracking-widest uppercase">// PHILANTHROPICAL DECADE TIMELINE</span>
                  <h3 className="text-xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">Decade of Committed Global Action</h3>
                  <p className="text-slate-500 text-xs">Tracing the core roots and legacy of systematic humanitarian assistance.</p>
                </div>

                <div className="relative border-l-2 border-[#E5E7EB] pl-8 space-y-8 py-2">
                  {[
                    { year: "2012", title: "Seeds of Compassion Initiative", text: "Commenced direct medical support campaigns, bringing critical outpatient diagnostic caravans to underserved communities." },
                    { year: "2016", title: "Establishing the Oncology Triage Program", text: "Allocated multi-million personal endowments towards sovereign clinics, funding cost-free chemotherapy treatments directly." },
                    { year: "2021", title: "Systemic 501(c)(3) Covenant Framework", text: "Unified disparate volunteer networks under a singular world-class charter, expanding on-the-ground action centers." },
                    { year: "2026", title: "The Standard of Absolute Direct Aid", text: "Ensured 100% of fundraising receipts flow seamlessly into active field units without heavy administrative deductions." }
                  ].map((timeline, idx) => (
                    <div key={idx} className="relative group">
                      <span className="absolute -left-[41px] top-0 bg-white border-2 border-[#F4511E] rounded-full w-6 h-6 flex items-center justify-center font-mono text-[9px] font-black text-[#F4511E] shadow-sm group-hover:bg-[#F4511E] group-hover:text-white transition-all">
                        {idx + 1}
                      </span>
                      <div className="space-y-1">
                        <span className="inline-block text-[10px] font-mono font-black bg-[#F4511E]/10 text-[#F4511E] px-2.5 py-0.5 rounded-full">{timeline.year}</span>
                        <h4 className="text-sm font-black text-slate-900 group-hover:text-[#F4511E] uppercase tracking-tight transition-colors">{timeline.title}</h4>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{timeline.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* BOARD OF DIRECTORS COVENANT */}
          <div id="board-of-directors" className="bg-[#FAF9F6] py-28 border-y border-slate-100 scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 space-y-16">
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="text-[#F4511E] font-mono text-xs uppercase tracking-[0.2em] font-black block">// STEWARDSHIP PROTOCOL</span>
                <h2 className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tight font-sans">
                  {translate("board_directors", lang)}
                </h2>
                <div className="h-[2px] w-24 bg-[#F4511E] mx-auto" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  {
                    name: "Dr. Amina Al-Sabah",
                    role: "Trustee of Clinical Strategy & Oncology Services",
                    desc: "Coordinates complex inpatient screening programs and verifies pharmaceutical ledger allocations globally.",
                    img: "https://images.unsplash.com/photo-1593113630400-ea4288922497?w=800&q=80"
                  },
                  {
                    name: "Sir Anthony Dupond",
                    role: "Governor of International Triage Coordination",
                    desc: "Oversees local shelter networks, coordinates housing placements, and designs vocational reintegration modules.",
                    img: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=800&q=80"
                  },
                  {
                    name: "Lady Victoria Sterling",
                    role: "President of Integrity & Sovereign Compliance",
                    desc: "Maintains absolute financial compliance parameters under transparent 501(c)(3) continuous audit systems.",
                    img: "https://images.unsplash.com/photo-1470506028280-a011fb34b6f7?w=800&q=80"
                  },
                  {
                    name: "Dean Malik Al-Faisal",
                    role: "Counselor of Diplomatic Relations & Advisory",
                    desc: "Aligns sovereign legal protocols to fast-track emergency foreign assistance and humanitarian visas.",
                    img: "https://images.unsplash.com/photo-1473649085228-583485e6e4d7?w=800&q=80"
                  }
                ].map((board, idx) => (
                  <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md flex flex-col justify-between group hover:shadow-2xl transition-all duration-300">
                    <div className="relative h-64 overflow-hidden">
                      <div className="absolute inset-0 bg-[#F4511E]/5 group-hover:bg-transparent transition-colors z-10" />
                      <img src={board.img} alt={board.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <span className="block font-sans font-black text-slate-950 text-sm uppercase tracking-tight leading-snug">{board.name}</span>
                        <span className="block text-[9px] text-[#F4511E] font-mono tracking-widest uppercase font-extrabold pb-2">{board.role}</span>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{board.desc}</p>
                      </div>
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                        <span>certified member</span>
                        <span className="text-emerald-500 font-extrabold tracking-normal">● ACTIVE</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ORGANIZATIONAL STRUCTURE WITH INTERACTIVE TABS */}
          <div id="org-structure" className="max-w-7xl mx-auto px-4 py-28 space-y-16 scroll-mt-24">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="text-[#F4511E] font-mono text-xs uppercase tracking-[0.2em] font-black block">// WORKFLOW TOPOLOGY</span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tight font-sans">
                {translate("org_structure", lang)}
              </h2>
              <div className="h-[2px] w-24 bg-[#F4511E] mx-auto" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-strech">
              {/* Left Selector Card */}
              <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-8 rounded-[32px] border border-slate-100 flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-[10px] font-mono font-black text-[#F4511E] tracking-widest uppercase block mb-1">interactive map</span>
                  <h3 className="text-lg font-black uppercase text-slate-900 tracking-tight leading-snug mb-3">Our Core Departments</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">Select any sector component to audit active responsibilities and systemic protocols.</p>
                  
                  <div className="space-y-2.5">
                    {[
                      { key: "liaison", label: "Sovereign Liaison Unit", icon: Users },
                      { key: "clinical", label: "Medical Diagnostics Board", icon: Activity },
                      { key: "triage", label: "Family Triage Unit", icon: Compass },
                      { key: "comply", label: "Financial Audit Board", icon: Shield }
                    ].map((btn) => {
                      const Icon = btn.icon;
                      return (
                        <button
                          key={btn.key}
                          onClick={() => setActiveOrgDept(btn.key)}
                          className={`w-full flex items-center space-x-3 p-4 rounded-2xl text-left border text-xs font-black uppercase tracking-wider transition-all ${
                            activeOrgDept === btn.key
                              ? "bg-white border-[#F4511E] text-[#F4511E] shadow-sm scale-[1.02]"
                              : "bg-white/50 border-slate-200 hover:border-[#F4511E] text-slate-700"
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${activeOrgDept === btn.key ? "text-[#F4511E]" : "text-slate-400"}`} />
                          <span>{btn.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 text-center text-[10px] font-mono text-slate-400 font-extrabold uppercase tracking-widest">
                  FAZZA INTEGRATED FLOW PROTOCOL v4
                </div>
              </div>

              {/* Right Display Board */}
              <div className="lg:col-span-7 bg-white rounded-[32px] border border-slate-100 shadow-xl p-8 sm:p-12 flex flex-col justify-between space-y-8 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-48 h-48 bg-[#F4511E]/5 rounded-bl-full pointer-events-none" />
                
                {activeOrgDept === "liaison" && (
                  <div className="space-y-6">
                    <span className="text-[10px] font-mono font-black bg-[#F4511E]/10 text-[#F4511E] px-3.5 py-1 rounded-full uppercase tracking-wider font-extrabold">SECTOR 1 • DIPLOMACY UNIT</span>
                    <h4 className="text-2xl font-black uppercase tracking-tight text-slate-900 font-sans leading-none">Sovereign Liaison Unit</h4>
                    <p className="text-slate-600 text-xs font-medium leading-relaxed">
                      This division operates at the crucial junction of global coordinates. It bridges alliances with foreign municipal councils and sovereign high offices to guarantee that international aid dispatches clear regional ports without customs delays.
                    </p>
                    <div className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <p className="text-[11px] font-mono font-bold text-slate-800 uppercase tracking-wide">// STANDARDIZED PROTOCOLS:</p>
                      <ul className="space-y-2 text-slate-500 text-xs font-medium">
                        <li>• Coordinate with global health networks and UN councils directly.</li>
                        <li>• Negotiate cost-free logistical air bridges with regional carriers.</li>
                        <li>• Audit foreign visa and protective custody allocations.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeOrgDept === "clinical" && (
                  <div className="space-y-6">
                    <span className="text-[10px] font-mono font-black bg-[#F4511E]/10 text-[#F4511E] px-3.5 py-1 rounded-full uppercase tracking-wider font-extrabold">SECTOR 2 • DIAGNOSTICS</span>
                    <h4 className="text-2xl font-black uppercase tracking-tight text-slate-900 font-sans leading-none">Medical Diagnostics Board</h4>
                    <p className="text-slate-600 text-xs font-medium leading-relaxed">
                      Composed of specialized oncologists and mobile clinic pilots. This department screens applicants for serious diseases, approves financial payouts to third-party surgical centers, and runs weekly mobile outpatient operations.
                    </p>
                    <div className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <p className="text-[11px] font-mono font-bold text-slate-800 uppercase tracking-wide">// SYSTEMIC RESPONSIBILITIES:</p>
                      <ul className="space-y-2 text-slate-500 text-xs font-medium">
                        <li>• Direct validation of regional oncologist screen records.</li>
                        <li>• Allocate prescription and formula distributions.</li>
                        <li>• Manage the live regional clinicians database.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeOrgDept === "triage" && (
                  <div className="space-y-6">
                    <span className="text-[10px] font-mono font-black bg-[#F4511E]/10 text-[#F4511E] px-3.5 py-1 rounded-full uppercase tracking-wider font-extrabold">SECTOR 3 • HUMANITARIAN RECOVERY</span>
                    <h4 className="text-2xl font-black uppercase tracking-tight text-slate-900 font-sans leading-none">Family Triage Unit</h4>
                    <p className="text-slate-600 text-xs font-medium leading-relaxed">
                      The core response mechanism targeting extreme poverty and homelessness. Our caseworkers intervene on sight, transporting vulnerable mother-child groups to warm halfway houses and establishing local career pathways.
                    </p>
                    <div className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <p className="text-[11px] font-mono font-bold text-slate-800 uppercase tracking-wide">// CORE METADATA VALUES:</p>
                      <ul className="space-y-2 text-slate-500 text-xs font-medium">
                        <li>• Manage 9 transition houses and shelter networks.</li>
                        <li>• Issue immediate nutritional parcels on structural calls.</li>
                        <li>• Reunite displaced youth with validated parents.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeOrgDept === "comply" && (
                  <div className="space-y-6">
                    <span className="text-[10px] font-mono font-black bg-[#F4511E]/10 text-[#F4511E] px-3.5 py-1 rounded-full uppercase tracking-wider font-extrabold">SECTOR 4 • AUDIT COMMAND</span>
                    <h4 className="text-2xl font-black uppercase tracking-tight text-slate-900 font-sans leading-none">Financial Audit Board</h4>
                    <p className="text-slate-600 text-xs font-medium leading-relaxed">
                      Ensuring structural compliance of all funding streams. Operates independently of the advisory board. Generates daily financial legers and verifies that administrative spending stays beneath the mandated threshold.
                    </p>
                    <div className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <p className="text-[11px] font-mono font-bold text-slate-800 uppercase tracking-wide">// ETHICAL Directives:</p>
                      <ul className="space-y-2 text-slate-500 text-xs font-medium">
                        <li>• Double-entry ledger tracking published for public review.</li>
                        <li>• Zero personal expense allocations for board members.</li>
                        <li>• Underwrite 100% direct-to-field sponsorship flows.</li>
                      </ul>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-slate-400 text-[10px] font-mono">
                  <span>SYSTEM STATUS: COMPLIANT</span>
                  <span className="text-emerald-500 font-bold uppercase">Audited By Continuous Ledger Protocol</span>
                </div>
              </div>
            </div>
          </div>

          {/* OUR VALUES SECTION */}
          <div className="bg-[#FAF9F6] py-24 border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-4 space-y-16">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="text-[#F4511E] font-mono text-xs uppercase tracking-[0.2em] font-black block">// PRINCIPLE PILLARS</span>
                <h2 className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tight font-sans">Our Values</h2>
                <div className="h-[2px] w-24 bg-[#F4511E] mx-auto" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  {
                    title: "Compassion",
                    description: "We serve with empathy, kindness, and respect for human dignity.",
                    icon: Heart
                  },
                  {
                    title: "Integrity",
                    description: "We uphold transparency, accountability, and ethical practices in all our activities.",
                    icon: Shield
                  },
                  {
                    title: "Service",
                    description: "We are dedicated to improving lives through meaningful action and community engagement.",
                    icon: Activity
                  },
                  {
                    title: "Empowerment",
                    description: "We equip individuals and families with resources and opportunities for sustainable growth.",
                    icon: Sparkles
                  },
                  {
                    title: "Collaboration",
                    description: "We believe lasting change is achieved through partnerships and collective effort.",
                    icon: Users
                  }
                ].map((val, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white border border-[#EAEAEA] rounded-3xl p-6 shadow-sm hover:shadow-[0_15px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="w-10 h-10 bg-[#F4511E]/10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <val.icon className="w-5 h-5 text-[#F4511E]" />
                      </div>
                      <h4 className="font-extrabold text-[#111111] text-base font-sans uppercase tracking-tight">{val.title}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed font-sans font-medium">{val.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CALL TO ACTION SECTION */}
          <div className="max-w-7xl mx-auto px-4 py-24 pb-12">
            <div className="relative rounded-[40px] overflow-hidden bg-slate-950 px-8 py-20 md:p-16 text-center shadow-2xl border border-slate-900 group">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:scale-105 transition-all duration-10000" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1610015694295-cd6a32d16eb5?q=80&w=1200')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-slate-950 z-10" />

              <div className="relative z-20 max-w-3xl mx-auto space-y-6">
                <span className="text-[#F4511E] font-mono text-xs uppercase tracking-widest font-black block">Join the Covenant</span>
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight font-sans">Together, We Can Change Lives</h2>
                
                <p className="text-slate-300 text-sm md:text-base font-medium leading-relaxed">
                  Together, we can build stronger communities, provide hope to those in need, and create a future where homelessness, poverty, and the burden of cancer are significantly reduced.
                </p>

                <div className="py-2">
                  <p className="text-lg md:text-xl font-serif text-[#F4511E]/90 italic font-bold">
                    “Changing Lives, Restoring Hope, Building Futures.”
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4 w-full sm:w-auto">
                  <PremiumDonateButton 
                    onClick={() => { handlePageChange("donate"); setDonationStep(1); }} 
                    lang={lang}
                    className="w-full sm:w-auto"
                  />
                  <button 
                    onClick={() => { handlePageChange("volunteer"); }}
                    className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border-2 border-white/60 hover:border-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                  >
                    Become a Volunteer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* BRAND NEW PREMIUM "OUR SERVICES & PROGRAMS" CATALOG */}
      {activePage === "programs" && (
        <div className="bg-white min-h-screen text-[#111111] pb-24 selection:bg-[#F4511E]/20 selection:text-[#F4511E]">
          {/* Header Hero */}
          <PageHeader page="programs" lang={lang} />

          <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
            {/* grid catalog */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  id: "srv-hiv",
                  title: "HIV Support",
                  meta: "Clinical Diagnostics & Food Allocations",
                  desc: "Comprehensive on-site blood diagnostics, cost-free clinical guidance, and personalized nutritional packages mapped directly for immune assistance.",
                  details: "Patients in regional care centers get immediate access to top tier diagnostics and ongoing counselling, funded entirely through private royal endowments. We operate certified dispatch points ensuring privacy and warm medical support.",
                  metrics: "14,500+ Patients Restored",
                  tag: "HEALTH OUTREACH",
                  img: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=600"
                },
                {
                  id: "srv-halfway",
                  title: "Halfway House",
                  meta: "Safe Reintegration Units",
                  desc: "Secure, drug-free transitional residency structures housing individuals exiting hard conditions. Focused on physical safety and vocational recovery.",
                  details: "Residents participate in accredited life therapy models, local job readiness modules, and cognitive training programs. Every resident has clear progress tracking from caseworkers and peer mentoring circles.",
                  metrics: "88% Career Transition Success",
                  tag: "STABLE SHELTER",
                  img: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600"
                },
                {
                  id: "srv-foreigners",
                  title: "Vulnerable Foreigners Aid",
                  meta: "Emergency Liaison Support",
                  desc: "Emergency shelter, food dispatch, standard translator services, and secure airfare assistance for stateless or distressed individuals.",
                  details: "In direct alliance with embassy teams and local municipal councils, our liaison units provide rapid visa clearances and safety shelter protocols for individuals fleeing acute structural crises.",
                  metrics: "2,100+ Distresses Settled",
                  tag: "DIPLOMATIC LIAISON",
                  img: "https://images.unsplash.com/photo-1516087796934-2e917d5940d9?q=80&w=600"
                },
                {
                  id: "srv-children",
                  title: "Children Came Home",
                  meta: "Youth Protective Reunification",
                  desc: "Systematic tracking program identifying vulnerable displaced youth, establishing safe protective quarters, and coordinating validated family unification.",
                  details: "Our active field triages operate around local boundaries to ensure displaced youth find immediately secure, warm quarters, followed by verified, audited family integration processes.",
                  metrics: "620+ Children Unified",
                  tag: "YOUTH PROTECTION",
                  img: "https://images.unsplash.com/photo-1520697920397-22f28122d4f2?q=80&w=600"
                },
                {
                  id: "srv-shelter",
                  title: "Shelter and Placement",
                  meta: "Transitional Domestic Housing",
                  desc: "Active temporary housing blocks equipped with verified water facilities, 24/7 security guard lines, and direct daily nourishment distribution.",
                  details: "When families face abrupt evictions, we underwrite urgent placements within state-of-the-art housing sites. These blocks offer high dignity pathways, clean facilities, and child learning rooms.",
                  metrics: "9 Active Shelter Units",
                  tag: "STABLE SHELTER",
                  img: "https://images.unsplash.com/photo-1460355976672-71c3f0a4dbbd?q=80&w=600"
                },
                {
                  id: "srv-hospitals",
                  title: "Hospitals and Medical Care",
                  meta: "Oncology Funding & Screenings",
                  desc: "Direct administrative funding for complex medical actions, cancer diagnostic scans, chemotherapy courses, and reconstructive operations.",
                  details: "We close regional healthcare gaps. By partnering directly with designated surgical centers, we sponsor expensive life-saving oncology protocols for patients who possess zero medical plans.",
                  metrics: "$7.2M Underwritten Sponsors",
                  tag: "HEALTH OUTREACH",
                  img: "https://images.unsplash.com/photo-1524672621453-61b8fbfad17a?q=80&w=600"
                },
                {
                  id: "srv-mother",
                  title: "Mother and Child Shelter",
                  meta: "Neonatal Sanctuary & Nutrition",
                  desc: "Safe specialized wings offering physical rehabilitation, infant formula dispatch supplies, and pediatric checks for new vulnerable mothers.",
                  details: "Mothers receive ongoing infant care training, clean clothes, warm baby nutrients, and clinical mental checkups. This serves as a vital safety net for young families during early developmental weeks.",
                  metrics: "4,600+ Mothers Supported",
                  tag: "YOUTH PROTECTION",
                  img: "https://images.unsplash.com/photo-1531983412531-1f49a365f69a?q=80&w=600"
                }
              ].map((srv) => (
                <div 
                  key={srv.id} 
                  id={srv.id} 
                  className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between scroll-mt-24"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      <img src={srv.img} alt={srv.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur shadow-sm border border-slate-100 text-[9px] font-mono font-black uppercase text-[#F4511E] tracking-widest px-3.5 py-1 rounded-full">
                        {srv.tag}
                      </div>
                    </div>
                    <div className="p-6 space-y-3">
                      <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-[#F4511E] block">{srv.meta}</span>
                      <h3 className="font-sans font-black text-slate-950 text-xl uppercase tracking-tight">{srv.title}</h3>
                      <p className="text-slate-500 text-xs font-medium leading-relaxed">{srv.desc}</p>
                      
                      <button 
                        onClick={() => setActiveServiceSpotlight(activeServiceSpotlight === srv.id ? null : srv.id)}
                        className="text-xs text-[#F4511E] hover:text-[#D84315] font-black uppercase tracking-wider flex items-center space-x-1 pt-2"
                      >
                        <span>{activeServiceSpotlight === srv.id ? "Hide details" : "Read active protocol ➔"}</span>
                      </button>

                      {activeServiceSpotlight === srv.id && (
                        <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-[11px] text-slate-600 leading-relaxed font-sans font-medium mt-3 animate-fade-in">
                          {srv.details}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-slate-50 mt-4 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-emerald-600 font-extrabold tracking-wide uppercase">// METRIC: {srv.metrics}</span>
                    <button 
                      onClick={() => {
                        handlePageChange("donate");
                        setDonationStep(1);
                      }}
                      className="text-[#F4511E] hover:underline font-extrabold uppercase"
                    >
                      Sponsor Care
                    </button>
                  </div>
                </div>
              ))}

              {/* 4. SEMINAR REQUEST PANEL */}
              <div id="srv-seminar" className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-md flex flex-col justify-between scroll-mt-24">
                <div className="p-6 space-y-4">
                  <div className="w-10 h-10 bg-[#F4511E]/10 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-[#F4511E]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono tracking-wider font-extrabold text-[#F4511E] uppercase">UTILITY SERVICE</span>
                    <h3 className="font-sans font-black text-slate-950 text-xl uppercase tracking-tight">Seminar Request Booking</h3>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      Book certified oncologists, medical technicians, and regional community ambassadors to coordinate oncology self-screening lectures.
                    </p>
                  </div>

                  {seminarSubmitted ? (
                    <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-4 rounded-2xl text-xs space-y-2 text-center animate-fade-in">
                      <span className="font-black text-base">✓ REQUEST BOOKED</span>
                      <p className="font-medium text-[11px]">Your regional coordinates have been logged. The Sovereign Council will assign an ambassador to your location within 48 business hours.</p>
                      <button 
                        onClick={() => setSeminarSubmitted(false)}
                        className="text-emerald-700 underline font-mono text-[10px] uppercase font-bold"
                      >
                        Book another lecture
                      </button>
                    </div>
                  ) : (
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSeminarSubmitted(true);
                      }}
                      className="space-y-3 pt-2"
                    >
                      <div>
                        <label className="block text-[9px] uppercase font-mono text-slate-400 font-extrabold tracking-wider mb-1">Select Lecture Topic</label>
                        <select 
                          value={seminarTopic}
                          onChange={(e) => setSeminarTopic(e.target.value)}
                          className="w-full bg-[#FAFAFA] border border-[#EAEAEA] text-[#111111] font-bold text-xs rounded-xl p-3 outline-none focus:border-[#F4511E]"
                        >
                          <option value="Oncology Care Operations">Oncology Care Operations & Diagnostics</option>
                          <option value="Hygiene Pathways">Warm Hygiene and Transitional Lodging</option>
                          <option value="Community Philanthropy">Systematic Humanitarian Strategy</option>
                          <option value="Mental Health Support">Counseling Protocols for Vulnerable Youth</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[9px] uppercase font-mono text-slate-400 font-extrabold tracking-wider mb-1">Target Date</label>
                          <input 
                            type="date"
                            required
                            className="w-full bg-[#FAFAFA] border border-[#EAEAEA] text-[#111111] font-medium text-xs rounded-xl p-3 outline-none focus:border-[#F4511E]"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] uppercase font-mono text-slate-400 font-extrabold tracking-wider mb-1">Expected Audience</label>
                          <input 
                            type="number" 
                            placeholder="e.g. 150"
                            required
                            className="w-full bg-[#FAFAFA] border border-[#EAEAEA] text-[#111111] font-medium text-xs rounded-xl p-3 outline-none focus:border-[#F4511E]"
                          />
                        </div>
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-[#F4511E] hover:bg-[#D84315] text-white py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition shadow-sm"
                      >
                        Submit Dispatch Booking
                      </button>
                    </form>
                  )}
                </div>
                <div className="p-6 pt-0 border-t border-slate-50 mt-4 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Sovereign Outreach Code</span>
                  <span className="text-[#F4511E] font-bold">FAZ-LECTURE-MODULE</span>
                </div>
              </div>

              {/* 5. HEALTH AMBASSADOR DATABASE SEARCH */}
              <div id="srv-database" className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-md flex flex-col justify-between scroll-mt-24">
                <div className="p-6 space-y-4">
                  <div className="w-10 h-10 bg-[#F4511E]/10 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#F4511E]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono tracking-wider font-extrabold text-[#F4511E] uppercase">DATABASE REGISTRY</span>
                    <h3 className="font-sans font-black text-slate-950 text-xl uppercase tracking-tight">Ambassador Directory</h3>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      Search local medical marshals and validated clinicians registered inside our system to assist on ground.
                    </p>
                  </div>

                  <div className="relative pt-2">
                    <input 
                      type="text"
                      placeholder="Search specialties (e.g., Oncology, Caravan)"
                      value={healthSearchQuery}
                      onChange={(e) => setHealthSearchQuery(e.target.value)}
                      className="w-full bg-[#FAFAFA] border-2 border-slate-200 focus:border-[#F4511E] text-xs font-bold rounded-xl py-3 pl-9 pr-4 outline-none placeholder-slate-400"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-[22px]" />
                  </div>

                  {/* Results directory list */}
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {[
                      { name: "Dr. Rachel Thorne", spec: "Oncology Diagnostics Coordinator", loc: "NY Clinical Caravan 1", phone: "1-800-FAZZA-MED" },
                      { name: "Prof. Marcus Vance", spec: "Transitional Therapy Lead", loc: "Sector 3 shelter coordination", phone: "1-800-FAZZA-SHELTER" },
                      { name: "Dr. Karim Al-Saeed", spec: "Mobile Pediatric Chief", loc: "Maternity dispatch caravan", phone: "1-800-FAZZA-BABY" },
                      { name: "Nurse Elena Rostova", spec: "HIV Screen Lead Specialist", loc: "Caravan 4 clinical outpost", phone: "1-800-FAZZA-CLINIC" }
                    ]
                    .filter(amb => amb.spec.toLowerCase().includes(healthSearchQuery.toLowerCase()) || amb.name.toLowerCase().includes(healthSearchQuery.toLowerCase()))
                    .map((amb, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-xl text-[11px] border border-slate-100 flex items-center justify-between font-sans">
                        <div>
                          <span className="font-extrabold text-slate-950 block">{amb.name}</span>
                          <span className="text-[9px] text-[#F4511E] font-mono font-bold block">{amb.spec}</span>
                          <span className="text-[9px] text-slate-400 block">{amb.loc}</span>
                        </div>
                        <a href={`tel:${amb.phone}`} className="p-2 border border-[#F4511E]/20 hover:border-[#F4511E] bg-white rounded-lg text-[#F4511E] transition transform hover:scale-105 shrink-0 ml-2">
                          <Phone className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-slate-50 mt-4 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Continuous Registry System</span>
                  <span className="text-[#F4511E] font-bold">24 Active Clinicians listed</span>
                </div>
              </div>

            </div>

            {/* Core Values / Banner */}
            <div className="bg-[#FAF9F6] border border-[#EAEAEA] rounded-[40px] p-8 md:p-12 text-center space-y-4">
              <span className="text-xs font-mono font-black text-[#F4511E] tracking-widest uppercase">// FAZZA COMPASSION ASSIGNMENT</span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#111111] uppercase tracking-tight">Need Urgent Outpatient Care Coordination?</h2>
              <p className="text-slate-500 text-xs md:text-sm max-w-xl mx-auto font-medium">
                Our clinics operate 24/7 without checking payment eligibility or local credentials. Reach our certified dispatcher units for priority security.
              </p>
              <div className="pt-2">
                <button 
                  onClick={() => handleLinkClick("contact")}
                  className="bg-[#111111] hover:bg-slate-900 text-white font-sans font-black text-[10px] tracking-widest uppercase px-6 py-3.5 rounded-full shadow-lg"
                >
                  Contact Urgent dispatch
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* BRAND NEW PREMIUM "NEWSROOM & CHRONICLES" PRESS */}
      {activePage === "newsroom" && (
        <div className="bg-white min-h-screen text-[#111111] pb-24 selection:bg-[#F4511E]/20 selection:text-[#F4511E]">
          {/* Header Hero */}
          <PageHeader page="newsroom" lang={lang} />

          <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
            {/* Filter tags bar */}
            <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-100 pb-6">
              {[
                "All", 
                "Humanitarian News", 
                "Foundation Updates", 
                "Outreach Reports", 
                "Health Campaigns", 
                "Poverty Alleviation Stories", 
                "Community Impact Stories"
              ].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedNewsCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider border transition-all ${
                    selectedNewsCategory === category
                      ? "bg-[#F4511E] border-[#F4511E] text-white"
                      : "bg-[#FAFAFA] border-[#EAEAEA] text-slate-800 hover:border-[#F4511E]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  id: "news-1",
                  title: "Outpatient Oncology Outpost Reaches Record Registrations",
                  category: "Health Campaigns",
                  date: "May 28, 2026",
                  author: "Dr. Amina Al-Sabah",
                  readTime: "4 min read",
                  text: "Our specialized cancer screening caravan operating within target boundaries has underwritten cost-free chemotherapy diagnostics for over 850 distressed mothers. Through targeted royal funding allocations, patient wait lists were reduced from six months to zero. We continue to establish partnerships with regional oncological surgical units.",
                  img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=600"
                },
                {
                  id: "news-2",
                  title: "Fazza Halfway Sanctuary Secures Career Certifications",
                  category: "Poverty Alleviation Stories",
                  date: "April 15, 2026",
                  author: "Sir Anthony Dupond",
                  readTime: "6 min read",
                  text: "We celebrate the sovereign transition of 140 graduates from our stable halfway house quarters. In partnering with regional technical councils, residents achieved accredited welding and safety dispatch certifications. All graduates have been placed inside active commercial networks with stable living salaries.",
                  img: "https://images.unsplash.com/photo-1489659639091-8b687bc4386e?q=80&w=600"
                },
                {
                  id: "news-3",
                  title: "Q1 Public Audit Released: 100% Direct Delivery Compliance Achieved",
                  category: "Foundation Updates",
                  date: "March 10, 2026",
                  author: "Lady Victoria Sterling",
                  readTime: "8 min read",
                  text: "Pursuant to transparent 501(c)(3) continuous audit systems, our board of governance published the complete double-entry financial ledger of Q1. Record fundraising receipts of $4.8M were executed, with exactly 100% of standard sponsorships flowing straight into medical screenings and transitional halfway quarters with zero admin offsets.",
                  img: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=600"
                },
                {
                  id: "news-4",
                  title: "Emergency Food Dispatch Responds to Regional Structural Shock",
                  category: "Outreach Reports",
                  date: "February 22, 2026",
                  author: "caseworker team",
                  readTime: "5 min read",
                  text: "In responding to abrupt regional layoffs and climate factors, the Prince Fazza Family Triage caravan deployed 5,000 nutritional packages alongside baby formula formula dispatch units, guaranteeing food security for families with zero state access.",
                  img: "https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=600"
                },
                {
                  id: "news-5",
                  title: "Missing Children Reunification Protcols Bring Nine Youth Home",
                  category: "Community Impact Stories",
                  date: "January 14, 2026",
                  author: "Youth Protection Team",
                  readTime: "7 min read",
                  text: "Collaborating with local municipal authorities, our specialized caseworkers located nine missing displaced youth, establishing secure transitional sanctuary blocks while processing strict ID and blood-line verifications to return the children back.",
                  img: "https://images.unsplash.com/photo-1524069290683-0457abfe42c3?q=80&w=600"
                }
              ]
              .filter(post => selectedNewsCategory === "All" || post.category === selectedNewsCategory)
              .map((post) => (
                <div 
                  key={post.id} 
                  className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-md flex flex-col justify-between group hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-50">
                    <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-4 left-4 bg-[#F4511E] text-white text-[8px] font-mono tracking-widest uppercase font-black px-3.5 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-mono font-bold uppercase">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="font-sans font-black text-slate-950 text-base uppercase tracking-tight leading-snug group-hover:text-[#F4511E] transition-colors">{post.title}</h3>
                      <p className="text-slate-500 text-xs font-medium leading-relaxed line-clamp-3">{post.text}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-[#F4511E]/10 rounded-full flex items-center justify-center text-[10px] font-mono font-black text-[#F4511E]">
                          {post.author.charAt(0)}
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold tracking-tight">By {post.author}</span>
                      </div>

                      <button 
                        onClick={() => setActiveNewsPost(post)}
                        className="text-xs text-[#F4511E] font-black uppercase tracking-wider hover:underline"
                      >
                        Read Article
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DETAIL MODAL OVERLAY */}
          {activeNewsPost && (
            <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-fade-in">
              <div className="bg-white max-w-2xl w-full rounded-[38px] p-8 md:p-10 border border-slate-100 shadow-2xl relative max-h-[90vh] overflow-y-auto font-sans">
                <button
                  onClick={() => setActiveNewsPost(null)}
                  className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="bg-[#F4511E]/10 text-[#F4511E] text-[10px] tracking-widest font-mono font-black uppercase px-3.5 py-1 rounded-full inline-block">
                      {activeNewsPost.category}
                    </span>
                    <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-mono font-bold uppercase">
                      <span>{activeNewsPost.date}</span>
                      <span>•</span>
                      <span>{activeNewsPost.readTime}</span>
                      <span>•</span>
                      <span>By {activeNewsPost.author}</span>
                    </div>
                    <h2 className="text-xl md:text-3xl font-black uppercase tracking-tight text-slate-950 leading-tight">
                      {activeNewsPost.title}
                    </h2>
                  </div>

                  <div className="h-64 rounded-3xl overflow-hidden shadow-md">
                    <img src={activeNewsPost.img} alt={activeNewsPost.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="space-y-4 text-slate-700 text-sm leading-relaxed font-sans font-medium">
                    <p>{activeNewsPost.text}</p>
                    <p>
                      In alignment with the core values of Prince Fazza, we maintain strict field integrity records detailing exactly how every surgical allocation or residency voucher gets dispatched. Every clinical screening is recorded on dynamic database parameters, remaining visible to verified institutional auditors for absolute double-entry compliance.
                    </p>
                    <p>
                      We extend our profound gratitude toward our network of private sponsors who make these oncology screenings and transitional sheltered placement facilities possible. Together, we are changing lives, restoring dignity, and building sustainable futures.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400 font-bold uppercase">
                    <span>FAZZA OFFICIAL PRESS LOG v2.5</span>
                    <button 
                      onClick={() => {
                        setActiveNewsPost(null);
                        handlePageChange("donate");
                        setDonationStep(1);
                      }}
                      className="text-[#F4511E] underline"
                    >
                      Support this outreach campaign
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      )}


      {/* 3. CAMPAIGNS & EMERGENCY SPECS VIEW */}
      {(activePage === "campaigns" || activePage === "emergency-relief" || activePage === "scholarships" || activePage === "water-projects") && (
        <div className="max-w-7xl mx-auto px-4 py-24 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[#F4511E] font-mono text-xs uppercase tracking-widest font-black">CAMPAIGNS TRACKER Portal</span>
            <h1 className="text-4xl font-extrabold text-[#111111] font-sans tracking-tight leading-[1.1]">Active Human Sponsorship Targets</h1>
            <p className="text-slate-500 text-xs">Verify continuous fundraising achievement parameters directly below</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROGRAMS.map((campaign) => (
              <div key={campaign.id} className="bg-white rounded-3xl shadow-xl flex flex-col md:flex-row border border-[#EAEAEA] overflow-hidden">
                <div className="w-full md:w-48 h-48 md:h-auto bg-cover bg-center" style={{ backgroundImage: `url(${campaign.imageUrl})` }} />
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="bg-[#FAFAFA] text-[#F4511E] border border-[#EAEAEA] text-[10px] uppercase font-mono px-3.5 py-1 rounded-full font-bold">{campaign.category}</span>
                    <h3 className="font-sans font-extrabold text-[#111111] text-lg mt-3">{campaign.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">{campaign.description}</p>
                  </div>

                  <div className="mt-4 bg-[#FAFAFA] p-4 rounded-2xl border border-[#EAEAEA] space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="font-bold text-[#111111]">RAISED: ${campaign.raised.toLocaleString()}</span>
                      <span className="text-[#F4511E] font-bold">${campaign.goal.toLocaleString()} GOAL</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#F4511E] rounded-full" style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }} />
                    </div>
                    <div className="flex justify-between items-center text-[10px] pt-1">
                      <span className="text-slate-400 font-bold">{campaign.donorsCount.toLocaleString()} Sponsors Sourced</span>
                      <button 
                        onClick={() => {
                          setSelectedCampaignId(campaign.id);
                          setDonateAmount("1000"); // Standard luxury starting amount
                          handlePageChange("donate");
                          setDonationStep(1);
                        }}
                        className="text-[#F4511E] hover:underline font-extrabold uppercase tracking-wide text-[10px]"
                      >
                        Sponsor Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
           {/* 4. DONATE COMPREHENSIVE VIEW GATEWAY */}
      {activePage === "donate" && (
        <div className="bg-white min-h-screen">
          {/* Page Header with hero image and details below */}
          <PageHeader page="donate" lang={lang} />

          <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Main Container Card — GLASSMORPHISM & LUXE FINISH */}
          <div className="w-full bg-white rounded-[32px] overflow-hidden border border-[#EAEAEA] shadow-[0_24px_80px_rgba(0,0,0,0.06)] backdrop-blur-md relative font-sans">
            
            {/* Header branding ribbon */}
            <div className="bg-[#111111] px-8 py-3.5 flex flex-col sm:flex-row justify-between items-center border-b border-[#EAEAEA] text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                <span className="text-slate-400 font-mono tracking-widest uppercase font-extrabold text-[10px]">SECURE DONATION ALLOCATION</span>
              </div>
              <div className="text-slate-400 font-mono tracking-widest uppercase font-extrabold text-[10px] sm:mt-0 mt-1">
                PRINCE FAZZA CHARITY FOUNDATION
              </div>
            </div>

            {paymentSuccess ? (
              /* DYNAMIC ULTRA PREMIUM SUCCESS SCREEN */
              <div className="py-20 px-8 text-center max-w-2xl mx-auto space-y-6 animate-fade-in">
                <div className="relative w-24 h-24 mx-auto">
                  <div className="absolute inset-0 bg-emerald-500/10 rounded-full animate-ping"></div>
                  <div className="bg-emerald-500 text-white w-24 h-24 rounded-full flex items-center justify-center relative shadow-xl">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-sans font-black text-3xl text-[#111111] tracking-tight">Blessings and Thank You, {payerName}</h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed font-sans">
                    Your contribution of <strong className="text-slate-950 font-black">${Number(donateAmount).toLocaleString()}</strong> was logged successfully under the official protocol.
                  </p>
                  <p className="text-xs text-slate-500 font-medium italic mt-2">
                    “May Almighty God richly bless, strengthen, and reward you for your kindness, compassion, and support toward humanity.”
                  </p>
                </div>

                <div className="bg-[#FAFAFA] border border-[#EAEAEA] p-6 rounded-2xl text-left space-y-4">
                  <h4 className="text-xs uppercase font-mono tracking-wider font-extrabold text-slate-700">Official Transfer Allocation Details:</h4>
                  {paymentMethod === "bank" ? (
                    <div className="space-y-2 text-xs">
                      <p className="text-slate-600 font-medium">To complete your sovereign contribution of <strong>${Number(donateAmount).toLocaleString()}</strong>, retrieve Bank parameters below:</p>
                      <div className="p-3 bg-white rounded-xl border border-[#EAEAEA] font-mono text-[11px] text-slate-800 space-y-1">
                        <div><strong>Bank Name:</strong> Geneva Private Wealth Bank</div>
                        <div><strong>Account:</strong> Prince Fazza Charity Foundation</div>
                        <div><strong>IBAN CODE:</strong> AE73 0240 0000 1234 5678 910</div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 text-xs">
                      <p className="text-slate-600 font-medium">Transmit exactly <strong>{Number(donateAmount).toLocaleString()} USDT/BTC</strong> to the address below:</p>
                      <div className="p-3 bg-white rounded-xl border border-[#EAEAEA] font-mono text-[11px] text-slate-800 break-all">
                        {cryptoCurrency === "bitcoin" 
                          ? "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
                          : cryptoCurrency === "trc20"
                            ? "TXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                            : "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
                        }
                      </div>
                    </div>
                  )}
                  <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                    An official copy of your pledge, tax documents, and humanitarian allocation certification keys has been sent to <strong>{payerEmail}</strong>.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
                  <button 
                    onClick={() => {
                      setPaymentSuccess(false);
                      setDonationStep(1);
                      setActivePage("home");
                    }} 
                    className="bg-[#111111] hover:bg-[#F4511E] text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-305 shadow-md cursor-pointer"
                  >
                    Return to Home Overview
                  </button>
                  <button 
                    onClick={() => {
                      setPaymentSuccess(false);
                      setDonationStep(1);
                    }} 
                    className="bg-transparent hover:bg-slate-50 text-slate-700 border border-[#EAEAEA] px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-305 cursor-pointer"
                  >
                    Pledge Another Volume
                  </button>
                </div>
              </div>
            ) : donationStep === 1 ? (
              /* ========================================================
                  STEP 1 — APPRECIATION / THANK YOU INTRO & TYPE SELECTION
                  ======================================================== */
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px] animate-fade-in">
                
                {/* LEFT SIDE: EMOTIONAL & HUMANITARIAN PRESENTATION (CINEMATIC IMAGE BACKGROUND) */}
                <div 
                  className="lg:col-span-6 relative bg-cover bg-center p-12 lg:p-16 flex flex-col justify-between min-h-[450px] lg:min-h-auto"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=1200')" }}
                >
                  {/* High contrast luxury overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/70 z-0"></div>

                  {/* Top Quote Ribbon */}
                  <div className="relative z-10 flex items-center space-x-2 text-[#F4511E] font-bold uppercase tracking-widest text-[11px] font-mono">
                    <Heart className="w-4 h-4 fill-current text-[#F4511E]" />
                    <span>DONATION PORTAL</span>
                  </div>

                  {/* Primary text content block */}
                  <div className="relative z-10 space-y-6 my-auto">
                    <h2 className="text-4xl lg:text-5xl font-black font-sans text-white leading-tight tracking-tight">
                      Thank You for Choosing to Change Lives
                    </h2>
                    <p className="text-sm text-slate-300 leading-relaxed font-sans font-medium">
                      Your generosity helps provide food, education, healthcare, and hope to vulnerable communities around the world.
                    </p>
                    
                    {/* Blessing block */}
                    <div className="pt-4 border-t border-white/10 mt-6 relative pl-5 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#F4511E]">
                      <p className="text-xs text-slate-200 font-mono tracking-wide uppercase font-bold text-[#F4511E] mb-1.5">Official Foundation Blessing</p>
                      <p className="text-xs text-slate-300 font-sans italic font-medium leading-relaxed">
                        “May Almighty God richly bless, strengthen, and reward you for your kindness, compassion, and support toward humanity.”
                      </p>
                    </div>
                  </div>

                  {/* Bottom metrics trust footer */}
                  <div className="relative z-10 grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs text-white">
                    <div>
                      <span className="block text-[#F4511E] font-black text-lg">100%</span>
                      <span className="text-slate-400 font-medium text-[10px]">Direct Materials Flow</span>
                    </div>
                    <div>
                      <span className="block text-white font-black text-lg">UNHCR</span>
                      <span className="text-slate-400 font-medium text-[10px]">Aligned Frameworks</span>
                    </div>
                    <div>
                      <span className="block text-white font-black text-lg">EY VIP</span>
                      <span className="text-slate-400 font-medium text-[10px]">Annual Financial Auditing</span>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE: PREMIUM DONATION TYPE SELECTOR & PRESETS */}
                <div className="lg:col-span-6 p-10 lg:p-14 bg-[#FAFAFA] flex flex-col justify-between">
                  <div className="space-y-8">
                    
                    {/* Header of Type selection */}
                    <div>
                      <p className="text-[10px] font-mono tracking-widest uppercase font-extrabold text-[#F4511E] mb-2">// STEP 1 OF 2</p>
                      <h3 className="font-sans font-black text-2xl text-[#111111] tracking-tight">Choose Your Altruistic Path</h3>
                      <p className="text-xs text-slate-500 font-medium mt-1">Select your partnership scale and desired allocation size.</p>
                              {/* TWO LARGE PREMIUM TAB SWITCHERS */}
                    <div className="grid grid-cols-2 gap-4">
                      
                      {/* Individual Tab */}
                      <button
                        type="button"
                        onClick={() => {
                          setDonationCategory("individual");
                          setSelectedPreset(null);
                          setCustomAmount("");
                        }}
                        className={`p-5 rounded-2xl border text-left transition duration-300 cursor-pointer relative overflow-hidden ${
                          donationCategory === "individual"
                            ? "bg-white border-[#F4511E] shadow-[0_12px_24px_rgba(244,81,30,0.08)] text-[#111111]"
                            : "bg-white border-[#EAEAEA] hover:border-[#F4511E]/40 text-slate-600"
                        }`}
                      >
                        {donationCategory === "individual" && (
                          <div className="absolute top-0 right-0 w-8 h-8 bg-[#F4511E] rounded-bl-xl flex items-center justify-center text-white">
                            <Sparkles className="w-4 h-4" />
                          </div>
                        )}
                        <span className="block font-mono font-extrabold text-[10px] text-slate-400 uppercase tracking-wider mb-1">SOVEREIGN</span>
                        <strong className="block text-sm font-sans font-black">Individual Donation</strong>
                        <span className="block text-[10px] text-slate-500 font-medium mt-1">Direct single-patron support system</span>
                      </button>

                      {/* Family Tab */}
                      <button
                        type="button"
                        onClick={() => {
                          setDonationCategory("family");
                          setSelectedPreset(null);
                          setCustomAmount("");
                        }}
                        className={`p-5 rounded-2xl border text-left transition duration-300 cursor-pointer relative overflow-hidden ${
                          donationCategory === "family"
                            ? "bg-white border-[#F4511E] shadow-[0_12px_24px_rgba(244,81,30,0.08)] text-[#111111]"
                            : "bg-white border-[#EAEAEA] hover:border-[#F4511E]/40 text-slate-600"
                        }`}
                      >
                        {donationCategory === "family" && (
                          <div className="absolute top-0 right-0 w-8 h-8 bg-[#F4511E] rounded-bl-xl flex items-center justify-center text-white">
                            <Sparkles className="w-4 h-4" />
                          </div>
                        )}
                        <span className="block font-mono font-extrabold text-[10px] text-slate-400 uppercase tracking-wider mb-1">COVENANT GROUP</span>
                        <strong className="block text-sm font-sans font-black">Family Donation</strong>
                        <span className="block text-[10px] text-slate-500 font-medium mt-1">Multi-generational legacy funding</span>
                      </button>

                    </div>

                    {/* PRESET CHIPS GRID DEPENDING ON CATEGORY */}
                    <div className="space-y-4">
                      <label className="block text-[10px] font-mono tracking-wider text-slate-400 font-bold uppercase">
                        Select Contribution Level
                      </label>
                      
                      <div className="grid grid-cols-4 gap-2.5">
                        {donationCategory === "individual" ? (
                          // Individual Presets: $200, $500, $1,000, $2,000, $4,000, $7,000, $8,000
                          ["200", "500", "1000", "2000", "4000", "7000", "8000"].map((amt) => {
                            const isActive = selectedPreset === amt;
                            return (
                              <button
                                type="button"
                                key={amt}
                                onClick={() => {
                                  setSelectedPreset(amt);
                                  setCustomAmount(""); // Preset click does NOT affect the custom input field
                                }}
                                className={`py-3.5 rounded-xl border text-xs font-mono transition-all duration-300 cursor-pointer text-center ${
                                  isActive
                                    ? "bg-[#F4511E] text-white border-[#F4511E] shadow-[0_12px_24px_rgba(244,81,30,0.3)] scale-[1.05] font-black"
                                    : "bg-white border-[#EAEAEA] text-[#111111] font-bold hover:border-[#F4511E]/40 hover:-translate-y-0.5"
                                }`}
                              >
                                ${Number(amt).toLocaleString()}
                              </button>
                            );
                          })
                        ) : (
                          // Family Presets: $2,000, $5,000, $7,000, $10,000, $15,000, $20,000
                          ["2000", "5000", "7000", "10000", "15000", "20000"].map((amt) => {
                            const isActive = selectedPreset === amt;
                            return (
                              <button
                                type="button"
                                key={amt}
                                onClick={() => {
                                  setSelectedPreset(amt);
                                  setCustomAmount(""); // Preset click does NOT affect the custom input field
                                }}
                                className={`py-3.5 rounded-xl border text-xs font-mono transition-all duration-300 cursor-pointer text-center ${
                                  isActive
                                    ? "bg-[#F4511E] text-white border-[#F4511E] shadow-[0_12px_24px_rgba(244,81,30,0.3)] scale-[1.05] font-black"
                                    : "bg-white border-[#EAEAEA] text-[#111111] font-bold hover:border-[#F4511E]/40 hover:-translate-y-0.5"
                                }`}
                              >
                                ${Number(amt).toLocaleString()}
                              </button>
                            );
                          })
                        )}
                      </div>

                      {/* LARGE FULL-WIDTH PREMIUM INPUT FIELD */}
                      <div className="relative pt-2">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 font-mono font-black text-lg pointer-events-none">$</span>
                        <input
                          type="number"
                          placeholder="Input Amount"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value);
                            setSelectedPreset(null); // Clear active preset card style
                          }}
                          className="w-full h-16 bg-white border-2 border-[#EAEAEA] focus:border-[#F4511E] focus:ring-4 focus:ring-[#F4511E]/10 text-[#111111] rounded-2xl pl-10 pr-5 text-base font-mono outline-none font-black shadow-sm placeholder-slate-400 transition-all duration-300"
                        />
                      </div>
                    </div>

                    {/* NEW "DONATION AMOUNT" DISPLAY SECTION */}
                    <div className="mt-8 pt-6 border-t border-[#EAEAEA] flex flex-col items-center justify-center text-center space-y-1">
                      <p className="text-xs uppercase font-mono tracking-widest font-extrabold text-slate-500">Donation Amount</p>
                      <div className="text-4xl sm:text-5xl font-sans font-black text-emerald-600 tracking-tight transition-all duration-300 hover:scale-105 select-none font-mono">
                        ${Number(customAmount || selectedPreset || 0).toLocaleString()}
                      </div>
                    </div>

                    {/* SELECT CAUSE ASSOCIATIVE INITIATIVE */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono tracking-wider text-slate-400 font-bold uppercase">
                        Select Campaign
                      </label>
                      <select 
                        value={selectedCampaignId}
                        onChange={(e) => setSelectedCampaignId(e.target.value)}
                        className="w-full bg-white text-[#111111] border border-[#EAEAEA] focus:border-[#F4511E] focus:ring-4 focus:ring-[#F4511E]/5 rounded-xl px-4 py-3 text-xs font-sans font-bold outline-none transition"
                      >
                        {PROGRAMS.map(c => (
                          <option key={c.id} value={c.id}>{c.title}</option>
                        ))}
                      </select>
                    </div>

                  </div>

                  <div className="pt-8">
                    <button
                      type="button"
                      disabled={isProceeding}
                      onClick={() => {
                        const currentVal = Number(customAmount || selectedPreset || 0);
                        if (currentVal <= 0) {
                          alert("Please specify a genuine generous donation volume.");
                          return;
                        }
                        setIsProceeding(true);
                        setDonateAmount(String(currentVal));
                        setTimeout(() => {
                          setDonationStep(2);
                          setIsProceeding(false);
                        }, 1200);
                      }}
                      className={`w-full font-sans font-bold text-xs tracking-widest uppercase py-4 rounded-xl shadow-lg transition-all duration-500 cursor-pointer flex items-center justify-center space-x-2 ${
                        isProceeding 
                          ? "bg-emerald-600 text-white shadow-[0_12px_24px_rgba(5,150,105,0.25)] scale-[1.01]" 
                          : "bg-[#F4511E] hover:bg-[#D84315] text-white hover:-translate-y-0.5"
                      }`}
                    >
                      {isProceeding ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>PROCEEDING SECURELY...</span>
                        </>
                      ) : (
                        <span>Proceed to Payment Details ➔</span>
                      )}
                    </button>
                  </div>
                </div>
                </div>

              </div>
            ) : (
              /* ========================================================
                  STEP 2 — PAYMENT DETAILS & ADRESS INSTRUCTIONS
                  ======================================================== */
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px] animate-fade-in">
                
                {/* LEFT COLUMN: DONATION SUMMARY & VERBIAGE */}
                <div className="lg:col-span-4 bg-[#111111] text-white p-10 lg:p-12 flex flex-col justify-between border-r border-slate-800">
                  <div className="space-y-8">
                    <span className="text-[#F4511E] font-mono text-xs uppercase tracking-widest font-black">// TRANSACTION COMPREHENSIVE</span>
                    
                    <div className="space-y-4">
                      <h3 className="font-sans font-black text-2xl tracking-tight text-white">Your Pledge Shield</h3>
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">
                        You are about to initiate or pledge support to change vulnerable lives. Your transaction is audited annually under EY guidelines.
                      </p>
                    </div>

                    {/* Selected Summary Card */}
                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-4">
                      <span className="block text-[9px] font-mono tracking-widest uppercase text-[#F4511E] font-bold">Selected allocation parameters</span>
                      
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-slate-400 font-medium">Agreement Scope:</span>
                          <span className="font-extrabold text-white capitalize">{donationCategory} Portfolio</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-slate-400 font-medium">Initiative Target:</span>
                          <span className="font-extrabold text-white max-w-[150px] text-right truncate">
                            {PROGRAMS.find(p => p.id === selectedCampaignId)?.title || "General Operations"}
                          </span>
                        </div>
                        <div className="flex justify-between pt-1">
                          <span className="text-slate-400 font-medium">Pledge Volume:</span>
                          <span className="font-black text-rose-500 text-sm font-mono">${Number(donateAmount).toLocaleString()} USD</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-xs text-slate-300">
                        <Shield className="w-5 h-5 text-emerald-500" />
                        <span>Sovereign-grade Encryption Secure</span>
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-slate-300">
                        <Lock className="w-5 h-5 text-rose-500" />
                        <span>Anti-Fraud Compliance Clear</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 text-[11px] text-slate-400">
                    <button 
                      type="button" 
                      onClick={() => setDonationStep(1)} 
                      className="text-[#F4511E] hover:underline font-bold cursor-pointer"
                    >
                      ← Return to Step 1 & Modify Volume
                    </button>
                  </div>
                </div>

                {/* RIGHT COLUMN: DONOR DETAILS FORM & PAYMENT METHOD SPECIFICATION */}
                <div className="lg:col-span-8 p-10 lg:p-14 bg-white">
                  <form onSubmit={handleDonateSubmit} className="space-y-8">
                    
                    {/* Step info */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-mono tracking-widest uppercase font-extrabold text-[#F4511E] mb-2">// STEP 2 OF 2</p>
                      <h3 className="font-sans font-black text-2xl text-[#111111] tracking-tight">Identity & Securing Allocation</h3>
                      <p className="text-xs text-slate-500 font-medium">Please supply verified credentials to log your humanitarian interest.</p>
                    </div>

                    {/* INPUT FORM FIELDS */}
                    <div className="space-y-6">
                      
                      {/* Name & Email Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5 animate-fade-in">
                          <label className="block text-xs text-slate-700 font-black uppercase tracking-wider font-sans">Full Name</label>
                          <input 
                            type="text" 
                            required 
                            value={payerName}
                            onChange={(e) => setPayerName(e.target.value)}
                            placeholder="Samantha Cunningham" 
                            className="w-full bg-white border border-[#EAEAEA] text-[#111111] focus:border-[#F4511E] focus:ring-4 focus:ring-[#F4511E]/5 rounded-xl px-4 py-3.5 text-xs outline-none font-bold placeholder-slate-400 shadow-sm"
                          />
                        </div>

                        <div className="space-y-1.5 animate-fade-in">
                          <label className="block text-xs text-slate-700 font-black uppercase tracking-wider font-sans">Email</label>
                          <input 
                            type="email" 
                            required 
                            value={payerEmail}
                            onChange={(e) => {
                              setPayerEmail(e.target.value);
                              setEmailValidationTouched(true);
                            }}
                            placeholder="samantha@privatewealth.ch" 
                            className={`w-full bg-white border text-[#111111] focus:ring-4 rounded-xl px-4 py-3.5 text-xs outline-none font-bold placeholder-slate-400 transition-all duration-300 shadow-sm ${
                              emailValidationTouched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payerEmail)
                                ? "border-rose-500 focus:border-rose-600 focus:ring-rose-500/5 bg-rose-50/10"
                                : "border-[#EAEAEA] focus:border-[#F4511E] focus:ring-[#F4511E]/5"
                            }`}
                          />
                          {emailValidationTouched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payerEmail) && (
                            <p className="text-[10px] text-rose-500 font-bold tracking-tight animate-fade-in flex items-center space-x-1">
                              <span>⚠️ Please enter a valid email address (e.g. name@domain.com)</span>
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Phone Number Selector Redesign */}
                      <div className="space-y-1.5 animate-fade-in">
                        <label className="block text-xs text-slate-700 font-black uppercase tracking-wider font-sans">Phone Number</label>
                        
                        <div className="relative flex items-stretch space-x-2">
                          
                          {/* Left side: dropdown button */}
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                              className="h-full flex items-center justify-between space-x-2 px-4 border border-[#EAEAEA] hover:border-[#F4511E] rounded-xl bg-white text-xs font-bold transition-all focus:outline-none min-w-[100px] cursor-pointer"
                            >
                              <span className="text-base leading-none">{selectedCountryObj.flag}</span>
                              <span className="text-slate-800 font-mono font-bold">{selectedCountryObj.code}</span>
                              <span className="text-slate-400 text-[10px] scale-90">▼</span>
                            </button>

                            {/* Dropdown Overlay with Search */}
                            {isCountryDropdownOpen && (
                              <div className="absolute left-0 mt-2 w-72 bg-white border border-[#EAEAEA] rounded-2xl shadow-xl z-50 overflow-hidden font-sans animate-fade-in">
                                <div className="p-3 border-b border-[#F4F4F4] bg-[#FAFAFA]">
                                  <input
                                    type="text"
                                    placeholder="Search global country code..."
                                    value={countrySearchQuery}
                                    onChange={(e) => setCountrySearchQuery(e.target.value)}
                                    className="w-full bg-white border border-[#EAEAEA] rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#F4511E] font-medium"
                                  />
                                </div>
                                <div className="max-h-60 overflow-y-auto divide-y divide-[#F9F9F9]">
                                  {COUNTRIES_LIST.filter(c => 
                                    c.name.toLowerCase().includes(countrySearchQuery.toLowerCase()) || 
                                    c.code.includes(countrySearchQuery)
                                  ).map((country) => (
                                    <button
                                      type="button"
                                      key={country.name + country.code}
                                      onClick={() => {
                                        setSelectedCountryObj(country);
                                        setPayerPhone(""); // Clear number to enforce fresh length
                                        setCountrySearchQuery("");
                                        setIsCountryDropdownOpen(false);
                                      }}
                                      className="w-full flex items-center space-x-3 px-4 py-2.5 text-left text-xs text-[#111111] hover:bg-slate-50 transition font-medium cursor-pointer"
                                    >
                                      <span className="text-base">{country.flag}</span>
                                      <span className="font-mono font-bold w-12 text-slate-500">{country.code}</span>
                                      <span className="truncate text-slate-800 font-bold">{country.name}</span>
                                      <span className="text-[10px] font-mono text-slate-400 ml-auto font-medium">({country.length} d)</span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Right side: Number Input */}
                          <div className="relative flex-grow">
                            <input
                              type="tel"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              required
                              value={payerPhone}
                              onChange={(e) => {
                                const digits = e.target.value.replace(/\D/g, "");
                                const limit = selectedCountryObj.length;
                                setPayerPhone(limit ? digits.slice(0, limit) : digits);
                                setPhoneValidationTouched(true);
                              }}
                              placeholder={`Enter exactly ${selectedCountryObj.length} digits`}
                              className={`w-full bg-white border text-[#111111] focus:ring-4 rounded-xl px-4 py-3.5 text-xs outline-none font-mono font-bold placeholder-slate-400 transition-all duration-300 shadow-sm ${
                                phoneValidationTouched && payerPhone.length !== selectedCountryObj.length
                                  ? "border-rose-500 focus:border-rose-600 focus:ring-rose-500/5 bg-rose-50/10"
                                  : "border-[#EAEAEA] focus:border-[#F4511E] focus:ring-[#F4511E]/5"
                              }`}
                            />
                            
                            {/* Length validation count status */}
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono font-extrabold text-slate-400">
                              {payerPhone.length} / {selectedCountryObj.length}
                            </span>
                          </div>
                        </div>

                        {phoneValidationTouched && payerPhone.length !== selectedCountryObj.length && (
                          <p className="text-[10px] text-rose-500 font-bold tracking-tight animate-fade-in">
                            ⚠️ Incomplete: {selectedCountryObj.name} numbers require exactly {selectedCountryObj.length} digits after country code.
                          </p>
                        )}
                      </div>

                      {/* TWO PREMIUM GLASSMORPHIC TEXT AREAS */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                        
                        {/* Area 1: Prayer */}
                        <div className="space-y-1.5 animate-fade-in">
                          <label className="block text-xs text-slate-700 font-black uppercase tracking-wider font-sans">
                            Prayer for the Charity Foundation
                          </label>
                          <textarea 
                            rows={3}
                            value={payerPrayer}
                            onChange={(e) => setPayerPrayer(e.target.value)}
                            placeholder="Share your spiritual prayers and blessings for the protection of East African children..." 
                            className="w-full bg-white/70 backdrop-blur-md border border-[#EAEAEA] text-[#111111] focus:border-[#F4511E] focus:ring-4 focus:ring-[#F4511E]/5 rounded-xl px-4 py-3.5 text-xs outline-none font-medium placeholder-slate-400 shadow-[0_4px_16px_rgba(0,0,0,0.02)] transition duration-300"
                          />
                        </div>

                        {/* Area 2: Wishes */}
                        <div className="space-y-1.5 animate-fade-in">
                          <label className="block text-xs text-slate-700 font-black uppercase tracking-wider font-sans">
                            Your Wishes
                          </label>
                          <textarea 
                            rows={3}
                            value={payerWishes}
                            onChange={(e) => setPayerWishes(e.target.value)}
                            placeholder="State your operational wishes, desired outcomes, or target milestones for this contribution..." 
                            className="w-full bg-white/70 backdrop-blur-md border border-[#EAEAEA] text-[#111111] focus:border-[#F4511E] focus:ring-4 focus:ring-[#F4511E]/5 rounded-xl px-4 py-3.5 text-xs outline-none font-medium placeholder-slate-400 shadow-[0_4px_16px_rgba(0,0,0,0.02)] transition duration-300"
                          />
                        </div>
                      </div>

                    </div>

                    {/* SINGLE PREMIUM 3D SUBMISSION CTA */}
                    <div className="pt-6 border-t border-[#EAEAEA]">
                      <button 
                        type="submit" 
                        className="group relative w-full inline-flex items-center justify-center font-sans font-black tracking-widest uppercase rounded-full text-white overflow-visible transition-all duration-300 active:scale-[0.98] cursor-pointer"
                        style={{
                          transform: "translateY(0px)",
                          zIndex: 1,
                        }}
                      >
                        {/* Real 3D Underlay Base */}
                        <span 
                          className="absolute inset-x-0 rounded-full bg-gradient-to-r from-[#B71C1C] via-[#C62828] to-[#9E0D00] transition-all duration-300 pointer-events-none"
                          style={{
                            bottom: "-3px",
                            top: "3px",
                            zIndex: -2,
                          }}
                        />

                        {/* Glossy Front Surface (Luxury Orange-Red Gradient) */}
                        <span className="w-full text-center bg-gradient-to-r from-[#FF6B4A] via-[#F4511E] to-[#D84315] hover:brightness-[1.04] rounded-full py-4 text-xs font-black tracking-wider transition-all duration-300 shadow-[0_5px_18px_rgba(244,81,30,0.35)] flex items-center justify-center space-x-2.5">
                          <Heart className="w-4 h-4 text-white fill-white filter drop-shadow-[0_0_2px_rgba(255,255,255,0.7)] animate-pulse" />
                          <span>Proceed to Donate ➔</span>
                        </span>

                        {/* Floating Ambient Backlight Glow */}
                        <span className="absolute inset-0 bg-gradient-to-r from-[#FF6B4A] via-[#F4511E] to-[#D84315] opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300 pointer-events-none blur-md -z-10 shadow-[0_0_28px_rgba(244,81,30,0.85)]" />
                      </button>
                    </div>

                  </form>
                </div>

              </div>
            )}

          </div>
        </div>

        {/* PREMIUM WHATSAPP OPTIONS MODAL ROW */}
        <AnimatePresence>
          {showPaymentPopup && (
            <div 
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-[9999] flex items-center justify-center p-4 font-sans"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative w-full max-w-lg bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden border border-slate-200/45 shadow-[0_24px_80px_rgba(244,81,30,0.18)] p-8 md:p-10 text-center space-y-6"
              >
                {/* Close button */}
                <button
                  type="button"
                  onClick={() => setShowPaymentPopup(false)}
                  className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-[#F4511E]/10 flex items-center justify-center mx-auto text-[#F4511E] mb-2 animate-pulse">
                    <Shield className="w-6 h-6" />
                  </div>
                  <p className="text-[10px] font-mono tracking-widest uppercase font-extrabold text-[#F4511E]">// SECURE PAYMENTS ALLOCATION</p>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Select Sovereign Settlement Rail</h3>
                  <p className="text-xs text-slate-550 max-w-md mx-auto leading-relaxed">
                    You are clearing an allocation of <strong className="text-rose-600 font-extrabold font-mono">${Number(donateAmount).toLocaleString()} USD</strong>. Please choose your security routing protocol below.
                  </p>
                </div>

                {/* Options List */}
                <div className="space-y-4 pt-1">
                  
                  {/* Bank Wire Option */}
                  <button
                    type="button"
                    onClick={() => handlePaymentOptionSelect("bank")}
                    className="group w-full p-4.5 rounded-2xl border border-slate-150/80 hover:border-[#F4511E]/50 bg-white hover:bg-slate-50 flex items-center space-x-4 text-left transition duration-300 shadow-sm cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-xl bg-orange-50 text-[#F4511E] group-hover:bg-[#F4511E] group-hover:text-white flex items-center justify-center transition duration-300 shadow-inner">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-grow">
                      <strong className="block text-xs uppercase font-mono tracking-wider font-extrabold text-slate-900">Pay with Bank Transfer</strong>
                      <span className="block text-[10px] text-slate-500 font-medium">Clear routing through the Geneva Sovereign Wealth Desk</span>
                    </div>
                    <span className="text-slate-300 group-hover:text-[#F4511E] transition transform group-hover:translate-x-1">➔</span>
                  </button>

                  {/* Crypto Option */}
                  <button
                    type="button"
                    onClick={() => handlePaymentOptionSelect("crypto")}
                    className="group w-full p-4.5 rounded-2xl border border-slate-150/80 hover:border-[#F4511E]/50 bg-white hover:bg-slate-50 flex items-center space-x-4 text-left transition duration-300 shadow-sm cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-500 group-hover:bg-[#F4511E] group-hover:text-white flex items-center justify-center transition duration-300 shadow-inner">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div className="flex-grow">
                      <strong className="block text-xs uppercase font-mono tracking-wider font-extrabold text-slate-900">Pay with Crypto</strong>
                      <span className="block text-[10px] text-slate-500 font-medium">USDT/BTC encrypted decentralized direct wallet ledger</span>
                    </div>
                    <span className="text-slate-300 group-hover:text-[#F4511E] transition transform group-hover:translate-x-1">➔</span>
                  </button>

                </div>

                {/* Footnote information */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-center space-x-2 text-[10px] text-slate-400 font-bold uppercase font-mono tracking-wider">
                  <Lock className="w-3.5 h-3.5 text-emerald-500" />
                  <span>256-Bit SSL Secured Link Routing</span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    )}


      {/* 5. STATE-BACKED COMMENTARY PAGE */}
      {activePage === "commentary" && (
        <div className="max-w-7xl mx-auto px-4 py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 font-sans">
          
          {/* Side parameters and stats */}
          <div className="lg:col-span-4 space-y-6">
            <span className="text-[#F4511E] font-mono text-xs uppercase tracking-widest font-black">// COOPERATIVE LIVE DIALOGUE</span>
            <h1 className="text-4xl font-extrabold text-[#111111] leading-tight">Reviews & Public Statements</h1>
            <p className="text-slate-500 text-xs font-medium leading-relaxed">
              Sustained dialogue built directly from field medical caravans, engineering drill units, local agricultural guilds, and direct student beneficiaries.
            </p>

            <div className="bg-[#111111] text-white p-6 rounded-3xl space-y-4 border-l-4 border-[#F4511E] shadow-sm">
              <span className="text-xs uppercase font-mono font-bold block text-[#F4511E]">Active Tele-Metric Index</span>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-white/5 pb-1.5 font-mono">
                  <span className="text-slate-400">Compiled Comments:</span>
                  <span className="font-bold text-white">{allComments.length} Records</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5 font-mono">
                  <span className="text-slate-400">Donor Testimonials:</span>
                  <span className="font-bold text-white">{allComments.filter(c => c.role === "Donor").length} Items</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5 font-mono">
                  <span className="text-slate-400">Direct Beneficiary:</span>
                  <span className="font-bold text-white">{allComments.filter(c => c.role === "Beneficiary").length} Items</span>
                </div>
              </div>
            </div>

            {/* Quick Comment submission form */}
            <form onSubmit={handleAddComment} className="bg-white p-6 rounded-3xl border border-[#EAEAEA] space-y-4 shadow-xl">
              <h4 className="font-sans font-extrabold text-[#111111] text-sm uppercase tracking-tight">Add Your Statement of Solidarity</h4>
              
              <div>
                <label className="block text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider font-mono">FullName</label>
                <input 
                  type="text" 
                  value={newCommentName}
                  onChange={(e) => setNewCommentName(e.target.value)}
                  placeholder="Sir Walter Cunningham" 
                  className="w-full bg-white border border-[#EAEAEA] focus:border-[#F4511E] text-[#111111] px-3 py-2 rounded-xl text-xs outline-none font-bold" 
                  required 
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider font-mono">Your Action Role</label>
                <select 
                  value={newCommentRole}
                  onChange={(e) => setNewCommentRole(e.target.value as any)}
                  className="w-full bg-white border border-[#EAEAEA] focus:border-[#F4511E] text-[#111111] px-3 py-2 rounded-xl text-xs outline-none font-bold"
                >
                  <option value="Donor">Donor Supporter</option>
                  <option value="Volunteer">Field Volunteer Coordinator</option>
                  <option value="Beneficiary">Certified Beneficiary</option>
                  <option value="Supporter">Humanitarian Advocate</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider font-mono">Country Location</label>
                <input 
                  type="text" 
                  value={newCommentCountry}
                  onChange={(e) => setNewCommentCountry(e.target.value)}
                  placeholder="United Kingdom" 
                  className="w-full bg-white border border-[#EAEAEA] focus:border-[#F4511E] text-[#111111] px-3 py-2 rounded-xl text-xs outline-none font-bold" 
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 font-mono font-bold mb-1 uppercase tracking-wider">Statement Rating (Stars)</label>
                <select 
                  value={newCommentRating}
                  onChange={(e) => setNewCommentRating(Number(e.target.value))}
                  className="w-full bg-white border border-[#EAEAEA] focus:border-[#F4511E] text-[#F4511E] px-3 py-2 rounded-xl text-xs font-mono font-bold outline-none"
                >
                  <option value={5}>★★★★★ (5 Stars)</option>
                  <option value={4}>★★★★ (4 Stars)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider font-mono">Comments Text Block</label>
                <textarea 
                  rows={3}
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Share details of your coordination/support..." 
                  className="w-full bg-white border border-[#EAEAEA] focus:border-[#F4511E] text-[#111111] px-3 py-2 rounded-xl text-xs outline-none" 
                  required
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#F4511E] hover:bg-[#D84315] text-white font-bold text-xs uppercase tracking-widest py-3 rounded-xl transition duration-300 cursor-pointer"
              >
                Transmit Public Record
              </button>
            </form>
          </div>

          {/* Main commentary Feed, Sorts, Infinite Lists */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Search/Filter Controls Bar */}
            <div className="bg-white border border-[#EAEAEA] p-5 rounded-3xl shadow-md flex flex-wrap gap-4 items-center justify-between">
              <div className="relative flex-1 min-w-[200px]">
                <input 
                  type="text" 
                  placeholder="Search statements e.g., 'waterborne', 'caravan', 'doctor'..." 
                  value={commentSearch}
                  onChange={(e) => { setCommentSearch(e.target.value); setCommentPage(1); }}
                  className="w-full px-3 py-2.5 pl-9 bg-white border border-[#EAEAEA] focus:border-[#F4511E] text-[#111111] text-xs rounded-xl outline-none"
                />
                <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
              </div>

              <div className="flex items-center space-x-3 text-xs">
                <select 
                  value={commentRoleFilter}
                  onChange={(e) => { setCommentRoleFilter(e.target.value); setCommentPage(1); }}
                  className="bg-white border border-[#EAEAEA] text-[#111111] px-3 py-2.5 rounded-xl outline-none"
                >
                  <option value="All">All Roles</option>
                  <option value="Donor">Donors</option>
                  <option value="Volunteer">Volunteers</option>
                  <option value="Beneficiary">Beneficiaries</option>
                  <option value="Supporter">Supporters</option>
                </select>

                <select 
                  value={commentSort}
                  onChange={(e) => { setCommentSort(e.target.value as any); setCommentPage(1); }}
                  className="bg-white border border-[#EAEAEA] text-[#111111] px-3 py-2.5 rounded-xl outline-none"
                >
                  <option value="highest">Most Liked First</option>
                  <option value="latest">Latest Date First</option>
                </select>
              </div>
            </div>

            <p className="text-[10px] uppercase font-mono text-[#F4511E] font-bold tracking-widest">
              Found {filteredComments.length} active statements
            </p>

            {/* Simulated scroll list of compiled responses */}
            <div className="space-y-4">
              {paginatedComments.length === 0 ? (
                <div className="text-center py-12 bg-white border border-[#EAEAEA] rounded-3xl text-xs text-slate-400 font-medium">
                  No matches found for active filters. Try refining your keyword search.
                </div>
              ) : (
                paginatedComments.map((comment) => (
                  <div key={comment.id} className="bg-white border border-[#EAEAEA] p-6 rounded-3xl shadow-sm space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <img src={comment.avatarUrl} alt={comment.name} className="w-10 h-10 rounded-full border-2 border-[#F4511E]" />
                        <div>
                          <span className="font-sans font-extrabold text-[#111111] text-sm block leading-none">{comment.name}</span>
                          <span className="text-[10px] text-[#F4511E] font-mono uppercase tracking-widest font-extrabold">{comment.role} • {comment.country}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono font-bold">{comment.date}</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                      {comment.text}
                    </p>

                    <div className="flex items-center justify-between border-t border-[#EAEAEA] pt-3">
                      <div className="flex items-center space-x-1.5">
                        {[...Array(comment.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current text-[#F4511E]" />
                        ))}
                      </div>

                      <div className="flex space-x-4 text-[10px]">
                        <button 
                          onClick={() => handleLikeComment(comment.id)} 
                          className="flex items-center space-x-1 hover:text-[#F4511E] transition-colors text-slate-400 cursor-pointer font-bold"
                        >
                          <ThumbsUp className={`w-3.5 h-3.5 ${comment.likedByUser ? "fill-current text-[#F4511E]" : ""}`} />
                          <span>Solidarity ({comment.likes})</span>
                        </button>
                      </div>
                    </div>

                    {/* Inline Official Foundation Reply */}
                    {comment.replies.map((rep, idx) => (
                      <div key={idx} className="bg-[#FAFAFA] p-4 rounded-2xl ml-8 border-l-4 border-[#F4511E] flex items-start space-x-3">
                        <img src={rep.avatarUrl} alt={rep.name} className="w-8 h-8 rounded-full border border-[#F4511E]" />
                        <div className="text-[11px]">
                          <span className="font-extrabold text-[#111111] block">{rep.name}</span>
                          <span className="text-[9px] uppercase font-mono tracking-widest text-[#F4511E] block mb-1 font-bold">Official Response</span>
                          <p className="text-slate-500 font-medium">{rep.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>

            {/* Load More Pagination */}
            {filteredComments.length > paginatedComments.length && (
              <div className="text-center pt-4">
                <button 
                  onClick={() => setCommentPage(prev => prev + 1)}
                  className="bg-white text-[#F4511E] hover:bg-[#F4511E] hover:text-white font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full border border-[#F4511E] transition duration-300 cursor-pointer"
                >
                  Load More Dialogues
                </button>
              </div>
            )}
          </div>
        </div>
      )}


      {/* 6. OTHER SUPPORTED PAGES GENERAL PRESET LAYOUT */}
      {activePage !== "home" && activePage !== "about" && activePage !== "mission" && activePage !== "leadership" && activePage !== "testimonials" && activePage !== "campaigns" && activePage !== "emergency-relief" && activePage !== "scholarships" && activePage !== "water-projects" && activePage !== "donate" && activePage !== "commentary" && 
       activePage !== "hiv-support" && activePage !== "halfway-house" && activePage !== "vulnerable-foreigners" && activePage !== "seminar-request" && activePage !== "health-ambassadors" && activePage !== "children-home" && activePage !== "shelter-placement" && activePage !== "medical-care" && activePage !== "mother-child" && activePage !== "visit-care" && activePage !== "careers" && activePage !== "contact" && activePage !== "faq" && (
        <div className="max-w-4xl mx-auto px-4 py-24 space-y-10 font-sans">
          <div className="text-center space-y-3">
            <span className="text-[#F4511E] bg-[#F4511E]/10 border border-[#F4511E]/20 text-[9px] px-3.5 py-1.5 uppercase font-mono rounded-full font-black">FAZZA VERIFIED SYSTEM PATH</span>
            <h1 className="text-4xl font-extrabold text-[#111111] uppercase tracking-tight">{activePage.replace("-", " ")}</h1>
            <p className="text-slate-500 text-xs font-semibold">Official documentation, application parameters, and active field statistics.</p>
          </div>

          {/* DYNAMIC FORMS ACCORDING TO PAGES REQUESTS */}
          {activePage === "volunteer" && (
            <div className="bg-white border border-[#EAEAEA] p-8 rounded-3xl shadow-xl space-y-6">
              <h3 className="font-sans font-extrabold text-[#111111] text-xl">Submit Volunteer Credentials</h3>
              {volunteerRegistered ? (
                <div className="text-center py-6 text-emerald-500">
                  <CheckCircle className="w-12 h-12 mx-auto mb-3" />
                  <p className="font-bold">Volunteer Application Transmitted Successfully!</p>
                  <p className="text-xs text-slate-400 mt-1">Our HR Logistics crew will connect over your coordinates inside 7 business days.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setVolunteerRegistered(true); }} className="space-y-4 text-xs font-sans">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-500 block mb-1 font-bold">Full Identity Name</label>
                      <input type="text" required value={volunteerName} onChange={(e) => setVolunteerName(e.target.value)} className="w-full bg-white border border-[#EAEAEA] focus:border-[#F4511E] text-[#111111] font-bold rounded-xl py-2.5 px-4 outline-none transition placeholder-slate-400" placeholder="Elizabeth Cunningham" />
                    </div>
                    <div>
                      <label className="text-slate-500 block mb-1 font-bold">Target Skill Bracket</label>
                      <select value={volunteerSkill} onChange={(e) => setVolunteerSkill(e.target.value)} className="w-full bg-white border border-[#EAEAEA] focus:border-[#F4511E] text-[#111111] font-bold rounded-xl py-2.5 px-4 outline-none">
                        <option>Medical Triage</option>
                        <option>Logistics Truck Driver</option>
                        <option>Language Translator</option>
                        <option>Social Teacher Representative</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-slate-500 block mb-1 font-bold">Time Commitment Schedule</label>
                    <input type="text" required value={volunteerHours} onChange={(e) => setVolunteerHours(e.target.value)} className="w-full bg-white border border-[#EAEAEA] focus:border-[#F4511E] text-[#111111] font-bold rounded-xl py-2.5 px-4 outline-none transition placeholder-slate-400" placeholder="2 weeks active caravan deployment" />
                  </div>
                  <button type="submit" className="w-full bg-[#F4511E] hover:bg-[#D84315] text-white py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition duration-300 cursor-pointer">Submit Field Coordinates</button>
                </form>
              )}
            </div>
          )}

          {activePage === "partner" && (
            <div className="bg-white border border-[#EAEAEA] p-8 rounded-3xl shadow-xl space-y-6">
              <h3 className="font-sans font-extrabold text-[#111111] text-xl">Corporate Partner Guild</h3>
              {partnerSuccess ? (
                <p className="text-center py-6 text-emerald-500 font-bold">Cooperative Proposal Forwarded to President's Desk!</p>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setPartnerSuccess(true); }} className="space-y-4 text-xs font-sans">
                  <div>
                    <label className="text-slate-500 block mb-1 font-bold font-sans">Institution / Organization Name</label>
                    <input type="text" required value={partnerOrg} onChange={(e) => setPartnerOrg(e.target.value)} className="w-full bg-white border border-[#EAEAEA] focus:border-[#F4511E] text-[#111111] font-bold rounded-xl py-2.5 px-4 transition outline-none placeholder-slate-400" placeholder="The AstraZeneca Foundation" />
                  </div>
                  <button type="submit" className="w-full bg-[#F4511E] hover:bg-[#D84315] text-white py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition duration-300 cursor-pointer">Execute Alliance Inquiry</button>
                </form>
              )}
            </div>
          )}

          {activePage === "careers" && (
            <div className="bg-white border border-[#EAEAEA] p-8 rounded-3xl shadow-xl space-y-6 text-xs font-sans">
              <h3 className="font-sans font-extrabold text-[#111111] text-xl">Active Human Resources Listings</h3>
              <div className="space-y-3">
                <div className="p-4 bg-[#FAFAFA] rounded-2xl flex justify-between items-center border border-[#EAEAEA]">
                  <div>
                    <span className="font-extrabold text-sm block text-[#111111]">Director of Field Logistics - East Africa Caravan</span>
                    <span className="text-slate-400 font-semibold">Nairobi Headquarters Office • Full-time Contract</span>
                  </div>
                  <button onClick={() => { setCareerRole("Director of Field Logistics"); setCareerSubmitted(true); }} className="bg-[#F4511E] hover:bg-[#D84315] text-white px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer">Apply Now</button>
                </div>
                <div className="p-4 bg-[#FAFAFA] rounded-2xl flex justify-between items-center border border-[#EAEAEA]">
                  <div>
                    <span className="font-extrabold text-sm block text-[#111111]">Senior Specialist Ophthalmic Surgeon</span>
                    <span className="text-slate-400 font-semibold">Yemen Mobile Caravans • Multi-week Deployment Rotations</span>
                  </div>
                  <button onClick={() => { setCareerRole("Senior Ophthalmic Surgeon"); setCareerSubmitted(true); }} className="bg-[#F4511E] hover:bg-[#D84315] text-white px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer">Apply Now</button>
                </div>
              </div>
              {careerSubmitted && <p className="text-emerald-500 font-bold text-center">Your interest draft for: {careerRole} has been compiled.</p>}
            </div>
          )}

          {/* DYNAMIC INFORMATION RENDERERS */}
          {activePage === "stories" && (
            <div className="space-y-6 font-sans">
              {SUCCESS_STORIES.map(story => (
                <div key={story.id} className="bg-white border border-[#EAEAEA] rounded-3xl p-6 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <img src={story.imageUrl} alt={story.title} className="rounded-2xl h-64 w-full object-cover shadow-sm hover:scale-[1.01] transition duration-300" />
                  <div className="space-y-3 text-xs">
                    <span className="text-[#F4511E] font-mono font-black uppercase tracking-widest">{story.impactMetrics}</span>
                    <h3 className="font-sans font-extrabold text-[#111111] text-lg leading-tight">{story.title}</h3>
                    <p className="font-sans font-extrabold text-slate-600">Beneficiary: {story.beneficiary} ({story.location})</p>
                    <p className="text-slate-400 font-medium">**Situation Before:** {story.storyBefore}</p>
                    <p className="text-slate-600 leading-relaxed font-semibold">**Outcome After:** {story.storyAfter}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activePage === "blog" && (
            <div className="space-y-8 font-sans">
              {BLOG_POSTS.map(post => (
                <div key={post.id} className="bg-white border border-[#EAEAEA] rounded-3xl overflow-hidden shadow-lg p-6 space-y-4">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-60 object-cover rounded-xl" />
                  <div className="text-xs space-y-2">
                    <div className="flex items-center space-x-2 text-slate-400 font-mono font-bold">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="font-sans font-extrabold text-[#111111] text-xl leading-tight">{post.title}</h3>
                    <p className="text-slate-500 font-bold">Author: {post.author} ({post.role})</p>
                    <p className="text-slate-600 leading-relaxed font-medium">{post.content}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {post.tags.map((t, i) => (
                        <span key={i} className="bg-white border border-[#EAEAEA] text-[#F4511E] rounded-full px-3 py-1 text-[10px] uppercase font-mono font-bold">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activePage === "events" && (
            <div className="space-y-6 font-sans">
              {EVENTS.map(ev => (
                <div key={ev.id} className="bg-white border border-[#EAEAEA] p-6 rounded-3xl shadow-md flex items-center space-x-6 text-xs">
                  <img src={ev.imageUrl} alt={ev.title} className="w-24 h-24 rounded-2xl object-cover" />
                  <div className="space-y-1">
                    <span className="text-[#F4511E] font-extrabold block">{ev.date} at {ev.time}</span>
                    <h3 className="font-sans font-extrabold text-sm text-[#111111]">{ev.title}</h3>
                    <p className="text-slate-400 font-bold"><MapPin className="w-3 h-3 inline mr-1" /> {ev.location}</p>
                    <p className="text-slate-500 font-medium">{ev.description}</p>
                    <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-mono inline-block mt-2 font-bold">Slots Available: {ev.slotsAvailable}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activePage === "gallery" && (
            <div className="space-y-6 font-sans">
              <div className="flex justify-center space-x-3 text-xs mb-6">
                {["All", "Education", "Medical", "Water Projects", "Empowerment"].map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => setGalleryCategory(cat)}
                    className={`px-4 py-1.5 rounded-full border transition cursor-pointer font-bold duration-300 ${galleryCategory === cat ? "bg-[#F4511E] text-white border-[#F4511E]" : "bg-white border-[#EAEAEA] text-slate-600 hover:border-[#F4511E]"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galleryItems.filter(item => galleryCategory === "All" || item.cat === galleryCategory).map((item, i) => (
                  <div key={i} className="relative group cursor-pointer overflow-hidden rounded-2xl border border-[#EAEAEA]" onClick={() => setSelectedGalleryImg(item.img)}>
                    <img src={item.img} alt={item.title} className="w-full h-40 object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute inset-0 bg-[#111111]/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                      <Search className="w-6 h-6 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AUDITS & TRANSPARENCY PRESET FILE GRIDS */}
          {(activePage === "annual-reports" || activePage === "financial-transparency") && (
            <div className="bg-white border border-[#EAEAEA] rounded-3xl p-8 shadow-xl space-y-6 font-sans">
              <h3 className="font-sans font-extrabold text-[#111111] text-xl">Full Audit Statement Ledger (Internal Endowment Covered)</h3>
              <p className="text-xs text-slate-500 font-medium">We verify EY audits annually. 100% of community contributions go strictly to materials.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="#view" onClick={(e) => { e.preventDefault(); alert("Opening Secure PDF simulation: 'Fiscal 2025 Financial Statement - EY Verified'"); }} className="p-4 bg-[#FAFAFA] hover:bg-white rounded-2xl border border-[#EAEAEA] flex items-center justify-between text-xs text-slate-800 transition duration-300">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-6 h-6 text-[#F4511E]" />
                    <div>
                      <span className="font-bold block text-[#111111]">Annual Statement 2025</span>
                      <span className="text-slate-400 font-medium">Verifying 93.8% direct efficiency ratio</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#F4511E]" />
                </a>
                <a href="#view" onClick={(e) => { e.preventDefault(); alert("Opening PDF Simulator: 'Operations Report 2024'"); }} className="p-4 bg-[#FAFAFA] hover:bg-white rounded-2xl border border-[#EAEAEA] flex items-center justify-between text-xs text-slate-800 transition duration-300">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-6 h-6 text-[#F4511E]" />
                    <div>
                      <span className="font-bold block text-[#111111]">Field Operations Report 2024</span>
                      <span className="text-slate-400 font-medium">Geo-satellite coordinates of wells and mobile clinics</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#F4511E]" />
                </a>
              </div>
            </div>
          )}

          {/* FAQ INTERACTIVE PORTAL */}
          {activePage === "faq" && (
            <div className="space-y-12 font-sans">
              <div className="space-y-4">
                {FAQS.map((item, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div 
                      key={idx}
                      className="bg-white border border-[#EAEAEA] rounded-3xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md hover:border-slate-300"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full text-left p-6 font-extrabold text-[#111111] text-sm md:text-base flex justify-between items-center bg-[#FAFAFA]/40 hover:bg-[#FAFAFA] transition-colors focus:outline-none"
                      >
                        <span>{item.question}</span>
                        <ChevronRight className={`w-5 h-5 text-[#F4511E] transition-transform duration-300 ${isOpen ? "rotate-90 text-[#D84315]" : ""}`} />
                      </button>
                      
                      {isOpen && (
                        <div className="p-6 pt-2 text-[#4A5568] text-xs md:text-sm leading-relaxed border-t border-slate-50 font-medium bg-white">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Direct Support Inquiries Cards (Humanitarian Desk) */}
              <div className="border-t border-[#EAEAEA] pt-12 space-y-8">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <span className="text-[#F4511E] font-mono text-[10px] uppercase tracking-widest font-black block">Direct Support Inquiries</span>
                  <h2 className="text-2xl font-black text-[#111111] uppercase tracking-tight">Direct Liaison Desk</h2>
                  <p className="text-xs text-slate-500 font-medium font-sans">Inquire with the official administration desk and rapid humanitarian response desk.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* WhatsApp Support Card */}
                  <a 
                    href={`https://wa.me/12272664466?text=${encodeURIComponent("Hello Prince Fazza Charity Foundation, thank you for your humanitarian work and support for humanity. I would like to make an inquiry and learn more about your programs.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border border-[#EAEAEA] p-6 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500 group flex items-start space-x-4 text-left"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 flex-shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 overflow-hidden">
                      <h4 className="font-extrabold text-[#111111] text-sm group-hover:text-emerald-600 transition-colors">Direct WhatsApp Hotline</h4>
                      <p className="text-slate-400 text-[11px] leading-relaxed font-medium">Chat directly on WhatsApp to get immediate answers, sponsorship clarifications, or coordinate emergency actions.</p>
                      <span className="text-xs text-[#111111] font-bold block mt-3 font-mono tracking-tight group-hover:text-emerald-500">+1 (227) 266-4466</span>
                    </div>
                  </a>

                  {/* Email Support Card */}
                  <a 
                    href="mailto:theroyalpalace6@gmail.com"
                    className="bg-white border border-[#EAEAEA] p-6 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F4511E] group flex items-start space-x-4 text-left"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#F4511E]/10 text-[#F4511E] flex items-center justify-center group-hover:bg-[#F4511E] group-hover:text-white transition-all duration-300 flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 overflow-hidden">
                      <h4 className="font-extrabold text-[#111111] text-sm group-hover:text-[#F4511E] transition-colors">Official Administrative Desk</h4>
                      <p className="text-slate-400 text-[11px] leading-relaxed font-medium">For formal proposals, institutional partnerships, sovereign grants, or detailed media inquiries, transmit to our desk.</p>
                      <span className="text-xs text-[#111111] font-bold block mt-3 font-mono tracking-tight group-hover:text-[#F4511E] break-all">theroyalpalace6@gmail.com</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* DEFAULT INNER PAGES GENERATOR FOR THE REMAINING 35 PAGES */}
          {activePage !== "faq" && (
            <div className="bg-[#FAFAFA] border border-[#EAEAEA] p-6 rounded-3xl text-xs space-y-2 text-slate-500 font-sans">
              <p className="font-extrabold text-[#111111] uppercase font-sans tracking-wider text-[10px]">Fazza Compliance Statement</p>
              <p className="font-medium leading-relaxed">
                All active areas are verified and compiled under the supervision of H.H Prince Fazza Charity Foundation. Continuous logistics, educational scholarships, agricultural microgrants, and trauma shelters are arranged in strict alignment with United Nations Sustainable Development Guidelines target matrices. For immediate emergency triage support, coordinate with our logistics base via the contact parameters.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 7. DEDICATED SUB-PAGES COMPONENT */}
      {(activePage === "hiv-support" || activePage === "halfway-house" || activePage === "vulnerable-foreigners" || activePage === "seminar-request" || activePage === "health-ambassadors" || activePage === "children-home" || activePage === "shelter-placement" || activePage === "medical-care" || activePage === "mother-child" || activePage === "visit-care" || activePage === "careers" || activePage === "contact" || activePage === "faq") && (
        <div className="bg-white min-h-screen">
          <PageHeader page={activePage} lang={lang} />
          <ServicePages 
            activePage={activePage} 
            lang={lang} 
            openDonateModal={() => { handlePageChange("donate"); setDonationStep(1); }}
            setActivePage={handlePageChange}
          />
        </div>
      )}
        </motion.div>
      </AnimatePresence>


      {/* ========================================================
          GLOBAL TRUSTED FOOTER
          ======================================================== */}
      <footer className="bg-slate-950 text-white/50 py-12 px-6 border-t border-white/5 text-xs font-sans">
        <div className="max-w-7xl mx-auto mb-10 pb-10 border-b border-white/5 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div>
            <span className="text-[#F4511E] font-mono text-[9px] uppercase tracking-widest font-black block mb-1">Direct Liaison Desk</span>
            <h3 className="text-lg font-sans font-black text-white uppercase tracking-tight">Direct Connection Channels</h3>
            <p className="text-zinc-500 text-xs mt-1 font-medium">Coordinate directly with our sovereign administration office and rapid humanitarian response crew.</p>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email Card */}
            <a 
              href="mailto:theroyalpalace6@gmail.com"
              className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex items-center space-x-4 transition-all duration-300 hover:bg-white/[0.04] hover:border-zinc-700 group hover:scale-[1.01]"
            >
              <div className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center text-zinc-300 group-hover:bg-[#F4511E]/10 group-hover:text-[#F4511E] transition-colors flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[9px] text-zinc-500 font-mono font-black uppercase block tracking-wider group-hover:text-[#F4511E] transition-colors">Official Email Desk</span>
                <span className="text-xs text-white font-black truncate block mt-0.5">theroyalpalace6@gmail.com</span>
              </div>
            </a>

            {/* WhatsApp Contact Card */}
            <a 
              href={`https://wa.me/12272664466?text=${encodeURIComponent("Hello Prince Fazza Charity Foundation, thank you for your humanitarian work and support for humanity. I would like to make an inquiry and learn more about your programs.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex items-center space-x-4 transition-all duration-300 hover:bg-white/[0.04] hover:border-emerald-500 group hover:scale-[1.01]"
            >
              <div className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center text-zinc-300 group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-colors flex-shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] text-zinc-500 font-mono font-black uppercase block tracking-wider group-hover:text-emerald-500 transition-colors">Humanitarian Support Hotline</span>
                <span className="text-xs text-white font-black block mt-0.5 tracking-tight">+1 (227) 266-4466</span>
              </div>
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <button
              onClick={() => handlePageChange("home")}
              className="flex items-center text-left focus:outline-none transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              {logoFailed ? (
                <div className="flex items-center space-x-2.5 font-sans font-black text-sm uppercase tracking-wider text-[#F4511E] py-4">
                  <div className="w-10 h-10 rounded-full bg-[#F4511E] flex items-center justify-center text-white text-xs font-black">
                    FZ
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs text-white leading-none">PRINCE FAZZA</span>
                    <span className="text-[9px] text-[#F4511E] leading-none uppercase font-extrabold tracking-widest mt-1">CHARITY FOUNDATION</span>
                  </div>
                </div>
              ) : (
                <img
                  src="https://i.imgur.com/eNBSRt4.png"
                  alt="Prince Fazza Charity Foundation Official Footer Logo"
                  referrerPolicy="no-referrer"
                  onError={() => setLogoFailed(true)}
                  className="h-[140px] w-auto object-contain filter brightness-110 drop-shadow-[0_2px_8px_rgba(255,255,255,0.01)]"
                />
              )}
            </button>
            <p className="text-[11.5px] text-zinc-400 max-w-xs leading-relaxed font-medium">
              An elite international humanitarian 501(c)(3) nonprofit dedicated to child sponsoring, professional surgical caravans, women crop enterprises, and solar underground wells.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-sans font-extrabold text-white uppercase tracking-wider">Major Hub Initiatives</h4>
            <div className="flex flex-col space-y-1.5 text-zinc-400">
              <button onClick={() => handlePageChange("water-projects")} className="text-left hover:text-[#F4511E] transition-colors cursor-pointer">Solar Pure Aquifers</button>
              <button onClick={() => handlePageChange("scholarships")} className="text-left hover:text-[#F4511E] transition-colors cursor-pointer">Academic Learning Sponsoring</button>
              <button onClick={() => handlePageChange("emergency-relief")} className="text-left hover:text-[#F4511E] transition-colors cursor-pointer">Crisis Shield Triage</button>
              <button onClick={() => handlePageChange("commentary")} className="text-left hover:text-[#F4511E] transition-colors cursor-pointer">60 Public Dialogue Reviews</button>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-sans font-extrabold text-white uppercase tracking-wider">Compliance Trust</h4>
            <div className="flex flex-col space-y-1.5 text-zinc-400">
              <button onClick={() => handlePageChange("annual-reports")} className="text-left hover:text-[#F4511E] transition-colors cursor-pointer">Annual Financial Audit</button>
              <button onClick={() => handlePageChange("financial-transparency")} className="text-left hover:text-[#F4511E] transition-colors cursor-pointer">Zero fee leaks schema</button>
              <button onClick={() => handlePageChange("privacy")} className="text-left hover:text-[#F4511E] transition-colors cursor-pointer">Privacy and Cookie Terms</button>
              <span className="text-[10px] text-zinc-500 font-mono font-bold">Charity Registration ID: 41-4112NY01</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-sans font-extrabold text-white uppercase tracking-wider">Direct News Stream</h4>
            <p className="text-[11px] text-zinc-400">Submit coordinates to capture official relief announcements of the Presidency.</p>
            {newsSigned ? (
              <p className="text-emerald-500 font-extrabold">Mailbox registered.</p>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setNewsSigned(true); }} className="flex">
                <input 
                  type="email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="name@charity.com" 
                  className="bg-slate-900 border border-white/10 px-3 py-1.5 text-[11px] text-white rounded-l-lg outline-none w-full font-bold focus:border-[#F4511E]"
                  required 
                />
                <button type="submit" className="bg-[#F4511E] hover:bg-white hover:text-slate-950 text-white font-extrabold px-3.5 rounded-r-lg transition duration-300 cursor-pointer">➔</button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center text-[10px] text-zinc-500 flex flex-col md:flex-row justify-between max-w-7xl mx-auto">
          <span>&copy; 2026 Prince Fazza Charity Foundation in New York. All registered rights compilation secure. 501(c)(3) Tax-Exempt Status.</span>
          <div className="space-x-4 mt-2 md:mt-0">
            <button onClick={() => handlePageChange("privacy")} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => handlePageChange("terms")} className="hover:text-white transition-colors">Terms of Association</button>
          </div>
        </div>
      </footer>

      {/* PREMIUM IMAGE PREVIEW / LIGHTBOX SYSTEM */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-xl z-[999] flex flex-col items-center justify-center p-4 md:p-8 cursor-zoom-out selection:bg-transparent"
          >
            {/* Top Controls */}
            <div className="absolute top-6 right-6 z-[1000] flex items-center space-x-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox(null);
                }}
                className="w-12 h-12 bg-white/5 hover:bg-[#F4511E] active:scale-95 text-white rounded-full flex items-center justify-center border border-white/10 transition-all shadow-xl group cursor-pointer"
              >
                <span className="text-sm font-bold font-sans group-hover:rotate-90 transition-transform duration-300">✕</span>
              </button>
            </div>

            {/* Cinematic HD Image Container */}
            <div className="relative max-w-5xl max-h-[70vh] w-full flex items-center justify-center overflow-hidden">
              <motion.img
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                transition={{ type: "spring", damping: 25, stiffness: 120 }}
                src={lightbox.url}
                alt={lightbox.alt}
                onClick={(e) => e.stopPropagation()}
                className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.8)] border border-white/10 selection:bg-transparent cursor-zoom-in transition-all duration-500 hover:scale-[1.03]"
              />
            </div>

            {/* Caption & Metadata description (humanitarian storytelling style) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className="mt-6 text-center max-w-2xl px-6"
            >
              <span className="text-[#F4511E] font-mono text-[9px] md:text-[10px] tracking-widest uppercase font-black block mb-1">
                // PRINCE FAZZA LEDGER COLLECTION
              </span>
              <h4 className="text-white font-sans font-black text-xs md:text-lg uppercase tracking-wider">
                {lightbox.alt}
              </h4>
              {lightbox.caption && (
                <p className="text-zinc-400 text-[11px] md:text-xs mt-2 font-medium leading-relaxed font-sans max-w-xl mx-auto">
                  {lightbox.caption}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
