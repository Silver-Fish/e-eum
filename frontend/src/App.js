import { Route } from 'react-router-dom';
import { 
  Category 
} from './pages';

import './App.css';

function App() {
  return (
    <div className="App">
      <Route path="/category" component={ Category } />
    </div>
  )
}

export default App;
