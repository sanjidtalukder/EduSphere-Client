import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../../firebase/firebase.config";
import Lottie from "lottie-react";
import registerAnimation from "../../assets/register-lottie.json"; // লোকালি রাখলে
import loginSuccessAnimation from "../../assets/loginSuccessAnimation.json"; // তোমার success animation ফাইল

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [showSuccessAnim, setShowSuccessAnim] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const photo = form.photo.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordPattern.test(password)) {
      toast.error("Password must contain uppercase, lowercase and be 6+ characters.");
      return;
    }

    try {
      await createUser(email, password);
      await updateUserProfile({ displayName: name, photoURL: photo });

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });

      toast.success("Registration successful!");

      // Show success animation
      setShowSuccessAnim(true);

      // Hide animation after 2.5 seconds and navigate home
      setTimeout(() => {
        setShowSuccessAnim(false);
        navigate("/");
      }, 2500);
    } catch (err) {
      setError(err.message);
      toast.error("Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-purple-200 to-blue-300 p-8 gap-10 relative">
      {/* Lottie Animation Section */}
      <div className="hidden md:flex md:w-1/2 justify-center">
        <div className="w-4/5 max-w-lg shadow-lg rounded-xl overflow-hidden bg-white">
          <Lottie animationData={registerAnimation} loop={true} />
        </div>
      </div>

      {/* Registration Form Section */}
      <div className="w-full md:w-1/2 max-w-md bg-white p-10 rounded-3xl shadow-2xl border border-purple-300">
        <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-4">Create an Account</h2>
        <p className="text-center text-gray-600 mb-8">Join EduSphere and start learning today!</p>

        <form onSubmit={handleRegister} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
          />
          <input
            type="text"
            name="photo"
            placeholder="Photo URL (optional)"
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
          />
          {error && (
            <p className="text-red-600 text-sm font-semibold text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-xl shadow-lg transition"
          >
            Register
          </button>
        </form>

        <p className="mt-8 text-center text-gray-700 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 hover:underline font-semibold">
            Login here
          </Link>
        </p>
      </div>

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

export default Register;
