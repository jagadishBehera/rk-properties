import React from "react";
import { motion } from "framer-motion";
import { Bed, Square, MapPin, Heart, Bath, Star } from "lucide-react";
import villaImg from "../../assets/dreamHome-1.jpeg";
import apartmentImg from "../../assets/dreamHome-2.jpeg";
import budgetImg from "../../assets/dreamHome-3.jpeg";
import beachImg from "../../assets/dreamHome-4.jpeg";
import powaiImg from "../../assets/dreamHome-5.jpeg";
import duplexImg from "../../assets/dreamHome-6.jpeg";

const DreamHome = () => {
  const properties = [
    {
      id: 1,
      title: "Modern Family Villa",
      location: "Banjara Hills, Hyderabad",
      price: "₹2.4 Cr",
      beds: 4,
      baths: 3,
      sqft: 3200,
      rating: 4.8,
      imageUrl: villaImg,
    },
    {
      id: 2,
      title: "Luxury Sky Apartment",
      location: "Whitefield, Bangalore",
      price: "₹1.8 Cr",
      beds: 3,
      baths: 2,
      sqft: 2100,
      rating: 4.6,
      imageUrl: apartmentImg,
    },
    {
      id: 3,
      title: "Cozy Budget Home",
      location: "Anna Nagar, Chennai",
      price: "₹85 L",
      beds: 2,
      baths: 2,
      sqft: 1400,
      rating: 4.4,
      imageUrl: budgetImg,
    },
    {
      id: 4,
      title: "Premium Beach House",
      location: "Vagator, Goa",
      price: "₹3.2 Cr",
      beds: 5,
      baths: 4,
      sqft: 4500,
      rating: 4.9,
      imageUrl: beachImg,
    },
    {
      id: 5,
      title: "Smart City Apartment",
      location: "Powai, Mumbai",
      price: "₹1.5 Cr",
      beds: 2,
      baths: 2,
      sqft: 1600,
      rating: 4.5,
      imageUrl: powaiImg,
    },
    {
      id: 6,
      title: "Elegant Duplex House",
      location: "Sector 62, Noida",
      price: "₹1.2 Cr",
      beds: 3,
      baths: 3,
      sqft: 2500,
      rating: 4.7,
      imageUrl: duplexImg,
    },
  ];

  return (
    <div className="min-h-screen  p-3 sm:p-4 md:p-6">
      {/* Responsive Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Dream <span className="text-red-600">House</span>
        </h2>
        <div className="w-24 h-1 bg-red-600 mx-auto mb-6 rounded-full"></div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find Your Dream Home With Us
        </p>
      </div>

      {/* Responsive Grid - Mobile first approach */}
      <div className="max-w-7xl mx-auto">
        {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns, Large Desktop: 4 columns */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Responsive Image */}
              <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden">
                <img
                  src={property.imageUrl}
                  alt={property.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Price Badge - Responsive text size */}
                <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm font-bold">
                  {property.price}
                </div>

                {/* Rating Badge */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg flex items-center">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 fill-current" />
                  <span className="text-xs sm:text-sm font-semibold ml-1">
                    {property.rating}
                  </span>
                </div>
              </div>

              {/* Content - Responsive padding and text */}
              <div className="p-3 sm:p-4">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-1 mb-1">
                  {property.title}
                </h3>

                <div className="flex items-center text-gray-500 text-xs sm:text-sm mb-2">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                  <span className="truncate">{property.location}</span>
                </div>

                {/* Features - Responsive layout */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="inline-flex items-center bg-gray-100 px-2 py-1 rounded-md text-xs">
                    <Bed className="w-3 h-3 mr-1" />
                    {property.beds} beds
                  </span>
                  <span className="inline-flex items-center bg-gray-100 px-2 py-1 rounded-md text-xs">
                    <Bath className="w-3 h-3 mr-1" />
                    {property.baths} baths
                  </span>
                  <span className="inline-flex items-center bg-gray-100 px-2 py-1 rounded-md text-xs">
                    <Square className="w-3 h-3 mr-1" />
                    {property.sqft} sqft
                  </span>
                </div>

                {/* Action Buttons - Responsive */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors">
                    View
                  </button>
                  <button className="p-1.5 sm:p-2 border border-gray-200 hover:border-gray-300 rounded-lg transition-colors">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DreamHome;
