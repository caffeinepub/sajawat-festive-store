import { motion } from "motion/react";
import { ProductCategory } from "../hooks/useQueries";

interface CategoryItem {
  id: ProductCategory;
  label: string;
  emoji: string;
  image: string;
  color: string;
  ocid: string;
}

const categories: CategoryItem[] = [
  {
    id: ProductCategory.artificialFlowers,
    label: "Artificial Flowers",
    emoji: "🌸",
    image: "/assets/generated/cat-artificial-flowers.dim_400x300.jpg",
    color: "from-pink-600/80 to-rose-800/80",
    ocid: "categories.item.1",
  },
  {
    id: ProductCategory.weddingAccessories,
    label: "Wedding Accessories",
    emoji: "💍",
    image: "/assets/generated/cat-wedding-accessories.dim_400x300.jpg",
    color: "from-red-700/80 to-rose-900/80",
    ocid: "categories.item.2",
  },
  {
    id: ProductCategory.radhaKrishnaPujaItems,
    label: "Radha Krishna & Puja",
    emoji: "🙏",
    image: "/assets/generated/cat-radha-krishna.dim_400x300.jpg",
    color: "from-orange-600/80 to-amber-800/80",
    ocid: "categories.item.3",
  },
  {
    id: ProductCategory.murtiDecoration,
    label: "Murti Decoration",
    emoji: "🪔",
    image: "/assets/generated/cat-ganesh-puja.dim_400x300.jpg",
    color: "from-yellow-600/80 to-orange-800/80",
    ocid: "categories.item.4",
  },
  {
    id: ProductCategory.decorativePapers,
    label: "Decorative Papers",
    emoji: "🎨",
    image: "/assets/generated/cat-decorative-papers.dim_400x300.jpg",
    color: "from-emerald-600/80 to-teal-800/80",
    ocid: "categories.item.5",
  },
  {
    id: ProductCategory.thermocolItems,
    label: "Thermocol Items",
    emoji: "❄️",
    image: "/assets/generated/cat-thermocol.dim_400x300.jpg",
    color: "from-blue-600/80 to-cyan-800/80",
    ocid: "categories.item.6",
  },
  {
    id: ProductCategory.chundriFabrics,
    label: "Chundri & Fabrics",
    emoji: "🧣",
    image: "/assets/generated/cat-wedding-accessories.dim_400x300.jpg",
    color: "from-purple-600/80 to-violet-800/80",
    ocid: "categories.item.7",
  },
  {
    id: ProductCategory.photoMala,
    label: "Photo Mala",
    emoji: "📸",
    image: "/assets/generated/cat-photo-mala.dim_400x300.jpg",
    color: "from-amber-600/80 to-yellow-800/80",
    ocid: "categories.item.8",
  },
  {
    id: ProductCategory.birthdayEventDecor,
    label: "Birthday & Event Decor",
    emoji: "🎂",
    image: "/assets/generated/cat-birthday-decor.dim_400x300.jpg",
    color: "from-fuchsia-600/80 to-pink-800/80",
    ocid: "categories.item.9",
  },
  {
    id: ProductCategory.rakhiCollection,
    label: "Rakhi Collection",
    emoji: "🧵",
    image: "/assets/generated/cat-rakhi.dim_400x300.jpg",
    color: "from-orange-500/80 to-red-700/80",
    ocid: "categories.item.10",
  },
  {
    id: ProductCategory.photoFraming,
    label: "Photo Framing",
    emoji: "🖼️",
    image: "/assets/generated/cat-photo-mala.dim_400x300.jpg",
    color: "from-stone-600/80 to-neutral-800/80",
    ocid: "categories.item.11",
  },
  {
    id: ProductCategory.ganeshPujaItems,
    label: "Ganesh Puja Items",
    emoji: "🐘",
    image: "/assets/generated/cat-ganesh-puja.dim_400x300.jpg",
    color: "from-saffron/80 to-maroon/80",
    ocid: "categories.item.12",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

interface CategoriesGridProps {
  onCategorySelect: (cat: ProductCategory) => void;
}

export default function CategoriesGrid({
  onCategorySelect,
}: CategoriesGridProps) {
  return (
    <section className="py-20 bg-ivory">
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
            Browse by Category
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-maroon mb-4">
            Everything for Every Celebration
          </h2>
          <div className="festive-divider relative max-w-xs mx-auto h-6 flex items-center justify-center">
            <span className="relative z-10 px-4 text-gold text-xl">✦</span>
          </div>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            From sacred Puja items to grand wedding accessories — explore our 12
            curated collections for every occasion.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              data-ocid={cat.ocid}
              variants={cardVariants}
              onClick={() => onCategorySelect(cat.id)}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Background image */}
              <img
                src={cat.image}
                alt={cat.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${cat.color} transition-opacity duration-300 group-hover:opacity-90`}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-white">
                <span className="text-2xl sm:text-3xl mb-1.5 drop-shadow-md">
                  {cat.emoji}
                </span>
                <span className="font-semibold text-xs sm:text-sm text-center leading-tight drop-shadow-md">
                  {cat.label}
                </span>
                <span className="mt-2 text-xs text-white/0 group-hover:text-white/80 transition-all duration-200 font-medium">
                  View All →
                </span>
              </div>

              {/* Gold border on hover */}
              <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 group-hover:ring-gold/60 transition-all duration-300" />
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
