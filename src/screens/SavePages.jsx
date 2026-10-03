import React, { useState } from 'react';
import { products } from '../data';

export default function SavedItemsPage() {
  // Prototype defaults to saving the first two items in data.js
  const [savedList, setSavedList] = useState([products[0], products[3]]);

  const removeItem = (id) => {
    setSavedList(savedList.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Saved Items</h1>
        <span className="text-xs font-semibold text-gray-500">{savedList.length} items</span>
      </div>

      <div className="p-4 space-y-3">
        {savedList.length > 0 ? (
          savedList.map((product) => (
            <div key={product.id} className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex gap-3 items-center">
              <img src={product.images[0]} alt={product.name} className="w-20 h-20 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-gray-400 uppercase font-semibold">{product.category}</span>
                <h3 className="font-bold text-xs text-gray-800 truncate">{product.name}</h3>
                <p className="text-[11px] text-gray-400">{product.location}</p>
                <p className="font-bold text-brand-600 text-xs mt-1">GHS {product.price.toLocaleString()}</p>
              </div>
              <button onClick={() => removeItem(product.id)} className="p-2 text-red-500">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-16 text-gray-400 text-xs">No saved items found.</div>
        )}
      </div>
    </div>
  );
}
