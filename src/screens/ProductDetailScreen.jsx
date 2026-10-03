import { useState } from "react";
import { ArrowLeft, Heart, Share2, MapPin, MessageCircle, ShoppingCart, Minus, Plus, Star } from "lucide-react";
import { stores, comments } from "../data";

export default function ProductDetailScreen({ product, onBack, onStore }) {
  const [imgIdx,  setImgIdx]  = useState(0);
  const [qty,     setQty]     = useState(1);
  const [liked,   setLiked]   = useState(false);
  const [added,   setAdded]   = useState(false);
  const store = stores.find(s => s.id === product.storeId);

  const handleCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-28">

        {/* Image carousel */}
        <div className="relative">
          <img
            src={product.images[imgIdx]}
            alt={product.name}
            className="w-full h-72 object-cover"
          />
          {/* Back + actions */}
          <div className="absolute top-12 left-0 right-0 px-4 flex items-center justify-between">
            <button
              onClick={onBack}
              className="w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow"
            >
              <ArrowLeft size={18} className="text-gray-700" />
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setLiked(l => !l)}
                className="w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow"
              >
                <Heart size={16} className={liked ? "fill-red-500 text-red-500" : "text-gray-500"} />
              </button>
              <button className="w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow">
                <Share2 size={16} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* Thumbnail strip */}
          {product.images.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`w-12 h-9 rounded-lg overflow-hidden border-2 transition-all ${
                    i === imgIdx ? "border-brand-500 scale-105" : "border-white/60"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Store info */}
        <button
          onClick={() => onStore(store)}
          className="flex items-center gap-3 mx-4 mt-4 p-3 bg-green-50 rounded-xl border border-green-100 active:bg-green-100 transition-colors"
        >
          <img src={store?.avatar} alt={store?.name} className="w-10 h-10 rounded-full object-cover" />
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold text-green-800">{store?.name}</p>
            <p className="text-xs text-green-600">{store?.totalSales} total sales · View store →</p>
          </div>
        </button>

        {/* Product details */}
        <div className="px-4 mt-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{product.category}</span>
              <h2 className="text-xl font-bold text-gray-800 mt-1 leading-tight">{product.name}</h2>
            </div>
            <p className="text-2xl font-bold text-green-600">${product.price.toLocaleString()}</p>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1 text-gray-500">
              <MapPin size={13} />
              <span className="text-xs">{product.location}</span>
            </div>
            <span className={`text-xs font-medium ${product.stock > 3 ? "text-green-600" : "text-orange-500"}`}>
              {product.stock} in stock
            </span>
            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={11} className="fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs text-gray-400 ml-1">(24)</span>
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mt-4">
            <span className="text-sm font-medium text-gray-700">Quantity</span>
            <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm"
              >
                <Minus size={14} className="text-gray-600" />
              </button>
              <span className="w-6 text-center text-sm font-bold text-gray-800">{qty}</span>
              <button
                onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center shadow-sm"
              >
                <Plus size={14} className="text-white" />
              </button>
            </div>
            <span className="text-sm font-bold text-green-600 text-brand-600 ml-auto">
              Total: ${(product.price * qty).toLocaleString()}
            </span>
          </div>

          {/* Description */}
          <div className="mt-5">
            <h3 className="text-sm font-bold text-gray-800 mb-2">Description</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{product.description}</p>
            <ul className="mt-3 space-y-1.5">
              {product.specs.map((spec, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600 bg-brand-500 flex-shrink-0" />
                  {spec}
                </li>
              ))}
            </ul>
          </div>

          {/* Message seller */}
          <button className="mt-5 w-full flex items-center justify-center gap-2 border border-green-500 text-green-600 rounded-xl py-3 text-sm font-semibold active:bg-brand-50 transition-colors">
            <MessageCircle size={16} />
            Message Seller
          </button>

          {/* Comments */}
          <div className="mt-6">
            <h3 className="text-sm font-bold text-gray-800 mb-3">Comments ({comments.length})</h3>
            <div className="space-y-3">
              {comments.map(c => (
                <div key={c.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {c.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-700">{c.user}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 px-4 py-3">
        <button
          onClick={handleCart}
          className={`w-full py-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            added
              ? "bg-green-500 text-white"
              : "bg-green-500 text-white active:bg-green-700"
          }`}
        >
          <ShoppingCart size={18} />
          {added ? "Added to Cart ✓" : `Add to Cart · $${(product.price * qty).toLocaleString()}`}
        </button>
      </div>
    </div>
  );
}
