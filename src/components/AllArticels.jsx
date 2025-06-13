import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllArticels = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/articles")
      .then(res => res.json())
      .then(data => setArticles(data));
  }, []);

  return (
    <div className="px-4 md:px-12 py-12 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">
        📚 All Articles
      </h2>

      {articles.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article._id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-blue-100 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {article.content?.slice(0, 100)}...
                </p>
              </div>

              <div className="flex items-center gap-3 mt-auto">
                <img
                  src={article.author_photo}
                  alt={article.author_name}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <p className="font-medium text-gray-800">{article.author_name}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(article.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })}
                  </p>
                </div>
              </div>

              <div className="mt-4 text-right">
                <Link to={`/articles/${article._id}`}>
                  <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-4 rounded-full transition duration-300">
                    Read More →
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 italic">No articles found.</p>
      )}
    </div>
  );
};

export default AllArticels;
