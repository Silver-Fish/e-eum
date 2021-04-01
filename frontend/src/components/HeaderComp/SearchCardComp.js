import React from 'react';
import styles from './SearchCardComp.module.css'

const SearchCardComp = (props) => {
  console.log(props)
  const textValue = props.textValue
  const imgUrl = props.imgUrl
  return(
    // <div className={styles.owneeum_card_box}>
      <button className={styles.card}>
        <img className={styles.card_image} src={imgUrl} alt="대체이미지"/>
          {textValue}
      </button>
    // </div>
  )
}

export default SearchCardComp;