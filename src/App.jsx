// import { useState } from "react";
// import { AuthProvider, useAuth } from "./context/AuthContext";
// import { Home, Search, PlusSquare, Store, User } from "lucide-react";
// import LoginScreen from "./screens/LoginScreen";

// // ── Uncomment each import as you add the real screen file ────────────────────
// // import SignUpScreen        from "./screens/SignUpScreen";
// import FeedScreen          from "./screens/FeedScreen";
// import ExploreScreen         from "./screens/ExploreScreen";
// // import CartPage            from "./screens/CartPage";
// // import AddProductScreen    from "./screens/AddProductScreen";
// // import SellerDashboard     from "./screens/SellerDashboard";
// // import FollowingStoresPage from "./screens/FollowingStoresPage";
// // import ProfileScreen       from "./screens/ProfileScreen";
// // import ProductDetailScreen from "./screens/ProductDetailScreen";
// // import StoreScreen         from "./screens/StoreScreen";

// const NAV_TABS = [
//   { key: "home",    icon: Home,       label: "Home"    },
//   { key: "explore", icon: Search,     label: "Explore" },
//   { key: "sell",    icon: PlusSquare, label: "Sell"    },
//   { key: "store",   icon: Store,      label: "Store"   },
//   { key: "me",      icon: User,       label: "Me"      },
// ];

// // Temporary placeholder — delete each one as you wire in the real screen
// function Placeholder({ title, desc, role, onBack, onLogout }) {
//   return (
//     <div className="flex flex-col h-full bg-gray-50">
//       {onBack && (
//         <div className="bg-white px-4 pt-12 pb-4 border-b border-gray-100 flex items-center gap-3">
//           <button onClick={onBack} className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
//             <span className="text-gray-600 text-sm font-bold">←</span>
//           </button>
//           <span className="font-bold text-gray-800">{title}</span>
//         </div>
//       )}
//       <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center pb-24">
//         <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center">
//           <span className="text-brand-600 text-2xl">🚧</span>
//         </div>
//         <div>
//           <p className="text-base font-bold text-gray-700">{title}</p>
//           <p className="text-sm text-gray-400 mt-1">{desc}</p>
//           {role && (
//             <span className="mt-3 inline-block text-xs bg-brand-50 text-brand-700 px-3 py-1.5 rounded-full font-semibold">
//               Role: {role}
//             </span>
//           )}
//         </div>
//         {onLogout && (
//           <button onClick={onLogout}
//             className="mt-4 px-6 py-3 bg-red-50 text-red-500 rounded-xl text-sm font-semibold border border-red-100">
//             Sign Out
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// function MarketplaceApp() {
//   const { role, isGuest, isSeller, logout } = useAuth();

//   const [tab,    setTab]    = useState("home");
//   const [screen, setScreen] = useState(null);   // "login" | "signup" | null
//   const [product, setProduct] = useState(null);
//   const [store,   setStore]   = useState(null);

//   const openLogin   = () => setScreen("login");
//   const openSignUp  = () => setScreen("signup");
//   const closeScreen = () => setScreen(null);
//   const afterAuth   = () => setScreen(null);

//   const handleTabNav = (key) => {
//     if (["sell", "store", "me"].includes(key) && isGuest) { openLogin(); return; }
//     setTab(key);
//     setProduct(null);
//     setStore(null);
//     setScreen(null);
//   };

//   // "Sell" label becomes "Cart" for logged-in buyers
//   const resolvedTabs = NAV_TABS.map((t) =>
//     t.key === "sell" && !isGuest && !isSeller ? { ...t, label: "Cart" } : t
//   );

//   const showOverlay   = screen !== null;
//   const showProduct   = !showOverlay && product !== null;
//   const showStore     = !showOverlay && !showProduct && store !== null;
//   const showBottomNav = !showOverlay && !showProduct && !showStore;

//   function TabScreen() {
//     switch (tab) {
//       case "home":
//         return <FeedScreen title="Home" desc="Replace with <FeedScreen />" role={role} />;
//       case "explore":
//         return <ExploreScreen title="Explore" desc="Replace with <ExplorePage />" role={role} />;
//       case "sell":
//         return isSeller
//           ? <Placeholder title="List a Product" desc="Replace with <AddProductScreen />" role={role} />
//           : <Placeholder title="Cart" desc="Replace with <CartPage />" role={role} />;
//       case "store":
//         return isSeller
//           ? <Placeholder title="My Store Dashboard" desc="Replace with <SellerDashboard />" role={role} />
//           : <Placeholder title="Stores I Follow" desc="Replace with <FollowingStoresPage />" role={role} />;
//       case "me":
//         return <Placeholder title="My Profile" desc="Replace with <ProfileScreen />" role={role} onLogout={logout} />;
//       default:
//         return null;
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center">
//       <div className="relative w-full max-w-sm bg-gray-50 min-h-screen flex flex-col shadow-2xl overflow-hidden">
//         <div className="flex-1 overflow-hidden relative">

