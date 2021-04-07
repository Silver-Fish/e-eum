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
import QrEeumLoader from '../../components/Loader/QrEeumLoader';

const QrCard = ({ match }) => {
  let qrId = window.location.href.split('/')
  qrId = qrId[qrId.length-1]
  const history = useHistory();
  const [qrName, setQrName] = useState('');
  const checkLogin = sessionStorage.getItem('jwt');
  const [isAdd, setAdd] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [cardName, setCardName] = useState(false);
  const [cardId, setCardId] = useState(false);
  const [isCardStateEdit, setCardStateEdit] = useState(false);
  const [cardUrl, setCardUrl] = useState('');
  const [qrCardDatas, setQrCard] = useState([]);
  const [cookies] = useCookies(['cookie']);
  const [token, setToken] = useState(sessionStorage.getItem('jwt'));
  const [speechList, setSpeechList] = useState([])  
  const [isEeumLoading, setEeumLoading] = useState(false);
  const [sameUser, setSameUser] = useState(false);
  const [pageColor, setPageColor] = useState();
  let audio = ""
  


  

  useEffect(() => {
    if (
      sessionStorage.getItem('jwt') === null &&
      cookies.cookie !== undefined &&
      cookies.cookie !== 'undefined'
    ) {
      sessionStorage.setItem('jwt', cookies.cookie);
      setToken(sessionStorage.getItem('jwt'));
    } else if (
      sessionStorage.getItem('jwt') === null &&
      (cookies.cookie === undefined || cookies.cookie === 'undefined')
    ) {
    }

    axios
      .get(process.env.REACT_APP_API_URL + '/qr/info/' + qrId, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setQrName(res.data.title);
        setSameUser(res.data.owner);
        if (res.data.owner === true){
          setPageColor('yellow')
        } else {
          setPageColor('')
        }
      })
      .catch((err) => {
        alert('QR 카드를 불러오기를 실패했습니다. 다시 시도해 주세요.');
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
        alert('QR 카드를 불러오기를 실패했습니다. 다시 시도해 주세요.');
        history.go(0)
      });
      
  }, [qrId, token, cookies]);

  const addClick = () => {
    setAdd(!isAdd);
  };

  const editClick = () => {
    setEdit(!isEdit);
  };

  const eeumClick = () => {
    setEeumLoading(!isEeumLoading)
    const data = 0
    axios
    .post(process.env.REACT_APP_API_URL + '/qr/copy/'+ qrId, data,{
      headers: {
        // contentType: "application/json",
        Authorization: token
      }
    })
    .then((res) => {
      console.log(res.data)
      setEeumLoading(!isEeumLoading)
      history.go(0)
    })
    .catch((err) => {
      console.log(err);
      setEeumLoading(!isEeumLoading)
      alert('Qr이음에 실패하셨습니다. 다시 시도해 주세요')
      history.go(0)
     
    });
  }
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
      {(function () {
        if (isAdd === false && isCardStateEdit === false)
          return (
            <>
            { isEeumLoading === true 
            ? (<QrEeumLoader></QrEeumLoader>)
            : ''}
            <div className={styles.qrcard_box}>
              <HearderComp headertitle={qrName} headerColor={pageColor}></HearderComp>
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
                {sameUser === true
                ?
                  (
                    <>
                      <button className={styles.add_button} onClick={addClick}>
                        추가
                      </button>
                      <button className={styles.update_button} onClick={editClick}>
                        수정
                      </button>
                    </>
                  )
                  :
                  (
                    <button className={styles.eeum_button} onClick={eeumClick}>
                      QR 이음하기
                    </button>
                  )
                }
                </>
                  ) : (
                <>
                <button className={styles.eeum_button} onClick={noLogin}>
                  QR 이음하기
                </button>
                </>
                )}
              </div>
            </div>
            </>
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
