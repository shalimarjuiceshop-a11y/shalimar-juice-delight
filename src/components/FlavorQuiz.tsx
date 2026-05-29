import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RotateCcw, ArrowRight, ShoppingBag } from "lucide-react";
import { drinks } from "@/data/menuData";
import quizIntroGlass from "@/assets/quiz-intro-glass.png";
import quizMood from "@/assets/quiz-mood.png";
import quizApple from "@/assets/quiz-apple.png";
import quizClock from "@/assets/quiz-clock.png";
import quizCelebrate from "@/assets/quiz-celebrate.png";

const questionImages = [quizMood, quizApple, quizClock];


const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Question {
  question: string;
  emoji: string;
  options: { label: string; emoji: string; tags: string[] }[];
}

const questions: Question[] = [
  {
    question: "Aapka mood kaisa hai?",
    emoji: "😊",
    options: [
      { label: "Energetic & Fresh", emoji: "⚡", tags: ["juices"] },
      { label: "Chill & Creamy", emoji: "🍦", tags: ["shakes"] },
      { label: "Warm & Cozy", emoji: "☕", tags: ["dryfruit"] },
      { label: "Adventurous", emoji: "🎯", tags: ["juices", "dryfruit"] },
    ],
  },
  {
    question: "Kaunsa flavor pasand hai?",
    emoji: "🍎",
    options: [
      { label: "Sweet & Tropical", emoji: "🍍", tags: ["pineapple", "mango"] },
      { label: "Tangy & Citrusy", emoji: "🍊", tags: ["orange", "mosambi"] },
      { label: "Nutty & Rich", emoji: "🥜", tags: ["badam", "dryfruit"] },
      { label: "Classic & Simple", emoji: "🍏", tags: ["apple", "guava"] },
    ],
  },
  {
    question: "Kab peena hai?",
    emoji: "⏰",
    options: [
      { label: "Morning Energy", emoji: "🌅", tags: ["juices", "fresh"] },
      { label: "Afternoon Treat", emoji: "☀️", tags: ["shakes", "lassi"] },
      { label: "Evening Snack", emoji: "🌇", tags: ["falooda", "shakes"] },
      { label: "Late Night", emoji: "🌙", tags: ["dryfruit", "hot"] },
    ],
  },
];

