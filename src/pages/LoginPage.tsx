// Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login with:', { email, password });
    // TODO: integrate backend auth
    navigate('/');
  };

  return (
    <div className='min-h-screen flex'>
      {/* Left Side with Background Image */}
      <div className='hidden md:flex w-1/2 relative'>
        {/* Background image */}
        <div
          className='absolute inset-0 bg-cover bg-center'
          style={{ backgroundImage: "url('/images/login-bg.jpg')" }}
        />

        {/* Dark overlay */}
        <div className='absolute inset-0 bg-black/40' />

        {/* Overlay with centered text */}
        <div className='relative z-10 flex flex-col items-center justify-center flex-grow p-8 text-center text-white'>
          <h1 className='text-4xl font-bold mb-4'>Hello Jas! 👋</h1>
          <p className='max-w-sm text-lg'>
            Say goodbye to repetitive, manual purchases and enjoy a smarter,
            more seamless shopping experience.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1 flex items-center justify-center p-8'>
        <div className='w-full max-w-sm'>
          <h2 className='text-2xl font-bold mb-2'>Welcome Back!</h2>
          <p className='text-sm text-gray-500 mb-6'>
            Don’t have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className='text-blue-600 hover:underline'
            >
              Create a new account
            </button>
          </p>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <input
              type='email'
              placeholder='Email'
              className='w-full border rounded-lg px-4 py-2'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type='password'
              placeholder='Password'
              className='w-full border rounded-lg px-4 py-2'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type='submit'
              className='w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800'
            >
              Login Now
            </button>
          </form>

          {/* Google Login Button (fixed) */}
          <button className='w-full mt-4 border flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100'>
            <img
              src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg'
              alt='Google'
              className='w-5 h-5 object-contain'
            />
            Login with Google
          </button>

          <p className='text-sm text-gray-500 mt-4 text-center'>
            Forgot password?{' '}
            <button className='text-blue-600 hover:underline'>
              Click here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}