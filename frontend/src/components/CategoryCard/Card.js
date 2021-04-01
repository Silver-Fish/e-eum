import React from 'react';
import { useState } from 'react';
import styles from './Card.module.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

  
const Card = (props) => {
  const history = useHistory();
  // const [isCardStateEdit, setCardStateEdit] = useState(false)
  const categoryId = props.categoryId
  const isCardStateEdit = useState(false)[0]
  const isCardEdit = props.isCardEdit
  const textValue = props.textValue 
  const cardUrl = process.env.REACT_APP_IMG_PATH+props.cardUrl
  const cardId = props.id

  const cardButtonClick = (e) => {    
    props.cardClick({
      cardName: {textValue}, 
      cardUrl: {cardUrl}
    })
  }


  
  const CardDeleteClick = (e) => {    
    e.stopPropagation();
    const token = sessionStorage.getItem('jwt')   
    axios.delete(process.env.REACT_APP_API_URL + '/card/'+ cardId, {
      headers: {
        'Authorization': token
        }
    })
    .then(()=> {
      history.go(0)
    })
    .catch((err) => {
      console.log(err)
    })
  }  







  const CardEditClick = (e) => {
    
    props.CardStateEdit({state:!isCardStateEdit, url:cardUrl, name: textValue, cardId: cardId})
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