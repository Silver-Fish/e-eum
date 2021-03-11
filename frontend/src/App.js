import { Route } from 'react-router-dom';
import { 
  Category , Login, UserRegister, MyPage, Main, Confirm
} from './pages';

import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={ Main } />
      <Route path="/category" component={ Category } />
      <Route path="/login" component={ Login } />
      <Route path="/userRegister" component={ UserRegister } />
      <Route path="/myPage" component={ MyPage } />
      <Route path="/confirm" component={ Confirm } />
    </div>
  )
}

export default App;
