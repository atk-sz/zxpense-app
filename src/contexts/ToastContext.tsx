import React, { createContext, useContext, ReactNode } from 'react';
import { ToastComponent } from '../components';
import { IToastContextType } from '../utils/interfaces';
import useToastHandler from '../hooks/useToast.hook';

const ToastContext = createContext<IToastContextType | undefined>(undefined);

export const useToast = (): IToastContextType => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const { visible, message, type, showToast } = useToastHandler();

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {visible && <ToastComponent message={message} type={type} />}
    </ToastContext.Provider>
  );
};
