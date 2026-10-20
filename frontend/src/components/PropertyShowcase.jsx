import { useEffect, useState } from "react";
import api from "../api/axios";
import { Waves, BedDouble, Umbrella, ArrowRight } from "lucide-react";

// import beachImage from "../assets/property-management/beach.jpg"; // Change image

export default function PropertyShowcase({ galleryImages }) {
  const getImageUrl = (path) => {
    if (!path) return fallbackImage;

    if (path.startsWith("http")) return path;

    return `${import.meta.env.VITE_API_URL}/${path.replace(/^\//, "")}`;
  };

  const propsImage =
    galleryImages?.length > 0 && galleryImages[0]?.image
      ? getImageUrl(galleryImages[0].image)
      : "https://www.coastaldreamrentals.com/img/sean-oulashin-KMn4VEeEPR8-unsplash.jpg";

  console.log("Gallery Images:", galleryImages);
  console.log("Props Image:", propsImage);

  return (
    <section className="bg-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT IMAGE */}

          <div className="relative">
            <div className="overflow-hidden rounded-[32px] shadow-2xl">
              <img
                src={propsImage}
                alt="Surfside Resort"
                className="w-full h-[350px] sm:h-[500px] lg:h-[620px] object-cover transition duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}

         {/* RIGHT CONTENT */}

<div>
  <h2
    className="mt-6 font-yellowtail text-[#2C5A7B] leading-tight text-5xl sm:text-6xl"
   style={{ fontFamily: '"Montserrat", "sans-serif"' }}
  >
    Professional Property
    <br />
    Management You Can Trust
  </h2>

  <p className="mt-8 text-lg leading-9 text-gray-600  ">
    Owning a vacation rental should be rewarding—not overwhelming. Our
    experienced property management team takes care of the day-to-day
    responsibilities so you can enjoy the benefits of ownership with complete
    confidence. From guest communication and reservation management to
    housekeeping coordination, maintenance oversight, and routine property
    inspections, we ensure your home is professionally managed and always
    ready to welcome guests.
  </p>

  {/* Features */}

  <div className="mt-10 grid gap-6">
    {/* Feature 1 */}

    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-white border border-blue-500 flex items-center justify-center flex-shrink-0">
        <BedDouble className="text-blue-600" size={20} />
      </div>

      <div>
        <h4 className="font-semibold text-lg text-gray-900">
          Complete Guest Management
        </h4>

        <p className="text-gray-600 mt-1 leading-7">
          We handle guest inquiries, reservations, check-ins, check-outs, and
          communication to provide every visitor with a seamless and memorable
          experience.
        </p>
      </div>
    </div>

    {/* Feature 2 */}

    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-white border border-blue-500 flex items-center justify-center flex-shrink-0">
        <Waves className="text-blue-600" size={20} />
      </div>

      <div>
        <h4 className="font-semibold text-lg text-gray-900">
          Property Care & Maintenance
        </h4>

        <p className="text-gray-600 mt-1 leading-7">
          From scheduled inspections and preventative maintenance to
          housekeeping coordination and emergency response, we keep your
          property in outstanding condition year-round.
        </p>
      </div>
    </div>

    {/* Feature 3 */}

    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-white border border-blue-500 flex items-center justify-center flex-shrink-0">
        <Umbrella className="text-blue-600" size={20} />
      </div>

      <div>
        <h4 className="font-semibold text-lg text-gray-900">
          Local Expertise & Personalized Service
        </h4>

        <p className="text-gray-600 mt-1 leading-7">
          As a locally focused management team, we provide responsive support,
          trusted vendor coordination, and personalized attention that protects
          your investment while enhancing every guest's stay.
        </p>
      </div>
    </div>
  </div>

  {/* CTA */}

  {/* <div className="mt-12 flex flex-wrap gap-5">
    <a
      href="/#contact"
      className="inline-flex items-center rounded-full bg-blue-600 px-8 py-4 text-white font-semibold transition hover:bg-blue-700"
    >
      See All Properties

      <ArrowRight className="ml-3" size={20} />
    </a>

    <a
      href="/#contact"
      className="inline-flex items-center rounded-full border border-gray-300 px-8 py-4 font-semibold text-gray-700 hover:bg-gray-100 transition"
    >
      Request Information
    </a>
  </div> */}
</div>
        </div>
      </div>
    </section>
  );
}
