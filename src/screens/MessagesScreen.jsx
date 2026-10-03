import React, { useState } from 'react';
import { stores } from '../data';

export default function MessagesScreen() {
  const [selectedStore, setSelectedStore] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 pb-24 flex flex-col">
      {!selectedStore ? (
        <>
          <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
            <h1 className="text-xl font-bold text-gray-800">Messages</h1>
          </div>
          <div className="divide-y divide-gray-100 bg-white flex-1">
            {stores.map((store) => (
              <div
                key={store.id}
                onClick={() => setSelectedStore(store)}
                className="p-4 flex items-center gap-3 active:bg-gray-50 cursor-pointer"
              >
                <img src={store.avatar} alt={store.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <h3 className="font-bold text-xs text-gray-800 truncate">{store.name}</h3>
                    {store.verified && <span className="text-brand-500 text-xs">✓</span>}
                  </div>
                  <p className="text-[11px] text-gray-500 truncate mt-0.5">Inquiry regarding stock and delivery...</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col bg-white">
          <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-10 shadow-sm">
            <button onClick={() => setSelectedStore(null)} className="text-gray-600 text-sm font-semibold">← Back</button>
            <img src={selectedStore.avatar} alt={selectedStore.name} className="w-8 h-8 rounded-full object-cover" />
            <div>
              <h2 className="font-bold text-xs text-gray-800">{selectedStore.name}</h2>
              <p className="text-[10px] text-gray-400">{selectedStore.category}</p>
            </div>
          </div>
          <div className="flex-1 p-4 bg-gray-50 space-y-2">
            <div className="bg-white p-3 rounded-xl max-w-[80%] text-xs text-gray-700 shadow-sm border border-gray-100">
              Welcome to {selectedStore.name}! How can we help you today?
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
