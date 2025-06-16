import React, { useState } from "react";
import { Link } from "react-router-dom";
import BackgroundWrapper from "./BackgroundWrapper";
import Lottie from "lottie-react";
import homeBgAnimation from "../assets/home-bg-lottie.json";
import { FiChevronDown, FiChevronUp, FiHelpCircle } from "react-icons/fi";

const faqs = [
  {
    question: "What is EduSphere?",
    answer:
      "EduSphere is an article-sharing web platform where learners, educators, and curious minds can write, publish, and explore valuable content across various topics.",
  },
  {
    question: "Can I write and publish my own articles?",
    answer:
      "Absolutely! Once you create an account, you can easily write, edit, and publish your own articles through your dashboard.",
  },
  {
    question: "What topics can I write about?",
    answer:
      "EduSphere welcomes articles on a wide range of topics – including technology, education, lifestyle, health, personal growth, and more.",
  },
  {
    question: "Is EduSphere free to use?",
    answer:
      "Yes! EduSphere is completely free. You can register, write, and read articles without any cost.",
  },
  {
    question: "Is my data and article content secure?",
    answer:
      "Yes. We use secure authentication and follow best practices to keep your data and content safe.",
  },
  {
    question: "How can I contact the EduSphere team?",
    answer:
      "You can reach out to us anytime at edusphere@gmail.com — we’d love to hear your thoughts!",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [userQuestion, setUserQuestion] = useState({ name: "", question: "" });
  const [thanks, setThanks] = useState(false);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleUserChange = (e) => {
    setUserQuestion({ ...userQuestion, [e.target.name]: e.target.value });
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    setThanks(true);
    setUserQuestion({ name: "", question: "" });
    setTimeout(() => setThanks(false), 4000);
  };

  return (
    <BackgroundWrapper>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        {/* Animated Background */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-20 pointer-events-none hidden sm:block">
          <Lottie animationData={homeBgAnimation} loop={true} />
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-indigo-600 mb-10 flex items-center justify-center gap-3">
          <FiHelpCircle size={36} />
          Frequently Asked Questions
        </h2>

        {/* FAQ List */}
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow rounded-xl"
            >
              <button
                onClick={() => toggleAnswer(index)}
                className="w-full px-6 py-4 flex justify-between items-center"
              >
                <span className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-100 text-left">
                  {faq.question}
                </span>
                <span className="text-indigo-600">
                  {openIndex === index ? (
                    <FiChevronUp size={20} />
                  ) : (
                    <FiChevronDown size={20} />
                  )}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Ask a Question */}
        <div className="mt-14">
          <h3 className="text-2xl font-semibold text-center text-gray-800 dark:text-black mb-2">
            Can’t find your question?
          </h3>
          <p className="text-center text-gray-800 dark:text-gray-800 mb-6 text-sm sm:text-base">
            Ask us anything. We’ll try our best to respond quickly.
          </p>

          {thanks && (
            <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-6 py-3 rounded mb-6 text-center animate-pulse">
               Thanks! Your question has been received.
            </div>
          )}

          <form
            onSubmit={handleUserSubmit}
            className="max-w-xl mx-auto flex flex-col gap-4"
          >
            <input
              type="text"
              name="name"
              value={userQuestion.name}
              onChange={handleUserChange}
              placeholder="Your Name"
              required
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <textarea
              name="question"
              value={userQuestion.question}
              onChange={handleUserChange}
              placeholder="Type your question here..."
              rows={4}
              required
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
            ></textarea>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-full transition w-full"
            >
              Submit Your Question
            </button>
          </form>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-700 dark:text-gray-700 mb-4">
            Still need help? Contact us directly!
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
