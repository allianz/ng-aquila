import { LocalizedCountryNames } from 'i18n-iso-countries';

// This file gets created in the postinstall hook, see extract-calling-codes.js script
import rawMetadata from './metadata.json';

const MAX_LENGTH_COUNTRY_CODE = 3;

class CountryMetadata {
    countries: { [key: string]: string } = {};
    callingCodes: { [key: string]: string[] } = {};
    constructor(sourceObj: any) {
        this.countries = sourceObj.countries;
        this.callingCodes = sourceObj.callingCodes;
    }
}

const metadata = new CountryMetadata(rawMetadata);

/** Get dial code by country code */
export const getDialCodeByCountryCode = (countryCode: string): string => metadata.countries[countryCode];

/** Get the country name by country code */
export const getCountryNameByCountryCode = (countryNames: LocalizedCountryNames<any>, countryCode: string): string => {
    const name = countryNames[countryCode];
    return Array.isArray(name) ? name[0] : name;
};

export const getCountryCodeforCallingCode = (callingCode: string) => {
    const countries = metadata.callingCodes[callingCode];
    if (countries && countries.length > 0) {
        return countries[0];
    }

    throw new Error('Could not find calling code ' + callingCode);
};

// Extract the country calling code from a number string
// Returns the country calling code and the rest of the string with the calling code removed
// Throws an error if the input is not correctly formatted.
export const getCountryCallingCodeFromNumber = (number: string) => {
    // there are a lot of cases a phone number could have, e.g. with a "IDD prefix"
    // e.g. instead of +49 123 it could be 0049 123 if you are calling from european countries
    // this IDD prefix is specific to countries/areas. libphonenumber has all the metadata for it
    // but as we don't want the dependency on it we only accept numbers with + sign and calling code
    // in the beginning. this can later be done better once we introduce an adapter and then a libphonenumber adapter
    // could have additional capabilities here.
    if (!number.startsWith('+')) {
        throw Error('Expected phone number to start with "+" sign followed by the calling code');
    }

    // Taken from libphonenumber-js
    // https://gitlab.com/catamphetamine/libphonenumber-js/-/blob/master/source/helpers/extractCountryCallingCode.js
    let i = 2;
    while (i - 1 <= MAX_LENGTH_COUNTRY_CODE && i <= number.length) {
        const countryCallingCode = number.slice(1, i);
        if (countryCallingCode in metadata.callingCodes) {
            return {
                countryCallingCode,
                number: number.slice(i),
            };
        }
        i++;
    }

    throw new Error('No country code found');
};

/** Get sorted country code */
export const getSortedCountryCodes = (countryNames: LocalizedCountryNames<any>) =>
    Object.keys(countryNames)
        .filter(countryCode => countryCode in metadata.countries)
        .sort((a, b) => {
            // There are arrays and strings provided for locals. For example (en):
            // "RO": "Romania",
            // "RU": ["Russian Federation", "Russia"],
            const localA: string = (Array.isArray(countryNames[a]) ? countryNames[a][0] : countryNames[a]) as string;
            const localB: string = (Array.isArray(countryNames[b]) ? countryNames[b][0] : countryNames[b]) as string;

            return localA.localeCompare(localB);
        });
