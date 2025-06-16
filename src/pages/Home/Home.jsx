import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TopContributors from "../../components/TopContributors";
import Lottie from "lottie-react";
import homeBgAnimation from "../../assets/home-bg-lottie.json"; // Lottie background animation
import BackgroundWrapper from "../../components/BackgroundWrapper";
import { Player } from "@lottiefiles/react-lottie-player";
import heroBg from "../../assets/hero-bg.json"; //  Fixed Path

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/articles/featured")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        const cats = [...new Set(data.map((item) => item.category))];
        setCategories(cats);
      });
  }, []);

  return (
    <BackgroundWrapper>
      <div className="relative min-h-screen overflow-x-hidden">
        {/*  Animated Background */}
        <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-25 pointer-events-none">
          <Lottie animationData={homeBgAnimation} loop={true} />
        </div>

        {/* Main Content */}
        <div className="relative z-10 px-4 md:px-12 space-y-20 pt-10 pb-20">

          {/*  Hero Section */}
          <div className="relative w-full">
            {/*  Lottie BG Animation */}
            <Player
              autoplay
              loop
              src={heroBg}
              className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
            />

            {/*  Hero Content */}
            <section className="relative z-10  border border-blue-200 shadow-2xl py-16 px-4 md:px-12 rounded-3xl text-center transition duration-500">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-800 drop-shadow-md">
                Share Your Knowledge with the World
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Discover insightful articles from various domains and share yours too!
              </p>
              <Link to="/all-articles">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-8 rounded-full font-semibold shadow-lg transition-all duration-300">
                  🚀 Explore Articles
                </button>
              </Link>
            </section>
          </div>

          {/*  Featured Articles */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-blue-900">📚 Featured Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {articles.map((article) => (
                <div
                  key={article._id}
                  className="bg-white/80 backdrop-blur-md border border-blue-100 p-5 shadow-md rounded-xl flex flex-col justify-between hover:shadow-lg transition-all duration-300"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-blue-800">{article.title}</h3>
                    <p className="text-sm text-gray-600 my-2">
                      {article.content?.slice(0, 80)}...
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <img
                      src={article.thumbnail}
                      alt={article.author_name}
                      className="w-10 h-10 rounded-full border border-blue-300"
                    />
                    <div>
                      <p className="font-medium">{article.author_name}</p>
                      <p className="text-xs text-gray-500">{article.category}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link
                      to={`/articles/${article._id}`}
                      className="inline-block mt-2 text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full transition duration-300"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/*  Categories */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-blue-900">📂 Browse by Category</h2>
            {categories.length > 0 ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories
                  .sort((a, b) => a.localeCompare(b))
                  .map((category, index) => (
                    <Link
                      key={index}
                      to={`/articles/category/${category}`}
                      className="bg-gradient-to-r from-purple-100 to-blue-100 hover:from-purple-200 hover:to-blue-200 text-blue-900 p-4 rounded-xl shadow hover:shadow-lg transition-all duration-300 flex items-center gap-3"
                    >
                      <span className="text-2xl">📁</span>
                      <div>
                        <h3 className="text-lg font-semibold">{category}</h3>
                      </div>
                    </Link>
                  ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No categories found.</p>
            )}
          </section>

          {/*  Top Contributors */}
          <TopContributors />
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default Home;
