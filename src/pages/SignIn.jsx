// src/pages/SignIn.jsx
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import supabase from '../Supabase/supabase_config';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { toast } from 'react-toastify';

const SignIn = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const onSubmit = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      toast(error.message);
    } else {
      toast("Signed in successfully!");
      if (data.session) {
        const { access_token, refresh_token } = data.session;
        // خزّنهم في localStorage
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
      }

      navigate("/");
    }
  };


  return (
    <div className="min-h-screen flex items-center  justify-center  px-4">
      <div
        className="w-full max-w-sm bg-white  rounded-xl shadow-md p-6"
        data-aos="fade-up"
      >
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[var(--text-color)]">Sign In</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] text-sm"
            />
            {errors.email && (
              <p className="text-xs text-[var(--danger-color)] mt-1">Email is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              {...register('password', { required: true })}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] text-sm"
            />
            {errors.password && (
              <p className="text-xs text-[var(--danger-color)] mt-1">Password is required</p>
            )}
          </div>

          <div className="flex justify-end text-xs">
            <a href="#" className="text-[var(--main-color)] hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[var(--main-color)] text-white rounded-md font-semibold text-sm hover:opacity-90 transition"
          >
            Sign In
          </button>
        </form>

        <div className="my-4 border-t border-gray-200" />

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-[var(--main-color)] font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