const getRecommendation = (answers: number[]) => {
  const allTags: string[] = [];
  answers.forEach((ansIdx, qIdx) => {
    if (questions[qIdx]?.options[ansIdx]) {
      allTags.push(...questions[qIdx].options[ansIdx].tags);
    }
  });

  // Score each drink
  const scored = drinks.map((drink) => {
    let score = 0;
    const name = drink.name.toLowerCase();
    const cat = drink.category;
    allTags.forEach((tag) => {
      if (name.includes(tag)) score += 3;
      if (cat === tag) score += 2;
      if (tag === "fresh" && cat === "juices") score += 1;
      if (tag === "hot" && name.includes("hot")) score += 3;
      if (tag === "lassi" && name.includes("lassi")) score += 3;
      if (tag === "falooda" && name.includes("falooda")) score += 3;
    });
    if (drink.highlight) score += 1;
    return { drink, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0].drink;
};

const FlavorQuiz = () => {
  const [step, setStep] = useState(0); // 0 = intro, 1-3 = questions, 4 = result
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleAnswer = (optionIdx: number) => {
    setSelectedOption(optionIdx);
    setTimeout(() => {
      const newAnswers = [...answers, optionIdx];
      setAnswers(newAnswers);
      setSelectedOption(null);
      setStep(step + 1);
    }, 400);
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setSelectedOption(null);
  };

  const recommendation = step === 4 ? getRecommendation(answers) : null;
  const currentQuestion = step >= 1 && step <= 3 ? questions[step - 1] : null;
  const progress = step >= 1 && step <= 3 ? ((step) / 3) * 100 : step === 4 ? 100 : 0;

  const handleWhatsAppOrder = () => {
    if (!recommendation) return;
    const message = `Hi! I would like to order *${recommendation.name}* (₹${recommendation.price}) from Shalimar Juice Shop.`;
    window.open(`https://wa.me/919852779933?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center gap-1.5 text-[10px] font-body font-bold tracking-widest uppercase px-3 py-1.5 rounded-full bg-primary/10 text-primary mb-4">
            <Sparkles size={10} className="fill-current" /> Interactive
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight text-foreground">
            Find Your <span className="text-gradient-gold">Perfect Drink</span>
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-2">
            3 sawaal, aur hum batayenge aapke liye best drink!
          </p>
        </motion.div>

        {/* Progress Bar */}
        {step >= 1 && (
          <div className="w-full h-1.5 bg-muted rounded-full mb-8 overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: smoothEase }}
            />
          </div>
        )}

        <div className="relative min-h-[320px]">
          <AnimatePresence mode="wait">
            {/* Intro */}
            {step === 0 && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: smoothEase }}
                className="text-center"
              >
                <motion.img
                  src={quizIntroGlass}
                  alt="Fresh juice"
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="w-32 h-32 md:w-40 md:h-40 object-contain mx-auto mb-6 drop-shadow-2xl"
                  animate={{ y: [0, -8, 0], rotate: [0, -2, 2, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  Ready to discover your perfect drink?
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-8">
                  Bas 3 simple questions — aur aapka ideal drink mil jayega!
                </p>
                <motion.button
                  onClick={() => setStep(1)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-bold text-sm px-8 py-4 rounded-2xl glow-gold"
                >
                  Start Quiz <ArrowRight size={16} />
                </motion.button>
              </motion.div>
            )}

            {/* Questions */}
            {currentQuestion && (
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4, ease: smoothEase }}
              >
                <div className="text-center mb-8">
                  <motion.img
                    key={`qimg-${step}`}
                    src={questionImages[step - 1]}
                    alt=""
                    width={1024}
                    height={1024}
                    loading="lazy"
                    className="w-20 h-20 md:w-24 md:h-24 object-contain mx-auto mb-3 drop-shadow-xl"
                    initial={{ scale: 0.6, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 16 }}
                  />

                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">
                    {currentQuestion.question}
                  </h3>
                  <p className="font-body text-xs text-muted-foreground mt-1">
                    Question {step} of 3
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {currentQuestion.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.4, ease: smoothEase }}
                      whileHover={{ scale: 1.03, y: -4 }}
                      whileTap={{ scale: 0.97 }}
                      className={`relative p-5 rounded-2xl border text-center transition-all duration-300 ${
                        selectedOption === i
                          ? "bg-primary/20 border-primary shadow-pineapple"
                          : "bg-card border-border hover:border-primary/40 hover:shadow-pineapple"
                      }`}
                    >
                      <span className="text-2xl block mb-2">{opt.emoji}</span>
                      <span className="font-display text-sm font-bold text-foreground">{opt.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Result */}
            {step === 4 && recommendation && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: smoothEase }}
                className="text-center"
              >
                <motion.img
                  src={quizCelebrate}
                  alt="Celebration"
                  width={1024}
                  height={1024}
                  loading="lazy"
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0, y: [0, -6, 0] }}
                  transition={{
                    scale: { type: "spring", stiffness: 260, damping: 18, delay: 0.2 },
                    rotate: { type: "spring", stiffness: 260, damping: 18, delay: 0.2 },
                    y: { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
                  }}
                  className="w-24 h-24 md:w-28 md:h-28 object-contain mx-auto mb-4 drop-shadow-2xl"
                />

                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  Your Perfect Drink Is...
                </h3>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="inline-block bg-card rounded-3xl border border-primary/30 p-6 mt-4 shadow-pineapple"
                >
                  <motion.img
                    src={recommendation.image}
                    alt={recommendation.name}
                    className="w-32 h-32 md:w-40 md:h-40 object-contain mx-auto mb-4 drop-shadow-xl"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <h4 className="font-display text-2xl font-black text-foreground">
                    {recommendation.name}
                  </h4>
                  <p className="font-body text-sm text-muted-foreground mt-1 mb-4">
                    {recommendation.description}
                  </p>
                  <motion.span
                    className="inline-block bg-primary text-primary-foreground font-display text-xl font-black px-6 py-2 rounded-full glow-gold-soft mb-4"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ₹{recommendation.price}
                  </motion.span>

                  <div className="flex flex-col gap-2 mt-2">
                    <motion.button
                      onClick={handleWhatsAppOrder}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center justify-center gap-1.5 bg-whatsapp text-whatsapp-foreground font-body text-sm font-bold px-6 py-3 rounded-xl hover:brightness-110 transition-all"
                    >
                      <ShoppingBag size={14} /> Order on WhatsApp
                    </motion.button>
                    <motion.button
                      onClick={reset}
                      whileHover={{ scale: 1.03 }}
                      className="flex items-center justify-center gap-1.5 font-body text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors py-2"
                    >
                      <RotateCcw size={12} /> Try Again
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default FlavorQuiz;
