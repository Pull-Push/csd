import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom'
import Dashboard from './components/dashboard';
import Game from './components/game';
import GameOver from './components/gameover';

const router = createBrowserRouter(createRoutesFromElements([
  <Route path='/' element={<Dashboard />} />,
  <Route path='/game' element={<Game />} />,
  <Route path='/gameover' element={<GameOver />} />,
]));
function App() {
  return (
    <RouterProvider router={ router } />
  );
}

export default App;
