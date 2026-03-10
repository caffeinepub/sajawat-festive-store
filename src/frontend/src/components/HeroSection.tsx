import { Button } from "@/components/ui/button";
import { PackageOpen, ShoppingBag, Star } from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  onShopNow: () => void;
  onWholesale: () => void;
}

export default function HeroSection({
  onShopNow,
  onWholesale,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden min-h-[88vh] flex items-center pt-16">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-banner.dim_1200x500.jpg"
          alt="Festive decorations"
          className="w-full h-full object-cover object-center"
        />
        {/* Multi-layer gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-maroon/90 via-maroon/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon/60 via-transparent to-maroon/20" />
      </div>

      {/* Decorative pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, oklch(0.78 0.17 80) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, oklch(0.68 0.19 48) 0%, transparent 40%)`,
        }}
      />

      {/* Floating decorative dots */}
      <div className="absolute top-20 right-20 w-64 h-64 opacity-20 hidden lg:block">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="presentation"
        >
          <title>Decorative mandala</title>
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="oklch(0.78 0.17 80)"
            strokeWidth="1"
            strokeDasharray="8 4"
          />
          <circle
            cx="100"
            cy="100"
            r="70"
            stroke="oklch(0.68 0.19 48)"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          <circle
            cx="100"
            cy="100"
            r="50"
            stroke="oklch(0.78 0.17 80)"
            strokeWidth="1"
          />
          {/* Mandala petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <ellipse
              key={`petal-${angle}`}
              cx="100"
              cy="100"
              rx="8"
              ry="22"
              fill="oklch(0.78 0.17 80)"
              transform={`rotate(${angle} 100 100) translate(0 -55)`}
              opacity="0.6"
            />
          ))}
          <circle cx="100" cy="100" r="10" fill="oklch(0.68 0.19 48)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/20 border border-gold/40 text-gold text-sm font-medium mb-6">
              <Star className="w-3.5 h-3.5 fill-current" />
              Retail & Wholesale Available
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Celebrate Every{" "}
            <span
              className="block"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.78 0.17 80), oklch(0.68 0.19 48))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Festival with Us
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-orange-100 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            Your one-stop destination for Diwali, Dussehra, Ganesh Puja,
            Wedding, Birthday & all festival decorations. Artificial flowers,
            Sherwani, Rakhi, Puja items & more.
          </motion.p>

          {/* Festival Tags */}
          <motion.div
            className="flex flex-wrap gap-2 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {[
              "✨ Diwali",
              "🌺 Wedding",
              "🐘 Ganesh Puja",
              "🎂 Birthday",
              "🎊 Dussehra",
              "🧵 Rakhi",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 border border-white/20 text-white/90 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button
              data-ocid="hero.primary_button"
              size="lg"
              onClick={onShopNow}
              className="bg-saffron hover:bg-orange-600 text-white font-semibold px-8 py-6 text-base rounded-xl shadow-lg hover:shadow-saffron/30 transition-all duration-200"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Shop Now
            </Button>
            <Button
              data-ocid="hero.secondary_button"
              size="lg"
              variant="outline"
              onClick={onWholesale}
              className="border-2 border-gold text-gold hover:bg-gold hover:text-maroon font-semibold px-8 py-6 text-base rounded-xl backdrop-blur-sm transition-all duration-200"
            >
              <PackageOpen className="w-5 h-5 mr-2" />
              Wholesale Inquiry
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {[
              { value: "500+", label: "Products" },
              { value: "12", label: "Categories" },
              { value: "6+", label: "Festivals" },
              { value: "Bulk", label: "Wholesale" },
            ].map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <div className="font-display text-3xl font-bold text-gold">
                  {stat.value}
                </div>
                <div className="text-orange-200 text-sm mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-16 sm:h-20"
          preserveAspectRatio="none"
          aria-hidden="true"
          role="presentation"
        >
          <title>Wave divider</title>
          <path
            d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
            fill="oklch(0.975 0.015 80)"
          />
        </svg>
      </div>
    </section>
  );
}
