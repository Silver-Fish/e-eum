import React from 'react';
import styles from './SpeechLoader.module.css'

const SpeechLoader = () => {

  return(
    <div className={styles.loading_box}>
        <div className={styles.loading_img}></div>    
        <div className={styles.loading_img2}></div>    
        <div className={styles.loading}>
          <span>음</span>
          <span>성</span>
          <span>을</span>
          <span>준</span>
          <span>비</span>
          <span>중</span>
          <span>입</span>
          <span>니</span>
          <span>다</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>  
    </div>
  )
}

export default SpeechLoader;