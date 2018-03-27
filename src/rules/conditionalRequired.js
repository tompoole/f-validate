/**
 * Conditional Required Rule
 * -------------------------
 * This validation rule checks that if a specified checkbox is not checked, then it is required that a value must be entered in the field with this validation check.
 *
 * This also means that if the specified checkbox is checked, then the field is not required and the form will return valid when the field is empty.
 *
 */
export default {
    condition: field => field.hasAttribute('data-val-conditionalRequired'),

    test: field => {
        const input = document.querySelector(`[name='${field.getAttribute('data-val-conditionalRequired')}']`);
        const isChecked = input ? input.checked : true;

        return isChecked || field.value.trim().length > 0;
    },

    defaultMessage: 'This field is required.'
};
