import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import HeaderComp from '../../components/HeaderComp/HeaderComp';
import LabelComp from '../../components/LabelComp/LabelComp';
import ImgboxTitle from '../../components/Image/ImgboxTitle';
import InputComp from '../../components/InputComp/InputComp';
import styles from './index.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const onEmailHandler = (e) => {
    setEmail(e);
  };

  const onPasswordHandler = (e) => {
    setPassword(e);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    console.log(userData);

    axios
      .post(process.env.REACT_APP_API_URL +'/login', userData)

      .then((res) => {
        if (res.status === 200) {
          // localStorage.setItem('email', res.data.data.email);
          // localStorage.setItem('name', res.data.data.name);

          sessionStorage.setItem('jwt', res.headers.authorization);

          history.push('./');
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
      <HeaderComp />
      <div className={styles.MainForm}>
        <ImgboxTitle src="/images/loginImage.PNG" />
        <form onSubmit={onSubmitHandler}>
          <InputComp type="email" placeholder="Email" InputChange={onEmailHandler} />
          <br />
          <InputComp type="password" placeholder="PW" InputChange={onPasswordHandler} />
          <br />
          <span>자동로그인</span>
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
