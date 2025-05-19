import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate API call
    toast({
      title: "Success!",
      description: "You've been subscribed to our newsletter.",
    });
    
    setEmail("");
  };
  
  return (
    <section className="py-20 md:py-24 lg:py-32 px-4 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8 max-w-2xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">Stay Updated</h2>
        <p className="mb-8 text-base md:text-lg text-gray-700 leading-relaxed">
          Subscribe to our newsletter for exclusive offers, early access to new releases, and style inspiration.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-base"
            required
          />
          <button 
            type="submit"
            className="px-8 py-3 bg-black text-white font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors duration-200 text-sm"
           >
             Subscribe
           </button>
         </form>
         
        <p className="mt-6 text-xs text-gray-600">
          By subscribing, you agree to our <Link to="/terms" className="underline hover:text-gray-800">Terms of Service</Link> and <Link to="/privacy" className="underline hover:text-gray-800">Privacy Policy</Link>.
        </p>
       </div>
     </section>
  );
};

export default Newsletter;
