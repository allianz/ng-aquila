import dayjs from 'dayjs';
import supportedLocales from 'dayjs/locale.json';

/**
 * This function turns a well-formatted locale into one that is known to dayjs.
 * To figure out what is known to dayjs this function makes use of the file `locale.json`
 * that is part of any dayjs relase (see https://day.js.org/docs/en/i18n/i18n).
 * To match the locale it follows the "lookup" logic specified in the RFC for
 * "Matching of Language Tags" (see https://www.rfc-editor.org/info/rfc4647).
 * @example en-GB -> en-gb, en-US -> en, de-DE -> de, de-CH -> de-ch
 * @param localeId A "language-range" following the BCP 47 standard.
 * @returns A "language-range" that is supported by dayjs.
 */
export function convertToDayjsLocale(localeId: string): string {
    let dayjsLocale = supportedLocales.find(locale => locale.key === localeId.toLowerCase());

    if (!dayjsLocale && localeId.includes('-')) {
        let localeParts = localeId.toLowerCase().split('-');
        while (localeParts.length > 0) {
            dayjsLocale = supportedLocales.find(locale => locale.key === localeParts.join('-'));
            if (dayjsLocale) {
                console.warn(`The locale '${localeId}' is not known to dayjs. Using closest match '${dayjsLocale.key}' instead.`);
                break;
            }
            localeParts = localeParts.slice(0, localeParts.length - 1);
        }
    }

    if (!dayjsLocale) {
        console.warn(`The locale '${localeId}' is not known to dayjs. Using the default 'en'.`);
        dayjsLocale = { key: 'en', name: '' };
    }

    return dayjsLocale.key;
}

/**
 * This function uses a dynamic import to load the dayjs data for the requested locale
 * and returns the localeData for this locale.
 * @param localeId A "language-range" following the BCP 47 standard.
 * @returns A Promise that resolves with the dayjs localeData for the given locale.
 */
export async function getDayjsLocaleData(localeId: string): Promise<dayjs.InstanceLocaleDataReturn> {
    return import(`dayjs/locale/${localeId}.js`)
        .then(() => dayjs().locale(localeId).localeData())
        .catch(() => {
            console.warn(`The requested dayjs locale '${localeId}' could not be loaded.`);
            // return the global localeData as fallback
            return dayjs.localeData();
        });
}
