import { Route } from 'react-router-dom';
import { 
  Category , Login
} from './pages';

import './App.css';

function App() {
  return (
    <div className="App">
      <Route path="/category" component={ Category } />
      <Route path="/login" component={ Login } />
    </div>
  )
}

export default App;
