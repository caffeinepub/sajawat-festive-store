import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "motion/react";
import { useState } from "react";
import {
  FestivalTag,
  useFeaturedProducts,
  useProductsByFestivalTag,
} from "../hooks/useQueries";
import ProductCard from "./ProductCard";

const festivalTabs = [
  { value: "all", label: "⭐ All Featured", tag: null },
  { value: "diwali", label: "🪔 Diwali", tag: FestivalTag.diwali },
  { value: "wedding", label: "💍 Wedding", tag: FestivalTag.wedding },
  { value: "rakhi", label: "🧵 Rakhi", tag: FestivalTag.rakhi },
  { value: "ganeshPuja", label: "🐘 Ganesh Puja", tag: FestivalTag.ganeshPuja },
  { value: "dussehra", label: "🏹 Dussehra", tag: FestivalTag.dussehra },
  { value: "birthday", label: "🎂 Birthday", tag: FestivalTag.birthday },
];

function FestivalTabContent({
  tag,
  isAll,
}: {
  tag: FestivalTag | null;
  isAll: boolean;
}) {
  const featuredQuery = useFeaturedProducts();
  const tagQuery = useProductsByFestivalTag(isAll ? null : tag);

  const { data, isLoading } = isAll ? featuredQuery : tagQuery;
  const products = data ?? [];

  if (isLoading) {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6"
        data-ocid="products.loading_state"
      >
        {["sk1", "sk2", "sk3", "sk4"].map((key) => (
          <div
            key={key}
            className="rounded-2xl overflow-hidden bg-white shadow-sm"
          >
            <Skeleton className="h-52 w-full shimmer" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-4 w-3/4 shimmer" />
              <Skeleton className="h-3 w-1/2 shimmer" />
              <Skeleton className="h-6 w-1/3 shimmer" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div
        className="text-center py-16 text-muted-foreground"
        data-ocid="products.empty_state"
      >
        <div className="text-5xl mb-4">🎊</div>
        <p className="text-lg font-medium">Products loading...</p>
        <p className="text-sm mt-1">Check back soon for featured items!</p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {products.slice(0, 8).map((product, idx) => (
        <ProductCard
          key={product.id.toString()}
          product={product}
          index={idx}
        />
      ))}
    </motion.div>
  );
}

export default function FestivalSection() {
  const [activeTab, setActiveTab] = useState("all");

  // activeTab drives tab display through Tabs component

  return (
    <section className="py-20 bg-festive-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-saffron text-sm font-semibold tracking-widest uppercase mb-3">
            Festival Collections
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-maroon mb-4">
            Shop by Festival
          </h2>
          <div className="festive-divider relative max-w-xs mx-auto h-6 flex items-center justify-center">
            <span className="relative z-10 px-4 text-gold text-xl">✦</span>
          </div>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            Curated collections for every major celebration — from sacred
            festivals to grand weddings.
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="overflow-x-auto -mx-4 px-4 pb-1">
            <TabsList className="inline-flex gap-1 p-1 bg-white/80 backdrop-blur rounded-2xl border border-gold/20 h-auto mb-4 w-max">
              {festivalTabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  data-ocid="festivals.tab"
                  className="rounded-xl px-4 py-2 text-sm font-medium whitespace-nowrap data-[state=active]:bg-saffron data-[state=active]:text-white data-[state=active]:shadow-sm transition-all"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {festivalTabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-0">
              <FestivalTabContent tag={tab.tag} isAll={tab.value === "all"} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
