import { useState } from "react";
import BackgroundWrapper from "./BackgroundWrapper";
import Lottie from "lottie-react";
import homeBgAnimation from "../assets/home-bg-lottie.json";


const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    // call the  API 
    setSuccess(true);

    // resate the form
    setFormData({ name: "", email: "", message: "" });

    // all message will be deleted withen the 5
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <BackgroundWrapper>
 <div className="max-w-3xl mx-auto p-6  rounded-md shadow-md mt-10">

  
           {/* 🔵 Animated Background */}
                <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-25 pointer-events-none">
                  <Lottie animationData={homeBgAnimation} loop={true} />
                </div>
          
                {/* Main Content */}
                <div className="relative z-10 px-4 md:px-12 space-y-20 pt-10 pb-20"></div>

      <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-700">Contact Us</h2>

      {success && (
        <div className="mb-6 p-4 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded">
          Thank you for reaching out! We will get back to you soon.
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <label className="flex flex-col">
          <span className="mb-1 text-gray-700 dark:text-gray-600 font-medium">Name</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your full name"
            className="rounded border border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 text-gray-700 dark:text-gray-600 font-medium">Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your.email@example.com"
            className="rounded border border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 text-gray-700 dark:text-gray-600 font-medium">Message</span>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Write your message here..."
            rows={5}
            className="rounded border border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition"
        >
          Send Message
        </button>
      </form>
    </div>
    </BackgroundWrapper>
   
  );
};

export default ContactUs;
