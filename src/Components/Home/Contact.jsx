import React, { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Send,
  CheckCircle,
} from "lucide-react";

// Mock map component - in production, replace with Google Maps, Mapbox, etc.
const InteractiveMap = () => {
  return (
    <div className="w-full h-full min-h-[450px] rounded-2xl overflow-hidden shadow-2xl">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d466.9140746701431!2d85.8629354605204!3d20.308916017251263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1774115225088!5m2!1sen!2sin"
        className="w-full h-full"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        allowFullScreen
      ></iframe>
    </div>
  );
};

// Contact Form Component
const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, amount: 0.3 });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormState({ name: "", email: "", phone: "", message: "" });
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-5"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {["name", "email"].map((field, i) => (
          <motion.div
            key={field}
            custom={i}
            variants={inputVariants}
            className="relative group"
          >
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              value={formState[field]}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300 peer"
              placeholder=" "
            />
            <label className="absolute left-4 top-3 text-gray-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-red-600 peer-focus:bg-white peer-focus:px-1 bg-transparent -top-2 text-xs px-1">
              {field === "name" ? "Full Name" : "Email Address"}
            </label>
          </motion.div>
        ))}
      </div>

      <motion.div
        custom={2}
        variants={inputVariants}
        className="relative group"
      >
        <input
          type="tel"
          name="phone"
          value={formState.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300 peer"
          placeholder=" "
        />
        <label className="absolute left-4 top-3 text-gray-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-red-600 peer-focus:bg-white peer-focus:px-1 bg-transparent -top-2 text-xs px-1">
          Phone Number
        </label>
      </motion.div>

      <motion.div
        custom={3}
        variants={inputVariants}
        className="relative group"
      >
        <textarea
          name="message"
          value={formState.message}
          onChange={handleChange}
          rows={4}
          required
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300 peer resize-none"
          placeholder=" "
        />
        <label className="absolute left-4 top-3 text-gray-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-red-600 peer-focus:bg-white peer-focus:px-1 bg-transparent -top-2 text-xs px-1">
          Your Message
        </label>
      </motion.div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        custom={4}
        variants={inputVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70"
      >
        {isSubmitting ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
          />
        ) : isSubmitted ? (
          <>
            <CheckCircle className="w-5 h-5" />
            Message Sent!
          </>
        ) : (
          <>
            Send Message
            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </motion.button>
    </motion.form>
  );
};

// Contact Info Cards
const ContactInfoCard = ({ icon: Icon, title, details, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
        className="w-14 h-14 bg-red-100 group-hover:bg-red-600 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
      >
        <Icon className="w-7 h-7 text-red-600 group-hover:text-white transition-colors duration-300" />
      </motion.div>

      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>

      {details.map((detail, i) => (
        <p key={i} className="text-gray-600 mb-1">
          {detail}
        </p>
      ))}
    </motion.div>
  );
};

// Social Media Icons
const SocialIcon = ({ icon: Icon, href, delay }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3, type: "spring" }}
      whileHover={{ y: -5, scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-600 group"
    >
      <Icon className="w-5 h-5 text-gray-600 group-hover:text-white" />
    </motion.a>
  );
};

// Main Component
const ContactSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3]);

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+916370715019"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@rk-properties.com"],
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Mon-Fri: 9:00 AM - 7:00 PM", "Sat-Sun: 9:00 AM - 7:00 PM"],
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Chakeisihani", " Bhubaneswar, Odisha"],
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-100"
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY, opacity }}
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-4 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-4"
          >
            Get In Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Let's Find Your
            <span className="bg-red-600 bg-clip-text text-transparent">
              {" "}
              Dream Home
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Our expert team is ready to assist you with all your real estate
            needs. Reach out today!
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left Column - Contact Info Cards */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((info, index) => (
                <ContactInfoCard
                  key={info.title}
                  icon={info.icon}
                  title={info.title}
                  details={info.details}
                  delay={0.1 * index}
                />
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Connect With Us
              </h3>
              <div className="flex gap-4">
                <SocialIcon
                  icon={Facebook}
                  href="https://facebook.com"
                  delay={0.6}
                />
                <SocialIcon
                  icon={Instagram}
                  href="https://instagram.com"
                  delay={0.7}
                />
                <SocialIcon
                  icon={Twitter}
                  href="https://twitter.com"
                  delay={0.8}
                />
                <SocialIcon
                  icon={Linkedin}
                  href="https://linkedin.com"
                  delay={0.9}
                />
              </div>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="bg-white rounded-3xl shadow-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Send a Message
            </h3>
            <p className="text-gray-600 mb-6">
              We'll get back to you within 24 hours
            </p>
            <ContactForm />
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-8"
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">Our Location</h3>
              <p className="text-gray-600">
                Find us in the heart of Beverly Hills
              </p>
            </div>
            <div className="h-[450px]">
              <InteractiveMap />
            </div>
          </div>
        </motion.div>

        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
          }
          transition={{ delay: 1, duration: 0.5, type: "spring" }}
          className="fixed bottom-8 right-8 z-50 hidden lg:block"
        ></motion.div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
