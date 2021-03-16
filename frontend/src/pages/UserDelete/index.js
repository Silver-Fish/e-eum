import React from 'react';
import ImgboxTitle from '../../components/Image/ImgboxTitle';
import UserButtonComp from '../../components/ButtonComp/UserButtonComp';

const UserDelete = () => {


    return (
        <div>
             <ImgboxTitle src = "/images/deleteImage.PNG"/><br/>
             <p>진짜 삭제??</p>
             <UserButtonComp textValue ="탈퇴" handleClick ="delete"></UserButtonComp>
             <UserButtonComp textValue = "취소" handleClick ="cancel" ></UserButtonComp><br/>
             
        </div>
    );
};

export default UserDelete;