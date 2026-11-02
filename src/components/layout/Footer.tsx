import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

import { Mail, Send } from "lucide-react";

import logo from "../../assets/logo/logo.jpeg";

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">

        {/* Top Grid */}

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}

          <div>

            <div className="mb-4 flex items-center gap-3">

              <img
                src={logo}
                alt="SchemeSathi"
                className="h-12 w-12 rounded-full"
              />

              <div>

                <h2 className="text-2xl font-bold text-green-400">
                  SchemeSathi
                </h2>

                <p className="text-xs text-slate-400">
                  AI Government Scheme Assistant
                </p>

              </div>

            </div>

            <p className="leading-7 text-slate-400">
              Empowering every citizen with AI-driven access to government
              schemes. Discover your benefits in seconds.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="mb-5 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/"
                  className="text-slate-400 transition hover:text-green-400"
                >
                  Home
                </Link>
              </li>

              <li>
                <a
                  href="#features"
                  className="text-slate-400 transition hover:text-green-400"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="#how-it-works"
                  className="text-slate-400 transition hover:text-green-400"
                >
                  How It Works
                </a>
              </li>

              <li>
                <a
                  href="#faq"
                  className="text-slate-400 transition hover:text-green-400"
                >
                  FAQ
                </a>
              </li>

            </ul>

          </div>

          {/* AI Tools */}

          <div>

            <h3 className="mb-5 text-lg font-semibold">
              AI Tools
            </h3>

            <ul className="space-y-3">

              <li className="text-slate-400 hover:text-green-400 transition cursor-pointer">
                AI Assistant
              </li>

              <li className="text-slate-400 hover:text-green-400 transition cursor-pointer">
                Eligibility Checker
              </li>

              <li className="text-slate-400 hover:text-green-400 transition cursor-pointer">
                Explore Schemes
              </li>

              <li className="text-slate-400 hover:text-green-400 transition cursor-pointer">
                Dashboard
              </li>

            </ul>

          </div>

          {/* Newsletter */}

          <div>

            <h3 className="mb-4 text-lg font-semibold">
              Stay Updated
            </h3>

            <p className="mb-5 text-slate-400">
              Subscribe to receive updates about newly launched government
              schemes.
            </p>

            <div className="flex overflow-hidden rounded-xl border border-slate-700">

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-slate-900 px-4 py-3 text-sm outline-none placeholder:text-slate-500"
              />

              <button
                className="bg-green-600 px-4 transition hover:bg-green-700"
              >
                <Send size={18} />
              </button>

            </div>

          </div>

        </div>

        {/* Divider */}

        <div className="my-10 border-t border-slate-800" />

        {/* Bottom */}

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

          <p className="text-sm text-slate-500">
            © 2026 SchemeSathi. Built with ❤️ using React, TypeScript &
            Tailwind CSS.
          </p>

          <div className="flex items-center gap-4">

            <a
              href="https://www.github.com/NaveenkumarD13"
              className="rounded-full bg-slate-900 p-3 transition hover:scale-110 hover:bg-green-600"
            >
<FaGithub size={20} />            </a>

            <a
              href="#"
              className="rounded-full bg-slate-900 p-3 transition hover:scale-110 hover:bg-green-600"
            >
              
<FaLinkedin size={20} />
            </a>

            <a
              href="#"
              className="rounded-full bg-slate-900 p-3 transition hover:scale-110 hover:bg-green-600"
            >


<FaInstagram size={20} />            </a>

            <a
              href="#"
              className="rounded-full bg-slate-900 p-3 transition hover:scale-110 hover:bg-green-600"
            >
<FaXTwitter size={20} />            </a>

            <a
              href="mailto:schemesathi@gmail.com"
              className="rounded-full bg-slate-900 p-3 transition hover:scale-110 hover:bg-green-600"
            >
              <Mail size={18} />
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;