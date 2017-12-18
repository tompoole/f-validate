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
            new FormValidation();
        }).toThrow();

    });

    it('validation module should be defined', () => {

        // Arrange
        document.body.innerHTML = '<form></form>';
        const form = document.querySelector('form');

        // Act
        const validateForm = new FormValidation(form);

        // Assert
        expect(validateForm).toBeDefined();

    });

    it('validation module should throw an exception when passing a non form dom node', () => {

        // Arrange
        document.body.innerHTML = '<p></p>';
        const p = document.querySelector('p');

        // Act & Assert
        expect(() => {
            new FormValidation(p);
        }).toThrow();

    });

    it('validation module should return object when passing a form dom node', () => {

        // Arrange
        document.body.innerHTML = '<form></form>';
        const form = document.querySelector('form');

        // Act
        const validateForm = new FormValidation(form);

        // Assert
        expect(typeof validateForm).toBe('object');

    });

    it('validation module should return object when passing a string', () => {

        // Arrange
        document.body.innerHTML = '<form name="formName"></form>';

        // Act
        const validateForm = new FormValidation('formName');

        // Assert
        expect(typeof validateForm).toBe('object');

    });

    it('validation module should register a form field within a form', () => {

        // Arrange
        document.body.innerHTML = '<form name="formName"><input /></form>';

        // Act
        const validateForm = new FormValidation('formName');

        // Assert
        expect(validateForm.fields).toHaveLength(1);

    });

    it('validation module should register multiple form fields within a form', () => {

        // Arrange
        document.body.innerHTML = '<form name="formName"><input /><input /></form>';

        // Act
        const validateForm = new FormValidation('formName');

        // Assert
        expect(validateForm.fields).toHaveLength(2);

    });

    it('validation module should only register form fields within the form specified', () => {

        // Arrange
        document.body.innerHTML = `<form name="formName">
                                        <input value="x" />
                                    </form>
                                    <input value="💩" />`;

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
        document.body.innerHTML = '<form></form>';
        const form = document.querySelector('form');

        // Act
        const validateForm = new FormValidation(form);

        // Assert
        expect(typeof validateForm.options).toBe('object')

    });

    it('passed options is assigned to validation module options', () => {

        // Arrange
        document.body.innerHTML = '<form></form>';
        const form = document.querySelector('form');
        const focus = true;
        const options = {focus};

        // Act
        const validateForm = new FormValidation(form, options);

        // Assert
        expect(validateForm.options).toHaveProperty('focus', true);

    });

    it('passed options should be assigned to default options', () => {

        // Arrange
        document.body.innerHTML = '<form></form>';
        const form = document.querySelector('form');
        const focus = true;
        const options = {focus};

        // Act
        const validateForm = new FormValidation(form, options);

        // Assert
        expect(validateForm.options).toEqual({
            ...defaultOptions,
            focus
        })

    });

    it('should not fail if null is passed as option argument', () => {

        // Arrange
        document.body.innerHTML = '<form></form>';
        const form = document.querySelector('form');
        const options = null;

        // Act
        const validateForm = new FormValidation(form, options);

        // Assert
        expect(validateForm.options).toEqual(defaultOptions)

    });

    it('should not fail if undefined is passed as option argument', () => {

        // Arrange
        document.body.innerHTML = '<form></form>';
        const form = document.querySelector('form');
        const options = undefined;

        // Act
        const validateForm = new FormValidation(form, options);

        // Assert
        expect(validateForm.options).toEqual(defaultOptions)

    });

});

