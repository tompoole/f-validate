import TestUtils from 'js-test-buddy';
import FormValidation from '../src/index';

describe('error messages', () => {

    describe('custom', () => {

        it('should apply error class to invalid field', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                    <input required data-required-error="custom required error message" />
                                </form>`);
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            validateForm.isValid();

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();

        });

        it('should not apply error class to valid field', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                    <input required value="x" data-required-error="custom required error message" />
                                </form>`);
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            validateForm.isValid();

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();

        });

        it('should replace existing error message', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                    <input
                                        required
                                        maxlength="3"
                                        data-required-error="custom required error message"
                                        data-maxlength-error="custom maxlength error message"
                                    />
                                </form>`);
            const form = document.querySelector('form');
            const input = form.querySelector('input');
            const validateForm = new FormValidation(form);

            // Act & Assert
            validateForm.isValid();
            expect(TestUtils.getBodyHtml()).toMatchSnapshot();

            // Make input invalid due to maxlength exceeded
            input.value = 'xxxx';

            validateForm.isValid();
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();

        });

        it('should hide error message if field is now valid', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                        <input required data-required-error="custom required error message" />
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

    });

    describe('default', () => {

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

        it('should not apply error class to valid field', () => {

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

        it('should replace existing error message', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                    <input required maxlength="3" />
                                </form>`);
            const form = document.querySelector('form');
            const input = form.querySelector('input');
            const validateForm = new FormValidation(form);

            // Act & Assert
            validateForm.isValid();
            expect(TestUtils.getBodyHtml()).toMatchSnapshot();

            // Make input invalid due to maxlength exceeded
            input.value = 'xxxx';

            validateForm.isValid();
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();

        });

        it('should hide error message if field is now valid', () => {

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
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();

        });

    });

    describe('grouped', () => {

        it('should display error messages grouped at the bottom', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                    <input required />
                                    <input required minlength="2" value="x" />
                                </form>`);
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form, {
                groupErrorPlacement: 'bottom'
            });

            // Act
            validateForm.isValid();

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();

        });

        it('should display error messages grouped at the bottom above submit button', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                    <input required />
                                    <input required minlength="2" value="x" />
                                    <button type="submit"></button>
                                </form>`);
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form, {
                groupErrorPlacement: '[type=submit]'
            });

            // Act
            validateForm.isValid();

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();

        });

        it('should display error messages grouped at the bottom above specified element', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                    <input required />
                                    <input required minlength="2" value="x" />
                                    <p data-errors-placement>arbitrary text</p>
                                    <button type="submit"></button>
                                </form>`);
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form, {
                groupErrorPlacement: '[data-errors-placement]'
            });

            // Act
            validateForm.isValid();

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();

        });

        it('should display error messages grouped at the top', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                    <input required />
                                    <input required minlength="2" value="x" />
                                </form>`);
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form, {
                groupErrorPlacement: 'top'
            });

            // Act
            validateForm.isValid();

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();

        });

        it('should display error messages grouped at the top if element not found', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                    <input required />
                                    <input required minlength="2" value="x" />
                                </form>`);
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form, {
                groupErrorPlacement: '[data-errors-placement]'
            });

            // Act
            validateForm.isValid();

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();

        });

        it('should not display error messages on valid form', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                    <input required value="x" />
                                    <input required minlength="2" value="xx" />
                                </form>`);
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form, {
                groupErrorPlacement: 'bottom'
            });

            // Act
            validateForm.isValid();

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();

        });

        it('should replace existing group error messages', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                    <input required />
                                    <input required minlength="2" />
                                </form>`);
            const form = document.querySelector('form');
            const inputs = form.querySelectorAll('input');
            const validateForm = new FormValidation(form, {
                groupErrorPlacement: 'bottom'
            });

            // Act & Assert
            validateForm.isValid();
            expect(TestUtils.getBodyHtml()).toMatchSnapshot();

            // Make input invalid due to maxlength exceeded
            inputs[0].value = 'x';
            inputs[1].value = 'x';

            validateForm.isValid();
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();

        });

        it('should hide existing group error message if group is now valid', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                    <input required />
                                    <input required minlength="2" />
                                </form>`);
            const form = document.querySelector('form');
            const inputs = form.querySelectorAll('input');
            const validateForm = new FormValidation(form, {
                groupErrorPlacement: 'bottom'
            });

            // Act & Assert
            validateForm.isValid();
            expect(TestUtils.getBodyHtml()).toMatchSnapshot();

            // Make inputs valid
            inputs[0].value = 'x';
            inputs[1].value = 'xx';

            validateForm.isValid();
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();

        });

    });
});
