import React, { useState } from 'react';
import styles from './OwnCardadd.module.css'
import axios from 'axios'

const OwnCardadd = (props) => {
  const childText = 'dsadsa'
  const [situationImg, setImg] = useState()
  const onImageChange = function (e) {
    console.log(situationImg)
    console.log(e.target.value)
    setImg(e.target.value)
    setImg(URL.createObjectURL(e.target.files[0]))
  }


  return(
    <>
      <div className={styles.add_box}>
        <div className={styles.image_box}>
          <img  src={situationImg} alt="이미지를 등록해주세요" />

          <label  
            className={styles.image_button}
            >
            <img  src="/images/photo-camera.svg" alt="대체이미지" />
            <input type="file" className={styles.image_input} onChange={onImageChange}/>
              
          </label>
        </div>
        
        <input 
          type='text' 
          className={styles.situation_input}
          placeholder='상황 이름'/>
      </div>

      <div className={styles.button_box}>
          <button className={styles.close_button} onClick={props.addStateChange}>취소</button>
          <button className={styles.add_button} onClick={props.addStateChange} >등록</button>
      </div>
    </>
  )
}

export default OwnCardadd;