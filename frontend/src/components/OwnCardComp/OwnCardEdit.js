import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import styles from './OwnCardEdit.module.css'
import axios from 'axios'

const OwnCardEdit = (props) => {
  const history = useHistory();
  const imgUrl = props.imgUrl
  // const [defaultImg, setImg] = useState(props['imgUrl'])
  const [cardName, setCardName] = useState(props['cardName'])
  // const [imgFile, setImgFile] = useState()
  const cardId = props.cardId
  // const cardName = props.cardName
  // const imgUrl = props.imgUrl

  // const onImageChange = function (e) {
  //   setImg(URL.createObjectURL(e.target.files[0]))
  //   setImgFile(e.target.files[0])
  // }
  const onInputChange = (e) => {
    setCardName(e.target.value)
  }
  return(
    <>
      <div className={styles.add_box}>
        <div className={styles.image_box}>
          <img  src={imgUrl} alt="이미지를 등록해주세요" />

          <label  
            className={styles.image_button}
            >
            <img  src='/images/photo-camera.svg' alt="대체이미지" />
            <input type="file" className={styles.image_input} />
              
          </label>
        </div>
        
        <input 
          type='text' 
          className={styles.situation_input}
          defaultValue={cardName}
          onChange={onInputChange}
          placeholder='상황 이름'/>
      </div>

      <div className={styles.button_box}>
          <button className={styles.close_button} onClick={props.goEditStateChange}>취소</button>
          {/* <button className={styles.close_button} >취소</button> */}
          {/* <button className={styles.add_button} onClick={editCategory} >등록</button> */}
          <button className={styles.add_button}  >등록</button>
      </div>    
    </>
  )
};

export default OwnCardEdit;