import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import BackgroundWrapper from "../components/BackgroundWrapper";

const ArticleDetails = () => {
  const { id } = useParams();
  const { user, loading: authLoading } = useContext(AuthContext);

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // ✅ Load article
  useEffect(() => {
    fetch(`http://localhost:5000/articles/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Article not found");
        return res.json();
      })
      .then((data) => setArticle(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  // ✅ Load likes & check if user liked
  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:5000/articles/${id}/likes`)
      .then((res) => res.json())
      .then(({ totalLikes, likedBy }) => {
        setLikes(totalLikes);
        if (likedBy?.includes(user.email)) setLiked(true);
      })
      .catch((err) => console.error("Like load error:", err));
  }, [id, user]);

  // ✅ Load comments
  useEffect(() => {
    fetch(`http://localhost:5000/articles/${id}/comments`)
      .then((res) => res.json())
      .then(setComments)
      .catch((err) => console.error("Comment load error:", err));
  }, [id]);

  // ✅ Handle like
  const handleLike = () => {
    if (!user?.email) return alert("Please login to like the article.");

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

  // ✅ Handle comment
  const handleAddComment = () => {
    if (!user?.email) return alert("Please login to comment.");
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
      .then((added) => {
        setComments((prev) => [...prev, added]);
        setNewComment("");
      })
      .catch((err) => console.error("Comment error:", err));
  };

  if (loading || authLoading)
    return <p className="text-center mt-10">Loading article...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <BackgroundWrapper>
<div className="flex justify-center py-12 px-4">
      <div className="card w-full md:w-[800px] shadow-lg">
        <figure>
          <img
            src={article?.thumbnail || "https://via.placeholder.com/600x300"}
            alt={article?.title}
            className="object-cover max-h-[400px] w-full"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-3xl">{article?.title}</h2>
          <p className="text-gray-600">{article?.content}</p>

          <div className="text-sm text-gray-500">
            Category: <span className="font-medium">{article?.category}</span>
          </div>
          <div className="text-sm text-gray-500">
            Author: <span className="font-medium">{article?.author_name}</span>
          </div>

          {article?.tags?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="badge badge-outline text-xs text-blue-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="card-actions justify-start mt-4">
            <button
              onClick={handleLike}
              disabled={liked}
              className={`btn ${liked ? "btn-secondary" : "btn-outline"}`}
            >
              {liked ? "Liked ❤️" : "Like 🤍"} ({likes})
            </button>
          </div>

          {/* Comments Section */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">
              Comments ({comments.length})
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {comments.length === 0 && (
                <p className="text-gray-500">No comments yet.</p>
              )}
              {comments.map((c) => (
                <div key={c._id} className="flex items-start gap-3">
                  <img
                    src={c.user_photo || "https://via.placeholder.com/40"}
                    alt={c.user_name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{c.user_name}</p>
                    <p className="text-sm">{c.comment}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment Box */}
            <textarea
              className="textarea textarea-bordered w-full mt-4"
              rows="3"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button onClick={handleAddComment} className="btn btn-primary mt-2">
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </div>
    </BackgroundWrapper>
    
  );
};

export default ArticleDetails;
