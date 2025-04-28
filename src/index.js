import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // 서비스 워커 임포트
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <React.StrictMode>

      <App />

      
    </React.StrictMode>
 
);

// 서비스 워커 등록
// serviceWorkerRegistration.register();

// 성능 측정 (옵션)
// reportWebVitals();

