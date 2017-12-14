import TestUtils from 'js-test-buddy';
import FormValidation, { defaultOptions } from '../src';

describe('module', () => {

    it('it is a function', () => {
        expect(typeof FormValidation).toBe('function');
    });

});


describe('initialising', () => {

    it('validation module should throw if form name or node not passed', () => {

        // Act & Assert
        expect(() => {
            new FormValidation();
        }).toThrow();

    });

    it('validation module should be defined', () => {

        // Arrange
        document.body.innerHTML = '<form></form>';
        const form = document.querySelector('form');

        // Act
        const validateForm = new FormValidation(form);

        // Assert
        expect(validateForm).toBeDefined();

    });

    it('validation module should throw an exception when passing a non form dom node', () => {

        // Arrange
        document.body.innerHTML = '<p></p>';
        const p = document.querySelector('p');

        // Act & Assert
        expect(() => {
            new FormValidation(p);
        }).toThrow();

    });

    it('validation module should return object when passing a form dom node', () => {

        // Arrange
        document.body.innerHTML = '<form></form>';
        const form = document.querySelector('form');

        // Act
        const validateForm = new FormValidation(form);

        // Assert
        expect(typeof validateForm).toBe('object');

    });

    it('validation module should return object when passing a string', () => {

        // Arrange
        document.body.innerHTML = '<form name="formName"></form>';

        // Act
        const validateForm = new FormValidation('formName');

        // Assert
        expect(typeof validateForm).toBe('object');

    });

    it('validation module should register a form field within a form', () => {

        // Arrange
        document.body.innerHTML = '<form name="formName"><input /></form>';

        // Act
        const validateForm = new FormValidation('formName');

        // Assert
        expect(validateForm.fields).toHaveLength(1);

    });

    it('validation module should register multiple form fields within a form', () => {

        // Arrange
        document.body.innerHTML = '<form name="formName"><input /><input /></form>';

        // Act
        const validateForm = new FormValidation('formName');

        // Assert
        expect(validateForm.fields).toHaveLength(2);

    });

    it('validation module should only register form fields within the form specified', () => {

        // Arrange
        document.body.innerHTML = `<form name="formName">
                                        <input value="x" />
                                    </form>
                                    <input value="💩" />`;

        // Act
        const validateForm = new FormValidation('formName');

        // Assert
        expect(validateForm.fields).toHaveLength(1);
        expect(validateForm.fields[0].value).toBe('x');

    });


});

describe('options', () => {

    it('options default value is of type object', () => {

        // Arrange
        document.body.innerHTML = '<form></form>';
        const form = document.querySelector('form');

        // Act
        const validateForm = new FormValidation(form);

        // Assert
        expect(typeof validateForm.options).toBe('object')

    });

    it('passed options is assigned to validation module options', () => {

        // Arrange
        document.body.innerHTML = '<form></form>';
        const form = document.querySelector('form');
        const focus = true;
        const options = {focus};

        // Act
        const validateForm = new FormValidation(form, options);

        // Assert
        expect(validateForm.options).toHaveProperty('focus', true);

    });

    it('passed options should be assigned to default options', () => {

        // Arrange
        document.body.innerHTML = '<form></form>';
        const form = document.querySelector('form');
        const focus = true;
        const options = {focus};

        // Act
        const validateForm = new FormValidation(form, options);

        // Assert
        expect(validateForm.options).toEqual({
            ...defaultOptions,
            focus
        })

    });

    it('should not fail if null is passed as option argument', () => {

        // Arrange
        document.body.innerHTML = '<form></form>';
        const form = document.querySelector('form');
        const options = null;

        // Act
        const validateForm = new FormValidation(form, options);

        // Assert
        expect(validateForm.options).toEqual(defaultOptions)

    });

    it('should not fail if undefined is passed as option argument', () => {

        // Arrange
        document.body.innerHTML = '<form></form>';
        const form = document.querySelector('form');
        const options = undefined;

        // Act
        const validateForm = new FormValidation(form, options);

        // Assert
        expect(validateForm.options).toEqual(defaultOptions)

    });

});

describe('validation tests', () => {

    it('an empty form should return valid', () => {

        // Arrange
        document.body.innerHTML = '<form></form>';
        const form = document.querySelector('form');

        // Act
        const validateForm = new FormValidation(form);
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(true);

    });

    describe('required fields', () => {

        describe('input', () => {

            it('should return invalid for a required input with no value', () => {

                // Arrange
                document.body.innerHTML = '<form><input required /></form>';
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should return invalid for a required input with no value (data-attribute)', () => {

                // Arrange
                document.body.innerHTML = '<form><input data-required /></form>';
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should validate a required input with a value', () => {

                // Arrange
                document.body.innerHTML = '<form><input value="x" data-required /></form>';
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(true);

            });

        });

    });

});
