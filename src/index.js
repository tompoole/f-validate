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
        this.form.addEventListener('submit', this.isValid.bind(this));
        this.fields = this.getFields();
        this.customHandlers = {};
        this.onSuccessCallBacks = [];
        this.onErrorCallBacks = [];
        if (this.options.onSuccess) {
            this.onSuccess(this.options.onSuccess);
        }
        if (this.options.onError) {
            this.onError(this.options.onError);
        }
    }

    onSuccess (callBack) {

        if (typeof callBack === 'function') {
            this.onSuccessCallBacks.push(callBack);
        } else {
            throw new Error('f-validate: onSuccess must be a function');
        }

    }

    onError (callBack) {

        if (typeof callBack === 'function') {
            this.onErrorCallBacks.push(callBack);
        } else {
            throw new Error('f-validate: onError must be a function');
        }

    }

    runSuccessCallbacks () {

        this.onSuccessCallBacks.forEach(callback => {
            callback();
        });

    }

    runErrorCallbacks () {

        this.onErrorCallBacks.forEach(callback => {
            callback();
        });

    }

    setSuccess (element) {
        element.classList.remove(this.options.errorClass);
        element.classList.add(this.options.successClass);
    }

    setError (element) {
        element.classList.remove(this.options.successClass);
        element.classList.add(this.options.errorClass);
    }

    isValid (event) {

        let formValid = true;

        this.fields.forEach(field => {

            // This needs to be set outside of the forEach loop, as otherwise only the final rule will apply the state
            let fieldValid = true;

            // This prevents us from applying state classes to fields without rules
            let fieldHasValidation = false;

            VALIDATION_KEYS.forEach(key => {
                const definition = testDefinitions[key];

                if (field.getAttribute('data-val-custom')) {
                    testDefinitions.custom.test = this.customHandlers[field.getAttribute('data-val-custom')];
                }

                if (definition.condition(field)) {
                    fieldHasValidation = true;
                    if (!definition.test(field)) {
                        fieldValid = false;
                    }
                }

            });

            if (fieldHasValidation) {
                if (fieldValid) {
                    this.setSuccess(field);
                } else {
                    formValid = false;
                    this.setError(field);
                }
            }

        });

        if (!formValid) {

            this.setError(this.form);
            this.runErrorCallbacks();

            if (event) {
                event.preventDefault();
            }

        } else {

            this.setSuccess(this.form);
            this.runSuccessCallbacks();

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

    getFields () {
        return Array.from(this.form.querySelectorAll(FIELD_VALUES)).filter(f =>
            !(f.hasAttribute('type') && f.getAttribute('type') === 'hidden') &&
            !f.hasAttribute('disabled') &&
            !f.hasAttribute('data-novalidate')
        );
    }

}


