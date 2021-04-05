import React, { useState } from 'react';
import styles from './CardEdit.module.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Loader from '../Loader/Loader'

const CardEdit = (props) => {
  console.log(props)
  const history = useHistory();
  const [cardImg, setCardImg] = useState(props['cardUrl'])
  const [cardName, setCardName] = useState(props['cardName'])
  const cardId = props['cardId']
  const voiceUrl = props.voiceUrl
  console.log(voiceUrl)
  let [lenCardName, setlenCardName] = useState(props['cardName'].length)
  const [isLoading, setLoading] = useState(false)
  const categoryId = props.categoryId
  let audio = ""




  const onImageChange = function (e) {
    
    setCardImg(e.target.value)
    setCardImg(URL.createObjectURL(e.target.files[0]))

  }

  const onInputChange = (e) => {
    if (e.target.value.length > 10){
      alert('카드이름은 10자까지 가능합니다.')
    } else{
      setCardName(e.target.value)
      setlenCardName(e.target.value.length)
    }
  }

  const editCard = () => {
    setLoading(!isLoading)
    const token = sessionStorage.getItem('jwt')
    const config= {
      headers: {
        'Authorization': token
      }
    }
    const editButton = document.getElementById('editButton')
    editButton.disabled = true;
    const data = {
      'word': cardName
    }
    
    axios.put(process.env.REACT_APP_API_URL + '/card/'+ cardId, data, config)
    .then(()=> {
      axios.get(process.env.REACT_APP_API_URL + '/card/category?typeId=' + categoryId, config)
      .then((res) => {
        setLoading(!isLoading)
        props.cardEdit(false)
        props.cardDataReset(res.data)
        props.cardEditStateChange()

      })
      .catch((err) => {
        console.log(err)
      })
      
      
      
    })
    .catch((err) => {
      console.log(err)
    })
  }




  const speakClick= () => {
    console.log('소리쳐')
    audio = new Audio(voiceUrl)
    audio.load()
    playAudio()   
  }
  const playAudio = () => {
    const audioPromise = audio.play()
    if (audioPromise !== undefined) {
      audioPromise
        .then(_ => {
          // autoplay started
        })
        .catch(err => {
          // catch dom exception
          console.info(err)
        })
    }
  }

  return(
    <>
      { isLoading === false
      ?
      (
      <>
      <div className={styles.edit_box}>
        <div className={styles.image_box}>
          <img  src={cardImg} alt="이미지를 등록해주세요" />

          {/* <label  
            className={styles.image_button}
            >
            <img  src='/images/photo-camera.svg' alt="대체이미지" />
            <input type="file" className={styles.image_input} onChange={onImageChange}/>
              
          </label> */}
        </div>
        
      

      <div className={styles.card_input_box}>
          <input 
            type='text' 
            className={styles.card_input}
            defaultValue={cardName}
            onChange={onInputChange}
            placeholder='카드 이름'
            maxLength='10'/>
          <img onClick={speakClick} src="/images/speaker-filled-audio-tool.svg" alt="대체이미지" />
        </div>
        <p>{lenCardName}/10</p>
      </div>
      <div className={styles.bottom_button}>
        <div className={styles.button_box}>
            <button className={styles.close_button} onClick={props.cardEditStateChange}>취소</button>
            <button id='editButton' className={styles.edit_button} onClick={editCard} >수정</button>
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

export default CardEdit;