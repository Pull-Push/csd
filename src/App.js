import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom'
import Dashboard from './components/dashboard';
import Game from './components/game';


const router = createBrowserRouter(createRoutesFromElements([
  <Route path='/' element={<Dashboard />} />,
  <Route path='/game' element={<Game />} />,
]));
function App() {
  return (
    <RouterProvider router={ router } />
  );
}

export default App;
