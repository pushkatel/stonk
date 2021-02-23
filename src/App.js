import logo from './logo.svg';
import './App.css';
import InputForm from './InputForm';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>So you wish you had bought some STONKS?</p>
        <div classsName='form'>
          <InputForm />
        </div>
      </header>
    </div>
  );
}

export default App;
