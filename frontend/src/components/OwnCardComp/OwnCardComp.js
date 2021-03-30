import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import styles from './OwnCardComp.module.css'
import axios from 'axios'

const OwnCardComp = (props) => {
  const history = useHistory();
  // const isEdit = props['isEdit']
  const goEdit = useState(false)[0]
  const isEdit = props['isEdit']
  const cardName = props.textValue
  const cardId = props.cardId
  const imgUrl = `/data/${props.imgUrl}`


  const cardButtonClick = (e) => {    
    props.cardClick({
      cardName: {cardName}, 
      imgUrl: {imgUrl}
    })
  }
  
  const cardDeleteClick = (e) => {    
    e.stopPropagation();
    const token = sessionStorage.getItem('jwt')
    const config = {
      headers: {
        'Authorization': token
      }
    }
    axios.delete(`https://dev.e-eum.kr/api/card/${cardId}`,config)
    .then((res)=> {
      history.go(0)
    })
    .catch((err) => {
      console.log('오류야')
      console.log(err)
    })
    
  }
  const cardEditClick = (e) => {
    console.log("수정하기")
    console.log(goEdit)
    props.OwnGoEdit({state:!goEdit,id:cardId, url:imgUrl, name: {cardName}['cardName']})
  }
  
  return(
    <>
      {isEdit === false
        ?
        <button className={styles.card} onClick={cardButtonClick}>
          <img className={styles.card_image} src={imgUrl} alt=""/>
          {/* <img className={styles.card_image} src={imgFile} alt=""/> */}
            {cardName}
        </button>
        :
        <>       
          <button className={styles.card_is_edit} onClick={cardEditClick}>
            <div className={styles.card_del_box} >
              <img src="/images/minus.png" alt="" onClick={cardDeleteClick}/>
            </div>
            <img className={styles.card_image} src={imgUrl} alt=""/>
            {cardName}
          </button>
        </>
      }
    </>
  )
};

export default OwnCardComp;