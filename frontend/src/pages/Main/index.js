import React from 'react';
import { useHistory } from "react-router-dom";
import styles from './index.module.css';
import Imgbox from '../../components/Image/Imgbox';
import EeumButtonComp from '../../components/ButtonComp/EeumButtonComp';
import MainFooterButtonComp from '../../components/ButtonComp/MainFooterButtonComp';

const Main = () => {
  const history = useHistory();
  const handleClick = (e) => {    
    history.push('./login') 
  }
  return (
    <div className={styles.mainbox}>
      <div className={styles.main_login_box}>
        <button className={styles.login_button} onClick={handleClick}>로그인</button>
      </div>

      <Imgbox src='/images/mainLogo.svg'/>
      
      <div className={styles.eeum_button_box}>
        <EeumButtonComp textValue="나만의 이음" buttonImg='/images/user.png' handleClickPath='./owneeum'></EeumButtonComp>
        <EeumButtonComp textValue="상황별 이음" buttonImg='/images/folder.png' handleClickPath='./category' ></EeumButtonComp>
        <EeumButtonComp textValue="QR로 이동" buttonImg='/images/qr.png' handleClickPath='./qr' ></EeumButtonComp>
      </div>      

      <div className={styles.footer_button_box}>
        <MainFooterButtonComp textValue="도움말" buttonImg='/images/information.png' handleClickPath='./qr'></MainFooterButtonComp>
        <MainFooterButtonComp textValue="설정" buttonImg='/images/setting.png' handleClickPath='./qr'></MainFooterButtonComp>
        <MainFooterButtonComp textValue="내정보" buttonImg='/images/fish.png' handleClickPath='./qr'></MainFooterButtonComp>
      </div>
    </div>
    
  );
}

export default Main;

