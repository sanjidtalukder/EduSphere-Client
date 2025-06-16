import React from "react";
import { Link } from "react-router-dom";
import BackgroundWrapper from "./BackgroundWrapper";
import Lottie from "lottie-react";
// import BackgroundWrapper from "../../components/BackgroundWrapper";
import homeBgAnimation from "../assets/home-bg-lottie.json";
// import LottieBackground from "../../components/LottieBackground";
import heroBg from "../assets/hero-bg.json";
import LottieBackground from "./LottieBackground";
const AboutUs = () => {
  return (
    <BackgroundWrapper>
      {/* Hero Section */}
     <div className="relative overflow-hidden rounded-3xl shadow-xl">
  {/*  Lottie Background */}
  <LottieBackground animationData={heroBg} opacity={0.3} />

  {/*  Overlay (optional but makes text more readable) */}
  <div className="absolute inset-0 bg-black/30 z-0" />

  {/*  Foreground Content */}
  <div className="relative z-10 text-white py-20 px-6 md:px-16 text-center">
    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
      Welcome to <span className="text-yellow-300">EduSphere</span>
    </h1>
    <p className="text-lg md:text-2xl max-w-3xl mx-auto mb-8 drop-shadow-md">
      Empowering minds through knowledge sharing.<br className="hidden md:block" />
      Write, read, and grow with a vibrant learning community.
    </p>
    <Link to="/all-articles">
      <button className="bg-white text-blue-700 hover:bg-blue-100 transition-all duration-300 py-3 px-8 rounded-full font-semibold shadow-md">
        🚀 Explore Articles
      </button>
    </Link>
  </div>
</div>



      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6   bg-opacity-90 rounded-xl shadow-lg mt-10">

         {/* 🔵 Animated Background */}
              <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-25 pointer-events-none">
                <Lottie animationData={homeBgAnimation} loop={true} />
              </div>
        
              {/* Main Content */}
              <div className="relative z-10 px-4 md:px-12 space-y-20 pt-10 pb-20"></div>

        {/* Mission */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-indigo-600 mb-4">🎯 Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            At EduSphere, we believe that everyone has something valuable to share. Our mission is to build an open and inclusive platform where learners, educators, and curious minds can express their ideas through meaningful content and connect with others.
          </p>
        </div>

        {/* What We Offer */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-indigo-600 mb-4">🌟 What We Offer</h2>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
            <li>✍️ Easy tools to publish and manage your articles</li>
            <li>📚 Explore a wide range of categories like Tech, Education, Health, and more</li>
            <li>💬 Engage with fellow writers and readers through comments and likes</li>
            <li>🔔 Get updates on trending topics and new knowledge</li>
          </ul>
        </div>

        {/* Team Intro */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-indigo-600 mb-4">🤝 Meet Our Team</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            We’re a passionate team of developers, educators, and curious minds working together to make learning accessible and impactful. Let’s introduce the people behind EduSphere.
          </p>
        </div>

        {/* Personal Introductions */}
        <div className="grid md:grid-cols-2 gap-8 mt-10">
          {/* Developer */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-indigo-600 mb-2">👨‍💻 Sanjid Talukder</h3>
            <p className="text-gray-700">
              Junior Web Developer from Dhaka, currently studying CSE at Dhaka International University. Passionate about building web applications that solve real-world problems. Sanjid is the developer of EduSphere, ensuring it's fast, friendly, and functional.
            </p>
          </div>

          {/* Client */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-indigo-600 mb-2">🤝 Client: Programming Hero</h3>
            <p className="text-gray-700">
              Programming Hero is the visionary client behind EduSphere. With a strong belief in the power of knowledge-sharing, they wanted a platform that helps people express themselves through articles and insights. Their ideas shaped the platform's core.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-indigo-100 rounded-xl p-8 text-center shadow-md mt-16">
          <h3 className="text-2xl font-bold text-indigo-700 mb-3">🚀 Start Your Journey Today!</h3>
          <p className="text-gray-700 text-lg mb-5">
            Whether you're here to learn or to teach, EduSphere welcomes you. Join us to make knowledge accessible and powerful.
          </p>
          <Link
            to="/register"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-indigo-700 transition"
          >
            Create Your Free Account
          </Link>
        </div>

        {/* Contact Info */}
        <div className="mt-16 text-center">
          <h4 className="text-xl font-semibold text-indigo-600 mb-2">📩 Contact Us</h4>
          <p className="text-gray-700">
            Have any questions or suggestions? Feel free to reach out at{" "}
            <a
              href="mailto:edusphere@gmail.com"
              className="text-indigo-500 underline font-medium"
            >
              edusphere@gmail.com
            </a>
          </p>

          <p className="mt-3">
            Or you can also fill out our{" "}
            <Link
              to="/contact-us"
              className="text-blue-600 font-semibold underline hover:text-blue-800 transition"
            >
              Contact Form
            </Link>
          </p>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default AboutUs;
