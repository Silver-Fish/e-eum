import React from 'react';
import UserButtonComp from '../../components/ButtonComp/UserButtonComp';

const MyPage = () => {

    const email ="이메일";
    const name ="이름";

    return (
        <div>
            <img src = "/images/myPageImage.PNG"  alt = "사진입니다."/><br/>
            <p>이름</p>
            <input readOnly value={name} placeholder={name}></input><br/>
            <p>이메일</p>
            <input readOnly value={email} placeholder={email}></input><br/>
            <UserButtonComp textValue = "정보 수정" handleClickPath ='./userUpdate'></UserButtonComp><br/>
            <UserButtonComp textValue = "회원 탈퇴" handleClickPath ='./userDelete'></UserButtonComp><br/>
        </div>
    );
};

export default MyPage;