import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import screen from './screen';
import chat from './chat';
import game from './game';
import lobby from './lobby';

const rootReducer = combineReducers({
    auth,
    loading,
    screen,
    chat,
    game,
    lobby,
});

export function* rootSaga() {
    yield all([authSaga()]);
}

export default rootReducer;
