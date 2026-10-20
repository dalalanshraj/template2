import React, { useMemo, useState } from "react";
import { useEffect } from "react";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { Swiper, SwiperSlide } from "swiper/react";

import {
  Navigation,
  Pagination,
  Thumbs,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import {
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5";

// =====================================
// FALLBACK IMAGES
// =====================================

const fallbackImages = [
  "/property/property1.jpg",
  "/property/property2.jpg",
  "/property/property3.jpg",
  "/property/property4.jpg",
  "/property/property5.jpg",
];

// =====================================
// COMPONENT
// =====================================

const PropertyGallery = ({ images = [] }) => {
  const [open, setOpen] = useState(false);

  const [thumbsSwiper, setThumbsSwiper] =
    useState(null);

  const [mainSwiper, setMainSwiper] =
    useState(null);

  const [currentIndex, setCurrentIndex] =
    useState(0);
    const [stickySearch, setStickySearch] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          setStickySearch(window.scrollY > 250);
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);

  // =====================================
  // IMAGE URL
  // =====================================

  const getImageUrl = (photo) => {
    const base =
      import.meta.env.VITE_API_URL || "";

    // Object format

    if (photo?.url) {
      if (photo.url.startsWith("http")) {
        return photo.url;
      }

      return (
        base.replace(/\/$/, "") +
        "/" +
        photo.url.replace(/^\//, "")
      );
    }

    // String format

    if (typeof photo === "string") {
      if (photo.startsWith("http")) {
        return photo;
      }

      if (photo.startsWith("/")) {
        return photo;
      }

      return (
        base.replace(/\/$/, "") +
        "/" +
        photo.replace(/^\//, "")
      );
    }

    return fallbackImages[0];
  };

  // =====================================
  // GALLERY IMAGES
  // =====================================

  const galleryImages = useMemo(() => {
    if (images?.length > 0) {
      return images;
    }

    return fallbackImages;
  }, [images]);

  // =====================================
  // LIGHTBOX
  // =====================================

  const slides = galleryImages.map((img) => ({
    src: getImageUrl(img),
  }));

  // =====================================
  // JSX
  // =====================================

  return (
    <>
      <section className="max-w-[1700px] mx-auto px-5 pt-8">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

          {/* ===============================
                LEFT MAIN SLIDER
          =============================== */}

         <div className="grid grid-cols-1 lg:grid-cols-[1fr_50px] gap-6">
            <Swiper
              modules={[
                Navigation,
                Pagination,
                Thumbs,
              ]}
              navigation={{
                nextEl: ".gallery-next",
                prevEl: ".gallery-prev",
              }}
              pagination={{
                clickable: true,
              }}
              thumbs={{
                swiper:
                  thumbsSwiper &&
                  !thumbsSwiper.destroyed
                    ? thumbsSwiper
                    : null,
              }}
              onSwiper={setMainSwiper}
              onSlideChange={(swiper) =>
                setCurrentIndex(swiper.activeIndex)
              }
              className="rounded-[30px]"
            >
              {galleryImages.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={getImageUrl(img)}
                    alt={`Property ${index + 1}`}
                    onClick={() => setOpen(true)}
                    className="
                      w-full
                      h-[300px]
                      sm:h-[450px]
                      md:h-[550px]
                      lg:h-[720px]
                      object-cover
                      cursor-pointer
                    "
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* LEFT ARROW */}

            <button
              className="
              gallery-prev

              absolute
              left-5
              top-1/2
              -translate-y-1/2

              z-20

              w-14
              h-14

              rounded-full

              bg-white/90

              shadow-xl

              flex
              items-center
              justify-center

              hover:bg-white

              transition
            "
            >
              <IoChevronBack size={28} />
            </button>

            {/* RIGHT ARROW */}

            <button
              className="
              gallery-next

              absolute
              right-5
              top-1/2
              -translate-y-1/2

              z-20

              w-14
              h-14

              rounded-full

              bg-white/90

              shadow-xl

              flex
              items-center
              justify-center

              hover:bg-white

              transition
            "
            >
              <IoChevronForward size={28} />
            </button>
                      

     {/* =====================================
      RIGHT SIDE THUMBNAILS (DESKTOP)
===================================== */}

<div className="hidden lg:block w-[320px]">
  <Swiper
    direction="vertical"
    slidesPerView={3}
    spaceBetween={18}
    mousewheel={true}
    watchSlidesProgress
    className="h-[720px]"
  >
    {galleryImages.map((img, index) => (
      <SwiperSlide key={index}>
        <div
          onClick={() => {
            if (mainSwiper) {
              mainSwiper.slideTo(index);
            }
          }}
          className={`
            relative
            h-[220px]
            rounded-[24px]
            overflow-hidden
            cursor-pointer
            transition-all
            duration-300

            ${
              currentIndex === index
                ? "ring-4 ring-[#00989c]"
                : "hover:opacity-90"
            }
          `}
        >
          <img
            src={getImageUrl(img)}
            alt={`Thumbnail ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>

        </div>

        {/* =====================================
              MOBILE THUMBNAILS
        ===================================== */}

        <div className="lg:hidden mt-5">

          <Swiper
            slidesPerView={4.2}
            spaceBetween={12}
          >

            {galleryImages.map((img, index) => (

              <SwiperSlide key={index}>

                <div
                  onClick={() => {
                    if (mainSwiper) {
                      mainSwiper.slideTo(index);
                    }
                  }}
                  className={`
                    relative
                    h-[90px]
                    rounded-2xl
                    overflow-hidden
                    cursor-pointer

                    ${
                      currentIndex === index
                        ? "ring-2 ring-[#00989c]"
                        : ""
                    }
                  `}
                >

                  <img
                    src={getImageUrl(img)}
                    alt=""
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />

                </div>

              </SwiperSlide>

            ))}

          </Swiper>

        </div>
             </div>

      </section>

      {/* =====================================
            PROPERTY NAVIGATION
      ===================================== */}

      <div  className={`
    transition-all
    duration-500
    ease-in-out

    w-full
    max-w-6xl

    ${
      stickySearch
        ? "fixed top-14 left-1/2 -translate-x-1/2 z-[9999] bg-white shadow-2xl px-5 py-2 rounded-2xl"
        : "relative mt-6 bg-white backdrop-blur-xl rounded-2xl p-4 md:p-5"
    }

    grid
    grid-cols-1
    md:grid-cols-4
    gap-6
    md:gap-8
  `}>

        <div className="max-w-7xl mx-auto overflow-x-auto">

          <div className="flex whitespace-nowrap min-w-max">

            {[
              {
                title: "Description",
                id: "description",
              },
              {
                title: "Pictures",
                id: "pictures",
              },
              {
                title: "Amenities",
                id: "amenities",
              },
              {
                title: "Location",
                id: "location",
              },
              {
                title: "Video",
                id: "videos",
              },
              {
                title: "Availability",
                id: "availability",
              },
              {
                title: "Reviews",
                id: "reviews",
              },
            ].map((item, index) => (

              <a
                key={item.id}
                href={`#${item.id}`}
                className={`
                  px-7
                  py-5

                  text-sm
                  lg:text-lg

                  transition-all
                  duration-300

                  ${
                    index === 0
                      ? "text-black font-semibold border-b-2 border-black"
                      : "text-gray-500 hover:text-black"
                  }
                `}
                style={{
                  fontFamily: "'Quicksand', sans-serif",
                }}
              >
                {item.title}
              </a>

            ))}

          </div>

        </div>

      </div>
 
            {/* =====================================
              LIGHTBOX
      ===================================== */}

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
      />

      {/* =====================================
              CUSTOM SWIPER CSS
      ===================================== */}

      <style>{`

      /* Main Slider */

      .swiper-pagination{
        bottom:20px !important;
      }

      .swiper-pagination-bullet{
        width:10px;
        height:10px;
        background:#ffffff;
        opacity:.6;
      }

      .swiper-pagination-bullet-active{
        width:28px;
        border-radius:20px;
        background:#fff;
        opacity:1;
      }

      /* Navigation */

      .gallery-prev,
      .gallery-next{

        transition:.35s;
      }

      .gallery-prev:hover,
      .gallery-next:hover{

        transform:translateY(-50%) scale(1.08);

      }

      .gallery-prev svg,
      .gallery-next svg{

        color:#111827;

      }

      /* Thumb Slider */

      .swiper-slide-thumb-active{

        opacity:1 !important;

      }

      .swiper-slide{

        transition:.35s ease;

      }

      /* Scrollbar hide */

      .property-thumbs::-webkit-scrollbar{

        display:none;

      }

      @media(max-width:1024px){

        .gallery-prev,
        .gallery-next{

          width:48px;
          height:48px;

        }

      }

      @media(max-width:640px){

        .gallery-prev,
        .gallery-next{

          width:42px;
          height:42px;

        }

        .swiper-pagination{

          bottom:12px !important;

        }

      }

      `}</style>
       

    </>
  );

};

export default PropertyGallery;