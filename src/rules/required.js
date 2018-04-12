/**
 * Required Rule
 * -------------
 * Checks that a value is present for the field being validated
 *
 */
import $ from '@justeat/f-dom';

export default {
    condition: field => field.hasAttribute('required') || field.hasAttribute('data-val-required'),

    test: field => {
        // Required checkbox & radio, 1 should be checked.
        if (field.type === 'radio') {
            const radioInputs = $(`[name='${field.name}']:checked`);
            return radioInputs.length > 0;
        }

        if (field.type === 'checkbox') {
            return field.checked === true;
        }

        return field.value.trim().length > 0;
    },

    defaultMessage: 'This field is required.'
};
