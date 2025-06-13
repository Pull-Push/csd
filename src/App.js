import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom'
import Dashboard from './components/dashboard';
import Game from './components/game';

import TestDashboard from './components/testdashboard';
import TestGame from './components/testgame';
import TestGameOver from './components/testgameover';

const router = createBrowserRouter(createRoutesFromElements([
  <Route path='/' element={<Dashboard />} />,
  <Route path='/game' element={<Game />} />,
  <Route path='/test' element={<TestDashboard />} />,
  <Route path='/testgame' element={<TestGame />} />,
  <Route path='/testgameover' element={<TestGameOver />} />,
]));
function App() {
  return (
    <RouterProvider router={ router } />
  );
}

export default App;
