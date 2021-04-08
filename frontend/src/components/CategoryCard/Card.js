import React from 'react';
import { useState } from 'react';
import styles from './Card.module.css';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';

  
const Card = (props) => {
  // const history = useHistory();
  // const [isCardStateEdit, setCardStateEdit] = useState(false)
  const categoryId = props.categoryId
  const isCardStateEdit = useState(false)[0]
  // const [isCardEdit, setCardEdit] = useState(props.isCardEdit)
  let isCardEdit = props.isCardEdit
  const textValue = props.textValue 
  const voiceUrl = process.env.REACT_APP_IMG_PATH+props.voiceUrl
  const voiceLength = props.voiceLength 
  const cardUrl = process.env.REACT_APP_IMG_PATH+props.cardUrl
  const cardId = props.id
  let audio = ""
  const cardButtonClick = (e) => {  
    props.cardClick({
      cardName: {textValue}, 
      cardUrl: {cardUrl},
      voiceUrl: {voiceUrl},
      voiceLength:{voiceLength}
    })
    audio = new Audio(voiceUrl)
    audio.load()
    playAudio()   
  }
  const playAudio = () => {
    const audioPromise = audio.play()
    if (audioPromise !== undefined) {
      audioPromise
        .then(_ => {
          // autoplay started
        })
        .catch(err => {
          // catch dom exception
          alert('오디오 재생에 실패하였습니다.')
        })
    }
  }


  
  const CardDeleteClick = (e) => {    
    e.stopPropagation();
    const token = sessionStorage.getItem('jwt')
    const config = {
      headers: {
        'Authorization': token
      }
    }   
    axios.delete(process.env.REACT_APP_API_URL + '/card/'+ cardId, config)
    .then(()=> {
      axios.get(process.env.REACT_APP_API_URL + '/card/category?typeId=' + categoryId, config)
      .then((res) => {
        // props.cardDelete(!isCardEdit)
        props.cardDataReset(res.data)
        // history.go(0)
      })
      .catch((err) => {
        console.log(err)
      })


      // history.go(0)
    })
    .catch((err) => {
      console.log(err)
    })
  }  







  const CardEditClick = (e) => {
    
    props.CardStateEdit({state:!isCardStateEdit, url:cardUrl, name: textValue, cardId: cardId, voiceUrl:voiceUrl,voiceLength:voiceLength})
  }


  return(
    <> 
    { isCardEdit === false
      ?
    <button className={styles.card} onClick={cardButtonClick}>
      <img className={styles.card_image} src={cardUrl} alt=""/>
      <span className={styles.card_name}>{textValue}</span>
        
        
    </button>
    : 
    <>       
      <button className={styles.card_is_edit} onClick={CardEditClick}>
        <div className={styles.card_del_box} >
          <img src="/images/minus.png" alt="" onClick={CardDeleteClick}/>
        </div>
        <img className={styles.card_image} src={cardUrl} alt=""/>
        <span className={styles.card_name}>{textValue}</span>
      </button>
    </>

      }
    </>
  )
}

export default Card;