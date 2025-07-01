import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackgroundWrapper from "./BackgroundWrapper";
import Lottie from "lottie-react";
import homeBgAnimation from "../assets/home-bg-lottie.json";
import { motion, AnimatePresence } from "framer-motion";
import { FaBookOpen, FaSearch } from "react-icons/fa";

const SkeletonCard = () => (
  <div className="bg-white bg-opacity-70 p-6 rounded-2xl shadow animate-pulse space-y-4">
    <div className="h-6 bg-gray-300 rounded w-3/4" />
    <div className="h-4 bg-gray-300 rounded w-full" />
    <div className="h-4 bg-gray-300 rounded w-5/6" />
    <div className="flex items-center gap-4 mt-6">
      <div className="w-12 h-12 bg-gray-300 rounded-full" />
      <div className="space-y-2">
        <div className="h-3 bg-gray-300 rounded w-24" />
        <div className="h-2 bg-gray-200 rounded w-16" />
      </div>
    </div>
    <div className="h-8 bg-gray-300 rounded w-28 mt-4 ml-auto" />
  </div>
);

const AllArticels = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    setLoading(true);
    fetch("https://my-edu-sphere-server-ten.vercel.app/articles")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      });
  }, []);

  const filteredAndSortedArticles = articles
    .filter((article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "newest") return new Date(b.date) - new Date(a.date);
      if (sortOption === "oldest") return new Date(a.date) - new Date(b.date);
      if (sortOption === "az") return a.title.localeCompare(b.title);
      if (sortOption === "za") return b.title.localeCompare(a.title);
      return 0;
    });

  return (
    <BackgroundWrapper>
      {/* Animated Background */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-25 pointer-events-none">
        <Lottie animationData={homeBgAnimation} loop />
      </div>

      <div className="relative z-10 px-4 pt-16 sm:px-6 md:px-12 min-h-screen pb-20">
        
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-blue-900 text-center drop-shadow-sm flex items-center justify-center gap-2">
  <FaBookOpen className="text-blue-700" />
  Explore All Articles
</h2>


        {/* 🔍 Search + Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          {/* Search Bar */}
          <div className="w-full sm:w-1/2 flex rounded-full overflow-hidden border border-blue-200 focus-within:ring-2 focus-within:ring-blue-500">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // Optional: could add logging or analytics here
                }
              }}
              className="flex-1 px-4 py-2 focus:outline-none text-primary"
            />
            <button
              onClick={() => {}}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 flex items-center justify-center"
            >
              <FaSearch className="text-sm" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-4 py-2 border text-primary border-blue-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="az">Title A-Z</option>
            <option value="za">Title Z-A</option>
          </select>
        </div>

        {/* Article List */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredAndSortedArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            <AnimatePresence>
              {filteredAndSortedArticles.map((article, index) => (
                <motion.div
                  key={article._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-blue-100 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-xl font-bold text-blue-800 mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {article.content?.slice(0, 100)}...
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-auto pt-4">
                    <img
                      src={article.thumbnail}
                      alt={article.author_name}
                      className="w-12 h-12 rounded-full object-cover border border-blue-200"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {article.author_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(article.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 text-right">
                    <Link to={`/articles/${article._id}`}>
                      <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-5 rounded-full transition-all duration-300">
                        Read More →
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <p className="text-center text-gray-500">No articles found.</p>
        )}
      </div>
    </BackgroundWrapper>
  );
};

export default AllArticels;
