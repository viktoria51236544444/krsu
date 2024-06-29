import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContextProviderRegister from './Context/ContextProviderRegister';
import { ToastProvider } from "./Context/ToastContext";
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ToastProvider>
                <ContextProviderRegister>
                    <App />
                </ContextProviderRegister>
            </ToastProvider>
        </BrowserRouter>
    </React.StrictMode>
);
