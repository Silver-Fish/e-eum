import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './HeaderComp.module.css';
import SearchCardComp from './SearchCardComp'

const HeaderComp = (props) => {
  const [isModal, setModal] = useState(false);
  const [searchCardDatas, setSearchCardDatas] = useState([0])
  // const [searchkeyword, setSearchKeyword] = useState([0])
  const [searchFlag, setSearchFlag] = useState(false)
  const history = useHistory();
  const headertitle = props.headertitle;
  const headerColor = props.headerColor
  const homeClick = (e) => {
    history.push('/');
  };
  const mypageClick = (e) => {
    if (sessionStorage.getItem('jwt') !== null){ 
      history.push('/myPage')
    }else 
    {
      alert('로그인을 해주세요')
      setModal(false);
    }
  };
  const ownEeumClick = (e) => {
    history.push('/owncard');
  };
  const situationEeumClick = (e) => {
    history.push('/category');
  };
  const qrEeumClick = (e) => {
    if (sessionStorage.getItem('jwt') !== null) {
      history.push('/qr');
    }else 
    {
      alert('로그인을 해주세요')
      setModal(false);
    }
  };
  const settingClick = (e) => {
    history.push('/setting');
  };

  const onSearch = (e) => {
    const keyword = e.target.value
    if (keyword !== ''){
    const token = sessionStorage.getItem('jwt')
    axios.get(process.env.REACT_APP_API_URL+`/card/search/${keyword}`,{
      headers: {
        'Authorization': token
      }
    })
    .then((res)=> {
      if (res.data) {
        setSearchFlag(true)
        setSearchCardDatas(res.data)
      }
      else if(!res.data) {
        setSearchFlag(false)
      }
    })
    .catch(() => {
      
    })
    } else
    {
      setSearchFlag(false)
      setSearchCardDatas([])
    }
  }
  const searchCardList = searchCardDatas.map(
    (searchcard,i) => (
      // console.log(searchcard)
      <SearchCardComp
        key={i}
        textValue={searchcard.word}
        voiceUrl={searchcard.voiceUrl}
        voiceLength={searchcard.voiceLength}
        imgUrl={searchcard.imageUrl}
      ></SearchCardComp>

    )
  )
  return (
    <>
      {isModal !== true ? (
        <div className={styles.header_box + " " + (headerColor === undefined ? '' : styles.yellow)}>
          <img
            className={styles.header_image}
            src="/favicon.png"
            alt="이미지"
            onClick={homeClick}
          />
          <div className={styles.header_title}>{headertitle}</div>
          <button
            className={styles.header_button}
            onClick={function (e) {
              setModal(!isModal);
            }}
          >
            <img className={styles.header_button_image} src="/images/hamburger.svg" alt="이미지" />
          </button>
        </div>
      ) : (
        <div className={styles.modal_box + " " + (headerColor === undefined ? '' : styles.yellow)}>
          <div className={styles.modal_header_box}>
            <button 
              className={styles.modal_header_button} 
              onClick={function (e) {
              setModal(!isModal);
            }}>
              <img
                className={styles.modal_header_button_image}
                src="/images/hamburger.svg"
                alt="이미지"
              />
            </button>
            <button
              className={styles.modal_header_button}
              onClick={function (e) {
                setModal(!isModal);
              }}
            >
              <img
                className={styles.modal_header_button_image}
                src="/images/close.svg"
                alt="이미지"
              />
            </button>
          </div>

          <>
          {searchFlag===true
          ?(
            <div className={styles.modal_main_box}>
              <input className={styles.modal_search} type="text" onChange={onSearch} placeholder="검색"  />
              <div className={styles.search_card_list_box}>
                {searchCardList}
              </div>
              <ul className={styles.modal_list}>
                <li className={styles.modal_list_line}>
                  <button className={styles.modal_button} onClick={mypageClick}>
                    마이 페이지
                  </button>
                </li>
                <li className={styles.modal_list_line}>
                  <button className={styles.modal_button} onClick={ownEeumClick}>
                    나만의 이음
                  </button>
                </li>
                <li className={styles.modal_list_line}>
                  <button className={styles.modal_button} onClick={situationEeumClick}>
                    상황별 이음
                  </button>
                </li>
                <li className={styles.modal_list_line}>
                  <button className={styles.modal_button} onClick={qrEeumClick}>
                    QR로 이음
                  </button>
                </li>
                <li className={styles.modal_list_line}>
                  <button className={styles.modal_button} onClick={settingClick}>
                    설정
                  </button>
                </li>
              </ul>
            </div>
          ):(
            <div className={styles.modal_main_box}>
            <input className={styles.modal_search} type="text" onChange={onSearch} placeholder="검색" />
            <ul className={styles.modal_list}>
              <li className={styles.modal_list_line}>
                <button className={styles.modal_button} onClick={mypageClick}>
                  마이 페이지
                </button>
              </li>
              <li className={styles.modal_list_line}>
                <button className={styles.modal_button} onClick={ownEeumClick}>
                  나만의 이음
                </button>
              </li>
              <li className={styles.modal_list_line}>
                <button className={styles.modal_button} onClick={situationEeumClick}>
                  상황별 이음
                </button>
              </li>
              <li className={styles.modal_list_line}>
                <button className={styles.modal_button} onClick={qrEeumClick}>
                  QR로 이음
                </button>
              </li>
              <li className={styles.modal_list_line}>
                <button className={styles.modal_button} onClick={settingClick}>
                  설정
                </button>
              </li>
            </ul>
          </div>
          )}
          </>
        </div>
      )}
    </>
  );
};

export default HeaderComp;
// export default connect()(HeaderComp);
