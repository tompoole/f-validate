import TestUtils from 'js-test-buddy';
import FormValidation from '../../src';


describe('pattern fields', () => {

    describe('input', () => {

        it('should return invalid for an input with an empty pattern attribute', () => {

            // Arrange
            TestUtils.setBodyHtml('<form><input pattern="" value="test" /></form>');
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(false);

        });

        it('should return invalid for an input with an empty pattern attribute (data-attribute)', () => {

            // Arrange
            TestUtils.setBodyHtml('<form><input pattern="" value="test" /></form>');
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(false);

        });

        it('should return valid when the value of the input matches the pattern specified', () => {

            // Arrange
            TestUtils.setBodyHtml('<form><input pattern="[a-z]{1,6}" value="test" /></form>');
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(true);

        });

        it('should return invalid when the value of the input doesn\'t match the pattern specified', () => {

            // Arrange
            TestUtils.setBodyHtml('<form><input pattern="[a-z]{1,6}" value="testData1" /></form>');
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(false);

        });

        it('should return valid when a pattern is specified but no value has been entered', () => {

            // Arrange
            TestUtils.setBodyHtml('<form><input pattern="[a-z]{1,6}" value="" /></form>');
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(true);

        });

    });

});
