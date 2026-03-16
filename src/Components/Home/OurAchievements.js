import React, { useEffect, useRef, useState } from "react";
import bgImage from "../../assets/bg-section4.jpg";
import bottomPattern from "../../assets/bg-section.png";

// Custom hook for intersection observer to trigger animations on scroll
const useOnScreen = (options) => {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
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

// Counter component that animates from 0 to target value
const AnimatedCounter = ({ target, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = Math.ceil(target / (duration / 16)); // ~60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const OurAchievements = () => {
  // Use the custom hook to trigger animation when the section comes into view
  const [sectionRef, isVisible] = useOnScreen({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Achievements data array with numeric values for counting
  const achievements = [
    {
      icon: (
        <svg
          className="w-12 h-12 text-white" // white icon to stand out on dark overlay
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
      value: 500,
      suffix: "+",
      label: "Projects Completed",
      description: "Successfully delivered",
    },
    {
      icon: (
        <svg
          className="w-12 h-12 text-white"
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
      value: 250,
      suffix: "+",
      label: "Happy Clients",
      description: "Across the region",
    },
    {
      icon: (
        <svg
          className="w-12 h-12 text-white"
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
      value: 15,
      suffix: "+",
      label: "Countries Served",
      description: "Global presence",
    },
    {
      icon: (
        <svg
          className="w-12 h-12 text-white"
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
      value: 2.5,
      suffix: "B",
      label: "Property Value",
      description: "Total transactions",
    },
  ];

  // Animation delay classes for staggered effect
  const animationDelay = ["delay-0", "delay-150", "delay-300", "delay-450"];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-cover bg-fixed bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Bottom Repeating Pattern */}
      <div
        className="absolute bottom-0 left-0 w-full h-24 bg-repeat-x bg-bottom pointer-events-none"
        style={{ backgroundImage: `url(${bottomPattern})` }}
      ></div>

      {/* Dark overlay for better text contrast */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-70"></div> */}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header - with light text to stand out on dark bg */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-white">Achievements</span>
          </h2>
          <div className="w-24 h-1 bg-white mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Milestones that define our journey and commitment to excellence.
          </p>
        </div>

        {/* Achievements Grid — no cards, just clean stats with icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((item, index) => (
            <div
              key={index}
              className={`text-center transform transition-all duration-700 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              } ${animationDelay[index]}`}
            >
              {/* Icon with subtle glow on hover */}
              <div className="relative inline-block mb-4 group">
                <div className="absolute inset-0 bg-red-500/30 rounded-full blur-xl group-hover:bg-red-500/50 transition-all duration-300 scale-150"></div>
                <div className="relative transform group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
              </div>

              {/* Stat - large, bold, with counting animation */}
              <div className="text-5xl font-bold text-white mb-2">
                {isVisible ? (
                  <>
                    <AnimatedCounter
                      target={item.value}
                      suffix={item.suffix}
                      duration={2000}
                    />
                  </>
                ) : (
                  `0${item.suffix}`
                )}
              </div>

              {/* Label */}
              <h3 className="text-xl font-semibold text-gray-100 mb-2">
                {item.label}
              </h3>

              {/* Description */}
              <p className="text-gray-300 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Optional CTA Banner */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm p-2 pr-6 rounded-full shadow-lg hover:bg-white/20 transition-all duration-300 border border-white/20">
            <span className="bg-red-500 text-white px-6 py-2 rounded-full font-medium mr-4 shadow-lg">
              View All
            </span>
            <span className="text-gray-200">Explore our success story</span>
            <svg
              className="w-5 h-5 ml-3 text-red-400 animate-pulse"
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

      {/* Background decorative blobs with lighter colors for dark theme */}
      <div className="hidden lg:block absolute left-0 top-1/4 w-64 h-64 bg-red-500/10 rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
      <div className="hidden lg:block absolute right-0 bottom-1/4 w-72 h-72 bg-indigo-500/10 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
    </section>
  );
};

export default OurAchievements;
