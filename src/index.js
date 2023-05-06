import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

// ** Styles 
import 'antd/dist/reset.css';
import "./reset.css";
import './index.css';
import './global.css';

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);