import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const FloatingWhatsApp = () => {
  const phoneNumber = "919999999999"; // replace with your number
  const message = "Hello, I would like to know more about your services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Pulse Ring */}
      <span className="absolute inline-flex h-16 w-16 rounded-full 
                       bg-green-400 opacity-40 animate-ping"></span>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center 
                   h-16 w-16 rounded-full 
                   bg-gradient-to-br from-green-500 to-green-600
                   shadow-2xl transition-all duration-300 
                   hover:shadow-green-500/50 hover:scale-110 
                   active:scale-95 cursor-pointer"
        aria-label="Chat with us on WhatsApp"
      >
        <FaWhatsapp className="text-white text-3xl" />
      </a>
    </div>
  );
};

export default FloatingWhatsApp;