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
    if (sessionStorage.getItem('jwt') === null && cookies.cookie !== undefined) {
      sessionStorage.setItem('jwt', cookies.cookie);
      setToken(sessionStorage.getItem('jwt'));
    } else if (sessionStorage.getItem('jwt') === null && cookies.cookie === undefined) {
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
          console.log('QrList R : status가 200아님');
        }
      })
      .catch((err) => {
        console.log('QrList R : err났어잇');
        console.log(err);
      });
  }, [token]);

  const changeQrResisterState = () => {
    setQrResister(!isQrResister);
  };

  const changeQrEditState = (data) => {
    setSelectedQrName(data.qrName);
    setSelectedQrId(data.qrId);
    setQrEdit(!isQrEdit);
  };

  const changeQrViewState = (data) => {
    console.log(data);
    setSelectedQrName(data.qrName);
    setSelectedQrId(data.qrId);
    setQrView(!isQrView);
  };

  // const selectedEditQrName = (data) => {
  //   setSlectedQrName(data)
  // }

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
              <HearderComp headertitle="QR로 이음" headerColor="yello"></HearderComp>
              <div className={styles.qr_list_box}>{qrLists}</div>

              <button className={styles.qr_register_box} onClick={changeQrResisterState}>
                등록
              </button>
            </>
          );
        if (isQrResister === true)
          return <QrRegister changeQrResisterState={changeQrResisterState}></QrRegister>;
        if (isQrEdit === true)
          return <QrEdit selectedQrId={selectedQrId} selectedQrName={selectedQrName}></QrEdit>;
        if (isQrView === true)
          return <QrView selectedQrId={selectedQrId} selectedQrName={selectedQrName}></QrView>;
      })()}
    </>
  );
};

export default Qr;
