import { Route, Switch } from 'react-router-dom';

import {
  OwnEeum,
  UserDelete,
  FindPassword,
  Category,
  Login,
  UserRegister,
  MyPage,
  Main,
  Confirm,
  UserUpdate,
  UserRegisterSuccess,
  Qr,
  Setting,
  Help,
  QrCard,
} from './pages';

import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/category" component={Category} />
        <Route path="/owneeum" component={OwnEeum} />
        <Route path="/login" component={Login} />
        <Route path="/userRegister" component={UserRegister} />
        <Route path="/myPage" component={MyPage} />
        <Route path="/confirm" component={Confirm} />
        <Route path="/userUpdate" component={UserUpdate} />
        <Route path="/userDelete" component={UserDelete} />
        <Route path="/findPassword" component={FindPassword} />
        <Route path="/userRegisterSuccess" component={UserRegisterSuccess} />
        <Route path="/setting" component={Setting} />
        <Route path="/help" component={Help} />
      {/* <Route path="/qrlist/:qrId" component={QrCard} /> */}
      {/* <Route path="/qrlist" component={QrCard} /> */}
        
        

        <Route exact path="/qr" component={Qr} />
        <Route path="/qr/:qrid" component={QrCard} />
        
        
        

      </Switch>
    </div>
  );
}

export default App;
