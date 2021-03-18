import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './UserButtonComp.module.css';
const UserButtonComp = (props) => {
  const history = useHistory();
  const buttonTextValue = props.textValue;

  const ButtonClick = (e) => {
    if (props.handleClick === 'delete') {
      console.log('탈퇴됨');
      history.push('./');
    } else if (props.handleClick === 'cancel') {
      console.log('취소됨');
      history.push('./');
    } else if (props.handleClick === 'login') {
      console.log('로그인하러가기');
      history.push('./login');
    } else if (props.handleClick === 'confirm') {
      console.log('정말탈퇴?');
      history.push('./confirm');
    } else if (props.handleClick === 'update') {
      console.log('수정페이지');
      history.push('./userUpdate');
    } else if (props.handleClick === 'goDelete') {
      //비번이 일치하다면 페이지 ㄱ
      if (props.data.password === localStorage.password) {
        console.log('비번일치');
        history.push('./userDelete');
      } else {
        console.log('비번틀림');
        history.push('./confirm');
      }
    } else if (props.handleClick === 'register') {
      console.log('회원가입');
      history.push('./userRegister');
    }
  };
  return (
    <button className={styles.button} onClick={ButtonClick}>
      {buttonTextValue}
    </button>
  );
};

export default UserButtonComp;
