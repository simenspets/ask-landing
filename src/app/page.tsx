"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const EFFECTS = [
  "confident shoppers",
  "fewer returns",
  "higher engagement",
  "customer insight",
];

const BENEFITS = [
  {
    title: "Increased conversion",
    description: "Ask is an interactive shopping assistant that gives customers confidence. They get answers to all their questions about usage and product care.",
    image: "/benefit-conversion.png"
  },
  {
    title: "Valuable insights",
    description: "A modern dashboard gives you access to statistics and KPIs, so you know what your customers actually care about.",
    image: "/benefit-insights.png"
  },
  {
    title: "Optimize your store",
    description: "An interactive assistant helps customers find the right product and keeps them engaged with relevant questions and tips.",
    image: "/benefit-optimize.png"
  }
];

const TEAM = [
  {
    name: "Kristoffer Strømdal Wik",
    role: "CEO",
    img: "/team1.png",
    desc: "Kristoffer is responsible for strategy and business development. He ensures Ask delivers value to online stores and their customers.",
  },
  {
    name: "Sivert Folgerø",
    role: "CMO",
    img: "/team2.png",
    desc: "Sivert drives marketing and communication. He makes sure Ask reaches the right audience and helps stores grow.",
  },
  {
    name: "Simen Spets Storhov",
    role: "CFO",
    img: "/team3.png",
    desc: "Simen is responsible for finance and analytics. He ensures Ask is sustainable and delivers measurable results.",
  },
  {
    name: "Sven William Nevin",
    role: "CTO",
    img: "/team4.png",
    desc: "Sven is the technical lead and ensures Ask is robust, scalable, and easy to integrate for all customers.",
  },
];

const PRICING = [
  {
    name: "Start",
    price: "250",
    features: [
      "Up to 30,000 monthly visitors",
      "Ask on all products",
      "Product knowledge, Q&A, and reviews",
      "Dashboard and statistics",
      "24/7 support",
    ],
    cta: "Try free for 14 days",
  },
  {
    name: "Full",
    price: "600",
    features: [
      "Everything in Start",
      "Up to 100,000 monthly visitors",
      "Advanced analytics",
      "Custom integrations",
      "Priority support",
    ],
    cta: "Try free for 14 days",
  },
  {
    name: "Premium",
    price: "850",
    features: [
      "Everything in Full",
      "Over 100,000 monthly visitors",
      "API access",
      "Premium 24/7 support",
    ],
    cta: "Try free for 14 days",
  },
  {
    name: "Enterprise",
    price: "Contact us",
    features: [
      "Everything in Premium",
      "Custom integrations",
      "Dedicated account manager",
      "Custom onboarding",
    ],
    cta: "Contact us",
  },
];

