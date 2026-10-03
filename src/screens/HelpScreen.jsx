import React, { useState } from 'react';

const FAQS = [
  { q: 'How do I order a product?', a: 'Browse items on the Explore page, select your product, and click "Buy Now" or contact the seller directly.' },
  { q: 'What payment methods are supported?', a: 'We support Mobile Money (MTN, Vodafone, AirtelTigo) and major credit/debit cards.' },
  { q: 'How do I contact seller support?', a: 'You can chat directly with sellers via the Messages tab on any product page.' },
];

export default function HelpScreen() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-800">Help & Support</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Support Banner */}
        <div className="bg-gradient-to-r from-brand-500 to-brand-600 text-white p-4 rounded-2xl shadow-md">
          <h2 className="font-bold text-base">Need Direct Assistance?</h2>
          <p className="text-xs text-brand-100 mt-1">Our support team in Accra is available 24/7 to assist you.</p>
          <button className="mt-3 bg-white text-brand-700 text-xs px-4 py-2 rounded-xl font-bold active:scale-95 transition-transform">
            Contact Support
          </button>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <h3 className="font-bold text-sm text-gray-800 mb-3">Frequently Asked Questions</h3>
          <div className="divide-y divide-gray-100">
            {FAQS.map((faq, index) => (
              <div key={index} className="py-3">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left font-semibold text-xs text-gray-700 flex justify-between items-center"
                >
                  <span>{faq.q}</span>
                  <span className="text-gray-400">{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && (
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}