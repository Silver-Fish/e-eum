import { Route, Switch } from 'react-router-dom';
import { 
  Main, Category, CategoryCard
} from './pages';

import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={ Main } />
      <Switch>
        <Route path="/category/:situation" component={ CategoryCard } />
        <Route path="/category" component={ Category } />
      </Switch>
    </div>
  )
}

export default App;
