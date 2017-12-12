const cssClasses = {
    isHidden: 'is-hidden',
    formError: 'form-error',
    formErrors: 'form-errors',
    hasError: 'has-error',
    hasSuccess: 'has-success'
};

const validationGroup = 'data-val-group';

export default {
    cssClasses,
    email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    escapeChars: /[|\\{}()[\]^$+*?.]/g,
    fieldValues: `input, select, textarea, [${validationGroup}]`,
    validationGroup,
    validateOnOptions: ['blur', 'keyup']
};
