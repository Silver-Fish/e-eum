import React from 'react';
import HearderComp from '../HeaderComp/HeaderComp'
import styles from './QrRegister.module.css'

const QrRegister = (props) => {

  return(
    <>
      <HearderComp heardertitle='QR 등록'></HearderComp>
      <div className={styles.qr_name_input_box}>
        <input className={styles.qr_name_input} type="text" placeholder='QR 이름'/>
      </div>
      <div className={styles.button_box}>
        <button 
          className={styles.qr_resiter_cancle_button}
          onClick={props.changeQrResisterState}
        >취소</button>

        <button 
          className={styles.qr_resiter_button}
          onClick={props.changeQrResisterState}
        >등록</button>

      </div>
    </>
  );
}

export default QrRegister;
