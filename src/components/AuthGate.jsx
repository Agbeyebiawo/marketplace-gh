import { useAuth } from "../context/AuthContext";

/**
 * AuthGate — wraps any action or screen that requires sign-in.
 *
 * Usage A  intercept a click on a button:
 *   <AuthGate onAuthRequired={openLogin}>
 *     <button onClick={followStore}>Follow Store</button>
 *   </AuthGate>
 *
 * Usage B  protect a whole screen with a fallback:
 *   <AuthGate onAuthRequired={openLogin} fallback={<GuestBanner />}>
 *     <SellerDashboard />
 *   </AuthGate>
 *
 * Props:
 *   onAuthRequired  fn called when a guest tries to interact
 *   fallback        element shown to guests (optional, defaults to intercepted child)
 *   requiredRole    "buyer" | "seller" — enforce a specific role beyond just being signed in
 */
export default function AuthGate({ children, onAuthRequired, fallback, requiredRole }) {
  const { isGuest, role } = useAuth();
  const blocked = isGuest || (requiredRole && role !== requiredRole);

  if (!blocked) return children;
  if (fallback)  return fallback;

  const child = Array.isArray(children) ? children[0] : children;
  if (!child) return null;

  return (
    <span
      onClick={(e) => { e.stopPropagation(); onAuthRequired?.(); }}
      className="contents"
    >
      {child}
    </span>
  );
}
