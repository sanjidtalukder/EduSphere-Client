// src/pages/Register.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../../firebase/firebase.config";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
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
    photoURL: imageURL,
});
     

      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      setError(err.message);
      toast.error("Registration failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow-xl rounded-xl mt-10 bg-white">
      <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input type="text" name="name" placeholder="Name" required className="w-full p-2 border rounded" />
        <input type="text" name="photo" placeholder="Photo URL" className="w-full p-2 border rounded" />
        <input type="email" name="email" placeholder="Email" required className="w-full p-2 border rounded" />
        <input type="password" name="password" placeholder="Password" required className="w-full p-2 border rounded" />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="w-full bg-green-600 text-white p-2 rounded">Register</button>
      </form>
      <p className="mt-4 text-center">
        Already have an account? <Link to="/login" className="text-blue-600">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
