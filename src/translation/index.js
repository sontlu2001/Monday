import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import translationEN from '../locales/en/translation';
import translationJP from '../locales/jp/translation';

const resources = {
    en: {
        translation: translationEN
    },
    jp: {
        translation: translationJP
    }
};

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;

