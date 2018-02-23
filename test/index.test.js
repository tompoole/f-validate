import TestUtils from 'js-test-buddy';
import FormValidation, { defaultOptions } from '../src';

describe('module', () => {

    it('it is a function', () => {
        expect(typeof FormValidation).toBe('function');
    });

});

describe('initialising', () => {

    it('validation module should throw if form name or node not passed', () => {

        // Act & Assert
        expect(() => {
            new FormValidation(); // eslint-disable-line no-new
        }).toThrow();

    });

    it('validation module should be defined', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');

        // Act
        const validateForm = new FormValidation(form);

        // Assert
        expect(validateForm).toBeDefined();

    });

    it('validation module should throw an exception when passing a non form dom node', () => {

        // Arrange
        TestUtils.setBodyHtml('<p></p>');
        const p = document.querySelector('p');

        // Act & Assert
        expect(() => {
            new FormValidation(p); // eslint-disable-line no-new
        }).toThrow();

    });

    it('validation module should return object when passing a form dom node', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');

        // Act
        const validateForm = new FormValidation(form);

        // Assert
        expect(typeof validateForm).toBe('object');

    });

    it('validation module should return object when passing a string', () => {

        // Arrange
        TestUtils.setBodyHtml('<form name="formName"></form>');

        // Act
        const validateForm = new FormValidation('formName');

        // Assert
        expect(typeof validateForm).toBe('object');

    });

    it('validation module should register a form field within a form', () => {

        // Arrange
        TestUtils.setBodyHtml('<form name="formName"><input /></form>');

        // Act
        const validateForm = new FormValidation('formName');

        // Assert
        expect(validateForm.fields).toHaveLength(1);

    });

    it('validation module should register multiple form fields within a form', () => {

        // Arrange
        TestUtils.setBodyHtml('<form name="formName"><input /><input /></form>');

        // Act
        const validateForm = new FormValidation('formName');

        // Assert
        expect(validateForm.fields).toHaveLength(2);

    });

    it('validation module should only register form fields within the form specified', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form name="formName">
                                        <input value="x" />
                                    </form>
                                    <input value="💩" />`);

        // Act
        const validateForm = new FormValidation('formName');

        // Assert
        expect(validateForm.fields).toHaveLength(1);
        expect(validateForm.fields[0].value).toBe('x');

    });

    it('validation module should set the `novalidate` attribute on the form once initialised', () => {

        // Arrange
        TestUtils.setBodyHtml('<form name="formName"><input /></form>');

        // Act
        const validateForm = new FormValidation('formName');

        // Assert
        expect(validateForm.form.hasAttribute('novalidate')).toBe(true);
        expect(validateForm.form.getAttribute('novalidate')).toBe('');

    });

    it('validation module shouldn‘t set the set the `novalidate` attribute on the form if the `enableHTML5Validation` option has been set', () => {

        // Arrange
        TestUtils.setBodyHtml('<form name="formName"><input /></form>');

        // Act
        const validateForm = new FormValidation('formName', {
            enableHTML5Validation: true
        });

        // Assert
        expect(validateForm.form.hasAttribute('novalidate')).toBe(false);

    });


});

describe('options', () => {

    it('options default value is of type object', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');

        // Act
        const validateForm = new FormValidation(form);

        // Assert
        expect(typeof validateForm.options).toBe('object');

    });

    it('passed options is assigned to validation module options', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');
        const focus = true;
        const options = { focus };

        // Act
        const validateForm = new FormValidation(form, options);

        // Assert
        expect(validateForm.options).toHaveProperty('focus', true);

    });

    it('passed options should be assigned to default options', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');
        const focus = true;
        const options = { focus };

        // Act
        const validateForm = new FormValidation(form, options);

        // Assert
        expect(validateForm.options).toEqual({
            ...defaultOptions,
            focus
        });

    });

    it('should not fail if null is passed as option argument', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');
        const options = null;

        // Act
        const validateForm = new FormValidation(form, options);

        // Assert
        expect(validateForm.options).toEqual(defaultOptions);

    });

    it('should not fail if undefined is passed as option argument', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');
        const options = undefined;

        // Act
        const validateForm = new FormValidation(form, options);

        // Assert
        expect(validateForm.options).toEqual(defaultOptions);

    });

});

describe('on submit', () => {

    it('should validate invalid form on submit', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                        <input required />
                                        <button type="submit">submit</button>
                                    </form>`);
        const form = document.querySelector('form');
        const button = form.querySelector('button');
        new FormValidation(form); // eslint-disable-line no-new

        // Act
        TestUtils.click(button);

        // Assert
        const html = TestUtils.getBodyHtml();
        expect(html).toMatchSnapshot();

    });

    it('should validate valid form on submit', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                        <input required value="test" />
                                        <button type="submit">submit</button>
                                    </form>`);
        const form = document.querySelector('form');
        const button = form.querySelector('button');
        new FormValidation(form); // eslint-disable-line no-new

        const mockHandler = jest.fn(e => { e.preventDefault(); });
        form.addEventListener('submit', mockHandler);

        // Act
        TestUtils.click(button);

        // Assert
        const html = TestUtils.getBodyHtml();
        expect(html).toMatchSnapshot();
        expect(mockHandler).toHaveBeenCalled();

    });

});

describe('adding custom validation', () => {

    it('should throw error when addCustomValidation is called, but name argument is not supplied', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');

        // Act
        const validateForm = new FormValidation(form);

        // Assert
        expect(() => {
            validateForm.addCustomValidation();
        }).toThrowError('f-validate: please provide the name');

    });

    it('should throw error when addCustomValidation is called, but custom method is not supplied', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');

        // Act
        const validateForm = new FormValidation(form);

        // Assert
        expect(() => {
            validateForm.addCustomValidation('customRule');
        }).toThrowError('f-validate: please provide a custom method');

    });
});

describe('error states', () => {

    it('should apply error class to invalid field', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                        <input required />
                                    </form>`);
        const form = document.querySelector('form');
        const validateForm = new FormValidation(form);

        // Act
        validateForm.isValid();

        // Assert
        const html = TestUtils.getBodyHtml();
        expect(html).toMatchSnapshot();

    });

    it('should not apply multiple error classes to invalid field', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                        <input required />
                                    </form>`);
        const form = document.querySelector('form');
        const validateForm = new FormValidation(form);

        // Act
        validateForm.isValid();
        validateForm.isValid();

        // Assert
        const html = TestUtils.getBodyHtml();
        expect(html).toMatchSnapshot();

    });

    it('should not apply any class to field with no validation rule', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                        <input />
                                    </form>`);
        const form = document.querySelector('form');
        const validateForm = new FormValidation(form);

        // Act
        validateForm.isValid();

        // Assert
        const html = TestUtils.getBodyHtml();
        expect(html).toMatchSnapshot();

    });

    it('should apply success class to valid field', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                        <input required value="x" />
                                    </form>`);
        const form = document.querySelector('form');
        const validateForm = new FormValidation(form);

        // Act
        validateForm.isValid();

        // Assert
        const html = TestUtils.getBodyHtml();
        expect(html).toMatchSnapshot();

    });

    it('should apply correct classes to multiple types of field', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                        <input required value="x" />
                                        <input required value="" />
                                        <input />
                                    </form>`);
        const form = document.querySelector('form');
        const validateForm = new FormValidation(form);

        // Act
        validateForm.isValid();

        // Assert
        const html = TestUtils.getBodyHtml();
        expect(html).toMatchSnapshot();

    });

    it('should apply success after error state to field', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                        <input required />
                                    </form>`);
        const form = document.querySelector('form');
        const input = form.querySelector('input');
        const validateForm = new FormValidation(form);

        // Act & Assert
        validateForm.isValid();
        expect(TestUtils.getBodyHtml()).toMatchSnapshot();

        // Make input valid
        input.value = 'x';

        validateForm.isValid();
        expect(TestUtils.getBodyHtml()).toMatchSnapshot();

    });

    it('should apply error after success state to field', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                        <input required value="x" />
                                    </form>`);
        const form = document.querySelector('form');
        const input = form.querySelector('input');
        const validateForm = new FormValidation(form);

        // Act & Assert
        validateForm.isValid();
        expect(TestUtils.getBodyHtml()).toMatchSnapshot();

        // Make input invalid
        input.value = '';

        validateForm.isValid();
        expect(TestUtils.getBodyHtml()).toMatchSnapshot();

    });

});


