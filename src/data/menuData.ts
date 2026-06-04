import pineappleShake from "@/assets/pineapple-shake.png";
import appleShake from "@/assets/apple-shake.png";
import mangoShake from "@/assets/mango-shake.png";
import guavaShake from "@/assets/guava-shake.png";
import pineappleJuice from "@/assets/pineapple-juice-glass.png";
import appleJuice from "@/assets/apple-juice.png";
import kharbuzJuice from "@/assets/kharbuz-juice.png";
import orangeJuice from "@/assets/orange-juice.png";
import mosambijuice from "@/assets/mosambi-juice.png";
import badamShake from "@/assets/badam-shake.png";
import falooda from "@/assets/falooda.png";
import hotMilk from "@/assets/hot-milk.png";
import hotMilkKadhai from "@/assets/hot-milk-kadhai.png";
import iceCreamLassi from "@/assets/ice-cream-lassi.png";

// Gallery / real photos
import galleryPineapple from "@/assets/gallery-pineapple.jpeg";
import galleryPineappleJuice from "@/assets/gallery-pineapple-juice.png";
import galleryApple from "@/assets/gallery-apple.jpeg";
import galleryMango from "@/assets/gallery-mango.jpeg";
import galleryGuava from "@/assets/gallery-guava.jpeg";
import galleryKharbuja from "@/assets/gallery-kharbuja.jpeg";
import galleryOrange from "@/assets/gallery-orange.png";
import galleryLassi from "@/assets/gallery-lassi.jpeg";
import galleryFalooda from "@/assets/gallery-falooda.jpeg";
import pineappleFruit from "@/assets/pineapple-fruit.png";
import pineappleSlices from "@/assets/pineapple-slices.png";

export type DrinkCategory = "shakes" | "juices" | "dryfruit";

export interface Drink {
  id: string;
  name: string;
  price: number;
  image: string;
  category: DrinkCategory;
  description: string;
  highlight?: boolean;
  /** Extra images shown on product detail page (gallery / real photos). */
  gallery?: string[];
  /** Longer product description used on the product page. */
  longDescription?: string;
  /** Short highlight tags / ingredients shown on product page. */
  highlights?: string[];
  /** Approx prep time for the order info bar. */
  prepTime?: string;
}

