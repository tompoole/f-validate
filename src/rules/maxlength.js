/**
 * Maxlength Rule
 * --------------
 * Checks that the value of the field is not greater than the specified maximum length.
 *
 */
export default {
    condition: field => field.hasAttribute('maxlength') || field.hasAttribute('data-val-maxlength'),

    test: field => {
        // if the field is empty, or attribute is set with no value, should validate as true
        if (field.value === '' || field.getAttribute('maxlength') === '' || field.getAttribute('data-val-maxlength') === '') {
            return true;
        }
        return field.value.trim().length <= parseInt(field.getAttribute('maxlength') || field.getAttribute('data-val-maxlength'), 10);
    },

    defaultMessage: 'This field must not exceed {0} characters in length.',

    defaultMessageValue: field => parseInt(field.getAttribute('maxlength')
        || field.getAttribute('data-val-maxlength'), 10)
};
