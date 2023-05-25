import { useState } from "react";
import styled from "styled-components"

const CheckBoxWrapper = styled.div`
    width: 100%;
    height: 100%;
    box-shadow: 20px, 10px black;
    position: relative;
`;

const Cross = styled.div`
    .lineX {
        width: 100%;
        height: 2px;
        background: #808080;
        box-shadow: 0px 2px #FFFFFF;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .lineY {
        width: 2px;
        height: 100%;
        background: #808080;
        box-shadow: 2px 0px #FFFFFF;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

const ActivedCheckBox = styled.div`
        width: 100%;
        height: 100%;
        border-radius: 50%;
        z-index: 3;
        position: absolute;
        ${props => props.obj === "b" && `background: rgba(0, 0, 0);`}

        
    &:hover {
        ${props => props.obj === "n" && `background: rgba(0, 177, 0, 0.7);`}
    }
`;

const CheckBox = () => {
    const [temp, setTemp] = useState("n");

    const setObject = () => {
        setTemp("b")
    };

    return (
        <CheckBoxWrapper>
            <ActivedCheckBox onClick={setObject} obj={temp}>

            </ActivedCheckBox>
            <Cross>
                <div className='state1'/>
                <div className='lineX' />
                <div className='lineY' />
            </Cross>
        </CheckBoxWrapper>
    )
}

export default CheckBox;