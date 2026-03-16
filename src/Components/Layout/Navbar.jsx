import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Menu, X, Zap, Search, ChevronRight } from "lucide-react";
import logo from "../../assets/logo.png";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [visible, setVisible] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const navbarRef = useRef(null);

  const { scrollY } = useScroll();
  const navbarY = useTransform(scrollY, [0, 100], [0, -10]);
  const navbarScale = useTransform(scrollY, [0, 100], [1, 0.98]);

  // Optimized scroll handling with RAF
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Show navbar when scrolling up, hide when down (with threshold)
          if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
            setVisible(false);
          } else {
            setVisible(true);
          }

          setScrolled(currentScrollY > 20);
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = ["Home", "Features", "Solutions", "Pricing", "About"];

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

  // Animation variants
  const logoVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: { type: "spring", stiffness: 400, damping: 25 },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.2, 0.8, 0.4, 1],
        staggerChildren: 0.05,
      },
    },
  };

  const mobileItemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <>
      <motion.nav
        ref={navbarRef}
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : -120 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8,
        }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8"
        style={{ y: navbarY }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            style={{ scale: navbarScale }}
            className={`
              relative rounded-2xl transition-all duration-300
              ${
                scrolled
                  ? "bg-white/90 backdrop-blur-xl shadow-lg border border-gray-200"
                  : ""
              }
            `}
          >
            {/* Red gradient accent line */}
            <motion.div
              className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: scrolled ? 1 : 0, opacity: scrolled ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />

            {/* Navbar content */}
            <div className="relative flex items-center justify-between px-4 sm:px-6 py-3">
              {/* Logo with red hover */}
              <motion.a
                href="/"
                variants={logoVariants}
                initial="initial"
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                className="flex items-center group"
              >
                <motion.img
                  src={logo}
                  alt="Logo"
                  className="h-12 sm:h-14 w-auto object-contain"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                {navLinks.map((link) => (
                  <motion.a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={(e) => scrollToSection(e, link)}
                    className={`
                      relative px-4 py-2 text-sm font-medium rounded-lg
                      transition-all duration-200
                      ${
                        activeLink === link
                          ? "text-red-600"
                          : "text-gray-600 hover:text-gray-900"
                      }
                    `}
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 0 }}
                  >
                    {link}

                    {/* Red active indicator */}
                    {activeLink === link && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className={`
                          absolute bottom-0 left-3 right-3 h-0.5 rounded-full
                          ${scrolled ? "bg-red-500" : "bg-white"}
                        `}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Hover background */}
                    <motion.div
                      className="absolute inset-0 rounded-lg -z-10"
                      initial={{ opacity: 0 }}
                      whileHover={{
                        opacity: 1,
                        backgroundColor: scrolled
                          ? "rgba(239, 68, 68, 0.08)"
                          : "rgba(255, 255, 255, 0.1)",
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.a>
                ))}
              </div>

              {/* Right section: Search + CTA */}
              <div className="hidden md:flex items-center space-x-4">
                {/* Search with red focus */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className={`
    w-48 pl-9 pr-4 py-2 text-sm rounded-lg
    transition-all duration-300 outline-none
    bg-gray-100 border
    ${searchFocused ? "border-red-500 ring-2 ring-red-500/20" : "border-gray-200"}
  `}
                  />
                  <Search
                    className={`
                    absolute left-2.5 top-2.5 w-4 h-4
                    ${scrolled ? "text-gray-400" : "text-white/60"}
                  `}
                  />
                </div>

                {/* Red CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="
                    px-5 py-2 bg-red-600 hover:bg-red-700
                    text-white text-sm font-medium rounded-lg
                    shadow-lg shadow-red-600/20
                    transition-all duration-200
                    flex items-center space-x-2
                    relative overflow-hidden group
                  "
                >
                  <span>Get Started</span>
                  <Zap className="w-4 h-4" />

                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
                className={`
                  md:hidden p-2 rounded-lg transition-colors duration-200
                  ${
                    scrolled
                      ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
                  }
                `}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden"
                onClick={() => setIsOpen(false)}
              />

              {/* Menu Panel */}
              <motion.div
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="absolute left-4 right-4 top-20 md:hidden"
              >
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                  {/* Red accent header */}
                  <div className="h-1 bg-gradient-to-r from-red-500 to-red-600" />

                  <div className="p-4">
                    {/* Mobile Search */}
                    <div className="mb-4">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search..."
                          className="w-full pl-9 pr-4 py-3 bg-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 outline-none"
                        />
                        <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                    {/* Mobile Navigation Links */}
                    <div className="space-y-1">
                      {navLinks.map((link) => (
                        <motion.a
                          key={link}
                          variants={mobileItemVariants}
                          href={`#${link.toLowerCase()}`}
                          onClick={(e) => scrollToSection(e, link)}
                          className={`
                            flex items-center justify-between
                            w-full px-4 py-3 text-base rounded-xl
                            transition-all duration-200
                            ${
                              activeLink === link
                                ? "bg-red-50 text-red-600"
                                : "text-gray-700 hover:bg-gray-50"
                            }
                          `}
                        >
                          <span>{link}</span>
                          {activeLink === link && (
                            <motion.div
                              layoutId="mobileActiveIndicator"
                              className="w-1.5 h-1.5 rounded-full bg-red-500"
                            />
                          )}
                        </motion.a>
                      ))}
                    </div>

                    {/* Mobile CTA */}
                    <motion.button
                      variants={mobileItemVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="
                        w-full mt-6 px-4 py-4
                        bg-gradient-to-r from-red-600 to-red-700
                        text-white font-medium rounded-xl
                        shadow-lg shadow-red-600/20
                        flex items-center justify-center space-x-2
                      "
                    >
                      <span>Get Started</span>
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>

                    {/* Footer Links */}
                    {/* <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="flex justify-center space-x-4">
                        <a
                          href="#"
                          className="text-sm text-gray-500 hover:text-red-600"
                        >
                          Sign In
                        </a>
                        <span className="text-gray-300">|</span>
                        <a
                          href="#"
                          className="text-sm text-gray-500 hover:text-red-600"
                        >
                          Register
                        </a>
                      </div>
                    </div> */}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer for fixed navbar */}
      {/* <div className="h-20" /> */}
    </>
  );
};

export default Navbar;
