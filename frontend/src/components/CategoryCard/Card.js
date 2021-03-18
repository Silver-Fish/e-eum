import React from 'react';
import styles from './CategoryCard.module.css';
import { useHistory } from "react-router-dom";



  
const Card = (props) => {
  const textValue = props.textValue 
  const handleClick = (e) => {    
    props.categoryState(false)
  }
  return(
    <button className={styles.card} onClick={handleClick}>
      <img className={styles.card_image} src='/images/user.png' alt=""/>
        {textValue}
    </button>
  )
}

export default Card;