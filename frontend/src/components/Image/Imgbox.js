import React from "react";
import styles from "./Imgbox.module.css"

const Imgbox = (props) => {
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

export default Imgbox