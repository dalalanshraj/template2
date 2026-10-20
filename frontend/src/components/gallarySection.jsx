import { useEffect, useState } from "react";
import api from "../api/axios";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

// ========================================
// FALLBACK IMAGES
// ========================================

// Recommended:
// Put these images inside:
//
// public/gallery/
//
// Example:
// public/gallery/1.jpg
// public/gallery/2.jpg
// ...
// public/gallery/9.jpg

const fallbackImages = [
 "https://anchorsaway30a.com/wp-content/uploads/2024/08/Gilbert_House7_websize.jpg",
  "https://anchorsaway30a.com/wp-content/uploads/2024/08/Gilbert_House7_websize.jpg",
  "https://anchorsaway30a.com/wp-content/uploads/2024/08/Gilbert_House12_websize.jpg",
  "https://anchorsaway30a.com/wp-content/uploads/2024/08/Gilbert_House17_websize.jpg",
  "https://anchorsaway30a.com/wp-content/uploads/2024/08/Gilbert_House53_websize.jpg",
  "https://anchorsaway30a.com/wp-content/uploads/2024/08/Gilbert_House4_websize.jpg",
  "https://anchorsaway30a.com/wp-content/uploads/2024/08/Gilbert_House38_websize.jpg",
  "https://anchorsaway30a.com/wp-content/uploads/2024/08/Gilbert_House56_websize.jpg",
  "https://anchorsaway30a.com/wp-content/uploads/2024/08/Gilbert_House24_websize.jpg",
];

export default function GallerySection() {
  // ========================================
  // STATES
  // ========================================

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(9);

  // ========================================
  // IMAGE URL
  // ========================================

  const getImageUrl = (path) => {
    if (!path) return "";

    const base = import.meta.env.VITE_API_URL || "";

    // Already full URL
    if (path.startsWith("http")) {
      return path;
    }

    return (
      base.replace(/\/$/, "") +
      "/" +
      path.replace(/^\//, "")
    );
  };

  // ========================================
  // FETCH GALLERY
  // ========================================

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await api.get(
          "/gallery/published"
        );

        const backendImages = (data || [])
          .map((item) => getImageUrl(item.image))
          .filter(Boolean);

        // Backend images available
        if (backendImages.length > 0) {
          setImages(backendImages);
        }

        // No backend images
        else {
          setImages(fallbackImages);
        }
      } catch (error) {
        console.log(error);

        // API failed
        setImages(fallbackImages);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <section className="py-24 flex justify-center items-center">
        <div className="text-lg font-medium text-gray-500">
          Loading Gallery...
        </div>
      </section>
    );
  }

  // ========================================
  // RETURN
  // ========================================

  return (
    <section className="bg-white py-16 lg:py-24">

      <div className="max-w-7xl mx-auto px-5">

        {/* Heading */}

        <div className="text-center mb-14">

          <h2
            className="text-4xl md:text-5xl lg:text-6xl text-[#6AA8E8]"
            style={{
              fontFamily: "'Great Vibes', cursive",
            }}
          >
            Photo Gallery
          </h2>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Explore every corner of our beautiful vacation home.
          </p>

        </div>

        {/* Gallery starts here... */}
                <Gallery
          options={{
            loop: true,
            bgOpacity: 0.95,
            wheelToZoom: true,
            arrowKeys: true,
            escKey: true,
            pinchToClose: true,
            showHideAnimationType: "zoom",
          }}
        >
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-5
            "
          >
            {images.slice(0, visibleCount).map((img, index) => (
              <Item
                key={index}
                original={img}
                thumbnail={img}
                width={1600}
                height={1000}
              >
                {({ ref, open }) => (
                  <div
                    ref={ref}
                    onClick={open}
                    className="
                      relative
                      overflow-hidden
                      rounded-lg
                      cursor-pointer
                      group
                      bg-gray-100
                      shadow-md
                      hover:shadow-2xl
                      transition-all
                      duration-500
                    "
                  >
                    {/* Image */}

                    <img
                      src={img}
                      alt={`Gallery ${index + 1}`}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = fallbackImages[0];
                      }}
                      className="
                        w-full

                        h-[260px]
                        sm:h-[280px]
                        lg:h-[320px]
                        xl:h-[340px]

                        object-cover

                        transition-all
                        duration-700

                        group-hover:scale-110
                      "
                    />

                    {/* Overlay */}

                    <div
                      className="
                        absolute
                        inset-0

                        bg-black/0

                        group-hover:bg-black/20

                        transition-all
                        duration-500
                      "
                    />

                    {/* Zoom Icon */}

                    <div
                      className="
                        absolute
                        inset-0

                        flex
                        items-center
                        justify-center

                        opacity-0
                        group-hover:opacity-100

                        transition-all
                        duration-500
                      "
                    >
                      <div
                        className="
                          w-14
                          h-14

                          rounded-full

                          bg-white/90

                          flex
                          items-center
                          justify-center

                          text-2xl
                          text-gray-800

                          shadow-xl
                        "
                      >
                        +
                      </div>
                    </div>
                  </div>
                )}
              </Item>
            ))}
          </div>
        </Gallery>
{/* ===========================
      SEE MORE / SEE LESS
=========================== */}

{images.length > 9 && (
  <div className="flex justify-center mt-14">
    <button
      onClick={() => {
        if (visibleCount >= images.length) {
          setVisibleCount(9);

          // Smooth scroll back to gallery
          window.scrollTo({
            top: document.getElementById("gallery-section").offsetTop - 100,
            behavior: "smooth",
          });
        } else {
          setVisibleCount((prev) =>
            Math.min(prev + 9, images.length)
          );
        }
      }}
      className="
        inline-flex
        items-center
        justify-center
        gap-2

        px-8
        py-3

        rounded-full

        border-2
        border-[#2f9bad]

        bg-white
        text-[#2f9bad]

        font-semibold
        tracking-wide

        transition-all
        duration-300

        hover:bg-[#2f9bad]
        hover:text-white
        hover:shadow-xl
        hover:scale-105
      "
    >
      {visibleCount >= images.length ? (
        <>
          ↑ See Less
        </>
      ) : (
        <>
          ↓ See More
        </>
      )}
    </button>
  </div>
)}
      </div>
    </section>
  );
}