export default function Home() {
  const [effectIdx, setEffectIdx] = useState(0);
  const [prevEffectIdx, setPrevEffectIdx] = useState<number|null>(null);
  const [benefitIdx, setBenefitIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Hero text animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPrevEffectIdx(effectIdx);
      setIsTransitioning(true);
      setTimeout(() => {
        setEffectIdx((i) => (i + 1) % EFFECTS.length);
        setIsTransitioning(false);
        setPrevEffectIdx(null);
      }, 600); // match duration
    }, 3000);
    return () => clearInterval(interval);
  }, [effectIdx]);

  // Benefits carousel animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setBenefitIdx((i) => (i + 1) % BENEFITS.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  async function handleCheckout(plan: string) {
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { sessionId, error } = await res.json();
      
      if (error) {
        throw new Error(error);
      }

      if (!sessionId) {
        throw new Error('No session ID received from server');
      }

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });
      if (stripeError) {
        throw new Error(stripeError.message);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }

  return (
    <div className="bg-[#f6f7f3] min-h-screen font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-[#f6f7f3] border-b border-[#e2e4dd] flex items-center justify-between px-8 py-4">
        <div className="font-bold text-2xl text-[#234034]">Ask</div>
        <div className="hidden md:flex gap-8 text-[#234034] font-medium">
          <a href="#how" className="hover:underline">How it works</a>
          <a href="#pricing" className="hover:underline">Pricing</a>
          <a href="#about" className="hover:underline">About</a>
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg border border-[#234034] px-4 py-2 text-[#234034] font-semibold bg-white hover:bg-[#e2e4dd] transition">Log in</button>
          <button className="rounded-lg px-4 py-2 font-semibold bg-[#234034] text-white hover:bg-[#2e5c4e] transition">Get started</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="w-full flex flex-col items-center justify-center py-24 px-4 text-center">
        <button className="mb-6 px-4 py-2 rounded-full bg-white border border-[#e2e4dd] text-[#234034] font-medium shadow-sm hover:bg-[#e2e4dd] transition">See how it works</button>
        <div className="mb-0">
          <span className="text-5xl md:text-6xl font-normal text-[#234034]">Ask gives you</span>
        </div>
        <div className="h-[56px] md:h-[80px] flex items-center justify-center mt-[-8px] mb-2 relative overflow-hidden" style={{minHeight:56}}>
          {/* Outgoing and incoming text during transition */}
          {isTransitioning && prevEffectIdx !== null ? (
            <>
              <span
                key={`out-${prevEffectIdx}`}
                className="block text-5xl md:text-6xl font-extrabold text-[#234034] leading-tight absolute left-0 right-0 transition-all duration-600 ease-linear opacity-0 -translate-y-8 pointer-events-none"
                style={{minWidth:260}}
              >
                {EFFECTS[prevEffectIdx]}
              </span>
              <span
                key={`in-${effectIdx}`}
                className="block text-5xl md:text-6xl font-extrabold text-[#234034] leading-tight absolute left-0 right-0 transition-all duration-600 ease-linear opacity-100 translate-y-0"
                style={{minWidth:260}}
              >
                {EFFECTS[effectIdx]}
              </span>
            </>
          ) : (
            <span
              key={`static-${effectIdx}`}
              className="block text-5xl md:text-6xl font-extrabold text-[#234034] leading-tight"
              style={{minWidth:260}}
            >
              {EFFECTS[effectIdx]}
            </span>
          )}
        </div>
        <p className="text-base md:text-lg text-[#234034] mb-8 max-w-xl mx-auto mt-0">
          Revolutionize your online store experience with an interactive product assistant. Set up for your entire store in just 2 minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="rounded-lg border border-[#234034] px-6 py-3 text-[#234034] font-semibold bg-white hover:bg-[#e2e4dd] transition">Book a demo</button>
          <button className="rounded-lg px-6 py-3 font-semibold bg-[#234034] text-white hover:bg-[#2e5c4e] transition">Get started</button>
        </div>
      </section>

      {/* Benefits Carousel */}
      <section id="how" className="w-full bg-[#234034] py-20 px-4 overflow-hidden">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
            Uncertain visitors <span className="text-[#b6e2d3]">→</span> Paying customers
          </h2>
          
          <div className="relative h-[400px] md:h-[500px]">
            {BENEFITS.map((benefit, index) => (
              <div
                key={benefit.title}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === benefitIdx
                    ? 'opacity-100 translate-y-0'
                    : index < benefitIdx
                    ? 'opacity-0 -translate-y-full'
                    : 'opacity-0 translate-y-full'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
                  <div className="text-white flex flex-col gap-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#b6e2d3] mb-4">
                      {benefit.title}
                    </h3>
                    <p className="text-lg leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                  <div className="flex justify-center items-center">
                    <img
                      src={benefit.image}
                      alt={benefit.title}
                      className={`rounded-xl shadow-lg max-w-full w-auto max-h-64 md:max-h-80 object-cover transition-opacity transition-transform duration-700 ease-linear
                        ${index === benefitIdx ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-4 z-0'}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {BENEFITS.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setBenefitIdx(index);
                    setIsTransitioning(false);
                  }, 500);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === benefitIdx
                    ? 'bg-[#b6e2d3] scale-125'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="w-full py-20 px-4 bg-[#f6f7f3]">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-bold text-[#234034] text-center mb-2">Pricing that grows with you</h2>
          <p className="text-[#234034] text-center mb-8">Scale your plan as your store grows – and always keep your best price.</p>
          <div className="flex justify-center mb-8">
            <button className="rounded-full px-4 py-2 bg-white border border-[#e2e4dd] text-[#234034] font-medium shadow-sm mr-2">Monthly</button>
            <button className="rounded-full px-4 py-2 bg-white border border-[#e2e4dd] text-[#234034] font-medium shadow-sm opacity-60">Yearly (soon)</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {PRICING.map((plan, i) => (
              <div key={plan.name} className={`rounded-2xl bg-white border border-[#e2e4dd] shadow-sm p-8 flex flex-col gap-4 ${i === 1 ? "ring-2 ring-[#b6e2d3]" : ""}`}>
                <h3 className="text-xl font-semibold text-[#234034]">{plan.name}</h3>
                <p className="text-4xl font-bold text-[#234034]">{plan.price}{plan.price !== "Contact us" && <span className="text-base font-normal"> $ / month</span>}</p>
                <ul className="flex-1 space-y-1 text-sm text-[#234034] opacity-80 list-disc list-inside">
                  {plan.features.map(f => <li key={f}>{f}</li>)}
                </ul>
                {plan.name !== "Enterprise" ? (
                  <button
                    className="rounded-lg px-4 py-2 font-semibold bg-[#234034] text-white hover:bg-[#2e5c4e] transition mt-auto"
                    onClick={() => handleCheckout(plan.name.toLowerCase())}
                  >
                    {plan.cta}
                  </button>
                ) : (
                  <button className="rounded-lg px-4 py-2 font-semibold bg-[#234034] text-white opacity-60 cursor-not-allowed mt-auto">{plan.cta}</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About & Team */}
      <section id="about" className="w-full py-20 px-4 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-bold text-[#234034] text-center mb-8">About Ask</h2>
          <p className="text-[#234034] text-center mb-12 max-w-2xl mx-auto">
            We are four young entrepreneurs from Trondheim, Norway, dedicated to improving the online shopping experience for both stores and customers. We want Ask to help customers make the right choices, reduce unnecessary returns, and turn unsure visitors into loyal, paying customers.
          </p>
          <h3 className="text-2xl font-semibold text-[#234034] text-center mb-8">Meet our team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {TEAM.map((member) => (
              <div key={member.name} className="rounded-2xl bg-[#f6f7f3] border border-[#e2e4dd] shadow-sm p-6 flex flex-col items-center text-center">
                <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full object-cover mb-4" />
                <div className="font-bold text-lg text-[#234034]">{member.name}</div>
                <div className="text-[#234034] opacity-80 mb-2">{member.role}</div>
                <div className="text-[#234034] text-sm opacity-80">{member.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#e2e4dd] text-[#234034] py-8 mt-12">
        <div className="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-bold text-xl">Ask</div>
          <div className="flex gap-6">
            <a href="#how" className="hover:underline">How it works</a>
            <a href="#pricing" className="hover:underline">Pricing</a>
            <a href="#about" className="hover:underline">About</a>
          </div>
          <div className="text-sm">© {new Date().getFullYear()} Ask. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
