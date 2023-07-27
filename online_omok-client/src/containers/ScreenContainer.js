import { useDispatch, useSelector } from 'react-redux';
import { changeScreen } from '../modules/screen';
import LobbyContainer from './lobby/LobbyContainer';
import GuestLoginContainer from './auth/GuestLoginContainer';
import IngameContainer from './ingame/IngameContainer';

const ScreenContainer = () => {
    const dispatch = useDispatch();

    const screen = useSelector(({ screen }) => ({
        screenType: screen.screenType,
    }));

    if (screen.screenType === null) {
        dispatch(changeScreen('guestLogin'));
    }

    return (
        <div>
            {screen.screenType === 'guestLogin' && <GuestLoginContainer />}
            {screen.screenType === 'lobby' && <LobbyContainer />}
            {screen.screenType === 'ingame' && <IngameContainer />}
        </div>
    );
};

export default ScreenContainer;
