import { useState } from "react";
import { ArrowLeft, MessageCircle, TrendingUp, Package } from "lucide-react";
import { products, categories } from "../data";
import ProductCard from "../components/ProductCard";

export default function StoreScreen({ store, onBack, onProduct }) {
  const [tab, setTab] = useState("All");
  const [joined, setJoined] = useState(false);
  const storeProducts = products.filter(p => p.storeId === store.id);
  const filtered = storeProducts.filter(p => tab === "All" || p.category === tab);
  const storeCats = ["All", ...new Set(storeProducts.map(p => p.category))];

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Banner + back */}
        <div className="relative">
          <img src={store.banner} alt="" className="w-full h-44 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
          <button
            onClick={onBack}
            className="absolute top-12 left-4 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow"
          >
            <ArrowLeft size={18} className="text-gray-700" />
          </button>

          {/* Store avatar */}
          <div className="absolute -bottom-8 left-4">
            <img
              src={store.avatar}
              alt={store.name}
              className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-md"
            />
          </div>
        </div>

        {/* Store info */}
        <div className="px-4 mt-10">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">{store.name}</h2>
              {store.verified && (
                <span className="text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full font-medium">✓ Verified Store</span>
              )}
            </div>
            <button className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
              <MessageCircle size={18} className="text-gray-600" />
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">{store.about}</p>

          {/* Stats */}
          <div className="flex gap-3 mt-4">
            <div className="flex-1 bg-gray-50 rounded-xl p-3 flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp size={14} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Total Sales</p>
                <p className="text-sm font-bold text-gray-800">{store.totalSales}</p>
              </div>
            </div>
            <div className="flex-1 bg-gray-50 rounded-xl p-3 flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Package size={14} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Monthly</p>
                <p className="text-sm font-bold text-gray-800">{store.monthlySales}</p>
              </div>
            </div>
          </div>

          {/* Promotions */}
          <div className="mt-4">
            <p className="text-xs font-semibold text-gray-500 mb-2">PROMOTIONS</p>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {[
                { label: "10% Off Phones", bg: "bg-green-500" },
                { label: "Free Delivery", bg: "bg-purple-500" },
                { label: "Bundle Deal", bg: "bg-orange-400" },
                { label: "Flash Sale", bg: "bg-red-500" },
              ].map((promo, i) => (
                <div key={i} className={`flex-shrink-0 ${promo.bg} text-white text-xs font-semibold px-4 py-2.5 rounded-xl`}>
                  {promo.label}
                </div>
              ))}
            </div>
          </div>

          {/* Social links */}
          <div className="flex gap-2 mt-4">
            <div className="flex items-center gap-1.5 bg-pink-50 px-3 py-1.5 rounded-full">
              <span className="text-pink-500 text-xs font-bold">IG</span>
              <span className="text-xs text-pink-600">{store.instagram}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-full">
              <span className="text-blue-500 text-xs font-bold">FB</span>
              <span className="text-xs text-blue-600">{store.facebook}</span>
            </div>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 px-4 mt-5 overflow-x-auto no-scrollbar">
          {storeCats.map(cat => (
            <button
              key={cat}
              onClick={() => setTab(cat)}
              className={`flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-full transition-colors ${
                tab === cat
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-500 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="px-4 mt-3 grid grid-cols-2 gap-3">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} onClick={() => onProduct(p)} />
          ))}
        </div>
      </div>

      {/* Sticky join CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 px-4 py-3">
        <button
          onClick={() => setJoined(j => !j)}
          className={`w-full py-4 rounded-2xl text-sm font-bold transition-all ${
            joined
              ? "bg-gray-100 text-gray-600 border border-gray-200"
              : "bg-green-500 text-white active:bg-brand-700"
          }`}
        >
          {joined ? "✓ Following Store" : "Follow Store"}
        </button>
      </div>
    </div>
  );
}
