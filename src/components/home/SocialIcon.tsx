import { FaInstagram, FaFacebookF, FaPinterestP } from 'react-icons/fa';

const SocialIcons = () => {
  return (
    <div className='hidden md:flex fixed right-4 top-1/3 flex-col space-y-4 z-50'>
      <a
        href='https://instagram.com'
        target='_blank'
        rel='noopener noreferrer'
        className='bg-pink-500 p-3 rounded-full shadow-lg hover:bg-pink-600 transition'
      >
        <FaInstagram className='text-white text-xl' />
      </a>
      <a
        href='https://facebook.com'
        target='_blank'
        rel='noopener noreferrer'
        className='bg-blue-600 p-3 rounded-full shadow-lg hover:bg-blue-700 transition'
      >
        <FaFacebookF className='text-white text-xl' />
      </a>
      <a
        href='https://pinterest.com'
        target='_blank'
        rel='noopener noreferrer'
        className='bg-red-600 p-3 rounded-full shadow-lg hover:bg-red-700 transition'
      >
        <FaPinterestP className='text-white text-xl' />
      </a>
    </div>
  );
};

export default SocialIcons;
