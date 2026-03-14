import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

// Animation variants - extracted for performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      ease: [0.25, 0.1, 0.25, 1], // Custom easing curve
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const imageVariants = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const statVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: (custom) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.8 + custom * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
};

const RealEstateHero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const shouldReduceMotion = useReducedMotion();

  // Mock search suggestions
  const suggestions = useMemo(
    () => [
      "Modern apartments in Downtown",
      "Houses with pool under $500k",
      "New construction condos",
      "Waterfront properties",
    ],
    []
  );

  // Filtered suggestions based on input
  const filteredSuggestions = useMemo(
    () =>
      searchQuery
        ? suggestions.filter((s) =>
            s.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : [],
    [searchQuery, suggestions]
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (!isSearchFocused) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveSuggestion((prev) =>
            prev < filteredSuggestions.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveSuggestion((prev) => (prev > -1 ? prev - 1 : -1));
          break;
        case "Enter":
          if (activeSuggestion >= 0) {
            setSearchQuery(filteredSuggestions[activeSuggestion]);
            setActiveSuggestion(-1);
          }
          break;
        case "Escape":
          setActiveSuggestion(-1);
          break;
        default:
          break;
      }
    },
    [isSearchFocused, filteredSuggestions, activeSuggestion]
  );

  // Animation variants with reduced motion support
  const getVariants = (normalVariants) => {
    if (shouldReduceMotion) {
      return {
        ...normalVariants,
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        hover: {},
      };
    }
    return normalVariants;
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={getVariants(containerVariants)}
      className="relative min-h-[90vh] bg-white overflow-hidden"
      role="banner"
      aria-label="Real estate search hero section"
    >
      {/* Subtle red gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-red-50/30" />
      
      {/* Decorative red accent lines */}
      {/* <div className="absolute top-0 left-0 w-1/3 h-1 bg-gradient-to-r from-red-500 to-red-600" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1 bg-gradient-to-l from-red-500 to-red-600" /> */}

      {/* Main content */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left column - Content */}
          <motion.div
            variants={getVariants(itemVariants)}
            className="text-center lg:text-left"
          >
            {/* Red badge */}
            <motion.div
              variants={getVariants(itemVariants)}
              className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span className="text-sm font-medium text-red-700">
                Live market data • Updated every minute
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              variants={getVariants(itemVariants)}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900"
            >
              Find your{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-red-600">dream home</span>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="absolute bottom-2 left-0 h-3 bg-red-200/50 -z-0 rounded-full"
                  style={{ width: shouldReduceMotion ? "100%" : 0 }}
                />
              </span>
            </motion.h1>

            <motion.p
              variants={getVariants(itemVariants)}
              className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0"
            >
              Explore 10,000+ verified properties with immersive virtual tours,
              neighborhood insights, and real-time market analytics.
            </motion.p>

            {/* Search section */}
            <motion.div
              variants={getVariants(itemVariants)}
              className="mt-8 max-w-2xl mx-auto lg:mx-0"
            >
              <div className="relative">
                <div
                  className={`flex items-center bg-white rounded-2xl shadow-lg transition-all duration-300 ${
                    isSearchFocused
                      ? "shadow-xl ring-4 ring-red-500/20"
                      : "hover:shadow-xl"
                  }`}
                >
                  {/* Search icon */}
                  <div className="pl-5">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>

                  {/* Input */}
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => {
                      setIsSearchFocused(false);
                      setActiveSuggestion(-1);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter address, city, or ZIP"
                    className="w-full px-4 py-4 bg-transparent border-0 focus:outline-none text-gray-900 placeholder-gray-400"
                    aria-label="Search properties"
                    aria-autocomplete="list"
                    aria-controls="search-suggestions"
                  />

                  {/* Search button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mr-2 px-6 py-2 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    aria-label="Search"
                  >
                    Search
                  </motion.button>
                </div>

                {/* Search suggestions */}
                <AnimatePresence>
                  {isSearchFocused && filteredSuggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-20 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                      id="search-suggestions"
                      role="listbox"
                    >
                      {filteredSuggestions.map((suggestion, index) => (
                        <motion.button
                          key={suggestion}
                          variants={getVariants({
                            hover: { backgroundColor: "#fef2f2" },
                          })}
                          whileHover="hover"
                          className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
                            index === activeSuggestion
                              ? "bg-red-50 text-red-700"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                          onClick={() => {
                            setSearchQuery(suggestion);
                            setIsSearchFocused(false);
                          }}
                          role="option"
                          aria-selected={index === activeSuggestion}
                        >
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {suggestion}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Quick filters */}
              <div className="mt-4 flex flex-wrap gap-2">
                {["Buy", "Rent", "Sell", "Pre-construction"].map((filter) => (
                  <motion.button
                    key={filter}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-red-50 hover:text-red-700 transition-colors"
                  >
                    {filter}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={getVariants(itemVariants)}
              className="mt-10 grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0"
            >
              {[
                { value: "10K+", label: "Listings", change: "+12%" },
                { value: "2.5K", label: "Agents", change: "+8%" },
                { value: "50K+", label: "Users", change: "+24%" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  custom={index}
                  variants={getVariants(statVariants)}
                  whileHover="hover"
                  className="text-center lg:text-left"
                >
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                  <div className="text-xs text-green-600 font-medium mt-1">
                    {stat.change}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column - Image with overlay cards */}
          <motion.div
            variants={getVariants(imageVariants)}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {/* Main image */}
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Luxury modern home with architecture"
                className="w-full h-auto object-cover"
                loading="eager"
                fetchpriority="high"
              />

              {/* Red gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 via-transparent to-transparent" />

              {/* Floating cards */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl max-w-[200px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-red-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Just listed</p>
                    <p className="font-semibold text-gray-900">1234 Maple St</p>
                    <p className="text-sm text-red-600 font-medium">
                      $849,000
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl max-w-[200px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 6h-2v2h-2V6h-2V4h2V2h2v2h2v2zm-10 3c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 4c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Listing agent</p>
                    <p className="font-semibold text-gray-900">Sarah Johnson</p>
                    <p className="text-xs text-gray-500">★★★★★ 4.9 (128)</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Trust badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.4, type: "spring", stiffness: 200 }}
              className="absolute -bottom-4 -left-4 bg-red-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span className="text-sm font-medium">Verified listings</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Property types carousel */}
        <motion.div
          variants={getVariants(itemVariants)}
          className="mt-16"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Browse by property type
            </h2>
            <Link
              to="/properties"
              className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-1"
            >
              View all
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {[
              {
                type: "Houses",
                icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
                count: "4,521",
              },
              {
                type: "Apartments",
                icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
                count: "3,245",
              },
              {
                type: "Condos",
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zm0 0c1.11 0 2.08.402 2.599 1M12 8V4m0 0L9 6m3-2l3 2",
                count: "2,189",
              },
              {
                type: "Townhomes",
                icon: "M4 8h16M4 16h16M8 4v16M16 4v16",
                count: "1,456",
              },
              {
                type: "Commercial",
                icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                count: "876",
              },
            ].map((item, index) => (
              <motion.div
                key={item.type}
                whileHover={{ y: -4 }}
                className="flex-shrink-0 w-48 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer snap-start"
              >
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mb-3">
                  <svg
                    className="w-5 h-5 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d={item.icon}
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">{item.type}</h3>
                <p className="text-sm text-gray-500">{item.count} listings</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          variants={getVariants(itemVariants)}
          className="mt-12 pt-8 border-t border-gray-100"
        >
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Verified by experts</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>Secure payments</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>24/7 support</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>Free consultation</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default RealEstateHero;