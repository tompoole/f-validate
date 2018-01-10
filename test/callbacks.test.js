import TestUtils from 'js-test-buddy';
import FormValidation from '../src';

describe('success callbacks', () => {

    it('should have no success callbacks when initialised', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');

        // Act
        const validateForm = new FormValidation(form);

        // Assert
        expect(validateForm.callBacks.success).toBeUndefined();

    });

    it('should allow success callbacks to be added', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');
        const onSuccess = jest.fn();

        // Act
        const validateForm = new FormValidation(form);
        validateForm.on('success', onSuccess);

        // Assert
        expect(validateForm.callBacks.success.length).toBe(1);

    });

    it('should throw exception when string type success callbacks options are specified', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');
        const onSuccess = 'STRING';
        const options = { onSuccess };

        // Act & Assert
        expect(() => {
            new FormValidation(form, options); // eslint-disable-line no-new
        }).toThrow();

    });

    it('should throw exception when array type success callbacks options are specified', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');
        const onSuccess = [];
        const options = { onSuccess };

        // Act & Assert
        expect(() => {
            new FormValidation(form, options); // eslint-disable-line no-new
        }).toThrow();

    });

    it('should throw exception when object type success callbacks options are specified', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');
        const onSuccess = {};
        const options = { onSuccess };

        // Act & Assert
        expect(() => {
            new FormValidation(form, options); // eslint-disable-line no-new
        }).toThrow();

    });

    it('should throw exception when string type success callbacks are added', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');
        const onSuccess = 'STRING';
        const formValidation = new FormValidation(form);

        // Act & Assert
        expect(() => {
            formValidation.on('success', onSuccess); // eslint-disable-line no-new
        }).toThrow();

    });

    it('should throw exception when array type success callbacks are added', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');
        const onSuccess = [];
        const formValidation = new FormValidation(form);

        // Act & Assert
        expect(() => {
            formValidation.on('success', onSuccess); // eslint-disable-line no-new
        }).toThrow();

    });

    it('should throw exception when object type success callbacks are added', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');
        const onSuccess = {};
        const formValidation = new FormValidation(form);

        // Act & Assert
        expect(() => {
            formValidation.on('success', onSuccess); // eslint-disable-line no-new
        }).toThrow();

    });

    it('should throw exception when null type success callbacks are added', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');
        const onSuccess = null;
        const formValidation = new FormValidation(form);

        // Act & Assert
        expect(() => {
            formValidation.on('success', onSuccess); // eslint-disable-line no-new
        }).toThrow();

    });

    it('should call success callback on success', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');
        const onSuccess = jest.fn();
        const options = { onSuccess };

        // Act
        const validateForm = new FormValidation(form, options);
        validateForm.isValid();

        // Assert
        expect(onSuccess.mock.calls.length).toBe(1);
    });

    it('should not call success callback on error', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                        <input required />
                                    </form>`);
        const form = document.querySelector('form');
        const onSuccess = jest.fn();
        const options = { onSuccess };

        // Act
        const validateForm = new FormValidation(form, options);
        validateForm.isValid();

        // Assert
        expect(onSuccess.mock.calls.length).toBe(0);
    });

    it('should call success callback when state changes to valid', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                        <input required />                        
                                    </form>`);
        const form = document.querySelector('form');
        const input = form.querySelector('input');
        const onSuccess = jest.fn();
        const options = { onSuccess };

        // Act
        const validateForm = new FormValidation(form, options);
        validateForm.isValid();
        input.value = 'x';
        validateForm.isValid();

        // Assert
        expect(onSuccess.mock.calls.length).toBe(1);

    });

});

