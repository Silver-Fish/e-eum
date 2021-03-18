import React from 'react';
import UserButtonComp from '../../components/ButtonComp/UserButtonComp';
import ImgboxTitle from '../../components/Image/ImgboxTitle';

const MyPage = () => {

    const email ="이메일";
    const name ="이름";

    return (
        <div>
            <ImgboxTitle src='/images/myPageImage.PNG'/>
            <p>이름</p>
            <input readOnly value={name} placeholder={name}></input><br/>
            <p>이메일</p>
            <input readOnly value={email} placeholder={email}></input><br/>
            <UserButtonComp textValue = "정보 수정" handleClick ='update'></UserButtonComp><br/>
            <UserButtonComp textValue = "회원 탈퇴" handleClick ='confirm'></UserButtonComp><br/>
        </div>
    );
};

export default MyPage;