const CharitySection = () => {
  return (
    <section className="py-20 md:py-24 lg:py-32 bg-gray-100 text-center">
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Fashion With Purpose</h2>
        <p className="mb-8 text-base md:text-lg text-gray-700 leading-relaxed">
          With every purchase you make, we donate a portion of our profits to charitable organizations focused on sustainability and community development. Join us in making a difference through mindful fashion choices.
        </p>
        {/* Optional: Add a button or link to a Charity page */}
        {/* <Link to="/charity" className="inline-block mt-4 px-8 py-3 border border-black bg-black text-white uppercase tracking-wider font-semibold hover:bg-gray-800 transition-colors duration-200 text-sm">Learn More</Link> */}
      </div>
    </section>
  );
};

export default CharitySection;
