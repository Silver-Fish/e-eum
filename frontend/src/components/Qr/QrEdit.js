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
      alert('QR이름을 입력해주세요');
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
            history.go(0);
          } else {
            alert('QR수정 도중 오류가 발생했습니다. 다시 한번 시도해주세요.')
            history.go(0);
          }
        })
        .catch((err) => {
          alert('QR수정 도중 오류가 발생했습니다. 다시 한번 시도해주세요.')
          history.go(0);
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
          history.go(0);
        } else {
          alert('QR삭제 도중 오류가 발생했습니다. 다시 한번 시도해주세요.')
          history.go(0);
        }
      })
      .catch((err) => {
        alert('QR삭제 도중 오류가 발생했습니다. 다시 한번 시도해주세요.')
        history.go(0);
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
