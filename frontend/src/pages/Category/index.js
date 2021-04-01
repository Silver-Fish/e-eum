import React, {useState, useEffect} from 'react'
// import React, {useState} from 'react'
import styles from './index.module.css'
import HeaderComp from '../../components/HeaderComp/HeaderComp'
import CategoryCard from '../../components/CategoryCard/CategoryCard'
import Card from '../../components/CategoryCard/Card'
import SpeechBoxCard from '../../components/CategoryCard/SpeechBoxCard'
import CategoryAdd from '../../components/CategoryCard/CategoryAdd'
import CategoryEdit from '../../components/CategoryCard/CategoryEdit'
import CardAdd from '../../components/CategoryCard/CardAdd'
import CardEdit from '../../components/CategoryCard/CardEdit'
import axios from 'axios'
import { useHistory } from 'react-router-dom';


const Category = () => {
  const history = useHistory();
  const checkLogin = sessionStorage.getItem('jwt')
  const token = sessionStorage.getItem('jwt')
  const config = {
    headers: {
      'Authorization': token
    }
  }
  useEffect(()=> {
    axios.get(process.env.REACT_APP_API_URL + '/category', config)
    .then((res) =>{
      setCategoryDatas(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  },[]);
  
  const [headTitle, setheadTitle] = useState('상황별 이음')
  const [isCategory, setCategory] = useState(true);

  const [isCategoryAdd, setCategoryAdd] = useState(false);
  const [isCategoryEdit, setCategoryEdit] = useState(false);
  const [isCategoryCardEdit, setCategoryCardEdit] = useState(false);
  const [categoryUrl, setCategoryUrl] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [categoryId, setCategoryId] = useState('') 

  const [isCardAdd, setCardAdd] = useState(false);
  const [isCardEdit, setCardEdit] = useState(false);
  const [isCardStateEdit, setCardStateEdit] = useState(false);
  const [cardUrl, setCardUrl] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardId, setCardId] = useState('') 

  const [categoryDatas, setCategoryDatas] = useState([]);

  const [cardDatas, setCard] = useState([]);
  const [speechBoxDatas, setSpeechBoxDatas] = useState([]);



  

  const categoryClick = (e) => {
    setCategory(!isCategory);
    setCard(e.cardDatas );
    setCategoryId(e.categoryId);
    setCategoryName(e.categoryName);
  }
  
  const cardClick = (data) => {
    
    setSpeechBoxDatas([...speechBoxDatas,
      [data.cardName['textValue'], data.cardUrl['cardUrl']]
    ]);

  }
  
  const deleteClick = () => {
    speechBoxDatas.pop()
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
    setCategoryId(data.id)
  }

  const CardStateEdit = (data) => {
    setCardStateEdit(data['state'])
    setCardName(data['name'])
    setCardUrl(data['url'])
    setCardId(data['cardId'])
    
  }




  const addStateChange = () => {
    setCategoryAdd(!isCategoryAdd)
  }  

  const categoryEditStateChange = () => {
    setCategoryCardEdit(!isCategoryCardEdit)
  }


  const categoryEditClick = () => {
    setCategoryEdit(!isCategoryEdit)
  }

  const cardAddClick = (data) => {
    setCardAdd(!isCardAdd)
  }

  const cardEditClick = () => {
    setCardEdit(!isCardEdit)
  }

  const cardEditStateChange = (data) => {
    setCardStateEdit(!isCardStateEdit)
  }

  const categoryList = categoryDatas.map(
    (category, i) => (
      <CategoryCard       
        key={i} 
        id={category.id}
        textValue={category.word}
        categoryUrl={category.categoryImageUrl}
        categoryClick={categoryClick}
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
        id={card.id}
        textValue={card.word}
        cardUrl={card.imageUrl}
        cardClick={cardClick}
        isCardEdit={isCardEdit}
        CardStateEdit = {CardStateEdit}
        categoryId = {categoryId}
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

  const noLogin = () => {
    alert('로그인 해주세요')
    history.push('./login');
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
                <HeaderComp headertitle={headTitle}></HeaderComp>
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
                <div className={styles.bottom_button}>
                  <div className={styles.button_box}>
                    { checkLogin !== null
                    ?
                      <>
                        <button className={styles.add_button} onClick={addStateChange}>추가</button>
                        <button className={styles.update_button} onClick={categoryEditClick}>수정</button>
                      </>
                      :
                      <>
                        <button className={styles.add_button} onClick={noLogin}>추가</button>
                        <button className={styles.update_button} onClick={noLogin}>수정</button>
                      </>
                    }
                  </div>       
                </div>
              </>
            );
          if (isCategoryAdd === true)
            return(
              <>
                <HeaderComp headertitle='상황 추가'></HeaderComp>
                <CategoryAdd addStateChange={addStateChange}></CategoryAdd>
              </>
            );
          if (isCategoryCardEdit === true)
            return(
              <>
                <HeaderComp headertitle='상황 수정'></HeaderComp>
                

                <CategoryEdit 
                  categoryEditStateChange={categoryEditStateChange}
                  categoryName={categoryName}
                  categoryUrl={categoryUrl}
                  categoryId={categoryId}
                  ></CategoryEdit>
              </>
            );
        })()
      }
      </>
      
      : 
      <>
      { (function() {
        if (isCardAdd !== true && isCardStateEdit !== true)
          return(
            <>
              <HeaderComp headertitle={headTitle}></HeaderComp>

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
              <div className={styles.bottom_button}>
                <div className={styles.button_box}>
                  <button className={styles.add_button} onClick={cardAddClick}>추가</button>
                  <button className={styles.update_button} onClick={cardEditClick}>수정</button>
                </div> 
              </div>
            </>
          );
          if (isCardAdd === true)
              return(
                <>
                  <HeaderComp headertitle='카드 추가'></HeaderComp>
                  <CardAdd cardAddClick={cardAddClick} categoryId={categoryId} categoryName={categoryName}></CardAdd>
                </>
              )
          if (isCardStateEdit === true)
            return(
            <>
              <HeaderComp headertitle='상황 수정'></HeaderComp>
              <CardEdit 
                  cardEditStateChange={cardEditStateChange} 
                  cardName={cardName}
                  cardUrl={cardUrl}
                  cardId={cardId}   
                ></CardEdit>
            </>
            );
          })()
        }
      </>



    }
    </>
  );
}

export default Category;
