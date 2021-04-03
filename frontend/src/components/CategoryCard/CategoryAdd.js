import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './CategoryAdd.module.css'

const CategoryAdd = (props) => {
  const history = useHistory();
  const [situationImg, setImg] = useState()
  const [imgFile, setImgFile] = useState()
  const [categoryName, setCategoryName] = useState()
  let [lenCategoryName, setlenCategoryName] = useState(0)
  const onImageChange = (e) => {
    setImgFile(e.target.files[0])
    setImg(URL.createObjectURL(e.target.files[0]))
  }

  const onInputChange = (e) => {
    if (e.target.value.length > 10){
      alert('상황이름은 10자까지 가능합니다.')
    } else{
      setCategoryName(e.target.value)
      setlenCategoryName(e.target.value.length)
    }
  }
  

  const addCategory = () => {
    const addButton = document.getElementById('addButton')
    addButton.disabled = true;
    const token = sessionStorage.getItem('jwt')
    let data = new FormData()
    data.append('image', imgFile)
    data.append('word', categoryName)
    axios.post(process.env.REACT_APP_API_URL + '/category', data, {
      headers: {
        'Content-type': 'multipart/form-data',
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
          defalutvalue={categoryName}
          placeholder='상황 이름'
          maxLength='10'/>
      <p>{lenCategoryName}/10</p>
      </div>

      <div className={styles.bottom_button}>
        <div className={styles.button_box}>
            <button className={styles.close_button} onClick={props.addStateChange}>취소</button>
            <button id='addButton' className={styles.add_button} onClick={addCategory} >등록</button>
        </div>
      </div>
    </>
  )
}

export default CategoryAdd;