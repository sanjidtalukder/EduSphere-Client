import React, { useState } from "react";
import { Link } from "react-router-dom";
import BackgroundWrapper from "./BackgroundWrapper";
import Lottie from "lottie-react";
import homeBgAnimation from "../assets/home-bg-lottie.json";

const faqs = [
  {
    question: "❓ What is EduSphere?",
    answer:
      "EduSphere is an article-sharing web platform where learners, educators, and curious minds can write, publish, and explore valuable content across various topics.",
  },
  {
    question: "📝 Can I write and publish my own articles?",
    answer:
      "Absolutely! Once you create an account, you can easily write, edit, and publish your own articles through your dashboard.",
  },
  {
    question: "📂 What topics can I write about?",
    answer:
      "EduSphere welcomes articles on a wide range of topics – including technology, education, lifestyle, health, personal growth, and more.",
  },
  {
    question: "👥 Is EduSphere free to use?",
    answer:
      "Yes! EduSphere is completely free. You can register, write, and read articles without any cost.",
  },
  {
    question: "🔒 Is my data and article content secure?",
    answer:
      "Yes. We use secure authentication and follow best practices to keep your data and content safe.",
  },
  {
    question: "📧 How can I contact the EduSphere team?",
    answer:
      "You can reach out to us anytime at contact@edusphere.com — we’d love to hear your thoughts!",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <BackgroundWrapper>
 <div className="max-w-5xl mx-auto px-6 py-16">
  {/* 🔵 Animated Background */}
                <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-25 pointer-events-none">
                  <Lottie animationData={homeBgAnimation} loop={true} />
                </div>
          
                {/* Main Content */}
                <div className="relative z-10 px-4 md:px-12 space-y-20 pt-10 pb-20"></div>
      <h2 className="text-4xl md:text-5xl font-bold text-center text-indigo-600 mb-12">
        🤔 Frequently Asked Questions
      </h2>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 shadow-sm rounded-xl transition hover:shadow-lg"
          >
            <button
              onClick={() => toggleAnswer(index)}
              className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
            >
              <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
              <span className="text-2xl text-indigo-600">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-700 text-base leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Call to Action */}
     

<div className="mt-16 text-center">
  <p className="text-lg text-gray-700 mb-4">
    Still have questions? We're here to help!
  </p>
  <Link
    to="/contact-us"
    className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-indigo-700 transition"
  >
    Contact Us
  </Link>
</div>

    </div>
    </BackgroundWrapper>
   
  );
};

export default FaqSection;
