import { Route } from 'react-router-dom';
import { 
  Category , Login, UserRegister, MyPage, Main, Confirm,UserUpdate
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
      <Route path="/userUpdate" component={ UserUpdate } />
    </div>
  )
}

export default App;
