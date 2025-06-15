import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackgroundWrapper from "./BackgroundWrapper";

const AllArticels = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/articles")
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  return (
    <BackgroundWrapper>
      <div className="px-4 md:px-12 py-16 min-h-screen">
        {/* Page Title */}
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-12 drop-shadow-sm">
          📚 Explore All Articles
        </h2>

        {/* Articles List */}
        {articles.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {articles.map((article) => (
              <div
                key={article._id}
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

                {/* Author Info */}
                <div className="flex items-center gap-3 mt-auto">
                  <img
                    src={article.thumbnail}
                    alt={article.author_name}
                    className="w-12 h-12 rounded-full object-cover border border-blue-200"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{article.author_name}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(article.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Read More Button */}
                <div className="mt-4 text-right">
                  <Link to={`/articles/${article._id}`}>
                    <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-5 rounded-full transition-all duration-300">
                      Read More →
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 italic text-lg mt-16">
            No articles found. Try again later!
          </p>
        )}
      </div>
    </BackgroundWrapper>
  );
};

export default AllArticels;
