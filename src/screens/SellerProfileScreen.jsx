import { useState } from "react";
import { Camera, Plus, Check } from "lucide-react";

const productCategories = ["Food","Clothing","Cosmetics","Computers","Mobile Phone","Shoes","Books","Tablets","Laptops","Consoles"];

const themeColors = {
  Primary:       ["#25a56c","#188557","#3b82f6","#7c3aed","#dc2626"],
  Secondary:     ["#d1fae5","#bfdbfe","#ede9fe","#fef9c3","#fee2e2"],
  Complementary: ["#1e293b","#374151","#4b5563","#6b7280","#9ca3af"],
};

export default function SellerProfileScreen() {
  const [form, setForm] = useState({ name: "", about: "", category: "" });
  const [selectedColors, setSelectedColors] = useState({ Primary: 0, Secondary: 0, Complementary: 0 });
  const [done, setDone] = useState(false);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const pickColor = (group, idx) => setSelectedColors(s => ({ ...s, [group]: idx }));

  if (done) return (
    <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
      <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
        style={{ background: themeColors.Primary[selectedColors.Primary] }}>
        🏪
      </div>
      <h2 className="text-xl font-bold text-gray-800">Store Created!</h2>
      <p className="text-sm text-gray-500">Your store "{form.name || "My Store"}" is live. Start adding products!</p>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white px-4 pt-12 pb-4 border-b border-gray-100 sticky top-0 z-10">
        <h1 className="text-lg font-bold text-gray-800">Store Profile</h1>
        <p className="text-xs text-gray-400 mt-0.5">Set up your store identity</p>
      </div>

      <div className="flex-1 overflow-y-auto pb-28">
        <div className="px-4 pt-5 space-y-5">

          {/* Avatar upload */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl shadow-md"
                style={{ background: themeColors.Primary[selectedColors.Primary] }}
              >
                🏪
              </div>
              <button className="absolute -bottom-1.5 -right-1.5 w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center shadow">
                <Camera size={14} className="text-white" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">Upload store photo</p>
          </div>

          {/* Name */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Store Name</label>
            <input
              type="text"
              value={form.name}
              onChange={set("name")}
              placeholder="e.g. TechHub Ghana"
              className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-300"
            />
          </div>

          {/* About */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">About Your Store</label>
            <textarea
              value={form.about}
              onChange={set("about")}
              placeholder="Tell buyers what you sell and what makes your store special..."
              rows={3}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-300 resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Product Category</label>
            <select
              value={form.category}
              onChange={set("category")}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-brand-300 appearance-none"
            >
              <option value="">Select main category</option>
              {productCategories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Theme colors */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-3 block">Store Theme</label>
            <div className="space-y-3">
              {Object.entries(themeColors).map(([group, colors]) => (
                <div key={group}>
                  <p className="text-xs text-gray-400 mb-2">{group}</p>
                  <div className="flex gap-2">
                    {colors.map((color, i) => (
                      <button
                        key={i}
                        onClick={() => pickColor(group, i)}
                        className="w-9 h-9 rounded-full border-2 flex items-center justify-center transition-transform active:scale-95"
                        style={{
                          background: color,
                          borderColor: selectedColors[group] === i ? "#1e293b" : "transparent",
                          boxShadow: selectedColors[group] === i ? "0 0 0 2px white" : "none",
                        }}
                      >
                        {selectedColors[group] === i && (
                          <Check size={13} style={{ color: parseInt(color.replace("#",""),16) > 0xffffff/2 ? "#000" : "#fff" }} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social links */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-2 block">Link Social Accounts</label>
            <div className="space-y-2">
              {[
                { label: "Instagram", color: "bg-pink-100 text-pink-600", placeholder: "@yourstore" },
                { label: "Facebook",  color: "bg-blue-100 text-blue-600",  placeholder: "Your Page Name" },
              ].map(({ label, color, placeholder }) => (
                <div key={label} className="flex items-center gap-3 bg-gray-100 rounded-xl px-3 py-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg ${color}`}>{label[0]+label[1]}</span>
                  <input
                    type="text"
                    placeholder={placeholder}
                    className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                  />
                  <button className="w-7 h-7 bg-brand-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Plus size={13} className="text-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 px-4 py-3">
        <button
          onClick={() => setDone(true)}
          className="w-full bg-brand-500 text-white rounded-2xl py-4 text-sm font-bold active:bg-brand-700 transition-colors"
        >
          Create Store
        </button>
      </div>
    </div>
  );
}
