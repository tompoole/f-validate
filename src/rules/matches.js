/**
 * Matches Rule
 * ------------
 * Checks that the value of the field being validated matches the value of a separate specified field
 *
 */
import $ from '@justeat/f-dom';

export default {
    condition: field => field.hasAttribute('data-val-equalto'),

    test: field => {
        const matchedFieldName = field.getAttribute('data-val-equalto');

        if (matchedFieldName) {
            const input = $.first(`input[name=${matchedFieldName}]`);

            return matchedFieldName
                && input
                && field.value === input.value;
        }

        return false;
    },

    defaultMessage: 'This field does not match the {0} field.',

    defaultMessageValue: field => field.getAttribute('data-val-equalto').replace('*.', '')
};
