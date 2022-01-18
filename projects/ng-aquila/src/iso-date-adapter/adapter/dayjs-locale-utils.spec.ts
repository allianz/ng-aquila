import { convertToDayjsLocale } from './dayjs-locale-utils';

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
});
