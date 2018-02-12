import TestUtils from 'js-test-buddy';
import FormValidation from '../../src';

describe('required fields', () => {
    describe('input', () => {
        it('should not validate a hidden field', () => {
            // Arrange
            TestUtils.setBodyHtml('<form><input required type="hidden" /></form>');
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(true);
        });

        it('should not validate a disabled field', () => {
            // Arrange
            TestUtils.setBodyHtml('<form><input required disabled /></form>');
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(true);
        });

        it('should not validate a field with attribute data-novalidate', () => {
            // Arrange
            TestUtils.setBodyHtml('<form><input required data-novalidate /></form>');
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(true);
        });

        it('should return invalid for a required input with no value', () => {
            // Arrange
            TestUtils.setBodyHtml('<form><input required /></form>');
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(false);
        });

        it('should return invalid for a required input with no value (data-attribute)', () => {
            // Arrange
            TestUtils.setBodyHtml('<form><input data-val-required /></form>');
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(false);
        });

        it('should validate a required input with a value', () => {
            // Arrange
            TestUtils.setBodyHtml('<form><input value="x" data-val-required /></form>');
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(true);
        });
    });

    describe('select', () => {
        it('should not validate a disabled field', () => {
            // Arrange
            TestUtils.setBodyHtml(`<form>
                                        <select required disabled>
                                            <option value="">Please select an option</option>
                                            <option value="x">X</option>
                                        </select>
                                    </form>`);
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(true);
        });

        it('should return invalid for a required select with no value', () => {
            // Arrange
            TestUtils.setBodyHtml(`<form>
                                        <select required>
                                            <option value="">Please select an option</option>
                                            <option value="x">X</option>
                                        </select>
                                    </form>`);
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(false);
        });

        it('should return invalid for a required select with no value', () => {
            // Arrange
            TestUtils.setBodyHtml(`<form>
                                        <select required>
                                            <option value="">Please select an option</option>
                                            <option value="x" selected>X</option>
                                        </select>
                                    </form>`);
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(true);
        });

        it('should return invalid for a required select with no value (data-attribute)', () => {
            // Arrange
            TestUtils.setBodyHtml(`<form>
                                        <select data-val-required>
                                            <option value="">Please select an option</option>
                                            <option value="x" selected>X</option>
                                        </select>
                                    </form>`);
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(true);
        });
    });

    describe('textarea', () => {
        it('should return invalid for a required textarea with no value', () => {
            // Arrange
            TestUtils.setBodyHtml(`<form>
                                        <textarea required></textarea>
                                    </form>`);
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(false);
        });

        it('should return invalid for a required textarea with no value (data-attribute)', () => {
            // Arrange
            TestUtils.setBodyHtml(`<form>
                                        <textarea data-val-required></textarea>
                                    </form>`);
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(false);
        });

        it('should validate a required textarea with a value', () => {
            // Arrange
            TestUtils.setBodyHtml(`<form>
                                        <textarea data-val-required>x</textarea>
                                    </form>`);
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(true);
        });
    });

    describe('radio', () => {
        it('should return invalid for a required radio button which has not been checked', () => {
            // Arrange
            TestUtils.setBodyHtml(`<form>
                                        <input name="test" type="radio" required />
                                        <input name="test" type="radio" />
                                    </form>`);
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(false);
        });

        it('should return invalid for a required radio button which has not been checked (data-attribute)', () => {
            // Arrange
            TestUtils.setBodyHtml(`<form>
                                        <input name="test" type="radio" data-val-required />
                                        <input name="test" type="radio" />
                                    </form>`);
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(false);
        });

        it('should validate a required radio button which has been checked', () => {
            // Arrange
            TestUtils.setBodyHtml(`<form>
                                        <input name="test" type="radio" required checked />
                                        <input name="test" type="radio" />
                                    </form>`);
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(true);
        });

        it('should validate a radio button group marked as required which another button in the group has been checked', () => {
            // Arrange
            TestUtils.setBodyHtml(`<form>
                                        <input name="test" type="radio" required />
                                        <input name="test" type="radio" checked />
                                    </form>`);
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(true);
        });
    });

    describe('checkbox', () => {
        it('should return invalid for a required checkbox which has not been checked', () => {
            // Arrange
            TestUtils.setBodyHtml(
                '<form><input name="test" type="checkbox" required /></form>'
            );
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(false);
        });

        it('should return invalid for a required checkbox which has not been checked (data-attribute)', () => {
            // Arrange
            TestUtils.setBodyHtml(
                '<form><input name="test" type="checkbox" data-val-required /></form>'
            );
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(false);
        });

        it('should validate a required checkbox which has been checked', () => {
            // Arrange
            TestUtils.setBodyHtml(
                '<form><input name="test" type="checkbox" required checked /></form>'
            );
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(true);
        });

        it('should validate a required checkbox which has been checked when there are multiple checkboxes in the form', () => {
            // Arrange
            TestUtils.setBodyHtml(`<form>
                                        <input name="test" type="checkbox" />
                                        <input name="test" type="checkbox" required checked />
                                    </form>`);
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(true);
        });
    });
});
