import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ArticlesByCategory = () => {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/articles/category/${category}`)
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(err => console.error("Error loading articles:", err));
  }, [category]);

  return (
    <div className="px-4 sm:px-6 md:px-12 py-10 space-y-6 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-800 text-center sm:text-left">
        🗂️ Articles in "{category}" category
      </h2>

      {articles.length === 0 ? (
        <p className="text-center text-gray-500 italic">No articles found for this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {articles.map(article => (
            <div
              key={article._id}
              className="bg-white p-5 shadow-md rounded-xl flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{article.title}</h3>
              <p className="text-sm text-gray-600 mb-4 flex-grow">
                {article.content?.slice(0, 100)}{article.content?.length > 100 ? "..." : ""}
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <img
                  src={article.author_photo || "https://via.placeholder.com/40"}
                  alt={article.author_name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-sm">{article.author_name}</p>
                  <p className="text-xs text-gray-500">{article.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticlesByCategory;
