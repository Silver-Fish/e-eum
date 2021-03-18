import React from 'react';
import HearderComp from '../HeaderComp/HeaderComp'
import styles from './QrEdit.module.css'

const QrEdit = (props) => {
  const slectedQrName = props.slectedQrName
  return(
    <>
      <HearderComp heardertitle='QR 수정'></HearderComp>
      <div className={styles.qr_name_input_box}>
        <input 
          className={styles.qr_name_input} 
          type="text" 
          placeholder='QR 이름'
          defaultValue={slectedQrName}
          />
      </div>
      <div className={styles.button_box}>
        <button 
          className={styles.qr_edit_delete_button}
          onClick={props.changeQrEditState}
        >삭제</button>

        <button 
          className={styles.qr_edit_button}
          onClick={props.changeQrEditState}
        >수정</button>

      </div>
    </>
  );
}

export default QrEdit;
