import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { DashboardClasification } from './pages/DashboardClasification';
import { Login } from './pages/Login';
import { Reviewer } from './pages/Reviewer';
import { Tournaments } from './pages/TournamentPage';
import { DashboardElimination } from './pages/DashboardElimination';
import { PrivateRoute } from './components/PrivateRoute';
import { Admin } from './pages/Admin';
import { AdminEnrollment as AdminEnrollment } from './pages/AdminEnrollment';
import { RegisterLeader } from './pages/RegisterLeader';
import { TeamLeader } from './pages/TeamLeader';
import { TournamentsToStart } from './pages/EnrollTournament';
import { EnrollReservation } from './pages/EnrollingReservation';
import { UploadReceipt } from './pages/UploadReceipt';
import { PublicRoute } from './components/PublicRoute';
import { EnrollingDetails } from './pages/EnrollingDetails';

const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Tournaments />} />
      <Route path="/eliminacion/:id" element={<DashboardElimination />} />
      <Route path="/clasificacion/:id" element={<DashboardClasification />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterLeader />{' '}
          </PublicRoute>
        }
      />
      <Route
        path="/reviewer"
        element={
          <PrivateRoute role="reviewer" redirectTo="/login">
            <Reviewer />
          </PrivateRoute>
        }
      />
      <Route
        path="/leader"
        element={
          <PrivateRoute role="team_leader" redirectTo="/login">
            <TeamLeader />
          </PrivateRoute>
        }
      />
      <Route
        path="/leader/enrolling"
        element={
          <PrivateRoute role="team_leader" redirectTo="/login">
            <TeamLeader />
          </PrivateRoute>
        }
      />
      <Route
        path="/leader/enrolling/reservation/:id"
        element={
          <PrivateRoute role="team_leader" redirectTo="/login">
            <EnrollReservation />
          </PrivateRoute>
        }
      />
      <Route
        path="/leader/enrolling/receipt/:id/upload/:enrollId"
        element={
          <PrivateRoute role="team_leader" redirectTo="/login">
            <UploadReceipt />
          </PrivateRoute>
        }
      />
      <Route
        path="/leader/enrollment/tournaments"
        element={
          <PrivateRoute role="team_leader" redirectTo="/login">
            <TournamentsToStart />
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
        path="/admin/enrollments/:championshipId"
        element={
          <PrivateRoute role="admin" redirectTo="/login">
            <AdminEnrollment />
          </PrivateRoute>
        }
      />
      <Route
        path="/leader/enrollments/:id/enrollment/:enrollmentId/details"
        element={
          <PrivateRoute role="team_leader" redirectTo="/login">
            <EnrollingDetails />
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default App;
