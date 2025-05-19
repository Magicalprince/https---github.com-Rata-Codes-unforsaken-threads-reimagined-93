import { Link } from "react-router-dom";

interface CollectionBannerProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
  altText: string;
  reverse?: boolean;
}

const CollectionBanner = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  imageSrc,
  altText,
  reverse = false,
}: CollectionBannerProps) => {
  return (
    <section className="py-20 md:py-24 lg:py-32 px-4">
      <div className={`container mx-auto px-6 lg:px-8 flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
        <div className="w-full md:w-1/2">
          <div className="aspect-[4/5] overflow-hidden bg-gray-100">
            <img 
              src={imageSrc} 
              alt={altText} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
        
        <div className="w-full md:w-1/2 text-center md:text-left md:px-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 leading-tight">{title}</h2>
          <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">{subtitle}</p>
          <Link to={buttonLink}>
            <button className="px-8 py-3 bg-black text-white uppercase tracking-wider font-semibold hover:bg-gray-800 transition-colors duration-200 text-sm">
              {buttonText}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CollectionBanner;
