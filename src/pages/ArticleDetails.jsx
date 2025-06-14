import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/articles/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Article not found');
        }
        return res.json();
      })
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading article...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="px-4 md:px-10 py-12 bg-white min-h-screen max-w-5xl mx-auto shadow-lg rounded-xl">
      {/* Author Info */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
        <img
          src={article?.author_photo || 'https://via.placeholder.com/300'}
          alt={article?.author_name || 'Author'}
          className="w-36 h-36 md:w-48 md:h-48 rounded-full object-cover border-4 border-blue-600 shadow-md"
        />
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">{article?.title}</h1>
          <p className="font-semibold text-gray-800 text-xl">{article?.author_name}</p>
          <p className="font-semibold text-gray-800 text-xl">{article?.category}</p>
          {article?.date && (
            <p className="text-sm text-gray-500 mt-1">
              {new Date(article.date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          )}
        </div>
      </div>

      {/* Article Content */}
      <article className="text-gray-700 text-lg leading-relaxed whitespace-pre-line tracking-wide">
        {article?.content}
      </article>

      {/* Tags (optional) */}
      {article?.tags?.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2">
          {article.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleDetails;
