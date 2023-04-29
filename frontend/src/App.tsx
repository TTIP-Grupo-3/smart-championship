import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Dashboard } from './pages/Dashboard';
import { DashboardClasification } from './pages/DashboardClasification';
import { Login } from './pages/Login';
import { Veedor } from './pages/Veedor';

const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/clasification" element={<DashboardClasification />} />
      <Route path="/login" element={<Login />} />
      <Route path="/inspector" element={<Veedor />} />
    </Routes>
  </BrowserRouter>
);

export default App;
