import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../context/AuthC';

const Register = () => {
  const { createUser, googleSignin, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validatePassword = (password) => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    if (!pattern.test(password)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Password',
        text: 'Password must be at least 8 characters and include 1 uppercase, 1 lowercase, and 1 special character.',
      });
      return false;
    }
    return true;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { name, email, photoURL, password } = formData;

    if (!validatePassword(password)) return;

    setLoading(true);
    createUser(email, password)
      .then(() => updateUserProfile(name, photoURL))
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Account Created',
          text: 'Registration successful!',
        });
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: error.code === 'auth/email-already-in-use' ? 'Email already in use.' : 'Something went wrong.',
        });
      })
      .finally(() => setLoading(false));
  };

  const handleGoogle = () => {
    setLoading(true);
    googleSignin()
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Google Login Successful',
        });
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Google Login Failed',
          text: 'Something went wrong.',
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="card bg-base-100 w-full mx-auto mt-10 max-w-sm shadow-2xl">
      <div className='flex items-center justify-center'>
        <h1 className="text-4xl font-bold mt-4">Register now!</h1>
      </div>
      <div className="card-body">
        <form onSubmit={handleRegister}>
          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input w-full py-2"
            placeholder="Your name"
            required
          />

          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input w-full py-2"
            placeholder="Your email"
            required
          />

          <label className="label">Photo URL</label>
          <input
            type="text"
            name="photoURL"
            value={formData.photoURL}
            onChange={handleChange}
            className="input w-full py-2"
            placeholder="Photo URL"
            required
          />

          <label className="label">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input w-full py-2 pr-10"
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button className="btn btn-neutral mt-4 w-full py-2" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <button onClick={handleGoogle} className="btn mt-4 bg-white text-black border border-gray-300 w-full py-2" disabled={loading}>
          Register with Google
        </button>
      </div>

      <div className="text-center pb-6">
        <p>
          Already have an account? <Link className="text-blue-600 underline" to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
