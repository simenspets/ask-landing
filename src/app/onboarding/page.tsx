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

  // State for step 3
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [otherGoal, setOtherGoal] = useState("");

  // State for step 4
  const [productType, setProductType] = useState("");
  const [categories, setCategories] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const GOALS = [
    {
      id: "increase_sales",
      title: "Increase Sales",
      description: "Convert more visitors into paying customers"
    },
    {
      id: "reduce_returns",
      title: "Reduce Returns",
      description: "Help customers make better purchase decisions"
    },
    {
      id: "save_time",
      title: "Save Time",
      description: "Reduce time spent on customer support"
    },
    {
      id: "improve_experience",
      title: "Improve Experience",
      description: "Give customers instant answers 24/7"
    }
  ];

  const handleGoalToggle = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleNext = () => {
    if (currentStep === 2) {
      if (!companyName.trim() || !website.trim()) {
        setStep2Error("Please fill out both company name and website.");
        return;
      }
      setStep2Error("");
    }
    if (currentStep === 3) {
      if (selectedGoals.length === 0) {
        return; // Don't proceed if no goals are selected
      }
    }
    if (currentStep === 4) {
      if (!productType) {
        return; // Don't proceed if no product type is selected
      }
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

        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className=""
          >
            <h2 className="text-2xl font-bold text-[#234034] mb-4">Goals & Needs</h2>
            <p className="text-gray-600 mb-6">What are your main goals with Ask? Select all that apply.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {GOALS.map(goal => (
                <div
                  key={goal.id}
                  onClick={() => handleGoalToggle(goal.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all
                    ${selectedGoals.includes(goal.id)
                      ? "border-[#234034] bg-[#f6f7f3]"
                      : "border-[#e2e4dd] hover:border-[#b6e2d3]"
                    }`}
                >
                  <div className="flex items-center mb-2">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center
                      ${selectedGoals.includes(goal.id)
                        ? "border-[#234034] bg-[#234034]"
                        : "border-[#e2e4dd]"
                      }`}
                    >
                      {selectedGoals.includes(goal.id) && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                        </svg>
                      )}
                    </div>
                    <h3 className="font-semibold text-[#234034]">{goal.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm ml-8">{goal.description}</p>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-[#234034] font-medium mb-1">Other Goals</label>
              <input
                type="text"
                className="w-full border border-[#e2e4dd] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b6e2d3]"
                value={otherGoal}
                onChange={e => setOtherGoal(e.target.value)}
                placeholder="Any other goals? (optional)"
              />
            </div>

            <button
              onClick={handleNext}
              disabled={selectedGoals.length === 0}
              className={`mt-8 px-8 py-3 rounded-full transition-colors w-full
                ${selectedGoals.length > 0
                  ? "bg-[#234034] text-white hover:bg-[#2e5c4e]"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
            >
              Next
            </button>
          </motion.div>
        )}

        {currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className=""
          >
            <h2 className="text-2xl font-bold text-[#234034] mb-4">Product Information</h2>
            <p className="text-gray-600 mb-6">Tell us about your products or services to help us customize your AI assistant.</p>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-[#234034] font-medium mb-1">Product Type *</label>
                <select
                  className="w-full border border-[#e2e4dd] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b6e2d3] bg-white"
                  value={productType}
                  onChange={e => setProductType(e.target.value)}
                >
                  <option value="">Select type...</option>
                  <option value="physical">Physical Products</option>
                  <option value="digital">Digital Products</option>
                  <option value="service">Services</option>
                  <option value="hybrid">Hybrid (Multiple Types)</option>
                </select>
              </div>

              <div>
                <label className="block text-[#234034] font-medium mb-1">Product Categories</label>
                <input
                  type="text"
                  className="w-full border border-[#e2e4dd] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b6e2d3]"
                  value={categories}
                  onChange={e => setCategories(e.target.value)}
                  placeholder="e.g. Electronics, Clothing, Software"
                />
              </div>

              <div>
                <label className="block text-[#234034] font-medium mb-1">Average Price Range</label>
                <select
                  className="w-full border border-[#e2e4dd] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b6e2d3] bg-white"
                  value={priceRange}
                  onChange={e => setPriceRange(e.target.value)}
                >
                  <option value="">Select range...</option>
                  <option value="budget">Under $50</option>
                  <option value="mid">$50 - $200</option>
                  <option value="premium">$200 - $1000</option>
                  <option value="luxury">$1000+</option>
                </select>
              </div>

              <div>
                <label className="block text-[#234034] font-medium mb-1">Brief Product Description</label>
                <textarea
                  className="w-full border border-[#e2e4dd] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b6e2d3] h-24"
                  value={productDescription}
                  onChange={e => setProductDescription(e.target.value)}
                  placeholder="Describe your main products or services..."
                />
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={!productType}
              className={`mt-8 px-8 py-3 rounded-full transition-colors w-full
                ${productType
                  ? "bg-[#234034] text-white hover:bg-[#2e5c4e]"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
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