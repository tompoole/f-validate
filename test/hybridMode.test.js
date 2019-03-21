import TestUtils from 'js-test-buddy';
import FormValidation from '../src';

describe('hybridMode', () => {

    it('should throw error if hyrbid mode is used with a validateOn event', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                        <input required value="x" />
                                        <input required>
                                    </form>`);
        const form = document.querySelector('form');

        // Act & Assert
        expect(() => {
            // eslint-disable-next-line no-new
            new FormValidation(form, {
                hybridMode: true,
                validateOn: 'blur'
            });
        }).toThrowError('f-validate: hybridMode cannot be used with the validateOn option');

    });

    it('should throw error if hyrbid mode is used with grouped errors', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                        <input required value="x" />
                                        <input required>
                                    </form>`);
        const form = document.querySelector('form');

        // Act & Assert
        expect(() => {
            // eslint-disable-next-line no-new
            new FormValidation(form, {
                hybridMode: true,
                groupErrorPlacement: true
            });
        }).toThrowError('f-validate: hybridMode cannot be used if errors are grouped');

    });

    it('should bind events if configuration is valid', () => {

        // Arrange
        TestUtils.setBodyHtml('<form><input required value="x"></form>');
        const form = document.querySelector('form');
        const input = form.querySelector('input');

        const isValidSpy = jest.fn();
        const markFieldAsBlurredSpy = jest.fn();

        const validation = new FormValidation(form, {
            hybridMode: true
        });

        validation.isValid = isValidSpy;
        validation.markFieldAsBlurred = markFieldAsBlurredSpy;
        validation.setupHybridValidate(); // need to re-run setup as functions have changed

        // Act
        TestUtils.dispatchEvent(input, 'keydown');
        TestUtils.dispatchEvent(input, 'blur');

        // Assert
        expect(isValidSpy.mock.calls.length).toBe(1);
        expect(markFieldAsBlurredSpy.mock.calls.length).toBe(1);
    });

    it('should not validate on keydown before initial blur', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                    <input type="email" name="email" />
                                </form>`);
        const form = document.querySelector('form');
        const input = form.querySelector('input');

        // eslint-disable-next-line no-new
        new FormValidation(form, {
            hybridMode: true
        });

        // Act
        input.value = 'not-a-valid-email';
        TestUtils.dispatchEvent(input, 'keydown');

        // Assert
        const html = TestUtils.getBodyHtml();
        expect(html).toMatchSnapshot();

    });

    it('should validate on keydown after initial blur', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                    <input type="email" name="email" />
                                </form>`);
        const form = document.querySelector('form');
        const input = form.querySelector('input');

        // eslint-disable-next-line no-new
        new FormValidation(form, {
            hybridMode: true
        });

        // Act
        input.value = 'not-a-valid-email';
        TestUtils.dispatchEvent(input, 'keydown');
        TestUtils.dispatchEvent(input, 'blur');
        TestUtils.dispatchEvent(input, 'keydown');

        // Assert
        const html = TestUtils.getBodyHtml();
        expect(html).toMatchSnapshot();

    });

    it('should validate on form submit', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                    <input type="text" required />
                                    <input type="email" name="email" />
                                </form>`);
        const form = document.querySelector('form');
        const inputEmail = form.querySelector('input[type=email]');

        // eslint-disable-next-line no-new
        new FormValidation(form, {
            hybridMode: true
        });

        // Act
        inputEmail.value = 'not-a-valid-email';
        TestUtils.dispatchEvent(inputEmail, 'blur');
        TestUtils.dispatchEvent(form, 'submit');

        // Assert
        const html = TestUtils.getBodyHtml();
        expect(html).toMatchSnapshot();
    });

});
