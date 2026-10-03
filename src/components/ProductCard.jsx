import { useState } from "react";
import { Heart, MapPin } from "lucide-react";
import { stores } from "../data";

export default function ProductCard({ product, onClick }) {
  const [liked, setLiked] = useState(false);
  const store = stores.find(s => s.id === product.storeId);

  return (
    <div
      className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
      onClick={onClick}
    >
      {/* Store header */}
      <div className="flex items-center gap-2 px-3 pt-3 pb-2">
        <img
          src={store?.avatar}
          alt={store?.name}
          className="w-7 h-7 rounded-full object-cover"
        />
        <span className="text-xs font-semibold text-gray-700 truncate">{store?.name}</span>
        {store?.verified && (
          <span className="ml-auto text-[10px] bg-brand-50 text-brand-700 px-1.5 py-0.5 rounded-full font-medium text-green-800 bg-green-100">✓ Verified</span>
        )}
      </div>

      {/* Product image */}
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-44 object-cover"
        />
        <button
          onClick={e => { e.stopPropagation(); setLiked(l => !l); }}
          className="absolute top-2 right-2 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow"
        >
          <Heart
            size={16}
            className={liked ? "fill-red-500 text-red-500" : "text-gray-400"}
          />
        </button>
      </div>

      {/* Details */}
      <div className="px-3 py-2.5">
        <p className="text-sm font-semibold text-gray-800 truncate">{product.name}</p>
        <p className="text-xs text-gray-400 mt-0.5">{product.category}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-base font-bold text-brand-600 text-green-700">${product.price.toLocaleString()}</span>
          <div className="flex items-center gap-1 text-gray-400">
            <MapPin size={11} />
            <span className="text-[11px]">{product.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
