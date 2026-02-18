import React, { useEffect, useRef, useState } from "react";

// Custom hook for intersection observer to trigger animations on scroll
const useOnScreen = (options) => {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target); // once visible, stop observing
      }
    }, options);

    const currentRef = ref.current; // ✅ FIX: capture ref.current before async cleanup

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef); // ✅ FIX: use captured value, not ref.current
      }
    };
  }, [options]); // ✅ FIX: removed `ref` from deps — refs are stable and don't need to be listed

  return [ref, isVisible];
};

const WhyChooseUs = () => {
  // Use the custom hook to trigger animation when the section comes into view
  const [sectionRef, isVisible] = useOnScreen({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Features data array
  const features = [
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Best Price Guarantee",
      description:
        "We ensure you get the most competitive prices in the market with our extensive network and market knowledge.",
    },
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: "Expert Local Agents",
      description:
        "Our team consists of experienced professionals with deep local knowledge to guide you every step.",
    },
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Trusted & Transparent",
      description:
        "We prioritize your trust with complete transparency in all transactions, no hidden fees or surprises.",
    },
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "Fast & Efficient Service",
      description:
        "Time is money. We ensure quick responses, smooth processes, and fast closings for your property needs.",
    },
  ];

  // Animation delay classes for staggered effect
  const animationDelay = ["delay-0", "delay-150", "delay-300", "delay-450"];

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Why <span className="text-blue-600">Choose Us</span>
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the difference with our dedicated real estate services
            tailored just for you.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                transition-all duration-700 ease-out ${animationDelay[index]}`}
            >
              {/* Icon with animated background */}
              <div className="relative mb-6 inline-block">
                <div className="absolute inset-0 bg-blue-100 rounded-full blur-md group-hover:blur-lg transition-all duration-300 opacity-75 group-hover:opacity-100 scale-110 group-hover:scale-125"></div>
                <div className="relative text-blue-600 group-hover:text-blue-700 transition-colors duration-300 transform group-hover:scale-110">
                  {feature.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative corner line */}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-500"></div>
              <div className="absolute top-0 right-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Optional CTA Banner */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center bg-blue-50 p-2 pr-6 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
            <span className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium mr-4">
              Join Today
            </span>
            <span className="text-gray-700">
              Discover your dream property with us
            </span>
            <svg
              className="w-5 h-5 ml-3 text-blue-600 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="hidden lg:block absolute left-0 top-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="hidden lg:block absolute right-0 bottom-1/4 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    </section>
  );
};

export default WhyChooseUs;