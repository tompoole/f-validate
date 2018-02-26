/**
 * Email Rule
 * --------------
 * Checks for a valid email address
 *
 */
import CONSTANTS from '../constants';

export default {
    condition: field => field.getAttribute('type') === 'email',

    test: field => {
        // if the field is empty, should validate as true
        if (field.value === '') {
            return true;
        }
        return CONSTANTS.email.test(field.value);
    },

    defaultMessage: 'This field must contain a valid email address.'
};
