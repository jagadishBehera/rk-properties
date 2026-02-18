import React from "react";

const RealEstateHero = () => {
  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Abstract background pattern (optional decoration) */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-500 mix-blend-multiply blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-indigo-500 mix-blend-multiply blur-3xl"></div>
      </div>

      {/* Hero content container */}
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left column: Headline and search */}
          <div className="space-y-8 text-center lg:text-left">

            {/* Main heading */}
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Discover a place
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200">
                you'll love to live
              </span>
            </h1>

            {/* Subheading */}
            <p className="max-w-lg mx-auto text-lg text-gray-300 lg:mx-0">
              Search thousands of listings with high‑res photos, virtual tours,
              and neighborhood insights — all in one place.
            </p>

            {/* Search bar / CTA */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <div className="flex w-full max-w-md items-center rounded-full bg-white/10 p-1 backdrop-blur-sm ring-1 ring-white/20">
                <input
                  type="text"
                  placeholder="Enter address, city, or ZIP"
                  className="w-full border-0 bg-transparent px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-0"
                />
                <button className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900">
                  Search
                </button>
              </div>
              <button className="rounded-full border border-white/30 px-6 py-3 font-medium text-white transition-all hover:bg-white/10">
                Advanced
              </button>
            </div>

            {/* Trust badges / stats */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-gray-400 lg:justify-start">
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span>10,000+ listings</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-1.8C18 6.57 15.35 4 12 4s-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.8 6-9.14z" />
                </svg>
                <span>All major cities</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z" />
                </svg>
                <span>Verified listings</span>
              </div>
            </div>
          </div>

          {/* Right column: Image / visual */}
          <div className="relative hidden lg:block">
            <div className="relative mx-auto max-w-md">
              {/* Main image card */}
              <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
                <img
                  src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Modern house with pool"
                  className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              {/* Floating card 1 - price estimate */}
              <div className="absolute -left-12 top-12 rounded-lg bg-white/10 p-4 backdrop-blur-md ring-1 ring-white/20">
                <p className="text-xs text-gray-300">Estimated price</p>
                <p className="text-xl font-bold text-white">$725,000</p>
              </div>
              {/* Floating card 2 - new listing */}
              <div className="absolute -bottom-6 -right-6 rounded-lg bg-blue-600/90 p-4 backdrop-blur-md ring-1 ring-white/20">
                <p className="text-xs text-blue-100">Just listed</p>
                <p className="text-lg font-bold text-white">3d tour available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom quick links / categories */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400 lg:justify-between">
            <span className="font-medium text-white">Browse by:</span>
            <a href="#" className="hover:text-white transition">Houses</a>
            <a href="#" className="hover:text-white transition">Apartments</a>
            <a href="#" className="hover:text-white transition">Condos</a>
            <a href="#" className="hover:text-white transition">Townhomes</a>
            <a href="#" className="hover:text-white transition">Lots & land</a>
            <a href="#" className="hover:text-white transition">Commercial</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealEstateHero;