import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import RootStore from './stores/'
import { Provider } from 'mobx-react'

const context = createContext ({
  
})
{/* 通过context传递给子组件 */} 
ReactDOM.render(
    <Provider {...new RootStore()}>
      <App />
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
