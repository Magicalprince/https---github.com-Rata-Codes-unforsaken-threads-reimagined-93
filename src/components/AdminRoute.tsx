import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const AdminRoute = () => {
  const { isAuthenticated, user } = useAuth();

  // Check if authenticated and if the user is the specific admin
  if (isAuthenticated && user?.fields?.Username === "admincontrol@5678") {
    return <Outlet />;
  } else if (isAuthenticated) {
    // Redirect authenticated non-admin users to profile or home
    // Redirecting to home for now based on overall site flow
    return <Navigate to="/" replace />;
  } else {
    // Redirect unauthenticated users to home or login
    // Redirecting to home for now
    return <Navigate to="/" replace />;
  }
};

export default AdminRoute; 