// import ownersImg from "../assets/owners.jpg"; // change image path if needed

import TestimonialCarousel from "../components/ReviewsSection";

export default function MeetTheOwners() {
  return (
    <>
       {/* =========================================
                    HERO
      ========================================= */}

      <section className="w-full bg-[#7EB4BD]">
        <div className="max-w-7xl mx-auto">
          <div
            className="
              min-h-[380px]
              md:min-h-[430px]
              lg:min-h-[300px]

              flex
              flex-col
              items-center
              justify-center

              text-center

              px-6
            "
          >
            {/* Heading */}

            <h1
              className="
                text-white

                font-bold

                text-4xl
                md:text-6xl
                lg:text-7xl

               font-light
              leading-tight
              text-[#fff]
            "
              style={{
                fontFamily: "'Great Vibes', cursive",
              }}
            >
              Meet the Crew
            </h1>

            {/* Sub Heading */}

            <p
              className="
                mt-1

                text-white

                font-semibold

                text-lg
                md:text-1xl

               font-light
                    text-[#fff]
                  "
              style={{
                fontFamily: "'Quicksand' , sans-serif",
              }}
            >
             Rachel and Russell
            </p>

            {/* Button */}

            <a
              href="#booking"
              className="
              mt-7

              inline-flex items-center
              justify-center

              min-w-[190px]

              px-7
              py-3

              rounded-full

              bg-[#00989c]

              border-[3px]
              border-white

              text-white

              text-[16px]
              sm:text-[18px]

              font-bold

              shadow-md

              transition-all
              duration-300

              hover:bg-[#fff]
              hover:text-[#00989c]
              hover:border-[#00989c]
              hover:scale-105
            "
            >
              Reserve Your Stay
            </a>
          </div>
        </div>
      </section>

 

      {/* ==========================================
                  OWNERS SECTION
      ========================================== */}

      <section className="bg-white py-16 md:py-20 lg:py-28">

        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-2

              gap-14
              xl:gap-20

              items-center
            "
          >

            {/* ======================
                    IMAGE
            ======================= */}

            <div className="flex justify-center">

              <img
                src="https://anchorsaway30a.com/wp-content/uploads/2024/08/Gilbert_House56_websize-1.jpg"
                alt="Owners"

                className="
                  w-full

                  max-w-[420px]

                  h-auto

                  object-cover

                  shadow-sm

                  rounded-sm
                "
              />

            </div>

            {/* ======================
                  CONTENT
            ======================= */}

            <div>

              <h1
                className="
                  text-[#78B0BA]

                  font-bold

                  text-4xl
                  md:text-[34px]
                uppercase
                 font-light
                leading-tight
                text-[#6694E3]
              "
              style={{
                fontFamily: "'Quicksand' , sans-serif",
              }}
              >
                About Us
              </h1>
                            <p
                className="
                  text-gray-600

                  text-lg
                  xl:text-[15px]

                leading-[1.5]

                    font-[700]
                sm:leading-[1.6]

                font-medium
              "
                style={{
                    fontFamily: "Quicksand, sans-serif",
                  }}
              >
                Russell and Rachel met in 2017 after they were
                introduced by mutual friends. Russell works at
                Farley Nuclear Plant and Rachel is a Dermatology
                Physician Assistant.

                Over the last few years they have enjoyed spending
                many weekends at Seacrest Beach. Russell and Rachel
                got engaged on the green space at Rosemary Beach
                in July 2019 and were married in April 2020.
              </p>

              <p
                className="
                  mt-12

                  text-gray-600

                  text-lg
                  xl:text-[15px]

                leading-[1.5]

                    font-[700]
                sm:leading-[1.6]

                font-medium
              "
                style={{
                    fontFamily: "Quicksand, sans-serif",
                  }}
              >
                Russell is a graduate from Georgia Tech and has
                spent much of his life visiting the Rosemary Beach
                area and eventually fell in love with it.

                After searching for nearly two years they finally
                found the perfect beach home. The house was
                purchased in 2015 and much of the furniture,
                custom bunk beds and décor were designed and
                built specifically for the property.
              </p>

            </div>

          </div>

          {/* ======================================
                    BOTTOM TITLE
          ====================================== */}

          <div className="mt-20 lg:mt-28">

            <h2
              className="
                text-center

                font-bold

                text-[#C8C3C3]

                text-3xl
                md:text-5xl
                lg:text-3xl

                leading-tight
              "
            >
              Anchors Away has 62 5-Star Reviews on VRBO!
            </h2>

          </div>

        </div>
        <TestimonialCarousel />

      </section>
   

    </>

  );
}