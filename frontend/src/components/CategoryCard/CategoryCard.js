import React from 'react';
import { useState } from 'react';
import styles from './CategoryCard.module.css';
import axios from 'axios'
import { useHistory } from 'react-router-dom';


  
const CategoryCard = (props) => {
  const history = useHistory();
  const isCategoryCardEdit = useState(false)[0]
  const isCategoryEdit = props['isCategoryEdit']
  const categoryName = props.textValue
  const imgUrl = process.env.REACT_APP_IMG_PATH+props.categoryUrl
  const categoryId = props['id']
  const categoryCardClick = (e) => {    
    props.categoryTitle({categoryName}['categoryName'])
    
    

    const token = sessionStorage.getItem('jwt')
    const config = {
      headers: {
        'Authorization': token
      }
    }

    
    axios.get(process.env.REACT_APP_API_URL + '/card/category?typeId=' + categoryId, config)
    .then((res) => {
      props.categoryClick({state:false, cardDatas:res.data, categoryId:categoryId, categoryName:categoryName})
    })
    .catch((err) => {
      alert('카드를 받아오는 도중 오류가 발생했습니다. 다시 한번 시도해주세요.')
    })
    
  }
  
  const categoryDeleteClick = (e) => {    
    e.stopPropagation();
    props.categoryDel({categoryId:props.id})
  }
  const categoryCardEditClick = (e) => {
    
    props.categoryCardEdit({state:!isCategoryCardEdit, id:props.id, url:imgUrl, name: {categoryName}['categoryName']})
  }
  
  return(
    <>
      { isCategoryEdit === false
        ?
        <button className={styles.card} onClick={categoryCardClick}>
          <img className={styles.card_image} src={imgUrl} alt=""/>
          <span className={styles.category_name}>{categoryName}</span>
        </button>
        :
        <>       
          <button className={styles.card_is_edit} onClick={categoryCardEditClick}>
            <div className={styles.card_del_box} >
              <img src="/images/minus.png" alt="" onClick={categoryDeleteClick}/>
            </div>
            <img className={styles.card_image} src={imgUrl} alt=""/>
            <span className={styles.category_name}>{categoryName}</span>
          </button>
        </>
      }
    </>
  )
}

export default CategoryCard;
