import React, { useState } from 'react';
import { products, stores } from '../data';

export default function ChatScreen() {
  const activeProduct = products[0]; // iPhone 13 Pro Max
  const activeStore = stores.find((s) => s.id === activeProduct.storeId);

  const [messages, setMessages] = useState([
    { id: 1, sender: 'them', text: `Hello! Is the ${activeProduct.name} available in ${activeProduct.location}?` },
    { id: 2, sender: 'me', text: `Yes! We currently have ${activeProduct.stock} left in stock.` }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: 'me', text: inputText }]);
    setInputText('');
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-100 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-20">
        <button className="text-gray-600 text-sm font-semibold">←</button>
        <img src={activeStore.avatar} alt={activeStore.name} className="w-9 h-9 rounded-full object-cover" />
        <div>
          <h2 className="font-bold text-xs text-gray-800">{activeStore.name}</h2>
          <p className="text-[10px] text-brand-600">{activeStore.instagram}</p>
        </div>
      </div>

      {/* Product Card Banner */}
      <div className="bg-white px-4 py-2 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <img src={activeProduct.images[0]} alt={activeProduct.name} className="w-10 h-10 rounded-lg object-cover" />
          <div className="truncate">
            <h4 className="text-xs font-bold text-gray-800 truncate">{activeProduct.name}</h4>
            <p className="text-xs font-semibold text-brand-600">GHS {activeProduct.price.toLocaleString()}</p>
          </div>
        </div>
        <button className="bg-brand-50 text-brand-600 text-xs font-bold px-3 py-1.5 rounded-lg border border-brand-100">
          Make Offer
        </button>
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-xs ${
              msg.sender === 'me' ? 'bg-brand-500 text-white' : 'bg-white text-gray-800 border border-gray-100'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="bg-white border-t border-gray-200 p-3 flex gap-2">
        <input
          type="text"
          placeholder="Write a message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 bg-gray-100 border border-gray-200 rounded-xl px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-brand-300"
        />
        <button type="submit" className="bg-brand-500 text-white px-4 py-2 rounded-xl text-xs font-bold">
          Send
        </button>
      </form>
    </div>
  );
}
