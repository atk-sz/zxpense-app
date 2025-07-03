import { useCallback, useState } from 'react';
import { ToastType } from '../utils/interfaces';

const useToastHandler = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<ToastType>('info');

  const showToast = useCallback((msg: string, t: ToastType = 'info') => {
    setMessage(msg);
    setType(t);
    setVisible(true);

    // auto-hide after 3 seconds
    setTimeout(() => setVisible(false), 3000);
  }, []);

  return { visible, message, type, showToast };
};

export default useToastHandler;
