import { createAction, handleActions } from 'redux-actions';

const SET_GAME_DATA = 'game/SET_GAME_DATA';
const SET_GAME = 'game/SET_GAME';
const INIT_GAME = 'game/INIT_GAME';
const INIT_SUMMARY = 'game/INIT_SUMMARY';

export const setGameData = createAction(SET_GAME_DATA, ({ form, key, value }) => ({ form, key, value }));
export const setGame = createAction(SET_GAME, (gameData) => gameData);
export const initSummary = createAction(INIT_SUMMARY);
export const initGame = createAction(INIT_GAME);

const initialState = {
    ingame: {
        roomCode: '',
        host: '',
        mode: '',
        roomState: '',
        player: [],
        maxPlayer: 0,
        position: 0,
        turn: 0,
        tileStr: '',
    },
    summary: {
        tile: '',
        winnerArr: [],
    },
};

const game = handleActions(
    {
        [SET_GAME_DATA]: (state, { payload: { form, key, value } }) => ({
            ...state,
            [form]: {
                ...state[form],
                [key]: value,
            },
        }),
        [SET_GAME]: (state, { payload: gameData }) => ({
            ...state,
            ingame: {
                ...state.ingame,
                ...gameData,
            },
        }),
        [INIT_SUMMARY]: (state) => ({
            ...state,
            summary: {
                tile: '',
                winnerArr: [],
            },
        }),
        [INIT_GAME]: (state) => ({
            ...state,
            ingame: {
                roomCode: '',
                host: '',
                mode: '',
                roomState: '',
                player: [],
                maxPlayer: 0,
                position: 0,
                turn: 0,
                tileStr: '',
            },
        }),
    },
    initialState,
);

export default game;
