import React from 'react';
import ImgboxTitle from '../../components/Image/ImgboxTitle';
import UserButtonComp from '../../components/ButtonComp/UserButtonComp';

const UserRegisterSuccess = () => {

  
    return (
        <div>
            <ImgboxTitle src = "/images/userRegisterSuccess.PNG" /><br/>
            <UserButtonComp textValue ="로그인하러가기" handleClick ="login"></UserButtonComp>
        </div>
    );
};

export default UserRegisterSuccess;