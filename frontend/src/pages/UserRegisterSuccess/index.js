import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ImgboxTitle from '../../components/Image/ImgboxTitle';
import Imgbox from '../../components/Image/Imgbox';
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
      <ImgboxTitle src="/images/userRegisterSuccess.PNG" />
      <Imgbox src="/images/cat.PNG" />
      <UserButtonComp textValue="로그인 하러가기" handleClick="login"></UserButtonComp>
    </div>
  );
};

export default UserRegisterSuccess;
