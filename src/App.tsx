// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Suspense, lazy } from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { store } from './stores/store';
import Layout from './features/layout/Layout';
import Loading from './pages/Loading';

const delayImport = <P, T extends { default: React.ComponentType<P> }>(
  importFunc: () => Promise<T>,
  delay: number = 1000
): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(() => {
      importFunc().then(resolve);
    }, delay);
  });

// Lazy-loaded pages
const HomePage = lazy(() => delayImport(() => import('./pages/HomePage')));
const FAQPage = lazy(() => delayImport(() => import('./pages/FAQPage')));
const LoginPage = lazy(() => delayImport(() => import('./pages/LoginPage')));
const RegisterPage = lazy(() =>
  delayImport(() => import('./pages/RegisterPage'))
);
const ShopPage = lazy(() => delayImport(() => import('./pages/ShopPage')));
const GiftCardPage = lazy(() =>
  delayImport(() => import('./pages/GiftCardPage'))
);
const About = lazy(() => delayImport(() => import('./pages/AboutPage')));
const Contact = lazy(() => delayImport(() => import('./pages/ContactPage')));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// const NotFoundPage = lazy(() =>
//   delayImport(() => import('./pages/NotFoundPage'))
// );

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path='/faq' element={<FAQPage />} />
              <Route path='/gift-card' element={<GiftCardPage />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/shop' element={<ShopPage />} />
            </Route>
            <Route path='*' element={<NotFoundPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}
