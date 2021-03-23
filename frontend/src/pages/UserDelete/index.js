import React from 'react';
import ImgboxTitle from '../../components/Image/ImgboxTitle';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from './index.module.css';
const UserDelete = () => {

    const history = useHistory();

    const onDeleteHandler = (e) =>{
        e.preventDefault();
        axios
        .delete('http://localhost:8080/api/accouts/delete',{
            headers:{
                Authorization: sessionStorage.getItem('jwt'),
            },
        })
        .then((res) => {
          if (res.data) {
            sessionStorage.removeItem('jwt');
            history.push('/login');
          } else {
            alert('탈퇴 실패!');
          }
        })
        .catch((err) => {
          alert('오류발생');
        });
    }; 

    return (
        <div>
             <ImgboxTitle src = "/images/deleteImage.PNG"/><br/>
             <p>진짜 삭제??</p>
             <button
             className={styles.Button_Ok}
              onClick={onDeleteHandler}>탈퇴</button>
             <button
            className={styles.Button_Cancel}
            onClick={(e) => {
              history.push('/');
            }}
          >
            취소
          </button>
             
        </div>
    );
};

export default UserDelete;