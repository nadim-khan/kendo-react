import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import en from '../src/assets/i18n/en.json';
import fr from '../src/assets/i18n/fr.json';
import hi from '../src/assets/i18n/hi.json';
import ar from '../src/assets/i18n/ar.json';
import ch from '../src/assets/i18n/ch.json';
import vn from '../src/assets/i18n/vn.json';
import i18next from 'i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      hi: { translation: hi },
      ar: { translation: ar },
      ch: { translation: ch },
      vn: { translation: vn },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <I18nextProvider i18n={i18next}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </I18nextProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
