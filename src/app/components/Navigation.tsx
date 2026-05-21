import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { Button } from "./ui/button";
import { Menu, X, Mail, ChevronDown } from "lucide-react";
import { AdmissionDialog } from "./AdmissionDialog";
import { AnimatePresence } from "motion/react";
import { supabase } from "../../lib/supabase";

const services = [
  { label: "Web Development", href: "/services/web-dev" },
  { label: "Software Development", href: "/services/soft-dev" },
  { label: "CRM Solutions", href: "/services/crm" },
  { label: "School ERP", href: "/services/erp" },
  { label: "Meta Ads & Marketing", href: "/services/meta-ads" },
  { label: "Graphic Design", href: "/services/graphic-design" },
  { label: "App Development", href: "/services/app-dev" },
  { label: "E-commerce Solutions", href: "/services/ecommerce" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services", subLinks: services },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

interface NavigationProps {
  onBookNow?: () => void;
}

export function Navigation({ onBookNow }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  
  // Top bar announcement config
  const [topBar, setTopBar] = useState<{
    visible: boolean;
    text: string;
    btnText: string;
    linkUrl: string;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (!topBar?.visible) return;

    const checkOverflow = () => {
      if (containerRef.current && contentRef.current) {
        // Temporarily reset styles to measure correctly
        const prevTransform = contentRef.current.style.transform;
        contentRef.current.style.transform = 'none';
        
        const containerWidth = containerRef.current.getBoundingClientRect().width;
        const contentWidth = contentRef.current.scrollWidth;
        
        contentRef.current.style.transform = prevTransform;

        const diff = containerWidth - contentWidth;

        if (diff < 0) {
          setIsOverflowing(true);
          contentRef.current.style.setProperty('--scroll-dist', `${diff - 8}px`);
        } else {
          setIsOverflowing(false);
          contentRef.current.style.removeProperty('--scroll-dist');
        }
      }
    };

    // Run initial check after rendering
    const timer = setTimeout(checkOverflow, 200);
    window.addEventListener('resize', checkOverflow);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkOverflow);
    };
  }, [topBar]);

  useEffect(() => {
    async function loadTopBar() {
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("title, description, canonical_url, is_published")
          .eq("slug", "site-settings-topbar")
          .maybeSingle();

        if (error) throw error;

        if (data) {
          setTopBar({
            visible: data.is_published,
            text: data.title || "",
            btnText: data.description || "",
            linkUrl: data.canonical_url || ""
          });
        }
      } catch (err) {
        console.error("Error loading topbar settings:", err);
      }
    }
    loadTopBar();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    // Set initial state
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Always solid white navbar — never transparent to prevent content bleed-through
  const navBackground = isScrolled
    ? "bg-white border-b border-slate-100 shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
    : "bg-white/95 backdrop-blur-xl border-b border-slate-100/80";

  const navPadding = isScrolled ? "py-2" : "py-3";

  const textColor = "text-slate-800";

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        {topBar?.visible && (
          <Link
            to={topBar.linkUrl || "#"}
            className="w-full bg-gradient-to-r from-primary to-indigo-600 text-white py-2 px-6 shadow-md flex items-center justify-center select-none cursor-pointer hover:brightness-105 active:brightness-95 transition-all"
          >
            {/* Text container */}
            <div ref={containerRef} className="w-full overflow-hidden relative">
              <div 
                ref={contentRef}
                className={`text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                  isOverflowing ? "animate-overflow-slide inline-block" : "w-full text-center block"
                }`}
              >
                {topBar.text}
              </div>
            </div>
            
            {/* Inline CSS styling for the marquee */}
            {isOverflowing && (
              <style>{`
                @keyframes slide-overflow {
                  0%, 12% {
                    transform: translate3d(0, 0, 0);
                    opacity: 1;
                  }
                  72% {
                    transform: translate3d(var(--scroll-dist), 0, 0);
                    opacity: 1;
                  }
                  76% {
                    transform: translate3d(var(--scroll-dist), 0, 0);
                    opacity: 0;
                  }
                  80% {
                    transform: translate3d(0, 0, 0);
                    opacity: 0;
                  }
                  84%, 100% {
                    transform: translate3d(0, 0, 0);
                    opacity: 1;
                  }
                }
                .animate-overflow-slide {
                  animation: slide-overflow 10s ease-in-out infinite;
                }
                .w-full:hover .animate-overflow-slide {
                  animation-play-state: paused;
                }
              `}</style>
            )}
          </Link>
        )}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
          className={`w-full transition-all duration-300 ${navBackground}`}
        >
        <div className={`max-w-7xl mx-auto px-6 transition-all duration-300 ${navPadding}`}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200/60 bg-white flex items-center justify-center shadow-sm shrink-0">
                <img src="/assets/favicon.png" alt="WeBuildReach Logo" className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <span
                  className={`${textColor} truncate font-extrabold block`}
                  style={{ fontSize: 'clamp(1.15rem, 5vw, 1.6rem)', lineHeight: 1.1 }}
                >
                  WeBuildReach<span className="text-primary">.com</span>
                </span>
                <p
                  className="text-slate-500 truncate"
                  style={{ fontSize: 'clamp(0.5rem, 2vw, 0.65rem)', letterSpacing: '0.05em', textTransform: 'uppercase' }}
                >
                  Design • Develop • Market
                </p>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative py-4"
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <Link
                    to={link.href}
                    className={`flex items-center gap-1 transition-all duration-300 hover:text-primary text-sm font-semibold ${textColor} ${
                      link.href !== "/" && location.pathname.startsWith(link.href) ? "text-primary" : ""
                    } ${link.href === "/" && location.pathname === "/" ? "text-primary" : ""}`}
                  >
                    {link.label}
                    {link.subLinks && <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${hoveredLink === link.label ? "rotate-180" : ""}`} />}
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {link.subLinks && hoveredLink === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden p-2"
                      >
                        {link.subLinks.map((sub) => (
                          <Link
                            key={sub.label}
                            to={sub.href}
                            className="block px-4 py-3 text-sm text-slate-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-300"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button
                onClick={onBookNow}
                size="sm"
                className="bg-primary hover:bg-primary/95 text-white border-none rounded-full px-6 font-bold h-10 shadow-[0_4px_14px_rgba(90,69,253,0.3)] transition-all duration-300"
              >
                Book Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${textColor} hover:bg-slate-100`}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          x: isMobileMenuOpen ? 0 : "100%",
          pointerEvents: isMobileMenuOpen ? "auto" : "none"
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 top-0 bg-white/98 backdrop-blur-2xl z-[60] lg:hidden overflow-y-auto"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200/60 bg-white flex items-center justify-center shadow-sm shrink-0">
                <img src="/assets/favicon.png" alt="WeBuildReach Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-slate-800 font-extrabold text-xl">WeBuildReach<span className="text-primary">.com</span></span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          <div className="p-8 space-y-4">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isMobileMenuOpen ? 1 : 0, x: isMobileMenuOpen ? 0 : 20 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex flex-col">
                  <div className="flex items-center justify-between py-4">
                    <Link
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-3xl font-light transition-colors ${
                        (link.href !== "/" && location.pathname.startsWith(link.href)) ||
                        (link.href === "/" && location.pathname === "/")
                          ? "text-primary font-medium"
                          : "text-slate-800"
                      }`}
                    >
                      {link.label}
                    </Link>
                    {link.subLinks && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setHoveredLink(hoveredLink === link.label ? null : link.label);
                        }}
                        className="p-2 text-slate-800"
                      >
                        <ChevronDown className={`w-8 h-8 transition-transform duration-300 ${hoveredLink === link.label ? "rotate-180" : ""}`} />
                      </button>
                    )}
                  </div>

                  <AnimatePresence>
                    {link.subLinks && hoveredLink === link.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-slate-50 rounded-2xl"
                      >
                        {link.subLinks.map((sub) => (
                          <Link
                            key={sub.label}
                            to={sub.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-4 px-6 text-xl text-slate-600 hover:text-primary"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isMobileMenuOpen ? 1 : 0, y: isMobileMenuOpen ? 0 : 20 }}
              transition={{ delay: navLinks.length * 0.1 }}
              className="pt-8"
            >
              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onBookNow?.();
                }}
                size="lg"
                className="w-full h-16 bg-primary hover:bg-primary/95 text-white font-bold rounded-2xl text-xl shadow-xl transition-all active:scale-95 shadow-[0_4px_14px_rgba(90,69,253,0.3)]"
              >
                Book Now
              </Button>
            </motion.div>

            <div className="pt-12">
              <a href="mailto:webuildreach@gmail.com" className="flex flex-col items-center p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-800 gap-2 w-full">
                <Mail className="w-6 h-6 text-primary" />
                <span className="text-xs font-semibold">Email Us</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
