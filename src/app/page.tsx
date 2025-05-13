"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import FeatureSection from "@/components/FeatureSection";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const EFFECTS = [
  "confident shoppers",
  "fewer returns",
  "higher engagement",
  "customer insight",
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

  // Hero text animation
  useEffect(() => {
    const interval = setInterval(() => {
      setEffectIdx((i) => (i + 1) % EFFECTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
          <div className="relative w-full h-full">
            {EFFECTS.map((effect, index) => (
              <span
                key={effect}
                className={`block text-5xl md:text-6xl font-extrabold text-[#234034] leading-tight absolute left-0 right-0 transition-all duration-700 ease-in-out
                  ${index === effectIdx ? 'opacity-100 translate-y-0 z-10' : index < effectIdx ? 'opacity-0 -translate-y-full z-0' : 'opacity-0 translate-y-full z-0'}`}
                style={{minWidth:260}}
              >
                {effect}
              </span>
            ))}
          </div>
        </div>
        <p className="text-base md:text-lg text-[#234034] mb-8 max-w-xl mx-auto mt-0">
          Revolutionize your online store experience with an interactive product assistant. Set up for your entire store in just 2 minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="rounded-lg border border-[#234034] px-6 py-3 text-[#234034] font-semibold bg-white hover:bg-[#e2e4dd] transition">Book a demo</button>
          <button className="rounded-lg px-6 py-3 font-semibold bg-[#234034] text-white hover:bg-[#2e5c4e] transition">Get started</button>
        </div>
      </section>

      {/* Feature Section */}
      <FeatureSection />

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
                    onClick={() => window.location.href = "/onboarding"}
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
