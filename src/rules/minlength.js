/**
 * Minlength Rule
 * --------------
 * Checks that the value of the field is of a specified minimum length.
 *
 */
export default {
    condition: field => field.hasAttribute('minlength') || field.hasAttribute('data-val-minlength'),

    test: field => {
        // if the field is empty, or attribute is set with no value, should validate as true
        if (field.value === '' || field.getAttribute('minlength') === '' || field.getAttribute('data-val-minlength') === '') {
            return true;
        }

        return field.value.trim().length >= parseInt(field.getAttribute('minlength')
            || field.getAttribute('data-val-minlength'), 10);
    },

    defaultMessage: 'This field must be at least {0} characters in length.',

    defaultMessageValue: field => parseInt(field.getAttribute('minlength')
        || field.getAttribute('data-val-minlength'), 10)
};
