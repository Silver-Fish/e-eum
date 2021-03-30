import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderComp from '../../components/HeaderComp/HeaderComp';
import UserButtonComp from '../../components/ButtonComp/UserButtonComp';

const UserRegisterSuccess = () => {
  const history = useHistory();
  useEffect(() => {
    setTimeout(function () {
      history.push('/login');
    }, 3000);
  });
  return (
    <div>
      <HeaderComp headertitle="회원가입 완료" />
      <h1>회원가입 완료</h1>
      <UserButtonComp textValue="로그인 하러가기" handleClick="login"></UserButtonComp>
    </div>
  );
};

export default UserRegisterSuccess;
