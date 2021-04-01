import React, { useState} from 'react';
import { useHistory } from 'react-router-dom';
import styles from './OwnCardadd.module.css'
import axios from 'axios'

const OwnCardadd = (props) => {
  const history = useHistory();
  const [situationImg, setImg] = useState()
  const [imgFile, setImgFile] = useState()
  const [cardName, setCardName] = useState()
  const onImageChange = function (e) {
    setImgFile(e.target.files[0])
    setImg(URL.createObjectURL(e.target.files[0]))
  }
  const onInputChange = (e) => {
    setCardName(e.target.value)
  }

  const addCard = () => {
    const token = sessionStorage.getItem('jwt')
    let data = new FormData()
    data.append('file', imgFile)
    data.append('word', cardName)
    data.append('type', 'own')
    axios.post('https://dev.e-eum.kr/api/card', data, {
      headers: {
        'Content-type': 'multipart/form-data',
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
          onChange={onInputChange}
          defalutvalue={cardName}
          placeholder='카드 이름'/>
      </div>

        <div className={styles.bottom_button}>
      <div className={styles.button_box}>
          <button className={styles.close_button} onClick={props.addStateChange}>취소</button>
          <button className={styles.add_button} onClick={addCard} >등록</button>
        </div>
      </div>
    </>
  )
}

export default OwnCardadd;