import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { App } from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

import './assets/css/index.css';

// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
<<<<<<< HEAD
);
=======
);

//asd
>>>>>>> d56efbeebd010bd3b6ffb62a73bf6971db60b4df
