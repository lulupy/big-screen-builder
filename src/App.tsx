import { useRoutes } from 'react-router';
import { routes } from './routes';
import './App.css';

function App() {
  const element = useRoutes(routes);
  return element;
}

export default App;
