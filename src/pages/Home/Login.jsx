import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/loginAnimation.json";
import loginSuccessAnimation from "../../assets/loginSuccessAnimation.json";

const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [showSuccessAnim, setShowSuccessAnim] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    try {
      await signIn(email, password);
      toast.success("Login successful!");
      setShowSuccessAnim(true);
      setTimeout(() => {
        setShowSuccessAnim(false);
        navigate("/");
      }, 2500);
    } catch (err) {
      setError(err.message);
      toast.error("Login failed. Check your credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success("Logged in with Google!");
      setShowSuccessAnim(true);
      setTimeout(() => {
        setShowSuccessAnim(false);
        navigate("/home");
      }, 2500);
    } catch (error) {
      toast.error("Google login failed.");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-10 gap-10 overflow-hidden">

      {/* Left: Login Form */}
      <div className="z-10 w-full md:w-1/2 max-w-md bg-white p-10 rounded-3xl shadow-2xl border border-blue-300">
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-4">Welcome Back 👋</h2>
        <p className="text-center text-gray-600 mb-8 text-lg">Please login to your account</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400 shadow-md transition"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400 shadow-md transition"
          />
          {error && (
            <p className="text-red-600 text-center font-semibold text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl shadow-lg transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-3 text-gray-500 font-medium">OR</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl shadow-md transition duration-300 font-semibold"
        >
          <FaGoogle className="mr-3 text-lg" /> Continue with Google
        </button>

        <p className="mt-8 text-center text-gray-700 text-base">
          New here?{" "}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Create an account
          </Link>
        </p>
      </div>

      {/* Right: Decorative Lottie Animation */}
      <div className="w-full md:w-1/2 flex justify-center mt-12 md:mt-0">
        <div className="w-full max-w-lg h-[320px] md:h-[450px]">
          <Lottie animationData={loginAnimation} loop={true} />
        </div>
      </div>

      {/* Success Animation Overlay */}
        {showSuccessAnim && (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="w-[280px] md:w-[360px] p-4 bg-white rounded-2xl shadow-lg">
      <Lottie animationData={loginSuccessAnimation} loop={false} />
    </div>
  </div>
)}
    </div>
  );
};

export default Login;
