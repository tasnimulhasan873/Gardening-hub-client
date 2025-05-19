import React, {  useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthC';

const Login = () => {
  const { loginUser, googleSignin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
      .then((result) => {
        console.log(result.user);
        navigate('/');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleGoogle = () => {
    googleSignin()
      .then((result) => {
        console.log(result.user);
        navigate('/');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

return (
  <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Welcome Back 🌿</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          Login
        </button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">or</span>
        </div>
      </div>

      <button
        onClick={handleGoogle}
        className="w-full border border-gray-300 text-gray-800 font-medium py-2 rounded-lg flex items-center justify-center hover:bg-gray-100 transition duration-300"
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 533.5 544.3">
          <path fill="#4285f4" d="M533.5 278.4...Z" />
        </svg>
        Continue with Google
      </button>

      <p className="text-sm text-center mt-6">
        Don't have an account?{" "}
        <Link to="/register" className="text-green-600 font-semibold hover:underline">
          Register
        </Link>
      </p>
    </div>
  </div>
);

};

export default Login;
