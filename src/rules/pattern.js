/**
 * Allows definition of a rule to validate the input value using Regular Expressions (RegEx)
 */

const CONSTANTS = require('../constants');

export default {
    condition: field => field.hasAttribute('pattern') || field.hasAttribute('data-val-regex'),

    test: field => {
        // escape characters that have special meaning inside a regular expression in field value
        const fieldValue = field.value.replace(CONSTANTS.escapeChars, '\\$&');
        const pattern = field.getAttribute('pattern') || field.getAttribute('data-val-regex');

        return RegExp(`^(?:${pattern})$`, 'gim').test(fieldValue);
    }
};
