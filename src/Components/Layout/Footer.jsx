import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMail, FiPhone, FiMapPin, FiChevronUp, FiSend, FiArrowRight,
  FiGithub, FiTwitter, FiLinkedin, FiInstagram, FiFacebook,
  FiHeart, FiStar, FiShield, FiTrendingUp, FiBriefcase,
  FiBook, FiUsers, FiHelpCircle, FiFileText
} from 'react-icons/fi';
import { 
  FaRegEnvelope, FaRegBell, FaRegClock, FaRegCompass,
  FaDiscord, FaYoutube, FaDribbble, FaBehance
} from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  const footerLinks = {
    product: [
      { name: 'Features', href: '/features', icon: FiStar },
      { name: 'Security', href: '/security', icon: FiShield },
      { name: 'Analytics', href: '/analytics', icon: FiTrendingUp },
      { name: 'Updates', href: '/updates', icon: FaRegBell },
    ],
    company: [
      { name: 'About', href: '/about', icon: FiBriefcase },
      { name: 'Blog', href: '/blog', icon: FiBook },
      { name: 'Careers', href: '/careers', icon: FiUsers },
      { name: 'Press', href: '/press', icon: FiFileText },
    ],
    resources: [
      { name: 'Help Center', href: '/help', icon: FiHelpCircle },
      { name: 'Community', href: '/community', icon: FaRegCompass },
      { name: 'Status', href: '/status', icon: FaRegClock },
      { name: 'Contact', href: '/contact', icon: FaRegEnvelope },
    ]
  };

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com', label: 'GitHub', color: '#e2e8f0' },
    { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter', color: '#1DA1F2' },
    { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: '#0A66C2' },
    { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram', color: '#E4405F' },
    { icon: FiFacebook, href: 'https://facebook.com', label: 'Facebook', color: '#1877F2' },
    { icon: FaDiscord, href: 'https://discord.com', label: 'Discord', color: '#5865F2' },
  ];

  const contactInfo = [
    { icon: FiMail, text: 'hello@brand.com', delay: 0.2 },
    { icon: FiPhone, text: '+1 (555) 123-4567', delay: 0.3 },
    { icon: FiMapPin, text: 'San Francisco, CA', delay: 0.4 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };

  const linkVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 }
    },
    hover: {
      x: 8,
      color: "#60a5fa",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  const socialVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 15 }
    },
    hover: {
      scale: 1.2,
      y: -5,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.9 }
  };

  const backToTopVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    hover: {
      scale: 1.1,
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.9 }
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600" />

      {/* Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            variants={backToTopVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            whileHover="hover"
            whileTap="tap"
            className="fixed bottom-8 right-8 p-4 bg-blue-600 text-white rounded-full shadow-lg z-50"
            aria-label="Back to top"
          >
            <FiChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Main footer content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12"
        >
          {/* Brand column - 2 columns wide */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            <motion.div whileHover={{ scale: 1.02 }} className="inline-block">
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-blue-400"
                >
                  <FiHeart className="w-8 h-8" />
                </motion.div>
                <h2 className="text-3xl font-bold text-white">Brand</h2>
              </div>
              <motion.div
                className="h-1 bg-blue-500 rounded-full mt-2"
                initial={{ width: 0 }}
                whileInView={{ width: 60 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-base leading-relaxed text-slate-400 max-w-md"
            >
              Creating amazing digital experiences that bring your ideas to life.
              We're here to help you succeed in the digital world with innovative solutions.
            </motion.p>

            {/* Contact info */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-3 group cursor-pointer"
                  >
                    <div className="p-2 bg-slate-700/60 rounded-lg group-hover:bg-slate-600/80 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-sm text-slate-300 group-hover:text-blue-400 transition-colors">
                      {item.text}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Trust badges */}
            <div className="flex items-center space-x-4 pt-4">
              {[FiShield, FiStar, FiHeart].map((Icon, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-2 bg-slate-700/60 rounded-full"
                >
                  <Icon className="w-5 h-5 text-blue-400" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div key={category} variants={itemVariants} className="lg:col-span-1 space-y-4">
              <motion.h3
                whileHover={{ x: 5 }}
                className="text-white font-semibold text-lg capitalize relative inline-block"
              >
                {category}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-blue-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + categoryIndex * 0.1 }}
                />
              </motion.h3>

              <ul className="space-y-3">
                {links.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.li
                      key={index}
                      variants={linkVariants}
                      whileHover="hover"
                      onHoverStart={() => setHoveredLink(`${category}-${index}`)}
                      onHoverEnd={() => setHoveredLink(null)}
                    >
                      <a
                        href={link.href}
                        className="text-sm text-slate-400 flex items-center space-x-2 group"
                      >
                        <Icon className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
                        <span>{link.name}</span>
                        <AnimatePresence>
                          {hoveredLink === `${category}-${index}` && (
                            <motion.span
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <FiArrowRight className="w-3 h-3 text-blue-400" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-4">
            <motion.h3
              whileHover={{ x: 5 }}
              className="text-white font-semibold text-lg"
            >
              Stay Updated
            </motion.h3>
            <motion.p variants={itemVariants} className="text-sm text-slate-400">
              Get the latest updates and exclusive offers.
            </motion.p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 bg-slate-700/60 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-slate-500 transition-all duration-300 pr-24"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute right-1 top-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-500 transition-colors duration-300 flex items-center space-x-2"
                >
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FiSend className="w-3 h-3" />
                  </motion.span>
                  <span>Subscribe</span>
                </motion.button>
              </motion.div>
            </form>

            {/* Success message */}
            <AnimatePresence>
              {subscribed && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm text-green-400 flex items-center space-x-2"
                >
                  <FiHeart className="w-4 h-4" />
                  <span>Thanks for subscribing!</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Social links */}
            <div className="flex flex-wrap gap-3 pt-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    variants={socialVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    whileTap="tap"
                    className="p-3 bg-slate-700/60 rounded-lg relative overflow-hidden group"
                    style={{ color: social.color }}
                  >
                    <Icon className="w-5 h-5 relative z-10" />
                    <motion.div
                      className="absolute inset-0 bg-slate-600/50"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ borderRadius: '50%' }}
                    />
                  </motion.a>
                );
              })}
            </div>

            {/* Additional social platforms */}
            <div className="flex gap-3">
              <motion.a
                href="https://youtube.com"
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-2 bg-slate-700/60 rounded-lg"
                aria-label="YouTube"
              >
                <FaYoutube className="w-4 h-4 text-red-500" />
              </motion.a>
              <motion.a
                href="https://dribbble.com"
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-2 bg-slate-700/60 rounded-lg"
                aria-label="Dribbble"
              >
                <FaDribbble className="w-4 h-4 text-pink-500" />
              </motion.a>
              <motion.a
                href="https://behance.net"
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-2 bg-slate-700/60 rounded-lg"
                aria-label="Behance"
              >
                <FaBehance className="w-4 h-4 text-blue-400" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-8 border-t border-slate-700"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-sm text-slate-500 flex items-center space-x-2"
            >
              <span>© 2024 Brand.</span>
              <span>All rights reserved.</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-blue-400"
              >
                <FiHeart className="w-4 h-4 inline" />
              </motion.span>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-6">
              {['Privacy', 'Terms', 'Cookies', 'Accessibility'].map((text, index) => (
                <motion.a
                  key={index}
                  href={`/${text.toLowerCase()}`}
                  whileHover={{ scale: 1.1, color: '#60a5fa' }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm text-slate-500 hover:text-blue-400 transition-colors"
                >
                  {text} Policy
                </motion.a>
              ))}
            </div>

            {/* Badges */}
            <div className="flex space-x-2">
              <motion.div
                whileHover={{ y: -2 }}
                className="px-2 py-1 bg-slate-700/60 rounded text-xs text-slate-400"
              >
                SSL Secure
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                className="px-2 py-1 bg-slate-700/60 rounded text-xs text-slate-400"
              >
                GDPR Compliant
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;