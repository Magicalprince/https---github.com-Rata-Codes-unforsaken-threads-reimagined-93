import React, { createContext, useContext, useState, useEffect } from "react";
import { getCustomerByUsername, Customer } from "@/lib/airtable";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: Customer | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Derive isAuthenticated and isAdmin from user
  const isAuthenticated = !!user;
  const isAdmin = isAuthenticated && user?.fields?.Username === "admincontrol@5678";

  useEffect(() => {
    setIsLoading(false);
  }, []);

  // Re-add localStorage persistence for non-admin users
  useEffect(() => {
    const storedUser = localStorage.getItem("tbeUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Only load from localStorage if NOT the admin user
        if (parsedUser?.fields?.Username !== "admincontrol@5678") {
          setUser(parsedUser);
        } else {
          // If it's the admin user stored, remove it to prevent auto-login
          localStorage.removeItem("tbeUser");
        }
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("tbeUser");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Special case for admin
      if (username === "admincontrol@5678" && password === "admincontrol@5678") {
        const adminUser: Customer = {
          fields: {
            Username: "admincontrol@5678",
            Name: "Admin",
            CID: "admin"
          }
        };
        setUser(adminUser);
        // Do NOT save admin user to localStorage for auto-login prevention
        toast({ 
          title: "Welcome Admin", 
          description: "You've successfully logged in as admin." 
        });
        return true;
      }

      // Regular user login
      const foundUser = await getCustomerByUsername(username);
      
      if (foundUser && foundUser.fields && foundUser.fields.Password === password) {
        setUser(foundUser);
        // Save non-admin user to localStorage
        localStorage.setItem("tbeUser", JSON.stringify(foundUser));
        toast({ 
          title: "Welcome back", 
          description: "You've successfully logged in." 
        });
        return true;
      } else {
        toast({ 
          title: "Login failed", 
          description: "Invalid username or password.", 
          variant: "destructive" 
        });
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({ 
        title: "Login error", 
        description: "An error occurred during login. Please try again.", 
        variant: "destructive" 
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    // Always remove from localStorage on logout
    localStorage.removeItem("tbeUser");
    toast({ 
      title: "Logged out", 
      description: "You've been successfully logged out." 
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
