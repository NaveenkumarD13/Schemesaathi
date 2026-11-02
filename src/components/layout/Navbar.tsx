import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import logo from "../../assets/logo/logo.jpeg";

interface CurrentUser {
  name: string;
  email: string;
  password?: string;
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    // Check logged-in user
    const storedUser = localStorage.getItem("schemeSaathi_currentUser");

    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("schemeSaathi_currentUser");
        setCurrentUser(null);
      }
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("schemeSaathi_currentUser");
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-gray-200 bg-white/90 shadow-lg backdrop-blur-xl"
          : "bg-white/80 backdrop-blur-lg"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* ================= LOGO ================= */}

        <RouterLink to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="SchemeSaathi Logo"
            className="h-11 w-11 rounded-full"
          />

          <div>
            <h1 className="text-xl font-bold text-green-700">
              SchemeSaathi
            </h1>

            <p className="text-xs text-gray-500">
              AI Government Scheme Assistant
            </p>
          </div>
        </RouterLink>

        {/* ================= NAVIGATION ================= */}

        <ul className="hidden items-center gap-8 font-medium text-gray-700 md:flex">
          {[
            ["home", "Home"],
            ["features", "Features"],
            ["how-it-works", "How It Works"],
            ["schemes", "Schemes"],
            ["faq", "FAQ"],
          ].map(([to, label]) => (
            <li key={label}>
              <Link
                to={to}
                spy
                smooth
                offset={-80}
                duration={500}
                activeClass="text-green-600"
                className="cursor-pointer transition-all duration-300 hover:text-green-600"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ================= USER / AUTH SECTION ================= */}

        <div className="hidden items-center gap-4 md:flex">
          {currentUser ? (
            <>
              {/* Logged-in User */}

              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white shadow-md">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>

                <span className="font-medium text-gray-700">
                   {currentUser.name}
                </span>
              </div>

              {/* Logout */}

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl border border-gray-200 px-4 py-2.5 font-medium text-gray-700 transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login */}

              <RouterLink
                to="/login"
                className="font-medium text-gray-700 transition duration-300 hover:text-green-600"
              >
                Login
              </RouterLink>

              {/* Get Started */}

              <RouterLink
                to="/register"
                className="rounded-xl bg-green-600 px-5 py-2.5 font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-green-700 hover:shadow-lg active:scale-95"
              >
                Get Started
              </RouterLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;