import styled from 'styled-components';
import React from 'react';
import stoneBlack from '../../asset/img/stone_black.png';
import stoneWhite from '../../asset/img/stone_white.png';

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
        box-shadow: 0px 2px #ffffff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .lineY {
        width: 2px;
        height: 100%;
        background: #808080;
        box-shadow: 2px 0px #ffffff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

const ActivedCheckBox = styled.div`
    width: 100%;
    height: 100%;
    z-index: 3;
    position: absolute;
    ${(props) =>
        props.obj === 'B' &&
        `
            background-image: url(${stoneBlack});
            background-size: cover;
        `};
    ${(props) =>
        props.obj === 'W' &&
        `
            background-image: url(${stoneWhite});
            background-size: cover;
        `};

    &:hover {
        border-radius: 50%;
        ${(props) => props.obj === 'R' && props.turn === 'true' && `background: rgba(254, 0, 0, 0.7);`}
        ${(props) => props.obj === 'N' && props.turn === 'true' && `background: rgba(0, 177, 0, 0.7);`}
    }
`;

const CheckBox = ({ placingStone, objData, stone, turn }) => {
    const setObject = () => {
        if (turn === 'true') placingStone(objData);
    };

    return (
        <CheckBoxWrapper>
            <ActivedCheckBox onClick={setObject} obj={stone} turn={turn}></ActivedCheckBox>
            <Cross>
                <div className="state1" />
                <div className="lineX" />
                <div className="lineY" />
            </Cross>
        </CheckBoxWrapper>
    );
};

export default React.memo(CheckBox);
