import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to EduSphere</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Empowering minds through knowledge sharing. Write, read, and grow with a vibrant learning community.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Mission */}
        <div className="mb-12">
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

        {/* CTA */}
        <div className="bg-indigo-100 rounded-xl p-8 text-center shadow-md mt-16">
          <h3 className="text-2xl font-bold text-indigo-700 mb-3">🚀 Start Your Journey Today!</h3>
          <p className="text-gray-700 text-lg mb-5">
            Whether you're here to learn or to teach, EduSphere welcomes you. Join us to make knowledge accessible and powerful.
          </p>
          <a
            href="/register"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-indigo-700 transition"
          >
            Create Your Free Account
          </a>
        </div>

        {/* Contact Info */}
        <div className="mt-16 text-center">
          <h4 className="text-xl font-semibold text-indigo-600 mb-2">📩 Contact Us</h4>
          <p className="text-gray-700">
            Have any questions or suggestions? Feel free to reach out at{" "}
            <a
              href="mailto:contact@edusphere.com"
              className="text-indigo-500 underline font-medium"
            >
              edusphere@gmail.com
            </a>
          </p>

          {/* Link to Contact Us Page */}
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
    </div>
  );
};

export default AboutUs;
