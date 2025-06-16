import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-50 text-center px-6 sm:px-12 md:px-24 lg:px-40 xl:px-60">
      <img
        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
        alt="Lost in Knowledge"
        className="w-64 sm:w-80 md:w-96 mb-8"
      />
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-700 mb-4 leading-tight">
        404 - Lost in Knowledge?
      </h1>
      <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-6 max-w-xl">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link to="/">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition duration-300 text-base sm:text-lg">
          🔙 Back to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
