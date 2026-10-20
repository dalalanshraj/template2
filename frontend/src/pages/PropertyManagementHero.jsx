import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  CheckCircle2,
  Home,
  Users,
  TrendingUp,
  Wrench,
  ShieldCheck,
} from "lucide-react";
// import herobg2 from "../assets/herobg2.jpg";

// import herobg from "../assets/herobg.jpg";
import PropertyShowcase from "../components/PropertyShowcase";

export default function PropertyManagementIntro() {
  const [images, setImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (path) => {
    if (!path) return "/placeholder.png";

    if (path.startsWith("http")) return path;

    return `${import.meta.env.VITE_API_URL}/${path.replace(/^\//, "")}`;
  };
  useEffect(() => {
    api
      .get("/gallery/published")
      .then((res) => {
        setGalleryImages(res.data || []);
        console.log("Parent Gallery:", galleryImages);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  const image = galleryImages?.[12]?.image
    ? getImageUrl(galleryImages[12].image)
    : "https://www.coastaldreamrentals.com/img/home/d74d56b0-b8ac-4d34-84c0-ede6d2f0569c.jpeg";

  // const heroImage = galleryImages[0]?.image
  //   ? getImageUrl(galleryImages[0].image)
  //   : herobg;

  const Guestsimg = galleryImages?.[15]?.image
    ? getImageUrl(galleryImages[15].image)
    : "https://destinbeachcondorentals.com/gallery-uploads/1784561207521-97328694.webp";

  return (
    <>
      {/* 🔥 HERO (FIXED IMAGE) */}
      {/* <section
             className="relative h-[60vh] md:h-[70vh]  bg-cover bg-center flex items-center justify-center text-white"
             style={{
                 backgroundImage: `url(${herobg2})`,
               }}
           >

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative text-center px-4 sm:px-6 mt-34">
          <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mt-15">
            Property Management
          </h1>

         <p className="text-gray-200 text-sm sm:text-base max-w-3xl mx-auto">
    Meet Shawn and Eileen O'Sullivan, the proud owners of Beach Therapy 30A in beautiful Grayton Beach, Florida. We are excited to share our slice of paradise with guests from around the world.
  </p>  
        </div>
      </section> */}
      <div className="text-center max-w-4xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[94px]  text-sky-900 text-center leading-tight"
          style={{ fontFamily: '"Montserrat", "sans-serif"' }}
        >
          List Your Property With Us
        </h2>

        <p
          className="  p-5 text-gray-600 text-center max-w-3xl mx-auto text-lg md:text-xl"
          style={{
            fontFamily: "Quicksand, sans-serif",
          }}
        >
          Looking for a reliable property manager? I'm currently accepting new
          vacation rental properties and would love to help you maximize your
          rental income. From guest communication and bookings to day-to-day
          management, I provide personalized service so you can enjoy
          hassle-free ownership.
        </p>
      </div>

      {/* Divider */}

      <div className="max-w-4xl mx-auto">
        <h3
          className="text-3xl font-bold text-gray-900 mb-6"
          style={{
            fontFamily: "Quicksand, sans-serif",
          }}
        >
          Now Accepting New Properties
        </h3>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="text-blue-600 mt-1" size={20} />
            <p className="text-gray-700">
              Spacious 3-bedroom, 3-bathroom condos accommodating up to 10–12
              guests.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="text-blue-600 mt-1" size={20} />
            <p className="text-gray-700">
              Large wraparound balconies with breathtaking Gulf and coastline
              views.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="text-blue-600 mt-1" size={20} />
            <p className="text-gray-700">
              Complimentary seasonal beach service including chairs and
              umbrellas.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="text-blue-600 mt-1" size={20} />
            <p className="text-gray-700">
              Resort amenities including a pool, hot tubs, fitness center,
              sports courts, and private beach access.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="text-blue-600 mt-1" size={20} />
            <p className="text-gray-700">
              Fully equipped kitchens, modern finishes, high-speed fiber
              internet, and comfortable living spaces.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="text-blue-600 mt-1" size={20} />
            <p className="text-gray-700">
              Perfect for family vacations, beach weddings, group getaways, and
              unforgettable sunsets along the Emerald Coast.
            </p>
          </div>
        </div>
      </div>
      <PropertyShowcase galleryImages={galleryImages} />

      {/* SECTION 1 */}
      {/* <section className="bg-gray-50 py-16 lg:py-24">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

       

      <div className="order-2 lg:order-1">
  <div className="relative overflow-hidden rounded-3xl shadow-2xl">

    <video
      src={surfsideVideo}
      className="w-full h-full object-cover rounded-3xl"
      autoPlay
      muted
      loop
      playsInline
      controls
      preload="metadata"
    />

  </div>
</div>

      

      <div className="order-1 lg:order-2 text-center lg:text-left">
        <h2
          className="mt-6 text-[#2C5A7B] leading-tight text-4xl sm:text-5xl lg:text-6xl"
          style={{
            fontFamily: 'Yellowtail, "Yellowtail Fallback", cursive',
          }}
        >
          Experience Luxury
          <br />
          Along The Emerald Coast
        </h2>

        <p className="mt-8 text-gray-600 text-lg leading-8 font-montserrat">
          Welcome to Paradise Found and Sun N Sea, two beautifully appointed
          beachfront condominiums located at Surfside Beach Resort in
          Miramar Beach, Florida. Whether you're planning a relaxing family
          vacation, a couples' getaway, or a trip with friends, our homes
          provide the perfect combination of comfort, space, and breathtaking
          Gulf Coast scenery.
        </p>

        <p className="mt-6 text-gray-600 text-lg leading-8 font-montserrat">
          Enjoy spacious three-bedroom accommodations, oversized private
          balconies, resort-style amenities, and direct access to Surfside's
          private white-sand beach. Every detail has been thoughtfully prepared
          to help you relax, reconnect, and create unforgettable memories on
          Florida's Emerald Coast.
        </p>

        

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <span className="text-gray-700 font-medium">
              Private Beach Access
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <span className="text-gray-700 font-medium">
              Complimentary Beach Service
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <span className="text-gray-700 font-medium">
              Resort Pool & Hot Tubs
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <span className="text-gray-700 font-medium">
              Panoramic Gulf Views
            </span>
          </div>

        </div>

       

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

          <a
            href="/properties"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300"
          >
            Explore Our Condos
          </a>

          <a
            href="/#contact"
            className="border border-gray-300 hover:border-blue-600 hover:text-blue-600 px-8 py-4 rounded-full font-semibold transition-all duration-300"
          >
            Contact Us
          </a>

        </div>

      </div>

    </div>
  </div>
</section> */}

      {/* <section className="py-20 lg:py-28 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">

    <div className="grid lg:grid-cols-2 gap-16 items-center">

      

      <div className="order-2 lg:order-1">
        <h2
          className="mt-6 text-[#2C5A7B] leading-tight text-5xl sm:text-6xl"
          style={{
            fontFamily: 'Yellowtail, "Yellowtail Fallback", cursive',
          }}
        >
          More Than A Stay...
         
          It's Your Beach Escape
        </h2>

        <p className="mt-8 text-lg leading-9 text-gray-600 font-montserrat">
          Paradise Found and Sun N Sea were thoughtfully designed to give
          families and groups a relaxing beachfront experience. From sunrise
          over the Gulf to evenings spent on your private balcony, every moment
          is an opportunity to slow down, reconnect, and enjoy the beauty of
          Florida's Emerald Coast.
        </p>

        <p className="mt-6 text-lg leading-9 text-gray-600 font-montserrat">
          Spacious interiors, fully equipped kitchens, resort-style amenities,
          private beach access, and breathtaking coastal views come together to
          create a vacation you'll remember long after you return home.
        </p>
      </div>

      

      <div className="order-1 lg:order-2 relative">

        <div className="absolute -top-6 -left-6 w-40 h-40 rounded-full bg-blue-100 blur-3xl opacity-60"></div>

        <div className="overflow-hidden rounded-[30px] shadow-2xl">

          <img
            src={image}
            alt="Surfside Resort"
            className="w-full h-[350px] sm:h-[500px] lg:h-[620px] object-cover transition duration-700 hover:scale-105"
          />

        </div>

      </div>
Professional
    </div>

  </div>
</section> */}

      {/* <section className="relative py-20 lg:py-28 overflow-hidden">
 

  <div className="absolute inset-0">
    <img
      src={Guestsimg}
      alt="Surfside Resort"
      className="w-[50%] h-full object-cover"
    />
 
  </div>

  <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

    <div className="flex justify-center lg:justify-end">

 

      <div className="w-full max-w-2xl  backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12">

        <h2
          className="mt-6 text-[#2C5A7B] text-4xl sm:text-5xl leading-tight"
          style={{
            fontFamily:
              'Yellowtail, "Yellowtail Fallback", cursive',
          }}
        >
          Why Guests Love
           
          Staying With Us
        </h2>

        <p className="mt-8 text-lg leading-8 text-gray-600 font-montserrat">
          Paradise Found and Sun N Sea combine the comfort of home with
          the beauty of Florida's Emerald Coast. Every detail has been
          thoughtfully prepared to give families and groups a relaxing,
          convenient, and memorable beachfront vacation experience.
        </p>

        <p className="mt-6 text-lg leading-8 text-gray-600 font-montserrat">
          Spacious three-bedroom layouts, panoramic Gulf views, private
          balconies, fully equipped kitchens, and premium resort amenities
          make every stay comfortable from arrival through departure.
          Whether you're visiting for a family vacation, beach wedding,
          or weekend escape, you'll enjoy everything Surfside Resort has
          to offer.
        </p>

       

      </div>

    </div>

  </div>
</section> */}
    </>
  );
}
