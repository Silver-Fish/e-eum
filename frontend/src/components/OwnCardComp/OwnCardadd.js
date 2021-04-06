import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './OwnCardadd.module.css';
import axios from 'axios';
import Loader from '../Loader/Loader';
import SpeechLoader from '../Loader/SpeechLoader';
const OwnCardadd = (props) => {
  const history = useHistory();
  const [situationImg, setImg] = useState();
  const [imgFile, setImgFile] = useState();
  const [cardName, setCardName] = useState();
  const [isLoading, setLoading] = useState(false);
  const [speechLoading, setSpeechLoading] = useState(false);
  const [speechWord, setSpeechWord] = useState('');
  let [lenCardName, setlenCardName] = useState(0);
  let audio = '';

  const onImageChange = function (e) {
    setImgFile(e.target.files[0]);
    setImg(URL.createObjectURL(e.target.files[0]));
  };
  const onInputChange = (e) => {
    if (e.target.value.length > 10) {
      alert('카드이름은 10자까지 가능합니다.');
    } else {
      setCardName(e.target.value);
      setlenCardName(e.target.value.length);
    }
  };

  const addCard = () => {
    setLoading(!isLoading);
    const token = sessionStorage.getItem('jwt');
    let data = new FormData();
    data.append('file', imgFile);
    data.append('word', cardName);
    data.append('type', 'own');
    axios
      .post(process.env.REACT_APP_API_URL + '/card', data, {
        headers: {
          'Content-type': 'multipart/form-data',
          Authorization: token,
        },
      })
      .then((res) => {
        setLoading(!isLoading);
        history.go(0);
      })
      .catch((err) => {
        setLoading(!isLoading);
        alert('카드생성 오류입니다.. 다음에 시도해주세요');
        history.go(0);
      });
  };
  const speakClick = () => {
    setSpeechLoading(!speechLoading);
    const token = sessionStorage.getItem('jwt');
    let data = {
      word: cardName,
    };
    axios
      .post(process.env.REACT_APP_API_URL + `/voice`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        axios
          .get(process.env.REACT_APP_API_URL + `/voice/${cardName}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((res) => {
            setSpeechLoading(false);
            audio = new Audio(process.env.REACT_APP_IMG_PATH + res.data);
            audio.load();
            playAudio();
          })
          .catch((err) => {
            alert('미리듣기 오류입니다.. 다음에 시도해주세요');
            setSpeechLoading(false);
          });
      })
      .catch((err) => {
        alert('미리듣기 오류입니다.. 다음에 시도해주세요');
        setSpeechLoading(false);
      });
  };
  const playAudio = () => {
    const audioPromise = audio.play();
    if (audioPromise !== undefined) {
      audioPromise
        .then((_) => {
          setSpeechLoading(false);
        })
        .catch((err) => {
          alert('미리듣기 오류입니다.. 다음에 시도해주세요');
          setSpeechLoading(false);
        });
    }
  };
  return (
    <>
      {(() => {
        if (isLoading === false && speechLoading === false)
          return (
            <>
              <div className={styles.add_box}>
                <div className={styles.image_box}>
                  <img src={situationImg} alt="이미지를 등록해주세요" />
                  <label className={styles.image_button}>
                    <img src="/images/photo-camera.svg" alt="대체이미지" />
                    <input type="file" className={styles.image_input} onChange={onImageChange} />
                  </label>
                </div>

                <div className={styles.card_input_box}>
                  <input
                    type="text"
                    className={styles.situation_input}
                    onChange={onInputChange}
                    value={cardName}
                    placeholder="카드 이름"
                    maxLength="10"
                  />
                  <img
                    onClick={speakClick}
                    src="/images/speaker-filled-audio-tool.svg"
                    alt="대체이미지"
                  />
                </div>
                <div className={styles.count_Name}>{lenCardName}/10</div>
              </div>

              <div className={styles.bottom_button}>
                <div className={styles.button_box}>
                  <button className={styles.close_button} onClick={props.addStateChange}>
                    취소
                  </button>
                  <button className={styles.add_button} onClick={addCard}>
                    등록
                  </button>
                </div>
              </div>
            </>
          );
        else if (isLoading === true)
          return (
            <>
              <Loader></Loader>
            </>
          );
        else if (speechLoading === true)
          return (
            <>
              <SpeechLoader> </SpeechLoader>

              <div className={styles.add_box}>
                <div className={styles.image_box}>
                  <img src={situationImg} alt="이미지를 등록해주세요" />
                  <label className={styles.image_button}>
                    <img src="/images/photo-camera.svg" alt="대체이미지" />
                    <input type="file" className={styles.image_input} onChange={onImageChange} />
                  </label>
                </div>

                <div className={styles.card_input_box}>
                  <input
                    type="text"
                    className={styles.situation_input}
                    onChange={onInputChange}
                    value={cardName}
                    placeholder="카드 이름"
                    maxLength="10"
                  />
                  <img
                    onClick={speakClick}
                    src="/images/speaker-filled-audio-tool.svg"
                    alt="대체이미지"
                  />
                </div>

                <div className={styles.count_Name}>{lenCardName}/10</div>
              </div>

              <div className={styles.bottom_button}>
                <div className={styles.button_box}>
                  <button className={styles.close_button} onClick={props.addStateChange}>
                    취소
                  </button>
                  <button className={styles.add_button} onClick={addCard}>
                    등록
                  </button>
                </div>
              </div>
            </>
          );
      })()}
    </>
  );
};

export default OwnCardadd;
