import TestUtils from 'js-test-buddy';
import FormValidation from '../src/index';

describe('error messages', () => {

    describe('by default', () => {

        it('should apply error class to an invalid field', () => {

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

        it('should not apply error class to a valid field', () => {

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

        it('should replace the existing error message when validating multiple times', () => {

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

        it('should remove the error message if a previously invalid field is now valid', () => {

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

    describe('with a custom message defined', () => {

        it('should apply error class to an invalid field', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                    <input required data-val-required-error="custom required error message" />
                                </form>`);
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            validateForm.isValid();

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();

        });

        it('should not apply error class to a valid field', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                    <input required value="x" data-val-required-error="custom required error message" />
                                </form>`);
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            validateForm.isValid();

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();

        });

        it('should replace the existing error message when validating multiple times', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                    <input
                                        required
                                        maxlength="3"
                                        data-val-required-error="custom required error message"
                                        data-val-maxlength-error="custom maxlength error message"
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

        it('should remove the error message if a previously invalid field is now valid', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                        <input required data-val-required-error="custom required error message" />
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

    describe('when set to display as a group', () => {

        it('should display error messages grouped at the bottom of the form when `groupErrorPlacement` is set to `bottom`', () => {

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

        it('should display an error message grouped above the submit button when `groupErrorPlacement` is set as that selector', () => {

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

        it('should display error messages grouped above the specified selector when `groupErrorPlacement` is set as a selector', () => {

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

        it('should display error messages grouped at the top of the form when `groupErrorPlacement` is set to `top`', () => {

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

        it('should display error messages grouped at the top if `groupErrorPlacement` is set but an element is not found', () => {

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

        it('should not display error messages when the form is valid', () => {

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

        it('should replace existing error messages when validated multiple times', () => {

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

        it('should remove error messages if the form is valid after previously being invalid', () => {

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

        it('should not allow user to group errors if validating on \'blur\' or \'keyup\'', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                    <input required />
                                </form>`);
            const form = document.querySelector('form');

            // Act & Assert
            expect(() => {
                // eslint-disable-next-line no-new
                new FormValidation(form, {
                    groupErrorPlacement: 'bottom',
                    validateOn: 'blur'
                });
            }).toThrowError('f-validate: validation on \'blur\' or \'keyup\' cannot be performed if errors are grouped');

        });

    });

    describe('with custom positioning set on field', () => {

        it('should display the error message directly adjacent to the specified element', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                        <input required />
                                        <input required data-val-error-placement=".arbitrary-element" />
                                        <span class="arbitrary-element">arbitrary info text</span>
                                    </form>`);
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            validateForm.isValid();

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();

        });

        it('should replace an existing error message if one is already present', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                        <input required />
                                        <input required data-val-error-placement=".arbitrary-element" />
                                        <span class="arbitrary-element">arbitrary info text</span>
                                        <p class="form-error">error here</p>
                                    </form>`);
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            validateForm.isValid();

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();

        });

    });

});
