import axios from 'axios';
import React, { useState } from 'react';
import HearderComp from '../HeaderComp/HeaderComp';
import styles from './QrEdit.module.css';
import { useHistory } from 'react-router-dom';
import QrEeumLoader from '../../components/Loader/QrEeumLoader';
import DelModal from './DelModal';

const QrEdit = (props) => {
  const qrId = props.selectedQrId;
  const history = useHistory();
  //바뀔 이름
  const token = useState(sessionStorage.getItem('jwt'))[0];
  const [selectedQrName, setSelectedQrName] = useState(props.selectedQrName);
  let [lenQrName, setlenQrName] = useState(props.selectedQrName.length)
  const [isEeumLoading, setEeumLoading] = useState(false);
  const [isDelModal, setDelModal] = useState(false)  
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

  const eeumClick = () => {
    setEeumLoading(!isEeumLoading)
    const data = 0
    axios
    .post(process.env.REACT_APP_API_URL + '/qr/copy/'+ qrId, data,{
      headers: {
        // contentType: "application/json",
        Authorization: token
      }
    })
    .then((res) => {
      console.log(res.data)
      setEeumLoading(!isEeumLoading)
      history.go(0)
    })
    .catch((err) => {
      console.log(err);
      setEeumLoading(!isEeumLoading)
      alert('Qr복사에 실패하셨습니다. 다시 시도해 주세요')
      history.go(0)
    });
  }

  const onCancelHandler = () => {
    props.changeQrEditforcancel()
  }

  const onDeleteHandler = () => {
    setDelModal(!isDelModal)
  };
  const onTitleHandler = (e) => {
    if (e.target.value.length > 10){
      alert('카드이름은 10자까지 가능합니다.')
    } else{
      setSelectedQrName(e.target.value)
      setlenQrName(e.target.value.length)
    }
  };

  return (
    <>
      { isDelModal == true 
      ?(<DelModal 
        onDeleteHandler={onDeleteHandler}
        qrId={qrId}
        ></DelModal>)
      :('')
      }
      
      { isEeumLoading === true 
      ? 
      (
        <QrEeumLoader></QrEeumLoader>
      )
      : ''}
      <>
      <HearderComp headertitle="QR 설정" headerColor="yellow"></HearderComp>
      <div className={styles.qr_name_input_box}>
        <input
          className={styles.qr_name_input}
          type="text"
          placeholder="QR 이름"
          defaultValue={selectedQrName}
          onChange={onTitleHandler}
        />
        <div className={styles.count_Name}>{lenQrName}/10</div>
        
      <button className={styles.qr_eeum_button} onClick={eeumClick}>
          QR 복사
      </button>
        <button className={styles.qr_edit_delete_button} onClick={onDeleteHandler}>
          삭제
        </button>
      </div>
      
      <div className={styles.button_box}>

        

        <button className={styles.qr_cancel_button} onClick={onCancelHandler}>
          취소
        </button>

        <button className={styles.qr_edit_button} onClick={onUpdateHandler}>
          수정
        </button>
      </div>
      </>
    </>
  );
};

export default QrEdit;
