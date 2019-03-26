import TestUtils from 'js-test-buddy';
import FormValidation from '../../src';


describe('email validation rules', () => {

    it('should return invalid for a field of type email with invalid email address', () => {

        // Arrange
        TestUtils.setBodyHtml('<form><input type="email" value="invalidEmailFormat" /></form>');
        const form = document.querySelector('form');
        const validateForm = new FormValidation(form);

        // Act
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(false);

    });

    it('should return invalid for a field of type email with invalid email address', () => {

        // Arrange
        TestUtils.setBodyHtml('<form><input type="email" value=`invalid@test` /></form>');
        const form = document.querySelector('form');
        const validateForm = new FormValidation(form);

        // Act
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(false);

    });

    it('should return invalid for a field of type email with invalid email address', () => {

        // Arrange
        TestUtils.setBodyHtml('<form><input type="email" value="@test.com" /></form>');
        const form = document.querySelector('form');
        const validateForm = new FormValidation(form);

        // Act
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(false);

    });

    it('should return valid for a field of type email with valid email address', () => {

        // Arrange
        TestUtils.setBodyHtml('<form><input type="email" value="valid@test.com" /></form>');
        const form = document.querySelector('form');
        const validateForm = new FormValidation(form);

        // Act
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(true);

    });

    it('should return valid for a field of type email with no value specified', () => {

        // Arrange
        TestUtils.setBodyHtml('<form><input type="email" value="" /></form>');
        const form = document.querySelector('form');
        const validateForm = new FormValidation(form);

        // Act
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(true);

    });


    it('should return valid for a field of type email with a custom regex and valid email address', () => {

        // Arrange
        TestUtils.setBodyHtml('<form><input type="email" value="test@just-eat.com" /></form>');
        const form = document.querySelector('form');
        const validateForm = new FormValidation(form, {
            customEmailRegex: /[a-z]+@just-eat\.com/
        });

        // Act
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(true);

    });

    it('should return invalid for a field of type email with a custom regex and invalid email address', () => {

        // Arrange
        TestUtils.setBodyHtml('<form><input type="email" value="test@gmail.com" /></form>');
        const form = document.querySelector('form');
        const validateForm = new FormValidation(form, {
            customEmailRegex: /[a-z]+@just-eat\.com/
        });

        // Act
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(false);

    });

    it('should still validate email if a non-regex customEmailRegex value is provided', () => {

        // Arrange
        TestUtils.setBodyHtml('<form><input type="email" value="not_a_valid_email" /></form>');
        const form = document.querySelector('form');
        const validateForm = new FormValidation(form, {
            customEmailRegex: 'totally-not-a-regex'
        });

        // Act
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(false);

    });

});
