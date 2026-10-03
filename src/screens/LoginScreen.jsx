import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen({ onBack, onSuccess, onSignUp }) {
  const { login } = useAuth();
  const [form,    setForm]    = useState({ email: "", password: "" });
  const [visible, setVisible] = useState(false);
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = () => {
    setError("");
    if (!form.email || !form.password) { setError("Please fill in both fields."); return; }
    setLoading(true);
    setTimeout(() => {
      const result = login({ email: form.email, password: form.password });
      setLoading(false);
      if (result.ok) onSuccess?.();
      else setError(result.error);
    }, 600);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-4 pt-12 pb-4 flex items-center gap-3 border-b border-gray-100">
        <button onClick={onBack} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
          <ArrowLeft size={18} className="text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-800">Sign In</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-6 pt-8 pb-6">
          <div className="mb-8 text-center">
            <div className="w-16 h-16 bg-brand-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md">
              <span className="text-white text-2xl font-black">M</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Welcome back</h2>
            <p className="text-sm text-gray-400 mt-1">Sign in to your Marketplace GH account</p>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs text-red-600 font-medium">
              {error}
            </div>
          )}

          <div className="mb-5 bg-brand-50 border border-brand-100 rounded-xl p-3 text-xs text-brand-700 space-y-1">
            <p className="font-bold">Demo credentials</p>
            <p>Buyer &nbsp;→ buyer@test.com / buyer123</p>
            <p>Seller → seller@test.com / seller123</p>
          </div>

          <div className="mb-4">
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Email Address</label>
            <input type="email" value={form.email} onChange={set("email")} placeholder="you@email.com"
              autoComplete="email"
              className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-300" />
          </div>

          <div className="mb-2">
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Password</label>
            <div className="relative">
              <input type={visible ? "text" : "password"} value={form.password} onChange={set("password")}
                placeholder="••••••••" autoComplete="current-password"
                className="w-full bg-gray-100 rounded-xl px-4 py-3 pr-12 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-300" />
              <button type="button" onClick={() => setVisible((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                {visible ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="text-right mb-6">
            <button className="text-xs text-brand-600 font-semibold">Forgot password?</button>
          </div>

          <button onClick={handleSubmit} disabled={loading}
            className={"w-full py-4 rounded-2xl text-sm font-bold text-white transition-all " +
              (loading ? "bg-brand-300 cursor-not-allowed" : "bg-brand-500 active:bg-brand-700")}>
            {loading ? "Signing in…" : "Sign In"}
          </button>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" /><span className="text-xs text-gray-400">or</span><div className="flex-1 h-px bg-gray-200" />
          </div>

          <button onClick={onSignUp}
            className="w-full py-4 rounded-2xl text-sm font-bold text-brand-600 border-2 border-brand-200 active:bg-brand-50 transition-colors">
            Create an Account
          </button>

          <p className="text-center text-[11px] text-gray-400 mt-6 leading-relaxed">
            By signing in you agree to our{" "}
            <span className="text-brand-600 font-medium">Terms of Service</span>{" "}and{" "}
            <span className="text-brand-600 font-medium">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
