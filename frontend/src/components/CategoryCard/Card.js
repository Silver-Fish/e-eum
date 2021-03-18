import React from 'react';
import styles from './CategoryCard.module.css';



  
const Card = (props) => {
  
  const textValue = props.textValue 
  const cardUrl = props.cardUrl
  const cardButtonClick = (e) => {    
    props.cardClick({
      cardName: {textValue}, 
      cardUrl: {cardUrl}
    })
  }
  return(
    <button className={styles.card} onClick={cardButtonClick}>
      <img className={styles.card_image} src={cardUrl} alt=""/>
        {textValue}
    </button>
  )
}

export default Card;