import './App.css';
import Button from './components/common/Button';
import DividerVertical from './components/common/DividerVertical';
import Input from './components/common/Input';
import WindowForm from './components/common/WindowForm';
import Tab from './components/common/Tab';
import TabButton from './components/common/TabButton';
import Background from './components/common/Background';

const App = () => {

  return (
    <div>
      <Background />
      <div className="App">
        <div className="Test">
          <WindowForm title="테스트">
            <Tab>
              <Button>222</Button>
              <DividerVertical />
              <Button>444</Button>
              <Input placeholder="asdfasdf"></Input>
            </Tab>
          </WindowForm>
        </div>
      </div>
    </div>
    
  );
}

export default App;
