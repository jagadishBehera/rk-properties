import React, { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { Home, Building2, Briefcase, TrendingUp, Sparkles } from "lucide-react";

const services = [
  {
    title: "Luxury Villas",
    desc: "Premium villas with world-class amenities and prime locations.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    icon: Home,
  },
  {
    title: "Modern Apartments",
    desc: "High-rise apartments with skyline views and smart features.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    icon: Building2,
  },
  {
    title: "Commercial Offices",
    desc: "Corporate-ready spaces built for productivity and growth.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
    icon: Briefcase,
  },
  {
    title: "Investment Properties",
    desc: "High ROI properties in rapidly growing neighborhoods.",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    icon: TrendingUp,
  },
  {
    title: "Luxury Interiors",
    desc: "Elegant interior design with premium finishing.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
    icon: Sparkles,
  },
];

const RealEstateServices = () => {
  const [activeIndex, setActiveIndex] = useState(0); // First open by default

  return (
    <section className="h-screen flex items-center px-8">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-bold mb-4">Services</h2>
          <p className="text-neutral-500 max-w-2xl mx-auto">
            Discover exceptional properties tailored to your lifestyle.
          </p>
        </div>

        {/* Cards Row - NO SCROLL */}
        <div className="flex gap-6 w-full h-[480px]">
          {services.map((service, index) => (
            <MagneticCard
              key={index}
              service={service}
              isActive={activeIndex === index}
              onHover={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const MagneticCard = ({ service, isActive, onHover }) => {
  const ref = useRef(null);

  const x = useSpring(0, { stiffness: 150, damping: 20 });
  const y = useSpring(0, { stiffness: 150, damping: 20 });

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * 0.1);
    y.set((e.clientY - centerY) * 0.1);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={onHover}
      style={{ x, y }}
      animate={{
        flex: isActive ? 2.5 : 1,
      }}
      transition={{
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      className="relative rounded-2xl overflow-hidden cursor-pointer bg-neutral-900"
    >
      {/* Image */}
      <motion.img
        src={service.image}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: isActive ? 1.1 : 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 p-6 text-white z-10">
        <div className="w-12 h-12 mb-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
          <Icon className="w-6 h-6" />
        </div>

        <h3 className="text-2xl font-bold mb-2">{service.title}</h3>

        <motion.p
          animate={{
            opacity: isActive ? 1 : 0,
            height: isActive ? "auto" : 0,
          }}
          className="text-sm text-neutral-300 overflow-hidden mb-4"
        >
          {service.desc}
        </motion.p>

        <motion.button
          animate={{ opacity: isActive ? 1 : 0 }}
          className="px-6 py-2 bg-white text-black rounded-lg text-sm font-semibold"
        >
          View Property
        </motion.button>
      </div>
    </motion.div>
  );
};

export default RealEstateServices;
