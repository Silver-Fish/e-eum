import React from 'react';
import styles from './SpeachboxComp.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

const SpeachboxComp = () => {
  return (
    <div className={styles.speacharea}>
      <button className={styles.speachbox}>speach area</button>
      <button className={styles.speachcancel}><FontAwesomeIcon icon={faTimes} size="4x"/></button>
    </div>
    
    
  );
};

export default SpeachboxComp;