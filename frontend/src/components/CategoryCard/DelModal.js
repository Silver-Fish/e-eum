import React from 'react';
import styles from './DelModal.module.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom'


const DelModal= (props) => {
  const history = useHistory();
  const cancelClick = () => {
    props.categoryForModalCancel()
  }
  const delClick = () => {
    const token = sessionStorage.getItem('jwt')
    axios.delete(process.env.REACT_APP_API_URL + '/category/'+ props.categoryId, {
      headers: {
        'Authorization': token
        }
    })
    .then(()=> {
      history.go(0)
    })
    .catch((err) => {
      console.log(err)
    })

  }

  return(
    <div className={styles.modal_box}>
      
      <div className={styles.del_box}>
        
        <div className={styles.del_content}>
          정말로<span> 삭제 </span>하시겠습니까?
          <p>삭제시 상황 내의 모든 카드가 삭제하고 다시는 복구할 수 없습니다.</p>
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