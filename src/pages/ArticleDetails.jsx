import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider"; 

const ArticleDetails = () => {
  const { id } = useParams();
  const { user, loading: authLoading } = useContext(AuthContext); //  Firebase user
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  //  Article Load
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/articles/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Article not found");
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

  //  Likes Load & Check if already liked
  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:5000/articles/${id}/likes`)
      .then((res) => res.json())
      .then(({ totalLikes }) => {
        setLikes(totalLikes);
      });

    // Check if user already liked
    fetch(`http://localhost:5000/articles/${id}`)
      .then(res => res.json())
      .then(data => {
        fetch(`http://localhost:5000/articles/${id}/likes`)
          .then(res => res.json())
          .then(({ totalLikes }) => {
            setLikes(totalLikes);
            console.log(data)
          });

        fetch(`http://localhost:5000/articles/${id}/likes`)
          .then(res => res.json())
          .then(({ likedBy }) => {
            if (likedBy?.includes(user?.email)) {
              setLiked(true);
            }
          });
      })
      .catch((err) => console.error("Like check error:", err));
  }, [id, user]);

  //  Comments Load
  useEffect(() => {
    fetch(`http://localhost:5000/articles/${id}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error("Failed to load comments:", err));
  }, [id]);

  //  Like
  const handleLike = () => {
    if (!user?.email) {
      return alert("Please login to like this article.");
    }

    fetch(`http://localhost:5000/articles/${id}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLikes(data.likes);
          setLiked(true);
        } else {
          alert(data.message);
        }
      })
      .catch((err) => console.error("Like error:", err));
  };

  // Comment
  const handleAddComment = () => {
    if (!user?.email) {
      return alert("Please login to comment.");
    }
    if (!newComment.trim()) return;

    const commentData = {
      user_id: user.uid,
      user_name: user.displayName || "Anonymous",
      user_photo: user.photoURL || "",
      comment: newComment.trim(),
    };

    fetch(`http://localhost:5000/articles/${id}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData),
    })
      .then((res) => res.json())
      .then((addedComment) => {
        setComments((prev) => [...prev, addedComment]);
        setNewComment("");
      })
      .catch((err) => console.error("Failed to add comment:", err));
  };

  if (loading || authLoading) return <p className="text-center mt-10">Loading article...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="px-4 md:px-10 py-12 bg-white min-h-screen max-w-5xl mx-auto shadow-lg rounded-xl">
      {/* Author Info */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
        <img
          src={article?.author_photo || "https://via.placeholder.com/300"}
          alt={article?.author_name || "Author"}
          className="w-36 h-36 md:w-48 md:h-48 rounded-full object-cover border-4 border-blue-600 shadow-md"
        />
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">{article?.title}</h1>
          <p className="font-semibold text-gray-800 text-xl">{article?.author_name}</p>
          <p className="font-semibold text-gray-800 text-xl">{article?.category}</p>
          {article?.date && (
            <p className="text-sm text-gray-500 mt-1">
              {new Date(article.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <article className="text-gray-700 text-lg leading-relaxed whitespace-pre-line tracking-wide">
        {article?.content}
      </article>

      {/* Tags */}
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

      {/* Like */}
      <div className="my-6 flex items-center gap-4">
        <button
          onClick={handleLike}
          disabled={liked}
          className={`px-4 py-2 rounded-full ${
            liked ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
          }`}
        >
          {liked ? "Liked ❤️" : "Like 🤍"}
        </button>
        <span>
          {likes} {likes === 1 ? "Like" : "Likes"}
        </span>
      </div>

      {/* Comments */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">
          Comments ({comments.length})
        </h2>

        <div className="max-h-60 overflow-y-auto space-y-4 mb-4">
          {comments.length === 0 && <p>No comments yet. Be the first!</p>}
          {comments.map((c) => (
            <div key={c._id} className="flex gap-3 items-start">
              <img
                src={c.user_photo || "https://via.placeholder.com/50"}
                alt={c.user_name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{c.user_name}</p>
                <p>{c.comment}</p>
              </div>
            </div>
          ))}
        </div>

        <textarea
          rows="3"
          className="w-full p-2 border rounded-md"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={handleAddComment}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default ArticleDetails;
