import { Heart, MapPin, MessageCircle, Phone, Sparkles } from "lucide-react";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";

interface FooterProps {
  onScrollTo: (section: string) => void;
}

const quickLinks = [
  { label: "Home", section: "home" },
  { label: "Products", section: "products" },
  { label: "Festival Collections", section: "festivals" },
  { label: "Categories", section: "categories" },
  { label: "Wholesale Inquiry", section: "wholesale" },
  { label: "Contact Us", section: "contact" },
];

const festivalLinks = [
  "🪔 Diwali Specials",
  "💍 Wedding Collection",
  "🧵 Rakhi Collection",
  "🐘 Ganesh Puja",
  "🏹 Dussehra Decor",
  "🎂 Birthday & Events",
];

export default function Footer({ onScrollTo }: FooterProps) {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const handleNav = (section: string) => {
    if (section === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onScrollTo(section);
    }
  };

  return (
    <footer className="bg-maroon text-white">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-gold via-saffron to-crimson" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-xl text-gold block leading-tight">
                  Sajawat
                </span>
                <span className="text-xs text-orange-300 tracking-widest uppercase">
                  Festive Store
                </span>
              </div>
            </div>
            <p className="text-orange-200 text-sm leading-relaxed mb-5">
              Your one-stop destination for festival decorations, wedding
              accessories, Puja items, and all celebration needs. Retail &
              wholesale available.
            </p>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/918434167624"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-green-600 flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <SiWhatsapp className="w-4 h-4" />
              </a>
              <span
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-blue-700 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Facebook"
                role="img"
              >
                <SiFacebook className="w-4 h-4" />
              </span>
              <span
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-pink-600 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Instagram"
                role="img"
              >
                <SiInstagram className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.section}>
                  <button
                    type="button"
                    onClick={() => handleNav(link.section)}
                    className="text-orange-200 hover:text-gold text-sm transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Festival Collections */}
          <div>
            <h4 className="font-semibold text-gold text-sm uppercase tracking-wider mb-4">
              Festival Collections
            </h4>
            <ul className="space-y-2.5">
              {festivalLinks.map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    onClick={() => handleNav("festivals")}
                    className="text-orange-200 hover:text-gold text-sm transition-colors text-left"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-semibold text-gold text-sm uppercase tracking-wider mb-4">
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href="tel:+918434167624"
                className="flex items-center gap-3 text-orange-200 hover:text-gold text-sm transition-colors group"
              >
                <Phone className="w-4 h-4 text-gold shrink-0" />
                +91 84341 67624
              </a>
              <a
                href="https://wa.me/918434167624"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-orange-200 hover:text-gold text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-gold shrink-0" />
                WhatsApp Chat
              </a>
              <div className="flex items-start gap-3 text-orange-200 text-sm">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>Sajawat Festive Store, Decoration Market, India</span>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-5 p-3 rounded-xl bg-saffron/20 border border-saffron/30">
              <p className="text-xs text-orange-200 mb-1.5">
                Wholesale inquiries welcome!
              </p>
              <a
                href="https://wa.me/918434167624?text=Hi! I want to place a wholesale order."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:text-white transition-colors"
              >
                <SiWhatsapp className="w-3 h-3" />
                Message for bulk pricing →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-orange-300">
          <p>© {year} Sajawat Festive Store. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-saffron fill-current" />{" "}
            using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
