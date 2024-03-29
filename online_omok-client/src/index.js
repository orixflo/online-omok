import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer, { rootSaga } from './modules';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
//const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
const root = ReactDOM.createRoot(document.getElementById('root'));

/* function loadUser() {
    try {
        const user = localStorage.getItem('user');
        if (!user) return;

        store.dispatch(tempSetUser(JSON.parse(user)));
        store.dispatch(check());
    } catch (e) {
        console.log('localStorage is not working');
    }
} */

sagaMiddleware.run(rootSaga);
//loadUser();

root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);

reportWebVitals();
