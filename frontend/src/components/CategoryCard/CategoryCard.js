import React from 'react';
import styles from './CategoryCard.module.css'


const CategoryCard = (props) => {
  const textValue = props.textValue
  return(
    // <div className={styles.card_box}>
      <button className={styles.card}>
      <img className={styles.card_image} src='/images/user.png' alt=""/>
        {textValue}
      </button>
    // </div>
  )
}

export default CategoryCard;
