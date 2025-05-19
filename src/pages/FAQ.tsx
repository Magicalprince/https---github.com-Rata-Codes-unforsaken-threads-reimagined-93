import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
        <p>This is the FAQ page. Content coming soon.</p>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ; 