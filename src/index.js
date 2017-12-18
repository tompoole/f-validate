import testDefinitions from './rules';

const FIELD_VALUES = 'input, select, textarea';
const VALIDATION_KEYS = Object.keys(testDefinitions);

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
        this.fields = this.form.querySelectorAll(FIELD_VALUES);
        this.customHandlers = {};
    }

    setSuccess (element) {
        element.classList.remove(this.options.errorClass);
        element.classList.add(this.options.successClass);
    }

    setError (element) {
        element.classList.remove(this.options.successClass);
        element.classList.add(this.options.errorClass);
    }

    isValid () {

        let formValid = true;

        this.fields.forEach(field => {

            VALIDATION_KEYS.forEach(key => {
                const definition = testDefinitions[key];

                if (field.getAttribute('data-val-custom')) {
                    testDefinitions.custom.test = this.customHandlers[field.getAttribute('data-val-custom')];
                }

                if (definition.condition(field)) {
                    if (definition.test(field)) {
                        this.setSuccess(field);
                    } else {
                        formValid = false;
                        this.setError(field);
                    }
                }
            });

        });

        if (!formValid) {
            this.setError(this.form);
        } else {
            this.setSuccess(this.form);
        }

        return formValid;

    }

    addCustomValidation (name, handler) {
        if (!name || typeof name !== 'string') {
            throw new Error('f-validate: please provide the name');
        }
        if (!handler || typeof handler !== 'function') {
            throw new Error('f-validate: please provide a custom method');
        }
        this.customHandlers[name] = handler;
    }

}


