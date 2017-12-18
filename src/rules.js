import REGEX from './constants';

const testDefinitions = {
    required: {
        condition: field => field.hasAttribute('required') || field.hasAttribute('data-val-required'),
        test: field => {
            // Required checkbox & radio, 1 should be checked.
            if (field.type === 'radio') {
                const radioInputs = document.querySelectorAll(`[name='${field.name}']:checked`);
                return (radioInputs.length > 0);
            }
            if (field.type === 'checkbox') {
                return (field.checked === true);
            }
            return (field.value.trim()).length > 0;
        }
        // dataAttr: 'val-required',
        // errorAttr: 'val-required-error',
        // errorMessage: 'This field is required.'
    },
    maxlength: {
        condition: field => field.hasAttribute('maxlength') || field.hasAttribute('data-val-maxlength'),
        test: field => (field.value.trim()).length <= parseInt(field.getAttribute('maxlength') || field.getAttribute('data-val-maxlength'), 10),
        // dataAttr: 'val-maxlength',
        // errorAttr: 'val-maxlength-error',
        // errorMessage: 'This field must not exceed %s characters in length.'
    },
    minlength: {
        condition: field => field.hasAttribute('minlength') || field.hasAttribute('data-val-minlength'),
        test: field => {
            // if the field is empty, should validate as true
            if (field.value === '') {
                return true;
            }
            return (field.value.trim()).length >= parseInt(field.getAttribute('minlength') || field.getAttribute('data-val-minlength'), 10);
        }
        // dataAttr: 'val-minlength',
        // errorAttr: 'val-minlength-error',
        // errorMessage: 'This field must be at least %s characters in length.'
    },
    // Allows definition of a rule to validate the input value using Regular Expressions (RegEx)
    pattern: {
        condition: field => field.hasAttribute('pattern') || field.hasAttribute('data-val-regex'),
        test: field => {
            // escape characters that have special meaning inside a regular expression in field value
            const fieldValue = field.value.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
            const pattern = field.getAttribute('pattern') || field.getAttribute('data-val-regex');
            return new RegExp(`^(?:${pattern})$`, 'gim').test(fieldValue);
        }
        // dataAttr: 'val-regex',
        // errorAttr: 'val-regex-error',
        // errorMessage: 'This field contains a value that isn’t accepted.'
    },
    email: {
        condition: field => field.getAttribute('type') === 'email',
        test: field => REGEX.EMAIL.test(field.value)
        // dataAttr: 'val-email',
        // errorAttr: 'val-email-error',
        // errorMessage: 'This field must contain a valid email address.'
    },
    matches: {
        condition: field => field.hasAttribute('data-val-equalto'),
        test: field => {
            const matchedFieldName = field.getAttribute('data-val-equalto').replace('*.', '');
            return matchedFieldName && document.querySelector(`input[name=${matchedFieldName}]`)
                && field.value === document.querySelector(`input[name=${matchedFieldName}]`).value;
        }
        // dataAttr: 'val-equalto',
        // errorAttr: 'val-equalto-error',
        // errorMessage: 'This field does not match the %s field.'
    },
    custom: {
        condition: field => {
            const hasCustom = field.hasAttribute('data-val-custom'),
                hasCustomError = field.hasAttribute('data-val-custom-error');
            if (hasCustomError && !hasCustom) {
                console.error('f-validate: specify data-val-custom along with data-val-custom-error attribute');
            }
            return hasCustom;
        },
        test: null
        // dataAttr: 'val-custom',
        // errorAttr: 'val-custom-error',
        // errorMessage: 'Custom validation failed.'
    }
};

export default testDefinitions;
