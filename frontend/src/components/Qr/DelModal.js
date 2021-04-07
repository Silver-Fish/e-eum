import React from 'react';
import styles from './DelModal.module.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom'


const DelModal= (props) => {
  const history = useHistory();
  const cancelClick = () => {
    props.onDeleteHandler()
  }
  const delClick = () => {
    axios
      .delete(process.env.REACT_APP_API_URL + '/qr/' + props.qrId, {
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

  }

  return(
    <div className={styles.modal_box}>
      
      <div className={styles.del_box}>
        
        <div className={styles.del_content}>
          정말로<span> 삭제 </span>하시겠습니까?
          <p>삭제시 QR 내의 모든 카드가 삭제하고 다시는 복구할 수 없습니다.</p>
        </div>
        

        <div className={styles.button_box}>
          <button className={styles.cancel_button} onClick={cancelClick}>취소</button>
          <button className={styles.del_button} onClick={delClick}>삭제</button>
        </div>
      </div>
    </div>
  )
}

export default DelModal;