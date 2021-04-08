import React, { useState } from 'react';
import HearderComp from '../HeaderComp/HeaderComp';
import styles from './QrRegister.module.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Loader from '../Loader/Loader'

const QrRegister = (props) => {
  const history = useHistory();
  const [title, setTitle] = useState('');
  let [lenQrName, setlenQrName] = useState(0)
  const [isLoading, setLoading] = useState(false);
  const onTitleHandler = (e) => {

    if (e.target.value.length > 10){
      alert('카드이름은 10자까지 가능합니다.')
    } else{
      setTitle(e.target.value)
      setlenQrName(e.target.value.length)
    }
  };
  const onRegisterHandler = () => {
    setLoading(!isLoading)
    if (title === '') {
      alert('QR이름을 입력하세요');
      setLoading(!isLoading)
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
          
          if (res.status === 200) {
            setLoading(!isLoading)
            history.go(0);
          } else {
            alert('QR등록 도중 오류가 발생했습니다. 다시 한번 시도해주세요.')
            setLoading(!isLoading)
          }
        })
        .catch((err) => {
          alert('QR등록 도중 오류가 발생했습니다. 다시 한번 시도해주세요.')
          setLoading(!isLoading)
        });
    }
  };

  return (
    <>

      <HearderComp headertitle="QR 등록" headerColor="yellow"></HearderComp>
      { isLoading === true
      ?(<Loader></Loader>)
      :
      (
      <>
      <div className={styles.qr_name_input_box}>
        <input
          className={styles.qr_name_input}
          type="text"
          value={title}
          placeholder="QR 이름"
          onChange={onTitleHandler}
          maxLength='10'
        />
        <div className={styles.count_Name}>{lenQrName}/10</div>
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
      )
      }
    </>
  );
};

export default QrRegister;
