import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TopContributors from "../../components/TopContributors";
import Lottie from "lottie-react";
import homeBgAnimation from "../../assets/home-bg-lottie.json";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import { Player } from "@lottiefiles/react-lottie-player";
import heroBg from "../../assets/hero-bg.json";
import LottieBackground from "../../components/LottieBackground";
import { motion, AnimatePresence } from "framer-motion";
import { FaBookOpen, FaFolderOpen, FaRocket, FaMedal } from "react-icons/fa";


const Home = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://my-edu-sphere-server-ten.vercel.app/articles/featured")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        const cats = [...new Set(data.map((item) => item.category))];
        setCategories(cats);
        setLoading(false);
      });
  }, []);

  return (
    <BackgroundWrapper>
      <div className="relative min-h-screen overflow-hidden">
        {/* Background Animation */}
        <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-20 pointer-events-none">
          <Lottie animationData={homeBgAnimation} loop />
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-12 space-y-20 py-12">
          {/* Hero Section */}
          <div className="relative w-full">
            <Player
              autoplay
              loop
              src={heroBg}
              className="absolute inset-0 w-full h-full object-cover opacity-40 z-0"
            />
            <section className="relative z-10 border border-blue-100 shadow-2xl py-14 px-6 sm:px-12 rounded-3xl text-center">
              <LottieBackground />
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-blue-800 drop-shadow">
                Share Your Knowledge with the World
              </h1>
              <p className="text-base sm:text-lg text-gray-700 mb-6">
                Discover insightful articles from various domains and share yours too!
              </p>
              <Link to="/all-articles">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 sm:px-8 rounded-full font-semibold shadow-md transition-all">
                   <FaRocket className="inline-block mr-2" />
                       Explore Articles
                </button>
              </Link>
            </section>
          </div>

          {/* Featured Articles */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-blue-900 text-center flex items-center justify-center gap-2">
  <FaBookOpen className="text-blue-700" />
  Featured Articles
</h2>


            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading-articles"
                  className="text-center text-gray-600 min-h-[200px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Loading articles...
                </motion.div>
              ) : (
                <motion.div
                  key="articles-loaded"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
                >
                  {articles.map((article) => (
                    <motion.div
                      key={article._id}
                      className="bg-white/80 backdrop-blur-lg border border-blue-100 p-5 rounded-xl shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div>
                        <h3 className="text-xl font-semibold text-blue-800">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-2 mb-4">
                          {article.content?.slice(0, 100)}...
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-auto">
                        <img
                          src={article.thumbnail}
                          alt={article.author_name}
                          className="w-10 h-10 rounded-full object-cover border border-blue-300"
                        />
                        <div>
                          <p className="font-medium text-primary">{article.author_name}</p>
                          <p className="text-xs text-gray-500">{article.category}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Link
                          to={`/articles/${article._id}`}
                          className="inline-block text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full transition duration-300"
                        >
                          Read More →
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Categories */}
          <section>
           <h2 className="text-2xl font-bold mb-6 text-blue-900 text-center flex items-center justify-center gap-2">
  <FaFolderOpen className="text-blue-700" />
  Browse by Category
</h2>


            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading-categories"
                  className="text-center text-gray-500 min-h-[150px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Loading categories...
                </motion.div>
              ) : categories.length > 0 ? (
                <motion.div
                  key="categories-loaded"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                  {categories
                    .sort((a, b) => a.localeCompare(b))
                    .map((category, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Link
                          to={`/articles/category/${category}`}
                          className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-100 to-blue-100 hover:from-purple-200 hover:to-blue-200 rounded-xl shadow hover:shadow-md transition"
                        >
                          <span className="text-2xl">📁</span>
                          <div className="text-blue-900 font-medium">{category}</div>
                        </Link>
                      </motion.div>
                    ))}
                </motion.div>
              ) : (
                <p className="text-gray-500 pt-20 text-center">No categories found.</p>
              )}
            </AnimatePresence>
          </section>

          {/* Top Contributors */}
          <TopContributors />
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default Home;
