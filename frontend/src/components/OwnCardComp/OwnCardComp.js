import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import styles from './OwnCardComp.module.css'
import axios from 'axios'

const OwnCardComp = (props) => {
  const history = useHistory();
  const goEdit = useState(false)[0]
  const isEdit = props['isEdit']
  const cardName = props.textValue
  const cardId = props.cardId
  const voiceUrl = process.env.REACT_APP_IMG_PATH+props.voiceUrl
  const voiceLength = props.voiceLength
  const imgUrl = process.env.REACT_APP_IMG_PATH+props.imgUrl
  let audio = ""
  const cardButtonClick = (e) => { 
    props.cardClick({
      cardName: {cardName}, 
      imgUrl: {imgUrl},
      voiceUrl: {voiceUrl},
      voiceLength:{voiceLength}
    })
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
  
  const cardDeleteClick = (e) => {    
    e.stopPropagation();
    const token = sessionStorage.getItem('jwt')
    const config = {
      headers: {
        'Authorization': token
      }
    }
    axios.delete(`https://dev.e-eum.kr/api/card/${cardId}`,config)
    .then((res)=> {
      history.go(0)
    })
    .catch((err) => {
      console.log(err)
    })
    
  }
  const cardEditClick = (e) => {
    props.OwnGoEdit({state:!goEdit,id:cardId, url:imgUrl, name: {cardName}['cardName'], voiceUrl:voiceUrl})
  }
  
  return(
    <>
      {isEdit === false
        ?
        <button className={styles.card} onClick={cardButtonClick}>
          <img className={styles.card_image} src={imgUrl} alt=""/>
            {cardName}
        </button>
        :
        <>       
          <button className={styles.card_is_edit} onClick={cardEditClick}>
            <div className={styles.card_del_box} >
              <img src="/images/minus.png" alt="" onClick={cardDeleteClick}/>
            </div>
            <img className={styles.card_image} src={imgUrl} alt=""/>
            {cardName}
          </button>
        </>
      }
    </>
  )
};

export default OwnCardComp;