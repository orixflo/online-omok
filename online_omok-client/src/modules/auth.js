import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const GUEST_LOGIN = 'auth/GUEST_LOGIN';
const GUEST_LOGIN_SUCCESS = 'auth/GUEST_LOGIN_SUCCESS';
const GUEST_LOGIN_FAILURE = 'auth/GUEST_LOGIN_FAILURE';

export const changeField = createAction(CHANGE_FIELD, ({ form, key, value }) => ({ form, key, value }));
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);
export const guestLogin = createAction(GUEST_LOGIN, ({ nickname }) => ({ nickname }));

const guestLoginSaga = createRequestSaga(GUEST_LOGIN, authAPI.guestLogin);

export function* authSaga() {
    yield takeLatest(GUEST_LOGIN, guestLoginSaga);
}

const initialState = {
    guest: {
        nickname: '',
    },
    auth: null,
    authError: null,
};

const auth = handleActions(
    {
        [CHANGE_FIELD]: (state, { payload: { form, key, value } }) => ({
            ...state,
            [form]: {
                ...state[form],
                [key]: value,
            },
        }),
        [INITIALIZE_FORM]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form],
            authError: null,
        }),
        [GUEST_LOGIN_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            authError: null,
            auth,
        }),
        [GUEST_LOGIN_FAILURE]: (state, { payload: error }) => ({
            ...state,
            authError: error,
        }),
    },
    initialState,
);

export default auth;
