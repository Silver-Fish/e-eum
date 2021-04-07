import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './CategoryAdd.module.css'
import Loader from '../Loader/Loader'
const CategoryAdd = (props) => {
  const history = useHistory();
  const [situationImg, setImg] = useState()
  const [imgFile, setImgFile] = useState()
  const [categoryName, setCategoryName] = useState()
  const [isLoading, setLoading] = useState(false)
  let [lenCategoryName, setlenCategoryName] = useState(0)
  const onImageChange = (e) => {
    console.log(e.target.files[0].size)

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
  
  // const checkInput = (e) => {
  //   const soloChar = /[ㄱ-ㅎㅏ-ㅣㆍ ᆢ]/g
  //   const reg = /[\{\}\[\]\/,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
  //   const korea = /[ㄱ-ㅎㅏ-ㅣ가-힇ㆍ ᆢ]/g
  //   // const pattern = e.target.value.match(korea);
  //   // console.log(pattern)
    
  //   console.log(e.target.value[e.target.value.length-1])
  //   // console.log(soloChar.test(e.target.value)) // 단일 글자만 있는지 판단
  //   // console.log(reg.test(e.target.value))
  // }

  const addCategory = () => {
    setLoading(!isLoading)
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
      setLoading(!isLoading)
      history.go(0)
    })
    .catch((err) => {
      alert('상황생성 도중 오류가 발생했습니다. 다시 한번 시도해주세요.')
      setLoading(!isLoading)
      history.go(0)
    })
  }

  return(
    <>
    
      { isLoading === false
      ?
      (
      <>
      
      <div className={styles.add_box}>
        <div className={styles.image_box}>
          <img  src={situationImg} alt="이미지를 등록해주세요" />

          <label  
            className={styles.image_button}
            >
            <img  src="/images/photo-camera.svg" alt="대체이미지" />
            <input type="file" accept="image/*" className={styles.image_input} onChange={onImageChange}/>
              
          </label>
        </div>
        <input 
          type='text' 
          className={styles.situation_input}
          onChange={onInputChange}
          defalutvalue={categoryName}
          placeholder='상황 이름'
          // onKeyUp={checkInput}
          maxLength='10'/>
        <p className={styles.count_Name}>{lenCategoryName}/10</p>
      </div>

      <div className={styles.bottom_button}>
        <div className={styles.button_box}>
            <button className={styles.close_button} onClick={props.addStateChange}>취소</button>
            <button id='addButton' className={styles.add_button} onClick={addCategory} >등록</button>
        </div>
      </div>
      </>
      )
      :
      (
        <Loader></Loader>
      )
      }
    </>
  )
}

export default CategoryAdd;