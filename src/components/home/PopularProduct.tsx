import { AiOutlineEye, AiOutlineHeart } from 'react-icons/ai';
import { useShopStore } from '../../stores/useProductStore';
import { BsCartPlus } from 'react-icons/bs';
import useToast from '../../hook/useToast';
import { handleFetchBaseQueryError } from '../../utils/errorFactory';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { FaStar } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const PopularProduct = () => {
  const { popularItems, addToCart } = useShopStore();
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

  return (
    <div className='flex flex-wrap gap-6 max-w-7xl mx-auto px-6 pt-6 pb-12'>
      {/* Breadcrumb */}
      {/* <nav className='text-sm text-gray-500 mb-6'>
            <span className='cursor-pointer hover:underline'>Home</span> &gt;{' '}
            <span className='cursor-pointer hover:underline'>Products</span> &gt;{' '}
            <span className='font-medium text-gray-800'>Electronics</span>
          </nav> */}

      {popularItems.map((product) => (
        <div
          key={product.id}
          className='flex flex-col flex-1 min-w-[250px] max-w-sm border rounded-lg p-4 hover:shadow-lg transition bg-white'
        >
          {/* Product Image */}
          <div className='w-full h-40 bg-gray-200 flex items-center justify-center rounded mb-4'>
            <img src={product.image} alt={product.title} className='max-h-32' />
          </div>

          <div className='flex items-center justify-between mb-2'>
            {/* Icons */}
            <div className='flex gap-4 text-gray-400 text-lg'>
              <AiOutlineEye className='cursor-pointer hover:text-gray-600' />
              <AiOutlineHeart className='cursor-pointer hover:text-red-500' />
            </div>

            {/* Discount Badge */}
            {product.discount && (
              <span className='bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded'>
                {product.discount}
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3
            onClick={() => navigate(`/shop/${product.id}`)}
            className='font-medium text-gray-800 mb-2 line-clamp-2 cursor-pointer hover:underline'
          >
            {product.title}
          </h3>

          {/* Spacer pushes rest down */}
          <div className='mt-auto'>
            {/* Rating */}
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

            {/* Price + Actions */}
            <div className='flex justify-between items-center'>
              <span className='text-xl font-bold'>${product.price}</span>
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
      ))}

      {/* Show more button */}
      <div className='w-full flex justify-center mt-8'>
        <button
          className='px-6 py-2 border rounded hover:bg-gray-100 transition'
          onClick={() => navigate('/shop')}
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default PopularProduct;
