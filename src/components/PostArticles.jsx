import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import BackgroundWrapper from "./BackgroundWrapper";
import Lottie from "lottie-react";
import homeBgAnimation from "../assets/home-bg-lottie.json";

const PostArticles = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    thumbnail: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const article = {
      ...formData,
      tags: formData.tags.split(",").map(tag => tag.trim()),
      email: user?.email,
      username: user?.displayName,
      date: new Date().toISOString(),
      author_id: user?.uid,
      author_name: user?.displayName,
      author_photo: user?.photoURL,
    };

    try {
      const res = await axios.post("http://localhost:5000/articles", article);
      if (res.data.insertedId || res.data.success) {
        toast.success("Article posted successfully!");
        setFormData({
          title: "",
          content: "",
          category: "",
          tags: "",
          thumbnail: "",
        });
      }
    } catch (error) {
      toast.error("Failed to post article");
      console.error(error);
    }
  };

  return (
    <BackgroundWrapper>
      {/* 🔵 Background Animation */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-20 pointer-events-none">
        <Lottie animationData={homeBgAnimation} loop={true} />
      </div>

      {/* 🔵 Main Content */}
      <div className="max-w-3xl mx-auto mt-10 px-4 sm:px-6 md:px-10 py-8 rounded-2xl shadow-md bg-white bg-opacity-90 backdrop-blur-md">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-indigo-700">
          📝 Post a New Article
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm sm:text-base">
          <input
            type="text"
            name="title"
            placeholder="Article Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <textarea
            name="content"
            rows="5"
            placeholder="Write your article content here..."
            value={formData.content}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
          />
          <input
            type="text"
            name="category"
            placeholder="Category (e.g. Tech, Health)"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma-separated)"
            value={formData.tags}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <input
            type="text"
            name="thumbnail"
            placeholder="Thumbnail Image URL"
            value={formData.thumbnail}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          {/* 🔵 User Info (readonly) */}
          <div className="text-sm text-gray-600 mt-4 space-y-1">
            <p>📧 <strong>Email:</strong> {user?.email}</p>
            <p>👤 <strong>Username:</strong> {user?.displayName}</p>
          </div>

          {/* 🔘 Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition duration-300 text-base font-medium"
          >
            🚀 Publish Article
          </button>
        </form>
      </div>
    </BackgroundWrapper>
  );
};

export default PostArticles;
