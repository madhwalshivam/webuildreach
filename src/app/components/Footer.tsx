import { Link } from "react-router";
import { MapPin, Mail, Facebook, Instagram, Youtube, Linkedin, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const footerLinks = {
  about: [
    { label: "Our Story", href: "/about" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Refund Policy", href: "/refund-policy" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="relative bg-[#FAFAFC] text-slate-800 pt-10 pb-8 border-t border-slate-100 overflow-hidden">
      
      {/* Background ambient decorative shapes */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-purple-100/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Main Columns Grid */}
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          
          {/* Brand & Description column */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200/60 bg-white flex items-center justify-center shadow-sm shrink-0">
                  <img src="/assets/favicon.png" alt="WeBuildReach Logo" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-extrabold text-slate-900" style={{ fontSize: '1.75rem', lineHeight: 1.1 }}>
                  WeBuildReach<span className="text-primary">.com</span>
                </h3>
              </div>
              <p className="text-slate-500 text-sm mt-4 leading-relaxed max-w-sm">
                By optimizing digital strategy, developing top-tier automation structures, and scaling advertising operations, we help brands reach peak online performance.
              </p>
            </div>
            
            {/* Social Icons circle badges */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((soc) => (
                <a
                  key={soc.label}
                  href={soc.href}
                  aria-label={soc.label}
                  className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md shadow-primary/10"
                >
                  <soc.icon className="w-4.5 h-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column 1: About */}
          <div className="md:col-span-3">
            <h4 className="text-slate-900 font-extrabold text-base mb-6 tracking-wide uppercase text-xs">
              About Us
            </h4>
            <ul className="space-y-3.5">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-slate-500 hover:text-primary transition-colors duration-300 text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2: Get In Touch Details */}
          <div className="md:col-span-4">
            <h4 className="text-slate-900 font-extrabold text-base mb-6 tracking-wide uppercase text-xs">
              Get in touch
            </h4>
            <ul className="space-y-4">
              
              {/* Email */}
              <li className="flex gap-3 items-start">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <a href="mailto:webuildreach@gmail.com" className="text-slate-500 hover:text-primary transition-colors duration-300 text-sm font-medium leading-tight">
                  webuildreach@gmail.com
                </a>
              </li>

              {/* Location */}
              <li className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-slate-500 text-sm font-medium leading-tight">
                  Delhi NCR, India
                </span>
              </li>



            </ul>
          </div>

        </div>

        {/* Bottom copyright row bar */}
        <div className="pt-8 border-t border-slate-100 mt-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
            
            {/* Copyright */}
            <p className="text-slate-400 text-xs font-semibold">
              Copyright © 2026 WeBuildReach. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-slate-400 hover:text-primary text-xs font-semibold transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}
