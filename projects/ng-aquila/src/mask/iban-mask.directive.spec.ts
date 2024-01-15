import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { dispatchFakeEvent } from 'projects/ng-aquila/src/cdk-test-utils';

import { NxIbanMaskDirective } from './iban-mask.directive';
import { NxMaskDirective } from './mask.directive';
import { assertInputValue } from './mask.directive.spec';
import { NxMaskModule } from './mask.module';

@Directive()
abstract class IbanMaskTest {
    @ViewChild(NxMaskDirective) maskInstance!: NxMaskDirective;
    @ViewChild(NxIbanMaskDirective) ibanInstance!: NxIbanMaskDirective;

    testForm: FormGroup = new FormGroup({
        maskInput: new FormControl('', {}),
    });

    validateMask = true;
}

describe('NxIbanMaskDirective', () => {
    let fixture: ComponentFixture<IbanMaskTest>;
    let testInstance: IbanMaskTest;
    let maskInstance: NxMaskDirective;
    let ibanInstance: NxIbanMaskDirective;
    let nativeElement: HTMLInputElement;

    function createTestComponent(component: Type<IbanMaskTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        maskInstance = testInstance.maskInstance;
        ibanInstance = testInstance.ibanInstance;
        nativeElement = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    }

    function testIban(inputValue: string, asserted: string) {
        const countryCode = inputValue.substr(0, 2);
        nativeElement.value = countryCode;
        nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(testInstance.testForm.valid).toBeFalse();

        nativeElement.value = inputValue;
        nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(nativeElement.value).toBe(asserted);
        expect(testInstance.testForm.valid).toBeTrue();
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicIbanMaskComponent, FormIbanMaskComponent, FormWithInitalIbanMaskComponent, FormIbanOnBlurMaskComponent],
            imports: [FormsModule, ReactiveFormsModule, NxMaskModule],
        }).compileComponents();
    }));

    describe('basic', () => {
        it('creates the input', () => {
            createTestComponent(BasicIbanMaskComponent);
            expect(ibanInstance).toBeTruthy();
        });
    });

    describe('change masks', () => {
        it('updates mask when first two letters were entered', () => {
            createTestComponent(BasicIbanMaskComponent);
            expect(maskInstance.mask).toBe('SS');

            assertInputValue(nativeElement, 'DE', 'DE');
            expect(maskInstance.mask).toBe('SS00 0000 0000 0000 0000 00');

            assertInputValue(nativeElement, 'FR', 'FR');
            expect(maskInstance.mask).toBe('SS00 0000 0000 00AA AAAA AAAA A00');
        });

        it('has correct cursor positions when typing', () => {
            createTestComponent(BasicIbanMaskComponent);
            assertInputValue(nativeElement, 'DE', 'DE');
            expect(nativeElement.selectionStart).toBe(2);
            expect(nativeElement.selectionEnd).toBe(2);
            assertInputValue(nativeElement, 'DE1', 'DE1');
            expect(nativeElement.selectionStart).toBe(3);
            expect(nativeElement.selectionEnd).toBe(3);
            assertInputValue(nativeElement, 'DE123', 'DE12 3');
            expect(nativeElement.selectionStart).toBe(6);
            expect(nativeElement.selectionEnd).toBe(6);
        });

        it('does not update mask on entering invalid country code', () => {
            createTestComponent(BasicIbanMaskComponent);
            expect(maskInstance.mask).toBe('SS');

            assertInputValue(nativeElement, 'GD', 'GD');
            expect(maskInstance.mask).toBe('SS');
        });

        it('sets mask to SS for invalid country code', () => {
            createTestComponent(BasicIbanMaskComponent);
            assertInputValue(nativeElement, 'DE', 'DE');
            expect(maskInstance.mask).toBe('SS00 0000 0000 0000 0000 00');

            assertInputValue(nativeElement, 'DI', 'DI');
            expect(maskInstance.mask).toBe('SS');
        });

        it('accepts lowercase country codes', () => {
            createTestComponent(BasicIbanMaskComponent);
            assertInputValue(nativeElement, 'de89370400440532013001', 'DE89 3704 0044 0532 0130 01');
            expect(maskInstance.mask).toBe('SS00 0000 0000 0000 0000 00');

            assertInputValue(nativeElement, 'di', 'DI');
            expect(maskInstance.mask).toBe('SS');
        });
    });

    describe('form', () => {
        it('should correctly fill in an initial form value', () => {
            createTestComponent(FormWithInitalIbanMaskComponent);

            expect(nativeElement.value).toBe('NL91 ABNA 0417 1643 00');
        });

        it('should correctly update on patchValue', () => {
            createTestComponent(FormIbanMaskComponent);
            testInstance.testForm.patchValue({ maskInput: 'NL91ABNA0417164300' });
            fixture.detectChanges();
            expect(nativeElement.value).toBe('NL91 ABNA 0417 1643 00');
        });
    });

    describe('browser autofill', () => {
        it('should correctly set the value and cursor on auto fill', () => {
            createTestComponent(BasicIbanMaskComponent);
            nativeElement.value = 'DE89370400440532013000';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            expect(nativeElement.value).toBe('DE89 3704 0044 0532 0130 00');
            expect(nativeElement.selectionStart).toBe(27);
            expect(nativeElement.selectionEnd).toBe(27);
        });
    });

    describe('pasting', () => {
        it('paste without changing the country code', () => {
            createTestComponent(BasicIbanMaskComponent);
            assertInputValue(nativeElement, 'DE', 'DE');

            let data = new DataTransfer();
            data.items.add('DE89370400440532013000', 'text/plain');
            let pasteEvent = new ClipboardEvent('paste', { clipboardData: data } as ClipboardEventInit);
            nativeElement.setSelectionRange(0, 2);
            nativeElement.dispatchEvent(pasteEvent);
            nativeElement.value = 'DE89370400440532013000';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(nativeElement.value).toBe('DE89 3704 0044 0532 0130 00');
            expect(nativeElement.selectionStart).toBe(27);
            expect(nativeElement.selectionEnd).toBe(27);

            data = new DataTransfer();
            data.items.add('DE27100777770209299700', 'text/plain');
            pasteEvent = new ClipboardEvent('paste', { clipboardData: data } as ClipboardEventInit);
            nativeElement.setSelectionRange(0, 27);
            nativeElement.value = 'DE27100777770209299700';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(nativeElement.value).toBe('DE27 1007 7777 0209 2997 00');
            expect(nativeElement.selectionStart).toBe(27);
            expect(nativeElement.selectionEnd).toBe(27);
        });

        it('paste with changing the country code', () => {
            createTestComponent(BasicIbanMaskComponent);

            let data = new DataTransfer();
            data.items.add('DE89370400440532013000', 'text/plain');
            let pasteEvent = new ClipboardEvent('paste', { clipboardData: data } as ClipboardEventInit);
            nativeElement.setSelectionRange(0, 2);
            nativeElement.dispatchEvent(pasteEvent);
            nativeElement.value = 'DE89370400440532013000';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(nativeElement.value).toBe('DE89 3704 0044 0532 0130 00');
            expect(nativeElement.selectionStart).toBe(27);
            expect(nativeElement.selectionEnd).toBe(27);

            data = new DataTransfer();
            data.items.add('DK5750510001322617', 'text/plain');
            pasteEvent = new ClipboardEvent('paste', { clipboardData: data } as ClipboardEventInit);
            nativeElement.setSelectionRange(0, 27);
            nativeElement.dispatchEvent(pasteEvent);
            nativeElement.value = 'DK5750510001322617';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(nativeElement.value).toBe('DK57 5051 0001 3226 17');
            expect(nativeElement.selectionStart).toBe(22);
            expect(nativeElement.selectionEnd).toBe(22);

            data = new DataTransfer();
            data.items.add('DE27100777770209299700', 'text/plain');
            pasteEvent = new ClipboardEvent('paste', { clipboardData: data } as ClipboardEventInit);
            nativeElement.setSelectionRange(0, 22);
            nativeElement.dispatchEvent(pasteEvent);
            nativeElement.value = 'DE27100777770209299700';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(maskInstance.mask).toBe('SS00 0000 0000 0000 0000 00');

            expect(nativeElement.value).toBe('DE27 1007 7777 0209 2997 00');
            expect(nativeElement.selectionStart).toBe(27);
            expect(nativeElement.selectionEnd).toBe(27);
        });

        it('pasting with lowercase', () => {
            createTestComponent(BasicIbanMaskComponent);

            let data = new DataTransfer();
            data.items.add('de89370400440532013000', 'text/plain');
            let pasteEvent = new ClipboardEvent('paste', { clipboardData: data } as ClipboardEventInit);
            nativeElement.setSelectionRange(0, 2);
            nativeElement.dispatchEvent(pasteEvent);
            nativeElement.value = 'de89370400440532013000';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(nativeElement.value).toBe('DE89 3704 0044 0532 0130 00');
            expect(nativeElement.selectionStart).toBe(27);
            expect(nativeElement.selectionEnd).toBe(27);

            data = new DataTransfer();
            data.items.add('mt84malt011000012345mtlcast001s', 'text/plain');
            pasteEvent = new ClipboardEvent('paste', { clipboardData: data } as ClipboardEventInit);
            nativeElement.setSelectionRange(0, 27);
            nativeElement.dispatchEvent(pasteEvent);
            nativeElement.value = 'mt84malt011000012345mtlcast001s';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(nativeElement.value).toBe('MT84 MALT 0110 0001 2345 MTLC AST0 01S');
            expect(maskInstance.mask).toBe('SS00 SSSS 0000 0AAA AAAA AAAA AAAA AAA');
            expect(nativeElement.selectionStart).toBe(38);
            expect(nativeElement.selectionEnd).toBe(38);

            data = new DataTransfer();
            data.items.add('de27100777770209299700', 'text/plain');
            pasteEvent = new ClipboardEvent('paste', { clipboardData: data } as ClipboardEventInit);
            nativeElement.setSelectionRange(0, 38);
            nativeElement.dispatchEvent(pasteEvent);
            nativeElement.value = 'de27100777770209299700';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(maskInstance.mask).toBe('SS00 0000 0000 0000 0000 00');
            expect(nativeElement.value).toBe('DE27 1007 7777 0209 2997 00');
            expect(nativeElement.selectionStart).toBe(27);
            expect(nativeElement.selectionEnd).toBe(27);
        });

        it('pasting with invalid country code', () => {
            createTestComponent(BasicIbanMaskComponent);

            let data = new DataTransfer();
            data.items.add('DE89370400440532013000', 'text/plain');
            let pasteEvent = new ClipboardEvent('paste', { clipboardData: data } as ClipboardEventInit);
            nativeElement.setSelectionRange(0, 2);
            nativeElement.dispatchEvent(pasteEvent);
            nativeElement.value = 'DE89370400440532013000';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(nativeElement.value).toBe('DE89 3704 0044 0532 0130 00');
            expect(nativeElement.selectionStart).toBe(27);
            expect(nativeElement.selectionEnd).toBe(27);

            data = new DataTransfer();
            data.items.add('DI27100777770209299700', 'text/plain');
            pasteEvent = new ClipboardEvent('paste', { clipboardData: data } as ClipboardEventInit);
            nativeElement.setSelectionRange(0, 27);
            nativeElement.dispatchEvent(pasteEvent);
            nativeElement.value = 'DI27100777770209299700';
            nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(maskInstance.mask).toBe('SS');
            expect(nativeElement.value).toBe('DI');
            expect(nativeElement.selectionStart).toBe(2);
            expect(nativeElement.selectionEnd).toBe(2);
        });
    });

    describe('validation', () => {
        it('should set nxIbanInvalidCountryError immediately for non-existing country code', () => {
            createTestComponent(FormIbanMaskComponent);
            expect(testInstance.testForm.controls.maskInput.getError('nxIbanInvalidCountryError')).toBeNull();

            assertInputValue(nativeElement, 'GD', 'GD');

            expect(testInstance.testForm.controls.maskInput.getError('nxIbanInvalidCountryError')).toBeTruthy();
            expect(testInstance.testForm.get('maskInput')!.value).toBe('GD');
        });

        it('should set nxIbanInvalidCountryError error for non-existing country code (on-blur validation mode)', () => {
            createTestComponent(FormIbanOnBlurMaskComponent);
            const maskInput = testInstance.testForm.controls.maskInput;
            const invalidIbanErrorKey = 'nxIbanInvalidCountryError';

            assertInputValue(nativeElement, 'G', 'G');
            fixture.detectChanges();
            expect(maskInput.getError(invalidIbanErrorKey)).toBeNull();

            assertInputValue(nativeElement, 'GD', 'GD');
            fixture.detectChanges();
            expect(maskInput.getError(invalidIbanErrorKey)).toBeNull();

            dispatchFakeEvent(nativeElement, 'blur');
            fixture.detectChanges();
            expect(maskInput.getError(invalidIbanErrorKey)).toBeTruthy();
        });

        // quick solution for getting the mask updated after entering the first two letters
        it('should set nxIbanParseError if iban is not valid', () => {
            createTestComponent(FormIbanMaskComponent);

            assertInputValue(nativeElement, 'DE89370400440532013001', 'DE89 3704 0044 0532 0130 01');
            expect(testInstance.testForm.controls.maskInput.getError('nxIbanParseError')).toBeTruthy();
            expect(testInstance.testForm.get('maskInput')!.value).toBe('DE89 3704 0044 0532 0130 01');

            assertInputValue(nativeElement, 'DE89370400440532013000', 'DE89 3704 0044 0532 0130 00');
            expect(testInstance.testForm.controls.maskInput.getError('nxIbanParseError')).toBeNull();
            expect(testInstance.testForm.get('maskInput')!.value).toBe('DE89 3704 0044 0532 0130 00');

            assertInputValue(nativeElement, 'DE89370400440532013002', 'DE89 3704 0044 0532 0130 02');
            expect(testInstance.testForm.controls.maskInput.getError('nxIbanParseError')).toBeTruthy();
            expect(testInstance.testForm.get('maskInput')!.value).toBe('DE89 3704 0044 0532 0130 02');
        });

        it('should not do iban valdation on mask validation turned off', () => {
            createTestComponent(FormIbanMaskComponent);
            expect(maskInstance.validateMask).toBeTrue();

            testInstance.validateMask = false;
            fixture.detectChanges();

            assertInputValue(nativeElement, 'GD', 'GD');

            expect(testInstance.testForm.valid).toBeTrue();
            expect(testInstance.testForm.get('maskInput')!.value).toBe('GD');

            // quick solution for getting the mask updated after entering the first to letters
            assertInputValue(nativeElement, 'DE', 'DE');
            assertInputValue(nativeElement, 'DE89370400440532013001', 'DE89 3704 0044 0532 0130 01');
            expect(testInstance.testForm.valid).toBeTrue();
            expect(testInstance.testForm.get('maskInput')!.value).toBe('DE89 3704 0044 0532 0130 01');

            assertInputValue(nativeElement, 'DE89370400440532013000', 'DE89 3704 0044 0532 0130 00');
            expect(testInstance.testForm.valid).toBeTrue();
            expect(testInstance.testForm.get('maskInput')!.value).toBe('DE89 3704 0044 0532 0130 00');

            assertInputValue(nativeElement, 'DE89370400440532013002', 'DE89 3704 0044 0532 0130 02');
            expect(testInstance.testForm.valid).toBeTrue();
            expect(testInstance.testForm.get('maskInput')!.value).toBe('DE89 3704 0044 0532 0130 02');
        });
    });

    describe('test real ibans', () => {
        it('test test-ibans from iban.js', () => {
            createTestComponent(FormIbanMaskComponent);

            testIban('AD1200012030200359100100', 'AD12 0001 2030 2003 5910 0100');
            testIban('AE070331234567890123456', 'AE07 0331 2345 6789 0123 456');
            testIban('AL47212110090000000235698741', 'AL47 2121 1009 0000 0002 3569 8741');
            testIban('AT611904300234573201', 'AT61 1904 3002 3457 3201');
            testIban('AZ21NABZ00000000137010001944', 'AZ21 NABZ 0000 0000 1370 1000 1944');
            testIban('BA391290079401028494', 'BA39 1290 0794 0102 8494');
            testIban('BE68539007547034', 'BE68 5390 0754 7034');
            testIban('BG80BNBG96611020345678', 'BG80 BNBG 9661 1020 3456 78');
            testIban('BH67BMAG00001299123456', 'BH67 BMAG 0000 1299 1234 56');
            testIban('BR9700360305000010009795493P1', 'BR97 0036 0305 0000 1000 9795 493P 1');
            testIban('BY13NBRB3600900000002Z00AB00', 'BY13 NBRB 3600 9000 0000 2Z00 AB00');
            testIban('CH9300762011623852957', 'CH93 0076 2011 6238 5295 7');
            testIban('CR72012300000171549015', 'CR72 0123 0000 0171 5490 15');
            testIban('CY17002001280000001200527600', 'CY17 0020 0128 0000 0012 0052 7600');
            testIban('CZ6508000000192000145399', 'CZ65 0800 0000 1920 0014 5399');
            testIban('DE89370400440532013000', 'DE89 3704 0044 0532 0130 00');
            testIban('DK5000400440116243', 'DK50 0040 0440 1162 43');
            testIban('DO28BAGR00000001212453611324', 'DO28 BAGR 0000 0001 2124 5361 1324');
            testIban('EE382200221020145685', 'EE38 2200 2210 2014 5685');
            testIban('ES9121000418450200051332', 'ES91 2100 0418 4502 0005 1332');
            testIban('FI2112345600000785', 'FI21 1234 5600 0007 85');
            testIban('FO6264600001631634', 'FO62 6460 0001 6316 34');
            testIban('FR1420041010050500013M02606', 'FR14 2004 1010 0505 0001 3M02 606');
            testIban('GB29NWBK60161331926819', 'GB29 NWBK 6016 1331 9268 19');
            testIban('GE29NB0000000101904917', 'GE29 NB00 0000 0101 9049 17');
            testIban('GI75NWBK000000007099453', 'GI75 NWBK 0000 0000 7099 453');
            testIban('GL8964710001000206', 'GL89 6471 0001 0002 06');
            testIban('GR1601101250000000012300695', 'GR16 0110 1250 0000 0001 2300 695');
            testIban('GT82TRAJ01020000001210029690', 'GT82 TRAJ 0102 0000 0012 1002 9690');
            testIban('HR1210010051863000160', 'HR12 1001 0051 8630 0016 0');
            testIban('HU42117730161111101800000000', 'HU42 1177 3016 1111 1018 0000 0000');
            testIban('IE29AIBK93115212345678', 'IE29 AIBK 9311 5212 3456 78');
            testIban('IL620108000000099999999', 'IL62 0108 0000 0009 9999 999');
            testIban('IS140159260076545510730339', 'IS14 0159 2600 7654 5510 7303 39');
            testIban('IT60X0542811101000000123456', 'IT60 X054 2811 1010 0000 0123 456');
            testIban('IQ98NBIQ850123456789012', 'IQ98 NBIQ 8501 2345 6789 012');
            testIban('JO15AAAA1234567890123456789012', 'JO15 AAAA 1234 5678 9012 3456 7890 12');
            testIban('KW81CBKU0000000000001234560101', 'KW81 CBKU 0000 0000 0000 1234 5601 01');
            testIban('KZ86125KZT5004100100', 'KZ86 125K ZT50 0410 0100');
            testIban('LB62099900000001001901229114', 'LB62 0999 0000 0001 0019 0122 9114');
            testIban('LC07HEMM000100010012001200013015', 'LC07 HEMM 0001 0001 0012 0012 0001 3015');
            testIban('LI21088100002324013AA', 'LI21 0881 0000 2324 013A A');
            testIban('LT121000011101001000', 'LT12 1000 0111 0100 1000');
            testIban('LU280019400644750000', 'LU28 0019 4006 4475 0000');
            testIban('LV80BANK0000435195001', 'LV80 BANK 0000 4351 9500 1');
            testIban('MC5811222000010123456789030', 'MC58 1122 2000 0101 2345 6789 030');
            testIban('MD24AG000225100013104168', 'MD24 AG00 0225 1000 1310 4168');
            testIban('ME25505000012345678951', 'ME25 5050 0001 2345 6789 51');
            testIban('MK07250120000058984', 'MK07 2501 2000 0058 984');
            testIban('MR1300020001010000123456753', 'MR13 0002 0001 0100 0012 3456 753');
            testIban('MT84MALT011000012345MTLCAST001S', 'MT84 MALT 0110 0001 2345 MTLC AST0 01S');
            testIban('MU17BOMM0101101030300200000MUR', 'MU17 BOMM 0101 1010 3030 0200 000M UR');
            testIban('NL91ABNA0417164300', 'NL91 ABNA 0417 1643 00');
            testIban('NO9386011117947', 'NO93 8601 1117 947');
            testIban('PK36SCBL0000001123456702', 'PK36 SCBL 0000 0011 2345 6702');
            testIban('PL61109010140000071219812874', 'PL61 1090 1014 0000 0712 1981 2874');
            testIban('PS92PALS000000000400123456702', 'PS92 PALS 0000 0000 0400 1234 5670 2');
            testIban('PT50000201231234567890154', 'PT50 0002 0123 1234 5678 9015 4');
            testIban('QA30AAAA123456789012345678901', 'QA30 AAAA 1234 5678 9012 3456 7890 1');
            testIban('RO49AAAA1B31007593840000', 'RO49 AAAA 1B31 0075 9384 0000');
            testIban('RS35260005601001611379', 'RS35 2600 0560 1001 6113 79');
            testIban('SA0380000000608010167519', 'SA03 8000 0000 6080 1016 7519');
            testIban('SC18SSCB11010000000000001497USD', 'SC18 SSCB 1101 0000 0000 0000 1497 USD');
            testIban('SE4550000000058398257466', 'SE45 5000 0000 0583 9825 7466');
            testIban('SI56263300012039086', 'SI56 2633 0001 2039 086');
            testIban('SK3112000000198742637541', 'SK31 1200 0000 1987 4263 7541');
            testIban('SM86U0322509800000000270100', 'SM86 U032 2509 8000 0000 0270 100');
            testIban('ST68000100010051845310112', 'ST68 0001 0001 0051 8453 1011 2');
            testIban('SV62CENR00000000000000700025', 'SV62 CENR 0000 0000 0000 0070 0025');
            testIban('TL380080012345678910157', 'TL38 0080 0123 4567 8910 157');
            testIban('TN5910006035183598478831', 'TN59 1000 6035 1835 9847 8831');
            testIban('TR330006100519786457841326', 'TR33 0006 1005 1978 6457 8413 26');
            testIban('UA511234567890123456789012345', 'UA51 1234 5678 9012 3456 7890 1234 5');
            testIban('VA59001123000012345678', 'VA59 0011 2300 0012 3456 78');
            testIban('VG96VPVG0000012345678901', 'VG96 VPVG 0000 0123 4567 8901');
            testIban('XK051212012345678906', 'XK05 1212 0123 4567 8906');

            // The following countries are not included in the official IBAN registry but use the IBAN specification
            testIban('AO69123456789012345678901', 'AO69 1234 5678 9012 3456 7890 1');
            testIban('BF2312345678901234567890123', 'BF23 1234 5678 9012 3456 7890 123');
            testIban('BI41123456789012', 'BI41 1234 5678 9012');
            testIban('BJ39123456789012345678901234', 'BJ39 1234 5678 9012 3456 7890 1234');
            testIban('CI70CI1234567890123456789012', 'CI70 CI12 3456 7890 1234 5678 9012');
            testIban('CM9012345678901234567890123', 'CM90 1234 5678 9012 3456 7890 123');
            testIban('CV30123456789012345678901', 'CV30 1234 5678 9012 3456 7890 1');
            testIban('DZ8612345678901234567890', 'DZ86 1234 5678 9012 3456 7890');
            testIban('IR861234568790123456789012', 'IR86 1234 5687 9012 3456 7890 12');
            testIban('MG1812345678901234567890123', 'MG18 1234 5678 9012 3456 7890 123');
            testIban('ML15A12345678901234567890123', 'ML15 A123 4567 8901 2345 6789 0123');
            testIban('MZ25123456789012345678901', 'MZ25 1234 5678 9012 3456 7890 1');
            testIban('SN52A12345678901234567890123', 'SN52 A123 4567 8901 2345 6789 0123');
        });
    });
});

@Component({
    template: `<input nxMask nxIbanMask />`,
})
class BasicIbanMaskComponent extends IbanMaskTest {}

@Component({
    template: `
        <form [formGroup]="testForm">
            <input nxMask nxIbanMask formControlName="maskInput" [validateMask]="validateMask" />
        </form>
    `,
})
class FormIbanMaskComponent extends IbanMaskTest {}

@Component({
    template: `
        <form [formGroup]="testForm">
            <input nxMask nxIbanMask formControlName="maskInput" [validateMask]="validateMask" />
        </form>
    `,
})
class FormWithInitalIbanMaskComponent extends IbanMaskTest {
    testForm: FormGroup = new FormGroup({
        maskInput: new FormControl('NL91 ABNA 0417 1643 00', {}),
    });
}

@Component({
    template: `
        <form [formGroup]="testForm">
            <input nxMask nxIbanMask formControlName="maskInput" [validateMask]="validateMask" />
        </form>
    `,
})
class FormIbanOnBlurMaskComponent extends IbanMaskTest {
    testForm: FormGroup = new FormGroup({
        maskInput: new FormControl('', { updateOn: 'blur' }),
    });
}