export const drinks: Drink[] = [
  {
    id: "1", name: "Pineapple Shake", price: 10, image: pineappleShake, category: "shakes",
    description: "Creamy fresh pineapple shake", highlight: true,
    gallery: [pineappleShake, galleryPineapple, pineappleSlices],
    longDescription: "Our signature ₹10 Pineapple Shake — hand-blended with fresh ripe pineapple, chilled milk and a touch of sugar. Smooth, creamy and refreshing, served in a frosted glass straight from the counter.",
    highlights: ["Fresh ripe pineapple", "Chilled full-cream milk", "No artificial flavour", "Served instantly"],
    prepTime: "2–3 min",
  },
  {
    id: "2", name: "Apple Shake", price: 10, image: appleShake, category: "shakes",
    description: "Fresh apple blended shake",
    gallery: [appleShake, galleryApple],
    longDescription: "Crisp red apples blended with chilled milk into a creamy, naturally sweet shake. A wholesome ₹10 glass that tastes like fresh fruit, not syrup.",
    highlights: ["Fresh red apples", "Chilled milk", "Lightly sweetened", "100% natural"],
    prepTime: "2–3 min",
  },
  {
    id: "3", name: "Mango Shake", price: 10, image: mangoShake, category: "shakes",
    description: "Thick creamy mango shake",
    gallery: [mangoShake, galleryMango],
    longDescription: "Thick, pulpy mango shake made with seasonal Alphonso and local mangoes blended with chilled milk. The king of fruits in every sip.",
    highlights: ["Seasonal ripe mango", "Thick & pulpy", "Chilled milk", "Family favourite"],
    prepTime: "2–3 min",
  },
  {
    id: "4", name: "Guava Shake", price: 10, image: guavaShake, category: "shakes",
    description: "Fresh pink guava shake",
    gallery: [guavaShake, galleryGuava],
    longDescription: "Pink guava blended with cold milk into a smooth, slightly tangy shake. A refreshing twist on the classic ₹10 menu.",
    highlights: ["Fresh pink guava", "Chilled milk", "Light & refreshing", "Local favourite"],
    prepTime: "2–3 min",
  },

  {
    id: "5", name: "Pineapple Juice", price: 50, image: pineappleJuice, category: "juices",
    description: "100% fresh pineapple juice", highlight: true,
    gallery: [pineappleJuice, galleryPineappleJuice, pineappleFruit, pineappleSlices],
    longDescription: "Shalimar's hero — 100% fresh pineapple juice extracted from ripe Amravati pineapples. No water, no concentrate, just pure golden juice served chilled in a tall glass.",
    highlights: ["100% fresh pineapple", "No water added", "Chilled & strained", "Served fresh daily"],
    prepTime: "3–4 min",
  },
  {
    id: "6", name: "Apple Juice", price: 50, image: appleJuice, category: "juices",
    description: "Pure fresh apple juice",
    gallery: [appleJuice, galleryApple],
    longDescription: "Hand-pressed fresh apple juice with a crisp, natural sweetness. Served chilled, never from concentrate.",
    highlights: ["Fresh apples", "No concentrate", "Lightly chilled", "Naturally sweet"],
    prepTime: "3–4 min",
  },
  {
    id: "7", name: "Kharbuja Juice", price: 50, image: kharbuzJuice, category: "juices",
    description: "Sweet refreshing muskmelon juice",
    gallery: [kharbuzJuice, galleryKharbuja],
    longDescription: "Sweet, cooling muskmelon (kharbuja) juice — perfect for Amravati summers. Made fresh on order, lightly chilled.",
    highlights: ["Fresh muskmelon", "Naturally cooling", "Light & hydrating", "Summer favourite"],
    prepTime: "3–4 min",
  },
  {
    id: "8", name: "Orange Juice", price: 50, image: orangeJuice, category: "juices",
    description: "Tangy fresh orange juice",
    gallery: [orangeJuice, galleryOrange],
    longDescription: "Hand-squeezed fresh oranges with a bright, tangy finish. Loaded with natural Vitamin C and served instantly.",
    highlights: ["Hand-squeezed oranges", "Rich in Vitamin C", "No added water", "Tangy & fresh"],
    prepTime: "3–4 min",
  },
  {
    id: "9", name: "Mosambi Juice", price: 50, image: mosambijuice, category: "juices",
    description: "Refreshing sweet lime juice",
    gallery: [mosambijuice, galleryOrange],
    longDescription: "Sweet lime (mosambi) juice freshly pressed and lightly chilled — a refreshing classic loved across all ages.",
    highlights: ["Fresh sweet lime", "No water added", "Lightly chilled", "Easy on the stomach"],
    prepTime: "3–4 min",
  },

  {
    id: "10", name: "Badam Shake", price: 30, image: badamShake, category: "dryfruit",
    description: "Rich almond milk shake",
    gallery: [badamShake, hotMilk, hotMilkKadhai],
    longDescription: "Slow-cooked badam (almond) milk shake with cardamom and crushed almonds. Rich, creamy and naturally energising.",
    highlights: ["Real almonds", "Slow-cooked milk", "Hint of cardamom", "Rich & creamy"],
    prepTime: "4–5 min",
  },
  {
    id: "11", name: "Ice Cream Falooda", price: 30, image: falooda, category: "dryfruit",
    description: "Classic rose falooda with ice cream",
    gallery: [falooda, galleryFalooda],
    longDescription: "Layered classic falooda with rose syrup, basil seeds, vermicelli and a generous scoop of ice cream on top. The all-time crowd favourite.",
    highlights: ["Rose syrup & sabja", "Soft vermicelli", "Vanilla ice cream", "Served tall & cold"],
    prepTime: "4–5 min",
  },
  {
    id: "12", name: "Hot Milk with Dry Fruits", price: 30, image: hotMilk, category: "dryfruit",
    description: "Warm milk with almonds & cashews",
    gallery: [hotMilk, hotMilkKadhai],
    longDescription: "Slow-simmered hot milk loaded with crushed almonds, cashews and pistachios. Our winter special — perfect after sunset.",
    highlights: ["Slow-simmered milk", "Almonds, cashews, pista", "Winter special", "Naturally warming"],
    prepTime: "5–6 min",
  },
  {
    id: "13", name: "Ice Cream Lassi", price: 30, image: iceCreamLassi, category: "dryfruit",
    description: "Creamy lassi topped with ice cream",
    gallery: [iceCreamLassi, galleryLassi],
    longDescription: "Thick churned curd lassi topped with a scoop of vanilla ice cream and a sprinkle of dry fruits. Smooth, cooling and indulgent.",
    highlights: ["Fresh thick curd", "Vanilla ice cream", "Dry fruit topping", "Served chilled"],
    prepTime: "3–4 min",
  },
];

export const categories = [
  { key: "shakes" as DrinkCategory, label: "Shakes", price: "₹10" },
  { key: "juices" as DrinkCategory, label: "Juices", price: "₹50" },
  { key: "dryfruit" as DrinkCategory, label: "Dry Fruit", price: "₹30" },
];
