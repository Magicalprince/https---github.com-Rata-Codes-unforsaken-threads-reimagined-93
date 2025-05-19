import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageDefault: string;
  imageHover: string;
  discount?: number;
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  imageDefault,
  imageHover,
  discount
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { toast } = useToast();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAddingToCart(true);
    
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    });
    
    setTimeout(() => setIsAddingToCart(false), 1000);
  };

  return (
    <div 
      className="product-card group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${id}`} className="block">
        <div className="product-image-container aspect-[3/4] overflow-hidden bg-gray-100 mb-4 relative">
          <img 
            src={imageDefault} 
            alt={name}
            className={cn("w-full h-full object-cover transition-opacity duration-500", isHovered ? "opacity-0" : "opacity-100")}
          />
          <img 
            src={imageHover} 
            alt={`${name} on model`}
            className={cn("absolute inset-0 w-full h-full object-cover transition-opacity duration-500", isHovered ? "opacity-100" : "opacity-0")}
          />
          
          {discount && (
            <div className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1.5 font-bold">
              SAVE {discount}%
            </div>
          )}
          
          <div 
            className={cn(
              "absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 transform transition-all duration-300 ease-in-out",
              isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            )}
          >
            <button 
              className="w-full bg-white text-black text-sm uppercase tracking-wider py-3 font-semibold hover:bg-gray-200 transition-colors duration-200"
              onClick={handleQuickAdd}
            >
              {isAddingToCart ? "Added!" : "Quick Add"}
            </button>
          </div>
        </div>
        
        <div className="text-left">
          <h3 className="text-sm font-semibold uppercase mb-1 tracking-wider">{name}</h3>
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold">₹{price.toFixed(2)}</p>
            {originalPrice && price < originalPrice && (
              <p className="text-sm text-gray-500 line-through">₹{originalPrice.toFixed(2)}</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
