import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Header from "./component/Header.tsx";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home.tsx";
import Equipe from './pages/Equipe.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/equipe' element={<Equipe/>}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);