import React from 'react';
import { useHistory } from "react-router-dom";

const UserRegisterSuccess = () => {

    const history = useHistory();
    const goLogin = () =>{
        history.push('./login')
    }

    return (
        <div>
            <img src = "/images/userRegisterSuccess.PNG"  alt = "사진입니다."/><br/>
            <button onClick={goLogin}>로그인하러가기</button>
        </div>
    );
};

export default UserRegisterSuccess;