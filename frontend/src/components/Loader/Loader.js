import React from 'react';
import styles from './Loader.module.css'

const Loader = () => {
  return(
    <div className={styles.loading_box}>
        <div className={styles.loading_img}></div>        
        <div className={styles.loading}>
          <span>L</span>
          <span>o</span>
          <span>a</span>
          <span>d</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>  
    </div>
  )
}

export default Loader;