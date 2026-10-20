import { useEffect, useState , useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../api/axios";

export default function PropertyminiCalendar({ listingId }) {
  const [calendarDates, setCalendarDates] = useState([]);
  const [monthsShown, setMonthsShown] = useState(2);

  useEffect(() => {
  const handleResize = () => {
    setMonthsShown(
      window.innerWidth < 768 ? 1 : 2
    );
  };

  handleResize();

  window.addEventListener(
    "resize",
    handleResize
  );

  return () =>
    window.removeEventListener(
      "resize",
      handleResize
    );
}, []);

  useEffect(() => {
    if (listingId) {
      fetchDates();
    }
  }, [listingId]);

  const fetchDates = async () => {
    try {
      const res = await api.get(
        `/listings/${listingId}/calendar`
      );



      setCalendarDates(
        Array.isArray(res.data.calendar)
          ? res.data.calendar
          : Array.isArray(res.data)
          ? res.data
          : []
      );

    } catch (err) {
      console.log(err);
    }
  };

  // NORMALIZE DATE
   // =====================================
  // FORMAT DATE
  // =====================================

  const formatLocalDate = (date) => {

  const d = new Date(date);

  if (isNaN(d)) {
    return "";
  }

  return new Intl.DateTimeFormat(
    "en-CA",
    {
      timeZone: "America/Chicago",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  ).format(d);

};

  // =====================================
  // BLOCKED MAP
  // =====================================

const blockedMap = useMemo(() => {

  const map = {};

  calendarDates.forEach((item) => {

    // INVALID DATE SKIP
    if (!item?.date) return;

    const parsedDate =
      new Date(item.date);

    if (isNaN(parsedDate)) return;

    const itemDate = new Date(
      parsedDate.toLocaleString(
        "en-US",
        {
          timeZone: "America/Chicago",
        }
      )
    );

    const key =
      formatLocalDate(itemDate);

    if (!map[key]) {
      map[key] = [];
    }

    map[key].push(item.status);

  });

  return map;

}, [calendarDates]);

  // =====================================
  // DATE TYPE
  // =====================================

const getDateType = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const currentDate = new Date(date);
  currentDate.setHours(0, 0, 0, 0);

  if (currentDate < today) {
    return "past-day";
  }

  const currentKey =
    formatLocalDate(currentDate);

  const statuses =
    blockedMap[currentKey] || [];

  const hasCIN =
    statuses.includes("CIN");

  const hasCOUT =
    statuses.includes("COUT");

  const hasR =
    statuses.includes("R");

  const hasH =
    statuses.includes("H");

  // TRUE TURNOVER
  if (hasCIN && hasCOUT) {
    return "turnover-day";
  }

  if (hasCIN) {
    return "checkin-day";
  }

  if (hasCOUT) {
    return "checkout-day";
  }

  if (hasR) {
    return "blocked-day";
  }

  if (hasH) {
    return "hold-day";
  }

  return "available-day";
};

  // =====================================
  // BLOCK CHECK
  // =====================================



  return (
    <div className="">


<div className="w-full overflow-hidden flex justify-center">
  <DatePicker
   inline
  selected={null}
  onChange={() => {}}
   monthsShown={window.innerWidth < 768 ? 1 : 2}
  dayClassName={getDateType}
  minDate={new Date()}
  fixedHeight
  showPopperArrow={false}
  filterDate={(date) => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const current = new Date(date);

    current.setHours(0, 0, 0, 0);

    return current >= today;
  }}
/>
</div>

      {/* LEGEND */}
   <div className="flex flex-wrap justify-center gap-5 mt-8">
          {/* AVAILABLE */}
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-[#FFE7E7]"></span>
            Available
          </div>

          {/* BOOKED */}
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-[#ADB8D6]"></span>
            Booked
          </div>

          {/* CHECK-IN */}
          <div className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded border"
              style={{
                background: "linear-gradient(135deg, #ADB8D6 50%, #FFE7E7 50%)",
              }}
            ></span>
            Check-Out
          </div>

          {/* CHECK-OUT */}
          <div className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded border"
              style={{
                background: "linear-gradient(315deg, #ADB8D6 50%, #FFE7E7 50%)",
              }}
            ></span>
            Check-In
          </div>

          {/* TURNOVER */}
          <div className="flex items-center gap-2">
            <span className="relative w-4 h-4 rounded bg-[#ADB8D6] overflow-hidden">
              <span className="absolute w-[140%] h-[2px] bg-black top-1/2 left-[-20%] rotate-135"></span>
            </span>
            Turnover
          </div>

          {/* HOLD */}
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-yellow-400"></span>
            Hold
          </div>
        </div>

      {/* STYLES */}
      <style>{`

.react-datepicker {
  border: none !important;
  width: 100% !important;
  max-width: 900px !important;
  background: transparent !important;

  display: flex !important;
gap: 20px;
  justify-content: center;
}
.react-datepicker__week {
  display: flex !important;
}


.react-datepicker__month-container {
  float: none !important;
  display: inline-block;
  margin: 0 25px;
}

.react-datepicker__header {
  background: transparent !important;
  border-bottom: none !important;
}
.react-datepicker__navigation-icon::before {
  border-color: #fff !important;
}
  .react-datepicker__navigation-icon::before {
  border-color: #222 !important;
}
.react-datepicker__current-month {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 15px;
}

.react-datepicker__day-name {
  width: 42px;
  line-height: 42px;
  font-weight: 600;
}

.react-datepicker__day {
  width: 42px;
  height: 42px;
  line-height: 42px;
  margin: 3px;
  border-radius: 8px;
}

.react-datepicker__navigation {
  top: 18px !important;
  width: 32px !important;
  height: 32px !important;
  z-index: 10 !important;
}

.react-datepicker__navigation--previous {
  left: 15px !important;
}

.react-datepicker__navigation--next {
  right: 15px !important;
}

.react-datepicker__navigation-icon::before {
  border-color: #ffffff !important;
  border-width: 2px 2px 0 0 !important;
}




/* AVAILABLE */
.react-datepicker__day.available-day {
  background-color: #FFE7E7 !important;
  color: black !important;
}

/* BOOKED */
.react-datepicker__day.blocked-day {
  background-color: #ADB8D6 !important;
  color: white !important;
}

/* HOLD */
.react-datepicker__day.hold-day {
  background-color: #facc15 !important;
  color: black !important;
}

/* CHECK-IN */
.react-datepicker__day.checkin-day {
  background: linear-gradient(
    135deg,
    #FFE7E7 50%,
    #ADB8D6 50%
  ) !important;

  color: black !important;
}

/* CHECK-OUT */
.react-datepicker__day.checkout-day {
  background: linear-gradient(
    315deg,
    #FFE7E7 50%,
    #ADB8D6 50%
  ) !important;

  color: black !important;
}

.react-datepicker__day.turnover-day {
  position: relative !important;
  overflow: hidden !important;

  width: 42px !important;
  height: 42px !important;
  line-height: 42px !important;

   background:
    linear-gradient(
      135deg,
      #ADB8D6 48%,
      black 48%,
      black 52%,
      #ADB8D6 52%
    ) !important;

  color: white !important;
  color: white !important;
}

/* diagonal line */
.react-datepicker__day.turnover-day::after {
  content: "";

  position: absolute;

  top: 50%;
  left: -20%;

  width: 140%;
  height: 2px;

  background: black;

 transform: rotate(-45deg);

  pointer-events: none;
}
.react-datepicker__header {
  position: relative !important;
}

.react-datepicker__current-month {
  padding: 0 55px !important;
  font-size: 18px !important;
  font-weight: 700 !important;
}
/* OUTSIDE DAYS */
.react-datepicker__day--outside-month {

  visibility: hidden !important;

  pointer-events: none !important;

}
  @media (max-width: 768px) {

  .react-datepicker {
    width: 100% !important;
    max-width: 100% !important;
    display: block !important;
  }

  .react-datepicker__month-container {
    width: 100% !important;
    margin: 0 !important;
  }

  .react-datepicker__current-month {
    font-size: 18px !important;
  }

  .react-datepicker__day-name {
    width: 34px !important;
    line-height: 34px !important;
    font-size: 12px !important;
  }

  .react-datepicker__day {
    width: 34px !important;
    height: 34px !important;
    line-height: 34px !important;
    margin: 1px !important;
    font-size: 13px !important;
  }

  .react-datepicker__day.turnover-day {
    width: 34px !important;
    height: 34px !important;
    line-height: 34px !important;
  }
}
  @media (max-width: 768px) {
  .react-datepicker__current-month {
    font-size: 16px !important;
    padding: 0 50px !important;
  }

  .react-datepicker__navigation--previous {
    left: 10px !important;
  }

  .react-datepicker__navigation--next {
    right: 5px !important;
  }
}
  @media (max-width: 768px) {
  .react-datepicker__current-month {
    padding: 0 65px !important;
    font-size: 16px !important;
  }

  .react-datepicker__navigation--previous {
    left: 8px !important;
  }

  .react-datepicker__navigation--next {
    right: 8px !important;
  }
}
   .react-datepicker__day.past-day {
  background: #f1f1f1 !important;
  color: #94a3b8 !important;
  opacity: 0.7 !important;
  cursor: not-allowed !important;
}

      `}</style>
    </div>
  );
}