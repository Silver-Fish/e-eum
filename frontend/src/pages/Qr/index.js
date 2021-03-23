import React, { useState } from 'react';
import styles from './index.module.css'
import HearderComp from '../../components/HeaderComp/HeaderComp'
import QrList from '../../components/Qr/QrList'
import QrRegister from '../../components/Qr/QrRegister'
import QrEdit from '../../components/Qr/QrEdit'



const Qr = () => {
  // const [qrs, setQrs] = useState([
  //   ['스타벅스'], ['롯데리아'],['다이소'], ['편의점'], ['K치과']
  // ])
  const qrs = useState([
    ['스타벅스'], ['롯데리아'],['다이소'], ['편의점'], ['K치과']
  ])[0]
  const [isQrResister, setQrResister] = useState(false)
  const [isQrEdit, setQrEdit] = useState(false)
  const [slectedQrName, setSlectedQrName] = useState('')


  const changeQrResisterState = () => {
    setQrResister(!isQrResister)
  }

  const changeQrEditState = (data) => {
    setSlectedQrName(data[0])
    setQrEdit(!isQrEdit)
  }

  // const selectedEditQrName = (data) => {
  //   setSlectedQrName(data)
  // }

  const qrLists = qrs.map(
    (qr, i) => (
      <QrList 
        key={i} 
        qrName={qr}
        changeQrEditState={changeQrEditState}
      ></QrList>
    )
  )


  return(
    <>
    { function() {
      if (isQrResister!==true && isQrEdit!==true) 
      return(
        <>
          <HearderComp headertitle='QR로 이음' headerColor='yello'></HearderComp>
          <div className={styles.qr_list_box}>
            {qrLists}
          </div>
        
          <button 
            className={styles.qr_register_box}
            onClick={changeQrResisterState}>
            등록
          </button>
        </>
      
      );
      if (isQrResister===true) 
      return(
        <QrRegister changeQrResisterState={changeQrResisterState}></QrRegister>
      )
      if (isQrEdit===true) 
      return(
        <QrEdit changeQrEditState={changeQrEditState} slectedQrName={slectedQrName}></QrEdit>
      )
    }()
  }
  </>
  )
}




export default Qr;



