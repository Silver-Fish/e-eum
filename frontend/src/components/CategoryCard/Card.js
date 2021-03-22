import React from 'react';
import { useState } from 'react';
import styles from './CategoryCard.module.css';



  
const Card = (props) => {
  // const [isCardStateEdit, setCardStateEdit] = useState(false)
  const isCardStateEdit = useState(false)[0]
  const isCardEdit = props.isCardEdit
  const textValue = props.textValue 
  const cardUrl = props.cardUrl

  const cardButtonClick = (e) => {    
    props.cardClick({
      cardName: {textValue}, 
      cardUrl: {cardUrl}
    })
  }


  
  const CardDeleteClick = (e) => {    
    e.stopPropagation();
    console.log('서버와 삭제 통신해야함')
  }
  const CardEditClick = (e) => {
    
    props.CardStateEdit({state:!isCardStateEdit, url:cardUrl, name: textValue})
  }


  return(
    <>
    { isCardEdit === false
      ?
    <button className={styles.card} onClick={cardButtonClick}>
      <img className={styles.card_image} src={cardUrl} alt=""/>
        {textValue}
    </button>
    : 
    <>       
      <button className={styles.card_is_edit} onClick={CardEditClick}>
        <div className={styles.card_del_box} >
          <img src="/images/minus.png" alt="" onClick={CardDeleteClick}/>
        </div>
        <img className={styles.card_image} src={cardUrl} alt=""/>
        {textValue}
      </button>
    </>

      }
    </>
  )
}

export default Card;