//           {showOverlay && (
//             <>
//               {screen === "login" && (
//                 <LoginScreen onBack={closeScreen} onSuccess={afterAuth} onSignUp={openSignUp} />
//               )}
//               {screen === "signup" && (
//                 <Placeholder title="Sign Up" desc="Replace with <SignUpScreen />" onBack={closeScreen} />
//               )}
//             </>
//           )}

//           {showProduct && (
//             <Placeholder title={product?.name ?? "Product"} desc="Replace with <ProductDetailScreen />" onBack={() => setProduct(null)} />
//           )}

//           {showStore && (
//             <Placeholder title={store?.name ?? "Store"} desc="Replace with <StoreScreen />" onBack={() => setStore(null)} />
//           )}

//           {!showOverlay && !showProduct && !showStore && <TabScreen />}
//         </div>

//         {showBottomNav && (
//           <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 z-50">
//             <div className="flex justify-around py-2">
//               {resolvedTabs.map(({ key, icon: Icon, label }) => {
//                 const active = tab === key;
//                 if (key === "sell") return (
//                   <button key={key} onClick={() => handleTabNav(key)} className="flex flex-col items-center -mt-5">
//                     <div className={"w-12 h-12 rounded-full flex items-center justify-center shadow-lg " + (active ? "bg-brand-700" : "bg-brand-500")}>
//                       <Icon size={22} className="text-white" />
//                     </div>
//                     <span className="text-[10px] mt-1 text-gray-500">{label}</span>
//                   </button>
//                 );
//                 return (
//                   <button key={key} onClick={() => handleTabNav(key)} className="flex flex-col items-center gap-0.5 px-2 py-1">
//                     <Icon size={22} className={active ? "text-brand-600" : "text-gray-400"} strokeWidth={active ? 2.5 : 1.8} />
//                     <span className={"text-[10px] font-medium " + (active ? "text-brand-600" : "text-gray-400")}>{label}</span>
//                   </button>
//                 );
//               })}
//             </div>
//           </nav>
//         )}
//       </div>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <MarketplaceApp />
//     </AuthProvider>
//   );
// }

import { useState } from "react";
import BottomNav from "./components/BottomNav";
import FeedScreen         from "./screens/FeedScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import StoreScreen        from "./screens/StoreScreen";
import AddProductScreen   from "./screens/AddProductScreen";
import SellerProfileScreen from "./screens/SellerProfileScreen";
import SignUpScreen       from "./screens/SignUpScreen";
import ProfileScreen      from "./screens/ProfileScreen";

import ExploreScreen from "./screens/ExploreScreen";
import NotificationScreen from "./screens/NotificationScreen";

// Nav keys that show bottom nav
const BOTTOM_NAV_TABS = ["feed", "add", "store", "profile", "notification"];

export default function App() {
  const [tab,     setTab]     = useState("feed");
  const [product, setProduct] = useState(null);
  const [store,   setStore]   = useState(null);
  const [overlay, setOverlay] = useState(null); // "signup" | "seller-profile"

  // Derive the active "page"
  let page = tab;
  if (product) page = "product";
  if (store)   page = "store-detail";
  if (overlay) page = overlay;

  const handleNav = key => {
    setProduct(null);
    setStore(null);
    setOverlay(null);
    setTab(key);
  };

  const handleProduct = p => {
    setStore(null);
    setProduct(p);
  };

  const handleStore = s => {
    setProduct(null);
    setStore(s);
  };

  const handleBack = () => {
    if (store)   { setStore(null); return; }
    if (product) { setProduct(null); return; }
    if (overlay) { setOverlay(null); return; }
  };

  const showBottomNav = !product && !store && !overlay;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      {/* Mobile shell */}
      <div className="relative w-full max-w-sm bg-gray-50 min-h-screen overflow-hidden flex flex-col shadow-2xl">

        {/* ── Screen Router ── */}
        <div className="flex-1 overflow-hidden relative">

          {page === "feed" && (
            <FeedScreen
              onProduct={handleProduct}
            />
          )}

          {page === "search" && (
            <ExploreScreen />
          )}

          {page === "notification" && (
            <NotificationScreen />
          )}

          {page === "product" && product && (
            <ProductDetailScreen
              product={product}
              onBack={handleBack}
              onStore={handleStore}
            />
          )}

          {page === "store-detail" && store && (
            <StoreScreen
              store={store}
              onBack={handleBack}
              onProduct={handleProduct}
            />
          )}

          {page === "add" && (
            <AddProductScreen />
          )}

          {page === "store" && (
            <SellerProfileScreen />
          )}

          {page === "profile" && (
            <ProfileScreen
              onSignUp={() => setOverlay("signup")}
            />
          )}

          {page === "signup" && (
            <SignUpScreen
              onBack={handleBack}
              onSuccess={() => setOverlay(null)}
            />
          )}
        </div>

        {/* ── Bottom Navigation ── */}
        {showBottomNav && (
          <BottomNav current={tab} onNav={handleNav} />
        )}
      </div>
    </div>
  );
}
