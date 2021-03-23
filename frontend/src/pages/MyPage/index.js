import React, { useState, useEffect } from 'react';
import UserButtonComp from '../../components/ButtonComp/UserButtonComp';
import ImgboxTitle from '../../components/Image/ImgboxTitle';
import styles from './index.module.css';
import axios from 'axios';
import LabelComp from '../../components/LabelComp/LabelComp';
const MyPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  useEffect(() => {
    const token = sessionStorage.getItem('jwt');
    axios
      .get(process.env.REACT_APP_API_URL +'/accounts/info', {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div className={styles.MainForm}>
      <ImgboxTitle src="/images/myPageImage.PNG" />
      <div>
        <span>이름</span>
        <input readOnly placeholder={name}></input>
      </div>

      <div>
        <span>이메일</span>
        <input readOnly placeholder={email}></input>
      </div>
      <div className={styles.labelForm}>
        <LabelComp textValue="회원탈퇴" handleClickPath="./confirm" />
        <LabelComp textValue="비밀번호 변경" handleClickPath="./userUpdate" />
      </div>
      <div className={styles.Buttons}>
        <UserButtonComp textValue="확인" handleClick="ok"></UserButtonComp>
      </div>
    </div>
  );
};

export default MyPage;
