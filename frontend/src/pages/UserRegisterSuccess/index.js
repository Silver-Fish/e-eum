import React from 'react';
import Imgbox from '../../components/Image/Imgbox';
import UserButtonComp from '../../components/ButtonComp/UserButtonComp';

const UserRegisterSuccess = () => {

  
    return (
        <div>
            <Imgbox src = "/images/userRegisterSuccess.PNG" /><br/>
            <UserButtonComp textValue ="로그인하러가기" handleClick ="login"></UserButtonComp>
        </div>
    );
};

export default UserRegisterSuccess;