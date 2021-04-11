import { IconContext } from 'react-icons';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import './App.css';
import Main from './components/MainComponent';
import reducers from './store/reducers/reducers';

function App() {
  const style = {
    marginTop: '-3px'
  }

  const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

  return (
    <Provider store={ store }>
      <IconContext.Provider value={{ style: style }}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </IconContext.Provider>
    </Provider>
  );
}

export default App;
