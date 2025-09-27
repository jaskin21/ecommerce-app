const GiftCardPage = () => {
  return (
    <section className='max-w-3xl mx-auto py-12 px-6 text-center'>
      <h1 className='text-3xl font-bold mb-4'>Gift Cards</h1>
      <p className='text-lg leading-relaxed text-gray-700 mb-6'>
        Looking for the perfect gift? A <strong>JAS Ecommerce Gift Card</strong>{' '}
        lets your friends and loved ones choose exactly what they want. Whether
        it’s the latest tech, stylish clothing, or everyday essentials, our gift
        cards make shopping simple and thoughtful.
      </p>
      <p className='text-lg leading-relaxed text-gray-700 mb-6'>
        Available in multiple amounts, gift cards can be delivered instantly by
        email — no wrapping required. They’re great for birthdays, holidays,
        celebrations, or even as a “just because” surprise.
      </p>
      <button className='bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition'>
        Buy a Gift Card
      </button>
    </section>
  );
};

export default GiftCardPage;
