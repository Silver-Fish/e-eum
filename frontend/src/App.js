import { Route } from 'react-router-dom';
import { 
  Main, Category 
} from './pages';

import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={ Main } />
      <Route path="/category" component={ Category } />
    </div>
  )
}

export default App;
