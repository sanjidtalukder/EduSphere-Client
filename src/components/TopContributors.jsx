import { useEffect, useState } from "react";

const TopContributors = () => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/top-contributors")
      .then(res => res.json())
      .then(data => {
        console.log("Fetched contributors:", data);
        setContributors(data);
      })
      .catch(err => console.error("Error fetching contributors:", err));
  }, []);

  return (
    <section className="my-10">
      <h2 className="text-2xl font-semibold mb-6">🏆 Top Contributors</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {contributors.map((user, index) => (
          <div key={index} className="bg-white p-5 rounded-xl shadow-md text-center">
            <img
              src={
                user.photo && user.photo.startsWith("http")
                  ? user.photo
                  : `https://i.pravatar.cc/100?img=${index + 10}`
              }
              alt={user._id || "Contributor"}
              className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
            />
            <h3 className="text-lg font-semibold">{user._id || "Anonymous"}</h3>
            <p className="text-sm text-gray-500">{user.totalArticles} Articles</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopContributors;
