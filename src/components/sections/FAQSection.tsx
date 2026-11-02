import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is SchemeSaathi?",
    answer:
      "SchemeSaathi is an AI-powered platform that helps citizens discover government schemes based on their profile, eligibility, occupation, income, and state.",
  },
  {
    question: "Is SchemeSaathi free to use?",
    answer:
      "Yes. SchemeSaathi is completely free for users to explore government schemes, check eligibility, and access scheme details.",
  },
  {
    question: "Does SchemeSaathi include both Central and State Government schemes?",
    answer:
      "Yes. SchemeSaathi is designed to provide information about both Central Government and State Government schemes in one place.",
  },
  {
    question: "Can I check my eligibility before applying?",
    answer:
      "Yes. Our AI-powered eligibility checker analyzes your details and helps determine whether you meet the eligibility criteria for a scheme.",
  },
  {
    question: "Can I apply for schemes directly through SchemeSaathi?",
    answer:
      "Currently, SchemeSaathi helps you discover schemes and understand the application process. You will be redirected to the official government portal for submitting applications.",
  },
  {
    question: "How often is the scheme information updated?",
    answer:
      "Scheme information is updated regularly to ensure users have access to the latest government announcements, benefits, and eligibility criteria.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section  id="faq" className="bg-gradient-to-b from-white to-green-50 py-24">
      <div className="mx-auto max-w-4xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Frequently Asked Questions
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
            Got Questions?
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Find answers to the most common questions about SchemeSaathi and how it helps you discover government schemes.
          </p>
        </motion.div>

        {/* FAQ Items */}

        <div className="space-y-5">

          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.08,
                duration: 0.4,
              }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between p-6 text-left transition hover:bg-green-50"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {faq.question}
                </h3>

                <motion.div
                  animate={{
                    rotate: openIndex === index ? 180 : 0,
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <ChevronDown className="text-green-600" size={22} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 leading-7 text-slate-600">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default FAQSection;