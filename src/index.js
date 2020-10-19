import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { store } from './store'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import { IntlProvider } from 'react-intl';
import French from './lang/fr.json';
import Arabic from './lang/ar.json';
import English from './lang/en.json';

const locale = navigator.language;
let lang;
if (locale === "en") {
  lang = English;
} else {
  if (locale === "fr") {
    lang = French;
  } else {
    lang = Arabic;
  }
}



ReactDOM.render(
  <React.StrictMode>
    <IntlProvider locale={locale} messages={French}>
      <Provider store={store}>
        <App />
      </Provider>
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
