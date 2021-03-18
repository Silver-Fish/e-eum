import React, {useState} from 'react'
import styles from './index.module.css'
import HeaderComp from '../../components/HeaderComp/HeaderComp'
import CategoryCard from '../../components/CategoryCard/CategoryCard'
import Card from '../../components/CategoryCard/Card'
import SpeechBoxCard from '../../components/CategoryCard/SpeechBoxCard'
import CategoryAdd from '../../components/CategoryCard/CategoryAdd'
import CategoryEdit from '../../components/CategoryCard/CategoryEdit'



const Category = () => {
  const [headTitle, setheadTitle] = useState('상황별 이음')
  const [isCategory, setCategory] = useState(true);
  const [isCategoryAdd, setCategoryAdd] = useState(false);
  const [isCategoryEdit, setCategoryEdit] = useState(false);
  const [isCategoryCardEdit, setCategoryCardEdit] = useState(false);
  const [categoryUrl, setCategoryUrl] = useState('')
  const [categoryName, setCategoryName] = useState('')
  // const [categoryDatas] = useState([
  //   '학교', '병원' , '싸피' , '감정표현', '스타벅스', 
  //   '학교', '병원' , '싸피' , '감정표현', '스타벅스',
  //   '학교', '병원' , '싸피' , '감정표현', '스타벅스',
  //   '학교', '병원' , '싸피' , '감정표현', 
  // ]);
  const [categoryDatas] = useState([
    ['학교', '/images/user.png'], ['병원', '/images/user.png'] , ['싸피', '/images/user.png'] , ['감정표현', '/images/user.png'], ['스타벅스', '/images/user.png'], 
    ['학교', '/images/user.png'], ['병원', '/images/user.png'] , ['싸피', '/images/user.png'] , ['감정표현', '/images/user.png'], ['스타벅스', '/images/user.png'], 
    ['학교', '/images/user.png'], ['병원', '/images/user.png'] , ['싸피', '/images/user.png'] , ['감정표현', '/images/user.png'], ['스타벅스', '/images/user.png'], 
    ['학교', '/images/user.png'], ['병원', '/images/user.png'] , ['싸피', '/images/user.png'] , ['감정표현', '/images/user.png'], ['스타벅스', '/images/user.png'], 
  ]);
  const [cardDatas, setCard] = useState([]);
  const [speechBoxDatas, setSpeechBoxDatas] = useState([]);


  const categoryClick = (e) => {
    setCategory(!isCategory);
    setCard([
      ['학교', '/images/user.png'], ['병원', '/images/user.png'] , ['싸피', '/images/user.png'] , ['감정표현', '/images/user.png'], ['스타벅스', '/images/user.png'],
    ]);
  }
  
  const cardClick = (data) => {
    
    setSpeechBoxDatas([...speechBoxDatas,
      [data.cardName['textValue'], data.cardUrl['cardUrl']]
    ]);
    console.log(speechBoxDatas) 
  }
  
  const deleteClick = () => {
    speechBoxDatas.pop()
    console.log(speechBoxDatas)
    setSpeechBoxDatas([...speechBoxDatas])
    
  }

  const undo = () => {
    setCategory(!isCategory);
    setheadTitle('상황별 이음')
  }

  const categoryTitle = (data) => {
    setheadTitle(data)
  }
  
  const categoryCardEdit = (data) => {
    setCategoryCardEdit(data.state)
    setCategoryUrl(data.url)
    setCategoryName(data.name)
  }

  const categoryList = categoryDatas.map(
    (category, i) => (
      <CategoryCard       
        key={i} 
        textValue={category[0]}
        categoryUrl={category[1]}
        categoryState={categoryClick}
        isCategoryEdit={isCategoryEdit}
        categoryTitle = {categoryTitle}
        categoryCardEdit = {categoryCardEdit}
      ></CategoryCard>
    )
  )



  const cardList = cardDatas.map(
    (card, i) => (
      <Card 
        key={i} 
        textValue={card[0]}
        cardUrl={card[1]}
        cardClick={cardClick}
      ></Card>
    )
  )

  const speechBoxList = speechBoxDatas.map(
    (speech, i) => (
      <SpeechBoxCard 
        key={i} 
        textValue={speech[0]} 
        cardUrl={speech[1]}
      ></SpeechBoxCard>
    )
  )


  const addStateChange = () => {
    setCategoryAdd(!isCategoryAdd)
  }  

  const categoryEditClick = () => {
    setCategoryEdit(!isCategoryEdit)
  }

  return (
    <>
      { isCategory === true
        ?
      <>
        { (function() {
          if (isCategoryAdd !== true && isCategoryCardEdit !== true)
            return (
              <>
                <HeaderComp heardertitle={headTitle}></HeaderComp>
                <div className={styles.speech_box}>
                  { speechBoxList }
                </div>
                
                <div className={styles.control_box}>
                  <button disabled><img src="/images/undo.svg" alt="undo"/></button>
                  <button><img src="/images/play-button.svg" alt="play"/></button>
                  <button onClick={deleteClick}><img src="/images/delete.svg" alt="close"/></button>
                </div>
                
                <div className={styles.category_card_box}>
                  { categoryList }
                </div>
                        
                <div className={styles.button_box}>
                  <button className={styles.add_button} onClick={addStateChange}>추가</button>
                  <button className={styles.update_button} onClick={categoryEditClick}>수정</button>
                </div>
              </>
            );
          if (isCategoryAdd === true)
            return(
              <>
                <HeaderComp heardertitle='상황 추가'></HeaderComp>
                <CategoryAdd addStateChange={addStateChange}></CategoryAdd>
              </>
            );
          if (isCategoryCardEdit === true)
            return(
              <>
                <HeaderComp heardertitle='상황 수정'></HeaderComp>
                <CategoryEdit 
                  addStateChange={addStateChange} 
                  categoryName={categoryName}
                  categoryUrl={categoryUrl}
                  ></CategoryEdit>
              </>
            );
        })()
      }
      </>
      




      : 
      <>
        <HeaderComp heardertitle={headTitle}></HeaderComp>

        <div className={styles.speech_box}>
          { speechBoxList }
        </div>

        <div className={styles.control_box}>
          <button onClick={undo}><img src="/images/undo.svg" alt="undo"/></button>
          <button><img src="/images/play-button.svg" alt="play"/></button>
          <button onClick={deleteClick}><img src="/images/delete.svg" alt="close"/></button>
        </div>

        <div className={styles.card_box}>
          {cardList}
        </div>
        <div className={styles.button_box}>
          <button className={styles.add_button} onClick={addStateChange}>추가</button>
          <button className={styles.update_button} onClick={categoryEditClick}>수정</button>
        </div>        
      </>
    }
    </>
  );
}

export default Category;
