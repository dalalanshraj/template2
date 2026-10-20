import { useEffect, useState } from "react";
import api from "../api/axios";
// import AboutSection from "../components/homeSection/About";
import { Link } from "react-router-dom";
import ContactSection from "../components/contactSection";

export default function About({ listingId }) {
  const [images, setImages] = useState([]);
  const [listing, setListing] = useState(null);

  const getImageUrl = (photo) => {
    const base = import.meta.env.VITE_API_URL || "";

    // new object format
    if (photo?.url) {
      if (photo.url.startsWith("http")) {
        return photo.url;
      }

      return base.replace(/\/$/, "") + "/" + photo.url.replace(/^\//, "");
    }

    // old string fallback
    if (typeof photo === "string") {
      if (photo.startsWith("http")) {
        return photo;
      }

      return base.replace(/\/$/, "") + "/" + photo.replace(/^\//, "");
    }

    return "https://via.placeholder.com/600x400";
  };

  useEffect(() => {
    api
      .get("/gallery/published")
      .then((res) => {
        const data = res.data || [];

        const formatted = data.map((img) => getImageUrl(img.image));

        setImages(formatted);
      })
      .catch(console.log);
  }, []);

  const image =
    listing?.photos?.length > 0
      ? getImageUrl(listing.photos[0])
      : "https://via.placeholder.com/600x400";

  // 👉 fallback images (important)
  const image1 =
    images[0] || "https://images.unsplash.com/photo-1505691938895-1758d7feb511";

  const image2 =
    images[1] || "https://images.unsplash.com/photo-1560185007-cde436f6a4d0";

  const image3 = images[4];

  const heroImage = images[2] || image1;

  return (
    <>
      {/* 🔥 HERO */}
      <section className="relative h-[20vh] flex items-center justify-center text-white">
        <div className="relative text-center px-6">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[94px]  text-sky-900 text-center leading-tight"
            style={{ fontFamily: '"Montserrat", "sans-serif"' }}
          >
            About Us
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Discover comfort, luxury, and unforgettable stays with us.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 mt-20 items-center py-20 px-6 md:px-16">
        {/* TEXT */}
        <div>
          <span className="inline-block bg-[#00796B] text-white uppercase tracking-[3px] text-xs px-5 py-2 rounded-md">
            About us
          </span>

          <h3
            className="text-3xl md:text-6xl  text-gray-800 mb-8"
            style={{ fontFamily: '"Montserrat", "sans-serif"' }}
          >
            A Passion for Real <br /> Estate in Southwest Florida
          </h3>
        </div>
        {/* IMAGE */}
        <div className="relative group overflow-hidden rounded-2xl leading-light">
          <p>
            My Florida Real Estate and Vacation Rentals is committed to helping
            buyers, sellers, and investors navigate the Southwest Florida market
            with confidence. Our experienced realtors specialize in luxury
            homes, beachfront properties, golf communities, and short-term
            rentals, providing expert guidance every step of the way. With a
            focus on integrity, professionalism, and local insight, we make real
            estate transactions smooth and successful.
          </p>
        </div>
      </div>

      {/* 🔥 WHY CHOOSE US */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-16 bg-gray-100">
        <span className="inline-block bg-[#00796B] text-white uppercase tracking-[3px] text-xs px-5 py-2 rounded-md">
          About us
        </span>
        <h3
          className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl  text-black leading-tight"
          style={{ fontFamily: '"Montserrat", "sans-serif"' }}
        >
          Your Trusted Real Estate and Vacation Rental Experts in <br />{" "}
          Southwest Florida
        </h3>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center mt-10">
          {/* IMAGE */}
          <div className="overflow-hidden rounded-2xl group">
            <img
              src="https://le-de.cdn-website.com/c5f5db73735f44758e7635e0dd9aae8f/dms3rep/multi/opt/Neitzke+Pool-2880w.jpg"
              className="w-full h-[250px] sm:h-[350px] md:h-[450px] object-cover transition duration-700 group-hover:scale-110"
              alt="Why Choose Us"
            />
          </div>
          {/* CONTENT */}
          <div className="mb-">
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-3">
              My Florida Real Estate and Vacation Rentals is dedicated to
              helping buyers, sellers, and vacationers find their perfect place
              in Southwest Florida. Whether you're looking for a dream home,
              selling a property, or planning a vacation, our team provides
              expert guidance and exceptional service.
            </p>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-3">
              For homebuyers, we take the time to understand your lifestyle,
              goals, and budget, tailoring the search to find the ideal
              property—whether near world-class golf courses, stunning beaches,
              or prime fishing spots. Sellers benefit from our proactive
              approach, including personalized marketing strategies that ensure
              the best price in the shortest time.
            </p>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-3">
              Our vacation rental experts make getaways stress-free for both
              travelers and homeowners. We offer beautiful, personally verified
              rentals in prime Southwest Florida locations, from beachfront
              condos to spacious homes with private pools. Every property is
              professionally cleaned and backed by our quality guarantee,
              ensuring a seamless experience.
            </p>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Whether you're buying, selling, or booking a vacation, My Florida
              Real Estate and Vacation Rentals makes the process smooth,
              stress-free, and tailored to your needs.
            </p>
          </div>
        </div>
      </section>
      <ContactSection />
    </>
  );
}
