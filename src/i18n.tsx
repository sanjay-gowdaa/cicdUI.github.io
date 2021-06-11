import i18next from "i18next";
import englishTranslation from './static/translations/en.json';
import kannadaTranslation from './static/translations/kn.json';

export const initi18n = () => {
    return i18next.init({
        interpolation: { escapeValue: false },
        fallbackLng: 'en',
        defaultNS: 'common',
        lng: navigator.language, // language to use
        resources: {
            en: {
                common: englishTranslation
            },
            kn: {
                common: kannadaTranslation
            }
        },
    });
}