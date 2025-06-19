import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "react-modal";
import BackgroundWrapper from "./BackgroundWrapper";
import Lottie from "lottie-react";
import homeBgAnimation from "../assets/home-bg-lottie.json";

Modal.setAppElement("#root");

const MyArticles = () => {
  const { user } = useContext(AuthContext);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    thumbnail: "",
  });

  useEffect(() => {
    if (!user) return;
    fetchArticles();
  }, [user]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://hobbyhub-server-delta.vercel.app/articles?author_id=${user.uid}`);
      setArticles(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch articles");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col space-y-2">
          <p>Are you sure you want to delete this article?</p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                axios.delete(`https://hobbyhub-server-delta.vercel.app/articles/${id}`)
                  .then(() => {
                    setArticles((prev) => prev.filter((art) => art._id !== id));
                    toast.success("Article deleted successfully");
                    toast.dismiss(t.id);
                  })
                  .catch(() => toast.error("Failed to delete article"));
              }}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition"
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
        style: {
          minWidth: "300px",
        },
      }
    );
  };

  const openUpdateModal = (article) => {
    setCurrentArticle(article);
    setFormData({
      title: article.title || "",
      content: article.content || "",
      category: article.category || "",
      tags: (article.tags && article.tags.join(", ")) || "",
      thumbnail: article.thumbnail || "",
    });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentArticle(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { _id } = currentArticle;

      const updatedArticle = {
        title: formData.title,
        content: formData.content,
        category: formData.category,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
        thumbnail: formData.thumbnail,
      };

      await axios.put(`https://hobbyhub-server-delta.vercel.app/articles/${_id}`, updatedArticle);
      toast.success("Article updated successfully");

      setArticles((prev) =>
        prev.map((art) => (art._id === _id ? { ...art, ...updatedArticle } : art))
      );
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update article");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <span className="ml-4 text-indigo-600 font-semibold text-lg">Loading your articles...</span>
      </div>
    );
  }

  return (
    <BackgroundWrapper>
      <div className="relative">
        {/* 🔵 Animated Background */}
        <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-25 pointer-events-none">
          <Lottie animationData={homeBgAnimation} loop={true} />
        </div>

        <div className="max-w-6xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 py-8 bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl shadow-xl">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-indigo-600 tracking-wide">📝 My Articles</h2>

          {articles.length === 0 ? (
            <p className="text-center text-gray-100 italic text-lg">You haven’t posted any articles yet. Start sharing your knowledge!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto border border-gray-200 rounded-md shadow-sm text-sm md:text-base">
                <thead className="bg-indigo-50">
                  <tr>
                    <th className="border-b border-gray-300 px-3 md:px-5 py-3 text-left text-indigo-700 font-semibold">Title</th>
                    <th className="border-b border-gray-300 px-3 md:px-5 py-3 text-left text-indigo-700 font-semibold">Category</th>
                    <th className="border-b border-gray-300 px-3 md:px-5 py-3 text-left text-indigo-700 font-semibold">Tags</th>
                    <th className="border-b border-gray-300 px-3 md:px-5 py-3 text-center text-indigo-700 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article) => (
                    <tr
                      key={article._id}
                      className="hover:bg-indigo-50 transition cursor-pointer"
                      title={article.title}
                    >
                      <td className="border-b border-gray-200 px-3 md:px-5 py-3 max-w-xs truncate">{article.title}</td>
                      <td className="border-b border-gray-200 px-3 md:px-5 py-3">{article.category}</td>
                      <td className="border-b border-gray-200 px-3 md:px-5 py-3">
                        {article.tags?.map((tag, i) => (
                          <span
                            key={i}
                            className="inline-block bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </td>
                      <td className="border-b border-gray-200 px-3 md:px-5 py-3 text-center space-x-2">
                        <button
                          onClick={() => openUpdateModal(article)}
                          className="bg-indigo-600 text-white px-3 md:px-4 py-1 rounded-md hover:bg-indigo-700 transition"
                          aria-label={`Update article ${article.title}`}
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(article._id)}
                          className="bg-red-600 text-white px-3 md:px-4 py-1 rounded-md hover:bg-red-700 transition"
                          aria-label={`Delete article ${article.title}`}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Update Modal */}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Update Article"
            overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"
            className="bg-white dark:bg-gray-600 text-white rounded-xl shadow-xl max-w-lg  w-full p-6 md:p-8 mx-4 outline-none"
          >
            <h2 className="text-2xl md:text-3xl font-semibold  mb-6 text-indigo-600">Update Article</h2>
            <form onSubmit={handleUpdate} className="space-y-4 md:space-y-5">
              <input
                type="text"
                name="title"
                placeholder="Article Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
              <textarea
                name="content"
                rows="6"
                placeholder="Write your article content here..."
                value={formData.content}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none"
              />
              <input
                type="text"
                name="category"
                placeholder="Category (e.g. Tech, Health)"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
              <input
                type="text"
                name="tags"
                placeholder="Tags (comma-separated)"
                value={formData.tags}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
              <input
                type="text"
                name="thumbnail"
                placeholder="Thumbnail Image URL"
                value={formData.thumbnail}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 rounded border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
                >
                  Update Article
                </button>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default MyArticles;