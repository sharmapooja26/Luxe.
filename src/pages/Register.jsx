import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath =
    new URLSearchParams(location.search).get("redirect") || "/profile";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const newUser = { name, email, password, role: "user" };

    // Save users to localStorage
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    if (savedUsers.find((u) => u.email === email)) {
      toast.error("Email already exists!");
      return;
    }

    savedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(savedUsers));

    // Auto-login after registration
    localStorage.setItem("user", JSON.stringify(newUser));

    // Show success toast
    toast.success("Account created successfully!");

    // Navigate to profile page (or redirectPath)
    navigate(redirectPath, { replace: true });

    // Trigger page reload to update NavBar state (optional)
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-2">
          Create Your Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Sign up to start shopping with us
        </p>

        <div className="mb-4">
          <label className="block text-sm mb-2 font-medium">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2 font-medium">Email</label>
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2 font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-2 font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
        >
          Create Account
        </button>

        <p className="text-sm text-center mt-4 text-gray-500">
          Already registered?{" "}
          <Link to="/login" className="text-black font-medium hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
