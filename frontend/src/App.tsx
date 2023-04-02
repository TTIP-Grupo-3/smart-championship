import './App.css';
import { NavBar } from './Components/NavBar';
import { ComposeDashboard } from './Components/ComposerDashboard';

const dataSet = {
  matches: [
    { name: 'team1', score: 2 },
    { name: 'team2', score: 2 },
    { name: 'team3', score: 2 },
    { name: 'team4', score: 2 },

    { name: 'team5', score: 2 },
    { name: 'team6', score: 2 },

    { name: 'team7', score: 2 },
    { name: 'team8', score: 2 },
  ],
  children: [
    {
      matches: [
        { name: 'team9', score: 2 },
        { name: 'team10', score: 2 },
        { name: 'team11', score: 2 },
        { name: 'team12', score: 2 },
      ],
      children: [
        {
          matches: [
            { name: 'team13', score: 2 },
            { name: 'team14', score: 2 },
          ],
          children: [
            {
              matches: [{ name: 'team15', score: 2 }],
              children: [],
            },
          ],
        },
      ],
    },
  ],
};

function App() {
  return (
    <NavBar>
      <ComposeDashboard dataSet={dataSet} />
    </NavBar>
  );
}

export default App;
