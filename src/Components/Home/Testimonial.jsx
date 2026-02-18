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

const Testimonials = () => {
  // Use the custom hook to trigger animation when the section comes into view
  const [sectionRef, isVisible] = useOnScreen({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Testimonials data array — each includes client name, role, quote, and avatar placeholder
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Home Buyer",
      quote:
        "The team made buying my first home an absolute joy. Their guidance and local expertise helped me find the perfect property in no time.",
      avatar: (
        <svg
          className="w-12 h-12 text-blue-600"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Property Investor",
      quote:
        "Exceptional service and market insight. They helped me diversify my portfolio with high-value properties that exceeded my expectations.",
      avatar: (
        <svg
          className="w-12 h-12 text-blue-600"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Seller",
      quote:
        "From listing to closing, they were with me every step. The property sold above asking price in just one week. Truly remarkable agents.",
      avatar: (
        <svg
          className="w-12 h-12 text-blue-600"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      id: 4,
      name: "David Kim",
      role: "Commercial Client",
      quote:
        "Professional, transparent, and incredibly efficient. They secured a prime commercial space for our business with excellent terms.",
      avatar: (
        <svg
          className="w-12 h-12 text-blue-600"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ];

  // Animation delay classes for staggered effect
  const animationDelay = ["delay-0", "delay-150", "delay-300", "delay-450"];

  // Function to render star rating (static 5 stars for all)
  const renderStars = () => {
    return (
      <div className="flex text-yellow-400 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="w-5 h-5 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Client <span className="text-blue-600">Testimonials</span>
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear what our clients have to say about their experience with us.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 flex flex-col
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                transition-all duration-700 ease-out ${animationDelay[index]}`}
            >
              {/* Quote icon (decorative top) */}
              <div className="text-blue-100 mb-2">
                <svg
                  className="w-10 h-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Star rating */}
              {renderStars()}

              {/* Quote text */}
              <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                "{testimonial.quote}"
              </p>

              {/* Avatar and client info */}
              <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors duration-300">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>

              {/* Decorative corner lines (same style) */}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-500"></div>
              <div className="absolute top-0 right-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Optional CTA Banner (adjusted for testimonials) */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center bg-blue-50 p-2 pr-6 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
            <span className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium mr-4">
              Share Your Story
            </span>
            <span className="text-gray-700">Become our next success story</span>
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

export default Testimonials;