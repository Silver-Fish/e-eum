import React, { useState } from 'react';
import styles from './CategoryEdit.module.css'

const CategoryEdit = (props) => {

  const [situationImg, setImg] = useState(props['categoryUrl'])
  const [categoryName, setCategoryName] = useState(props['categoryName'])
  
  
  const onImageChange = function (e) {
    
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
            <img  src='/images/photo-camera.svg' alt="대체이미지" />
            <input type="file" className={styles.image_input} onChange={onImageChange}/>
              
          </label>
        </div>
        
        <input 
          type='text' 
          className={styles.situation_input}
          defaultValue={categoryName}
          placeholder='상황 이름'/>
      </div>

      <div className={styles.button_box}>
          <button className={styles.close_button} onClick={props.categoryEditStateChange}>취소</button>
          <button className={styles.add_button} onClick={props.categoryEditStateChange} >등록</button>
      </div>
    </>
  )
}

export default CategoryEdit;