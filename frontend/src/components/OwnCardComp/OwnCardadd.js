import React, { useState} from 'react';
import { useHistory } from 'react-router-dom';
import styles from './OwnCardadd.module.css'
import axios from 'axios'
import Loader from '../Loader/Loader'
const OwnCardadd = (props) => {
  const history = useHistory();
  const [situationImg, setImg] = useState()
  const [imgFile, setImgFile] = useState()
  const [cardName, setCardName] = useState()
  const [isLoading, setLoading] = useState(false)
  const [speechWord, setSpeechWord] =useState('')
  let audio = ''
  const onImageChange = function (e) {
    setImgFile(e.target.files[0])
    setImg(URL.createObjectURL(e.target.files[0]))
  }
  const onInputChange = (e) => {
    setCardName(e.target.value)
    console.log(cardName)
    console.log(e.target.value)
  }

  const addCard = () => {
    setLoading(!isLoading)
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
      setLoading(!isLoading)
      history.go(0)
    })
    .catch((err) => {
      console.log(err)
    })
  }
  const speakClick= () => {
    console.log('소리쳐')
    console.log(typeof(cardName))
    console.log(cardName)
    const token = sessionStorage.getItem('jwt')
    axios.get(`https://dev.e-eum.kr/api/card/voice/${cardName}`, {
      headers: {
        Authorization: token,
      },  
    })
    .then((res)=> {
      console.log(res.data)
      setSpeechWord(res.data)
      audio = new Audio(process.env.REACT_APP_IMG_PATH+speechWord)
      audio.load()
      playAudio()   
    })
    .catch((err) => {
      console.log(err)
    })
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
        
        <div className={styles.card_input_box}>
          <input 
            type='text' 
            className={styles.situation_input}
            onChange={onInputChange}
            defalutvalue={cardName}
            placeholder='카드 이름'
            maxLength='10'/>
            <img onClick={speakClick} src="/images/speaker-filled-audio-tool.svg" alt="대체이미지" />
            {/* <img src="/images/speaker-filled-audio-tool.svg" alt="대체이미지" /> */}
        </div>
      </div>
      
        <div className={styles.bottom_button}>
      <div className={styles.button_box}>
          <button className={styles.close_button} onClick={props.addStateChange}>취소</button>
          <button className={styles.add_button} onClick={addCard} >등록</button>
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

export default OwnCardadd;