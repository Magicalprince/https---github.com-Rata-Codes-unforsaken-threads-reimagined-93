import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Sale = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Sale</h1>
        <p>This is the Sale page. Content coming soon.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Sale; 