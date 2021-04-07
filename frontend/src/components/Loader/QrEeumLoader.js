import React from 'react';
import styles from './QrEeumLoader.module.css'

const QrEeumLoader = () => {

  return(
    <div className={styles.loading_box}>
        <div className={styles.loading_img}></div>    
        <div className={styles.loading_img2}></div>    
        <div className={styles.loading}>
          <span>Q</span>
          <span>R</span>
          <span>을</span>
          <span>이</span>
          <span>음</span>
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

export default QrEeumLoader;