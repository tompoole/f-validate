export default {
    email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    escapeChars: /[|\\{}()[\]^$+*?.]/g,
    cssClasses: {
        isHidden: 'is-hidden',
        formError: 'form-error',
        formErrors: 'form-errors',
        hasError: 'has-error',
        hasSuccess: 'has-success'
    },
    fieldValues: 'input, select, textarea, .validation-group'
};
