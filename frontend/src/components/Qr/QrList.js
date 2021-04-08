import React from 'react';
import styles from './QrList.module.css';
import { useHistory } from 'react-router-dom';

const QrList = (props) => {
  const history = useHistory();
  const qrName = props.qrName;
  const qrId = props.qrId;
  

  const selectedEditQrName = () => {
    props.changeQrEditState({ qrName: qrName, qrId: qrId });
  };
  const selectedViewQr = () => {
    props.changeQrViewState({ qrName: qrName, qrId: qrId });
  };

  const goQrList = () => {
    history.push(`./qr/${qrId}`, qrName);
  };

  return (
    <div className={styles.qr_list_box}>
      <div className={styles.qr_name_box}>
        <button className={styles.qr_name} onClick={goQrList}>
          <span>{qrName}</span>
        </button>
      </div>

      <div className={styles.qr_button_box}>
        <button className={styles.qr_edit_button} onClick={selectedEditQrName}>
          QR 설정
        </button>
        <button className={styles.qr_button} onClick={selectedViewQr}>
          QR 보기
        </button>

      </div>
    </div>
  );
};

export default QrList;
