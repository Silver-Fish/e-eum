import React from 'react';
import styles from './SearchCardComp.module.css'

const SearchCardComp = (props) => {
  const textValue = props.textValue
  const imgUrl = process.env.REACT_APP_IMG_PATH+props.imgUrl
  const voiceUrl = process.env.REACT_APP_IMG_PATH+props.voiceUrl
  const voiceLength = props.voiceLength
  let audio = ""

  const cardButtonClick = (e) => {
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
    // <div className={styles.owneeum_card_box}>
      <button className={styles.card} onClick={cardButtonClick}>
        <img className={styles.card_image} src={imgUrl} alt="대체이미지"/>
          {textValue}
      </button>
    // </div>
  )
}

export default SearchCardComp;