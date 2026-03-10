import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Thermometer, Sun, Cloud, CloudRain, Snowflake, Wind } from "lucide-react";

interface WeatherData {
  temp: number;
  condition: string;
  city: string;
}

type DrinkSuggestion = {
  text: string;
  emoji: string;
  link: string;
};

const getDrinkSuggestion = (temp: number): DrinkSuggestion => {
  if (temp >= 35) {
    return {
      text: "Garmi bahut hai! 🍍 Try Pineapple Juice — super refreshing!",
      emoji: "🍍",
      link: "/menu",
    };
  } else if (temp >= 25) {
    return {
      text: "Perfect weather! Try Mango Shake or Mosambi Juice 🥭",
      emoji: "🥤",
      link: "/menu",
    };
  } else {
    return {
      text: "Thand hai! Falooda try karo — warm & delicious! 🍨",
      emoji: "🍨",
      link: "/menu",
    };
  }
};

const getWeatherIcon = (condition: string, temp: number) => {
  const lower = condition.toLowerCase();
  if (lower.includes("rain") || lower.includes("drizzle")) return CloudRain;
  if (lower.includes("snow")) return Snowflake;
  if (lower.includes("cloud") || lower.includes("overcast")) return Cloud;
  if (lower.includes("wind")) return Wind;
  if (temp >= 35) return Sun;
  return Sun;
};

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSuggestion, setShowSuggestion] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch("https://wttr.in/Hyderabad?format=j1");
        const data = await res.json();
        const current = data.current_condition[0];
        setWeather({
          temp: parseInt(current.temp_C),
          condition: current.weatherDesc[0].value,
          city: "Hyderabad",
        });
      } catch {
        // Fallback weather
        setWeather({ temp: 32, condition: "Sunny", city: "Hyderabad" });
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  useEffect(() => {
    if (weather) {
      const timer = setTimeout(() => setShowSuggestion(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [weather]);

  if (loading || !weather) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-dark rounded-2xl p-4 flex items-center gap-3 min-w-[200px]"
      >
        <div className="w-8 h-8 rounded-full bg-primary/20 animate-pulse" />
        <div className="space-y-1.5">
          <div className="h-3 w-20 bg-primary/20 rounded animate-pulse" />
          <div className="h-2 w-14 bg-primary/10 rounded animate-pulse" />
        </div>
      </motion.div>
    );
  }

  const suggestion = getDrinkSuggestion(weather.temp);
  const WeatherIcon = getWeatherIcon(weather.condition, weather.temp);

  const tempColor =
    weather.temp >= 35
      ? "text-red-400"
      : weather.temp >= 25
      ? "text-primary"
      : "text-blue-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: smoothEase }}
      className="glass-dark rounded-2xl p-4 md:p-5 max-w-sm"
    >
      {/* Weather info */}
      <div className="flex items-center gap-3 mb-3">
        <motion.div
          className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <WeatherIcon className={`w-5 h-5 ${tempColor}`} strokeWidth={1.5} />
        </motion.div>
        <div>
          <div className="flex items-center gap-2">
            <span className={`font-display text-2xl font-extrabold ${tempColor}`}>
              {weather.temp}°C
            </span>
            <Thermometer className={`w-4 h-4 ${tempColor}`} strokeWidth={1.5} />
          </div>
          <p className="font-body text-[11px] text-header-muted">
            {weather.condition} • {weather.city}
          </p>
        </div>
      </div>

      {/* Drink Suggestion */}
      <AnimatePresence>
        {showSuggestion && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: smoothEase }}
          >
            <div className="border-t border-header-accent/20 pt-3">
              <p className="font-body text-xs text-header-light leading-relaxed">
                <span className="text-base mr-1">{suggestion.emoji}</span>
                {suggestion.text}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WeatherWidget;
