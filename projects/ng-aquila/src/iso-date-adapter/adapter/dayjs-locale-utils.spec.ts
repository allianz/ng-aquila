import { convertToDayjsLocale, getDayjsLocaleData } from './dayjs-locale-utils';

describe('dayjs locale utils', () => {
    describe('convertToDayjsLocale', () => {
        describe('supported locales', () => {
            it('should not change "en"', () => {
                const dayjsLocale = convertToDayjsLocale('en');
                expect(dayjsLocale).toBe('en');
            });

            it('should not change "zh-cn"', () => {
                const dayjsLocale = convertToDayjsLocale('zh-cn');
                expect(dayjsLocale).toBe('zh-cn');
            });
        });

        describe('partially supported locales', () => {
            it('should convert "en-US" to "en"', () => {
                const dayjsLocale = convertToDayjsLocale('en-US');
                expect(dayjsLocale).toBe('en');
            });

            it('should convert "zh-CN-private1" to "zh-cn"', () => {
                const dayjsLocale = convertToDayjsLocale('zh-CN-private1');
                expect(dayjsLocale).toBe('zh-cn');
            });

            it('should convert "zh-Hant-CN-x-private1-private2" to "zh"', () => {
                const dayjsLocale = convertToDayjsLocale('zh-Hant-CN-x-private1-private2');
                expect(dayjsLocale).toBe('zh');
            });
        });

        describe('unknown locales', () => {
            it('should fall back to "en" for completely unknown locales', () => {
                const dayjsLocale = convertToDayjsLocale('unknown');
                expect(dayjsLocale).toBe('en');
            });
        });
    });

    describe('getDayjsLocaleData', () => {
        it('should return the localeData of the requested locale ("de")', async () => {
            const deLocaleData = await getDayjsLocaleData('de');
            // smoke testing a few of the properties of the 'de' locale
            expect(deLocaleData.firstDayOfWeek()).toBe(1);
            expect(deLocaleData.weekdaysMin()).toEqual(['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']);
            expect(deLocaleData.monthsShort()).toEqual(['Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sept.', 'Okt.', 'Nov.', 'Dez.']);
        });

        it('should return the localeData of the requested locale ("es-us")', async () => {
            const esUsLocaleData = await getDayjsLocaleData('es-us');
            // smoke testing a few of the properties of the 'es-us' locale
            expect(esUsLocaleData.firstDayOfWeek()).toBe(0);
            expect(esUsLocaleData.weekdaysMin()).toEqual(['do', 'lu', 'ma', 'mi', 'ju', 'vi', 'sá']);
            expect(esUsLocaleData.monthsShort()).toEqual(['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']);
        });

        it('should fall back to the global localeData for unknown locales', async () => {
            const localeData = await getDayjsLocaleData('unknown');
            // smoke testing a few of the properties of the global ('en') locale
            expect(localeData.firstDayOfWeek()).toBe(0);
            expect(localeData.weekdaysMin()).toEqual(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']);
            expect(localeData.monthsShort()).toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
        });
    });
});
