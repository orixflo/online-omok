import './App.css';
import Button from './components/common/Button';
import DividerVertical from './components/common/DividerVertical';
import Input from './components/common/Input';
import WindowForm from './components/common/WindowForm';
import Tab from './components/common/Tab';
import TabButton from './components/common/TabButton';
import Background from './components/common/Background';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Lobby from './components/lobby/Lobby';
import InGame from './components/ingame/InGame';

const App = () => {
  const test = 4;

  return (
    <div>
      <Background />
      <div className="App">
        {test === 1 && <LoginForm />}
        {test === 2 && <RegisterForm />}
        {test === 3 && <Lobby />}
        {test === 4 && <InGame />}
      </div>
    </div>
    
  );
}

export default App;
