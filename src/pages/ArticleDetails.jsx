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

  useEffect(() => {
    fetch(`https://my-edu-sphere-server-ten.vercel.app/articles/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Article not found");
        return res.json();
      })
      .then((data) => setArticle(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://my-edu-sphere-server-ten.vercel.app/articles/${id}/likes`)
      .then((res) => res.json())
      .then(({ totalLikes, likedBy }) => {
        setLikes(totalLikes);
        if (likedBy?.includes(user.email)) setLiked(true);
      })
      .catch((err) => console.error("Like load error:", err));
  }, [id, user]);

  useEffect(() => {
    fetch(`https://my-edu-sphere-server-ten.vercel.app/articles/${id}/comments`)
      .then((res) => res.json())
      .then(setComments)
      .catch((err) => console.error("Comment load error:", err));
  }, [id]);

  const handleLike = () => {
    if (!user?.email) return alert("Please login to like the article.");

    fetch(`https://my-edu-sphere-server-ten.vercel.app/articles/${id}/like`, {
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

  const handleAddComment = () => {
    if (!user?.email) return alert("Please login to comment.");
    if (!newComment.trim()) return;

    const commentData = {
      user_id: user.uid,
      user_name: user.displayName || "Anonymous",
      user_photo: user.photoURL || "",
      comment: newComment.trim(),
    };

    fetch(`https://my-edu-sphere-server-ten.vercel.app/articles/${id}/comment`, {
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
      <div className="flex justify-center pt-16 py-6 px-4 sm:px-6 lg:px-8">
        <div className="card w-full max-w-4xl shadow-lg rounded-lg overflow-hidden bg-white">
          <figure>
            <img
              src={article?.thumbnail || "https://via.placeholder.com/600x300"}
              alt={article?.title}
              className="object-cover w-full max-h-96 sm:max-h-[400px]"
            />
          </figure>
          <div className="card-body p-6 sm:p-10">
            <h2 className="card-title text-2xl sm:text-3xl font-bold mb-3">
              {article?.title}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
              {article?.content}
            </p>

            <div className="flex flex-col sm:flex-row sm:space-x-6 text-sm text-gray-500 mb-3">
              <div>
                Category: <span className="font-medium">{article?.category}</span>
              </div>
              <div className="mt-1 sm:mt-0">
                Author: <span className="font-medium">{article?.author_name}</span>
              </div>
            </div>

            {article?.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
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

            <div className="card-actions justify-start mb-6">
              <button
                onClick={handleLike}
                disabled={liked}
                className={`btn ${liked ? "btn-secondary" : "btn-outline"}`}
              >
                {liked ? "Liked ❤️" : "Like 🤍"} ({likes})
              </button>
            </div>

            {/* Comments Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Comments ({comments.length})
              </h3>

              <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                {comments.length === 0 && (
                  <p className="text-gray-500">No comments yet.</p>
                )}
                {comments.map((c) => (
                  <div key={c._id} className="flex items-start gap-3">
                    <img
                      src={c.user_photo || "/avatardefault.webp"}
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
                rows={3}
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                onClick={handleAddComment}
                className="btn btn-primary mt-3 w-full sm:w-auto"
              >
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
