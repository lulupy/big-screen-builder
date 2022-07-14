import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter  } from 'react-router-dom';
import './index.css';
import App from './App';
import DragAndResize from './demos/DragAndResize';
import DraggableDemo from './demos/DraggableDemo';
import RotateDemo from './demos/RotateDemo';
import ResizeDemo from './demos/ResizeDemo';
import Demo from './editor-core/components/ColorPicker';

import reportWebVitals from './reportWebVitals';

// https://github.com/ant-design/ant-design/issues/33327#issuecomment-997355323
import 'antd/dist/antd.min.css';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
