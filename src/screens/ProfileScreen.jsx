import { ChevronRight, ShoppingBag, Heart, Store, Settings, HelpCircle, LogOut, Star } from "lucide-react";

const menuItems = [
  { icon: ShoppingBag, label: "My Orders",       badge: "3",  color: "bg-blue-100 text-blue-600"   },
  { icon: Heart,       label: "Saved Items",     badge: "12", color: "bg-pink-100 text-pink-600"   },
  { icon: Store,       label: "My Store",        badge: null, color: "bg-brand-100 text-brand-600" },
  { icon: Star,        label: "Reviews",         badge: null, color: "bg-amber-100 text-amber-600" },
  { icon: Settings,    label: "Settings",        badge: null, color: "bg-gray-100 text-gray-600"   },
  { icon: HelpCircle,  label: "Help & Support",  badge: null, color: "bg-purple-100 text-purple-600"},
];

export default function ProfileScreen({ onSignUp }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Header */}
        <div className="bg-white px-4 pt-12 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-2xl font-bold text-white shadow">
              K
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-800">Kwame Mensah</h2>
              <p className="text-sm text-gray-400">kwame@email.com</p>
              <span className="mt-1 inline-block text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">Buyer & Seller</span>
            </div>
            <button className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
              <Settings size={16} className="text-gray-500" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-5">
            {[
              { label: "Orders",  value: "23" },
              { label: "Saved",   value: "12" },
              { label: "Reviews", value: "8"  },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 rounded-xl py-3 text-center">
                <p className="text-xl font-bold text-gray-800">{value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div className="px-4 mt-4 space-y-2">
          {menuItems.map(({ icon: Icon, label, badge, color }) => (
            <button
              key={label}
              className="w-full flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 active:bg-gray-50 transition-colors"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
                <Icon size={17} />
              </div>
              <span className="flex-1 text-sm font-medium text-gray-700 text-left">{label}</span>
              {badge && (
                <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{badge}</span>
              )}
              <ChevronRight size={16} className="text-gray-300" />
            </button>
          ))}
        </div>

        {/* Sign up CTA */}
        <div className="mx-4 mt-4 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-4 text-white">
          <p className="text-sm font-bold">Start selling today</p>
          <p className="text-xs text-brand-100 mt-1">List your products and reach buyers across Ghana.</p>
          <button
            onClick={onSignUp}
            className="mt-3 bg-white text-green-600 text-xs font-bold px-4 py-2 rounded-xl active:bg-brand-50 transition-colors"
          >
            Create Store →
          </button>
        </div>

        {/* Logout */}
        <button className="mx-4 mt-4 w-[calc(100%-2rem)] flex items-center gap-3 bg-red-50 rounded-2xl px-4 py-3.5 border border-red-100">
          <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
            <LogOut size={17} className="text-red-500" />
          </div>
          <span className="text-sm font-medium text-red-500">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
