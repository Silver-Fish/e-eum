import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderComp from '../../components/HeaderComp/HeaderComp';
import styles from './index.module.css';

const UserUpdate = () => {
  const history = useHistory();

  const [password, setPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [passwordcheck, setPasswordCheck] = useState('');
  const [message, setMessage] = useState('');

  const onNewPasswordHandler = (e) => {
    setNewPassword(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onPasswordCheckHandler = (e) => {
    setPasswordCheck(e.currentTarget.value);
  };

  useEffect(() => {
    if (newpassword === '' && passwordcheck === '') setMessage('');
    else if (
      (passwordcheck !== '' && newpassword === '') ||
      (passwordcheck === '' && newpassword !== '')
    )
      setMessage('비밀번호를 입력해주세요');
    else if (passwordcheck === newpassword) setMessage('비밀번호가 일치합니다.');
    else if (passwordcheck !== newpassword) setMessage('비밀번호가 일치하지 않습니다.');
  }, [newpassword, passwordcheck]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (newpassword === passwordcheck && newpassword !== '') {
      const userData = {
        currentPw: password,
        newPw: newpassword,
      };
      axios
        .put(process.env.REACT_APP_API_URL + '/accounts/update-pw', userData, {
          headers: {
            Authorization: sessionStorage.getItem('jwt'),
          },
        })
        .then((suc) => {
          if (suc.status === 200) {
            alert('비밀번호변경 성공');
            history.push('/myPage');
          } else {
            alert('비밀번호 변경 실패');
            console.log('Password U  : status가 200아님');
          }
        })
        .catch((err) => {
          console.log('Password U : err났어잇');
          console.log(err);
        });
    }
  };

  return (
    <div>
      <HeaderComp headertitle="비밀번호 변경" />
      <h1>비밀번호 변경</h1>

      <form onSubmit={onSubmitHandler}>
        <input
          value={password}
          type="password"
          placeholder="현재 비밀번호"
          onChange={onPasswordHandler}
        />
        <br />
        <input
          value={newpassword}
          type="password"
          placeholder="변경할 비밀번호"
          onChange={onNewPasswordHandler}
        />
        <br />
        <input
          value={passwordcheck}
          type="password"
          placeholder="비밀번호 확인"
          onChange={onPasswordCheckHandler}
        />
        <br />
        <p>{message}</p>
        <br />
        <button type="submit">확인</button>
        <button
          className={styles.Button_cancel}
          onClick={(e) => {
            history.push('/myPage');
          }}
        >
          취소
        </button>
      </form>
    </div>
  );
};

export default UserUpdate;
