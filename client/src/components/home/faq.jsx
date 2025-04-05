import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

  const faqs = [
    {
      question: "How does Margdarshak work?",
      answer: "मार्गदर्शक helps you explore your strengths, identify goals, and access resources for career growth through assessments and expert guidance."
    },
    {
      question: "Is Margdarshak free to use?",
      answer: "Yes, the platform offers free resources and guidance. However, some premium features may require a subscription."
    },
    {
      question: "Can I connect with mentors on the platform?",
      answer: "Absolutely! Margdarshak allows you to connect with experienced mentors who can guide you on your journey."
    }
  ];

  return (
    <motion.section
      className=" py-16 px-5 max-w-7xl mx-auto md:px-10 lg:px-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
    >
      <h2 className=" text-3xl font-bold text-brand-navy mb-12">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="p-4 w-full rounded-lg border border-brand-blue shadow-sm bg-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="font-semibold text-brand-navy text-lg">
                {faq.question}
              </h3>
              {openIndex === index ? (
                <ChevronUp size={20} className="text-brand-orange" />
              ) : (
                <ChevronDown size={20} className="text-brand-blue" />
              )}
            </div>
            <div 
              className={`mt-2 overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="h-px w-full bg-brand-sky my-1"></div>
              <p className="text-gray-700 pt-2">{faq.answer}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default FAQ;