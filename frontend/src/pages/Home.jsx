import { useEffect, useState } from "react";

import { CheckCircle2 } from "lucide-react";
import api from "../api/axios.js";
import { FaFacebookF, FaInstagram, FaMapMarkerAlt } from "react-icons/fa";
import { TbHomeSearch } from "react-icons/tb";
import { FaHandHoldingUsd } from "react-icons/fa";
import { Calendar, Home, MapPin } from "lucide-react";
// import heroVideo from "../assets/hero.mp4";
// 👆 apni hero image ka correct path lagana
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AboutSection from "../components/homeSection/AboutSection.jsx";
import GallerySection from "../components/gallarySection";
import { Link, useNavigate } from "react-router-dom";
import ThingsToDoSection from "../components/homeSection/ActivitiesSection.jsx";
import ReviewsSection from "../components/ReviewsSection.jsx";
import TestimonialCarousel from "../components/ReviewsSection.jsx";
import PropertyCard from "../components/PropertyCard.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import ContactSection from "../components/contactSection.jsx";
import Properties from "./Properties.jsx";
import HomeProperties from "../components/HomeProperties.jsx";

export default function Hero({ listingId }) {
  const [featured, setFeatured] = useState(null);
  const [listings, setListings] = useState([]);
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    guests: "1",
  });
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [bedrooms, setBedrooms] = useState("");
  const [location, setLocation] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isMobiles, setIsMobiles] = useState(window.innerWidth < 768);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [stickySearch, setStickySearch] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setStickySearch(window.scrollY > 250);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => setShowModal(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!formData.checkIn || !formData.checkOut) {
      setError("Please select both dates");
      setShowModal(true);
      return;
    }

    const params = new URLSearchParams({
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
    }).toString();

    navigate(`/results?${params}`);
  };

  const parseLocalDate = (dateString) => {
    if (!dateString) return null;

    const [year, month, day] = dateString.split("-");

    return new Date(year, month - 1, day);
  };
  // ===========================
  // FETCH FEATURED LISTING
  // ===========================

  useEffect(() => {
    api
      .get("/listings/published")
      .then((res) => {
        const data = res.data || [];

        setFeatured(data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    api
      .get("/listings/published")
      .then((res) => {
        setListings(res.data.listings || res.data);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      {/* =====================================
                    HERO SECTION
      ====================================== */}

      <section className="relative -mt-32 w-full min-h-[828px] h-screen overflow-hidden flex items-center justify-center">
        {/* ==========================
      BACKGROUND VIDEO
  ========================== */}

        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src="/public/hero.mp4" type="video/mp4" />
        </video>

        {/* ==========================
      OVERLAY
  ========================== */}

        <div className="absolute inset-0 bg-black/35 z-[1]" />

        {/* ==========================
      CONTENT
  ========================== */}

        <div className="relative z-10 w-full max-w-8xl mx-auto px-5 sm:px-8 lg:px-12 text-center text-white flex flex-col items-center mt-30">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[90px] text-white text-center  leading-25 mb-10"
            style={{ fontFamily: '"Montserrat", "sans-serif"' }}
          >
            Explore SouthWest Florida{" "}
            <span
              className=""
              style={{ fontFamily: '"Montserrat", "sans-serif"' }}
            >
              Real Estate & Rentals
            </span>
          </h1>

          {/* <p className="font-montserrat text-white max-w-4xl mx-auto text-lg md:text-[24px]  mt-5">
            Relax in a spacious beachfront retreat featuring wraparound
            balconies, spectacular ocean views, and premium resort amenities.
          </p> */}

          <div
            className={` transition-all duration-500 ease-in-out w-full max-w-6xl ${stickySearch
                ? "fixed top-18 hidden left-1/2 -translate-x-1/2 z-[9999] bg-white shadow-2xl px-5 py-4 rounded-2xl"
                : "relative mt-6 bg-white/20 backdrop-blur-xl rounded-2xl p-4 md:p-5"
              } grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 `}
          >
            {/* Arrival */}
            <div className="flex items-center border rounded-xl px-4 py-3 hover:border-[#3c8a8c] transition bg-white">
              <Calendar className="w-5 h-5 text-[#3c8a8c] mr-3" />

              <DatePicker
                selected={checkIn}
                onChange={(date) => {
                  setCheckIn(date);

                  setFormData((prev) => ({
                    ...prev,
                    checkIn: date,
                  }));
                }}
                minDate={new Date()}
                placeholderText="Arrival"
                dateFormat="MMM dd, yyyy"
                monthsShown={isMobile ? 1 : 2}
                showPopperArrow={false}
                onKeyDown={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                className="w-full outline-none bg-transparent text-black"
              />
            </div>

            {/* Departure */}
            <div className="flex items-center border rounded-xl px-4 py-3 hover:border-[#3c8a8c] transition bg-white">
              <Calendar className="w-5 h-5 text-[#3c8a8c] mr-3" />

              <DatePicker
                selected={checkOut}
                onChange={(date) => {
                  setCheckOut(date);

                  setFormData((prev) => ({
                    ...prev,
                    checkOut: date,
                  }));
                }}
                disabled={!checkIn}
                placeholderText="Departure"
                dateFormat="MMM dd, yyyy"
                monthsShown={isMobile ? 1 : 2}
                showPopperArrow={false}
                onKeyDown={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                className="w-full outline-none bg-transparent text-black"
              />
            </div>

            {/* Bedrooms */}
            <div className="flex items-center border rounded-xl px-4 py-3 bg-white">
              <Home className="w-5 h-5 text-[#3c8a8c] mr-3" />

              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full bg-transparent outline-none text-black"
              >
                <option value="">Bedrooms</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4 Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
              </select>
            </div>

            {/* Search */}
            <button
              onClick={handleSearch}
              className=" inline-flex items-center justify-center gap-3 bg-[#4CAf50] text-white font-semibold text-lg
            px-10 py-4 rounded-xl shadow-lg transition-all duration-300 hover:bg-[#08376B] hover:shadow-2xl 
            hover:scale-99 group
          "
            >
              SEARCH RENTALS
            </button>
          </div>
        </div>
      </section>
      <HomeProperties />

      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          {/* Top Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left */}
            <div>
              <span className="inline-block bg-[#00796B] text-white text-[9px] tracking-[2px] uppercase px-4 py-2 rounded">
                YOUR PERFECT HOME AWAITS
              </span>

              <h2
                className="
          mt-6
          text-4xl
          md:text-5xl
          xl:text-6xl
          font-light
          leading-tight
          text-[#222]
        "
                style={{ fontFamily: '"Montserrat", "sans-serif"' }}
              >
                Southwest Florida Real Estate and Vacation Rentals
              </h2>
            </div>

            {/* Right */}

            <div>
              <p
                className="
            text-gray-600
            text-base
            md:text-lg
            leading-8
          "
                style={{
                  fontFamily: "Quicksand, sans-serif",
                }}
              >
                My Florida Real Estate and Vacation Rentals specializes in
                buying, selling, and renting luxury properties across Southwest
                Florida. Whether you're searching for a beachfront retreat, a
                golf community home, or a high-return investment property, our
                expert team is here to guide you. From Naples to Fort Myers
                Beach, we make finding your dream home or vacation rental
                seamless and stress-free.
              </p>

              <button className=" group/button bg-[#4CAf50] mt-6 text-white rounded-full px-6 py-3 font-semibold flex items-center gap-2 transition-all duration-300  hover:shadow-2xl 
            hover:scale-99 group">
                Know More
                <span
                  className=" transition-transform duration-300 group-hover/button:translate-x-1 "
                >
                  →
                </span>
              </button>
            </div>
          </div>

          {/* Bottom Section */}

          <div className="grid lg:grid-cols-3 gap-8 mt-20">
            {/* Image */}

            <img
              src="https://le-de.cdn-website.com/c5f5db73735f44758e7635e0dd9aae8f/dms3rep/multi/opt/shutterstock_2334387819_01-1920w.jpg"
              alt=""
              className=" h-[300px] md:h-[400px] w-full object-cover rounded-3xl "
            />

            {/* Image */}

            <img
              src="https://le-de.cdn-website.com/c5f5db73735f44758e7635e0dd9aae8f/dms3rep/multi/opt/shutterstock_2341437271_01-1920w.jpg"
              alt=""
              className=" h-[300px] md:h-[400px] w-full object-cover rounded-3xl "
            />

            {/* Features */}

            <div className="flex flex-col justify-center">
              <div className="pb-8 border-b">
                <h3
                  className="text-2xl font-semibold text-[#222]"
                  style={{ fontFamily: '"Montserrat", "sans-serif"' }}
                >
                  BEACH LIFESTYLE
                </h3>

                <p className="text-gray-600 mt-3 leading-7">
                  Steps away from the sugar-white sand and emerald waters of
                  Scenic Highway 30A.
                </p>
              </div>

              <div className="py-8 border-b">
                <h3
                  className="text-2xl font-semibold text-[#222]"
                  style={{ fontFamily: '"Montserrat", "sans-serif"' }}
                >
                  FAMILY FRIENDLY
                </h3>

                <p className="text-gray-600 mt-3 leading-7">
                  Comfortably sleeps up to 12 guests with spacious indoor and
                  outdoor living areas.
                </p>
              </div>

              <div className="pt-8">
                <h3
                  className="text-2xl font-semibold text-[#222]"
                  style={{ fontFamily: '"Montserrat", "sans-serif"' }}
                >
                  PREMIUM AMENITIES
                </h3>

                <p className="text-gray-600 mt-3  ">
                  Resort pool, beach shuttle, bicycles, modern kitchen and
                  luxury furnishings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="relative z-0 w-full min-h-[600px] sm:min-h-[560px] md:min-h-[620px] lg:min-h-[670px] flex items-center justify-center overflow-hidden ">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className=" absolute inset-0 z-0 w-full h-full object-cover object-center pointer-events-none "
        >
          <source
            src="https://videos.pexels.com/video-files/34628886/14676299_2560_1440_24fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className=" absolute inset-0 z-10 bg-black/45 " />
        <div className="  bg-white/80 backdrop-blur-md rounded-md relative z-20 w-full max-w-[1300px] h-full mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 md:py-24 lg:py-8 text-center text-white flex flex-col items-center justify-center ">
          <span className="inline-block bg-[#00796B] text-white uppercase tracking-[3px] text-xs px-5 py-2 rounded-md mb-6">
            WHY CHOOSE US
          </span>
          <h2
            className=" text-black max-w-[950px] text-[30px] sm:text-[38px] md:text-[46px] md:mx-40 mx-0 lg:text-5xl leading-[1.15] font-light "
            style={{ fontFamily: '"Montserrat", "sans-serif"' }}
          >
            Why Choose My Florida Real Estate & Vacation Rentals?
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-10">
            {/* Feature 1 */}

            <div className="text-center group">
              <div className=" mx-auto w-14 h-14 rounded-full border-1 border-[#4CAf50] bg-white flex items-center justify-center transition-all duration-500    ">
                <TbHomeSearch
                  size={28}
                  className="text-[#4CAf50]   duration-500"
                />
              </div>

              <h3 className=" mt-3 text-[16px] font-semibold uppercase text-[#4CAf50] tracking-wide ">
                Local Expertise
              </h3>

              <p className=" mt-2 text-gray-600   max-w-[330px] mx-auto ">
                With deep knowledge of the Southwest Florida market, we provide
                tailored guidance for buyers, sellers, investors, and vacation
                renters.
              </p>
            </div>

            {/* Feature 2 */}

            <div className="text-center group">
              <div className=" mx-auto w-14 h-14 rounded-full border-1 border-[#4CAf50] bg-white flex items-center justify-center transition-all duration-500   ">
                <Home size={28} className="text-[#4CAf50]   duration-500" />
              </div>

              <h3 className=" mt-3 text-[16px] font-semibold uppercase text-[#4CAf50] tracking-wide ">
                Prime Locations
              </h3>

              <p className=" mt-2 text-gray-600   max-w-[330px] mx-auto ">
                From beachfront condos to golf communities and luxury homes, we
                offer exceptional properties across Naples, Bonita Springs, Fort
                Myers, and nearby coastal destinations.
              </p>
            </div>

            {/* Feature 3 */}

            <div className="text-center group">
              <div className=" mx-auto w-14 h-14 rounded-full border-1 border-[#4CAf50] bg-white flex items-center justify-center transition-all duration-500    ">
                <FaHandHoldingUsd
                  size={28}
                  className="text-[#4CAf50]   duration-500"
                />
              </div>

              <h3 className=" mt-3 text-[16px] font-semibold uppercase text-[#4CAf50] tracking-wide ">
                Property Management
              </h3>

              <p className=" mt-2 text-gray-600  max-w-[330px] mx-auto ">
                Whether you're renting your home or booking a vacation stay, our
                complete property management services ensure a seamless
                experience from start to finish.
              </p>
            </div>
          </div>

          {/* <button className=" group/button bg-[#4CAf50] mt-6 text-white rounded-full px-6 py-3 font-semibold flex items-center gap-2 transition-all duration-300  hover:shadow-2xl 
            hover:scale-99 group">
              Know More
              <span
                className=" transition-transform duration-300 group-hover/button:translate-x-1 "
              >
                →
              </span>
            </button> */}
        </div>
      </section>

      {/* <ThingsToDoSection /> */}

      {/* <GallerySection /> */}

      <TestimonialCarousel />
      <ContactSection />
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center 
        bg-black/30 backdrop-blur-sm z-50"
        >
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-sm text-center">
            <h2 className="text-lg font-semibold text-red-600 mb-2">Notice</h2>

            <p className="text-gray-700 mb-4">{error}</p>

            <button
              onClick={() => setShowModal(false)}
              className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
