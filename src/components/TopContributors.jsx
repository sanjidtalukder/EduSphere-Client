import { useEffect, useState } from "react";

const TopContributors = () => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/top-contributors")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched contributors:", data);
        setContributors(data);
      })
      .catch((err) => console.error("Error fetching contributors:", err));
  }, []);

  return (
    <section className="my-12 px-4 sm:px-6 lg:px-10">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-indigo-700">
        🏆 Top Contributors
      </h2>

      {contributors.length === 0 ? (
        <p className="text-center text-gray-500">No contributors found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {contributors.map((user, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition duration-300 text-center"
            >
              <img
                src={
                  user.photo && user.photo.startsWith("http")
                    ? user.photo
                    : `https://i.pravatar.cc/100?img=${index + 10}`
                }
                alt={user._id || "Contributor"}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-indigo-400"
              />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {user._id || "Anonymous"}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                📄 {user.totalArticles} {user.totalArticles > 1 ? "Articles" : "Article"}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TopContributors;
