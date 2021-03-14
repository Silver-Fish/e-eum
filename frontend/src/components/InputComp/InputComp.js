import React ,{useState} from 'react';

const InputComp = () => {

    const [value,setValue] = useState("");
    const {type,placeholder} = this.props

    const valueHandler = (e) =>{
        setValue(e.currentTarget.value);
    }
    return (
        <div>
            <input value ={value} placeholder={placeholder} type={type} onChange={valueHandler}></input>
        </div>
    );
};

export default InputComp;

