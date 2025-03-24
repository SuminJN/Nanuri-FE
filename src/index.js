import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./assets/styles/main.css";

async function enableMocking() {
    if (process.env.NODE_ENV !== 'development') {
        return
    }

    const { worker } = await import('./mocks/browser')
    return worker.start()
}

const root = ReactDOM.createRoot(document.getElementById('root'));

/* MSW 사용 */
enableMocking().then(()=> {root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)});

// root.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
