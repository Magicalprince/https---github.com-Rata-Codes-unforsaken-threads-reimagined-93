import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { Menu, X, Search, ShoppingCart } from "lucide-react";
import AccountButton from "./AccountButton";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";

interface ButtonProps {
  variant?: string;
  size?: string;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/shop" 
              className={({ isActive }) => 
                cn("nav-link text-sm uppercase tracking-wider hover:text-primary/80", 
                isActive && "font-medium")
              }
            >
              Shop
            </NavLink>
            
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                cn("nav-link text-sm uppercase tracking-wider hover:text-primary/80", 
                isActive && "font-medium")
              }
            >
              About
            </NavLink>
          </nav>
          
          {/* Action icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            <AccountButton />
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-black text-white rounded-full"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          
          {isMobileMenuOpen && (
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink 
                to="/shop" 
                className={({ isActive }) => 
                  cn("block px-3 py-2 rounded-md text-base font-medium", 
                  isActive ? "bg-gray-100" : "hover:bg-gray-50")
                }
              >
                Shop
              </NavLink>
              
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  cn("block px-3 py-2 rounded-md text-base font-medium", 
                  isActive ? "bg-gray-100" : "hover:bg-gray-50")
                }
              >
                About
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
