import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import styles from './OwnCardEdit.module.css'
import axios from 'axios'
import Loader from '../Loader/Loader'
const OwnCardEdit = (props) => {
  const history = useHistory();
  const imgUrl = props.imgUrl
  const [cardName, setCardName] = useState(props['cardName'])
  let [lenCardName, setlenCardName] = useState(props['cardName'].length)
  const cardId = props.cardId
  const [isLoading, setLoading] = useState(false)
  // const voiceUrl = process.env.REACT_APP_IMG_PATH+props.voiceUrl
  const voiceUrl = props.voiceUrl
  console.log(voiceUrl)
  let audio = ''

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
    const data = {
      'word' : cardName
    }
    axios.put(`https://dev.e-eum.kr/api/card/${cardId}`, data, {
      headers: {
        'Authorization': token
        }
    })
    .then((res)=> {
      setLoading(!isLoading)
      history.go(0)
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
          <img  src={imgUrl} alt="이미지를 등록해주세요" />
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
          <button className={styles.close_button} onClick={props.goEditStateChange}>취소</button>
          <button className={styles.edit_button} onClick={editCard} >등록</button>
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
};

export default OwnCardEdit;