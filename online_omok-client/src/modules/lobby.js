import { createAction, handleActions } from 'redux-actions';

const SET_HOST_DATA = 'lobby/SET_HOST_DATA';
const SET_ROOM_LIST = 'lobby/SET_ROOM_LIST';

export const setHostData = createAction(SET_HOST_DATA, ({ key, value }) => ({ key, value }));
export const setRoomList = createAction(SET_ROOM_LIST, (roomArray) => roomArray);

const initialState = {
    room: {
        roomCode: '',
        hostCode: '',
        mode: 'option1',
    },
    list: [],
};

const lobby = handleActions(
    {
        [SET_HOST_DATA]: (state, { payload: { key, value } }) => ({
            ...state,
            room: {
                ...state.room,
                [key]: value,
            },
        }),
        [SET_ROOM_LIST]: (state, { payload: roomArray }) => ({
            ...state,
            list: roomArray,
        }),
    },
    initialState,
);

export default lobby;
