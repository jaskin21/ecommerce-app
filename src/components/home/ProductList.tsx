import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaThLarge, FaList } from 'react-icons/fa';
import { BsCartPlus } from 'react-icons/bs';
import { AiOutlineHeart, AiOutlineEye } from 'react-icons/ai';
import { useShopStore } from '../../stores/useProductStore';
import useToast from '../../hook/useToast';
import { handleFetchBaseQueryError } from '../../utils/errorFactory';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export default function ProductList() {
  const { products, addToCart, discountedItems } = useShopStore();
  const { showSuccessToast, showErrorToast } = useToast();

  const [sortBy, setSortBy] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    console.log(discountedItems);
  }, [discountedItems]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Sorting logic
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.title.localeCompare(b.title);
      case 'name-desc':
        return b.title.localeCompare(a.title);
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return (b.rating?.rate || 0) - (a.rating?.rate || 0);
      default:
        return 0;
    }
  });

  const effectiveView = isMobile ? 'list' : view;

  return (
    <div className='flex flex-col gap-6'>
      {/* Controls */}
      <div className='flex flex-wrap items-center gap-6 border-b pb-4'>
        <div className='flex items-center gap-2'>
          <label className='text-sm font-medium text-gray-700'>Sort By:</label>
          <select
            className='border rounded px-3 py-1 text-sm'
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value=''>Best Match</option>
            <option value='name-asc'>Name (A - Z)</option>
            <option value='name-desc'>Name (Z - A)</option>
            <option value='price-asc'>Price (Low - High)</option>
            <option value='price-desc'>Price (High - Low)</option>
            <option value='rating'>Rating (Stars)</option>
          </select>
        </div>

        {!isMobile && (
          <div className='flex items-center gap-2'>
            <span className='text-sm font-medium text-gray-700'>View:</span>
            <button
              onClick={() => setView('grid')}
              className={`p-2 border rounded ${
                view === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-500'
              }`}
            >
              <FaThLarge size={14} />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 border rounded ${
                view === 'list' ? 'bg-blue-600 text-white' : 'text-gray-500'
              }`}
            >
              <FaList size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Grid ↔ List transition with fade */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={effectiveView}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Products inside */}
          <div
            className={
              effectiveView === 'grid'
                ? 'grid gap-6 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]'
                : 'flex flex-col gap-6'
            }
          >
            <AnimatePresence>
              {sortedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  whileHover={{ scale: 1.02 }}
                  className={`relative border rounded-lg p-4 bg-white shadow cursor-pointer transition-colors ${
                    effectiveView === 'list'
                      ? 'flex flex-row gap-4 items-start'
                      : 'flex flex-col'
                  }`}
                >
                  {/* Image */}
                  <div
                    className={`${
                      effectiveView === 'list'
                        ? 'w-32 h-32 flex-shrink-0'
                        : 'w-full h-40 mb-4'
                    } bg-gray-200 flex items-center justify-center rounded`}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className='max-h-28 object-contain'
                    />
                  </div>

                  {/* Info */}
                  <div className='flex flex-col flex-1'>
                    <div className='flex items-center justify-between mb-2'>
                      <div className='flex gap-4 text-gray-400 text-lg'>
                        <AiOutlineEye className='cursor-pointer hover:text-gray-600' />
                        <AiOutlineHeart className='cursor-pointer hover:text-red-500' />
                      </div>
                      {product.discount && (
                        <span className='bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded'>
                          {product.discount}
                        </span>
                      )}
                    </div>

                    <h3 className='font-medium text-gray-800 mb-2 line-clamp-2'>
                      {product.title}
                    </h3>

                    <div className='mt-auto'>
                      <div className='flex items-center text-yellow-500 mb-2'>
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.round(product.rating?.rate || 0)
                                ? 'fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className='ml-2 text-sm text-gray-600'>
                          {product.rating?.rate} ({product.rating?.count})
                        </span>
                      </div>

                      <div className='flex justify-between items-center'>
                        <span className='text-lg font-bold'>
                          ${product.price}
                        </span>
                        <button
                          onClick={() => handleAddToCart(product.id)}
                          className='flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition'
                        >
                          <BsCartPlus />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Show more */}
      <div className='w-full flex justify-center mt-8'>
        <button className='px-6 py-2 border rounded hover:bg-gray-100 transition'>
          Show more
        </button>
      </div>
    </div>
  );
}
