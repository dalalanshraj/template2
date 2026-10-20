import { useEffect, useState } from "react";
import api from "../../api/axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  FaBuilding,
  FaEnvelope,
  FaStar,
  FaClock,
  FaArrowRight,
  FaChartLine,
  FaChartPie,
} from "react-icons/fa";

// ============================================================
// COLORS
// ============================================================

const COLORS = ["#6366f1", "#06b6d4"];

// ============================================================
// DASHBOARD
// ============================================================

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ==========================================================
  // FETCH DASHBOARD
  // ==========================================================

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/bookings/admin/dashboard");

        console.log("DASHBOARD RESPONSE 👉", res.data);

        setStats(res.data);
      } catch (err) {
        console.error("DASHBOARD ERROR 👉", err);

        setError(
          err.response?.data?.message ||
            "Unable to load dashboard."
        );
      }
    };

    fetchDashboard();
  }, []);

  // ==========================================================
  // LOADING
  // ==========================================================

  if (!stats && !error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4">
          <div
            className="
              w-10
              h-10
              sm:w-12
              sm:h-12
              border-4
              border-blue-100
              border-t-blue-600
              rounded-full
              animate-spin
            "
          />

          <p className="text-xs sm:text-sm text-slate-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================================
  // ERROR
  // ==========================================================

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6">
        <div
          className="
            w-full
            max-w-md
            bg-white
            border
            border-red-100
            rounded-2xl
            sm:rounded-3xl
            p-5
            sm:p-8
            text-center
            shadow-sm
          "
        >
          <div
            className="
              w-12
              h-12
              sm:w-14
              sm:h-14
              mx-auto
              rounded-2xl
              bg-red-50
              text-red-500
              flex
              items-center
              justify-center
            "
          >
            <FaClock size={20} />
          </div>

          <h2 className="mt-4 sm:mt-5 text-lg sm:text-xl font-bold text-slate-800">
            Dashboard unavailable
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-5">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="
              mt-5
              sm:mt-6
              px-5
              py-2.5
              sm:py-3
              rounded-xl
              bg-blue-600
              hover:bg-blue-700
              text-white
              text-sm
              font-semibold
              transition
            "
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ==========================================================
  // PIE DATA
  // ==========================================================

  const pieData = [
    {
      name: "Properties",
      value: Number(stats.totalListing || 0),
    },
    {
      name: "Inquiry",
      value: Number(stats.totalInquiry || 0),
    },
  ];

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <div className="w-full min-h-screen bg-slate-50">

      {/* 
        Important:
        pb-24 on mobile gives space for bottom navigation.
        md:pb-6 removes the extra mobile spacing on desktop.
      */}
      <div
        className="
          w-full
          max-w-7xl
          mx-auto
          px-3
          sm:px-4
          md:px-6
          lg:px-8
          py-4
          sm:py-5
          lg:py-6
          pb-24
          md:pb-6
        "
      >

        {/* ==================================================
            HEADER
        =================================================== */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
            sm:gap-5
            mb-5
            sm:mb-6
          "
        >
          {/* Heading */}
          <div className="min-w-0">
            <div className="flex items-center gap-3">

              <div
                className="
                  w-10
                  h-10
                  sm:w-12
                  sm:h-12
                  shrink-0
                  rounded-xl
                  sm:rounded-2xl
                  bg-[#047edf]
                  text-white
                  flex
                  items-center
                  justify-center
                  shadow-lg
                  shadow-blue-200
                "
              >
                <FaChartLine
                  size={18}
                  className="sm:w-[21px] sm:h-[21px]"
                />
              </div>

              <div className="min-w-0">

                <h1
                  className="
                    text-xl
                    sm:text-2xl
                    md:text-3xl
                    font-bold
                    text-slate-900
                    leading-tight
                  "
                >
                  Dashboard Overview
                </h1>

                <p
                  className="
                    text-xs
                    sm:text-sm
                    text-slate-500
                    mt-1
                    leading-5
                    max-w-xl
                  "
                >
                  Welcome back. Here's what's happening
                  with your business.
                </p>

              </div>
            </div>
          </div>

          {/* STATUS */}
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
              bg-white
              border
              border-slate-200
              shadow-sm
              w-fit
              shrink-0
            "
          >
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500" />

            <span className="text-xs sm:text-sm font-semibold text-slate-700">
              System Active
            </span>
          </div>
        </div>

        {/* ==================================================
            MAIN STAT CARDS
        =================================================== */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-4
            sm:gap-5
          "
        >
          <StatCard
            title="Properties"
            value={stats.totalListing}
            icon={<FaBuilding />}
            gradient="from-[#ffbf96] to-[#fe7096]"
            description="Total properties"
            onClick={() =>
              navigate("/admin/listings")
            }
          />

          <StatCard
            title="Inquiry"
            value={stats.totalInquiry}
            icon={<FaEnvelope />}
            gradient="from-[#90caf9] to-[#047edf]"
            description="Total inquiries"
            onClick={() =>
              navigate("/admin/inquiries")
            }
          />
        </div>

        {/* ==================================================
            REVIEW STATS
        =================================================== */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-4
            sm:gap-5
            mt-4
            sm:mt-5
          "
        >
          <MiniStat
            title="Total Reviews"
            value={stats.totalReviews}
            icon={<FaStar />}
            iconBg="bg-amber-50"
            iconColor="text-amber-500"
            description="Reviews received"
            onClick={() =>
              navigate("/admin/listings")
            }
          />

          <MiniStat
            title="Pending Reviews"
            value={stats.pendingReviews}
            icon={<FaClock />}
            iconBg="bg-orange-50"
            iconColor="text-orange-500"
            description="Waiting for approval"
            onClick={() =>
              navigate("/admin/listings")
            }
          />
        </div>

        {/* ==================================================
            CHARTS
        =================================================== */}

        <div className="grid grid-cols-1 gap-4 sm:gap-5 mt-4 sm:mt-5">

          {/* =================================================
              PIE CHART
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            className="
              w-full
              bg-white
              border
              border-slate-200
              rounded-2xl
              sm:rounded-3xl
              shadow-sm
              overflow-hidden
            "
          >

            {/* Chart Header */}
            <div
              className="
                p-4
                sm:p-5
                md:p-6
                border-b
                border-slate-100
              "
            >
              <div className="flex items-center gap-3">

                <div
                  className="
                    w-9
                    h-9
                    sm:w-10
                    sm:h-10
                    shrink-0
                    rounded-xl
                    bg-indigo-50
                    text-indigo-600
                    flex
                    items-center
                    justify-center
                  "
                >
                  <FaChartPie size={16} />
                </div>

                <div className="min-w-0">

                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Dashboard Distribution
                  </h3>

                  <p className="text-[11px] sm:text-xs text-slate-500 mt-1">
                    Properties and inquiries overview
                  </p>

                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="p-3 sm:p-5 md:p-6">

              <div className="w-full h-[230px] sm:h-[270px] md:h-[300px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <PieChart>

                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius="45%"
                      outerRadius="68%"
                      paddingAngle={5}
                      stroke="none"
                    >
                      {pieData.map(
                        (entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index]}
                          />
                        )
                      )}
                    </Pie>

                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border:
                          "1px solid #e2e8f0",
                        boxShadow:
                          "0 10px 30px rgba(15,23,42,0.10)",
                        fontSize: "12px",
                      }}
                    />

                  </PieChart>
                </ResponsiveContainer>

              </div>

              {/* Legend */}
              <div
                className="
                  flex
                  flex-wrap
                  justify-center
                  gap-x-5
                  gap-y-3
                  mt-2
                "
              >
                {pieData.map(
                  (item, index) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-2"
                    >
                      <span
                        className="
                          w-2.5
                          h-2.5
                          sm:w-3
                          sm:h-3
                          rounded-full
                        "
                        style={{
                          backgroundColor:
                            COLORS[index],
                        }}
                      />

                      <span className="text-xs sm:text-sm text-slate-600">
                        {item.name}
                      </span>

                      <span className="text-xs sm:text-sm font-bold text-slate-900">
                        {item.value}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// STAT CARD
// ============================================================

const StatCard = ({
  title,
  value,
  icon,
  gradient,
  description,
  onClick,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.25,
      }}
      onClick={onClick}
      className={`
        relative
        overflow-hidden
        min-h-[175px]
        sm:min-h-[190px]
        bg-gradient-to-br
        ${gradient}
        rounded-2xl
        sm:rounded-3xl
        p-4
        sm:p-5
        md:p-6
        text-white
        shadow-xl
        cursor-pointer
        group
      `}
    >

      {/* Decoration */}
      <div
        className="
          absolute
          -right-10
          -top-10
          w-32
          h-32
          sm:w-40
          sm:h-40
          rounded-full
          bg-white/10
        "
      />

      <div
        className="
          absolute
          -right-16
          -bottom-20
          w-40
          h-40
          sm:w-48
          sm:h-48
          rounded-full
          bg-white/5
        "
      />

      <div className="relative z-10 h-full flex flex-col">

        <div className="flex items-start justify-between">

          <div
            className="
              w-10
              h-10
              sm:w-12
              sm:h-12
              rounded-xl
              sm:rounded-2xl
              bg-white/15
              backdrop-blur-sm
              flex
              items-center
              justify-center
              text-lg
              sm:text-xl
            "
          >
            {icon}
          </div>

          <div
            className="
              w-8
              h-8
              sm:w-9
              sm:h-9
              rounded-lg
              sm:rounded-xl
              bg-white/10
              flex
              items-center
              justify-center
              group-hover:bg-white/20
              transition
            "
          >
            <FaArrowRight size={12} />
          </div>
        </div>

        <p className="mt-auto pt-5 text-xs sm:text-sm font-medium text-white/75">
          {title}
        </p>

        <h2 className="text-3xl sm:text-4xl font-bold mt-1">
          {value ?? 0}
        </h2>

        <p className="text-[11px] sm:text-xs text-white/65 mt-1.5">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// ============================================================
// MINI STAT
// ============================================================

const MiniStat = ({
  title,
  value,
  icon,
  iconBg,
  iconColor,
  description,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      onClick={onClick}
      className="
        bg-white
        border
        border-slate-200
        rounded-2xl
        sm:rounded-3xl
        p-4
        sm:p-5
        md:p-6
        shadow-sm
        hover:shadow-lg
        cursor-pointer
        transition
      "
    >
      <div className="flex items-center justify-between gap-4">

        <div className="min-w-0">

          <p className="text-xs sm:text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            {value ?? 0}
          </h2>

          <p className="text-[11px] sm:text-xs text-slate-400 mt-1.5">
            {description}
          </p>

        </div>

        <div
          className={`
            shrink-0
            w-10
            h-10
            sm:w-12
            sm:h-12
            rounded-xl
            sm:rounded-2xl
            ${iconBg}
            ${iconColor}
            flex
            items-center
            justify-center
          `}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;