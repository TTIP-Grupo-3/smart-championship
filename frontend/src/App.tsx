import './App.css';
import { Navbar } from './components/NavBar';
import { ComposeDashboard } from './components/ComposerDashboard';

function App() {
  return (
    <Navbar>
      <ComposeDashboard />
    </Navbar>
  );
}

export default App;
