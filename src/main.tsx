import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Header from "./component/Header.tsx";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home.tsx";
import Projects from "./pages/Projects.tsx";
import Project from "./pages/Project.tsx";
import Publications from "./pages/Publications.tsx";
import Team from './pages/Team.tsx';
import Person from './pages/Person.tsx';
import Conferences from './pages/Conferences.tsx';
import Contact from "./pages/Contact";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/equipe' element={<Team/>}/>
                <Route path='/person/:id' element={<Person/>} />
                <Route path="/projets" element={<Projects />}/>
                <Route path="/projets/:projectId" element={<Project />} />
                <Route path="/publications" element={<Publications />} />
                <Route path="//conferences-seminaires" element={<Conferences />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);