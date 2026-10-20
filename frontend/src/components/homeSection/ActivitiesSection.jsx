import {
  ShoppingBag,
  Pizza,
  Guitar,
  Bike,
  BriefcaseBusiness,
} from "lucide-react";

const things = [
  {
    icon: ShoppingBag,
    title: "Shopping",
    desc: "Take advantage of some of the best shopping near Silver Sands Premium Outlets, Pier Park and many local boutiques.",
  },
  {
    icon: Pizza,
    title: "Dining",
    desc: "Enjoy amazing restaurants, fresh seafood, beach cafés and family dining just minutes from the property.",
  },
  {
    icon: Guitar,
    title: "Entertainment",
    desc: "Arcades, mini golf, live music, nightlife and family attractions are all nearby.",
  },
  {
    icon: Bike,
    title: "Visit Nearby Cities",
    desc: "Explore Rosemary Beach, Alys Beach, WaterColor, Seaside and many beautiful coastal communities.",
  },
];

export default function ThingsToDoSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* Heading */}

        <h2 className="text-center font-bold text-[#6694E3]  lg:text-6xl
            leading-[1.15]
             font-light
        text-3xl md:text-5xl  " style={{
              fontFamily: "'Great Vibes', cursive",
            }}>
          Things To Do
        </h2>

        <p className="mt-5 max-w-3xl mx-auto text-center
        text-gray-500 text-base md:text-lg   leading-[1.65]

            font-medium
"   style={{
                    fontFamily: "Quicksand, sans-serif",
                  }}>
          Anchors Away visitors will have a large list of things to do
          including shopping, dining, entertainment and much more.
        </p>

        {/* Cards */}

        <div className="
        mt-16
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-10">

          {things.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                flex
                flex-col
                items-center
                text-center
                px-5"
              >
                <div className="
                w-24
                h-24
                rounded-full
                flex
                items-center
                justify-center
                bg-cyan-50
                mb-6">

                  <Icon
                    className="text-cyan-400"
                    size={52}
                    strokeWidth={1.8}
                  />

                </div>

                <h3 className="text-2xl font-[400]
                leading-tight
                text-[#6694E3]" style={{
                fontFamily: "'Quicksand' , sans-serif",
              }}>
                  {item.title}
                </h3>

                <p className="mt-4 text-gray-500   text-lg   leading-[1.5]

                    font-[700]
                sm:leading-[1.6]

                font-medium"   style={{
                    fontFamily: "Quicksand, sans-serif",
                  }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Button */}

        <div className="flex justify-center mt-16">

          <button
            className="
            bg-[#0b9b9b]
            hover:bg-[#087d7d]
            transition
            duration-300

            text-white

            px-10
            py-4

            rounded

            font-semibold

            flex
            items-center
            gap-3"
          >
            <BriefcaseBusiness size={22} />
            EXPERIENCE ANCHORS AWAY
          </button>

        </div>

      </div>
    </section>
  );
}