import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from "expo-localization";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from "./locales/en-US/translation.json"
import translationfa from "./locales/fa-IR/translation.json"

const resources = {
  "en-US": { translation: translationEn },
  "fa-IR": { translation: translationfa },
};

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem("language");

  if (!savedLanguage) {
    savedLanguage = Localization.getLocales().toLocaleString();
  }

  i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage,
    fallbackLng: "en-US",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