describe('callbacks', () => {

    it('should be able to add multiple callbacks to an event', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');
        const eventType = 'test';
        const callback1 = jest.fn();
        const callback2 = jest.fn();
        const validateForm = new FormValidation(form);

        // Act
        validateForm.on(eventType, callback1);
        validateForm.on(eventType, callback2);

        // Assert
        expect(validateForm.callBacks.test.length).toBe(2);

    });

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

        it('should call success callback on success', () => {

            // Arrange
            TestUtils.setBodyHtml('<form></form>');
            const form = document.querySelector('form');
            const onSuccess = jest.fn();
            const options = { onSuccess };
            const validateForm = new FormValidation(form, options);

            // Act
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
            const validateForm = new FormValidation(form, options);

            // Act
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
            const validateForm = new FormValidation(form, options);

            // Act
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

        it('should call error callback on error', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                        <input required />
                                    </form>`);
            const form = document.querySelector('form');
            const onError = jest.fn();
            const options = { onError };
            const validateForm = new FormValidation(form, options);

            // Act
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
            const validateForm = new FormValidation(form, options);

            // Act
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
            const validateForm = new FormValidation(form, options);

            // Act
            validateForm.isValid();
            input.value = '';
            validateForm.isValid();

            // Assert
            expect(onError.mock.calls.length).toBe(1);

        });

    });

    describe('invalid callbacks', () => {

        it('should throw exception when non-function type error callbacks are added', () => {

            // Arrange
            TestUtils.setBodyHtml('<form></form>');
            const form = document.querySelector('form');
            const callback = null;
            const formValidation = new FormValidation(form);

            // Act & Assert
            expect(() => {
                formValidation.on('test', callback);
            }).toThrowError('f-validate: test callback must be a function');

        });

        it('should throw correct exception type when non-function type error callbacks are added', () => {

            // Arrange
            TestUtils.setBodyHtml('<form></form>');
            const form = document.querySelector('form');
            const callback = null;
            const formValidation = new FormValidation(form);

            // Act & Assert
            expect(() => {
                formValidation.on('test', callback);
            }).toThrowError(TypeError);

        });

    });

});
