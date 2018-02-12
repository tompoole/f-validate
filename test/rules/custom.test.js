import TestUtils from 'js-test-buddy';
import FormValidation from '../../src';

describe('custom validation rules', () => {
    it('should return valid for a field custom attribute, where method returns true', () => {
        // Arrange
        const customMethod = () => true;
        TestUtils.setBodyHtml(`<form>
                                    <input data-val-custom="customRule" value="match" />
                                </form>`);
        const form = document.querySelector('form');
        const validateForm = new FormValidation(form);
        validateForm.addCustomValidation('customRule', customMethod);

        // Act
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(true);
    });

    it('should return invalid for a field custom attribute, where method returns false', () => {
        // Arrange
        const customMethod = () => false;
        TestUtils.setBodyHtml(`<form>
                                    <input data-val-custom="customRule" value="match" />
                                </form>`);
        const form = document.querySelector('form');
        const validateForm = new FormValidation(form);
        validateForm.addCustomValidation('customRule', customMethod);

        // Act
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(false);
    });

    it('should throw error when "data-val-custom-error" attribute has been specified but "data-val-custom" attribute has not', () => {
        // Arrange
        TestUtils.setBodyHtml(`<form>
                                    <input data-val-custom-error="custom error message" value="match" />
                                </form>`);
        const form = document.querySelector('form');

        // Act
        const validateForm = new FormValidation(form);

        // Assert
        expect(() => {
            validateForm.isValid();
        }).toThrowError(
            'f-validate: specify data-val-custom along with data-val-custom-error attribute'
        );
    });
});
