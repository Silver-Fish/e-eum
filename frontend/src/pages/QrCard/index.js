import React, { useState, useEffect } from 'react';
import HearderComp from '../../components/HeaderComp/HeaderComp';
import styles from './index.module.css';
import Card from '../../components/QrCard/Card';
import CardAdd from '../../components/QrCard/CardAdd';
import CardEdit from '../../components/QrCard/CardEdit';
import SpeechBoxCard from '../../components/QrCard/SpeechBoxCard';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
const QrCard = ({ match }) => {
  let qrId = window.location.href.split('/')
  qrId = qrId[qrId.length-1]
  const history = useHistory();
  const [qrName, setQrName] = useState('');
  const checkLogin = sessionStorage.getItem('jwt');
  const [isAdd, setAdd] = useState(false);
  const [isEdit, setEdit] = useState(false);
  // const [cardUrl, setCardUrl] = useState('')
  // const cardUrl = useState([0])
  const [cardName, setCardName] = useState(false);
  const [cardId, setCardId] = useState(false);
  const [isCardStateEdit, setCardStateEdit] = useState(false);
  const [cardUrl, setCardUrl] = useState('');
  const [qrCardDatas, setQrCard] = useState([]);
  const [cookies] = useCookies(['cookie']);
  const [token, setToken] = useState(sessionStorage.getItem('jwt'));
  const [speechList, setSpeechList] = useState([])  
  let audio = ""


  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + '/qr/title/' + qrId, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data)
        setQrName(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(process.env.REACT_APP_API_URL + '/card/qr?typeId=' + qrId, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setQrCard(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addClick = () => {
    setAdd(!isAdd);
  };

  const editClick = () => {
    setEdit(!isEdit);
  };

  const noLogin = () => {
    alert('로그인 해주세요');
    history.push('/login');
  };

  const [speechBoxDatas, setSpeechBoxDatas] = useState([]);

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
  };

  const deleteClick = () => {
    speechBoxDatas.pop();
    setSpeechBoxDatas([...speechBoxDatas]);
    speechList.pop();
    setSpeechList([...speechList]);
  };

  const CardStateEdit = (data) => {
    setCardStateEdit(data['state']);
    setCardName(data['name']);
    setCardUrl(data['url']);
    setCardId(data['cardId']);
  };

  const cardEditStateChange = (data) => {
    setCardStateEdit(!isCardStateEdit);
  };

  const qrCardList = qrCardDatas.map((card, i) => (
    <Card
      key={i}
      id={card.id}
      textValue={card.word}
      cardUrl={card.imageUrl}
      voiceUrl={card.voiceUrl}
      voiceLength={card.voiceLength}
      isEdit={isEdit}
      cardClick={cardClick}
      CardStateEdit={CardStateEdit}
    ></Card>
  ));

  const speechBoxList = speechBoxDatas.map((speech, i) => (
    <SpeechBoxCard key={i} textValue={speech[0]} cardUrl={speech[1]}></SpeechBoxCard>
  ));

  const speechClick = () => {
    for(let i=0; i<speechList.length; i++) {
      let audioLength = 0
      for(let j=0; j<i; j++) {
        audioLength += (speechList[j][1]*1000)
      }
      setTimeout(()=> {
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

  return (
    <>
      {(function () {
        if (isAdd === false && isCardStateEdit === false)
          return (
            <div className={styles.qrcard_box}>
              <HearderComp headertitle={qrName} headerColor="yello"></HearderComp>
              <div className={styles.speech_box}>
                <div className={styles.speech_item_box} onClick={speechClick}>{speechBoxList}</div>

                <button onClick={deleteClick} className={styles.speech_cancel}>
                  <img src="/images/close.svg" alt="" />
                </button>
              </div>

              <div className={styles.qr_card_box}>{qrCardList}</div>

              <div className={styles.button_box}>
              {checkLogin !== null ? (
                <>
                <button className={styles.add_button} onClick={addClick}>
                  추가
                </button>
                <button className={styles.update_button} onClick={editClick}>
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
          );
        if (isAdd === true)
          return (
            <div className={styles.qrcard_box}>
              <HearderComp headertitle="카드 등록" headerColor="yellow"></HearderComp>
              <CardAdd qrId={qrId} addClick={addClick}></CardAdd>
            </div>
          );
        if (isCardStateEdit === true)
          return (
            <div className={styles.qrcard_box}>
              <HearderComp headertitle="카드 수정" headerColor="yellow"></HearderComp>
              <CardEdit
                cardEditStateChange={cardEditStateChange}
                cardName={cardName}
                cardUrl={cardUrl}
                cardId={cardId}
              ></CardEdit>
            </div>
          );
      })()}
    </>
  );
};

export default QrCard;
