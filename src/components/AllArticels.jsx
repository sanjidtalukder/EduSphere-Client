import { useEffect, useState } from "react";

const AllArticels = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/articles") // ✅ তোমার API URL
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="px-4 md:px-12 py-10 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">
        📚 All Articles
      </h2>

      {articles.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article._id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300 border border-blue-100"
            >
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {article.content?.slice(0, 100)}...
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={article.author_photo}
                  alt={article.author_name}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <p className="font-medium text-gray-800">
                    {article.author_name}
                  </p>
                  <p className="text-xs text-gray-500">{article.category}</p>
                </div>
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
