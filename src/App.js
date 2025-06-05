import logo from './logo.svg';
import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom'
import TestDasboard from './components/testdashboard';
import Dashboard from './components/dashboard';
import Game from './components/game';
import Randomize from './components/random';


const router = createBrowserRouter(createRoutesFromElements([
  <Route path='/' element={<Dashboard />} />,
  <Route path='/game' element={<Game />} />,
  <Route path='/test' element={<TestDasboard />} />,
  <Route path='/random' element={<Randomize />} />
]));
function App() {
  return (
    <RouterProvider router={ router } />
  );
}

export default App;
