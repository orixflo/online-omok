import styled from 'styled-components';
import CheckBox from './CheckBox';
import React, { useEffect, useState } from 'react';

const CheckerBoardWrapper = styled.div`
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    display: grid;
    grid-template-columns: repeat(19, 1fr);
    grid-template-rows: repeat(19, 1fr);
`;

const CheckerBoard = ({ placingStone, tile, position, turn }) => {
    const [myStone, setMyStone] = useState('');

    useEffect(() => {
        if (position === 0 || position === 2) {
            setMyStone('B');
        } else {
            setMyStone('W');
        }
    }, []);

    // split tile string received from server into character
    // and rendering each character as checkbox
    // ( blackStone: 'B', whiteStone: 'W', empty: 'N' )
    // ( tile string: 'NNNBWBBWNNBW...' )
    const cbArr = [];
    let index = 0;
    for (let i = 0; i < 19; i++) {
        for (let j = 0; j < 19; j++) {
            cbArr.push(
                <CheckBox key={`${i}_${j}`} objData={`${j},${i},${myStone}`} placingStone={placingStone} stone={tile.charAt(index)} turn={turn}></CheckBox>,
            );
            index += 1;
        }
    }

    return <CheckerBoardWrapper>{cbArr}</CheckerBoardWrapper>;
};

export default React.memo(CheckerBoard);
