import axios from 'axios';
import React, { useState } from 'react';
import styles from './CategoryAdd.module.css'

const CategoryAdd = (props) => {
  const [situationImg, setImg] = useState()
  const [imgFile, setImgFile] = useState()
  const onImageChange = function (e) {
    setImg(e.target.value)    
    setImgFile(e.target.files[0])
    setImg(URL.createObjectURL(e.target.files[0]))
  }

  
  

  const addCategory = () => {
    const token = sessionStorage.getItem('jwt')
    let data = new FormData()
    data.append('file', imgFile)
    data.append('word', '몰라')
    axios.post(process.env.REACT_APP_API_URL + 'api/category', data, {
      headers: {
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
          <button className={styles.add_button} onClick={addCategory} >등록</button>
      </div>
    </>
  )
}

export default CategoryAdd;