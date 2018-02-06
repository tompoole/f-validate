import CONSTANTS from '../src/constants';

describe('CONSTANTS', () => {

    it('should contain component classes', () => {

        expect(CONSTANTS.cssClasses).toHaveProperty('isHidden', 'is-hidden');
        expect(CONSTANTS.cssClasses).toHaveProperty('formError', 'form-error');
        expect(CONSTANTS.cssClasses).toHaveProperty('formErrors', 'form-errors');
        expect(CONSTANTS.cssClasses).toHaveProperty('hasError', 'has-error');
        expect(CONSTANTS.cssClasses).toHaveProperty('hasSuccess', 'has-success');
        expect(CONSTANTS.cssClasses).toHaveProperty('validationGroup', 'validation-group');

    });

    it('should contain email regex', () => {
        expect(CONSTANTS.email).toEqual(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    });

    it('should contain escapeChars regex', () => {
        expect(CONSTANTS.escapeChars).toEqual(/[|\\{}()[\]^$+*?.]/g);
    });

    it('should contain fieldValues', () => {
        const values = CONSTANTS.fieldValues.split(', ');

        expect(values).toContain('input');
        expect(values).toContain('select');
        expect(values).toContain('textarea');
        expect(values).toContain('.validation-group');
    });

    it('should contain blur and keyup within validateOnOptions', () => {
        expect(CONSTANTS.validateOnOptions).toContain('blur');
        expect(CONSTANTS.validateOnOptions).toContain('keyup');
    });

});
