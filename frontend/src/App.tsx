import { Match, SingleEliminationBracket, createTheme } from '@g-loot/react-tournament-brackets';
import './App.css';

import { NavBar } from './Components/NavBar';
import CompositionTournament from './Components/CompositionTournament';
import { BoxTeam } from './Components/BoxTeam';
import { Grid } from '@mui/material';

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

const dataSet2 = {
  matches: [
    [
      { name: 'team1', score: 2 },
      { name: 'team2', score: 2 },
    ],
    [
      { name: 'team3', score: 2 },
      { name: 'team4', score: 2 },
    ],
  ],
  children: [
    {
      matches: [
        [
          { name: 'team9', score: 2 },
          { name: 'team10', score: 2 },
        ],
      ],
      children: [],
    },
  ],
};

const dataSet3 = {
  matches: [
    [
      { name: 'Real Bañil', score: 2 },
      { name: 'team2', score: 2 },
    ],
    [
      { name: 'team3', score: 2 },
      { name: 'team4', score: 2 },
    ],
    [
      { name: 'team5', score: 2 },
      { name: 'team6', score: 2 },
    ],
    [
      { name: 'team7', score: 2 },
      { name: 'team8', score: 2 },
    ],
    [
      { name: 'team7', score: 2 },
      { name: 'team8', score: 2 },
    ],
    [
      { name: 'team7', score: 2 },
      { name: 'team8', score: 2 },
    ],
    [
      { name: 'team7', score: 2 },
      { name: 'team8', score: 2 },
    ],
    [
      { name: 'team7', score: 2 },
      { name: 'team8', score: 2 },
    ],
  ],
  children: [
    {
      matches: [
        [
          { name: 'team9', score: 2 },
          { name: 'team10', score: 2 },
        ],
        [
          { name: 'team11', score: 2 },
          { name: 'team12', score: 2 },
        ],
        [
          { name: 'team7', score: 2 },
          { name: 'team8', score: 2 },
        ],
        [
          { name: 'team7', score: 2 },
          { name: 'team8', score: 2 },
        ],
      ],
      children: [
        {
          matches: [
            [
              { name: 'team9', score: 2 },
              { name: 'team10', score: 2 },
            ],
            [
              { name: 'team7', score: 2 },
              { name: 'team8', score: 2 },
            ],
          ],
          children: [
            {
              matches: [
                [
                  { name: 'team9', score: 2 },
                  { name: 'team10', score: 2 },
                ],
              ],
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
    <>
      {/*
        <div className="App">
          <NavBar>
            <SingleEliminationBracket
              matches={matches}
              matchComponent={Match}
              theme={WhiteTheme}
              options={{
                style: { connectorColor: 'black', connectorColorHighlight: 'blue' },
              }}
            />
          </NavBar>
        </div>
      */}
      <Grid sx={{ display: 'flex' }}>
        <CompositionTournament dataSet={dataSet}></CompositionTournament>
      </Grid>
    </>
  );
}

export default App;

export const matches = [
  {
    id: 19753,
    nextMatchId: null,
    tournamentRoundText: '3',
    startTime: '2021-05-30',
    state: 'SCHEDULED',
    participants: [],
  },
  {
    id: 19754,
    nextMatchId: 19753,
    tournamentRoundText: '2',
    startTime: '2021-05-30',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'd16315d4-7f2d-427b-ae75-63a1ae82c0a8',
        resultText: null,
        isWinner: false,
        status: null,
        name: 'Aids Team',
        picture: 'teamlogos/client_team_default_logo',
      },
    ],
  },
  {
    id: 19755,
    nextMatchId: 19754,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '14754a1a-932c-4992-8dec-f7f94a339960',
        resultText: '1',
        isWinner: false,
        status: 'PLAYED',
        name: 'CoKe BoYz',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: 'd16315d4-7f2d-427b-ae75-63a1ae82c0a8',
        resultText: '4',
        isWinner: true,
        status: 'PLAYED',
        name: 'Aids Team',
        picture: 'teamlogos/client_team_default_logo',
      },
    ],
  },
  {
    id: 19756,
    nextMatchId: 19754,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'RUNNING',
    participants: [
      {
        id: 'd8b9f00a-0ffa-4527-8316-da701894768e',
        resultText: null,
        isWinner: false,
        status: null,
        name: 'Art of kill',
        picture: 'teamlogos/client_team_default_logo',
      },
    ],
  },
  {
    id: 19757,
    nextMatchId: 19753,
    tournamentRoundText: '2',
    startTime: '2021-05-30',
    state: 'SCHEDULED',
    participants: [],
  },
  {
    id: 19758,
    nextMatchId: 19757,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCHEDULED',
    participants: [
      {
        id: '9397971f-4b2f-44eb-a094-722eb286c59b',
        resultText: null,
        isWinner: false,
        status: null,
        name: 'Crazy Pepes',
        picture: 'teamlogos/client_team_default_logo',
      },
    ],
  },
  {
    id: 19759,
    nextMatchId: 19757,
    tournamentRoundText: '1',
    startTime: '2021-05-30',
    state: 'SCHEDULED',
    participants: [
      {
        id: '42fecd89-dc83-4821-80d3-718acb50a30c',
        resultText: null,
        isWinner: false,
        status: null,
        name: 'BLUEJAYS',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: 'df01fe2c-18db-4190-9f9e-aa63364128fe',
        resultText: null,
        isWinner: false,
        status: null,
        name: 'Bosphorus',
        picture: 'teamlogos/r7zn4gr8eajivapvjyzd',
      },
    ],
  },
];

const GlootTheme = createTheme({
  roundHeader: { backgroundColor: '#3B3F73', fontColor: '#F4F2FE' },
  connectorColor: '#3B3F73',
  connectorColorHighlight: 'rgba(152,82,242,0.4)',
  svgBackground: '#0F121C',
  textColor: { main: '#000000', highlighted: '#F4F2FE', dark: '#707582' },
  matchBackground: { wonColor: '#2D2D59', lostColor: '#1B1D2D' },
  score: {
    background: {
      wonColor: `#10131C`,
      lostColor: '#10131C',
    },
    text: { highlightedWonColor: '#7BF59D', highlightedLostColor: '#FB7E94' },
  },
  border: {
    color: '#292B43',
    highlightedColor: 'RGBA(152,82,242,0.4)',
  },
  canvasBackground: 'red',
});

const WhiteTheme = createTheme({
  textColor: { main: 'red', highlighted: '#07090D', dark: '#3E414D' },
  matchBackground: { wonColor: 'lightgreen', lostColor: 'white' },
  score: {
    background: { wonColor: 'green', lostColor: 'orange' },
    text: { highlightedWonColor: 'white', highlightedLostColor: 'white' },
  },
  border: {
    color: '#CED1F2',
    highlightedColor: '#da96c6',
  },
  roundHeader: { backgroundColor: '#da96c6', fontColor: '#000' },
});
