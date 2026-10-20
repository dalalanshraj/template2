import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { FaUserCircle } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

  const fallbackReviews = [
  {
    _id: "1",
    user: "John Smith",
    rating: 5,
    review:
      "Absolutely loved our stay! The house was spotless, beautifully decorated, and just minutes from the beach. We will definitely be coming back next year.",
    stayDate: "2026-05-12",
    property: {
      title: "Anchors Away 30A",
    },
  },
  {
    _id: "2",
    user: "Emily Johnson",
    rating: 5,
    review:
      "Perfect vacation home for our family. Everything we needed was available, and the location was amazing. Highly recommended!",
    stayDate: "2026-04-20",
    property: {
      title: "Anchors Away 30A",
    },
  },
  {
    _id: "3",
    user: "Michael Brown",
    rating: 5,
    review:
      "The pool, beach access, and the beautiful interiors made our vacation unforgettable. Excellent communication from the host.",
    stayDate: "2026-03-15",
    property: {
      title: "Anchors Away 30A",
    },
  },
];
export default function TestimonialCarousel() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

 const fetchReviews = async () => {
  try {
    const res = await api.get("/listings/reviews");

    const backendReviews = res.data?.reviews || [];

    if (backendReviews.length > 0) {
      setReviews(backendReviews);
    } else {
      // Backend empty
      setReviews(fallbackReviews);
    }
  } catch (err) {
    console.log(err);

    // API Error
    setReviews(fallbackReviews);
  }
};

 

  return (
    <div className="w-full flex flex-col items-center py-12 bg-white">
       <span className="inline-block bg-[#00796B]  text-white uppercase tracking-[3px] text-xs px-5 py-2 rounded-md mb-6">
         TESTIMONIALS
          </span>
        <h2
  className="
  text-center
  text-[#1B1B1B]

  text-3xl
  sm:text-4xl
  md:text-5xl
  lg:text-6xl

  leading-tight
  font-light

  max-w-5xl
  mx-auto
  px-5
"
style={{
  fontFamily: '"Montserrat", sans-serif',
}}
>
  What Our Customers Say
</h2>
<div className="w-full overflow-hidden px-4">

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={reviews.length > 3}
        centeredSlides={true}
        grabCursor={true}
        slidesPerView={1}
        spaceBetween={30}
        breakpoints={{
          768: {
            slidesPerView: 3,
          },
        }}
          className="w-full max-w-7xl mt-14 overflow-hidden"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="testimonial-card bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center max-w-sm mx-auto transition-all duration-500">
             <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
  <FaUserCircle
    size={60}
    className="text-gray-500"
  />
</div>

              <h3 className=" text-lg font-light
                    text-[#1B1B1B]
                  "
                  style={{
                    fontFamily: "'Quicksand' , sans-serif",
                  }}>{review.user}</h3>

              <p className="text-xs text-gray-500 mb-2">
                {review.property?.title}
              </p>

              <div className="flex justify-center my-2">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              <p className="text-gray-500 text-sm md:text-base max-h-40 overflow-y-auto leading-[1.5]

                    font-[700]
                  "
                  style={{
                    fontFamily: "Quicksand, sans-serif",
                  }}>
                {review.review}
              </p>

             {review.stayDate && (
  <p className="text-xs text-black mt-3">
   Stay Date: {new Date(review.stayDate).toLocaleDateString("en-CA")}
  </p>
)}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
</div>
      <style>{`
        .swiper-slide {
          opacity: 0.4;
          transform: scale(0.9);
          transition: all .4s ease-in-out;
        }

        .swiper-slide-active {
          opacity: 1 !important;
          transform: scale(1.05) !important;
        }
      `}</style>
    </div>
  );
}
