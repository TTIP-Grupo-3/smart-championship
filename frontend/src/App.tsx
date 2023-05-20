import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { DashboardClasification } from './pages/DashboardClasification';
import { Login } from './pages/Login';
import { Veedor } from './pages/Inspector';
import { Tournaments } from './pages/Tournaments';
import { DashboardElimination } from './pages/DashboardElimination';
import { PrivateRoute } from './components/Route';

const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Tournaments />} />
      <Route path="/eliminacion/:id" element={<DashboardElimination />} />
      <Route path="/clasificacion/:id" element={<DashboardClasification />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/inspector"
        element={
          <PrivateRoute role="inspector" redirectTo="/login">
            <Veedor />
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default App;
