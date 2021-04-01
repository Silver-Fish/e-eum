import React from 'react';
import styles from './SpeechBoxCard.module.css'

const SpeechBoxCard = (props) => {
  const textValue = props.textValue
  const imgUrl = props.imgUrl
  const voiceUrl = props.voiceUrl
  // console.log(props)
  return(
    <button className={styles.card}>
      <img className={styles.card_image} src={imgUrl} alt="대체이미지"/>
        {textValue}
    </button>
  )
}

export default SpeechBoxCard;