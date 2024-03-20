import { mapClassNames } from '@aposin/ng-aquila/utils';

/** Is `undefined` or empty? */
export function isEmpty(value: any): boolean {
    return value === undefined || value === '';
}

export function isEmptyArray(value: any[]): boolean {
    return value === undefined || value.length === 0;
}

/** Add space and return mapClassNames (css). */
export function addStyles(aux: string, map: object): string {
    return ' ' + mapClassNames(aux, [], map);
}

/**
 * @param input one of `'small', 'medium', 'large', 'xlarge', '2xlarge', '3xlarge'`
 * @param map mapping
 */
export function addStylesFromDimensions(input: string, map: object): string {
    const aux = processSplit(input);
    let output = '';
    if (aux.length >= 1 && aux.length <= 7) {
        const auxTiny = addStyles(aux[0], map).replace('-{tier}', '');
        let auxSmall = '';
        let auxMedium = '';
        let auxLarge = '';
        let auxXLarge = '';
        let aux2XLarge = '';
        let aux3XLarge = '';
        switch (aux.length) {
            case 1:
                auxSmall = addStyles(aux[0], map).replace('{tier}', 'small');
                auxMedium = addStyles(aux[0], map).replace('{tier}', 'medium');
                auxLarge = addStyles(aux[0], map).replace('{tier}', 'large');
                auxXLarge = addStyles(aux[0], map).replace('{tier}', 'xlarge');
                aux2XLarge = addStyles(aux[0], map).replace('{tier}', '2xlarge');
                aux3XLarge = addStyles(aux[0], map).replace('{tier}', '3xlarge');
                break;
            case 2:
                auxSmall = addStyles(aux[1], map).replace('{tier}', 'small');
                auxMedium = addStyles(aux[1], map).replace('{tier}', 'medium');
                auxLarge = addStyles(aux[1], map).replace('{tier}', 'large');
                auxXLarge = addStyles(aux[1], map).replace('{tier}', 'xlarge');
                aux2XLarge = addStyles(aux[1], map).replace('{tier}', '2xlarge');
                aux3XLarge = addStyles(aux[1], map).replace('{tier}', '3xlarge');
                break;
            case 3:
                auxSmall = addStyles(aux[1], map).replace('{tier}', 'small');
                auxMedium = addStyles(aux[2], map).replace('{tier}', 'medium');
                auxLarge = addStyles(aux[2], map).replace('{tier}', 'large');
                auxXLarge = addStyles(aux[2], map).replace('{tier}', 'xlarge');
                aux2XLarge = addStyles(aux[2], map).replace('{tier}', '2xlarge');
                aux3XLarge = addStyles(aux[2], map).replace('{tier}', '3xlarge');
                break;
            default:
                auxSmall = addStyles(aux[1], map).replace('{tier}', 'small');
                auxMedium = addStyles(aux[2], map).replace('{tier}', 'medium');
                auxLarge = addStyles(aux[3], map).replace('{tier}', 'large');
                auxXLarge = addStyles(aux[4], map).replace('{tier}', 'xlarge');
                aux2XLarge = addStyles(aux[5], map).replace('{tier}', '2xlarge');
                aux3XLarge = addStyles(aux[6], map).replace('{tier}', '3xlarge');
                break;
        }
        output = [auxTiny, auxSmall, auxMedium, auxLarge, auxXLarge, aux2XLarge, aux3XLarge].map(className => className.trim()).join(' ');
    }
    return output;
}

// Simple split
export function processSplit(aux: string, char = ','): string[] {
    return aux.split(char).map(item => item.trim());
}
