import React, { useState } from 'react';
import ImgboxTitle from '../../components/Image/ImgboxTitle';
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
    axios
      .get(process.env.REACT_APP_API_URL + '/accouts/find?email=' + email + '&name=' + name)
      .then((res) => {
        if (res.data) {
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
      axios
        .put(process.env.REACT_APP_API_URL + '/accouts', password)
        .then((res) => {
          alert('변경완료');
          setTimeout(function () {
            history.push('/login');
          });
        })
        .catch((err) => {
          alert('변경실패');
        });
    }
  };

  return (
    <>
      {!isModal ? (
        <div>
          <ImgboxTitle src="/images/findPasswordImage.PNG" />
          <form onSubmit={onSubmitHandler}>
            <input value={email} type="text" placeholder="이메일" onChange={onEmailHandler} />
            <br />
            <input value={name} type="text" placeholder="이름" onChange={onNameHandler} /> <br />
            <button type="submit"> 확인 </button>
            <br />
          </form>
          <button
            className={styles.Button_Cancel}
            onClick={(e) => {
              history.push('/login');
            }}
          >
            취소
          </button>
        </div>
      ) : (
        <div className={styles.onModal}>
          <form className={styles.onModalForm} onSubmit={changePassword}>
            <h1>비밀번호 변경</h1>
            <input
              value={password}
              type="password"
              placeholder="비밀번호"
              onChange={onPasswordHandler}
            />
            <br />
            <input
              value={checkpassword}
              type="password"
              placeholder="비밀번호 확인"
              onChange={onPasswordCheckHandler}
            />
            <br />
            <button type="submit">확인</button>
          </form>
        </div>
      )}
    </>
  );
};

export default FindPassword;
