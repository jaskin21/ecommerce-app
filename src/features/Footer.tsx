import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaTiktok,
  FaPinterestP,
  FaXTwitter,
  FaLinkedinIn,
} from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className='bg-white border-t'>
      {/* Top Info + Subscription */}
      <div className='bg-gray-50 text-gray-800 px-6 py-12'>
        {/* About / Info */}
        <div className='mb-8'>
          {/* Newsletter Subscription */}
          <h3 className='text-2xl font-semibold mb-4 max-w-7xl mx-auto text-center'>
            Subscribe to our newsletter
          </h3>
          <p className='text-base leading-relaxed max-w-7xl mx-auto text-justify text-gray-600'>
            At JAS Ecommerce, shopping goes beyond the basics — we bring you the
            latest devices, stylish garments, and everyday essentials all in one
            place. Our store is built to give you a smooth shopping experience
            with secure checkout, fast delivery, and products you’ll love. Stay
            ahead of the trend by subscribing to our updates and be the first to
            discover new arrivals, special deals, and exclusive offers. With JAS
            Ecommerce, you don’t just shop — you stay connected to what’s new.
          </p>
        </div>
        <div className='max-w-3xl mx-auto text-center'>
          <form className='flex flex-col sm:flex-row items-center justify-center gap-3'>
            <input
              type='email'
              placeholder='Enter your email'
              className='w-full sm:flex-1 px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400'
              required
            />
            <button
              type='submit'
              className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200'
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Middle Section (Links) */}
      <div className='max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm text-gray-700'>
        {/* Product */}
        <div>
          <h3 className='font-semibold mb-3'>Product</h3>
          <ul className='space-y-2'>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                Website Templates
              </a>
            </li>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                Website Builder
              </a>
            </li>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                Website Design
              </a>
            </li>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                Features
              </a>
            </li>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                App Market
              </a>
            </li>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                Web Hosting
              </a>
            </li>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                Domain Names
              </a>
            </li>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                Accessibility
              </a>
            </li>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                Mobile App Builder
              </a>
            </li>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                AI Website Builder
              </a>
            </li>
          </ul>
        </div>

        {/* Solutions */}
        <div>
          <h3 className='font-semibold mb-3'>Solutions</h3>
          <ul className='space-y-2'>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                Online Store
              </a>
            </li>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                Online Booking
              </a>
            </li>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                Blog Website
              </a>
            </li>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                Portfolio Website
              </a>
            </li>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                eCommerce Website
              </a>
            </li>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                Enterprise Solutions
              </a>
            </li>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                Logo Maker
              </a>
            </li>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                Landing Page Builder
              </a>
            </li>
          </ul>
        </div>

        {/* Learn */}
        <div>
          <h3 className='font-semibold mb-3'>Learn</h3>
          <ul className='space-y-2'>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                Blog
              </a>
            </li>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                Privacy & Security
              </a>
            </li>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                SEO Learning Hub
              </a>
            </li>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                Docs
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className='font-semibold mb-3'>Support</h3>
          <ul className='space-y-2'>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                Help Center
              </a>
            </li>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                Hire a Professional
              </a>
            </li>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                Report Abuse
              </a>
            </li>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                System Status
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className='font-semibold mb-3'>Company</h3>
          <ul className='space-y-2'>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                Press & Media
              </a>
            </li>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                Investor Relations
              </a>
            </li>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                Careers
              </a>
            </li>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                Sitemap
              </a>
            </li>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                About
              </a>
            </li>
            <li>
              <a href='#' className='text-black hover:text-blue-500'>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className='border-t py-6 px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600'>
        {/* Social icons */}
        <div className='flex space-x-4 text-xl'>
          <a
            href='https://facebook.com'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-gray-400 hover:opacity-70 transition-colors duration-200'
          >
            <FaFacebookF />
          </a>
          <a
            href='https://youtube.com'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-gray-400 hover:opacity-70 transition-colors duration-200'
          >
            <FaYoutube />
          </a>
          <a
            href='https://instagram.com'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-gray-400 hover:opacity-70 transition-colors duration-200'
          >
            <FaInstagram />
          </a>
          <a
            href='https://tiktok.com'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-gray-400 hover:opacity-70 transition-colors duration-200'
          >
            <FaTiktok />
          </a>
          <a
            href='https://pinterest.com'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-gray-400 hover:opacity-70 transition-colors duration-200'
          >
            <FaPinterestP />
          </a>
          <a
            href='https://twitter.com'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-gray-400 hover:opacity-70 transition-colors duration-200'
          >
            <FaXTwitter />
          </a>
          <a
            href='https://linkedin.com'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-gray-400 hover:opacity-70 transition-colors duration-200'
          >
            <FaLinkedinIn />
          </a>
        </div>

        {/* Terms / Privacy / Copyright */}
        <div className='mt-4 md:mt-0'>
          <ul className='flex space-x-6'>
            <li>
              <a
                href='/terms'
                className='hover:underline text-black hover:text-blue-500'
              >
                Terms of Use
              </a>
            </li>
            <li>
              <a
                href='/privacy'
                className='hover:underline text-black hover:text-blue-500'
              >
                Privacy Policy
              </a>
            </li>
            <li>© {new Date().getFullYear()} JAS Ecommerce</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
