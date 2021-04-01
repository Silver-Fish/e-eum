import axios from 'axios';
import React, { useState } from 'react';
import HearderComp from '../HeaderComp/HeaderComp';
import styles from './QrEdit.module.css';
import { useHistory } from 'react-router-dom';
const QrEdit = (props) => {
  const qrId = props.selectedQrId;
  const history = useHistory();
  //바뀔 이름
  const [selectedQrName, setSelectedQrName] = useState(props.selectedQrName);
  const onUpdateHandler = () => {
    const data = {
      title: selectedQrName,
    };
    if (selectedQrName === '') {
      alert('이름 입력해잇!');
    } else {
      axios
        .put(process.env.REACT_APP_API_URL + '/qr/' + qrId, data, {
          headers: {
            Authorization: sessionStorage.getItem('jwt'),
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 204) {
            alert('수정 성공잇');
            history.go(0);
          } else {
            alert('수정 실패잇');
            history.go(0);
            console.log('QrList U : status가 200아님');
          }
        })
        .catch((err) => {
          console.log('QrList U : err났어잇');
          console.log(err);
        });
    }
  };

  const onDeleteHandler = () => {
    axios
      .delete(process.env.REACT_APP_API_URL + '/qr/' + qrId, {
        headers: {
          Authorization: sessionStorage.getItem('jwt'),
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 204) {
          alert('삭제 성공잇');
          history.go(0);
        } else {
          alert('삭제 실패잇');
          console.log('QrList D : status가 200아님');
          history.go(0);
        }
      })
      .catch((err) => {
        console.log('QrList D : err났어잇');
        console.log(err);
      });
  };
  const onTitleHandler = (e) => {
    setSelectedQrName(e.target.value);
  };

  return (
    <>
      <HearderComp headertitle="QR 수정" headerColor="yellow"></HearderComp>
      <div className={styles.qr_name_input_box}>
        <input
          className={styles.qr_name_input}
          type="text"
          placeholder="Qr 이름"
          defaultValue={selectedQrName}
          onChange={onTitleHandler}
        />
      </div>
      <div className={styles.button_box}>
        <button className={styles.qr_edit_delete_button} onClick={onDeleteHandler}>
          삭제
        </button>

        <button className={styles.qr_edit_button} onClick={onUpdateHandler}>
          수정
        </button>
      </div>
    </>
  );
};

export default QrEdit;
