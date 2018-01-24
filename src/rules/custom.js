export default {
    condition: field => {
        const hasCustom = field.hasAttribute('data-val-custom');
        const hasCustomError = field.hasAttribute('data-val-custom-error');

        if (hasCustomError && !hasCustom) {
            throw new Error('f-validate: specify data-val-custom along with data-val-custom-error attribute');
        }

        return hasCustom;
    },

    test: null,

    defaultMessage: 'Custom validation failed.'
};
