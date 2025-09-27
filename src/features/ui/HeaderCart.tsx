'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function HeaderCart() {
  const { isOpen, setIsOpen } = useCart();
  const navigate = useNavigate();

  // Dummy cart items
  const cartItems = [
    {
      id: 1,
      name: 'Comfy Chair',
      price: 120,
      qty: 2,
      image: '/images/contact-us.jpg',
    },
    {
      id: 2,
      name: 'Modern Lamp',
      price: 75,
      qty: 1,
      image: '/images/about-banner.jpg',
    },
    {
      id: 3,
      name: 'Modern Lamp',
      price: 75,
      qty: 1,
      image: '/images/about-banner.jpg',
    },
    {
      id: 4,
      name: 'Modern Lamp',
      price: 75,
      qty: 1,
      image: '/images/about-banner.jpg',
    },
    {
      id: 5,
      name: 'Modern Lamp',
      price: 75,
      qty: 1,
      image: '/images/about-banner.jpg',
    },
    {
      id: 6,
      name: 'Modern Lamp',
      price: 75,
      qty: 1,
      image: '/images/about-banner.jpg',
    },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      {/* Cart Button */}
      <button onClick={() => setIsOpen(true)} className='relative'>
        <ShoppingCart size={22} className='text-gray-700' />
        <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center'>
          {cartItems.length}
        </span>
      </button>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className='fixed inset-0 bg-black z-40'
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
              className='fixed top-0 right-0 h-full w-full sm:w-[400px] lg:w-[500px] bg-white shadow-lg z-50 p-4 sm:p-6 flex flex-col'
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className='ml-auto text-gray-500 hover:text-gray-700'
              >
                <X size={24} />
              </button>

              <h2 className='text-lg font-bold mb-4'>Shopping Cart</h2>

              {/* Cart Items */}
              <div className='flex-1 flex flex-col gap-4 overflow-y-auto'>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className='flex items-center gap-3 sm:gap-4 border-b pb-4'
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className='w-14 h-14 sm:w-16 sm:h-16 rounded-md object-cover'
                    />
                    <div className='flex-1'>
                      <p className='font-medium text-sm sm:text-base'>
                        {item.name}
                      </p>
                      <p className='text-xs sm:text-sm text-gray-500'>
                        Qty: {item.qty}
                      </p>
                    </div>
                    <div className='text-right'>
                      <p className='font-semibold text-sm sm:text-base'>
                        ${item.price}
                      </p>
                      <p className='text-xs sm:text-sm text-gray-500'>
                        Total: ${item.price * item.qty}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className='border-t pt-4 mt-auto space-y-3'>
                <p className='flex justify-between font-semibold text-sm sm:text-base'>
                  <span>Total:</span>
                  <span>${total}</span>
                </p>

                {/* Buttons */}
                <div className='flex flex-col sm:flex-row gap-2'>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      navigate('/cart');
                    }}
                    className='w-full sm:flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 text-sm sm:text-base'
                  >
                    View Cart
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      navigate('/checkout');
                    }}
                    className='w-full sm:flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-800 text-sm sm:text-base'
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
