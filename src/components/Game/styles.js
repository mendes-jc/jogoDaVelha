import styled, { css }from 'styled-components';

import { darken } from 'polished';

const basicGrey = '#cccccc';

function getColor(selected){
    return selected ? '#9372b4' : basicGrey;
}

const Block = styled.div`
    height: 20px;
    min-width: 20px;
    padding: 15px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: sans-serif;
    font-weight: bolder;

    border-radius: 4px;
    border-width: 2px;

    color: #FFF;
`;

export const Container = styled.div`
    background: #FFF;
    border-radius: 15px;
    box-shadow: 0px 0px 5px #333;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 30px;

    width: fit-content;

    & + & {
        margin-top: 20px;
        
    }
`;

export const LevelButton = styled(Block)`
    transition: 50ms;
    background: ${({selected}) => getColor(selected)};

    cursor: pointer;
    &:active {
        transform: translate(0, 8px);
    }
    &:not(:active){
        box-shadow: 0 8px ${({selected}) => darken(0.3, getColor(selected))};
    }

    & + & {
        margin-left: 10px;
    }
    user-select: none;
`;

export const RestartButton = styled(Block)`
    transition: 50ms;
    background: ${({selected}) => getColor(selected)};

    cursor: pointer;
    &:active {
        transform: translate(0, 8px);
    }
    &:not(:active){
        box-shadow: 0 8px ${({selected}) => darken(0.3, getColor(selected))};
    }

    & + & {
        margin-left: 10px;
    }
    user-select: none;
`;

export const Column = styled.div`
    & + & {
        margin-left: 10px;
    }
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    & + & {
        margin-top: 15px;
    }
`;

export const GameBlock = styled(Block)`
    background: ${ ({color}) => color ? color : basicGrey};
    
    ${ props =>  props.pressed ?
            css`
                transform: translate(0, 8px);
            `
        :
            css`
                box-shadow: 0px 8px ${darken(0.3, basicGrey)};
                cursor: pointer;    
            `
    }

    & + & {
        margin-top: 20px;
    }
    margin: 10px;
    user-select: none;
`;

export const Score = styled(Block)`
    background: ${({color}) => color ? color : basicGrey};
    box-shadow: 0 8px ${({color}) => darken(0.3, color ? color : basicGrey)};

    & + & {
        margin-left: 15px;
    }
    user-select: none;
`;

export const Main = styled.div`
    display:flex;
    width: 100%;;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const PlayerName = styled.span`
    color: #777;
    font-family: sans-serif;
    font-size: 25px;
    font-weight: bolder;
`;

export const NameEdit = styled.input`
    color: #777;
    background: #EEE;
    font-family: sans-serif;
    font-size: 25px;
    font-weight: bolder;
    width: 250px;
    border-width: 0;
    text-align: center;
`;

export const Confirm = styled(Block)`
    width: 15px;
    height: 15px;
    color: #FFF;
    background: #55AA62;
    font-size: 15px;
    cursor: pointer;
    user-select: none;

    &:active {
        transform: translate(0, 8px);
    }
    &:not(:active){
        box-shadow: 0 8px ${darken(0.3, '#338833')};
    }
    
    * + & {
        margin-left: 15px;
    }
`;