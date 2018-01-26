const cssClasses = {
    isHidden: 'is-hidden',
    formError: 'form-error',
    formErrors: 'form-errors',
    hasError: 'has-error',
    hasSuccess: 'has-success',
    validationGroup: 'validation-group'
};

export default {
    cssClasses,
    email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    escapeChars: /[|\\{}()[\]^$+*?.]/g,
    fieldValues: `input, select, textarea, .${cssClasses.validationGroup}`,
    validateOnOptions: ['blur', 'keyup']
};
