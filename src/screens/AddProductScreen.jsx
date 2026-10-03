import { useState } from "react";
import { Camera, Minus, Plus, X } from "lucide-react";

const categories = ["Food","Clothing","Cosmetics","Computers","Mobile Phone","Shoes","Books","Tablets","Laptops","Consoles","Accessories"];

export default function AddProductScreen() {
  const [qty,      setQty]      = useState(1);
  const [delivery, setDelivery] = useState("self");
  const [previews, setPreviews] = useState([]);
  const [form,     setForm]     = useState({ name: "", price: "", category: "", description: "" });
  const [done,     setDone]     = useState(false);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  // Simulate image "upload" with placeholder colors
  const addImage = () => {
    const colors = ["#4ade80","#60a5fa","#f472b6","#facc15","#fb923c"];
    setPreviews(p => [...p, colors[p.length % colors.length]]);
  };

  const removeImage = idx => setPreviews(p => p.filter((_, i) => i !== idx));

  if (done) return (
    <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
      <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center text-4xl">📦</div>
      <h2 className="text-xl font-bold text-gray-800">Product Listed!</h2>
      <p className="text-sm text-gray-500">Your product is now live and visible to buyers.</p>
      <button onClick={() => setDone(false)} className="mt-2 bg-brand-500 text-white px-6 py-3 rounded-xl text-sm font-semibold">
        Add Another
      </button>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 border-b border-gray-100 sticky top-0 z-10">
        <h1 className="text-lg font-bold text-gray-800">Add Product</h1>
        <p className="text-xs text-gray-400 mt-0.5">List a product on your store</p>
      </div>

      <div className="flex-1 overflow-y-auto pb-28">
        <div className="px-4 pt-5 space-y-5">

          {/* Image upload area */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-2 block">Product Images</label>
            <div className="flex gap-2 flex-wrap">
              {previews.map((color, i) => (
                <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden" style={{ background: color }}>
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center"
                  >
                    <X size={10} className="text-white" />
                  </button>
                </div>
              ))}
              {previews.length < 5 && (
                <button
                  onClick={addImage}
                  className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-1 bg-gray-50 active:bg-gray-100"
                >
                  <Camera size={20} className="text-gray-400" />
                  <span className="text-[10px] text-gray-400 font-medium">Add Photo</span>
                </button>
              )}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-2 block">Quantity</label>
            <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-1 w-fit">
              <button
                onClick={() => setQty(q => Math.max(0, q - 1))}
                className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm"
              >
                <Minus size={16} className="text-gray-600" />
              </button>
              <span className="w-8 text-center text-base font-bold text-gray-800">{qty}</span>
              <button
                onClick={() => setQty(q => q + 1)}
                className="w-10 h-10 rounded-lg bg-brand-500 flex items-center justify-center shadow-sm"
              >
                <Plus size={16} className="text-white" />
              </button>
            </div>
          </div>

          {/* Text fields */}
          {[
            { key: "name",  label: "Product Name", type: "text",   placeholder: "e.g. iPhone 15 Pro Max 256GB" },
            { key: "price", label: "Price (GHS)",  type: "number", placeholder: "0.00" },
          ].map(({ key, label, type, placeholder }) => (
            <div key={key}>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">{label}</label>
              <input
                type={type}
                value={form[key]}
                onChange={set(key)}
                placeholder={placeholder}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-300"
              />
            </div>
          ))}

          {/* Category select */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Category</label>
            <select
              value={form.category}
              onChange={set("category")}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-brand-300 appearance-none"
            >
              <option value="">Select a category</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Description</label>
            <textarea
              value={form.description}
              onChange={set("description")}
              placeholder="Describe your product — condition, features, what's included..."
              rows={4}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-300 resize-none"
            />
          </div>

          {/* Delivery option */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-2 block">Delivery Option</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: "self",  label: "Self-delivery",  desc: "You handle delivery" },
                { key: "third", label: "Third-party",    desc: "Partner courier" },
              ].map(({ key, label, desc }) => (
                <button
                  key={key}
                  onClick={() => setDelivery(key)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    delivery === key
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <p className={`text-xs font-bold ${delivery === key ? "text-brand-700" : "text-gray-700"}`}>{label}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 px-4 py-3">
        <button
          onClick={() => setDone(true)}
          className="w-full bg-brand-500 text-white rounded-2xl py-4 text-sm font-bold active:bg-brand-700 transition-colors"
        >
          Publish Product
        </button>
      </div>
    </div>
  );
}
