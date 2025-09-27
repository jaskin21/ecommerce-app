import PopularProducts from '../components/home/PopularProduct';
import { Minus, Plus, X } from 'lucide-react';
import { useShopStore } from '../stores/useProductStore';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { handleFetchBaseQueryError } from '../utils/errorFactory';
import useToast from '../hook/useToast';
import useDeleteConfirmation from '../hook/useConfirmationDelete';
import DeleteConfirmationModal from '../components/hook/DeleteConfirmationModal';

export default function CartPage() {
  const {
    getCartDetails,
    removeFromCart,
    updateCount,
    getSummary,
  } = useShopStore();

    const { originalPrice, savings, storePickup, tax, total } = getSummary();

  const {
    isModalOpen,
    openModal,
    closeModal,
    confirmDelete,
    setConfirmCallback,
  } = useDeleteConfirmation();

  const { showSuccessToast, showErrorToast } = useToast();

  const cartDetails = getCartDetails();


  const handleRemoveToCart = (id: number) => {
    try {
      setConfirmCallback(async () => {
        removeFromCart(id);
        showSuccessToast('Removed from cart successfully!');
      });
      openModal();
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
    <div className='max-w-6xl mx-auto p-6 space-y-8'>
      {/* Page Title */}
      <h2 className='text-2xl font-semibold'>Shopping Cart</h2>

      {/* Cart + Order Summary */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* Cart Items */}
        <div className='col-span-2 space-y-4'>
          {cartDetails.length === 0 ? (
            <p className='text-gray-600 text-lg'>No items in the cart.</p>
          ) : (
            cartDetails.map(({ product, count, subtotal }) => (
              <div
                key={product.id}
                className='flex items-start justify-between border rounded-lg p-4 shadow-sm'
              >
                {/* Image */}
                <img
                  src={product.image}
                  alt={product.title}
                  className='w-14 h-14 sm:w-16 sm:h-16 rounded-md object-cover'
                />

                {/* Details */}
                <div className='flex-1 px-4'>
                  <h3 className='font-medium'>{product.title}</h3>
                  <p className='text-sm text-gray-500 line-clamp-2'>
                    {product.description}
                  </p>
                  <div className='flex items-center gap-3 mt-2'>
                    <button className='text-sm text-gray-600 hover:text-black'>
                      ♡ Add to Favorites
                    </button>
                    <button
                      onClick={() => handleRemoveToCart(product.id)}
                      className='text-sm text-red-600 hover:underline'
                    >
                      <X className='inline-block w-4 h-4 mr-1' />
                      Remove
                    </button>
                  </div>
                </div>

                {/* Quantity & Price */}
                <div className='flex items-center gap-3'>
                  <button
                    onClick={() => updateCount(product.id, count - 1)}
                    className='border rounded-md p-1'
                  >
                    <Minus size={16} />
                  </button>

                  <span>{count}</span>

                  <button
                    onClick={() => updateCount(product.id, count + 1)}
                    className='border rounded-md p-1'
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className='w-24 text-right font-semibold'>${subtotal}</div>
              </div>
            ))
          )}
        </div>

        {/* Order Summary */}
        <div className='border rounded-lg shadow-sm p-6 h-fit'>
          <h3 className='text-lg font-semibold mb-4'>Order summary</h3>
          <div className='space-y-2 text-sm'>
            <div className='flex justify-between'>
              <span>Original price</span>
              <span>${originalPrice.toFixed(2)}</span>
            </div>
            <div className='flex justify-between text-green-600'>
              <span>Savings</span>
              <span>- ${savings.toFixed(2)}</span>
            </div>
            <div className='flex justify-between'>
              <span>Store Pickup</span>
              <span>${storePickup.toFixed(2)}</span>
            </div>
            <div className='flex justify-between'>
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <hr />
            <div className='flex justify-between font-semibold text-lg'>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button className='mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700'>
            Proceed to Checkout
          </button>
          <p className='mt-2 text-sm text-center text-gray-600'>
            or{' '}
            <a href='#' className='text-blue-600 hover:underline'>
              Continue Shopping →
            </a>
          </p>
          {/* Voucher */}
          <div className='mt-6'>
            <p className='text-sm mb-2'>Do you have a voucher or gift card?</p>
            <div className='flex flex-wrap gap-2'>
              <input
                type='text'
                placeholder='Enter code'
                className='flex-1 min-w-[130px] border rounded-md px-3 py-2 text-sm'
              />
              <button className='w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'>
                Apply Code
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Products */}
      <div className='hidden md:block'>
        <h3 className='text-xl font-semibold mb-4'>Popular Products</h3>
        <div className='flex gap-6 overflow-x-auto'>
          <PopularProducts />
        </div>
      </div>
      {/* Delete Modal */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={() => confirmDelete()}
        message='Are you sure you want to delete this item?'
      />
    </div>
  );
}
