import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { DashboardClasification } from './pages/DashboardClasification';
import { Login } from './pages/Login';
import { Veedor } from './pages/Veedor';
import { Tournaments } from './pages/Tournaments';
import { DashboardElimination } from './pages/DashboardElimination';

const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Tournaments />} />
      <Route path="/eliminacion" element={<DashboardElimination />} />
      <Route path="/clasificacion" element={<DashboardClasification />} />
      <Route path="/login" element={<Login />} />
      <Route path="/inspector" element={<Veedor />} />
    </Routes>
  </BrowserRouter>
);

export default App;
