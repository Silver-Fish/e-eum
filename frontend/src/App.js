import { Route } from 'react-router-dom';
import { 
  Main, Category, OwnEeum 
} from './pages';

import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={ Main } />
      <Route path="/category" component={ Category } />
      <Route path="/owneeum" component={ OwnEeum } />
    </div>
  )
}

export default App;
