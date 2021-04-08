import React, { useState, useEffect } from 'react';

import styles from './index.module.css';
import HeaderComp from '../../components/HeaderComp/HeaderComp';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import Card from '../../components/CategoryCard/Card';
import SpeechBoxCard from '../../components/CategoryCard/SpeechBoxCard';
import CategoryAdd from '../../components/CategoryCard/CategoryAdd';
import CategoryEdit from '../../components/CategoryCard/CategoryEdit';
import CardAdd from '../../components/CategoryCard/CardAdd';
import CardEdit from '../../components/CategoryCard/CardEdit';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import DelModal from '../../components/CategoryCard/DelModal';

const Category = () => {
  const history = useHistory();

  const [token, setToken] = useState(sessionStorage.getItem('jwt'));
  const [cookies] = useCookies(['cookie']);
  const [headTitle, setheadTitle] = useState('상황별 이음');
  const [isCategory, setCategory] = useState(true);

  const [isCategoryAdd, setCategoryAdd] = useState(false);
  const [isCategoryEdit, setCategoryEdit] = useState(false);
  const [isCategoryCardEdit, setCategoryCardEdit] = useState(false);
  const [categoryUrl, setCategoryUrl] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const [isCardAdd, setCardAdd] = useState(false);
  const [isCardEdit, setCardEdit] = useState(false);
  const [isCardStateEdit, setCardStateEdit] = useState(false);
  const [cardVoiceUrl, setCardVoiceUrl] = useState('');
  const [cardUrl, setCardUrl] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardId, setCardId] = useState('');

  const [categoryDatas, setCategoryDatas] = useState([]);

  const [cardDatas, setCard] = useState([]);
  const [speechBoxDatas, setSpeechBoxDatas] = useState([]);
  const [speechList, setSpeechList] = useState([])  

  const [isDelModal, setDelModal] = useState(false)  
  let audio = ""

  useEffect(() => {
    if (
      sessionStorage.getItem('jwt') === null &&
      cookies.cookie !== undefined &&
      cookies.cookie !== 'undefined'
    ) {
      console.log('힝');
      sessionStorage.setItem('jwt', cookies.cookie);
      setToken(sessionStorage.getItem('jwt'));
    }

    axios
      .get(process.env.REACT_APP_API_URL + '/category', {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setCategoryDatas(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cookies.cookie, token]);

  const categoryClick = (e) => {
    setCategory(!isCategory);
    setCard(e.cardDatas);
    setCategoryId(e.categoryId);
    setCategoryName(e.categoryName);
  };

  const cardClick = (data) => {
    setSpeechBoxDatas([...speechBoxDatas, 
      [
        data.cardName['textValue'], 
        data.cardUrl['cardUrl'],
        data.voiceUrl.voiceUrl,
        data.voiceLength.voiceLength]      
      ]);
    setSpeechList(speechList => [...speechList,
      [
        data.voiceUrl.voiceUrl,
        data.voiceLength.voiceLength]
      ])
    setTimeout(()=>{
      const targetSpeechItemBox = document.querySelector('#speechItemBox')
      targetSpeechItemBox.scrollLeft += 9999999999999999
    }, 50)
  };

  const deleteClick = () => {
    speechBoxDatas.pop();
    setSpeechBoxDatas([...speechBoxDatas]);
    speechList.pop();
    setSpeechList([...speechList]);
  };

  const undo = () => {
    setCategory(!isCategory);
    setheadTitle('상황별 이음');
  };

  const categoryTitle = (data) => {
    setheadTitle(data);
  };

  const categoryCardEdit = (data) => {
    setCategoryCardEdit(data.state);
    setCategoryUrl(data.url);
    setCategoryName(data.name);
    setCategoryId(data.id);
  };

  const CardStateEdit = (data) => {
    console.log(data)
    setCardStateEdit(data['state']);
    setCardName(data['name']);
    setCardUrl(data['url']);
    setCardId(data['cardId']);
    setCardVoiceUrl(data['voiceUrl'])
  };

  const cardDelete = (e) => {
    setCardEdit(e)
  }

  const cardAdd = (e) => {
    setCardAdd(e)
  }
  const cardEdit = (e) => {
    setCardEdit(e)
  }

  const cardDataReset = (e) => {
    setCard(e)
  }


  const addStateChange = () => {
    setCategoryAdd(!isCategoryAdd);
  };

  const categoryEditStateChange = () => {
    setCategoryCardEdit(!isCategoryCardEdit);
  };

  const categoryEditClick = () => {
    setCategoryEdit(!isCategoryEdit);
  };

  const cardAddClick = (data) => {
    
    setCardAdd(!isCardAdd);
  };

  const cardEditClick = () => {
    setCardEdit(!isCardEdit);
  };

  const cardEditStateChange = (data) => {
    setCardStateEdit(!isCardStateEdit);
  };

  const categoryDel = (data) => {
    setCategoryId(data.categoryId)
    setDelModal(!isDelModal)
  }

  const categoryForModalCancel = () => {
    setDelModal(!isDelModal)
  }

  const categoryList = categoryDatas.map((category, i) => (
    <CategoryCard
      key={i}
      id={category.id}
      textValue={category.word}
      categoryUrl={category.categoryImageUrl}
      categoryClick={categoryClick}
      isCategoryEdit={isCategoryEdit}
      categoryTitle={categoryTitle}
      categoryCardEdit={categoryCardEdit}
      categoryDel={categoryDel}
    ></CategoryCard>
  ));

  const cardList = cardDatas.map((card, i) => (
    <Card
      key={i}
      id={card.id}
      textValue={card.word}
      cardUrl={card.imageUrl}
      voiceUrl={card.voiceUrl}
      voiceLength={card.voiceLength}
      cardClick={cardClick}
      isCardEdit={isCardEdit}
      CardStateEdit={CardStateEdit}
      categoryId={categoryId}
      cardDelete={cardDelete}
      cardDataReset={cardDataReset}
    ></Card>
  ));

  const speechBoxList = speechBoxDatas.map((speech, i) => (
    <SpeechBoxCard key={i} textValue={speech[0]} cardUrl={speech[1]}></SpeechBoxCard>
  ));

  const noLogin = () => {
    alert('로그인 해주세요');
    history.push('./login');
  };
  // const speechClick = () => {
  //   for(let i=0; i<speechList.length; i++) {
  //     let audioLength = 0
  //     for(let j=0; j<i; j++) {
  //       audioLength += (speechList[j][1]*1000)
  //     }
  //     setTimeout(()=> {
  //     audio = new Audio(speechList[i][0])
  //     audio.load()
  //     playAudio()
  //   },audioLength)
  //   }
  // };
  const speechClick = () => {
    let audioLength = [0]
    const target = document.querySelectorAll("#speechCard")
    for(let i=0; i<speechList.length; i++) {
      
      let tempLength = 0
      for(let j=0; j<=i; j++) {        
        tempLength += (speechList[j][1]*1000) 
      }
      audioLength.push(tempLength)
    }
    for(let i=0; i<speechList.length; i++) {
      setTimeout(()=> {
        if (0 < i  && i<speechList.length){
          target[i-1].style.borderColor="black"
          target[i-1].style.borderWidth="1px"
        }     
        if (i === speechList.length-1){
          console.log(i)
          setTimeout(()=> {
            target[i].style.borderColor="black"
            target[i].style.borderWidth="1px"
          }, audioLength[speechList.length]-audioLength[speechList.length-1])
        }
        target[i].style.borderColor="#8A9C3A"
        target[i].style.borderWidth="3px"
        audio = new Audio(speechList[i][0])
        audio.load()
        playAudio()
      }, audioLength[i])
    }
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
          console.info(err)
        })
    }
  }

  return (
    <>
      
      {isCategory === true ? (
        <>
          {(function () {
            if (isCategoryAdd !== true && isCategoryCardEdit !== true)
              return (
                <>
                  {isDelModal === true
                  ? 
                  (
                  <DelModal 
                    categoryForModalCancel={categoryForModalCancel}
                    categoryId={categoryId}
                  ></DelModal>
                  )
                  : ('')
                  }
                  <HeaderComp headertitle={headTitle}></HeaderComp>
                  <div id='speechItemBox' className={styles.speech_box}>{speechBoxList}</div>

                  <div className={styles.control_box}>
                    <button disabled>
                      <img src="/images/undo.svg" alt="undo" />
                    </button>
                    <button onClick={speechClick}>
                      <img src="/images/play-button.svg" alt="play" />
                    </button>
                    <button onClick={deleteClick}>
                      <img src="/images/delete.svg" alt="close" />
                    </button>
                  </div>

                  <div className={styles.category_card_box}>{categoryList}</div>
                  <div className={styles.bottom_button}>
                    <div className={styles.button_box}>
                      {token !== null ? (
                        <>
                          <button className={styles.add_button} onClick={addStateChange}>
                            추가
                          </button>
                          <button className={styles.update_button} onClick={categoryEditClick}>
                            수정
                          </button>
                        </>
                      ) : (
                        <>
                          <button className={styles.add_button} onClick={noLogin}>
                            추가
                          </button>
                          <button className={styles.update_button} onClick={noLogin}>
                            수정
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </>
              );
            if (isCategoryAdd === true)
              return (
                <>
                  <HeaderComp headertitle="상황 추가"></HeaderComp>
                  <CategoryAdd addStateChange={addStateChange}></CategoryAdd>
                </>
              );
            if (isCategoryCardEdit === true)
              return (
                <>
                  <HeaderComp headertitle="상황 수정"></HeaderComp>

                  <CategoryEdit
                    categoryEditStateChange={categoryEditStateChange}
                    categoryName={categoryName}
                    categoryUrl={categoryUrl}
                    categoryId={categoryId}
                  ></CategoryEdit>
                </>
              );
          })()}
        </>
      ) : (
        <>
          {(function () {
            if (isCardAdd !== true && isCardStateEdit !== true)
              return (
                <>
                  <HeaderComp headertitle={headTitle}></HeaderComp>

                  <div id='speechItemBox' className={styles.speech_box}>{speechBoxList}</div>

                  <div className={styles.control_box}>
                    <button onClick={undo}>
                      <img src="/images/undo.svg" alt="undo" />
                    </button>
                    <button onClick={speechClick}>
                      <img src="/images/play-button.svg" alt="play" />
                    </button>
                    <button onClick={deleteClick}>
                      <img src="/images/delete.svg" alt="close" />
                    </button>
                  </div>

                  <div className={styles.card_box}>{cardList}</div>
                  <div className={styles.bottom_button}>
                    <div className={styles.button_box}>
                      {token !== null ? (
                        <>
                          <button className={styles.add_button} onClick={cardAddClick}>
                            추가
                          </button>
                          <button className={styles.update_button} onClick={cardEditClick}>
                            수정
                          </button>
                        </>
                      ) : (
                        <>
                          <button className={styles.add_button} onClick={noLogin}>
                            추가
                          </button>
                          <button className={styles.update_button} onClick={noLogin}>
                            수정
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </>
              );
            if (isCardAdd === true)
              return (
                <>
                  <HeaderComp headertitle="카드 추가"></HeaderComp>
                  <CardAdd
                    cardAddClick={cardAddClick}
                    categoryId={categoryId}
                    categoryName={categoryName}
                    cardAdd={cardAdd}
                    cardDataReset={cardDataReset}
                  ></CardAdd>
                </>
              );
            if (isCardStateEdit === true)
              return (
                <>
                  <HeaderComp headertitle="카드 수정"></HeaderComp>
                  <CardEdit
                    cardEditStateChange={cardEditStateChange}
                    cardName={cardName}
                    cardUrl={cardUrl}
                    cardId={cardId}
                    voiceUrl={cardVoiceUrl}
                    isCardEdit={isCardEdit}
                    categoryId={categoryId}
                    cardEdit={cardEdit}
                    cardDataReset={cardDataReset}
                  ></CardEdit>
                </>
              );
          })()}
        </>
      )}
    </>
  );
};

export default Category;
