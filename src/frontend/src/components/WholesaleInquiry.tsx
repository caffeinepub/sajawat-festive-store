import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  Building2,
  CheckCircle,
  Loader2,
  Package,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { InquiryType, useSubmitInquiry } from "../hooks/useQueries";

interface FormData {
  name: string;
  phone: string;
  email: string;
  productInterest: string;
  message: string;
  inquiryType: InquiryType;
}

const initialForm: FormData = {
  name: "",
  phone: "",
  email: "",
  productInterest: "",
  message: "",
  inquiryType: InquiryType.retail,
};

export default function WholesaleInquiry() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const { mutateAsync, isPending, isError } = useSubmitInquiry();

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Please fill in your name and phone number.");
      return;
    }
    try {
      await mutateAsync(form);
      setSubmitted(true);
      toast.success("Inquiry submitted! We'll contact you soon. 🎊");
    } catch {
      toast.error("Failed to submit inquiry. Please try again or call us.");
    }
  };

  return (
    <section className="py-20 bg-maroon relative overflow-hidden">
      {/* Decorative background elements */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 10% 50%, oklch(0.78 0.17 80) 0%, transparent 60%),
            radial-gradient(circle at 90% 50%, oklch(0.68 0.19 48) 0%, transparent 60%)`,
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-30" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-gold text-sm font-semibold tracking-widest uppercase mb-4">
              Get in Touch
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Wholesale &{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.78 0.17 80), oklch(0.68 0.19 48))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Retail Inquiry
              </span>
            </h2>
            <p className="text-orange-200 text-lg leading-relaxed mb-8">
              Whether you're buying for personal use or bulk wholesale orders,
              we offer the best prices and quality. Get in touch for custom
              orders, bulk discounts, and special festival packages.
            </p>

            {/* Feature highlights */}
            <div className="space-y-4">
              {[
                {
                  icon: Package,
                  title: "Bulk Orders Welcome",
                  desc: "Special pricing for wholesale buyers. Minimum order quantities available.",
                },
                {
                  icon: Building2,
                  title: "Event & Shop Supplies",
                  desc: "Ideal for decoration shops, event planners, and mandap contractors.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-gold/20 border border-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-0.5">
                      {title}
                    </h3>
                    <p className="text-orange-300 text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick contact */}
            <div className="mt-8 p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
              <p className="text-orange-200 text-sm mb-1">
                Or call/WhatsApp directly:
              </p>
              <a
                href="https://wa.me/918434167624"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold font-bold text-xl hover:text-white transition-colors"
              >
                📱 +91 84341 67624
              </a>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl">
              {submitted ? (
                <motion.div
                  data-ocid="inquiry.success_state"
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="font-display text-2xl font-bold text-maroon mb-2">
                    Inquiry Submitted! 🎊
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. We'll contact you on your
                    provided number within 24 hours.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setForm(initialForm);
                    }}
                    className="bg-saffron hover:bg-orange-600 text-white"
                  >
                    Submit Another Inquiry
                  </Button>
                </motion.div>
              ) : (
                <>
                  <h3 className="font-display text-2xl font-bold text-maroon mb-6">
                    Send Your Inquiry
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Inquiry Type */}
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-foreground">
                        Inquiry Type *
                      </Label>
                      <RadioGroup
                        value={form.inquiryType}
                        onValueChange={(v) =>
                          update("inquiryType", v as InquiryType)
                        }
                        className="flex gap-6"
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            data-ocid="inquiry.radio"
                            value={InquiryType.retail}
                            id="retail"
                          />
                          <Label
                            htmlFor="retail"
                            className="cursor-pointer font-medium"
                          >
                            Retail
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            data-ocid="inquiry.radio"
                            value={InquiryType.wholesale}
                            id="wholesale"
                          />
                          <Label
                            htmlFor="wholesale"
                            className="cursor-pointer font-medium"
                          >
                            Wholesale (Bulk)
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Name + Phone */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="name"
                          className="text-sm font-semibold text-foreground"
                        >
                          Full Name *
                        </Label>
                        <Input
                          data-ocid="inquiry.input"
                          id="name"
                          placeholder="Your name"
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="phone"
                          className="text-sm font-semibold text-foreground"
                        >
                          Phone Number *
                        </Label>
                        <Input
                          data-ocid="inquiry.input"
                          id="phone"
                          type="tel"
                          placeholder="+91 XXXXX XXXXX"
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="email"
                        className="text-sm font-semibold text-foreground"
                      >
                        Email Address
                      </Label>
                      <Input
                        data-ocid="inquiry.input"
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                      />
                    </div>

                    {/* Product Interest */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="productInterest"
                        className="text-sm font-semibold text-foreground"
                      >
                        Products of Interest
                      </Label>
                      <Input
                        data-ocid="inquiry.input"
                        id="productInterest"
                        placeholder="e.g., Artificial flowers, Rakhi, Diwali items..."
                        value={form.productInterest}
                        onChange={(e) =>
                          update("productInterest", e.target.value)
                        }
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="message"
                        className="text-sm font-semibold text-foreground"
                      >
                        Message / Requirements
                      </Label>
                      <Textarea
                        data-ocid="inquiry.textarea"
                        id="message"
                        placeholder="Describe your requirements, quantities, or any special requests..."
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        rows={4}
                        className="resize-none"
                      />
                    </div>

                    {/* Error state */}
                    {isError && (
                      <div
                        data-ocid="inquiry.error_state"
                        className="flex items-center gap-2 text-destructive text-sm p-3 bg-destructive/10 rounded-lg"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>
                          Failed to submit. Please try calling us directly.
                        </span>
                      </div>
                    )}

                    {/* Submit */}
                    <Button
                      data-ocid="inquiry.submit_button"
                      type="submit"
                      disabled={isPending}
                      className="w-full bg-saffron hover:bg-orange-600 text-white font-semibold py-6 rounded-xl text-base shadow-lg hover:shadow-saffron/30 transition-all"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Inquiry 🎊"
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      We typically respond within 24 hours via call or WhatsApp.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
