import { useState, useEffect } from "preact/hooks";

const imageUrls = [
  "https://family-events.s3.eu-north-1.amazonaws.com/_DSC2642.jpg",
  "https://family-events.s3.eu-north-1.amazonaws.com/_DSC3181.jpg",
  "https://family-events.s3.eu-north-1.amazonaws.com/_DSC9955.JPG",
  "https://family-events.s3.eu-north-1.amazonaws.com/41d7e3b6-3550-4bd0-b2d0-07fa298e1c2f.jpg",
  "https://family-events.s3.eu-north-1.amazonaws.com/91ec6cda-d618-40ef-87aa-fe34046394f3.jpg",
  "https://family-events.s3.eu-north-1.amazonaws.com/2014-11-29 16.38.04.jpg",
  "https://family-events.s3.eu-north-1.amazonaws.com/IMG-20160924-WA0002.jpg",
  "https://family-events.s3.eu-north-1.amazonaws.com/IMG-20180822-WA0015.jpg",
  "https://family-events.s3.eu-north-1.amazonaws.com/IMG-20190908-WA0005.jpg",
  "https://family-events.s3.eu-north-1.amazonaws.com/IMG-20200607-WA0001.jpg",
];

export const ImageCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(timer);
  }, []);

  if (!started) {
    return (
      <button
        onClick={() => setStarted(true)}
        type="button"
        className="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Snurr bildeshow 📸
      </button>
    );
  }

  return (
    <div className="relative w-full h-96">
      {imageUrls.map((url, index) => (
        <img
          src={url}
          alt={`Image ${index + 1}`}
          className={`absolute top-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out rounded-md ${
            currentImageIndex === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
};
