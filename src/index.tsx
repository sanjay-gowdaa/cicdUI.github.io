import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePageRoutes from './pageRoutes';
import { Provider } from 'react-redux';
import store from './store';
// import * as serviceWorker from './serviceWorker';
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
import englishTranslation from './static/translations/en.json';
import kannadaTranslation from './static/translations/kn.json';

i18next.init({
    interpolation: { escapeValue: false },  // React already does escaping
    lng: navigator.language,                              // language to use
    resources: {
        en: {
            common: englishTranslation          // 'common' is our custom namespace
        },
        kn: {
            common: kannadaTranslation
        }
    },
});

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
