import React from 'react';
import styles from './SpeachboxComp.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

const SpeachboxComp = (props) => {
  const textValue = props.textValue
  return (
    <div className={styles.speacharea}>
      <button className={styles.speachbox}>
        <button className={styles.card}>
        <img className={styles.card_image} src='/images/user.png' alt=""/>
          {textValue}
        </button>
      </button>
      <button className={styles.speachcancel}><FontAwesomeIcon icon={faTimes} size="4x"/></button>
    </div>
    
    
  );
};

export default SpeachboxComp;