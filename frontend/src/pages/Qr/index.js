import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import HearderComp from '../../components/HeaderComp/HeaderComp';
import QrList from '../../components/Qr/QrList';
import QrRegister from '../../components/Qr/QrRegister';
import QrEdit from '../../components/Qr/QrEdit';
import QrView from '../../components/Qr/QrView';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
const Qr = () => {
  const [qrs, setQrs] = useState([]);
  const history = useHistory();
  const [isQrResister, setQrResister] = useState(false);
  const [isQrEdit, setQrEdit] = useState(false);
  const [isQrView, setQrView] = useState(false);
  const [selectedQrName, setSelectedQrName] = useState('');
  const [selectedQrId, setSelectedQrId] = useState('');
  const [token, setToken] = useState(sessionStorage.getItem('jwt'));
  const [cookies] = useCookies(['cookie']);

  useEffect(() => {
    if (
      sessionStorage.getItem('jwt') === null &&
      cookies.cookie !== undefined &&
      cookies.cookie !== 'undefined'
    ) {
      sessionStorage.setItem('jwt', cookies.cookie);
      setToken(sessionStorage.getItem('jwt'));
    } else if (
      sessionStorage.getItem('jwt') === null &&
      (cookies.cookie === undefined || cookies.cookie === 'undefined')
    ) {
      history.push('/login');
    }
    axios
      .get(process.env.REACT_APP_API_URL + '/qr', {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setQrs(res.data);
        } else {
          console.log('QR 리스트 불러오기를 실패했습니다. 다시 시도해 주세요.');
          history.go(0)
        }
      })
      .catch((err) => {
        console.log('QR 리스트 불러오기를 실패했습니다. 다시 시도해 주세요.');
        history.go(0)
      });
  }, [token, history, cookies.cookie]);

  const changeQrResisterState = () => {
    setQrResister(!isQrResister);
  };

  const changeQrEditState = (data) => {
    setSelectedQrName(data.qrName);
    setSelectedQrId(data.qrId);
    setQrEdit(!isQrEdit);
  };

  const changeQrViewState = (data) => {
    setSelectedQrName(data.qrName);
    setSelectedQrId(data.qrId);
    setQrView(!isQrView);
  };

  const changeQrEditforcancel = () => {
    setQrEdit(!isQrEdit);
  }

  const qrLists = qrs.map((qr, i) => (
    <QrList
      key={i}
      qrId={qr.id}
      qrName={qr.title}
      changeQrEditState={changeQrEditState}
      changeQrViewState={changeQrViewState}
    ></QrList>
  ));

  return (
    <>
      {(function () {
        if (isQrResister !== true && isQrEdit !== true && isQrView !== true)
          return (
            <>
              <HearderComp headertitle="QR로 이음" headerColor="yellow"></HearderComp>
              <div className={styles.qr_list_box}>{qrLists}</div>

              <button className={styles.qr_register_box} onClick={changeQrResisterState}>
                등록
              </button>
            </>
          );
        if (isQrResister === true)
          return <QrRegister changeQrResisterState={changeQrResisterState}></QrRegister>;
        if (isQrEdit === true)
          return (
            <QrEdit 
              selectedQrId={selectedQrId} 
              selectedQrName={selectedQrName}
              changeQrEditforcancel = {changeQrEditforcancel}
            ></QrEdit>
          );
        if (isQrView === true)
          return (
            <QrView
              changeQrViewState={changeQrViewState}
              selectedQrId={selectedQrId}
              selectedQrName={selectedQrName}
            ></QrView>
          );
      })()}
    </>
  );
};

export default Qr;
