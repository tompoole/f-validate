import TestUtils from 'js-test-buddy';
import FormValidation from '../../src';


describe('matches fields', () => {

    it('should return invalid for a field with "equalto" attribute, that does not match value of specified field', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                <input data-val-equalto="matchedField" value="match" />
                <input name="matchedField" value="doesNotMatch" />
                </form>`);
        const form = document.querySelector('form');
        const validateForm = new FormValidation(form);

        // Act
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(false);

    });

    it('should return invalid for a field with "equalto" attribute, that matches value, but field is not specified', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                <input data-val-equalto value="match" />
                <input name="matchedField" value="match" />
                </form>`);
        const form = document.querySelector('form');
        const validateForm = new FormValidation(form);

        // Act
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(false);

    });

    it('should return invalid for a field with "equalto" attribute, that does matches value, but field does not exist', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                <input data-val-equalto="matchedField" value="match" />
                </form>`);
        const form = document.querySelector('form');
        const validateForm = new FormValidation(form);

        // Act
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(false);

    });

    it('should return valid for a field with "equalto" attribute, that does match value of specified field', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                <input data-val-equalto="matchedField" value="match" />
                <input name="matchedField" value="match" />
                </form>`);
        const form = document.querySelector('form');
        const validateForm = new FormValidation(form);

        // Act
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(true);

    });

});
