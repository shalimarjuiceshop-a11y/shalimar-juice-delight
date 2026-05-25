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

export type DrinkCategory = "shakes" | "juices" | "dryfruit";

export interface Drink {
  id: string;
  name: string;
  price: number;
  image: string;
  category: DrinkCategory;
  description: string;
  highlight?: boolean;
}

export const drinks: Drink[] = [
  { id: "1", name: "Pineapple Shake", price: 10, image: pineappleShake, category: "shakes", description: "Creamy fresh pineapple shake", highlight: true },
  { id: "2", name: "Apple Shake", price: 10, image: appleShake, category: "shakes", description: "Fresh apple blended shake" },
  { id: "3", name: "Mango Shake", price: 10, image: mangoShake, category: "shakes", description: "Thick creamy mango shake" },
  { id: "4", name: "Guava Shake", price: 10, image: guavaShake, category: "shakes", description: "Fresh pink guava shake" },

  { id: "5", name: "Pineapple Juice", price: 50, image: pineappleJuice, category: "juices", description: "100% fresh pineapple juice", highlight: true },
  { id: "6", name: "Apple Juice", price: 50, image: appleJuice, category: "juices", description: "Pure fresh apple juice" },
  { id: "7", name: "Kharbuja Juice", price: 50, image: kharbuzJuice, category: "juices", description: "Sweet refreshing muskmelon juice" },
  { id: "8", name: "Orange Juice", price: 50, image: orangeJuice, category: "juices", description: "Tangy fresh orange juice" },
  { id: "9", name: "Mosambi Juice", price: 50, image: mosambijuice, category: "juices", description: "Refreshing sweet lime juice" },

  { id: "10", name: "Badam Shake", price: 30, image: badamShake, category: "dryfruit", description: "Rich almond milk shake" },
  { id: "11", name: "Ice Cream Falooda", price: 30, image: falooda, category: "dryfruit", description: "Classic rose falooda with ice cream" },
  { id: "12", name: "Hot Milk with Dry Fruits", price: 30, image: hotMilk, category: "dryfruit", description: "Warm milk with almonds & cashews" },
  { id: "13", name: "Ice Cream Lassi", price: 30, image: iceCreamLassi, category: "dryfruit", description: "Creamy lassi topped with ice cream" },
];

export const categories = [
  { key: "shakes" as DrinkCategory, label: "Shakes", price: "₹10" },
  { key: "juices" as DrinkCategory, label: "Juices", price: "₹50" },
  { key: "dryfruit" as DrinkCategory, label: "Dry Fruit", price: "₹30" },
];
