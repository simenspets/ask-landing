"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // State for step 2
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [employees, setEmployees] = useState("");
  const [industry, setIndustry] = useState("");
  const [step2Error, setStep2Error] = useState("");

  const handleNext = () => {
    if (currentStep === 2) {
      if (!companyName.trim() || !website.trim()) {
        setStep2Error("Please fill out both company name and website.");
        return;
      }
      setStep2Error("");
    }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f7f3] flex flex-col items-center justify-center p-4">
      {/* Progress bar */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex justify-between mb-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index + 1 <= currentStep ? "bg-[#234034]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
        <div className="h-1 bg-gray-200 rounded-full">
          <motion.div
            className="h-full bg-[#234034] rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold text-[#234034] mb-4">
              Welcome to Ask
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Let us help you set up your own AI-powered product assistant.
              We'll guide you through a few simple steps to get started.
            </p>
            <button
              onClick={handleNext}
              className="bg-[#234034] text-white px-8 py-3 rounded-full hover:bg-[#2e5c4e] transition-colors"
            >
              Let's get started
            </button>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className=""
          >
            <h2 className="text-2xl font-bold text-[#234034] mb-4">Company Information</h2>
            <p className="text-gray-600 mb-6">This helps us customize the experience for you.</p>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-[#234034] font-medium mb-1">Company Name *</label>
                <input
                  type="text"
                  className="w-full border border-[#e2e4dd] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b6e2d3]"
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  placeholder="e.g. Ask Inc"
                />
              </div>
              <div>
                <label className="block text-[#234034] font-medium mb-1">Website *</label>
                <input
                  type="url"
                  className="w-full border border-[#e2e4dd] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b6e2d3]"
                  value={website}
                  onChange={e => setWebsite(e.target.value)}
                  placeholder="e.g. https://ask.ai"
                />
              </div>
              <div>
                <label className="block text-[#234034] font-medium mb-1">Number of Employees</label>
                <input
                  type="number"
                  className="w-full border border-[#e2e4dd] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b6e2d3]"
                  value={employees}
                  onChange={e => setEmployees(e.target.value)}
                  placeholder="e.g. 10"
                  min={1}
                />
              </div>
              <div>
                <label className="block text-[#234034] font-medium mb-1">Industry</label>
                <input
                  type="text"
                  className="w-full border border-[#e2e4dd] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b6e2d3]"
                  value={industry}
                  onChange={e => setIndustry(e.target.value)}
                  placeholder="e.g. E-commerce"
                />
              </div>
            </div>
            {step2Error && <div className="text-red-500 mt-4 text-sm">{step2Error}</div>}
            <button
              onClick={handleNext}
              className="mt-8 bg-[#234034] text-white px-8 py-3 rounded-full hover:bg-[#2e5c4e] transition-colors w-full"
            >
              Next
            </button>
          </motion.div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="text-[#234034] hover:text-[#2e5c4e]"
            >
              ← Back
            </button>
          )}
          {currentStep < totalSteps && (
            <button
              onClick={handleNext}
              className="ml-auto text-[#234034] hover:text-[#2e5c4e]"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 