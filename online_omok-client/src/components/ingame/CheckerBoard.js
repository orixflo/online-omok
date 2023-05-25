import styled from 'styled-components';
import CheckBox from './CheckBox';

const CheckerBoardWrapper = styled.div`
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    display: grid;
    grid-template-columns: repeat(19, 1fr);
    grid-template-rows: repeat(19, 1fr);
`; 

const CheckerBoard = () => {
    const cbArr = [];

    for (let i = 0; i < 19; i++) {
        for (let j = 0; j < 19; j++) {
            cbArr.push(<CheckBox key={`${i}_${j}`} ></CheckBox>);
            console.log({i} + " _ " + {j});
        }      
    };

    return (
        <CheckerBoardWrapper>
            {cbArr}
        </CheckerBoardWrapper>
    );
};

export default CheckerBoard;