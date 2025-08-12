// src/pages/SignUp.jsx
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import supabase from '../Supabase/supabase_config';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const onSubmit = async ({ email, password }) => {
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      alert(error.message);
    } else {
      alert('Account created. Please check your email to confirm.');
      navigate('/signin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg"
        data-aos="fade-up"
      >
        <h2 className="text-2xl font-bold text-center text-[var(--text-color)] mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register('email', { required: 'Email is required' })}
              className={`w-full px-3 py-2 border ${
                errors.email ? 'border-[var(--danger-color)]' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] text-sm`}
            />
            {errors.email && (
              <p className="text-xs text-[var(--danger-color)] mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
              className={`w-full px-3 py-2 border ${
                errors.password ? 'border-[var(--danger-color)]' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] text-sm`}
            />
            {errors.password && (
              <p className="text-xs text-[var(--danger-color)] mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-[var(--main-color)] text-white rounded-md font-semibold text-sm hover:opacity-90 transition disabled:opacity-50"
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-5 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/signin')}
            className="text-[var(--main-color)] hover:underline cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
