import React from 'react'
import styles from './QrList.module.css'


const QrList = (props) => {
  const qrName = props.qrName  
  
  const selectedEditQrName = () => {
    props.changeQrEditState(qrName)
  }
  return(
    <div className={ styles.qr_list_box }>
      <div className={ styles.qr_name_box} >
        <button className={ styles.qr_name }>{qrName} </button>
      </div>

      <div>
        <button 
          className={styles.qr_edit_button} 
          onClick={selectedEditQrName}
          >
        QR 수정</button>

        <button className={styles.qr_button}>QR 보기</button>
      </div>
    </div>
  );
}

export default QrList
