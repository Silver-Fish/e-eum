import React, { useState, useEffect } from 'react';
import HeaderComp from '../../components/HeaderComp/HeaderComp';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from './index.module.css';
import { useCookies } from 'react-cookie';
const Confirm = () => {
  const history = useHistory();
  const [password, setPassword] = useState('');

  const [cookies] = useCookies(['cookie']);

  useEffect(() => {
    if (
      sessionStorage.getItem('jwt') === null &&
      cookies.cookie !== undefined &&
      cookies.cookie !== 'undefined'
    ) {
      history.push('/');
    } else if (
      sessionStorage.getItem('jwt') === null &&
      (cookies.cookie === undefined || cookies.cookie === 'undefined')
    ) {
      history.push('/');
    }
  });

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };
  const onSubmitHandler = (e) => {
    axios
      .post(process.env.REACT_APP_API_URL + '/accounts/check-pw', password, {
        headers: {
          Authorization: sessionStorage.getItem('jwt'),
        },
      })
      .then((res) => {
        if (res.data) {
          history.push('./userDelete');
        } else {
          alert('비번 틀림!');
        }
      })
      .catch((err) => {
        alert('오류발생');
      });
  };

  return (
    <div className={styles.password_confirm_box}>
      <HeaderComp headertitle="비밀번호 확인" />

      <form className={styles.MainForm} onSubmit={onSubmitHandler}>
        <div className={styles.password_box}>
          <input
            className={styles.input_password_confirm}
            type="password"
            placeholder="비밀번호 확인"
            value={password}
            onChange={onPasswordHandler}
          />
        </div>

        <button className={styles.check_button} type="submit">
          확인
        </button>

        <button
          className={styles.cancel_button}
          onClick={(e) => {
            history.push('/mypage');
          }}
        >
          취소
        </button>
      </form>
    </div>
  );
};

export default Confirm;