describe('validation rules', () => {

    it('an empty form should return valid', () => {

        // Arrange
        document.body.innerHTML = '<form></form>';
        const form = document.querySelector('form');

        // Act
        const validateForm = new FormValidation(form);
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(true);

    });

    describe('required fields', () => {

        describe('input', () => {

            it('should return invalid for a required input with no value', () => {

                // Arrange
                document.body.innerHTML = '<form><input required /></form>';
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should return invalid for a required input with no value (data-attribute)', () => {

                // Arrange
                document.body.innerHTML = '<form><input data-val-required /></form>';
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should validate a required input with a value', () => {

                // Arrange
                document.body.innerHTML = '<form><input value="x" data-val-required /></form>';
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
                document.body.innerHTML = `<form>
                                                <select required>
                                                    <option value="">Please select an option</option>
                                                    <option value="x">X</option>
                                                </select>
                                            </form>`;
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should return invalid for a required select with no value', () => {

                // Arrange
                document.body.innerHTML = `<form>
                                                <select required>
                                                    <option value="">Please select an option</option>
                                                    <option value="x" selected>X</option>
                                                </select>
                                            </form>`;
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(true);

            });

            it('should return invalid for a required select with no value (data-attribute)', () => {

                // Arrange
                document.body.innerHTML = `<form>
                                                <select data-val-required>
                                                    <option value="">Please select an option</option>
                                                    <option value="x" selected>X</option>
                                                </select>
                                            </form>`;
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
                document.body.innerHTML = `<form>
                                                <textarea required></textarea>
                                            </form>`;
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });


            it('should return invalid for a required textarea with no value (data-attribute)', () => {

                // Arrange
                document.body.innerHTML = `<form>
                                                <textarea data-val-required></textarea>
                                            </form>`;
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should validate a required textarea with a value', () => {

                // Arrange
                document.body.innerHTML = `<form>
                                                <textarea data-val-required>x</textarea>
                                            </form>`;
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
                document.body.innerHTML = '<form><input name="test" type="radio" required /><input name="test" type="radio" /></form>';
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should return invalid for a required radio button which has not been checked (data-attribute)', () => {

                // Arrange
                document.body.innerHTML = '<form><input name="test" type="radio" data-val-required /><input name="test" type="radio" /></form>';
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should validate a required radio button which has been checked', () => {

                // Arrange
                document.body.innerHTML = '<form><input name="test" type="radio" required checked /><input name="test" type="radio" /></form>';
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(true);

            });

            it('should validate a radio button group marked as required which another button in the group has been checked', () => {

                // Arrange
                document.body.innerHTML = '<form><input name="test" type="radio" required /><input name="test" type="radio" checked /></form>';
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
                document.body.innerHTML = '<form><input name="test" type="checkbox" required /></form>';
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should return invalid for a required checkbox which has not been checked (data-attribute)', () => {

                // Arrange
                document.body.innerHTML = '<form><input name="test" type="checkbox" data-val-required /></form>';
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should validate a required checkbox which has been checked', () => {

                // Arrange
                document.body.innerHTML = '<form><input name="test" type="checkbox" required checked /></form>';
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(true);

            });

            it('should validate a required checkbox which has been checked when there are multiple checkboxes in the form', () => {

                // Arrange
                document.body.innerHTML = '<form><input name="test" type="checkbox" /><input name="test" type="checkbox" required checked /></form>';
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
                document.body.innerHTML = '<form><input maxlength="6" value="testData" /></form>';
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should return invalid for a maxlength input with no value (data-attribute)', () => {

                // Arrange
                document.body.innerHTML = '<form><input data-val-maxlength="6" value="testData" /></form>';
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should return valid for input where the values length is less than the specified maxlength', () => {

                // Arrange
                document.body.innerHTML = '<form><input maxlength="6" value="test" /></form>';
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
                document.body.innerHTML = '<form><textarea maxlength="6">testData</textarea></form>';
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should return invalid for a maxlength textarea with no value (data-attribute)', () => {

                // Arrange
                document.body.innerHTML = '<form><textarea data-val-maxlength="6">testData</textarea></form>';
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should return valid for textarea where the values length is less than the specified maxlength', () => {

                // Arrange
                document.body.innerHTML = '<form><textarea maxlength="6">test</textarea></form>';
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
                document.body.innerHTML = '<form><input minlength="6" /></form>';
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(true);

            });

            it('should return invalid for a minlength input with value less than the specified value', () => {

                // Arrange
                document.body.innerHTML = '<form><input minlength="6" value="test" /></form>';
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should return invalid for a minlength input with value less than the specified value (data-attribute)', () => {

                // Arrange
                document.body.innerHTML = '<form><input data-val-minlength="6" value="test" /></form>';
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should return valid for minlength input where the values length is more than the specified minlength', () => {

                // Arrange
                document.body.innerHTML = '<form><input minlength="6" value="testData" /></form>';
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
                document.body.innerHTML = '<form><textarea minlength="6"></textarea></form>';
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(true);

            });

            it('should return invalid for a minlength textarea with value less than the specified minlength', () => {

                // Arrange
                document.body.innerHTML = '<form><textarea minlength="6">test</textarea></form>';
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should return invalid for a minlength textarea with no value (data-attribute)', () => {

                // Arrange
                document.body.innerHTML = '<form><textarea data-val-minlength="6">test</textarea></form>';
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should return valid for textarea where the values length is more than the specified maxlength', () => {

                // Arrange
                document.body.innerHTML = '<form><textarea minlength="6">testData</textarea></form>';
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
                document.body.innerHTML = '<form><input pattern="" value="test" /></form>';
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should return invalid for an input with an empty pattern attribute (data-attribute)', () => {

                // Arrange
                document.body.innerHTML = '<form><input pattern="" value="test" /></form>';
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

            it('should return valid when the value of the input matches the pattern specified', () => {

                // Arrange
                document.body.innerHTML = '<form><input pattern="[a-z]{1,6}" value="test" /></form>';
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(true);

            });

            it('should return invalid when the value of the input doesn\'t match the pattern specified', () => {

                // Arrange
                document.body.innerHTML = '<form><input pattern="[a-z]{1,6}" value="testData1" /></form>';
                const form = document.querySelector('form');

                // Act
                const validateForm = new FormValidation(form);
                const isFormValid = validateForm.isValid();

                // Assert
                expect(isFormValid).toBe(false);

            });

        });

    });

});

describe('error states', () => {

    it('should apply error class to invalid field', () => {

        // Arrange
        document.body.innerHTML = `<form>
                                        <input required />
                                    </form>`;
        const form = document.querySelector('form');

        // Act
        const validateForm = new FormValidation(form);
        validateForm.isValid();

        // Assert
        const html = document.body.innerHTML;
        expect(html).toMatchSnapshot();

    });

    it('should not apply multiple error classes to invalid field', () => {

        // Arrange
        document.body.innerHTML = `<form>
                                        <input required />
                                    </form>`;
        const form = document.querySelector('form');

        // Act
        const validateForm = new FormValidation(form);
        validateForm.isValid();
        validateForm.isValid();

        // Assert
        const html = document.body.innerHTML;
        expect(html).toMatchSnapshot();

    });

    it('should not apply any class to field with no validation rule', () => {

        // Arrange
        document.body.innerHTML = `<form>
                                        <input />
                                    </form>`;
        const form = document.querySelector('form');

        // Act
        const validateForm = new FormValidation(form);
        validateForm.isValid();

        // Assert
        const html = document.body.innerHTML;
        expect(html).toMatchSnapshot();

    });

    it('should apply success class to valid field', () => {

        // Arrange
        document.body.innerHTML = `<form>
                                        <input required value="x" />
                                    </form>`;
        const form = document.querySelector('form');

        // Act
        const validateForm = new FormValidation(form);
        validateForm.isValid();

        // Assert
        const html = document.body.innerHTML;
        expect(html).toMatchSnapshot();

    });

    it('should apply correct classes to multiple types of field', () => {

        // Arrange
        document.body.innerHTML = `<form>
                                        <input required value="x" />
                                        <input required value="" />
                                        <input />
                                    </form>`;
        const form = document.querySelector('form');

        // Act
        const validateForm = new FormValidation(form);
        validateForm.isValid();

        // Assert
        const html = document.body.innerHTML;
        expect(html).toMatchSnapshot();

    });

    it('should apply success after error state to field', () => {

        // Arrange
        document.body.innerHTML = `<form>
                                        <input required />
                                    </form>`;
        const form = document.querySelector('form');
        const input = form.querySelector('input');

        // Act & Assert
        const validateForm = new FormValidation(form);
        validateForm.isValid();

        let html = document.body.innerHTML;
        expect(html).toMatchSnapshot();

        // Make input valid
        input.value = 'x';

        validateForm.isValid();
        html = document.body.innerHTML;
        expect(html).toMatchSnapshot();

    });

    it('should apply error after success state to field', () => {

        // Arrange
        document.body.innerHTML = `<form>
                                        <input required value="x" />
                                    </form>`;
        const form = document.querySelector('form');
        const input = form.querySelector('input');

        // Act & Assert
        const validateForm = new FormValidation(form);
        validateForm.isValid();

        let html = document.body.innerHTML;
        expect(html).toMatchSnapshot();

        // Make input invalid
        input.value = '';

        validateForm.isValid();
        html = document.body.innerHTML;
        expect(html).toMatchSnapshot();

    });

});
