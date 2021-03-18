import React from 'react';
import styles from './SpeechboxComp.module.css'

const SpeechboxComp = (props) => {
  const textValue = props.textValue
  return (
    <div className={styles.speech_area}>
      <button className={styles.speech_box}>
        <button className={styles.card}>
        <img className={styles.card_image} src='/images/user.png' alt=""/>
          {textValue}
        </button>
      </button>
      <button className={styles.speech_cancel}></button>
    </div>
    
    
  );
};

export default SpeechboxComp;