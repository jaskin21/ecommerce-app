// src/pages/ProductOverview.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { BsCartPlus } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import { Product } from '../types/productTypes';
import { useShopStore } from '../stores/useProductStore';
import { dummyReviews } from '../data/customerReviews'; // ← your new array

type Review = {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
  photos: string[];
  productId: number;
};

const REVIEWS_PER_PAGE = 6;

const ProductOverview = () => {
  const { productId } = useParams<{ productId: string }>();
  const { products } = useShopStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [productReviews, setProductReviews] = useState<Review[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStars, setFilterStars] = useState<number | null>(null);

  // load product
  useEffect(() => {
    if (products && productId) {
      const found = products.find((p) => String(p.id) === productId);
      setProduct(found || null);
    }
  }, [products, productId]);

  // load reviews for this productId
  useEffect(() => {
    if (productId) {
      const reviews = dummyReviews
        .filter((r) => String(r.productId) === productId)
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      setProductReviews(reviews);
      setCurrentPage(1);
    }
  }, [productId]);

  if (!product) {
    return (
      <div className='w-full text-center py-20 text-gray-500'>
        Loading product...
      </div>
    );
  }

  // filter reviews
  const filteredReviews = filterStars
    ? productReviews.filter((r) => r.rating === filterStars)
    : productReviews;

  // pagination
  const totalPages = Math.ceil(filteredReviews.length / REVIEWS_PER_PAGE);
  const startIdx = (currentPage - 1) * REVIEWS_PER_PAGE;
  const paginatedReviews = filteredReviews.slice(
    startIdx,
    startIdx + REVIEWS_PER_PAGE
  );

  // discount
  const hasDiscount = product.discountPercent && product.discountPercent > 0;
  const finalPrice = product.discountPercent
    ? (product.price - product.price * product.discountPercent).toFixed(2)
    : product.price.toFixed(2);

  return (
    <div className='w-full lg:w-4/5 mx-auto px-4 md:px-6 py-8'>
      {/* Product section */}
      <motion.div
        key={product.id}
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
        className='relative border rounded-lg p-6 bg-white shadow flex flex-col md:flex-row gap-8'
      >
        {/* Left: Image */}
        <div className='flex-shrink-0 w-full md:w-1/2 flex items-center justify-center bg-gray-100 rounded-lg relative'>
          {product.discountPercent && (
            <span className='absolute top-4 left-4 bg-blue-100 text-blue-600 text-md font-semibold px-2 py-1 rounded'>
              - {product.discountPercent * 100}% OFF
            </span>
          )}
          <img
            src={product.image}
            alt={product.title}
            className='max-h-[400px] object-contain'
          />
        </div>

        {/* Right: Details */}
        <div className='flex flex-col flex-1'>
          <div className='flex items-center justify-between mb-4'>
            <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>
              {product.title}
            </h1>
            <AiOutlineHeart className='text-gray-400 hover:text-red-500 cursor-pointer text-2xl' />
          </div>

          <p className='text-gray-600 text-sm mb-2'>{product.category}</p>

          {/* Rating */}
          <div className='flex items-center text-yellow-500 mb-4'>
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`h-5 w-5 ${
                  i < Math.round(product.rating?.rate || 0)
                    ? 'fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className='ml-2 text-sm text-gray-600'>
              {product.rating?.rate ?? 0} ({product.rating?.count ?? 0})
            </span>
          </div>

          {/* Price */}
          <div className='mb-6'>
            {hasDiscount ? (
              <div className='flex items-center gap-3'>
                <span className='text-2xl font-bold text-blue-600'>
                  ${finalPrice}
                </span>
                <span className='line-through text-gray-500'>
                  ${product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className='text-2xl font-bold text-gray-900'>
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className='text-gray-700 leading-relaxed mb-6'>
            {product.description}
          </p>

          {/* Add to Cart */}
          <button className='flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition w-fit'>
            <BsCartPlus /> Add to Cart
          </button>
        </div>
      </motion.div>

      {/* Reviews */}
      <div className='mt-12'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-xl font-semibold text-gray-800'>Reviews</h2>
          {/* Filter */}
          <select
            className='border rounded px-3 py-2 text-sm'
            value={filterStars ?? ''}
            onChange={(e) =>
              setFilterStars(e.target.value ? Number(e.target.value) : null)
            }
          >
            <option value=''>All Stars</option>
            {[5, 4, 3, 2, 1].map((s) => (
              <option key={s} value={s}>
                {s} Stars
              </option>
            ))}
          </select>
        </div>

        {paginatedReviews.length === 0 ? (
          <p className='text-black'>No reviews yet.</p>
        ) : (
          <div className='space-y-6'>
            {paginatedReviews.map((review) => (
              <div key={review.id} className='border-b pb-4'>
                <div className='flex items-center gap-2 mb-1'>
                  <span className='font-semibold'>{review.user}</span>
                  <span className='text-xs text-black/50'>
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <div className='flex items-center text-yellow-500 mb-2'>
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? 'fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className='text-gray-700 text-sm mb-2'>{review.comment}</p>
                {review.photos.length > 0 && (
                  <div className='flex gap-2'>
                    {review.photos.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt='review'
                        className='w-20 h-20 object-cover rounded'
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className='flex items-center justify-between border-t border-white/10 px-4 py-3 sm:px-6 mt-6'>
            <div className='flex flex-1 justify-between sm:hidden'>
              {/* Mobile Prev */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium ${
                  currentPage === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-200 hover:bg-white/10'
                }`}
              >
                Previous
              </button>

              {/* Mobile Next */}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`relative ml-3 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium ${
                  currentPage === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-200 hover:bg-white/10'
                }`}
              >
                Next
              </button>
            </div>

            {/* Pagination */}
            <div className='flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:items-center'>
              {/* Results Count */}
              <p className='text-sm text-gray-300'>
                Showing{' '}
                <span className='font-medium'>
                  {(currentPage - 1) * 10 + 1}
                </span>{' '}
                to{' '}
                <span className='font-medium'>
                  {Math.min(currentPage * 10, totalPages * 10)}
                </span>{' '}
                of <span className='font-medium'>{totalPages * 10}</span>{' '}
                results
              </p>

              {/* Page Numbers */}
              <nav
                aria-label='Pagination'
                className='isolate inline-flex -space-x-px rounded-md'
              >
                {/* Prev */}
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 disabled:opacity-40'
                >
                  <span className='sr-only'>Previous</span>
                  <svg
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                    className='size-5'
                  >
                    <path
                      d='M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z'
                      clipRule='evenodd'
                      fillRule='evenodd'
                    />
                  </svg>
                </button>

                {/* Dynamic Page Numbers (max 6 shown) */}
                {(() => {
                  const pageNumbers = [];
                  let start = Math.max(1, currentPage - 2);
                  const end = Math.min(totalPages, start + 5);

                  if (end - start < 5) start = Math.max(1, end - 5);

                  for (let i = start; i <= end; i++) {
                    pageNumbers.push(
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 ${
                          currentPage === i
                            ? 'z-10 bg-indigo-500 text-white'
                            : 'text-gray-200 inset-ring inset-ring-gray-700 hover:bg-white/5'
                        }`}
                      >
                        {i}
                      </button>
                    );
                  }

                  return pageNumbers;
                })()}

                {/* Next */}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 disabled:opacity-40'
                >
                  <span className='sr-only'>Next</span>
                  <svg
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                    className='size-5'
                  >
                    <path
                      d='M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z'
                      clipRule='evenodd'
                      fillRule='evenodd'
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductOverview;
