import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderComp from '../../components/HeaderComp/HeaderComp';
import UserButtonComp from '../../components/ButtonComp/UserButtonComp';
import styles from './index.module.css';

const UserRegisterSuccess = () => {
  const history = useHistory();
  useEffect(() => {
    setTimeout(function () {
      history.push({
        pathname: '/login',
        state: { isBack: false }
      })
    }, 3000);
  });

  return (
    <div className={styles.success_box}>
      <HeaderComp headertitle="회원가입 완료" />
      {/* <div className={styles.success_title}>회원가입 완료</div> */}
      <img className={styles.success_box_img} src="/images/moca" alt=""/>
      <div className={styles.go_login_box}>
        <p>3초 후 로그인페이지로 이동합니다.</p>
      </div>
    </div>
  );
};

export default UserRegisterSuccess;
