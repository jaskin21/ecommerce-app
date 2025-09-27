import { motion } from "framer-motion";
import { FaInstagram, FaFacebookF, FaPinterestP } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

const SocialIcons = () => {
  const { isOpen } = useCart();

  return (
    <motion.div
      animate={{
        right: isOpen ? (window.innerWidth >= 1024 ? 520 : 420) : 16,
      }}
      transition={{ type: 'tween' }}
      className='hidden md:flex fixed top-1/3 flex-col space-y-4 z-30'
    >
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
    </motion.div>
  );
};

export default SocialIcons;