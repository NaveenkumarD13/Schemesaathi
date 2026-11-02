import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const schemes = [
  {
    title: "PM Kisan Samman Nidhi",
    category: "Agriculture",
    description:
      "Financial assistance for eligible farmers to support agricultural needs.",
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Ayushman Bharat",
    category: "Healthcare",
    description:
      "Health insurance coverage for eligible families across India.",
    color: "bg-red-100 text-red-700",
  },
  {
    title: "PM Awas Yojana",
    category: "Housing",
    description:
      "Affordable housing scheme for economically weaker sections.",
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "PM Mudra Yojana",
    category: "Business",
    description:
      "Collateral-free loans for small businesses and entrepreneurs.",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    title: "Skill India",
    category: "Education",
    description:
      "Skill development and vocational training opportunities for youth.",
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "Startup India",
    category: "Startup",
    description:
      "Support, funding, and benefits for innovative startups.",
    color: "bg-emerald-100 text-emerald-700",
  },
];

const PopularSchemesSection = () => {
  return (
    <section  id="schemes" className="bg-gradient-to-b from-green-50 to-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Featured Schemes
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
            Popular Government Schemes
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Explore some of the most widely used government schemes
            across agriculture, healthcare, housing, education,
            business, and startups.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {schemes.map((scheme, index) => (

            <motion.div
              key={scheme.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="rounded-3xl border border-green-100 bg-white p-8 shadow-lg transition-all duration-300 hover:border-green-300 hover:shadow-2xl"
            >
              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${scheme.color}`}
              >
                {scheme.category}
              </span>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                {scheme.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                {scheme.description}
              </p>

              <Link
                to="/schemes"
                className="mt-8 inline-flex items-center gap-2 font-semibold text-green-600 transition hover:gap-3"
              >
                View Details
                <ArrowRight size={18} />
              </Link>
            </motion.div>

          ))}

        </div>

        {/* Button */}

        <div className="mt-16 text-center">

          <Link
            to="/schemes"
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700"
          >
            Explore All Schemes

            <ArrowRight size={20} />

          </Link>

        </div>

      </div>
    </section>
  );
};

export default PopularSchemesSection;