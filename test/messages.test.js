import TestUtils from 'js-test-buddy';
import {
    getInlineErrorElement,
    displayInlineMessage,
    hideMessage,
    getMessage
} from '../src/messages';

describe('messages', () => {
    describe('getInlineErrorElement', () => {
        it('should return error if element exists', () => {
            // Arrange
            TestUtils.setBodyHtml('<input /><p class="form-error">error message</p>');
            const input = document.querySelector('input');
            const error = document.querySelector('p');

            // Act
            const result = getInlineErrorElement(input);

            // Assert
            expect(result).toEqual(error);
        });

        it('should return false if element does not exist', () => {
            // Arrange
            TestUtils.setBodyHtml('<input />');
            const input = document.querySelector('input');

            // Act
            const result = getInlineErrorElement(input);

            // Assert
            expect(result).toEqual(false);
        });
    });

    describe('displayInlineMessage', () => {
        it('should create a new element if it does not exist, and assign error', () => {
            // Arrange
            TestUtils.setBodyHtml('<input />');
            const input = document.querySelector('input');
            const error = document.querySelector('p');
            const customMessage = 'custom message';

            // Act
            displayInlineMessage(error, customMessage, input);

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();
        });

        it('should assign error to existing element', () => {
            // Arrange
            TestUtils.setBodyHtml('<input /><p class="form-error">error message</p>');
            const input = document.querySelector('input');
            const error = document.querySelector('p');
            const customMessage = 'custom message';

            // Act
            displayInlineMessage(error, customMessage, input);

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();
        });

        it('should create a new element and position after requested element', () => {
            // Arrange
            TestUtils.setBodyHtml(`<form>
                    <input data-val-error-placement="arbitrary-element" />
                    <p class="arbitrary-element">error message</p>
                </form>`);
            const form = document.querySelector('form');
            const input = form.querySelector('input');
            const error = form.querySelector('p');
            const customMessage = 'custom message';

            // Act
            displayInlineMessage(error, customMessage, input, form);

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();
        });
    });

    describe('hideMessage', () => {
        it('should add hidden class and remove content if element exists', () => {
            // Arrange
            TestUtils.setBodyHtml('<p class="form-error">error message</p>');
            const error = document.querySelector('p');

            // Act
            hideMessage(error);

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();
        });
    });

    describe('getMessage', () => {
        it('should return custom error message if data attr exists', () => {
            // Arrange
            TestUtils.setBodyHtml(
                '<input data-maxlength-error="maxlength error message" />'
            );
            const input = document.querySelector('input');
            const ruleName = 'maxlength';

            // Act
            const result = getMessage(input, ruleName);

            // Assert
            expect(result).toEqual('maxlength error message');
        });
    });
});
