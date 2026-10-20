import { useEffect, useRef, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import api from "../../api/axios.js";

import { CiHome } from "react-icons/ci";
import { FaWpforms } from "react-icons/fa";
import { MdOutlineAutoMode } from "react-icons/md";
import { GoGoal } from "react-icons/go";
import { MdOutlinePhotoCameraBack } from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";
import { AiTwotoneDollar } from "react-icons/ai";
import { TiLocationOutline } from "react-icons/ti";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { MdOutlineReviews } from "react-icons/md";
import { MdOutlineLocalOffer } from "react-icons/md";
import { IoMailOpenOutline } from "react-icons/io5";

import PropertyTab from "../../tabs/PropertyTab";
import DescriptionTab from "../../tabs/DescriptionTab";
import AmenitiesTab from "../../tabs/AmenitiesTab";
import ActivitiesTab from "../../tabs/ActivitiesTab";
import PhotosTab from "../../tabs/PhotosTab";
import VideoTab from "../../tabs/VideoTab";
import RatesTab from "../../tabs/RatesTab";
import LocationTab from "../../tabs/LocationTab";
import Inquiry from "../../tabs/Inquiry";
import Reviews from "../../tabs/Reviews.jsx";
import CalendarTab from "../../tabs/CalendarTab.jsx";
import DealsTab from "../../tabs/DealsTab.jsx";

/* ============================================================
   TABS
============================================================ */

const tabs = [
  {
    name: "Property",
    icon: <CiHome />,
  },
  {
    name: "Description",
    icon: <FaWpforms />,
  },
  {
    name: "Amenities",
    icon: <MdOutlineAutoMode />,
  },
  {
    name: "Activities",
    icon: <GoGoal />,
  },
  {
    name: "Photos",
    icon: <MdOutlinePhotoCameraBack />,
  },
  {
    name: "Video",
    icon: <IoVideocamOutline />,
  },
  {
    name: "Rates",
    icon: <AiTwotoneDollar />,
  },
  {
    name: "Location",
    icon: <TiLocationOutline />,
  },
  {
    name: "Calendar",
    icon: <MdOutlineCalendarMonth />,
  },
  {
    name: "Reviews",
    icon: <MdOutlineReviews />,
  },
  {
    name: "Deals",
    icon: <MdOutlineLocalOffer />,
  },
  
];

/* ============================================================
   ADD LISTING
============================================================ */

export default function AddListing() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const [listingId, setListingId] = useState(null);
  const [listingData, setListingData] = useState(null);

  const [activeTab, setActiveTab] = useState("Property");
  const [loading, setLoading] = useState(false);

  /*
    This ref is ONLY for the tab scroll container.
    It prevents the whole page from horizontally scrolling.
  */
  const tabsContainerRef = useRef(null);

  /*
    Active tab ref
  */
  const activeTabRef = useRef(null);

  /* ============================================================
     GET ID + TAB FROM URL
  ============================================================ */

  useEffect(() => {
    if (id) {
      setListingId(id);
    }

    const tabFromUrl = searchParams.get("tab");

    if (tabFromUrl) {
      const exists = tabs.some(
        (tab) => tab.name === tabFromUrl
      );

      if (exists) {
        setActiveTab(tabFromUrl);
      }
    }
  }, [id, searchParams]);

  /* ============================================================
     LOAD LISTING DATA
  ============================================================ */

  useEffect(() => {
    if (!listingId) {
      setListingData(null);
      return;
    }

    setLoading(true);

    api
      .get(`/listings/${listingId}`)
      .then((res) => {
        console.log("LISTING DATA:", res.data);

        setListingData(res.data);
      })
      .catch((err) => {
        console.error(
          "LISTING LOAD ERROR:",
          err
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [listingId]);

  /* ============================================================
     KEEP ACTIVE TAB VISIBLE
  ============================================================ */

  useEffect(() => {
    const container = tabsContainerRef.current;
    const active = activeTabRef.current;

    if (!container || !active) {
      return;
    }

    const containerRect =
      container.getBoundingClientRect();

    const activeRect =
      active.getBoundingClientRect();

    /*
      Only scroll the TAB CONTAINER.
      We do NOT use scrollIntoView().
      This prevents the entire page from jumping.
    */

    if (activeRect.left < containerRect.left) {
      container.scrollLeft -=
        containerRect.left - activeRect.left + 20;
    }

    if (activeRect.right > containerRect.right) {
      container.scrollLeft +=
        activeRect.right - containerRect.right + 20;
    }
  }, [activeTab]);

  /* ============================================================
     NEXT TAB
  ============================================================ */

  const goNextTab = () => {
    const currentIndex = tabs.findIndex(
      (tab) => tab.name === activeTab
    );

    if (
      currentIndex !== -1 &&
      currentIndex < tabs.length - 1
    ) {
      setActiveTab(
        tabs[currentIndex + 1].name
      );
    }
  };

  /* ============================================================
     TAB CLICK
  ============================================================ */

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  /* ============================================================
     LOADING
  ============================================================ */

  if (loading && !listingData) {
    return (
      <div
        className="
          min-h-screen
          w-full
          bg-gray-50
          flex
          items-center
          justify-center
          px-4
        "
      >
        <div
          className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            shadow-sm
            p-8
            text-center
            w-full
            max-w-sm
          "
        >
          <div
            className="
              w-10
              h-10
              border-4
              border-blue-100
              border-t-blue-600
              rounded-full
              animate-spin
              mx-auto
              mb-4
            "
          />

          <h2 className="text-lg font-semibold text-gray-800">
            Loading Listing
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Please wait...
          </p>
        </div>
      </div>
    );
  }

  /* ============================================================
     UI
  ============================================================ */

  return (
    <div
      className="
        w-full
        min-w-0
        min-h-screen
        bg-gray-50
        overflow-x-hidden
      "
    >

      {/* ========================================================
          HEADER
      ======================================================== */}

      <div className="mb-4 sm:mb-5 w-full min-w-0">

        <div
          className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            shadow-sm
            w-full
            min-w-0
          "
        >

          <div
            className="
              p-4
              sm:p-5
              md:p-6
              w-full
              min-w-0
            "
          >

            <div
              className="
                flex
                flex-col
                lg:flex-row
                lg:items-center
                lg:justify-between
                gap-4
                lg:gap-5
                w-full
                min-w-0
              "
            >

              {/* ==================================================
                  LEFT HEADER
              ================================================== */}

              <div
                className="
                  min-w-0
                  flex-1
                  w-full
                "
              >

                <div
                  className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    gap-1
                    sm:gap-3
                    min-w-0
                  "
                >

                  <h1
                    className="
                      text-sm
                      sm:text-lg
                      md:text-xl
                      font-bold
                      text-gray-900
                      whitespace-nowrap
                    "
                  >
                    {listingId
                      ? "Edit Listing"
                      : "Add New Listing"}
                  </h1>

                  {listingData?.property?.title && (
                    <p
                      className="
                        min-w-0
                        text-xl
                        sm:text-2xl
                        md:text-3xl
                        font-semibold
                        text-blue-600
                        break-words
                        leading-tight
                      "
                    >
                      {listingData.property.title}
                    </p>
                  )}

                </div>

                <p
                  className="
                    text-xs
                    sm:text-sm
                    text-gray-500
                    mt-2
                    leading-relaxed
                  "
                >
                  Manage property information, photos,
                  pricing, location and inquiries.
                </p>

              </div>


              {/* ==================================================
                  STATUS
              ================================================== */}

              <div
                className="
                  flex-shrink-0
                  w-fit
                "
              >

                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-3
                    sm:px-4
                    py-2
                    sm:py-2.5
                    rounded-xl
                    bg-blue-50
                    border
                    border-blue-100
                  "
                >

                  <span
                    className="
                      w-2
                      h-2
                      sm:w-2.5
                      sm:h-2.5
                      rounded-full
                      bg-red-500
                      flex-shrink-0
                    "
                  />

                  <span
                    className="
                      text-xs
                      sm:text-sm
                      font-semibold
                      text-blue-700
                      whitespace-nowrap
                    "
                  >
                    {listingId
                      ? "Editing Listing"
                      : "New Listing"}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ========================================================
          TABS
          
          IMPORTANT:
          - One line
          - No wrapping
          - Horizontal touch scroll
          - All 12 tabs remain available
      ======================================================== */}

      <div
        className="
          sticky
          top-0
          z-40
          w-full
          min-w-0
          pb-3
          bg-gray-50
        "
      >

        <div
          className="
            w-full
            min-w-0
            bg-white
            border
            border-gray-200
            rounded-2xl
            shadow-sm
            overflow-hidden
          "
        >

          <div
            ref={tabsContainerRef}
            className="
              tabs-scroll
              w-full
              min-w-0
              overflow-x-auto
              overflow-y-hidden
              overscroll-x-contain
              touch-pan-x
              scroll-smooth
            "
          >

            <div
              className="
                flex
                items-center
                gap-1
                p-2
                min-w-max
                whitespace-nowrap
              "
            >

              {tabs.map((tab) => {

                const isActive =
                  activeTab === tab.name;

                return (
                  <button
                    key={tab.name}
                    ref={
                      isActive
                        ? activeTabRef
                        : null
                    }
                    type="button"
                    onClick={() =>
                      handleTabChange(
                        tab.name
                      )
                    }
                    className={`
                      relative
                      flex
                      items-center
                      justify-center
                      gap-1.5
                      shrink-0
                      whitespace-nowrap
                      rounded-xl
                      font-semibold
                      cursor-pointer
                      transition-all
                      duration-200

                      px-3
                      py-2.5
                      text-xs

                      sm:px-4
                      sm:py-3
                      sm:text-sm

                      ${
                        isActive
                          ? `
                            bg-blue-600
                            text-white
                            shadow-md
                          `
                          : `
                            text-gray-600
                            hover:bg-gray-100
                            hover:text-gray-900
                          `
                      }
                    `}
                  >

                    {/* ICON */}

                    <span
                      className="
                        flex
                        items-center
                        justify-center
                        shrink-0
                        text-lg
                        sm:text-xl
                      "
                    >
                      {tab.icon}
                    </span>

                    {/* NAME */}

                    <span>
                      {tab.name}
                    </span>

                    {/* ACTIVE INDICATOR */}

                    {isActive && (
                      <span
                        className="
                          absolute
                          bottom-0
                          left-1/2
                          -translate-x-1/2
                          w-7
                          h-1
                          rounded-t-full
                          bg-white
                        "
                      />
                    )}

                  </button>
                );
              })}

            </div>

          </div>

        </div>

      </div>


      {/* ========================================================
          CONTENT
      ======================================================== */}

      <div
        className="
          w-full
          min-w-0
          pb-20
          md:pb-10
        "
      >

        <div
          className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            shadow-sm
            overflow-hidden
            w-full
            min-w-0
          "
        >

          <div
            className="
              w-full
              min-w-0
              p-3
              sm:p-5
              md:p-6
              overflow-x-hidden
            "
          >

            {/* ==================================================
                PROPERTY
            ================================================== */}

            {activeTab === "Property" && (
              <div className="w-full min-w-0">

                <PropertyTab
                  listingId={listingId}
                  setListingId={setListingId}
                  initialData={
                    listingData?.property
                  }
                  goNextTab={goNextTab}
                />

              </div>
            )}


            {/* ==================================================
                DESCRIPTION
            ================================================== */}

            {activeTab === "Description" && (
              <div className="w-full min-w-0">

                <DescriptionTab
                  listingId={listingId}
                  initialData={
                    listingData?.description || ""
                  }
                  goNextTab={goNextTab}
                />

              </div>
            )}


            {/* ==================================================
                AMENITIES
            ================================================== */}

            {activeTab === "Amenities" && (
              <div className="w-full min-w-0">

                <AmenitiesTab
                  listingId={listingId}
                  setListingId={setListingId}
                  initialData={
                    listingData?.Amenities
                  }
                  goNextTab={goNextTab}
                />

              </div>
            )}


            {/* ==================================================
                ACTIVITIES
            ================================================== */}

            {activeTab === "Activities" && (
              <div className="w-full min-w-0">

                <ActivitiesTab
                  listingId={listingId}
                  setListingId={setListingId}
                  initialData={
                    listingData?.Activities
                  }
                  goNextTab={goNextTab}
                />

              </div>
            )}


            {/* ==================================================
                PHOTOS
            ================================================== */}

            {activeTab === "Photos" && (
              <div className="w-full min-w-0">

                <PhotosTab
                  listingId={listingId}
                  setListingId={setListingId}
                  initialData={
                    listingData?.Photos
                  }
                  goNextTab={goNextTab}
                />

              </div>
            )}


            {/* ==================================================
                VIDEO
            ================================================== */}

            {activeTab === "Video" && (
              <div className="w-full min-w-0">

                <VideoTab
                  listingId={listingId}
                  setListingId={setListingId}
                  initialData={
                    listingData?.Video
                  }
                  goNextTab={goNextTab}
                />

              </div>
            )}


            {/* ==================================================
                RATES
            ================================================== */}

            {activeTab === "Rates" && (
              <div className="w-full min-w-0">

                <RatesTab
                  listingId={listingId}
                  setListingId={setListingId}
                  initialData={
                    listingData?.Rates
                  }
                  goNextTab={goNextTab}
                />

              </div>
            )}


            {/* ==================================================
                LOCATION
            ================================================== */}

            {activeTab === "Location" && (
              <div className="w-full min-w-0">

                <LocationTab
                  listingId={listingId}
                  setListingId={setListingId}
                  initialData={
                    listingData?.Location
                  }
                  goNextTab={goNextTab}
                />

              </div>
            )}


            {/* ==================================================
                CALENDAR
            ================================================== */}

            {activeTab === "Calendar" && (
              <div className="w-full min-w-0">

                <CalendarTab
                  listingId={listingId}
                  calendar={
                    listingData?.calendar
                  }
                />

              </div>
            )}


            {/* ==================================================
                REVIEWS
            ================================================== */}

            {activeTab === "Reviews" && (
              <div className="w-full min-w-0">

                <Reviews
                  listingId={listingId}
                  setListingId={setListingId}
                  initialData={
                    listingData?.Reviews
                  }
                  goNextTab={goNextTab}
                />

              </div>
            )}


            {/* ==================================================
                DEALS
            ================================================== */}

            {activeTab === "Deals" && (
              <div className="w-full min-w-0">

                <DealsTab
                  listingId={listingId}
                  setListingId={setListingId}
                  initialData={
                    listingData?.Deals
                  }
                  goNextTab={goNextTab}
                />

              </div>
            )}


           
          </div>

        </div>

      </div>


      {/* ========================================================
          TAB SCROLLBAR CSS
      ======================================================== */}

      <style>{`

        /*
          Horizontal tab scrollbar
        */

        .tabs-scroll {
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }

        .tabs-scroll::-webkit-scrollbar {
          height: 5px;
        }

        .tabs-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .tabs-scroll::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 999px;
        }

        .tabs-scroll::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

      `}</style>

    </div>
  );
}