import { BedDouble } from "lucide-react";
// import propertyImage from "../../assets/property.jpg";
// apni image ka correct path lagao

export default function AboutSection() {
  return (
    <section
      id="property"
      className="w-full bg-[#f7f7f7]"
      style={{
        fontFamily: "'Quicksand', sans-serif",
      }}
    >
      <div className="grid w-full grid-cols-1 lg:grid-cols-2 mt-30" >
        {/* =========================
                    CONTENT
        ========================== */}

        <div
          className="
            flex
            items-center

            px-5
            py-12

            sm:px-8
            sm:py-16

            md:px-12
            md:py-20

            lg:px-10
            lg:py-16

            xl:px-16

            2xl:pl-[10vw]
            2xl:pr-20
          "
        >
          <div className="w-full max-w-[560px]">
            {/* HEADING */}

            <h2
              className="
                text-[26px]
                sm:text-[30px]
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
              The Property
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                mt-6
                sm:mt-8

                text-[#6f6f6f]

                text-[17px]
                sm:text-[19px]
                md:text-[21px]
                lg:text-[19px]
                xl:text-[21px]

                leading-[1.5]

                    font-[700]
                sm:leading-[1.6]

                font-medium
              "
                style={{
                    fontFamily: "Quicksand, sans-serif",
                  }}
            >
              The beach chic professionally decorated home has blue/grey wood
              flooring and Carrara marble throughout. Stainless steel Viking
              appliances, custom furniture, Stearns and Foster mattresses, 4K
              TVs, additional ice maker, and Yeti cooler, and game room set this
              home apart from the other Seacrest Beach vacation homes. The
              handmade dining room table seats 10 guests, in addition to 3
              barstools along the kitchen counter.
            </p>

            {/* BUTTON */}

            <a
              href="#amenities"
              className="
                mt-8
                sm:mt-10

                inline-flex
                items-center
                justify-center
                gap-3

                w-full
                sm:w-auto

                min-h-[50px]

                px-6
                sm:px-8

                bg-[#009491]
                text-white

                text-[15px]
                sm:text-[16px]

                font-semibold
                uppercase

                rounded-[3px]

                transition-all
                duration-300

                hover:bg-[#007d7a]
                hover:-translate-y-0.5
              "
            >
              <BedDouble size={22} strokeWidth={2.5} />

              <span>Property Amenities</span>
            </a>
          </div>
        </div>

        {/* =========================
                     IMAGE
        ========================== */}

        <div
          className="
            relative

            w-full

            h-[300px]
            sm:h-[420px]
            md:h-[520px]

            lg:h-auto
            lg:min-h-[680px]

            xl:min-h-[760px]

            overflow-hidden
          "
        >
          <img
            src="https://anchorsaway30a.com/wp-content/uploads/2024/08/Gilbert_House43_websize.jpg"
            alt="Property living room"
            className="
              absolute
              inset-0

              w-full
              h-full

              object-cover
              object-center

              transition-transform
              duration-700

              hover:scale-[1.02]
            "
          />
        </div>
      </div>
    </section>
  );
}
