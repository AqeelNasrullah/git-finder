import { IconContext } from 'react-icons';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './components/MainComponent';

function App() {
  const style = {
    marginTop: '-3px'
  }
  
  return (
    <IconContext.Provider value={{ style: style }}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </IconContext.Provider>
  );
}

export default App;
