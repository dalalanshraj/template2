import { Link } from "react-router-dom";
import ThingsToDoSection from "../components/homeSection/ActivitiesSection.jsx";
export default function ThingsToDo() {
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
              Things to Do
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
              Shopping - Dining - Entertainment - Attractions
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

      {/* =========================================
                  CONTENT SECTION
      ========================================= */}

      <section className="bg-white py-20 lg:py-28  ">
        <div
          className="
            max-w-7xl
            mx-auto

            px-6
            lg:px-10
          "
        >
          <div
            className="
              grid

              lg:grid-cols-2

              gap-16
              xl:gap-20

              items-start
            "
          >
            {/* LEFT IMAGE */}

            <div>
              <img
                src="https://anchorsaway30a.com/wp-content/uploads/2020/06/aerial_seacrestbeachneighborhood-min.jpg"
                alt="Seacrest"
                className="
                  w-full

                  rounded-sm

                  object-cover

                  shadow-sm
                "
              />
            </div>

            {/* RIGHT CONTENT */}

            <div className="pt-2">
              {" "}
              <p
                className="
                  text-gray-600

                  text-lg
                  lg:text-[15px]

                    leading-[1.5]

                    font-[700]
                  "
                style={{
                  fontFamily: "Quicksand, sans-serif",
                }}
              >
                The Seacrest Beach Neighborhood is situated between Rosemary
                Beach and Alys Beach. This area is extremely family friendly and
                they always have something going for the whole family. There is
                live music, weekly farmers market and lots of great restaurants!
                This section of 30A offers sidewalks where you will constantly
                see bikers, walkers and joggers all day.
              </p>
              <p
                className="
                  mt-10

                  text-gray-600

                  text-lg
                 lg:text-[15px]

                    leading-[1.5]

                    font-[700]
                  "
                style={{
                  fontFamily: "Quicksand, sans-serif",
                }}
              >
                Our house is 24 miles from Silver Sands Premium Outlets in
                Sandestin and only 11 miles from Pier Park in Panama City Beach.
                Live music at the front of the neighborhood during the summer
                and at The Hub, which is a short drive down 30A.
              </p>
              {/* BIG HEADING */}
              <h2
                className="
                  mt-20

                  text-center text-[#C9C4C4]

                  text-4xl
                  md:text-5xl
                  xl:text-3xl

                font-light
                    text-[#1B1B1B]
                  "
                  style={{
                    fontFamily: "'Quicksand' , sans-serif",
                  }}
              >
                Have an Endless Summer at Seacrest Beach!
              </h2>
            </div>
          </div>
        </div>
      </section>
      {/* =========================================
                  BOTTOM SPACING
      ========================================= */}

      <div className="   " />
      <ThingsToDoSection />
    </>
  );
}
