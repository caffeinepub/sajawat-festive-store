import { Badge } from "@/components/ui/badge";
import { Package, ShoppingCart, Tag } from "lucide-react";
import { motion } from "motion/react";
import type { Product } from "../hooks/useQueries";

const categoryLabels: Record<string, string> = {
  ganeshPujaItems: "Ganesh Puja",
  photoMala: "Photo Mala",
  radhaKrishnaPujaItems: "Radha Krishna",
  murtiDecoration: "Murti Decor",
  birthdayEventDecor: "Birthday Decor",
  chundriFabrics: "Chundri Fabrics",
  weddingAccessories: "Wedding",
  decorativePapers: "Decor Papers",
  thermocolItems: "Thermocol",
  photoFraming: "Photo Framing",
  artificialFlowers: "Flowers",
  rakhiCollection: "Rakhi",
};

const festivalColors: Record<string, string> = {
  diwali: "bg-amber-100 text-amber-800 border-amber-200",
  wedding: "bg-red-100 text-red-800 border-red-200",
  ganeshPuja: "bg-orange-100 text-orange-800 border-orange-200",
  dussehra: "bg-yellow-100 text-yellow-800 border-yellow-200",
  birthday: "bg-pink-100 text-pink-800 border-pink-200",
  rakhi: "bg-purple-100 text-purple-800 border-purple-200",
};

const festivalLabels: Record<string, string> = {
  diwali: "🪔 Diwali",
  wedding: "💍 Wedding",
  ganeshPuja: "🐘 Ganesh Puja",
  dussehra: "🏹 Dussehra",
  birthday: "🎂 Birthday",
  rakhi: "🧵 Rakhi",
};

interface ProductCardProps {
  product: Product;
  index: number;
  ocidPrefix?: string;
}

export default function ProductCard({
  product,
  index,
  ocidPrefix = "products",
}: ProductCardProps) {
  const priceInPaisa = product.price;
  const priceDisplay = priceInPaisa
    ? `₹${(Number(priceInPaisa) / 100).toFixed(0)}`
    : null;

  const categoryLabel = categoryLabels[product.category] ?? product.category;
  const festivalLabel = product.festivalTag
    ? festivalLabels[product.festivalTag]
    : null;
  const festivalColor = product.festivalTag
    ? festivalColors[product.festivalTag]
    : "";

  return (
    <motion.article
      data-ocid={`${ocidPrefix}.item.${index + 1}`}
      className="card-festive group bg-white rounded-2xl overflow-hidden shadow-sm border border-border"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] bg-gray-50">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              target.parentElement!.classList.add(
                "flex",
                "items-center",
                "justify-center",
              );
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-100">
            <Package className="w-12 h-12 text-saffron/40" />
          </div>
        )}

        {/* Overlays */}
        {product.isFeatured && (
          <div className="absolute top-2 left-2">
            <span className="px-2 py-0.5 bg-gold text-white text-xs font-bold rounded-full shadow-sm">
              ⭐ Featured
            </span>
          </div>
        )}
        {product.isWholesaleAvailable && (
          <div className="absolute top-2 right-2">
            <span className="wholesale-badge px-2 py-0.5 text-white text-xs font-bold rounded-full shadow-sm">
              Wholesale
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Festival & Category badges */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {festivalLabel && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full border font-medium ${festivalColor}`}
            >
              {festivalLabel}
            </span>
          )}
          <span className="text-xs px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-100 font-medium">
            {categoryLabel}
          </span>
        </div>

        {/* Name */}
        <h3 className="font-semibold text-foreground text-sm leading-snug mb-1 line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 mb-3">
          {product.description}
        </p>

        {/* Price + action */}
        <div className="flex items-center justify-between">
          {priceDisplay ? (
            <span className="font-bold text-saffron text-base font-display">
              {priceDisplay}
            </span>
          ) : (
            <span className="text-muted-foreground text-xs italic">
              Call for price
            </span>
          )}
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-saffron/10 hover:bg-saffron hover:text-white text-saffron flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
            aria-label={`Add ${product.name} to inquiry`}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
