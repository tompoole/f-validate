/**
 * Email Rule
 * --------------
 * Checks for a valid email address
 *
 */
import CONSTANTS from '../constants';

export default {
    condition: field => field.getAttribute('type') === 'email',

    test: (field, currentValue, options) => {
        // if the field is empty, should validate as true
        if (field.value === '') {
            return true;
        }

        // if a custom email regex is provided use that, otherwise fallback to default
        const emailRegex = (options.customEmailRegex && options.customEmailRegex instanceof RegExp)
            ? options.customEmailRegex
            : CONSTANTS.email;

        return emailRegex.test(field.value);
    },

    defaultMessage: 'This field must contain a valid email address.'
};
