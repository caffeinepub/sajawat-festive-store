import { Toaster } from "@/components/ui/sonner";
import { useEffect, useRef, useState } from "react";
import CategoriesGrid from "./components/CategoriesGrid";
import ContactSection from "./components/ContactSection";
import FestivalSection from "./components/FestivalSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import ProductsGallery from "./components/ProductsGallery";
import WholesaleInquiry from "./components/WholesaleInquiry";
import type { ProductCategory } from "./hooks/useQueries";
import { useSeedAndFeaturedProducts } from "./hooks/useQueries";

export default function App() {
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Seed products on mount
  const { data: _featuredData } = useSeedAndFeaturedProducts();

  const productsRef = useRef<HTMLDivElement>(null);
  const wholesaleRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const festivalRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (section: string) => {
    const map: Record<string, React.RefObject<HTMLDivElement | null>> = {
      products: productsRef,
      wholesale: wholesaleRef,
      contact: contactRef,
      categories: categoriesRef,
      festivals: festivalRef,
    };
    map[section]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCategorySelect = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    setTimeout(() => {
      productsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar
        onScrollTo={scrollToSection}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main>
        {/* Hero */}
        <section id="home">
          <HeroSection
            onShopNow={() => scrollToSection("products")}
            onWholesale={() => scrollToSection("wholesale")}
          />
        </section>

        {/* Categories */}
        <div ref={categoriesRef} id="categories">
          <CategoriesGrid onCategorySelect={handleCategorySelect} />
        </div>

        {/* Festival Featured */}
        <div ref={festivalRef} id="festivals">
          <FestivalSection />
        </div>

        {/* Products Gallery */}
        <div ref={productsRef} id="products">
          <ProductsGallery
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Wholesale Inquiry */}
        <div ref={wholesaleRef} id="wholesale">
          <WholesaleInquiry />
        </div>

        {/* Contact */}
        <div ref={contactRef} id="contact">
          <ContactSection />
        </div>
      </main>

      <Footer onScrollTo={scrollToSection} />
      <Toaster richColors position="top-right" />
    </div>
  );
}
