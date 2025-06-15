import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/loginAnimation.json";
import loginSuccessAnimation from "../../assets/loginSuccessAnimation.json"; // ✅ Success animation

const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [showSuccessAnim, setShowSuccessAnim] = useState(false); // ✅ Show/hide animation
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);
      toast.success("Login successful!");
      setShowSuccessAnim(true);
      setTimeout(() => {
        setShowSuccessAnim(false);
        navigate("/");
      }, 2500); // 2.5s show time
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
    <div className="relative min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6 overflow-hidden">

      {/* Left: Login Form */}
      <div className="z-10 w-full md:w-1/2 max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">Welcome Back 👋</h2>
        <p className="text-center text-gray-600 mb-6">Please login to your account</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">OR</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
        >
          <FaGoogle className="mr-2 text-lg" /> Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-700">
          New here?{" "}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Create an account
          </Link>
        </p>
      </div>

      {/* Right: Decorative Lottie */}
      <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
        <div className="w-full max-w-lg opacity-100 h-[300px] md:h-[400px]">
          <Lottie animationData={loginAnimation} loop={true} />
        </div>
      </div>

      {/* ✅ Success Animation Overlay */}
      {showSuccessAnim && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-[250px] md:w-[350px]">
            <Lottie animationData={loginSuccessAnimation} loop={false} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
