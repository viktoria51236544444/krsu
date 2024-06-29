import React, { createContext, useContext } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Toast = withReactContent(Swal.mixin({
    toast: true,
    position: 'top-right',
    showConfirmButton: false,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
}));

// Создаем контекст для управления toast уведомлениями
const ToastContext = createContext();

export const useToast = () => {
    return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
    const showToast = ({ title, text, icon, timer = 1000 }) => {
        Toast.fire({
            title,
            text,
            icon,
            timer
        });
    };

    const successToast = (title, text, timer) => showToast({ title, text, icon: 'success', timer });
    const errorToast = (title, text, timer) => showToast({ title, text, icon: 'error', timer });
    const infoToast = (title, text, timer) => showToast({ title, text, icon: 'info', timer });
    const warningToast = (title, text, timer) => showToast({ title, text, icon: 'warning', timer });

    return (
        <ToastContext.Provider value={{ successToast, errorToast, infoToast, warningToast }}>
            {children}
        </ToastContext.Provider>
    );
};

export { ToastContext };
