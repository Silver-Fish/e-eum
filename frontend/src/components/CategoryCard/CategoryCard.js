import React from 'react';
import { useState } from 'react';
import styles from './CategoryCard.module.css';



  
const CategoryCard = (props) => {
  const [isCategoryCardEdit, setCategoryCardEdit] = useState(false)
  const isCategoryEdit = props['isCategoryEdit']
  const categoryName = props.textValue
  const imgUrl = props.categoryUrl

  const categoryCardClick = (e) => {    
    
    props.categoryTitle({categoryName}['categoryName'])
    props.categoryState(false)
    console.log('백이랑 통신이 필요함');
  }
  
  const categoryDeleteClick = (e) => {    
    e.stopPropagation();
    console.log('서버와 삭제 통신해야함')
  }
  const categoryCardEditClick = (e) => {
    
    props.categoryCardEdit({state:!isCategoryCardEdit, url:imgUrl, name: {categoryName}['categoryName']})
  }
  
  return(
    <>
      { isCategoryEdit === false
        ?
        <button className={styles.card} onClick={categoryCardClick}>
          <img className={styles.card_image} src={imgUrl} alt=""/>
            {categoryName}
        </button>
        :
        <>       
          <button className={styles.card_is_edit} onClick={categoryCardEditClick}>
            <div className={styles.card_del_box} >
              <img src="/images/minus.png" alt="" onClick={categoryDeleteClick}/>
            </div>
            <img className={styles.card_image} src={imgUrl} alt=""/>
            {categoryName}
          </button>
        </>
      }
    </>
  )
}

export default CategoryCard;
