import TestUtils from 'js-test-buddy';
import FormValidation from '../../src';


describe('minlength fields', () => {

    describe('input', () => {

        it('should return valid for an input with no value', () => {

            // Arrange
            TestUtils.setBodyHtml('<form><input minlength="6" /></form>');
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(true);

        });

        it('should return invalid for an input with value less than the specified minlength value', () => {

            // Arrange
            TestUtils.setBodyHtml('<form><input minlength="6" value="test" /></form>');
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(false);

        });

        it('should return invalid for an input with value less than the specified minlength data-attribute value', () => {

            // Arrange
            TestUtils.setBodyHtml('<form><input data-val-minlength="6" value="test" /></form>');
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(false);

        });

        it('should return valid for input where the values length is more than the specified minlength', () => {

            // Arrange
            TestUtils.setBodyHtml('<form><input minlength="6" value="testData" /></form>');
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(true);

        });

    });

    describe('textarea', () => {

        it('should return valid for a textarea with no value', () => {

            // Arrange
            TestUtils.setBodyHtml('<form><textarea minlength="6"></textarea></form>');
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(true);

        });

        it('should return invalid for a textarea with value less than the specified minlength value', () => {

            // Arrange
            TestUtils.setBodyHtml('<form><textarea minlength="6">test</textarea></form>');
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(false);

        });

        it('should return invalid for a textarea with value less than the specified minlength data-attribute value', () => {

            // Arrange
            TestUtils.setBodyHtml('<form><textarea data-val-minlength="6">test</textarea></form>');
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(false);

        });

        it('should return valid for textarea where the values length is more than the specified minlength', () => {

            // Arrange
            TestUtils.setBodyHtml('<form><textarea minlength="6">testData</textarea></form>');
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(true);

        });

        it('should return valid if minlength attribute is set with no value', () => {

            // Arrange
            TestUtils.setBodyHtml('<form><input type="text" data-val-minlength /></form>');

            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(true);

        });

    });

});
