import { useState } from "react";
import BackgroundWrapper from "./BackgroundWrapper";
import Lottie from "lottie-react";
import homeBgAnimation from "../assets/home-bg-lottie.json";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✉️ API call or storage logic here
    setSuccess(true);

    // 🔄 Reset form
    setFormData({ name: "", email: "", message: "" });

    // ✅ Hide message after 5 seconds
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <BackgroundWrapper>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-xl mt-10 backdrop-blur-md">
        {/* 🎉 Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 rounded shadow-md transition-all duration-300">
            ✅ Thank you for reaching out! We’ll get back to you shortly.
          </div>
        )}

        <h2 className="text-3xl font-bold mb-8 text-center text-blue-800 dark:text-blue-300">
          📩 Contact Us
        </h2>

        {/* 🔁 Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Full Name"
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Message
            </label>
            <textarea
              name="message"
              rows="5"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-md transition-all duration-300 shadow-md"
            >
              📤 Send Message
            </button>
          </div>
        </form>
      </div>

      {/* 🔵 Animated Background */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-20 pointer-events-none">
        <Lottie animationData={homeBgAnimation} loop />
      </div>
    </BackgroundWrapper>
  );
};

export default ContactUs;
