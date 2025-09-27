// Register.tsx
'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Register with:', form);
    // TODO: integrate backend
    navigate('/login');
  };

  return (
    <div className='min-h-screen flex'>
      {/* Left Side */}
      <div className='hidden md:flex w-1/2 relative'>
        {/* Background image */}
        <div
          className='absolute inset-0 bg-cover bg-center'
          style={{ backgroundImage: "url('/images/register-bg.jpg')" }}
        />

        {/* Dark overlay */}
        <div className='absolute inset-0 bg-black/40' />

        {/* Overlay with centered text */}
        <div className='relative z-10 flex flex-col items-center justify-center flex-grow p-8 text-center text-white'>
          <h1 className='text-4xl font-bold mb-4'>
            Join JAS Aesthetic
          </h1>
          <p className='max-w-sm text-lg'>
            Get started today and simplify your workflow with our powerful
            tools.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1 flex items-center justify-center p-8'>
        <div className='w-full max-w-sm'>
          <h2 className='text-2xl font-bold mb-2'>Create Account</h2>
          <p className='text-sm text-gray-500 mb-6'>
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className='text-blue-600 hover:underline'
            >
              Login here
            </button>
          </p>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <input
              type='text'
              placeholder='Full Name'
              className='w-full border rounded-lg px-4 py-2'
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type='email'
              placeholder='Email'
              className='w-full border rounded-lg px-4 py-2'
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type='password'
              placeholder='Password'
              className='w-full border rounded-lg px-4 py-2'
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <input
              type='password'
              placeholder='Confirm Password'
              className='w-full border rounded-lg px-4 py-2'
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              required
            />
            <button
              type='submit'
              className='w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800'
            >
              Register Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}