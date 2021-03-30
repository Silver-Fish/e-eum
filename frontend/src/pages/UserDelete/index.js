import React from 'react';
import HeaderComp from '../../components/HeaderComp/HeaderComp';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from './index.module.css';
const UserDelete = () => {
  const history = useHistory();

  const onDeleteHandler = (e) => {
    e.preventDefault();
    axios
      .delete(process.env.REACT_APP_API_URL + '/accouts/delete', {
        headers: {
          Authorization: sessionStorage.getItem('jwt'),
        },
      })
      .then((res) => {
        if (res.data) {
          sessionStorage.removeItem('jwt');
          history.push('/login');
        } else {
          alert('탈퇴 실패!');
        }
      })
      .catch((err) => {
        alert('오류발생');
      });
  };

  return (
    <div>
      <HeaderComp headertitle="회원 탈퇴" />
      <h1>회원 탈퇴</h1>
      <p>진짜 삭제??</p>
      <button className={styles.Button_Ok} onClick={onDeleteHandler}>
        탈퇴
      </button>
      <button
        className={styles.Button_Cancel}
        onClick={(e) => {
          console.log('취소');
          history.push('/');
        }}
      >
        취소
      </button>
    </div>
  );
};

export default UserDelete;
