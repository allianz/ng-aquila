import { addStyles, addStylesFromDimensions, isEmpty, processSplit } from './utils';

const MAP = {
    xs: 'xstest--{tier}',
    sd: 'sdtest-{tier}',
    md: 'mdtest-{tier}',
    lg: 'lgtest-{tier}',
    xlg: 'xlgtest-{tier}',
    '2xlg': '2xlgtest-{tier}',
    '3xlg': '3xlgtest-{tier}',
};

describe('Grid utils', () => {
    it('should test fuction isEmpty', () => {
        expect(isEmpty(undefined)).toBeTruthy();
        expect(isEmpty('')).toBeTruthy();
        expect(isEmpty('jordi')).toBeFalsy();
    });

    it('should test addStyles', () => {
        // @ts-expect-error fix nullability
        expect(addStyles(undefined, MAP)).not.toBeUndefined();
        expect(addStyles('xs', MAP)).toBe(' xstest--{tier}');
    });

    it('should test addStylesFromDimensions', () => {
        expect(addStylesFromDimensions('6,2', MAP)).not.toBeUndefined();
        expect(addStylesFromDimensions('6,2', MAP)).not.toBeNull();
        expect(addStylesFromDimensions('xs,sd,md,xs,xlg,2xlg,3xlg', MAP)).toBe(
            'xstest- sdtest-small mdtest-medium xstest--large xlgtest-xlarge 2xlgtest-2xlarge 3xlgtest-3xlarge',
        );
    });

    it('should test processSplit', () => {
        // @ts-expect-error fix nullability
        expect(() => processSplit(undefined)).toThrow();
    });
});
