import React, { useState } from 'react';
import styles from './inputComp.module.css'

const InputComp = (props) => {
  const [value, setValue] = useState('');
  const type = props.type;
  const placeholder = props.placeholder;

  const valueHandler = (e) => {
    setValue(e.currentTarget.value);
    props.InputChange(e.currentTarget.value);
  };

  return (
    <div className={styles.input_box}>
      <input className={styles.input_comp} value={value} placeholder={placeholder} type={type} onChange={valueHandler}></input>
    </div>
  );
};

export default InputComp;
