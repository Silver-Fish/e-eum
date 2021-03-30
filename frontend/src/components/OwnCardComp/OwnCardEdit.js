import React, { useState } from 'react';
import styles from './OwnCardEdit.module.css'
import axios from 'axios'

const OwnCardEdit = (props) => {
  const cardId = props.cardId
  const cardName = props.cardName
  const imgUrl = props.imgUrl
  console.log(props)
  console.log(cardId)
  console.log(cardName)
  console.log(imgUrl)
  return(
    <>
      <div>1</div>
    </>
  )
};

export default OwnCardEdit;