import { createAction, handleActions } from 'redux-actions';

const CHANGE_INPUT = 'chat/CHANGE_INPUT';
const ADD_MESSAGE = 'chat/ADD_MESSAGE';
const INIT_CHAT = 'chat/INIT_CHAT';
const SET_EMOJI = 'chat/SET_EMOJI';

export const changeInput = createAction(CHANGE_INPUT, (input) => input);
export const addMessage = createAction(ADD_MESSAGE, (input) => input);
export const initChat = createAction(INIT_CHAT);
export const setEmoji = createAction(SET_EMOJI, (emoji) => emoji);

const initialState = {
    input: '',
    chatArr: [],
    emojiArr: ['-', '-', '-', '-'],
};

const getEmojiArr = (emojiArr, position, emoji) => {
    const nextArr = [...emojiArr.slice(0, position), emoji, ...emojiArr.slice(position + 1)];
    return nextArr;
};

const chat = handleActions(
    {
        [CHANGE_INPUT]: (state, { payload: input }) => ({
            ...state,
            input: input,
        }),
        [ADD_MESSAGE]: (state, { payload: input }) => ({
            ...state,
            chatArr: [...state.chatArr, { type: input.type, text: input.text }],
        }),
        [INIT_CHAT]: () => ({
            input: '',
            chatArr: [],
            emojiArr: ['-', '-', '-', '-'],
        }),
        [SET_EMOJI]: (state, { payload: emoji }) => ({
            ...state,
            emojiArr: getEmojiArr(state.emojiArr, emoji.position, emoji.emoji),
        }),
    },
    initialState,
);

export default chat;
