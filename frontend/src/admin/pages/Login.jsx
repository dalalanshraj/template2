import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/admin/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      // Save token
      localStorage.setItem("token", res.data.token);

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
        })
      );

      // Redirect
      navigate("/admin/dashboard");
    } catch (err) {
      console.log(err);

      setError(
        err.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] w-full bg-gradient-to-br from-indigo-100 via-slate-100 to-purple-100 px-4 py-6 sm:px-6 sm:py-8 flex items-center justify-center overflow-x-hidden">

      <form
        onSubmit={submit}
        className="
          w-full
          max-w-md
          bg-white/70
          backdrop-blur-xl
          border border-white/60
          rounded-2xl
          shadow-2xl
          p-5
          sm:p-7
          md:p-8
        "
      >
        {/* Header */}
        <div className="text-center mb-5 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Owner Log In
          </h2>

          <p className="text-gray-500 text-xs sm:text-sm mt-1.5">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            className="
              bg-red-100/80
              border border-red-200
              text-red-600
              px-3
              sm:px-4
              py-2.5
              sm:py-3
              rounded-lg
              mb-4
              text-xs
              sm:text-sm
              leading-5
              break-words
            "
          >
            {error}
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            className="
              w-full
              h-11
              sm:h-12
              px-3
              sm:px-4
              bg-white/80
              border
              border-gray-300
              rounded-lg
              text-sm
              sm:text-base
              text-gray-800
              placeholder:text-gray-400
              outline-none
              focus:ring-2
              focus:ring-indigo-500
              focus:border-indigo-500
              transition
            "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            className="
              w-full
              h-11
              sm:h-12
              px-3
              sm:px-4
              bg-white/80
              border
              border-gray-300
              rounded-lg
              text-sm
              sm:text-base
              text-gray-800
              placeholder:text-gray-400
              outline-none
              focus:ring-2
              focus:ring-indigo-500
              focus:border-indigo-500
              transition
            "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className={`
            w-full
            min-h-11
            sm:min-h-12
            px-4
            py-2.5
            rounded-xl
            text-white
            text-sm
            sm:text-base
            font-semibold
            transition
            active:scale-[0.98]
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }
          `}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Secure text */}
        <p className="text-center text-xs sm:text-sm text-gray-500 mt-5 sm:mt-6">
          Secure Owner Dashboard
        </p>

        {/* Footer */}
        <div className="mt-1 pt-4 border-t border-white/60 text-center">
          

          <div className="flex justify-center">
            <img
              src="/blackLOGO.webp"
              alt="Digify America"
              className="
                h-8
                sm:h-9
                md:h-10
                w-auto
                max-w-[160px]
                object-contain
              "
            />
          </div>

          <p className="text-[10px] sm:text-[11px] text-gray-400 mt-2 leading-4">
            Powered by{" "}
            <a
              href="https://www.digifyamerica.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 hover:text-indigo-600 transition"
            >
              Digify America
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;