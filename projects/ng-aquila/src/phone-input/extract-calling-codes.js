/**
 * A small script that extracts the calling codes from libphonenumber-js into a JSON file
 *
 * That saves us the dependency on libphonenumber and a lot of bundle size.
 */

const fs = require('fs-extra');
const path = require('path');

console.log(__dirname);

const meta = require('libphonenumber-js/metadata.full.json');

if (!meta || !meta.country_calling_codes || meta.country_calling_codes.length === 0) {
    throw new Error('Error extracting calling codes from libphonenumber-js. Could not read metadata or it was empty.');
}

const metadata = {};
metadata.callingCodes = meta.country_calling_codes;
const callingCodes = {};
Object.entries(meta.country_calling_codes).forEach(([countryCode, countryCodes]) => {
    countryCodes.forEach(country => {
        callingCodes[country] = countryCode;
    });
});
metadata.countries = callingCodes;

// some quick sanity checks
if (Object.keys(metadata.callingCodes).length === 0) {
    throw new Error(`Extracted object length is 0, that doesn't look right.`);
}

if (!metadata.callingCodes['49'] || !metadata.callingCodes['49'].includes('DE')) {
    throw new Error(`Couldn't find entry for german calling code. There might be something wrong with the extraction from libphonenumber-js`);
}

if (Object.keys(metadata.countries).length === 0) {
    throw new Error(`No countries extracted. There might be something wrong.`);
}

if (!metadata.countries['DE'] || metadata.countries['DE'] !== '49') {
    throw new Error(`Couldn't find calling code for Germany or it was wrong.`);
}

fs.writeFileSync(path.resolve(__dirname, 'metadata.json'), JSON.stringify(metadata, null, 2), 'utf-8');
