import './App.css';
import Background from './components/common/Background';
import ScreenContainer from './containers/ScreenContainer';
import React, { useEffect } from 'react';

const App = () => {
    const preventClose = (e) => {
        e.preventDefault();
        e.returnValue = '';
    };

    useEffect(() => {
        const enablePrevent = () => {
            window.addEventListener('beforeunload', preventClose);
        };
        const disablePrevent = () => {
            window.removeEventListener('beforeunload', preventClose);
        };
        enablePrevent();
    }, []);

    return (
        <div>
            <Background />
            <div className="App">
                <ScreenContainer />
            </div>
        </div>
    );
};

export default App;
