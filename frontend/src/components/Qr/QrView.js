import axios from 'axios';
import React, { useState, useEffect } from 'react';
import HearderComp from '../HeaderComp/HeaderComp';
import styles from './QrView.module.css';

const QrView = (props) => {
  const qrId = props.selectedQrId;
  const qrName = props.selectedQrName;
  const [qrUrl, setQrUrl] = useState('');
  const selectedViewQr = () => {
    props.changeQrViewState({ qrName: qrName, qrId: qrId });
  };
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + `/qr/${qrId}`, {
        headers: {
          Authorization: sessionStorage.getItem('jwt'),
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log('url가져왓음');
          setQrUrl(res.data.qr_url);
        } else {
          alert('조회실패');
          console.log('200이 아님');
        }
      })
      .catch((err) => {
        console.log('QrView R');
        console.log(err);
      });
  });

  return (
    <>
      <HearderComp headertitle={qrName} headerColor="yellow"></HearderComp>

      <div className={styles.qr_box}>
        <img className={styles.qr_img} src={qrUrl} alt='QR 이미지'></img>
      </div>

      <div className={styles.button_box}>
        <button className={styles.qr_view_cancel_button} onClick={selectedViewQr}>
          목록으로 돌아가기
        </button>
      </div>
    </>
  );
};

export default QrView;
