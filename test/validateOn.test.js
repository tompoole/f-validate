import TestUtils from 'js-test-buddy';
import FormValidation from '../src';
import stubDate from './helpers/stubDate';

describe('validateOn', () => {
    it("should throw error if value other than 'blur' or 'keyup' are passed to 'validateOn' option", () => {
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
                validateOn: 'other'
            });
        }).toThrowError(
            "f-validate: valid options for the 'validateOn' property are 'blur' or 'keyup'"
        );
    });

    describe('blur', () => {
        it('should not validate if field is empty', () => {
            // Arrange
            TestUtils.setBodyHtml(`<form>
                                        <input required />
                                    </form>`);
            const form = document.querySelector('form');
            const input = form.querySelector('input');

            // eslint-disable-next-line no-new
            new FormValidation(form, {
                validateOn: 'blur'
            });

            // Act
            TestUtils.dispatchEvent(input, 'blur');

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();
        });

        it('should validate valid form', () => {
            // Arrange
            TestUtils.setBodyHtml(`<form>
                                        <input required value="x" />
                                    </form>`);
            const form = document.querySelector('form');
            const input = form.querySelector('input');

            // eslint-disable-next-line no-new
            new FormValidation(form, {
                validateOn: 'blur'
            });

            // Act
            TestUtils.dispatchEvent(input, 'blur');

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();
        });

        it('should not run validation on other fields', () => {
            // Arrange
            TestUtils.setBodyHtml(`<form>
                                        <input required value="x" />
                                        <input required>
                                    </form>`);
            const form = document.querySelector('form');
            const input = form.querySelector('input');

            // eslint-disable-next-line no-new
            new FormValidation(form, {
                validateOn: 'blur'
            });

            // Act
            TestUtils.dispatchEvent(input, 'blur');

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();
        });

        it('should set form state to valid, as second select has not been touched', () => {
            stubDate('Oct 16, 2020');

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                <div class="validation-group"
                                    data-val-dateinfuture>
                                     <select data-val-dateinfuture-type="year">
                                        <option value="" ></option>
                                        <option value="2021" selected></option>
                                    </select>
                                    <select data-val-dateinfuture-type="month">
                                        <option value="" ></option>
                                    </select>
                                </div>
                            </form>`);
            const form = document.querySelector('form');
            const select = form.querySelector('select');

            // eslint-disable-next-line no-new
            new FormValidation(form, {
                validateOn: 'blur'
            });

            // Act
            TestUtils.dispatchEvent(select, 'blur');

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();
        });

        it('should set form state to invalid, as second select has been touched', () => {
            stubDate('Oct 16, 2020');

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                <div class="validation-group"
                                    data-val-dateinfuture>
                                     <select data-val-dateinfuture-type="year">
                                        <option value="" ></option>
                                        <option value="2021" selected></option>
                                    </select>
                                    <select data-val-dateinfuture-type="month" data-touched="true">
                                        <option value="" ></option>
                                    </select>
                                </div>
                            </form>`);
            const form = document.querySelector('form');
            const select = form.querySelector('select');

            // eslint-disable-next-line no-new
            new FormValidation(form, {
                validateOn: 'blur'
            });

            // Act
            TestUtils.dispatchEvent(select, 'blur');

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();
        });

        it('should set form state to valid, as first select has not been touched', () => {
            stubDate('Oct 16, 2020');

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                <div class="validation-group"
                                    data-val-dateinfuture>
                                     <select data-val-dateinfuture-type="year">
                                        <option value="" ></option>
                                    </select>
                                    <select data-val-dateinfuture-type="month">
                                        <option value="" ></option>
                                        <option value="01" selected></option>
                                    </select>
                                </div>
                            </form>`);
            const form = document.querySelector('form');
            const [, select2] = form.querySelectorAll('select');

            // eslint-disable-next-line no-new
            new FormValidation(form, {
                validateOn: 'blur'
            });

            // Act
            TestUtils.dispatchEvent(select2, 'blur');

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();
        });

        it('should set form state to invalid, as first select has been touched', () => {
            stubDate('Oct 16, 2020');

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                <div class="validation-group"
                                    data-val-dateinfuture>
                                     <select data-val-dateinfuture-type="year" data-touched="true">
                                        <option value="" ></option>
                                    </select>
                                    <select data-val-dateinfuture-type="month">
                                        <option value="" ></option>
                                        <option value="01" selected></option>
                                    </select>
                                </div>
                            </form>`);
            const form = document.querySelector('form');
            const [, select2] = form.querySelectorAll('select');

            // eslint-disable-next-line no-new
            new FormValidation(form, {
                validateOn: 'blur'
            });

            // Act
            TestUtils.dispatchEvent(select2, 'blur');

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();
        });
    });

    describe('keyup', () => {
        it('should not validate if field is empty', () => {
            // Arrange
            TestUtils.setBodyHtml(`<form>
                                        <input required />
                                    </form>`);
            const form = document.querySelector('form');
            const input = form.querySelector('input');

            // eslint-disable-next-line no-new
            new FormValidation(form, {
                validateOn: 'keyup'
            });

            // Act
            TestUtils.dispatchEvent(input, 'keyup');

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();
        });

        it('should validate valid form', () => {
            // Arrange
            TestUtils.setBodyHtml(`<form>
                                        <input required value="x" />
                                    </form>`);
            const form = document.querySelector('form');
            const input = form.querySelector('input');

            // eslint-disable-next-line no-new
            new FormValidation(form, {
                validateOn: 'keyup'
            });

            // Act
            TestUtils.dispatchEvent(input, 'keyup');

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();
        });
    });
});
