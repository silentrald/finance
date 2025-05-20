import { AppLocale } from "@/types";
import { useI18n } from "vue-i18n";
import locale from "@/modules/locale";

const LOCALES: {
  locale: AppLocale;
  text: string;
}[] = [
  { locale: "en", text: "English" },
  { locale: "jp", text: "日本語" },
];

export default function useLocale() {
  const i18n = useI18n();

  return {
    t: i18n.t,
    n: i18n.n,

    async setLocale(appLocale: AppLocale) {
      return locale.set(appLocale);
    },

    availableLocales() {
      return LOCALES;
    },

    currentLocale() {
      return locale.current();
    },
  };
}
