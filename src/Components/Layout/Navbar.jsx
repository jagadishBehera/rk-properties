import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Menu, X, Sparkles, Zap } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // For parallax effects - smoother transitions
  const { scrollY } = useScroll();
  // ✅ FIX: removed unused navbarBlur and navbarOpacity — only navbarY is used in JSX
  const navbarY = useTransform(scrollY, [0, 100], [0, -5]);

  // Smooth scroll detection with RAF for performance
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Show/hide navbar based on scroll direction
          if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
            setVisible(false);
          } else {
            setVisible(true);
          }

          // Smooth background transition with threshold
          setScrolled(currentScrollY > 10);
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Home", "About", "Services", "Contact"];

  // Enhanced animation variants with smoother curves
  const logoVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15,
        mass: 0.5,
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.5,
        ease: [0.2, 0.8, 0.4, 1],
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  const mobileItemVariants = {
    closed: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 0.8,
      },
    },
  };

  // Smooth scroll to section
  const scrollToSection = (e, link) => {
    e.preventDefault();
    const element = document.getElementById(link.toLowerCase());
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setActiveLink(link);
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{
          y: visible ? 0 : -100,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
          mass: 0.5,
          restDelta: 0.001,
        }}
        className="fixed w-full z-50"
        style={{
          y: navbarY,
        }}
      >
        {/* Main navbar container */}
        <div className="relative max-w-7xl mt-4 mx-auto px-4 sm:px-6">
          {/* Enhanced white glass background with multiple layers */}
          <motion.div
            className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg"
            animate={{
              opacity: scrolled ? 1 : 0,
              background: scrolled
                ? "rgba(255, 255, 255, 0.85)"
                : "rgba(255, 255, 255, 0)",
              boxShadow: scrolled
                ? "0 8px 32px rgba(0, 0, 0, 0.08)"
                : "0 0px 0px rgba(0, 0, 0, 0)",
              border: scrolled
                ? "1px solid rgba(255, 255, 255, 0.8)"
                : "1px solid rgba(255, 255, 255, 0)",
            }}
            transition={{
              duration: 0.3,
              ease: [0.2, 0.8, 0.4, 1],
            }}
            style={{
              backdropFilter: scrolled ? `blur(16px)` : "blur(0px)",
              WebkitBackdropFilter: scrolled ? `blur(16px)` : "blur(0px)",
            }}
          >
            {/* Subtle white gradient overlay for depth */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: scrolled
                  ? "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 70%)"
                  : "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 70%)",
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Navbar content */}
          <div className="relative flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4">
            {/* Logo with enhanced hover effect */}
            <motion.div
              variants={logoVariants}
              initial="initial"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              className="relative cursor-pointer group"
            >
              <div className="flex items-center space-x-2">
                <span
                  className={`text-2xl sm:text-3xl font-black transition-colors duration-300 ${
                    scrolled ? "text-gray-800" : "text-white"
                  }`}
                >
                  RK
                </span>
                <motion.div
                  animate={{
                    rotate: [0, 8, -8, 0],
                    scale: [1, 1.15, 1.15, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="w-4 h-4 text-blue-500" />
                </motion.div>
              </div>

              {/* Subtle glow effect */}
              <motion.div
                className="absolute -inset-2 bg-blue-400/10 rounded-full blur-xl"
                animate={{
                  opacity: scrolled ? 0.2 : 0.1,
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  onClick={(e) => scrollToSection(e, link)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: [0.2, 0.8, 0.4, 1],
                  }}
                  className={`
                    relative 
                    px-3 
                    py-2 
                    text-sm
                    lg:text-base
                    font-medium 
                    transition-all 
                    duration-300
                    overflow-hidden
                    group
                    ${
                      activeLink === link
                        ? scrolled
                          ? "text-blue-600"
                          : "text-white"
                        : scrolled
                          ? "text-gray-700 hover:text-black"
                          : "text-white hover:text-gray-200"
                    }
                  `}
                >
                  <span className="relative z-10">{link}</span>

                  {/* Hover effect background */}
                  <motion.div
                    className="absolute inset-0 bg-gray-100 rounded-lg -z-0"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                  />

                  {/* Active indicator - enhanced */}
                  {activeLink === link && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 40,
                        mass: 0.5,
                      }}
                    />
                  )}
                </motion.a>
              ))}

              {/* CTA Button with enhanced effects */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 20,
                  mass: 0.5,
                }}
                className="ml-4 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="flex items-center space-x-2 relative z-10">
                  <span>Get Started</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  >
                    <Zap className="w-4 h-4" />
                  </motion.span>
                </span>

                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                  }}
                />
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.div
              className="md:hidden relative"
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
            >
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                className="relative p-2 text-gray-700 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200/80 shadow-sm hover:bg-white transition-all duration-300"
              >
                <motion.div
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.2, 0.8, 0.4, 1],
                  }}
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Dropdown with enhanced white glass effect */}
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden overflow-hidden px-4 sm:px-6 mt-2"
            >
              <motion.div
                className="relative rounded-2xl bg-white/95 backdrop-blur-xl border border-white/80 shadow-xl overflow-hidden"
                style={{
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                }}
              >
                {/* Gradient background for mobile menu */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white/50" />

                <div className="relative p-4 space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      variants={mobileItemVariants}
                      href={`#${link.toLowerCase()}`}
                      onClick={(e) => scrollToSection(e, link)}
                      className={`
                        block 
                        py-3.5 
                        px-4 
                        text-base 
                        font-medium 
                        rounded-xl
                        transition-all 
                        duration-300
                        relative
                        overflow-hidden
                        group
                        ${
                          activeLink === link
                            ? "text-blue-600 bg-gradient-to-r from-blue-50 to-transparent"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }
                      `}
                    >
                      <span className="flex items-center justify-between relative z-10">
                        <span>{link}</span>
                        {activeLink === link && (
                          <motion.div
                            className="w-1.5 h-1.5 bg-blue-500 rounded-full"
                            layoutId="mobile-active"
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 40,
                              mass: 0.5,
                            }}
                          />
                        )}
                      </span>

                      {/* Hover effect for mobile items */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                      />
                    </motion.a>
                  ))}

                  {/* Mobile CTA with enhanced effects */}
                  <motion.button
                    variants={mobileItemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 25,
                      mass: 0.5,
                    }}
                    className="w-full mt-6 px-4 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl shadow-lg relative overflow-hidden group"
                  >
                    <span className="flex items-center justify-center space-x-2 relative z-10">
                      <span>Get Started Now</span>
                      <Zap className="w-4 h-4" />
                    </span>

                    {/* Shine effect for mobile */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Background overlay with smooth fade */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.2, 0.8, 0.4, 1],
            }}
            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;