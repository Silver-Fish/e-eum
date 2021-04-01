import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import styles from './OwnCardEdit.module.css'
import axios from 'axios'

const OwnCardEdit = (props) => {
  const history = useHistory();
  const imgUrl = props.imgUrl
  const [cardName, setCardName] = useState(props['cardName'])
  const cardId = props.cardId

  const onInputChange = (e) => {
    setCardName(e.target.value)
  }
  const editCard = () => {
    const token = sessionStorage.getItem('jwt')
    const data = {
      'word' : cardName
    }
    axios.put(`https://dev.e-eum.kr/api/card/${cardId}`, data, {
      headers: {
        'Authorization': token
        }
    })
    .then((res)=> {
      console.log(res)
      history.go(0)
    })
    .catch((err) => {
      console.log(err)
    })
  }
  return(
    <>
      <div className={styles.add_box}>
        <div className={styles.image_box}>
          <img  src={imgUrl} alt="이미지를 등록해주세요" />
        </div>
        
        <input 
          type='text' 
          className={styles.situation_input}
          defaultValue={cardName}
          onChange={onInputChange}
         />
      </div>

      <div className={styles.bottom_button}>
        <div className={styles.button_box}>
          <button className={styles.close_button} onClick={props.goEditStateChange}>취소</button>
          <button className={styles.add_button} onClick={editCard} >등록</button>
        </div>
      </div>    
    </>
  )
};

export default OwnCardEdit;