import React from 'react';
import styles from './OwnCardComp.module.css'


const OwnCardComp = (props) => {
  const isEdit = props['isEdit']
  const cardName = props.textValue
  const imgUrl = props.cardUrl

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
        <button className={styles.card} onClick={CardClick}>
          <img className={styles.card_image} src={imgUrl} alt=""/>
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