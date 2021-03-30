import React from 'react';
import styles from './QrList.module.css';
import { useHistory } from 'react-router-dom';

const QrList = (props) => {
  console.log(props);
  const history = useHistory();
  const qrName = props.qrName;
  const qrId = props.qrId;

  const selectedEditQrName = () => {
    props.changeQrEditState({ qrName: qrName, qrId: qrId });
  };

  const goQrList = () => {
    history.push('./ASDASD');
  };

  return (
    <div className={styles.qr_list_box}>
      <div className={styles.qr_name_box}>
        <button className={styles.qr_name} onClick={goQrList}>
          {qrName}
        </button>
      </div>

      <div>
        <button className={styles.qr_edit_button} onClick={selectedEditQrName}>
          QR 수정
        </button>

        <button className={styles.qr_button}>QR 보기</button>
      </div>
    </div>
  );
};

export default QrList;
