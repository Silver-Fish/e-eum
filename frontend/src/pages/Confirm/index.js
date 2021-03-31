import React, { useState } from 'react';
import HeaderComp from '../../components/HeaderComp/HeaderComp';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from './index.module.css';

const Confirm = () => {
  const history = useHistory();
  const [password, setPassword] = useState('');

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
      <div className={styles.password_confirm_title}>비밀번호 확인</div>

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

        <button 
          className={styles.check_button}
          type="submit">
        확인</button>
        
        <button
          className={styles.cancel_button}
          onClick={(e) => {
            history.push('/mypage');
          }}
        >취소</button>

      </form>



    </div>
  );
};

export default Confirm;
