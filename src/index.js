/**
 * @module Validate
 *
 * ## Goals
 *
 * To validate a form based on the HTML5 attributes each form has, or the data attributes specified on them
 *
 * Should accept either:
 *
 * 1. A form DOM Element
 * 2. A string relating to the name of the form
 *
 * Should also be able to label a form field with `data-novalidate`
 * to remove it from those being validated
 *
 */

import $ from '@justeat/f-dom';
import testDefinitions from './rules';
import { addCallBack, runCallbacks } from './callbacks';
import { getInlineErrorElement, displayInlineMessage, hideMessage, getMessage } from './messages';
import CONSTANTS from './constants';

// Load in the set of test definitions to validate against
const VALIDATION_KEYS = Object.keys(testDefinitions);

export const defaultOptions = {
    errorClass: CONSTANTS.cssClasses.hasError,
    successClass: CONSTANTS.cssClasses.hasSuccess,
    focus: false,
    groupErrorPlacement: false
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

const elementsUntouched = (element, current, touchedSelectors) => {

    const notInErrorState = !current.field.classList.contains(CONSTANTS.cssClasses.hasError);
    const elementsNotTouched = touchedSelectors
        .map(childSelector => $.first(childSelector, element))
        .filter(el => el && !el.hasAttribute('data-touched'));

    // If one select has not been interacted with do not run test method
    return notInErrorState && elementsNotTouched.length > 0;

};

export default class FormValidation {

    constructor (nameOrNode, options = {}) {
        this.options = Object.assign({}, defaultOptions, options);
        this.form = getForm(nameOrNode);
        this.form.addEventListener('submit', this.isValid.bind(this));
        this.fields = this.getFields();
        this.customHandlers = {};
        this.callBacks = {};
        if (this.options.onSuccess) {
            this.on('success', this.options.onSuccess);
        }
        if (this.options.onError) {
            this.on('error', this.options.onError);
        }
        if (this.options.validateOn) {
            this.validateOn();
        }
        this.errorMessages = [];
    }

    /**
     * on - Associates a callback with an event.
     * Callbacks associated with an event will be called when the event fires.
     * example:
     *      formValidator.on('success', () => {
     *          Do something when the form is found to be valid.
     *      });
     *      formValidator.on('error', () => {
     *          Do something when the form is found to be invalid.
     *      });
     */
    on (callBackEvent, callBack) {

        if (!this.callBacks[callBackEvent]) {
            this.callBacks[callBackEvent] = [];
        }

        try {
            addCallBack(this.callBacks[callBackEvent], callBack, callBackEvent);
        } catch (exception) {
            throw new TypeError(`f-validate: ${callBackEvent} callback must be a function`);
        }

    }

    setSuccess (element) {
        element.classList.remove(this.options.errorClass);
        element.classList.add(this.options.successClass);
    }

    setError (element) {
        element.classList.remove(this.options.successClass);
        element.classList.add(this.options.errorClass);
    }

    /**
     * Validates the form
     *
     * @param event
     * @param {object} currentElement
     * @returns {boolean}
     */
    isValid (event, currentElement) {

        let formValid = true;
        this.errorMessages = [];

        this.fields.forEach(field => {

            // currentElement refers to an element that is being validated on blur/keyup
            // only validate on blur/keyup if the field is not empty
            if (currentElement && (currentElement.field !== field || field.value === '')) {
                return;
            }

            let errorMessage = '';

            // This needs to be set outside of the forEach loop, as otherwise only the final rule will apply the state
            let fieldValid = true;

            // This prevents us from applying state classes to fields without rules
            let fieldHasValidation = false;

            VALIDATION_KEYS.forEach(ruleName => {
                const definition = testDefinitions[ruleName];

                if (field.getAttribute('data-val-custom')) {
                    testDefinitions.custom.test = this.customHandlers[field.getAttribute('data-val-custom')];
                }

                if (definition.condition(field)) {
                    fieldHasValidation = true;
                    let skipTest = false;

                    // If rule has elements that need to be checked for touch, and validation is happening on blur/keyup
                    if (definition.touchedSelectors && currentElement) {
                        currentElement.childField.setAttribute('data-touched', true);
                        skipTest = elementsUntouched(field, currentElement, definition.touchedSelectors);
                    }

                    if (!skipTest && !definition.test(field, currentElement)) {
                        fieldValid = false;
                        errorMessage = getMessage(field, ruleName);
                        this.errorMessages.push(errorMessage);
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

                if (!this.options.groupErrorPlacement) {
                    const errorElement = getInlineErrorElement(field, this.form);
                    if (fieldValid) {
                        hideMessage(errorElement);
                    } else {
                        displayInlineMessage(errorElement, errorMessage, field, this.form);
                    }
                }

            }

        });

        if (!formValid) {
            this.setError(this.form);
            runCallbacks(this.callBacks.error);

            if (event) {
                event.preventDefault();
            }
        } else {
            this.setSuccess(this.form);
            runCallbacks(this.callBacks.success);
        }

        if (this.options.groupErrorPlacement) {
            const groupedErrorElement = this.findGroupedErrorElement();
            if (formValid) {
                hideMessage(groupedErrorElement);
            } else {
                this.displayGroupedMessages(groupedErrorElement);
            }
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
        return Array
            .from(this.form.querySelectorAll(CONSTANTS.fieldValues))
            .filter(f => !(f.hasAttribute('type')
                && f.getAttribute('type') === 'hidden')
                && !f.hasAttribute('disabled')
                && !f.hasAttribute('data-novalidate')
                && !f.parentElement.hasAttribute(CONSTANTS.validationGroup));
    }

    findGroupedErrorElement () {
        const groupedErrorElement = this.form.querySelector(`.${CONSTANTS.cssClasses.formErrors}`);

        return groupedErrorElement !== null
            ? groupedErrorElement
            : false;
    }

    displayGroupedMessages (groupedErrorElement) {

        let updateElement = groupedErrorElement;

        if (!groupedErrorElement) {
            updateElement = document.createElement('ul');
            updateElement.classList.add(CONSTANTS.cssClasses.formErrors);

            this.form.insertBefore(updateElement, this.getGroupedErrorPosition());

        } else {
            groupedErrorElement.innerHTML = '';
        }

        this.errorMessages.forEach(error => {
            const li = document.createElement('li');
            li.textContent = error;
            updateElement.appendChild(li);
        });
    }

    getGroupedErrorPosition () {

        const groupElement = this.form.querySelector(this.options.groupErrorPlacement);

        if (groupElement) {
            return groupElement;
        }

        if (this.options.groupErrorPlacement === 'bottom') {
            return this.form.lastChild;
        }

        return this.form.firstChild;

    }

    /**
     * Validates form field(s) based on the event passed into options.validateOn
     *
     * example:
     *       this.validation = new FormValidation(this.form, {
     *           validateOn: 'blur'
     *       });
     */
    validateOn () {

        if (this.options.groupErrorPlacement) {
            throw new Error('f-validate: validation on \'blur\' or \'keyup\' cannot be performed if errors are grouped');
        }

        if (CONSTANTS.validateOnOptions.indexOf(this.options.validateOn) === -1) {
            throw new Error('f-validate: valid options for the \'validateOn\' property are \'blur\' or \'keyup\'');
        }

        this.fields.forEach(field => {
            if (field.hasAttribute(CONSTANTS.validationGroup)) {
                field.querySelectorAll(CONSTANTS.fieldValues).forEach(childField =>

                    // Binds each form element within a validation-group to the specified event.
                    // When this event is triggered the validation-group element will be passed as the element to test.
                    // The child field is also passed for use within a rule test method
                    // Null is being passed as the isValid method expects 'field' as its second argument
                    childField.addEventListener(this.options.validateOn,
                        this.isValid.bind(this, null, {
                            field,
                            childField
                        })
                    )
                );

            } else {
                // Null is being passed as the isValid method expects 'field' as its second argument
                field.addEventListener(this.options.validateOn, this.isValid.bind(this, null, { field }));
            }
        });
    }

}
