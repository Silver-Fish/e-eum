import React, { useState } from 'react';
import styles from './CardEdit.module.css'
import axios from 'axios';
// import { useHistory } from 'react-router-dom';
import Loader from '../Loader/Loader'
import SpeechLoader from '../Loader/SpeechLoader';

const CardEdit = (props) => {
  // const history = useHistory();
  const cardImg = useState(props['cardUrl'])[0]
  // const [cardImg, setCardImg] = useState(props['cardUrl'])
  const [cardName, setCardName] = useState(props['cardName'])
  const cardId = props['cardId']
  const voiceUrl = props.voiceUrl
  let [lenCardName, setlenCardName] = useState(props['cardName'].length)
  const [isLoading, setLoading] = useState(false)
  const [speechLoading, setSpeechLoading] = useState(false)
  const categoryId = props.categoryId
  let audio = ""


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
        alert('카드수정 도중 오류가 발생했습니다. 다시 한번 시도해주세요.')
        setLoading(!isLoading)
      })
      
      
      
    })
    .catch((err) => {
      console.log(err)
    })
  }




  const speakClick= () => {
    setSpeechLoading(!speechLoading)
    const token = sessionStorage.getItem('jwt')
    let data = {
      'word' : cardName
    }
    axios.post(process.env.REACT_APP_API_URL + `/voice`, data, {
      headers: {
        Authorization: token,
      },  
    })
    .then((res)=> {
      axios.get(process.env.REACT_APP_API_URL +`/voice/${cardName}`, {
        headers: {
          Authorization: token
        }
      })
      .then((res) => {
        setSpeechLoading(false)
        audio = new Audio(process.env.REACT_APP_IMG_PATH + res.data)
        audio.load()
        playAudio()   
          
      })
      .catch((err) => {
        alert('미리듣기 오류입니다.. 다음에 시도해주세요')
        setSpeechLoading(false)
      })

    })
    .catch((err) => {

      alert('미리듣기 오류입니다.. 다음에 시도해주세요')
      setSpeechLoading(false)
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
    {(() => {
      if(isLoading !== false)
        return (
          <Loader></Loader>
        );
      else if(isLoading === false)
        return (
          <>
          { speechLoading
            ?
            (
              <SpeechLoader></SpeechLoader>
            )
            :
            (
              ''
            )
          }
        <div className={styles.edit_box}>
          <div className={styles.image_box}>
            <img  src={cardImg} alt="이미지를 등록해주세요" />
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
          <div className={styles.count_Name}>{lenCardName}/10</div>
        </div>

        <div className={styles.bottom_button}>
          <div className={styles.button_box}>
            <button className={styles.close_button} onClick={props.goEditStateChange}>취소</button>
            <button className={styles.edit_button} onClick={editCard} >등록</button>
          </div>
        </div>   

          </>
        );
      })()}
    </>
    )
  };

export default CardEdit;