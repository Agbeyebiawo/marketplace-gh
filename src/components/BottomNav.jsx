import { Home, Search, PlusSquare, Store, User } from "lucide-react";

const tabs = [
  { key: "feed",    icon: Home,       label: "Home"    },
  { key: "search",  icon: Search,     label: "Explore" },
  { key: "add",     icon: PlusSquare, label: "Sell"    },
  { key: "store",   icon: Store,      label: "Store"   },
  { key: "profile", icon: User,       label: "Me"      },
];

export default function BottomNav({ current, onNav }) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 z-50">
      <div className="flex justify-around py-2">
        {tabs.map(({ key, icon: Icon, label }) => {
          const active = current === key;
          if (key === "add") {
            return (
              <button
                key={key}
                onClick={() => onNav(key)}
                className="flex flex-col items-center -mt-5"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                  active ? "bg-green-700" : "bg-green-500"
                }`}>
                  <Icon size={22} className="text-white" />
                </div>
                <span className="text-[10px] mt-1 text-gray-500">{label}</span>
              </button>
            );
          }
          return (
            <button
              key={key}
              onClick={() => onNav(key)}
              className="flex flex-col items-center gap-0.5 px-2 py-1"
            >
              <Icon
                size={22}
                className={active ? "text-green-600" : "text-gray-400"}
                strokeWidth={active ? 2.5 : 1.8}
              />
              <span className={`text-[10px] font-medium ${active ? "text-green-600" : "text-gray-400"}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
