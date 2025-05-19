import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">About Us</h1>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-12">
            <div className="w-full md:w-1/2">
              {/* Replace with your actual image */}
              <img 
                src="/images/image.png" 
                alt="The Yahweh Project Logo" 
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
              <p className="text-sm text-center text-gray-500 mt-2">The Yahweh Project: Hope for the Hurting</p>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                At TBE, we believe in more than just fashion. We are committed to creating minimalist, high-quality clothing with a purpose. Our collections are designed for conscious individuals who appreciate timeless style and ethical production.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                We are proud to partner with organizations like **The Yahweh Project**, dedicated to bringing hope to the hurting. A significant portion of our profits is donated to support their vital work in the community.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                By choosing TBE, you're not just getting a piece of clothing; you're contributing to a larger movement of positive change and making a real impact on the lives of others.
              </p>
            </div>
          </div>

          {/* Add more sections about collections, values, etc. */}
           <div className="mt-16 pt-12 border-t border-gray-200">
             <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700 leading-relaxed">
               <div>
                 <h3 className="text-xl font-semibold mb-2">Minimalism & Quality</h3>
                 <p>We focus on clean designs and durable materials that stand the test of time, reducing waste and promoting conscious consumption.</p>
               </div>
               <div>
                 <h3 className="text-xl font-semibold mb-2">Ethical Production</h3>
                 <p>We are committed to fair labor practices and environmentally responsible manufacturing processes.</p>
               </div>
               <div>
                 <h3 className="text-xl font-semibold mb-2">Community Impact</h3>
                 <p>Through our partnerships, we aim to give back and support initiatives that make a tangible difference in people's lives.</p>
               </div>
               <div>
                 <h3 className="text-xl font-semibold mb-2">Transparency</h3>
                 <p>We believe in being open about our practices and the impact of your purchases.</p>
               </div>
             </div>
           </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About; 