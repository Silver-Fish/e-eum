import React, { useState } from 'react';
import HearderComp from '../HeaderComp/HeaderComp';
import styles from './QrRegister.module.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const QrRegister = (props) => {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const onTitleHandler = (e) => {
    setTitle(e.target.value);
  };
  const onRegisterHandler = () => {
    if (title === '') {
      alert('이름을 입력하세요잇!');
    } else {
      const qrInsertRequest = {
        title: title,
      };
      axios
        .post(process.env.REACT_APP_API_URL + '/qr', qrInsertRequest, {
          headers: {
            Authorization: sessionStorage.getItem('jwt'),
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            alert('등록 성공 , 카드 리스트 추가해잇!');
            history.go(0);
          } else {
            console.log('QrList C: status가 200이아님');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <HearderComp headertitle="QR 등록" headerColor="yellow"></HearderComp>
      <div className={styles.qr_name_input_box}>
        <input
          className={styles.qr_name_input}
          type="text"
          value={title}
          placeholder="QR 이름"
          onChange={onTitleHandler}
        />
      </div>
      <div className={styles.button_box}>
        <button className={styles.qr_resiter_cancle_button} onClick={props.changeQrResisterState}>
          취소
        </button>

        <button className={styles.qr_resiter_button} onClick={onRegisterHandler}>
          등록
        </button>
      </div>
    </>
  );
};

export default QrRegister;
