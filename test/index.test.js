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

describe('validation rules', () => {

    it('an empty form should return valid', () => {

        // Arrange
        TestUtils.setBodyHtml('<form></form>');
        const form = document.querySelector('form');

        // Act
        const validateForm = new FormValidation(form);
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(true);

    });

    describe('required fields', () => {

        describe('input', () => {

            it('should not validate a hidden field', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><input required type="hidden" /></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(true);

            });

            it('should not validate a disabled field', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><input required disabled /></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(true);

            });

            it('should not validate a field with attribute data-novalidate', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><input required data-novalidate /></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(true);

            });

            it('should return invalid for a required input with no value', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><input required /></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should return invalid for a required input with no value (data-attribute)', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><input data-val-required /></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should validate a required input with a value', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><input value="x" data-val-required /></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(true);

            });

        });

        describe('select', () => {

            it('should return invalid for a required select with no value', () => {

                // Arrange
                TestUtils.setBodyHtml(`<form>
                                                <select required>
                                                    <option value="">Please select an option</option>
                                                    <option value="x">X</option>
                                                </select>
                                            </form>`);
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
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

                // Act
                const validateForm = new FormValidation(form);
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

                // Act
                const validateForm = new FormValidation(form);
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

                // Act
                const validateForm = new FormValidation(form);
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

                // Act
                const validateForm = new FormValidation(form);
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

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(true);

            });

        });

        describe('radio', () => {

            it('should return invalid for a required radio button which has not been checked', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><input name="test" type="radio" required /><input name="test" type="radio" /></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should return invalid for a required radio button which has not been checked (data-attribute)', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><input name="test" type="radio" data-val-required /><input name="test" type="radio" /></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should validate a required radio button which has been checked', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><input name="test" type="radio" required checked /><input name="test" type="radio" /></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(true);

            });

            it('should validate a radio button group marked as required which another button in the group has been checked', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><input name="test" type="radio" required /><input name="test" type="radio" checked /></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(true);

            });

        });

        describe('checkbox', () => {

            it('should return invalid for a required checkbox which has not been checked', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><input name="test" type="checkbox" required /></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should return invalid for a required checkbox which has not been checked (data-attribute)', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><input name="test" type="checkbox" data-val-required /></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should validate a required checkbox which has been checked', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><input name="test" type="checkbox" required checked /></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(true);

            });

            it('should validate a required checkbox which has been checked when there are multiple checkboxes in the form', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><input name="test" type="checkbox" /><input name="test" type="checkbox" required checked /></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(true);

            });

        });

    });

    describe('maxlength fields', () => {

        describe('input', () => {

            it('should return invalid for a maxlength input with value more than the specified value', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><input maxlength="6" value="testData" /></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should return invalid for a maxlength input with no value (data-attribute)', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><input data-val-maxlength="6" value="testData" /></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should return valid for input where the values length is less than the specified maxlength', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><input maxlength="6" value="test" /></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(true);

            });

        });

        describe('textarea', () => {

            it('should return invalid for a maxlength textarea with value more than the specified value', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><textarea maxlength="6">testData</textarea></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should return invalid for a maxlength textarea with no value (data-attribute)', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><textarea data-val-maxlength="6">testData</textarea></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should return valid for textarea where the values length is less than the specified maxlength', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><textarea maxlength="6">test</textarea></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(true);

            });

        });

    });

    describe('minlength fields', () => {

        describe('input', () => {

            it('should return valid for a minlength input with no value', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><input minlength="6" /></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(true);

            });

            it('should return invalid for a minlength input with value less than the specified value', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><input minlength="6" value="test" /></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should return invalid for a minlength input with value less than the specified value (data-attribute)', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><input data-val-minlength="6" value="test" /></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should return valid for minlength input where the values length is more than the specified minlength', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><input minlength="6" value="testData" /></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(true);

            });

        });

        describe('textarea', () => {

            it('should return valid for a minlength textarea with no value entered', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><textarea minlength="6"></textarea></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(true);

            });

            it('should return invalid for a minlength textarea with value less than the specified minlength', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><textarea minlength="6">test</textarea></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should return invalid for a minlength textarea with no value (data-attribute)', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><textarea data-val-minlength="6">test</textarea></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should return valid for textarea where the values length is more than the specified maxlength', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><textarea minlength="6">testData</textarea></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(true);

            });

        });

    });

    describe('pattern fields', () => {

        describe('input', () => {

            it('should return invalid for an input with an empty pattern attribute', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><input pattern="" value="test" /></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should return invalid for an input with an empty pattern attribute (data-attribute)', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><input pattern="" value="test" /></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should return valid when the value of the input matches the pattern specified', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><input pattern="[a-z]{1,6}" value="test" /></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(true);

            });

            it('should return invalid when the value of the input doesn\'t match the pattern specified', () => {

                // Arrange
                TestUtils.setBodyHtml('<form><input pattern="[a-z]{1,6}" value="testData1" /></form>');
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

        });

    });

    describe('email fields', () => {

        it('should return invalid for a field of type email with invalid email address', () => {

            // Arrange
            TestUtils.setBodyHtml('<form><input type="email" value="invalidEmailFormat" /></form>');
            const form = document.querySelector('form');

            // Act
            const validateForm = new FormValidation(form);
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(false);

        });

        it('should return invalid for a field of type email with invalid email address', () => {

            // Arrange
            TestUtils.setBodyHtml('<form><input type="email" value=`invalid@test` /></form>');
            const form = document.querySelector('form');

            // Act
            const validateForm = new FormValidation(form);
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(false);

        });

        it('should return invalid for a field of type email with invalid email address', () => {

            // Arrange
            TestUtils.setBodyHtml('<form><input type="email" value="@test.com" /></form>');
            const form = document.querySelector('form');

            // Act
            const validateForm = new FormValidation(form);
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(false);

        });

        it('should return valid for a field of type email with valid email address', () => {

            // Arrange
            TestUtils.setBodyHtml('<form><input type="email" value="valid@test.com" /></form>');
            const form = document.querySelector('form');

            // Act
            const validateForm = new FormValidation(form);
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(true);

        });

    });

    describe('matches fields', () => {

        it('should return invalid for a field with "equalto" attribute, that does not match value of specified field', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                <input data-val-equalto="matchedField" value="match" />
                <input name="matchedField" value="doesNotMatch" />
                </form>`);
            const form = document.querySelector('form');

            // Act
            const validateForm = new FormValidation(form);
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(false);

        });

        it('should return invalid for a field with "equalto" attribute, that matches value, but field is not specified', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                <input data-val-equalto value="match" />
                <input name="matchedField" value="match" />
                </form>`);
            const form = document.querySelector('form');

            // Act
            const validateForm = new FormValidation(form);
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(false);

        });

        it('should return invalid for a field with "equalto" attribute, that does matches value, but field does not exist', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                <input data-val-equalto="matchedField" value="match" />
                </form>`);
            const form = document.querySelector('form');

            // Act
            const validateForm = new FormValidation(form);
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(false);

        });

        it('should return valid for a field with "equalto" attribute, that does match value of specified field', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                <input data-val-equalto="matchedField" value="match" />
                <input name="matchedField" value="match" />
                </form>`);
            const form = document.querySelector('form');

            // Act
            const validateForm = new FormValidation(form);
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(true);

        });

    });

    describe('custom', () => {

        it('should return valid for a field custom attribute, where method returns true', () => {

            // Arrange
            const customMethod = () => true;
            TestUtils.setBodyHtml(`<form>
                <input data-val-custom="customRule" value="match" />
                </form>`);
            const form = document.querySelector('form');

            // Act
            const validateForm = new FormValidation(form);
            validateForm.addCustomValidation('customRule', customMethod);
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(true);

        });

        it('should return invalid for a field custom attribute, where method returns false', () => {

            // Arrange
            const customMethod = () => false;
            TestUtils.setBodyHtml(`<form>
                <input data-val-custom="customRule" value="match" />
                </form>`);
            const form = document.querySelector('form');

            // Act
            const validateForm = new FormValidation(form);
            validateForm.addCustomValidation('customRule', customMethod);
            const isFormValid = validateForm.isValid();

            // Assert
            expect(isFormValid).toBe(false);

        });

        it('should log error when "data-val-custom" attribute has not been specified', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                <input data-val-custom-error="customer error message" value="match" />
            </form>`);
            const form = document.querySelector('form');

            // Act
            const validateForm = new FormValidation(form);

            // Assert
            expect(() => {
                validateForm.isValid();
            }).toThrowError('f-validate: specify data-val-custom along with data-val-custom-error attribute');

        });

    });

    describe('multiple rules', () => {

        it('should retain error class, when a field has other rules that run afterwards which are valid', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                        <input maxlength="6" pattern="[a-zA-Z]+" value="testFail" />
                                    </form>`);
            const form = document.querySelector('form');

            // Act
            const validateForm = new FormValidation(form);
            validateForm.isValid();

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();

        });

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

        // Act
        new FormValidation(form); // eslint-disable-line no-new
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

        // Act
        new FormValidation(form); // eslint-disable-line no-new
        TestUtils.click(button);

        // Assert
        const html = TestUtils.getBodyHtml();
        expect(html).toMatchSnapshot();

    });

});

describe('addCustomValidation()', () => {

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

        // Act
        const validateForm = new FormValidation(form);
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

        // Act
        const validateForm = new FormValidation(form);
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

        // Act
        const validateForm = new FormValidation(form);
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

        // Act
        const validateForm = new FormValidation(form);
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

        // Act
        const validateForm = new FormValidation(form);
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

        // Act & Assert
        const validateForm = new FormValidation(form);
        validateForm.isValid();

        let html = TestUtils.getBodyHtml();
        expect(html).toMatchSnapshot();

        // Make input valid
        input.value = 'x';

        validateForm.isValid();
        html = TestUtils.getBodyHtml();
        expect(html).toMatchSnapshot();

    });

    it('should apply error after success state to field', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                        <input required value="x" />
                                    </form>`);
        const form = document.querySelector('form');
        const input = form.querySelector('input');

        // Act & Assert
        const validateForm = new FormValidation(form);
        validateForm.isValid();

        let html = TestUtils.getBodyHtml();
        expect(html).toMatchSnapshot();

        // Make input invalid
        input.value = '';

        validateForm.isValid();
        html = TestUtils.getBodyHtml();
        expect(html).toMatchSnapshot();

    });

});
