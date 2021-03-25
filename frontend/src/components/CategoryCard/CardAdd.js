import React, { useState } from 'react';
import styles from './CardAdd.module.css'
import axios from 'axios'

const CardAdd = (props) => {
  const [cardImg, setImg] = useState()
  const onImageChange = function (e) {
    setImg(e.target.value)
    setImg(URL.createObjectURL(e.target.files[0]))
  }
  

  const speakClick= () => {
    console.log('소리쳐')
  }
  const cardRegisterClick= () => {
    // const token = sessionStorage.getItem('jwt')

    // let data = new FormData()
    // data.append('file', imgFile)
    // data.append('word', categoryName)
    // data.append('type', category)
    // data.append('typeId', )
    // const config = {
    //   headers: {
    //     'Content-type': 'multipart/form-data',
    //     'Authorization': token
    //   }
    // }
    //   axios.get(process.env.REACT_APP_API_URL + '/category', config)
    //   .then((res) =>{
    //     console.log(res)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
    // console.log('add')
  }

  return(
    <>
      <div className={styles.add_box}>
        <div className={styles.image_box}>
          <img  src={cardImg} alt="이미지를 등록해주세요" />

          <label  
            className={styles.image_button}
            >
            <img  src="/images/photo-camera.svg" alt="대체이미지" />
            <input type="file" className={styles.image_input} onChange={onImageChange}/>
            
              
          </label>
        </div>
        
        <div className={styles.card_input_box}>
          <input 
            type='text' 
            className={styles.card_input}
            placeholder='카드 이름'/>
          <img onClick={speakClick} src="/images/speaker-filled-audio-tool.svg" alt="대체이미지" />
        </div>
      </div>

      <div className={styles.button_box}>
          <button className={styles.close_button} onClick={props.cardAddClick}>취소</button>
          <button className={styles.add_button} onClick={cardRegisterClick} >등록</button>
      </div>
    </>
  )
}

export default CardAdd;