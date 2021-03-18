import React, {useState} from 'react'
import styles from './index.module.css'
import HeaderComp from '../../components/HeaderComp/HeaderComp'
import CategoryCard from '../../components/CategoryCard/CategoryCard'
import Card from '../../components/CategoryCard/Card'
import SpeechBoxCard from '../../components/CategoryCard/SpeechBoxCard'
import CategoryAdd from '../../components/CategoryCard/CategoryAdd'

const Category = () => {
  const [isAdd, setAdd] = useState(false);
  const [isCategory, setIsCategory] = useState(true);
  const [categoryDatas, setCategory] = useState([
    '학교', '병원' , '싸피' , '감정표현', '스타벅스', 
    '학교', '병원' , '싸피' , '감정표현', '스타벅스',
    '학교', '병원' , '싸피' , '감정표현', '스타벅스',
    '학교', '병원' , '싸피' , '감정표현', 
  ]);
  const [cardDatas, setCard] = useState([]);
  
  const [speechBoxDatas, setSpeechBox] = useState([
    '예시', '예시' , '예시', '예시', '예시' , '예시'
  ]);


  const categoryClick = () => {
    setIsCategory(!isCategory);
    // setCard(['예시', '예시' , '예시', '예시', '예시' , '예시'])
    setCard(['예시', '예시' , '예시', '예시', '예시' , '예시',]);
  }
  
  const undo = () => {
    setIsCategory(!isCategory);
  }

  const categoryList = categoryDatas.map(
    (category, i) => (
      <CategoryCard 
        
        key={i} 
        textValue={category} 
        categoryState={categoryClick}
        
        ></CategoryCard>
    )
  )

  const cardList = cardDatas.map(
    (card, i) => (
      <Card 
        
        key={i} 
        textValue={card} 
        ></Card>
    )
  )

  const speechBoxList = speechBoxDatas.map(
    (speech, i) => (
      
      <SpeechBoxCard key={i} textValue={speech}></SpeechBoxCard>
    )
  )


  const addStateChange = () => {
    setAdd(!isAdd)
  }  

  const editClick = () => {
    console.log('edit')
  }

  return (
    <>
      { isAdd !== true
      ?
      <>
      <HeaderComp heardertitle='상황별 이음'></HeaderComp>
      
      
        <div className={styles.speech_box}>
          { speechBoxList }
        </div>
        
        <div className={styles.control_box}>
          { isCategory === true
            ?
            <button disabled><img src="/images/undo.svg" alt="undo"/></button>
            :
            <button onClick={undo}><img src="/images/undo.svg" alt="undo"/></button>
          }
          
          <button><img src="/images/play-button.svg" alt="play"/></button>
          <button><img src="/images/delete.svg" alt="close"/></button>
        </div>
        
        { isCategory === true
        ?
        <div className={styles.category_card_box}>
          { categoryList }
        </div>
        : 
        <div className={styles.card_box}>
          {cardList}
        </div>
        }


        <div className={styles.button_box}>
          <button className={styles.add_button} onClick={addStateChange}>추가</button>
          <button className={styles.update_button} onClick={editClick}>수정</button>
        </div>

      </>
         
      : 
      <>
        <HeaderComp heardertitle='상황 추가'></HeaderComp>
        <CategoryAdd addStateChange={addStateChange}></CategoryAdd>
      </>
      }
    </>
  );
}

export default Category;