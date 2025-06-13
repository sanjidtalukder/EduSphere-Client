import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch articles on component mount
  useEffect(() => {
  fetch("http://localhost:5000/articles/featured")
    .then(res => res.json())
    .then(data => {
      setArticles(data);
      const cats = [...new Set(data.map((item) => item.category))];
      setCategories(cats);
    });
}, []);


  return (
    <div className="px-4 md:px-12 space-y-16">

      {/* Hero Section */}
      <section className="bg-blue-100 py-16 rounded-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Share Your Knowledge</h1>
        <p className="text-lg text-gray-600 mb-6">
          Discover insightful articles from various domains and share yours too!
        </p>
       <Link to="/AllArticles">
  <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full font-semibold transition">
    Explore Articles
  </button>
</Link>

      </section>

      {/* Featured Articles */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">📚 Featured Articles</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article._id} className="bg-white p-5 shadow-md rounded-xl">
              <h3 className="text-xl font-semibold">{article.title}</h3>
              <p className="text-sm text-gray-600 my-2">
                {article.content?.slice(0, 80)}...
              </p>
              <div className="flex items-center gap-2 mt-4">
                <img
                  src={article.author_photo}
                  alt={article.author_name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{article.author_name}</p>
                  <p className="text-xs text-gray-500">{article.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
<section>
  <h2 className="text-2xl font-semibold mb-6">📂 Browse by Category</h2>
  
  {categories.length > 0 ? (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories
        .sort((a, b) => a.localeCompare(b)) // Alphabetically sorted
        .map((category, index) => (
          <Link
            key={index}
            to={`/articles/category/${category}`}
            className="bg-gradient-to-r from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 text-blue-900 p-4 rounded-xl shadow hover:shadow-md transition-all duration-300 flex items-center gap-3"
          >
            <span className="text-2xl">📁</span>
            <div>
              <h3 className="text-lg font-semibold">{category}</h3>
              {/* Optional: Category description or count */}
              {/* <p className="text-xs text-gray-600">5 articles</p> */}
            </div>
          </Link>
        ))}
    </div>
  ) : (
    <p className="text-gray-500 italic">No categories found.</p>
  )}
</section>

      {/* Top Contributors (Static Example) */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">🏆 Top Contributors</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl shadow-md text-center">
            <img
              src="https://i.pravatar.cc/100?u=afra"
              alt="Afra"
              className="w-20 h-20 rounded-full mx-auto mb-3"
            />
            <h3 className="text-lg font-semibold">Afra Anjum Subha</h3>
            <p className="text-sm text-gray-500">10+ Articles</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-md text-center">
            <img
              src="https://i.pravatar.cc/100?u=rakib"
              alt="Rakib"
              className="w-20 h-20 rounded-full mx-auto mb-3"
            />
            <h3 className="text-lg font-semibold">Rakib Hasan</h3>
            <p className="text-sm text-gray-500">8 Articles</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-md text-center">
            <img
              src="https://i.pravatar.cc/100?u=sanjid"
              alt="Sanjid"
              className="w-20 h-20 rounded-full mx-auto mb-3"
            />
            <h3 className="text-lg font-semibold">Sanjid Talukder</h3>
            <p className="text-sm text-gray-500">7 Articles</p>
          </div>
        </div>
      </section>
      <br />
    </div>
  );
};

export default Home;
