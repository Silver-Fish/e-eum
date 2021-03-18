import React from 'react';
import styles from './SpeechBoxCard.module.css'

const SpeechBox = (props) => {
  const textValue = props.textValue
  return(
    <button className={styles.card}>
      <img className={styles.card_image} src='/images/user.png' alt=""/>
        {textValue}
    </button>
  )
}

export default SpeechBox;