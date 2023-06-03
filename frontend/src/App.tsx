import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { DashboardClasification } from './pages/DashboardClasification';
import { Login } from './pages/Login';
import { Veedor } from './pages/Inspector';
import { Tournaments } from './pages/TournamentPage';
import { DashboardElimination } from './pages/DashboardElimination';
import { PrivateRoute } from './components/Route';
import { Admin } from './pages/Admin';
import { AdminInscription } from './pages/AdminInscription';

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
          <PrivateRoute role="reviewer" redirectTo="/login">
            <Veedor />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/tournaments"
        element={
          <PrivateRoute role="admin" redirectTo="/login">
            <Admin />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/inscriptions"
        element={
          <PrivateRoute role="admin" redirectTo="/login">
            <AdminInscription />
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default App;
