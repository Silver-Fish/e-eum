import React from 'react';
import styles from './CategoryCard.module.css';
import { useHistory } from "react-router-dom";



  
const CategoryCard = (props) => {
  const textValue = props.textValue
  const handleClick = (e) => {    
    props.categoryState(false)
    console.log('백이랑 통신이 필요함')
  }
  return(
    <button className={styles.card} onClick={handleClick}>
      <img className={styles.card_image} src='/images/user.png' alt=""/>
        {textValue}
    </button>
  )
}

export default CategoryCard;
