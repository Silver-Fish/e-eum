import React, { useState,useEffect } from 'react';
import styles from './OwnCardadd.module.css'
import axios from 'axios'

const OwnCardadd = (props) => {
  const [situationImg, setImg] = useState()
  const [imgFile, setImgFile] = useState()
  const onImageChange = function (e) {
    console.log(situationImg)
    console.log(e.target.value)
    setImg(e.target.value)
    setImgFile(e.target.files[0])
    setImg(URL.createObjectURL(e.target.files[0]))
  }

  const addCard = () => {
    const token = sessionStorage.getItem('jwt')
    let data = new FormData()
    data.append('file', imgFile)
    data.append('word', '몰라')
    data.append('type', 'own')
    axios.post('https://dev.e-eum.kr/api/card', data, {
      headers: {
        // 'type' : 'own',
        // 'word' : 'cardtitle',
        // 'file' : 'cardImg',
        'Content-type': 'multipart/form-data',
        'Authorization': token
        }
    })
    .then((res)=> {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
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
          <button className={styles.add_button} onClick={addCard} >등록</button>
      </div>
    </>
  )
}

export default OwnCardadd;