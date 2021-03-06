import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import App from './pages/App.js';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render((
    <BrowserRouter>
        <App /> {/* The various pages will be displayed by the `Main` component. */}
    </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();