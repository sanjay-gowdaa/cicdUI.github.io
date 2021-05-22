import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePageRoutes from './pageRoutes';
import { Provider } from 'react-redux';
import store from './store';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import * as i18nLocal from './i18n';

i18nLocal.initi18n();

ReactDOM.render(
    <Router>
        <Provider store={store}>
        <I18nextProvider i18n={i18next}>
            <HomePageRoutes />
        </I18nextProvider>
        </Provider>
    </Router>,
    document.getElementById('root'),
);