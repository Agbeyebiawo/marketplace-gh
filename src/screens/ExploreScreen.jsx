import React, { useState } from 'react';
import { products, categories, locations } from '../data';
import ProductCard from "../components/ProductCard";

export default function ExploreScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [store,   setStore]   = useState(null);
  const handleProduct = p => {
    setStore(null);
    setProduct(p);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesLocation = selectedLocation === 'All' || product.location === selectedLocation;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesLocation && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      {/* Header & Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 p-4 space-y-3">
        <div className="relative">
          <input
            type="search"
            placeholder="Search devices, laptops, accessories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
          />
          <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Category & Location Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="font-semibold">Location:</span>
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => setSelectedLocation(loc)}
              className={`px-2 py-0.5 rounded-full ${selectedLocation === loc ? 'font-bold text-green-600 border-green-600 border bg-green-50' : 'text-gray-500'}`}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="p-4 grid grid-cols-2 gap-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onClick={() => handleProduct(product)}/>
          // <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col justify-between">
          //   <div className="relative h-36 bg-gray-50">
          //     <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          //     <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-md backdrop-blur">
          //       {product.location}
          //     </span>
          //   </div>
          //   <div className="p-3">
          //     <p className="text-[10px] text-gray-400 uppercase font-semibold">{product.category}</p>
          //     <h3 className="font-bold text-xs text-gray-800 truncate mt-0.5">{product.name}</h3>
          //     <div className="flex items-center justify-between mt-2">
          //       <span className="font-bold text-brand-600 text-sm">GHS {product.price.toLocaleString()}</span>
          //       <span className="text-[10px] text-gray-400">{product.stock} left</span>
          //     </div>
          //   </div>
          // </div>
        ))}
      </div>
    </div>
  );
}

