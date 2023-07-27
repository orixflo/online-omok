import { createAction, handleActions } from 'redux-actions';

const CHANGE_SCREEN = 'screen/CHANGE_SCREEN';

export const changeScreen = createAction(CHANGE_SCREEN, (screenType) => screenType);

const initialState = {
    screenType: null,
};

const screen = handleActions(
    {
        [CHANGE_SCREEN]: (state, action) => ({
            ...state,
            screenType: action.payload,
        }),
    },
    initialState,
);

export default screen;