describe('error callbacks', () => {

    it('should have no error callbacks when initialised', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');

        // Act
        const validateForm = new FormValidation(form);

        // Assert
        expect(validateForm.callBacks.error).toBeUndefined();

    });

    it('should allow error callbacks to be added', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');
        const onError = jest.fn();

        // Act
        const validateForm = new FormValidation(form);
        validateForm.on('error', onError);

        // Assert
        expect(validateForm.callBacks.error.length).toBe(1);

    });

    it('should throw exception when string type error callbacks options are specified', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');
        const onError = 'STRING';
        const options = { onError };

        // Act & Assert
        expect(() => {
            new FormValidation(form, options); // eslint-disable-line no-new
        }).toThrow();

    });

    it('should throw exception when array type error callbacks options are specified', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');
        const onError = [];
        const options = { onError };

        // Act & Assert
        expect(() => {
            new FormValidation(form, options); // eslint-disable-line no-new
        }).toThrow();

    });

    it('should throw exception when object type error callbacks options are specified', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');
        const onError = {};
        const options = { onError };

        // Act & Assert
        expect(() => {
            new FormValidation(form, options); // eslint-disable-line no-new
        }).toThrow();

    });

    it('should throw exception when string type error callbacks are added', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');
        const onError = 'STRING';
        const formValidation = new FormValidation(form);

        // Act & Assert
        expect(() => {
            formValidation.on('success', onError); // eslint-disable-line no-new
        }).toThrow();

    });

    it('should throw exception when array type error callbacks are added', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');
        const onError = [];
        const formValidation = new FormValidation(form);

        // Act & Assert
        expect(() => {
            formValidation.on('success', onError); // eslint-disable-line no-new
        }).toThrow();

    });

    it('should throw exception when object type error callbacks are added', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');
        const onError = {};
        const formValidation = new FormValidation(form);

        // Act & Assert
        expect(() => {
            formValidation.on('success', onError); // eslint-disable-line no-new
        }).toThrow();

    });

    it('should throw exception when null type error callbacks are added', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');
        const onError = null;
        const formValidation = new FormValidation(form);

        // Act & Assert
        expect(() => {
            formValidation.on('success', onError); // eslint-disable-line no-new
        }).toThrow();

    });

    it('should call error callback on error', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                        <input required />                        
                                    </form>`);
        const form = document.querySelector('form');
        const onError = jest.fn();
        const options = { onError };

        // Act
        const validateForm = new FormValidation(form, options);
        validateForm.isValid();

        // Assert
        expect(onError.mock.calls.length).toBe(1);
    });

    it('should not call error callback on success', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');
        const onError = jest.fn();
        const options = { onError };

        // Act
        const validateForm = new FormValidation(form, options);
        validateForm.isValid();

        // Assert
        expect(onError.mock.calls.length).toBe(0);
    });

    it('should call error callback when state changes to invalid', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                        <input required value="x" />                        
                                    </form>`);
        const form = document.querySelector('form');
        const input = form.querySelector('input');
        const onError = jest.fn();
        const options = { onError };

        // Act
        const validateForm = new FormValidation(form, options);
        validateForm.isValid();
        input.value = '';
        validateForm.isValid();

        // Assert
        expect(onError.mock.calls.length).toBe(1);

    });

});

describe('multiple callbacks', () => {

    it('should call all multiple success callbacks on success', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');
        const onSuccess = jest.fn();
        const onSuccessAdded1 = jest.fn();
        const onSuccessAdded2 = jest.fn();
        const options = { onSuccess };

        // Act
        const validateForm = new FormValidation(form, options);
        validateForm.on('success', onSuccessAdded1);
        validateForm.on('success', onSuccessAdded2);
        validateForm.isValid();

        // Assert
        expect(onSuccess.mock.calls.length).toBe(1);
        expect(onSuccessAdded1.mock.calls.length).toBe(1);
        expect(onSuccessAdded2.mock.calls.length).toBe(1);

    });

    it('should call all multiple error callbacks on error', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                        <input required />                        
                                    </form>`);
        const form = document.querySelector('form');
        const onError = jest.fn();
        const onErrorAdded1 = jest.fn();
        const onErrorAdded2 = jest.fn();
        const options = { onError };

        // Act
        const validateForm = new FormValidation(form, options);
        validateForm.on('error', onErrorAdded1);
        validateForm.on('error', onErrorAdded2);
        validateForm.isValid();

        // Assert
        expect(onError.mock.calls.length).toBe(1);
        expect(onErrorAdded1.mock.calls.length).toBe(1);
        expect(onErrorAdded2.mock.calls.length).toBe(1);

    });

});
