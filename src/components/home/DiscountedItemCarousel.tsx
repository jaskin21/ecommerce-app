import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useShopStore } from '../../stores/useProductStore';
import { useNavigate } from 'react-router-dom';
import { handleFetchBaseQueryError } from '../../utils/errorFactory';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import useToast from '../../hook/useToast';

const ProductCarousel = () => {
  const { discountedItems, addToCart } = useShopStore();
  const { showSuccessToast, showErrorToast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = (id: number) => {
    try {
      addToCart(id);
      showSuccessToast('Added to cart successfully!');
    } catch (error) {
      const errorMessage = handleFetchBaseQueryError(
        error as FetchBaseQueryError,
        'Invalid IP Address!',
        true
      );

      showErrorToast(`${errorMessage}`);
    }
  };

  const products = discountedItems || [];
  const [index, setIndex] = useState(0);

  const nextSlide = () =>
    setIndex((prev) =>
      products.length > 0 ? (prev + 1) % products.length : 0
    );
  const prevSlide = () =>
    setIndex((prev) =>
      products.length > 0 ? (prev - 1 + products.length) % products.length : 0
    );

  if (products.length === 0) {
    return (
      <div className='w-full h-[400px] flex items-center justify-center bg-gray-50 rounded-xl'>
        <p className='text-gray-500'>No discounted products available</p>
      </div>
    );
  }

  const product = products[index];

  return (
    <div className='relative w-full max-w-4xl mx-auto overflow-hidden my-7'>
      {/* Slides */}
      <div className='h-[400px] flex items-center justify-center bg-gray-50 rounded-xl relative'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            className='absolute w-full h-full flex flex-col md:flex-row items-center p-6 gap-6'
          >
            {/* Image */}
            <div className='flex-1 flex items-center justify-center relative'>
              <img
                src={product.image}
                alt={product.title}
                className='max-h-60 object-contain'
              />
              {product.discount && (
                <span className='absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md'>
                  {product.discount}
                </span>
              )}
            </div>

            {/* Info */}
            <div className='flex-1 text-center md:text-left'>
              <h3
                onClick={() => navigate(`/shop/${product.id}`)}
                className='font-semibold text-lg mb-2 line-clamp-2 cursor-pointer hover:underline'
              >
                {product.title}
              </h3>
              <div className='flex justify-center md:justify-start items-center gap-3 mb-2'>
                <span className='text-2xl font-bold text-blue-600'>
                  ${product.price.toFixed(2)}
                </span>
                {product.discountPercent && (
                  <span className='text-sm text-gray-500 line-through'>
                    $
                    {(product.price / (1 - product.discountPercent)).toFixed(2)}
                  </span>
                )}
              </div>
              <button
                onClick={() => handleAddToCart(product.id)}
                className='mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className='absolute top-1/2 left-2 -translate-y-1/2 bg-white shadow rounded-full p-2 hover:bg-gray-100'
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className='absolute top-1/2 right-2 -translate-y-1/2 bg-white shadow rounded-full p-2 hover:bg-gray-100'
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className='flex justify-center mt-4 gap-2'>
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${
              i === index ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
