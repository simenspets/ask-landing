import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FEATURES = [
  {
    title: "Increased conversion",
    description: "Ask is an interactive shopping assistant that gives customers confidence. They get answers to all their questions about usage and product care.",
    image: "/benefit-conversion.png",
    icon: "🛍️",
  },
  {
    title: "Valuable insights",
    description: "A modern dashboard gives you access to statistics and KPIs, so you know what your customers actually care about.",
    image: "/benefit-insights.png",
    icon: "📊",
  },
  {
    title: "Optimize your store",
    description: "An interactive assistant helps customers find the right product and keeps them engaged with relevant questions and tips.",
    image: "/benefit-optimize.png",
    icon: "⚡",
  },
];

export default function FeatureSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((i) => (i + 1) % FEATURES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="how" className="w-full bg-[#234034] py-20 px-4 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
          Uncertain visitors <span className="text-[#b6e2d3]">→</span> Paying customers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] md:h-[500px]">
            <AnimatePresence mode="wait">
              {FEATURES.map((feature, idx) => (idx === activeIdx) && (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">{feature.icon}</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#b6e2d3]">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-lg leading-relaxed text-white">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="relative h-[400px] md:h-[500px]">
            <AnimatePresence mode="wait">
              {FEATURES.map((feature, idx) => (idx === activeIdx) && (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="rounded-xl shadow-lg max-w-full w-auto max-h-64 md:max-h-80 object-cover"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {FEATURES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === activeIdx
                  ? "bg-[#b6e2d3] scale-125"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 