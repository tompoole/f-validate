import TestUtils from 'js-test-buddy';
import FormValidation from '../../src';
import testDefinitions from '../../src/rules';

it('an empty form should return valid', () => {
    // Arrange
    TestUtils.setBodyHtml('<form></form>');
    const form = document.querySelector('form');
    const validateForm = new FormValidation(form);

    // Act
    const isFormValid = validateForm.isValid();

    // Assert
    expect(isFormValid).toBe(true);
});

describe('multiple rules', () => {
    it('should retain error class when a field has other rules that run afterwards which are valid', () => {
        // Arrange
        TestUtils.setBodyHtml(`<form>
                                    <input maxlength="6" pattern="[a-zA-Z]+" value="testFail" />
                                </form>`);
        const form = document.querySelector('form');
        const validateForm = new FormValidation(form);

        // Act
        validateForm.isValid();

        // Assert
        const html = TestUtils.getBodyHtml();
        expect(html).toMatchSnapshot();
    });
});

describe('rule definitions', () => {
    it('required rule should exist', () => {
        expect(testDefinitions).toHaveProperty('required');
    });

    it('maxlength rule should exist', () => {
        expect(testDefinitions).toHaveProperty('maxlength');
    });

    it('minlength rule should exist', () => {
        expect(testDefinitions).toHaveProperty('minlength');
    });

    it('pattern rule should exist', () => {
        expect(testDefinitions).toHaveProperty('pattern');
    });

    it('email rule should exist', () => {
        expect(testDefinitions).toHaveProperty('email');
    });

    it('matches rule should exist', () => {
        expect(testDefinitions).toHaveProperty('matches');
    });

    it('dateInFuture rule should exist', () => {
        expect(testDefinitions).toHaveProperty('dateInFuture');
    });

    it('conditionalRequired rule should exist', () => {
        expect(testDefinitions).toHaveProperty('conditionalRequired');
    });

    it('custom rule should exist', () => {
        expect(testDefinitions).toHaveProperty('custom');
    });
});

describe('rule structure', () => {
    const definitionKeys = Object.keys(testDefinitions);

    it('Each rule definition should have a "condition" property', () => {
        definitionKeys.forEach(key => {
            expect(testDefinitions[key]).toHaveProperty('condition');
        });
    });

    it('Each rule definition should have a "test" property', () => {
        definitionKeys.forEach(key => {
            expect(testDefinitions[key]).toHaveProperty('test');
        });
    });

    it('Each rule definition should have a "defaultMessage" property', () => {
        definitionKeys.forEach(key => {
            expect(testDefinitions[key]).toHaveProperty('defaultMessage');
        });
    });
});
