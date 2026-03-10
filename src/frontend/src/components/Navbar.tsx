import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";

interface NavbarProps {
  onScrollTo: (section: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const navLinks = [
  { label: "Home", section: "home" },
  { label: "Products", section: "products" },
  { label: "Festivals", section: "festivals" },
  { label: "Wholesale", section: "wholesale" },
  { label: "Contact", section: "contact" },
];

export default function Navbar({
  onScrollTo,
  searchQuery,
  onSearchChange,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (section: string) => {
    if (section === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onScrollTo(section);
    }
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-maroon"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNav("home")}
            className="flex items-center gap-2 group"
            aria-label="Sajawat Festive Store - Home"
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                scrolled ? "bg-saffron" : "bg-gold"
              }`}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <span
                className={`font-display font-bold text-lg block transition-colors ${
                  scrolled ? "text-maroon" : "text-gold"
                }`}
                style={{ lineHeight: 1.1 }}
              >
                Sajawat
              </span>
              <span
                className={`text-xs tracking-widest uppercase font-body transition-colors ${
                  scrolled ? "text-saffron" : "text-orange-200"
                }`}
              >
                Festive Store
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.section}
                type="button"
                data-ocid="nav.link"
                onClick={() => handleNav(link.section)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-saffron hover:text-white ${
                  scrolled
                    ? "text-foreground hover:text-white"
                    : "text-orange-100 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Search + Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Search toggle (desktop) */}
            <div className="hidden md:flex items-center gap-2">
              {searchOpen ? (
                <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-200">
                  <Input
                    data-ocid="nav.search_input"
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-56 h-9 text-sm"
                    autoFocus
                    onBlur={() => !searchQuery && setSearchOpen(false)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        setSearchOpen(false);
                        onSearchChange("");
                      }
                      if (e.key === "Enter") {
                        onScrollTo("products");
                      }
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSearchOpen(false);
                      onSearchChange("");
                    }}
                    className={scrolled ? "text-foreground" : "text-white"}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(true)}
                  className={scrolled ? "text-foreground" : "text-white"}
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </Button>
              )}
            </div>

            {/* Mobile: search */}
            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden ${scrolled ? "text-foreground" : "text-white"}`}
              onClick={() => {
                setSearchOpen(!searchOpen);
                if (!searchOpen) onScrollTo("products");
              }}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden ${scrolled ? "text-foreground" : "text-white"}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="md:hidden pb-3 px-1 animate-in fade-in slide-in-from-top-2 duration-200">
            <Input
              data-ocid="nav.search_input"
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full text-sm"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setSearchOpen(false);
                  onSearchChange("");
                }
              }}
            />
          </div>
        )}

        {/* Mobile Nav Menu */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 pt-1 border-t border-white/20 animate-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <button
                key={link.section}
                type="button"
                data-ocid="nav.link"
                onClick={() => handleNav(link.section)}
                className={`block w-full text-left px-4 py-3 text-sm font-medium transition-colors hover:bg-saffron hover:text-white rounded-lg ${
                  scrolled ? "text-foreground" : "text-orange-100"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
