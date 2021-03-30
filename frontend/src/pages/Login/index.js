import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import HeaderComp from '../../components/HeaderComp/HeaderComp';
import LabelComp from '../../components/LabelComp/LabelComp';

import InputComp from '../../components/InputComp/InputComp';
import styles from './index.module.css';
import { useCookies } from 'react-cookie';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState('');
  const history = useHistory();

  const [cookies, setCookie] = useCookies(['cookie']);

  const setCookieFunc = () => {
    setCookie('cookie', sessionStorage.getItem('jwt'), { maxAge: 2000 });
  };

  const onEmailHandler = (e) => {
    setEmail(e);
  };

  const onPasswordHandler = (e) => {
    setPassword(e);
  };

  const onAutoLogin = (e) => {
    setAutoLogin(e.target.checked);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    axios
      .post(process.env.REACT_APP_API_URL + '/login', userData)

      .then((res) => {
        if (res.status === 200) {
          // localStorage.setItem('email', res.data.data.email);
          // localStorage.setItem('name', res.data.data.name);
          sessionStorage.setItem('jwt', res.headers.authorization);
          if (autoLogin) {
            setCookieFunc();
          }
          history.push('/');
        } else {
          alert('ID와 PW가 일치하지 않습니다.^0^');
        }
      })
      .catch((err) => {
        console.log(err);
        alert('다시해^0^');
      });
  };

  return (
    <div>
      <HeaderComp headertitle="로그인" />
      <div className={styles.MainForm}>
        <h1>로그인</h1>
        <form onSubmit={onSubmitHandler}>
          <InputComp type="email" placeholder="Email" InputChange={onEmailHandler} />
          <br />
          <InputComp type="password" placeholder="PW" InputChange={onPasswordHandler} />
          <br />
          <input
            className={styles.input_check}
            type="checkbox"
            checked={autoLogin}
            onChange={onAutoLogin}
            id="check"
          />
          <label for="check">자동로그인</label>
          <div className={styles.labelForm}>
            <LabelComp textValue="회원가입" handleClickPath="./userRegister" />
            <LabelComp textValue="비밀번호 찾기" handleClickPath="./findPassword" />
          </div>
          <button className={styles.button} type="submit">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
