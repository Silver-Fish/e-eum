import React, {useEffect, useState} from 'react';
import styles from './Card.module.css'

const Card = (props) => {
  const isEdit = props['isEdit']
  const textValue = props.textValue
  const imgUrl = `/data/${props.imgUrl}`
  
  
  const cardButtonClick = (e) => {    
    props.cardClick({
      cardName: {textValue}, 
      imgUrl: {imgUrl}
    })
  }
  const CardClick = (e) => {    
    // props.categoryState(false)
    console.log('백이랑 통신이 필요함');
  }
  
  const cardDeleteClick = (e) => {    
    e.stopPropagation();
    console.log('서버와 삭제 통신해야함')
  }
  const cardEditClick = (e) => {
    
    // props.categoryCardEdit({state:!isEdit, url:imgUrl, name: {cardName}['cardName']})
    
    
    // console.log(URL.createOb.buttonjectURL(e.target.src))
  }
  
  return(
    <>
      { isEdit === false
        ?
        <button className={styles.card} onClick={cardButtonClick}>
          <img className={styles.card_image} src={imgUrl} alt=""/>
          {/* <img className={styles.card_image} src={imgFile} alt=""/> */}
            {textValue}
        </button>
        :
        <>       
          <button className={styles.card_is_edit} onClick={cardEditClick}>
            <div className={styles.card_del_box} >
              <img src="/images/minus.png" alt="" onClick={cardDeleteClick}/>
            </div>
            <img className={styles.card_image} src={imgUrl} alt=""/>
            {textValue}
          </button>
        </>
      }
    </>
  )
};

export default Card;