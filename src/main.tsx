import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Header from "./component/Header.tsx";
import { BrowserRouter, Routes } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Header />
            <Routes>
                {/* ... other routes */}
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);