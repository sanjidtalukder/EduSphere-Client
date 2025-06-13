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
    <div className="px-4 md:px-12 py-10 space-y-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-800">
        🗂️ Articles in "{category}" category
      </h2>

      {articles.length === 0 ? (
        <p className="text-gray-500 italic">No articles found for this category.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map(article => (
            <div key={article._id} className="bg-white p-5 shadow-md rounded-xl">
              <h3 className="text-xl font-semibold">{article.title}</h3>
              <p className="text-sm text-gray-600 my-2">{article.content?.slice(0, 80)}...</p>
              <div className="flex items-center gap-2 mt-4">
                <img src={article.author_photo} alt={article.author_name} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-medium">{article.author_name}</p>
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
