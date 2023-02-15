import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store'

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );

export default function ExamplePage(Props: any) {
  return (
    <div>123 It's React text</div>
  )
}

window.addEventListener('load', () => {
  const wrapper = document.getElementById('container');
  ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        {/* <ExamplePage /> */}
        <App />
      </React.StrictMode>
    </Provider>,
    wrapper
);
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
