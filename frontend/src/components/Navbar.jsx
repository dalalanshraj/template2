import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

import { ChevronRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    {
      title: "Vacation Rentals",
      links: [
        {
          heading: "Popular Destinations",
          items: [
            "Panama City Beach",
            "Destin",
            "Miramar Beach",
            "30A",
            "Fort Walton Beach",
          ],
        },
        {
          heading: "Property Types",
          items: [
            "Beach Condos",
            "Luxury Villas",
            "Pet Friendly",
            "Private Pools",
            "Family Homes",
          ],
        },
      ],
    },

    {
      title: "Real Estate",
      links: [
        {
          heading: "Buy",
          items: ["Homes", "Condos", "Townhomes", "Waterfront"],
        },
        {
          heading: "Sell",
          items: ["Home Valuation", "Agent Services", "Market Trends"],
        },
      ],
    },

    {
      title: "Property Management",
      links: [
        {
          heading: "Owner Services",
          items: ["Marketing", "Cleaning", "Maintenance", "Guest Support"],
        },
      ],
    },
  ];

  return (
    <>
      <header
  className={`
    fixed
    top-5
    left-1/2
    -translate-x-1/2
    z-50
    w-[95%]
    transition-all
    duration-500
    ${
      isScrolled
        ? "top-[-10px] w-full rounded-none bg-white shadow-xl"
        : "rounded-3xl bg-white/60 backdrop-blur-xl shadow-lg"
    }
  `}
>
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 ${
            isScrolled ? "px-7 py-5" : "px-8 py-5"
          }`}
        >
          {/* Logo */}

          <Link to="/">
            <h1
              className={`transition-all duration-500 ${
                isScrolled ? "h-10 text-green-500 text-[20px]" : "h-14"
              }`}> LOGO
           </h1>
          </Link>

          {/* Desktop Menu */}

          <nav className="hidden lg:flex items-center gap-10 navbar-font" >
            {/* {menuItems.map((menu, index) => (
              <div key={index} className="relative group">
                <button className="flex items-center gap-1 font-medium text-[15px] hover:text-orange-500 duration-300">
                  {menu.title}

                  <ChevronDown
                    size={16}
                    className="group-hover:rotate-180 duration-300"
                  />
                </button>

                 

                <div
                  className="
        invisible
        opacity-0
        translate-y-6

        group-hover:visible
        group-hover:opacity-100
        group-hover:translate-y-0

        duration-300

        absolute
        left-1/2
        -translate-x-1/2

        mt-8

        w-[700px]

        rounded-2xl

        bg-white

        shadow-2xl

        border

        p-8

        z-50
      "
                >
                  <div
                    className={`grid gap-8 ${
                      menu.links.length === 1 ? "grid-cols-1" : "grid-cols-2"
                    }`}
                  >
                    {menu.links.map((section, i) => (
                      <div key={i}>
                        <h3 className="font-semibold text-lg mb-5">
                          {section.heading}
                        </h3>

                        <div className="space-y-3">
                          {section.items.map((item, j) => (
                            <a
                              key={j}
                              href="/"
                              className="flex items-center justify-between hover:text-orange-500 duration-300 group/item"
                            >
                              {item}

                              <ChevronRight
                                size={16}
                                className="opacity-0 group-hover/item:opacity-100 duration-300"
                              />
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))} */}
            <Link to={"/properties"} className="font-light hover:text-orange-500"  style={{
            fontFamily: "Quicksand, sans-serif",
          }}>
               ALL RENTALS
            </Link>
            {/* <Link to={"/property-management"} className="font-light hover:text-orange-500"  style={{
            fontFamily: "Quicksand, sans-serif",
          }}>
               PROPETY MANAGEMENTS
            </Link> */}

            <Link to={"/about-us"} className="font-light hover:text-orange-500"  style={{
            fontFamily: "Quicksand, sans-serif",
          }}>
             ABOUT US
            </Link>

            <Link to={"/contect-us"} className="font-light hover:text-orange-500"
            style={{
            fontFamily: "Quicksand, sans-serif",
          }}>
              CONTACT US
            </Link>
          </nav>

          {/* Mobile Button */}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden"
          >
            {mobileOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* Mobile Menu */}

        <div
          className={`overflow-hidden transition-all duration-500 lg:hidden ${
            mobileOpen ? "max-h-[800px]" : "max-h-0"
          }`}
        >
          <div className="bg-white border-t">
            {menuItems.map((menu, index) => (
              <div key={index}>
                <button
                  onClick={() =>
                    setOpenMobileDropdown(
                      openMobileDropdown === index ? null : index,
                    )
                  }
                  className="flex justify-between items-center w-full px-6 py-4"
                >
                  {menu.title}

                  <ChevronDown
                    size={18}
                    className={`duration-300 ${
                      openMobileDropdown === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openMobileDropdown === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  {menu.links.map((section, i) => (
                    <div key={i} className="px-10 pb-3">
                      <h4 className="font-semibold mb-2">{section.heading}</h4>

                      {section.items.map((item, j) => (
                        <a
                          key={j}
                          href="/"
                          className="block py-2 text-gray-600"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <Link to={"/about-us"} className="block px-6 py-4">
              About
            </Link>

            <a href="/contact" className="block px-6 py-4">
              Contact
            </a>
          </div>
        </div>
      </header>

      {/* Spacer */}

      <div className="h-28"></div>
    </>
  );
}
