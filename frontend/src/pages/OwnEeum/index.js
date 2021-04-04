import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import OwnCardComp from '../../components/OwnCardComp/OwnCardComp';
import SpeechBoxCard from '../../components/OwnCardComp/SpeechBoxCard';
import OwnCardadd from '../../components/OwnCardComp/OwnCardadd';
import OwnCardEdit from '../../components/OwnCardComp/OwnCardEdit';
// import Card from '../../components/OwnCardComp/Card';
import HeaderComp from '../../components/HeaderComp/HeaderComp';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const OwnEeum = () => {
  const history = useHistory();
  const checkLogin = sessionStorage.getItem('jwt');
  const [isAdd, setAdd] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [goEdit, setgoEdit] = useState(false);
  const [owncardDatas, setOwncardDatas] = useState([]);
  const [speechBoxDatas, setSpeechBoxDatas] = useState([]);
  const [imgUrl, setimgUrl] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardId, setCardId] = useState('');
  const [token, setToken] = useState(sessionStorage.getItem('jwt'));
  const [cookies] = useCookies(['cookie']);
  const [speechList, setSpeechList] = useState([])  
  let audio = ""

  const cardClick = (data) => {
    console.log(data)
    setSpeechBoxDatas([...speechBoxDatas, 
      [
        data.cardName.cardName, 
        data.imgUrl['imgUrl'],
        data.voiceUrl.voiceUrl,
        data.voiceLength.voiceLength]
      ]);
    setSpeechList(speechList => [...speechList,
      [
        data.voiceUrl.voiceUrl,
        data.voiceLength.voiceLength]
      ])
  };
  const deleteClick = () => {
    speechBoxDatas.pop();
    setSpeechBoxDatas([...speechBoxDatas]);
    speechList.pop();
    setSpeechList([...speechList]);
    console.log(speechBoxDatas)
    console.log(speechBoxList)
  };
  useEffect(() => {
    const type = 'own';
    if (
      sessionStorage.getItem('jwt') === null &&
      cookies.cookie !== undefined &&
      cookies.cookie !== 'undefined'
    ) {
      sessionStorage.setItem('jwt', cookies.cookie);
      setToken(sessionStorage.getItem('jwt'));
    }

    axios
      .get(process.env.REACT_APP_API_URL + `/card/${type}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setOwncardDatas(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cookies.cookie, token]);
  const editCard = () => {
    setEdit(!isEdit);
  };
  const OwnGoEdit = (data) => {
    setgoEdit(data.state);
    setimgUrl(data.url);
    setCardName(data.name);
    setCardId(data.id);
  };
  const goEditStateChange = () => {
    setgoEdit(!goEdit);
  };
  const owncardList = owncardDatas.map((owncard, i) => (
    <OwnCardComp
      key={i}
      cardId={owncard.id}
      textValue={owncard.word}
      imgUrl={owncard.imageUrl}
      voiceUrl={owncard.voiceUrl}
      voiceLength={owncard.voiceLength}
      cardClick={cardClick}
      isEdit={isEdit}
      goEdit={goEdit}
      OwnGoEdit={OwnGoEdit}
    ></OwnCardComp>
  ));
  const speechBoxList = speechBoxDatas.map((speech, i) => (
    <SpeechBoxCard 
      key={i} 
      textValue={speech[0]} 
      imgUrl={speech[1]}
      voiceUrl={speech[2]}
      voiceLength={speech[3]}
    ></SpeechBoxCard>
  ));

  const addCard = () => {
    setAdd(!isAdd);
  };
  const speechClick = () => {
    for(let i=0; i<speechList.length; i++) {
      let audioLength = 0
      for(let j=0; j<i; j++) {
        audioLength += (speechList[j][1]*1000)
      }
      setTimeout(()=> {
      console.log(audioLength)
      audio = new Audio(speechList[i][0])
      audio.load()
      playAudio()
    },audioLength)
    }
  };
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

  const noLogin = () => {
    alert('로그인 해주세요');
    history.push('./login');
  };

  return (
    <>
      {(() => {
        if (isAdd !== true && goEdit !== true)
          return (
            <div className={styles.owncard_box}>
              <HeaderComp headertitle="나만의 이음"></HeaderComp>
              <div className={styles.speech_box}>
                <>
                <div className={styles.speech_item_box} onClick={speechClick}>{speechBoxList}</div>
                {/* <div className={styles.speech_item_box} >{speechBoxList}</div> */}

                <button onClick={deleteClick} className={styles.speech_cancel}>
                  <img src="/images/close.svg" alt="" />
                </button>
                </>
              </div>

              <div className={styles.owneeum_card_box}>{owncardList}</div>
              <div className={styles.bottom_button}>
                <div className={styles.button_box}>
                  {checkLogin !== null ? (
                    <>
                      <button className={styles.add_button} onClick={addCard}>
                        추가
                      </button>
                      <button className={styles.update_button} onClick={editCard}>
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
            </div>
          );
        else if (isAdd === true)
          return (
            <div className={styles.owncard_box}>
              <HeaderComp headertitle="카드 추가"></HeaderComp>
              <OwnCardadd addStateChange={addCard}></OwnCardadd>
            </div>
          );
        else if (goEdit === true)
          return (
            <div className={styles.owncard_box}>
              <HeaderComp headertitle="카드 수정"></HeaderComp>
              <OwnCardEdit
                goEditStateChange={goEditStateChange}
                cardName={cardName}
                imgUrl={imgUrl}
                cardId={cardId}
              ></OwnCardEdit>
            </div>
          );
      })()}
    </>
  );
};

export default OwnEeum;
