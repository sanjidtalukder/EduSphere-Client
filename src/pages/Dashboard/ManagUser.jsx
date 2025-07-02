import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://my-edu-sphere-server-ten.vercel.app/articles")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      });
  }, []);

  const handleView = (id) => {
    navigate(`/articles/${id}`);
  };

  return (
    <div className="p-6 md:p-10 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-blue-700">📋 Manage Users & Articles</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-blue-100 text-sm">
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">#</th>
                <th className="px-4 py-3 text-left font-semibold">Author</th>
                <th className="px-4 py-3 text-left font-semibold">Title</th>
                <th className="px-4 py-3 text-left font-semibold">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {articles.map((article, index) => (
                <tr key={article._id} className="hover:bg-blue-50 transition">
                  <td className="px-4 py-3 font-medium">{index + 1}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <img
                      src={article.thumbnail}
                      alt="Author"
                      className="w-8 h-8 rounded-full border"
                    />
                    <span>{article.author_name}</span>
                  </td>
                  <td className="px-4 py-3">{article.title}</td>
                  <td className="px-4 py-3">
                    {new Date(article.date).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleView(article._id)}
                      className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {articles.length === 0 && (
            <p className="text-center py-6 text-gray-500">No articles found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
