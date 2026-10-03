import { useState } from "react";
import { Search, Bell, MapPin } from "lucide-react";
import { products, categories, locations } from "../data";
import ProductCard from "../components/ProductCard";

export default function FeedScreen({ onProduct }) {
  const [category, setCategory] = useState("All");
  const [location, setLocation]  = useState("All");

  const filtered = products.filter(p =>
    (category === "All" || p.category === category) &&
    (location  === "All" || p.location  === location)
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-3 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-gray-400">Good morning 👋</p>
            <h1 className="text-lg font-bold text-gray-800">MarketPlace GH</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center relative">
              <Bell size={18} className="text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2.5">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search products, stores..."
            className="bg-transparent text-sm flex-1 outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Category tabs */}
        <div className="flex gap-2 px-4 pt-4 pb-1 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-full transition-colors ${
                category === cat
                  ? "bg-brand-500 text-white shadow-sm bg-green-600"
                  : "bg-white text-gray-500 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Location filter */}
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="flex items-center gap-1 text-gray-500">
            <MapPin size={13} />
            <span className="text-xs font-medium">Location:</span>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {locations.map(loc => (
              <button
                key={loc}
                onClick={() => setLocation(loc)}
                className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  location === loc
                    ? "border-brand-500 bg-brand-50 text-brand-700 font-semibold text-green-800 bg-green-100 border-green-700"
                    : "border-gray-200 text-gray-500 bg-white"
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* Products grid */}
        <div className="px-4 grid grid-cols-2 gap-3">
          {filtered.length === 0 ? (
            <div className="col-span-2 text-center py-16 text-gray-400 text-sm">
              No products found.
            </div>
          ) : filtered.map(p => (
            <ProductCard key={p.id} product={p} onClick={() => onProduct(p)} />
          ))}
        </div>
      </div>
    </div>
  );
}
