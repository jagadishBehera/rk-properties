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

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isVisible];
};

const OurAchievements = () => {
  // Use the custom hook to trigger animation when the section comes into view
  const [sectionRef, isVisible] = useOnScreen({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Achievements data array (reduced height by using compact content)
  const achievements = [
    {
      icon: (
        <svg
          className="w-10 h-10" // slightly smaller icon for compact look
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      stat: "500+",
      label: "Projects Completed",
      description: "Successfully delivered",
    },
    {
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      stat: "250+",
      label: "Happy Clients",
      description: "Across the region",
    },
    {
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      ),
      stat: "15+",
      label: "Countries Served",
      description: "Global presence",
    },
    {
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
          />
        </svg>
      ),
      stat: "$2.5B",
      label: "Property Value",
      description: "Total transactions",
    },
  ];

  // Animation delay classes for staggered effect
  const animationDelay = ["delay-0", "delay-150", "delay-300", "delay-450"];

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our <span className="text-blue-600">Achievements</span>
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Milestones that define our journey and commitment to excellence.
          </p>
        </div>

        {/* Achievements Grid — cards with reduced height */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((item, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                transition-all duration-700 ease-out ${animationDelay[index]}`}
            >
              {/* Icon with animated background */}
              <div className="relative mb-4 inline-block">
                <div className="absolute inset-0 bg-blue-100 rounded-full blur-md group-hover:blur-lg transition-all duration-300 opacity-75 group-hover:opacity-100 scale-110 group-hover:scale-125"></div>
                <div className="relative text-blue-600 group-hover:text-blue-700 transition-colors duration-300 transform group-hover:scale-110">
                  {item.icon}
                </div>
              </div>

              {/* Stat - bold and large */}
              <div className="text-3xl font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                {item.stat}
              </div>

              {/* Label */}
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {item.label}
              </h3>

              {/* Description (compact) */}
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Decorative corner lines (same style) */}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-500"></div>
              <div className="absolute top-0 right-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Optional CTA Banner (adjusted for achievements) */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center bg-blue-50 p-2 pr-6 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
            <span className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium mr-4">
              View All
            </span>
            <span className="text-gray-700">Explore our success story</span>
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

      {/* Background decorative elements (optional) */}
      <div className="hidden lg:block absolute left-0 top-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="hidden lg:block absolute right-0 bottom-1/4 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    </section>
  );
};

export default OurAchievements;