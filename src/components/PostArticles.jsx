import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";

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
      author_id: user?.uid, // Firebase UID
      author_name: user?.displayName, //  Author Name
      author_photo: user?.photoURL, //  Author Photo URL
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
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-center text-indigo-600">📝 Post a New Article</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Article Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <textarea
          name="content"
          rows="6"
          placeholder="Write your article content here..."
          value={formData.content}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="text"
          name="category"
          placeholder="Category (e.g. Tech, Health)"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={formData.tags}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="text"
          name="thumbnail"
          placeholder="Thumbnail Image URL"
          value={formData.thumbnail}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {/* User Info */}
        <div className="text-sm text-gray-600">
          <p>📧 <strong>Email:</strong> {user?.email}</p>
          <p>👤 <strong>Username:</strong> {user?.displayName}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300"
        >
          🚀 Publish Article
        </button>
      </form>
    </div>
  );
};

export default PostArticles;
