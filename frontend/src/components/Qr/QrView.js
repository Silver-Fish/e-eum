import axios from 'axios';
import React, { useState, useEffect } from 'react';
import HearderComp from '../HeaderComp/HeaderComp';
//import styles from './QrEdit.module.css';
import { useHistory } from 'react-router-dom';

const QrView = (props) => {
  const qrId = props.selectedQrId;
  const qrName = props.selectedQrName;
  const [qrUrl, setQrUrl] = useState('');
  //const history = useHistory();

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
      <img src={qrUrl}></img>
    </>
  );
};

export default QrView;
