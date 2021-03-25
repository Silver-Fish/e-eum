import React, {useEffect, useState} from 'react';
import styles from './OwnCardComp.module.css'
import axios from 'axios'

const OwnCardComp = (props) => {
  const isEdit = props['isEdit']
  const textValue = props.textValue
  const cardUrl = props.cardUrl
  // const [imgFile, setImgFile] = useState()
  const cardButtonClick = (e) => {    
    props.cardClick({
      cardName: {textValue}, 
      cardUrl: {cardUrl}
    })
  }
  // useEffect(() => {
  //   this.getCardList()
  // })
  // const getCardList = () => {
  //   const token = sessionStorage.getItem('jwt')
  //   // let data = new FormData()

  //   // axios.post('http://localhost:8080/api/card', data, {
  //   //   headers: {
  //   //     // 'type' : 'own',
  //   //     // 'word' : 'cardtitle',
  //   //     // 'file' : 'cardImg',
  //   //     'Content-type': 'multipart/form-data',
  //   //     'Authorization': token
  //   //     }
  //   // })
  //   // .then((res)=> {
  //   //   console.log(res)
  //   // })
  //   // .catch((err) => {
  //   //   console.log(err)
  //   // })
  //   // axios.get(`http://localhost:8080/api/card/${type}`, data, {
  //   //   headers: {
  //   //     'Content-type': 'multipart/form-data',
  //   //     'Authorization': token
  //   //     }
  //   // })
  //   // .then((res)=> {
  //   //   console.log(res)
  //   // })
  //   // .catch((err) => {
  //   //   console.log(err)
  //   // })
  // }
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
          <img className={styles.card_image} src={cardUrl} alt=""/>
          {/* <img className={styles.card_image} src={imgFile} alt=""/> */}
            {textValue}
        </button>
        :
        <>       
          <button className={styles.card_is_edit} onClick={cardEditClick}>
            <div className={styles.card_del_box} >
              <img src="/images/minus.png" alt="" onClick={cardDeleteClick}/>
            </div>
            <img className={styles.card_image} src={cardUrl} alt=""/>
            {textValue}
          </button>
        </>
      }
    </>
  )
};

export default OwnCardComp;