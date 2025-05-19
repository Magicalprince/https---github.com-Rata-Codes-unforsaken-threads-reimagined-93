import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

const Collections = () => {
  const [urbanInView, setUrbanInView] = useState(false);
  const [sereneInView, setSereneInView] = useState(false);

  const urbanRef = useRef(null);
  const sereneRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === urbanRef.current) {
            setUrbanInView(entry.isIntersecting);
          } else if (entry.target === sereneRef.current) {
            setSereneInView(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (urbanRef.current) observer.observe(urbanRef.current);
    if (sereneRef.current) observer.observe(sereneRef.current);

    return () => {
      if (urbanRef.current) observer.unobserve(urbanRef.current);
      if (sereneRef.current) observer.unobserve(sereneRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">Upcoming Collections</h1>

          {/* Collection 1 Banner */}
          <div 
            ref={urbanRef} 
            className={cn(
              "flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-16 transition-all duration-700 ease-out",
              urbanInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div className="w-full md:w-1/2">
              {/* Placeholder for Collection Image */}
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                {/* Add your collection image here */}
                <img src="/images/download.jpg" alt="Upcoming Collection 1" className="w-full h-full object-cover" />
              </div>
              {/* Consider adding animations here, e.g., fade-in, slide-up */}
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">The "Urban Explorer" Collection</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Inspired by the dynamic energy of city life and the need for versatile, comfortable, and stylish apparel that transitions seamlessly from day to night.
              </p>
              {/* Add more details or a call to action if needed */}
            </div>
          </div>

          {/* Collection 2 Banner */}
          <div 
            ref={sereneRef} 
            className={cn(
              "flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12 mb-16 transition-all duration-700 ease-out",
              sereneInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div className="w-full md:w-1/2">
              {/* Placeholder for Collection Image */}
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                 {/* Add your collection image here */}
                <img src="/images/download (1).jpg" alt="Upcoming Collection 2" className="w-full h-full object-cover" />
              </div>
              {/* Consider adding animations here */}
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">The "Serene Escape" Collection</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Drawing inspiration from nature's tranquility, this collection features earthy tones, relaxed fits, and sustainable fabrics for ultimate comfort and peace of mind.
              </p>
              {/* Add more details or a call to action if needed */}
            </div>
          </div>

          {/* Add more collection banners as needed */}

          <div className="text-center mt-12">
            <p className="text-xl font-semibold">Stay tuned for release dates and sneak peeks!</p>
            {/* Optional: Link to newsletter signup or social media */}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Collections; 