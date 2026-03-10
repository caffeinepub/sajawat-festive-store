import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  ProductCategory,
  useFeaturedProducts,
  useProductsByCategory,
  useSearchProducts,
} from "../hooks/useQueries";
import ProductCard from "./ProductCard";

const categoryOptions: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "All Products" },
  { value: ProductCategory.artificialFlowers, label: "🌸 Artificial Flowers" },
  { value: ProductCategory.weddingAccessories, label: "💍 Wedding" },
  {
    value: ProductCategory.radhaKrishnaPujaItems,
    label: "🙏 Radha Krishna Puja",
  },
  { value: ProductCategory.murtiDecoration, label: "🪔 Murti Decoration" },
  { value: ProductCategory.decorativePapers, label: "🎨 Decorative Papers" },
  { value: ProductCategory.thermocolItems, label: "❄️ Thermocol" },
  { value: ProductCategory.chundriFabrics, label: "🧣 Chundri & Fabrics" },
  { value: ProductCategory.photoMala, label: "📸 Photo Mala" },
  { value: ProductCategory.birthdayEventDecor, label: "🎂 Birthday Decor" },
  { value: ProductCategory.rakhiCollection, label: "🧵 Rakhi" },
  { value: ProductCategory.photoFraming, label: "🖼️ Photo Framing" },
  { value: ProductCategory.ganeshPujaItems, label: "🐘 Ganesh Puja" },
];

interface ProductsGalleryProps {
  selectedCategory: ProductCategory | null;
  onCategoryChange: (cat: ProductCategory | null) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export default function ProductsGallery({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: ProductsGalleryProps) {
  const [showFilters, setShowFilters] = useState(false);

  const isSearching = searchQuery.trim().length > 0;
  const isFiltered = selectedCategory !== null;

  const featuredQuery = useFeaturedProducts();
  const categoryQuery = useProductsByCategory(selectedCategory);
  const searchResultsQuery = useSearchProducts(searchQuery);

  let products = isSearching
    ? (searchResultsQuery.data ?? [])
    : isFiltered
      ? (categoryQuery.data ?? [])
      : (featuredQuery.data ?? []);

  const isLoading = isSearching
    ? searchResultsQuery.isLoading
    : isFiltered
      ? categoryQuery.isLoading
      : featuredQuery.isLoading;

  const clearFilters = () => {
    onCategoryChange(null);
    onSearchChange("");
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-saffron text-sm font-semibold tracking-widest uppercase mb-3">
            Our Products
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-maroon mb-4">
            Explore Our Collection
          </h2>
          <div className="festive-divider relative max-w-xs mx-auto h-6 flex items-center justify-center">
            <span className="relative z-10 px-4 text-gold text-xl">✦</span>
          </div>
        </motion.div>

        {/* Search + filter controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                data-ocid="products.search_input"
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-9 pr-9"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 border-saffron text-saffron hover:bg-saffron hover:text-white shrink-0"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter by Category
              {selectedCategory && (
                <span className="w-2 h-2 rounded-full bg-saffron" />
              )}
            </Button>

            {(isFiltered || isSearching) && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
          </div>

          {/* Filter chips */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 pt-1">
                  {categoryOptions.map((opt) => {
                    const isActive =
                      opt.value === "all"
                        ? !selectedCategory
                        : selectedCategory === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          onCategoryChange(
                            opt.value === "all" ? null : opt.value,
                          );
                          setShowFilters(false);
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                          isActive
                            ? "bg-saffron text-white border-saffron shadow-sm"
                            : "bg-white text-foreground border-border hover:border-saffron hover:text-saffron"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active filter badge */}
          {(isFiltered || isSearching) && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Showing:</span>
              {isSearching && (
                <Badge
                  variant="secondary"
                  className="bg-orange-50 text-orange-700 border-orange-200"
                >
                  Search: "{searchQuery}"
                </Badge>
              )}
              {isFiltered && !isSearching && (
                <Badge
                  variant="secondary"
                  className="bg-orange-50 text-orange-700 border-orange-200"
                >
                  {categoryOptions.find((o) => o.value === selectedCategory)
                    ?.label ?? selectedCategory}
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Products grid */}
        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            data-ocid="products.loading_state"
          >
            {["sk1", "sk2", "sk3", "sk4", "sk5", "sk6", "sk7", "sk8"].map(
              (key) => (
                <div
                  key={key}
                  className="rounded-2xl overflow-hidden bg-white shadow-sm border border-border"
                >
                  <Skeleton className="h-52 w-full shimmer" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-4 w-3/4 shimmer" />
                    <Skeleton className="h-3 w-1/2 shimmer" />
                    <Skeleton className="h-6 w-1/3 shimmer" />
                  </div>
                </div>
              ),
            )}
          </div>
        ) : products.length === 0 ? (
          <motion.div
            data-ocid="products.empty_state"
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-display text-2xl font-bold text-maroon mb-2">
              No products found
            </h3>
            <p className="text-muted-foreground mb-6">
              {isSearching
                ? `No results for "${searchQuery}". Try a different search term.`
                : "No products in this category yet. Check back soon!"}
            </p>
            <Button
              onClick={clearFilters}
              className="bg-saffron hover:bg-orange-600 text-white"
            >
              Browse All Products
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((product, idx) => (
              <ProductCard
                key={product.id.toString()}
                product={product}
                index={idx}
                ocidPrefix="products"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
