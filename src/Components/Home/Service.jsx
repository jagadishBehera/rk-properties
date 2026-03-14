import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Home, 
  Building2, 
  Briefcase, 
  TrendingUp, 
  Sparkles,
  ArrowRight 
} from 'lucide-react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const cardsRef = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const services = [
    {
      title: "Luxury Villas",
      description: "Exclusive waterfront estates with panoramic views, private pools, and smart home technology.",
      icon: Home,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      accent: "from-red-500/20 to-transparent"
    },
    {
      title: "Modern Apartments",
      description: "Contemporary living spaces in prime locations with premium finishes and concierge services.",
      icon: Building2,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      accent: "from-red-500/20 to-transparent"
    },
    {
      title: "Commercial Offices",
      description: "State-of-the-art workspaces designed for innovation, collaboration, and business growth.",
      icon: Briefcase,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      accent: "from-red-500/20 to-transparent"
    },
    {
      title: "Investment Properties",
      description: "High-yield real estate opportunities in emerging markets with guaranteed returns.",
      icon: TrendingUp,
      image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      accent: "from-red-500/20 to-transparent"
    },
    {
      title: "Luxury Interiors",
      description: "Bespoke interior design solutions by award-winning architects and designers.",
      icon: Sparkles,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      accent: "from-red-500/20 to-transparent"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background color animation
      gsap.to(bgRef.current, {
        backgroundColor: '#1a1a1a',
        backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255, 99, 99, 0.1) 0%, transparent 50%)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Cards entrance animation
      gsap.fromTo(cardsRef.current,
        {
          y: 100,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      {/* Background with animated gradient */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-white transition-colors duration-300"
        style={{
          backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(255, 99, 99, 0.05) 0%, transparent 50%)'
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-red-600 mb-6">
            Services
          </h2>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Discover our exclusive range of premium property services tailored to 
            discerning clients worldwide.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group relative h-[500px] rounded-2xl overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Card Inner */}
                <div className="absolute inset-0 bg-gray-900">
                  {/* Background Image with Zoom */}
                  <div 
                    className={`absolute inset-0 transition-transform duration-700 ease-out ${
                      isHovered ? 'scale-110' : 'scale-100'
                    }`}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                  
                  {/* Glassmorphism Overlay on Hover */}
                  <div className={`absolute inset-0 backdrop-blur-[2px] transition-opacity duration-500 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    {/* Icon with Animation */}
                    <div className={`mb-4 transition-all duration-500 ${
                      isHovered ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
                    }`}>
                      <div className="inline-flex p-3 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-2">
                      {service.title}
                    </h3>

                    {/* Description - Appears on Hover */}
                    <div className={`overflow-hidden transition-all duration-500 ${
                      isHovered ? 'max-h-20 opacity-100 mb-4' : 'max-h-0 opacity-0'
                    }`}>
                      <p className="text-sm text-gray-200">
                        {service.description}
                      </p>
                    </div>

                    {/* CTA Button with Animation */}
                    <button className={`group/btn inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
                      isHovered 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    }`}>
                      <span className="text-red-400 group-hover/btn:text-red-300">
                        View Property
                      </span>
                      <ArrowRight className="w-4 h-4 text-red-400 group-hover/btn:text-red-300 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Red Accent Line */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-red-500 transform origin-left transition-transform duration-500 ${
                    isHovered ? 'scale-x-100' : 'scale-x-0'
                  }`} />
                </div>

                {/* Card Lift Effect */}
                <div className={`absolute inset-0 transition-transform duration-300 ${
                  isHovered ? '-translate-y-2' : 'translate-y-0'
                }`} style={{ boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.3)' : 'none' }} />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="group inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-red-500/25">
            Explore All Properties
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-red-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
    </section>
  );
};

export default ServicesSection;