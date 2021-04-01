import { Route, Switch } from 'react-router-dom';
import React, { useEffect } from 'react';
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
import { useCookies } from 'react-cookie';
import './App.css';

function App() {
  const [cookies] = useCookies(['cookie']);
  useEffect(() => {
    if (sessionStorage.getItem('jwt') === null && cookies.cookie !== 'undefined') {
      sessionStorage.setItem('jwt', cookies.cookie);
    }
  });
  return (
    <div className="App">
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
      <Switch>
        <Route path="/qr/:qrId" component={QrCard} />
        <Route path="/qr" component={Qr} />
      </Switch>
    </div>
  );
}

export default App;
