import React from 'react';
import styles from './OwnCardComp.module.css'


const OwnCardComp = (props) => {
  const textValue = props.textValue
  return (
    <button className={styles.card}>
      <img className={styles.card_image} src='/images/user.png' alt="card_image"/>
        {textValue}
    </button>
  );
};

export default OwnCardComp;