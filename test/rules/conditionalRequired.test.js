import TestUtils from 'js-test-buddy';
import FormValidation from '../../src';

describe('conditionalRequired', () => {

    it('should return invalid if `data-val-conditionalRequired` field is not checked, and current field is empty', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                <input data-val-conditionalRequired="nameOfcheckedInput" value="" />
                <input type="checkbox" name="nameOfcheckedInput" />
                </form>`);
        const form = document.querySelector('form');

        // Act
        const validateForm = new FormValidation(form);
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(false);

    });

    it('should return valid if `data-val-conditionalRequired` field is not checked, and current field is not empty', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                <input data-val-conditionalRequired="nameOfcheckedInput" value="test" />
                <input type="checkbox" name="nameOfcheckedInput" />
                </form>`);
        const form = document.querySelector('form');

        // Act
        const validateForm = new FormValidation(form);
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(true);

    });

    it('should return valid if `data-val-conditionalRequired` field is checked, and current field is not empty', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                <input data-val-conditionalRequired="nameOfcheckedInput" value="test" />
                <input type="checkbox" name="nameOfcheckedInput" checked />
                </form>`);
        const form = document.querySelector('form');

        // Act
        const validateForm = new FormValidation(form);
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(true);

    });

    it('should return valid if `data-val-conditionalRequired` field is checked, and current field is empty', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                <input data-val-conditionalRequired="nameOfcheckedInput" value="" />
                <input type="checkbox" name="nameOfcheckedInput" checked />
                </form>`);
        const form = document.querySelector('form');

        // Act
        const validateForm = new FormValidation(form);
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(true);

    });

    it('should return valid if dependent input is not found', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                <input data-val-conditionalRequired="nameOfcheckedInput" value="" />
                </form>`);
        const form = document.querySelector('form');

        // Act
        const validateForm = new FormValidation(form);
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(true);

    });

    it('should return invalid if the value property only contains spaces', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                <input data-val-conditionalRequired="nameOfcheckedInput" value=" " />
                <input type="checkbox" name="nameOfcheckedInput" />
                </form>`);
        const form = document.querySelector('form');

        // Act
        const validateForm = new FormValidation(form);
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(false);

    });


});
