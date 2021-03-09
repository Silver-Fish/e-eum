import { Route } from 'react-router-dom';
import { 
  Category , Login, UserRegister
} from './pages';

import './App.css';

function App() {
  return (
    <div className="App">
      <Route path="/category" component={ Category } />
      <Route path="/login" component={ Login } />
      <Route path="/userRegister" component={ UserRegister } />
    </div>
  )
}

export default App;
