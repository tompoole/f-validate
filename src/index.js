const FIELD_VALUES = 'input';

export const defaultOptions = {
    errorClass: 'has-error',
    successClass: 'has-success',
    focus: false
};

const getForm = descriptor => {

    if (!descriptor) {
        throw new Error('f-validate: expected form name or form node parameter');
    }

    const form = typeof descriptor === 'object' && descriptor.tagName === 'FORM' ?
        descriptor : document.forms[descriptor];

    if (!form) {
        throw new Error('f-validate: form not found');
    }

    return form;

};

export default class FormValidation {

    constructor (nameOrNode, options = {}) {
        this.options = Object.assign({}, defaultOptions, options);
        this.form = getForm(nameOrNode);
        this.fields = this.form.querySelectorAll('input');
    }

    isValid () {

        let formValid = true;

        this.fields.forEach(field => {

            if ((field.hasAttribute('required') || field.hasAttribute('data-required')) && field.value === '') {
                formValid = false;
            }

        });

        return formValid;

    }

}

