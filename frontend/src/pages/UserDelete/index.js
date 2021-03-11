import React from 'react';
import { useHistory } from "react-router-dom";
import UserButtonComp from '../../components/ButtonComp/UserButtonComp';

const UserDelete = () => {

    const history = useHistory();
    
    const onDeleteButtonClick = (e) =>{
        //탈퇴시키고 메인으로
        history.push('./') 
    }

    return (
        <div>
             <img src = "/images/deleteImage.PNG"  alt = "사진입니다."/><br/>
             <p>진짜 삭제??</p>
             <button onClick={onDeleteButtonClick}>탈퇴</button>
             <UserButtonComp textValue = "취소" handleClickPath ='./'></UserButtonComp><br/>
             
        </div>
    );
};

export default UserDelete;