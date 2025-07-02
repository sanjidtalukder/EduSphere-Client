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

  const [customCategory, setCustomCategory] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const article = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      email: user?.email,
      username: user?.displayName,
      date: new Date().toISOString(),
      author_id: user?.uid,
      author_name: user?.displayName,
      author_photo: user?.photoURL,
      thumbnail:
        formData.thumbnail.trim() === ""
          ? "/educational.png"
          : formData.thumbnail,
    };

    try {
      const res = await axios.post("https://my-edu-sphere-server-ten.vercel.app/articles", article);
      if (res.data.insertedId || res.data.success) {
        toast.success("Article posted successfully!");
        setFormData({
          title: "",
          content: "",
          category: "",
          tags: "",
          thumbnail: "",
        });
        setCustomCategory(false);
      }
    } catch (error) {
      toast.error("Failed to post article");
      console.error(error);
    }
  };

  return (
    <BackgroundWrapper>
      <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-20 pointer-events-none">
        <Lottie animationData={homeBgAnimation} loop={true} />
      </div>

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

          {/*  Category Select + Optional Input */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={(e) => {
                const value = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  category: value,
                }));
                setCustomCategory(value === "Other");
              }}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Finance"> Finance</option>
              <option value="Flower"> Flower</option>
              <option value="Love"> Love</option>
              <option value="Loves"> Loves</option>
              <option value="Science"> Science</option>
              <option value="Sports">Sports</option>
              <option value="Other"> Other (Write your own)</option>
            </select>

            {customCategory && (
              <input
                type="text"
                name="category"
                placeholder="Write your own category"
                value={formData.category}
                onChange={handleChange}
                className="mt-3 w-full p-3 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            )}
          </div>

          {/* Tags */}
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma-separated)"
            value={formData.tags}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          {/*  Thumbnail */}
          <input
            type="text"
            name="thumbnail"
            placeholder="Thumbnail Image URL"
            value={formData.thumbnail}
            onChange={handleChange}
            onBlur={() => {
              if (formData.thumbnail.trim() === "") {
                setFormData((prev) => ({
                  ...prev,
                  thumbnail: "/educational.png",
                }));
              }
            }}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          {/* Read-only user info */}
          <div className="text-sm text-gray-600 mt-4 space-y-1">
            <p>📧 <strong>Email:</strong> {user?.email}</p>
            <p>👤 <strong>Username:</strong> {user?.displayName}</p>
          </div>

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
