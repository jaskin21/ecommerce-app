import { useCallback } from 'react';
import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastConfig: ToastOptions = {
  position: 'top-center', // ✅ show on middle bottom
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

const useToast = () => {
  const showSuccessToast = useCallback((message: string) => {
    toast.success(message, {
      ...toastConfig,
    });
  }, []);

  const showErrorToast = useCallback((message: string) => {
    toast.error(message, {
      ...toastConfig,
    });
  }, []);

  return { showSuccessToast, showErrorToast };
};

export default useToast;
