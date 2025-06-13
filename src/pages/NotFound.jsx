import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-50 text-center px-4">
      <img
        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
        alt="Lost in Knowledge"
        className="w-80 mb-8"
      />
      <h1 className="text-4xl font-bold text-blue-700 mb-4">404 - Lost in Knowledge?</h1>
      <p className="text-gray-600 text-lg mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link to="/">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition duration-300">
          🔙 Back to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
