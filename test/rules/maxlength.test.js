import TestUtils from 'js-test-buddy';
import FormValidation from '../../src';


describe('maxlength fields', () => {

    describe('input', () => {

        it('should return invalid for an input with value more than the specified maxlength value', () => {

            // Arrange
            TestUtils.setBodyHtml('<form><input maxlength="6" value="testData" /></form>');
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(false);

        });

        it('should return invalid for an input with value more than the specified maxlength data-attribute value', () => {

            // Arrange
            TestUtils.setBodyHtml('<form><input data-val-maxlength="6" value="testData" /></form>');
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(false);

        });

        it('should return valid for input where the value length is less than the specified maxlength', () => {

            // Arrange
            TestUtils.setBodyHtml('<form><input maxlength="6" value="test" /></form>');
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(true);

        });

    });

    describe('textarea', () => {

        it('should return invalid for a textarea with value more than the specified maxlength value', () => {

            // Arrange
            TestUtils.setBodyHtml('<form><textarea maxlength="6">testData</textarea></form>');
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(false);

        });

        it('should return invalid for a textarea with value more than the specified maxlength data-attribute value', () => {

            // Arrange
            TestUtils.setBodyHtml('<form><textarea data-val-maxlength="6">testData</textarea></form>');
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(false);

        });

        it('should return valid for textarea where the value length is less than the specified maxlength', () => {

            // Arrange
            TestUtils.setBodyHtml('<form><textarea maxlength="6">test</textarea></form>');
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(true);

        });

    });

});
