import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { DashBoard } from './pages/Dashboard';

const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DashBoard />} />
    </Routes>
  </BrowserRouter>
);

export default App;
