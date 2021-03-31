import React, { useState } from 'react';
import HeaderComp from '../../components/HeaderComp/HeaderComp';
import { useHistory } from 'react-router-dom';
import styles from './index.module.css';
import axios from 'axios';

const FindPassword = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isModal, setModal] = useState(false);
  const [password, setPassword] = useState('');
  const [checkpassword, setCheckPassword] = useState('');
  const history = useHistory();

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      name: name,
    };
    axios
      .post(process.env.REACT_APP_API_URL + '/accounts/check-account', userData)
      .then((res) => {
        if (res.status === 200) {
          setModal(true);
        } else {
          alert('이메일 또는 이름 오류');
        }
      })
      .catch((err) => {
        alert('오류발생');
      });
  };
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onPasswordCheckHandler = (e) => {
    setCheckPassword(e.currentTarget.value);
  };

  const changePassword = (e) => {
    e.preventDefault();
    if (password === checkpassword) {
      const userData = {
        email: email,
        password: password,
      };
      axios
        .put(process.env.REACT_APP_API_URL + '/accounts/reset-pw', userData)
        .then((res) => {
          if (res.status === 200) {
            alert('변경완료');
            setTimeout(function () {
              history.push('/login');
            }, 1000);
          }
        })
        .catch((err) => {
          alert('변경실패');
        });
    }
  };

  return (
    <div className={styles.findpassword_box}>
      
      {!isModal ? (
        <>
          <HeaderComp headertitle="비밀번호 찾기" />
          <div className={styles.findpassword_title}>비밀번호 찾기</div>

          <form className={styles.MainForm} onSubmit={onSubmitHandler}>

            <div className={styles.email_box}>
              <input 
                className={styles.input_email}
                value={email} type="text" 
                placeholder="이메일" 
                onChange={onEmailHandler} 
              />
            </div>
            
            <div className={styles.name_box}>
              <input 
                className={styles.input_name}
                value={name} 
                type="text" 
                placeholder="이름" 
                onChange={onNameHandler} 
              />
            </div>

            
            <button 
              className={styles.check_button} 
              type="submit"> 
            확인</button>
          </form>

          <button
            className={styles.cancel_button} 
            onClick={(e) => {
              history.push('/login');
            }}
          >
            취소
          </button>
        </>
      ) : (
        <>
          <HeaderComp headertitle="비밀번호 변경" />
          <div className={styles.updatepassword_title}>비밀번호 변경</div>
          <form className={styles.onModalForm} onSubmit={changePassword}>
            
            

            <div className={styles.password_box}>
              <input
                className={styles.input_password}
                value={password}
                type="password"
                placeholder="비밀번호"
                onChange={onPasswordHandler}
              />
            </div>

            <div className={styles.password_check_box}>
              <input
                className={styles.input_password_check}
                value={checkpassword}
                type="password"
                placeholder="비밀번호 확인"
                onChange={onPasswordCheckHandler}
              />
            </div>
            <button 
              className={styles.check_button} 
              type="submit">
            확인</button>
            
          </form>
        </>
      )}
    </div>
  );
};

export default FindPassword;
