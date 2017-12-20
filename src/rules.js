import CONSTANTS from './constants';

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
    },
    maxlength: {
        condition: field => field.hasAttribute('maxlength') || field.hasAttribute('data-val-maxlength'),
        test: field => (field.value.trim()).length <= parseInt(field.getAttribute('maxlength') || field.getAttribute('data-val-maxlength'), 10)
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
    },
    email: {
        condition: field => field.getAttribute('type') === 'email',
        test: field => CONSTANTS.email.test(field.value)
    },
    matches: {
        condition: field => field.hasAttribute('data-val-equalto'),
        test: field => {
            const matchedFieldName = field.getAttribute('data-val-equalto').replace('*.', '');
            return matchedFieldName && document.querySelector(`input[name=${matchedFieldName}]`)
                && field.value === document.querySelector(`input[name=${matchedFieldName}]`).value;
        }
    },
    custom: {
        condition: field => {
            const hasCustom = field.hasAttribute('data-val-custom'),
                hasCustomError = field.hasAttribute('data-val-custom-error');
            if (hasCustomError && !hasCustom) {
                throw new Error('f-validate: specify data-val-custom along with data-val-custom-error attribute');
            }
            return hasCustom;
        },
        test: null
    }
};

export default testDefinitions;
