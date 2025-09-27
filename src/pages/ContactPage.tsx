const ContactPage = () => {
  return (
    <>
      {/* Contact Form Section */}
      <section className='max-w-6xl mx-auto py-16 px-6'>
        <div className='grid md:grid-cols-2 gap-10 items-stretch'>
          {/* Left Side - Team Image (hidden on small screens) */}
          <div className='hidden md:block'>
            <img
              src='/images/contact-us.jpg'
              alt='Our Team'
              className='w-full h-full object-cover rounded-lg shadow'
            />
          </div>

          {/* Right Side - Contact Form */}
          <div className='flex flex-col'>
            <h1 className='text-3xl font-bold mb-4'>Let’s Get In Touch</h1>
            <p className='text-gray-600 mb-6'>
              Or just reach out manually to{' '}
              <a
                href='mailto:hello@slothui.com'
                className='text-indigo-600 hover:underline'
              >
                hello@slothui.com
              </a>
            </p>
            <form className='flex flex-col gap-4 flex-1'>
              <input
                type='text'
                placeholder='Your Name'
                className='border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500'
                required
              />
              <input
                type='email'
                placeholder='Your Email'
                className='border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500'
                required
              />
              <textarea
                placeholder='Your Message'
                className='border p-3 rounded-lg w-full flex-1 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500'
                required
              />
              <button
                type='submit'
                className='bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition'
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Options Section */}
      <section className='bg-white py-20 border-t'>
        <div className='max-w-6xl mx-auto px-6'>
          {/* Heading */}
          <div className='text-left mb-12'>
            <span className='inline-block px-4 py-1 text-sm rounded-full bg-gray-100 border border-gray-300 mb-4'>
              Reach Out To Us
            </span>
            <h2 className='text-3xl font-bold mb-2'>
              We’d Love to Hear From You.
            </h2>
            <p className='text-gray-600'>
              Or just reach out manually to{' '}
              <a
                href='mailto:hello@slothui.com'
                className='text-indigo-600 hover:underline'
              >
                hello@slothui.com
              </a>
            </p>
          </div>

          {/* Contact Options Grid */}
          <div className='grid md:grid-cols-3 gap-8 text-center'>
            {/* Email Support */}
            <div className='p-6 rounded-lg border hover:shadow-lg transition'>
              <div className='flex justify-center mb-4'>
                <span
                  role='img'
                  aria-label='Email'
                  className='p-3 rounded-full bg-indigo-100 text-indigo-600 text-xl'
                >
                  📧
                </span>
              </div>
              <h3 className='font-semibold text-lg mb-2'>Email Support</h3>
              <p className='text-gray-600 mb-2'>
                Our team can respond in real time.
              </p>
              <a
                href='mailto:hello@slothui.com'
                className='text-indigo-600 hover:underline'
              >
                hello@slothui.com
              </a>
            </div>

            {/* Visit Our Office */}
            <div className='p-6 rounded-lg border hover:shadow-lg transition'>
              <div className='flex justify-center mb-4'>
                <span
                  role='img'
                  aria-label='Office'
                  className='p-3 rounded-full bg-indigo-100 text-indigo-600 text-xl'
                >
                  🏢
                </span>
              </div>
              <h3 className='font-semibold text-lg mb-2'>Visit Our Office</h3>
              <p className='text-gray-600 mb-2'>
                Visit our location in real life.
              </p>
              <a href='#' className='text-indigo-600 hover:underline'>
                221b Elementary Avenue, NY
              </a>
            </div>

            {/* Call Us Directly */}
            <div className='p-6 rounded-lg border hover:shadow-lg transition'>
              <div className='flex justify-center mb-4'>
                <span
                  role='img'
                  aria-label='Phone'
                  className='p-3 rounded-full bg-indigo-100 text-indigo-600 text-xl'
                >
                  📞
                </span>
              </div>
              <h3 className='font-semibold text-lg mb-2'>Call Us Directly</h3>
              <p className='text-gray-600 mb-2'>
                Available during working hours.
              </p>
              <a
                href='tel:+12344567789'
                className='text-indigo-600 hover:underline'
              >
                (+1) 234 - 4567 - 789
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;