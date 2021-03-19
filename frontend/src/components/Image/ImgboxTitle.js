import React from "react";
import styles from "./ImgboxTitle.module.css"

const ImgboxTitle = (props) => {
  const imgSrc = props.src
  
  return(
    <div className={styles.imagebox}>
      <img 
        className={styles.image}
        src={imgSrc} 
        alt='img'
      />
    </div>
  );
}

export default ImgboxTitle