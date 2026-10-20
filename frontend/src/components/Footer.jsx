import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";

import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

import { FiMail, FiPhone } from "react-icons/fi";

import { HiOutlineLocationMarker } from "react-icons/hi";

export default function Footer({ listingId }) {
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!listingId) return;

    api
      .get(`/listings/${listingId}`)
      .then((res) => {
        setContactNumber(res.data?.property?.altPhone || "");

        setEmail(res.data?.property?.altEmail || "");
      })
      .catch(console.log);
  }, [listingId]);

  const quickLinks = [
    {
      name: "Home",
      to: "/",
    },
    {
      name: "Vacation Rentals",
      to: "/properties",
    },
    // {
    //   name: "Real Estate",
    //   to: "/real-estate",
    // },
    {
      name: "Property Management",
      to: "/property-management",
    },
    {
      name: "About",
      to: "/about",
    },
    {
      name: "Contact",
      to: "/contact",
    },
  ];

  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Top */}

        <div className="py-16">
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 ">
            {/* ===================================
                    Logo
            =================================== */}

            <div>
              <Link to="/">
                 <h1 className="">LOGO</h1>
              </Link>

              <div className="mt-8">
                <div className="flex items-start gap-3">
                  <HiOutlineLocationMarker
                    size={22}
                    className="text-[#4CAf50] mt-1"
                  />

                  <p className=" text-gray-600 leading-8 text-[17px] ">
                    34990 Emerald Coast Pkwy, Suite 300, Destin, FL 32541
                  </p>
                </div>
              </div>
            </div>

            {/* CONTACT STARTS HERE */}
            {/* ===================================
                    Contact
            =================================== */}

            <div>
              <h3
                className=" text-[20px] font-semibold text-[#1B1B1B] mb-8 "
                style={{
                  fontFamily: '"Montserrat", sans-serif',
                }}
              >
                Contact
              </h3>

              <div className="space-y-5"></div>

              {/* Social Icons */}

              <div className="flex gap-4 mt-10">
                <a
                  href="#"
                  className=" w-7 h-7 rounded-full bg-[#4CAf50] text-white flex items-center justify-center 
                  hover:bg-[#00796B]
                  duration-300
                "
                >
                  <FiMail />
                </a>
                <a
                  href="#"
                  className=" w-7 h-7 rounded-full bg-[#4CAf50] text-white flex items-center justify-center hover:bg-[#00796B]
                  duration-300 "
                >
                  <FiPhone />
                </a>

                <a
                  href="#"
                  className=" w-7 h-7 rounded-full bg-[#4CAf50] text-white flex items-center justify-center 
                  hover:bg-[#00796B]
                  duration-300 "
                >
                  <FaFacebookF />
                </a>

                <a
                  href="#"
                  className=" w-7 h-7 rounded-full bg-[#4CAf50] text-white flex items-center justify-center hover:bg-[#00796B]
                  duration-300 "
                >
                  <FaInstagram />
                </a>

                <a
                  href="#"
                  className=" w-7 h-7 rounded-full bg-[#4CAf50] text-white flex items-center justify-center hover:bg-[#00796B]
                  duration-300 "
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>

            {/* ===================================
                    Quick Links
            =================================== */}

            <div>
              <h3
                className=" text-[20px] font-semibold text-[#1B1B1B] mb-8 "
                style={{
                  fontFamily: '"Montserrat", sans-serif',
                }}
              >
                Quick Links
              </h3>

              <div className="space-y-1">
                {quickLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className=" block border-b border-gray-200 pb-1 text-gray-700 hover:text-[#00796B] transition "
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer About */}
          </div>

          {/* Bottom Divider */}

          {/* ===================================
                  Bottom Footer
          =================================== */}
          <div className="border-b-1 text-gray-300"></div>
          <Link to="/admin/login">
            <button className=" text-black hover:bg-[#1B252F] hover:text-white text-sm font-medium px-4 py-2 rounded  flex items-center gap-2">
              <MdEmail /> Owner Login
            </button>
          </Link>
          <div className="   items-center justify-between gap-5 text-center md:text-left ">
            {/* Copyright */}

            <p className=" text-gray-500 text-sm md:text-base text-center ">
              © {new Date().getFullYear()} Digify America Rentals. All Rights
              Reserved.
            </p>

            {/* Powered By */}
          </div>
        </div>
      </div>
    </footer>
  );
}
