import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, User, Briefcase } from "lucide-react";

export default function SignUpScreen({ onBack, onSuccess }) {
  const [mode,    setMode]    = useState("customer"); // "customer" | "seller"
  const [visible, setVisible] = useState(false);
  const [form,    setForm]    = useState({
    name: "", email: "", password: "", phone: "", location: "", address: ""
  });
  const [done, setDone] = useState(false);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.password) return;
    setDone(true);
    setTimeout(() => { onSuccess && onSuccess(); }, 1500);
  };

  if (done) return (
    <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
      <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center text-4xl">🎉</div>
      <h2 className="text-2xl font-bold text-gray-800">Welcome aboard!</h2>
      <p className="text-sm text-gray-500">Your {mode} account has been created. Redirecting…</p>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
            <ArrowLeft size={18} className="text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-800">Create Account</h1>
        </div>

        {/* Toggle */}
        <div className="flex bg-gray-100 rounded-xl p-1 mt-4">
          {[
            { key: "customer", label: "As Customer", icon: User },
            { key: "seller",   label: "As Seller",   icon: Briefcase },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                mode === key ? "bg-white text-green-600 shadow" : "text-gray-500"
              }`}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-8">
        <div className="px-4 pt-5 space-y-4">
          {[
            { key: "name",     label: "Full Name",     type: "text",  placeholder: "Kwame Mensah" },
            { key: "email",    label: "Email Address", type: "email", placeholder: "kwame@email.com" },
            { key: "phone",    label: "Phone Number",  type: "tel",   placeholder: "+233 XX XXX XXXX" },
            { key: "location", label: "City / Region", type: "text",  placeholder: "Accra, Greater Accra" },
            ...(mode === "seller" ? [
              { key: "address", label: "Store Address", type: "text", placeholder: "123 Oxford Street, Osu" }
            ] : []),
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

          {/* Password */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Password</label>
            <div className="relative">
              <input
                type={visible ? "text" : "password"}
                value={form.password}
                onChange={set("password")}
                placeholder="Min. 8 characters"
                className="w-full bg-gray-100 rounded-xl px-4 py-3 pr-12 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-300"
              />
              <button
                onClick={() => setVisible(v => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {visible ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {mode === "seller" && (
            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
              <p className="text-xs font-semibold text-green-700 mb-1">Seller Benefits</p>
              <ul className="space-y-1">
                {["Reach thousands of buyers across Ghana", "Set up your store in minutes", "Built-in delivery partner options"].map((b, i) => (
                  <li key={i} className="text-xs text-green-600 flex items-center gap-1.5">
                    <span className="text-brand-500">✓</span> {b}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white rounded-2xl py-4 text-sm font-bold mt-2 active:bg-green-700 transition-colors"
          >
            {mode === "customer" ? "Create Account" : "Register as Seller"}
          </button>
          <p className="text-center text-xs text-gray-400">
            Already have an account?{" "}
            <button className="text-green-600 font-semibold">Sign In</button>
          </p>
        </div>
      </div>
    </div>
  );
}
