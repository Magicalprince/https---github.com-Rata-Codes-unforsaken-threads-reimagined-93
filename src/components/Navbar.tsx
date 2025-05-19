import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { Menu, X, Search, ShoppingCart } from "lucide-react";
import AccountButton from "./AccountButton";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Adjust scroll threshold as needed
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
      isScrolled ? "bg-white shadow-sm" : "bg-transparent",
      isMobileMenuOpen && "bg-white shadow-sm" // Ensure background is white when mobile menu is open
    )}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo - Centered on mobile, left on desktop */}
          <div className="flex-shrink-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
            <Link to="/" aria-label="Home">
              <Logo />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex h-full items-center">
            {/* Left side links */}
            <NavLink 
              to="/shop" 
              className={({ isActive }) => 
                cn("h-full flex items-center px-4 text-sm uppercase tracking-wider border-b-2 border-transparent hover:border-black", 
                isActive && "font-medium border-black")
              }
            >
              Shop
            </NavLink>
            <NavLink 
              to="/collections" 
              className={({ isActive }) => 
                cn("h-full flex items-center px-4 text-sm uppercase tracking-wider border-b-2 border-transparent hover:border-black", 
                isActive && "font-medium border-black")
              }
            >
              Collections
            </NavLink>
            <NavLink 
              to="/sale" 
              className={({ isActive }) => 
                cn("h-full flex items-center px-4 text-sm uppercase tracking-wider border-b-2 border-transparent hover:border-black", 
                isActive && "font-medium border-black")
              }
            >
              Sale
            </NavLink>
            
            {/* Right side links - Pushed to the right by logo centering */}
             <div className="flex-grow h-full"></div> {/* Spacer */}
             <NavLink 
               to="/about" 
               className={({ isActive }) => 
                 cn("h-full flex items-center px-4 text-sm uppercase tracking-wider border-b-2 border-transparent hover:border-black", 
                 isActive && "font-medium border-black")
               }
               aria-label="About Us"
             >
               About
             </NavLink>
          </nav>
          
          {/* Action icons */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Mobile menu toggle */}
             <Button
               variant="ghost"
               size="icon"
               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
               className="md:hidden"
             >
               {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
               <span className="sr-only">Toggle menu</span>
             </Button>
             
             {/* Desktop Search Icon */}
             <Button variant="ghost" size="icon" className="hidden md:inline-flex">
               <Search className="h-5 w-5" />
               <span className="sr-only">Search</span>
             </Button>
            <AccountButton />
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
                {cartCount > 0 && (
                   <Badge 
                     className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs font-bold bg-black text-white rounded-full"
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
      <div className={cn("md:hidden bg-white border-b border-gray-200", isMobileMenuOpen ? "block" : "hidden")}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {isMobileMenuOpen && (
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink 
                to="/shop" 
                className={({ isActive }) => 
                  cn("block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100", 
                  isActive ? "bg-gray-100" : "")
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </NavLink>
              
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  cn("block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100", 
                  isActive ? "bg-gray-100" : "")
                }
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="About Us"
              >
                About
              </NavLink>
              <NavLink 
                to="/collections" 
                className={({ isActive }) => 
                  cn("block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100", 
                  isActive ? "bg-gray-100" : "")
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Collections
              </NavLink>
              <NavLink 
                to="/sale" 
                className={({ isActive }) => 
                  cn("block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100", 
                  isActive ? "bg-gray-100" : "")
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sale
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  cn("block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100", 
                  isActive ? "bg-gray-100" : "")
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </NavLink>
              <NavLink 
                to="/faq" 
                className={({ isActive }) => 
                  cn("block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100", 
                  isActive ? "bg-gray-100" : "")
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
