import { Button } from "@/components/ui/button";
import {
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import { SiWhatsapp } from "react-icons/si";

export default function ContactSection() {
  return (
    <section className="py-20 bg-ivory" id="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-saffron text-sm font-semibold tracking-widest uppercase mb-3">
            Contact Us
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-maroon mb-4">
            Get in Touch
          </h2>
          <div className="festive-divider relative max-w-xs mx-auto h-6 flex items-center justify-center">
            <span className="relative z-10 px-4 text-gold text-xl">✦</span>
          </div>
          <p className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto">
            We're here to help you celebrate every occasion. Reach out for
            inquiries, bulk orders, or custom decoration requirements.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* WhatsApp Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0 }}
            className="card-festive"
          >
            <div className="bg-white rounded-3xl p-8 border border-border shadow-sm h-full flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center mb-5">
                <SiWhatsapp className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-display text-xl font-bold text-maroon mb-2">
                WhatsApp Us
              </h3>
              <p className="text-muted-foreground text-sm mb-5 flex-1">
                Chat with us directly on WhatsApp for quick replies, product
                photos, and order assistance.
              </p>
              <div className="mb-4">
                <span className="font-bold text-2xl text-foreground font-display">
                  +91 84341 67624
                </span>
              </div>
              <Button
                data-ocid="contact.button"
                asChild
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl"
              >
                <a
                  href="https://wa.me/918434167624"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <SiWhatsapp className="w-4 h-4" />
                  Chat on WhatsApp
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Phone Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="card-festive"
          >
            <div className="bg-white rounded-3xl p-8 border border-border shadow-sm h-full flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-5">
                <Phone className="w-7 h-7 text-saffron" />
              </div>
              <h3 className="font-display text-xl font-bold text-maroon mb-2">
                Call Us
              </h3>
              <p className="text-muted-foreground text-sm mb-5 flex-1">
                Speak directly with our team for wholesale pricing, custom
                orders, and product availability.
              </p>
              <div className="mb-4">
                <span className="font-bold text-2xl text-foreground font-display">
                  +91 84341 67624
                </span>
              </div>
              <Button
                data-ocid="contact.button"
                asChild
                variant="outline"
                className="w-full border-saffron text-saffron hover:bg-saffron hover:text-white font-semibold rounded-xl"
              >
                <a
                  href="tel:+918434167624"
                  className="flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Visit / Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="card-festive md:col-span-2 lg:col-span-1"
          >
            <div className="bg-white rounded-3xl p-8 border border-border shadow-sm h-full flex flex-col gap-5">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-5">
                  <MapPin className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-display text-xl font-bold text-maroon mb-2">
                  Visit Our Store
                </h3>
                <p className="text-muted-foreground text-sm">
                  Sajawat Festive Store — Your local destination for all
                  festival decorations, wedding accessories, and celebration
                  items.
                </p>
              </div>

              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-saffron mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-0.5">
                      Store Address
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Sajawat Festive Store,
                      <br />
                      Decoration Market, India
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-saffron mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-0.5">
                      Store Hours
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Mon – Sat: 9:00 AM – 8:00 PM
                      <br />
                      Sunday: 10:00 AM – 6:00 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-4 h-4 text-saffron mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-0.5">
                      Festival Specials
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Extended hours during Diwali, Dussehra & Ganesh Puja
                      seasons.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Action Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 rounded-3xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.19 48), oklch(0.5 0.22 25))",
          }}
        >
          <div className="px-8 py-8 sm:py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">
                Ready to Place a Bulk Order?
              </h3>
              <p className="text-orange-100 text-sm">
                Get special wholesale pricing for orders above ₹5,000
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Button
                data-ocid="contact.button"
                asChild
                className="bg-white text-saffron hover:bg-orange-50 font-semibold px-6 rounded-xl whitespace-nowrap"
              >
                <a
                  href="https://wa.me/918434167624?text=Hi! I'm interested in wholesale orders."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiWhatsapp className="w-4 h-4 mr-2" />
                  WhatsApp for Wholesale
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-semibold px-6 rounded-xl whitespace-nowrap"
              >
                <a href="tel:+918434167624">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
