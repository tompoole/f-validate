import $ from '@justeat/f-dom';
import testDefinitions from './rules';
import CONSTANTS from './constants';

const getCustomErrorElement = (field, form) => {
    const errorPlacement = field.getAttribute('data-val-error-placement');
    const errorElement = $.first(errorPlacement, form);

    return errorElement;
};

export const getInlineErrorElement = (field, form) => {
    const nextSibling = field.nextElementSibling;
    const customErrorEl = getCustomErrorElement(field, form);

    if (
        customErrorEl &&
        customErrorEl.nextElementSibling &&
        customErrorEl.nextElementSibling.classList.contains(
            CONSTANTS.cssClasses.formError
        )
    ) {
        return customErrorEl.nextElementSibling;
    }

    if (nextSibling && nextSibling.classList.contains(CONSTANTS.cssClasses.formError)) {
        return nextSibling;
    }

    return false;
};

export const displayInlineMessage = (errorElement, customMessage, field, form) => {
    let updateElement = errorElement;
    const customErrorEl = getCustomErrorElement(field, form) || field;

    if (!errorElement) {
        updateElement = document.createElement('p');
        updateElement.classList.add(CONSTANTS.cssClasses.formError);
        field.parentNode.insertBefore(updateElement, customErrorEl.nextSibling);
    }

    updateElement.textContent = customMessage;
    updateElement.classList.remove(CONSTANTS.cssClasses.isHidden);
};

export const hideMessage = errorElement => {
    if (!errorElement) {
        return;
    }

    errorElement.classList.add(CONSTANTS.cssClasses.isHidden);
    errorElement.innerHTML = '';
};

const getDefaultMessage = (field, ruleName) => {
    if (!testDefinitions[ruleName].defaultMessageValue) {
        return testDefinitions[ruleName].defaultMessage;
    }

    return testDefinitions[ruleName].defaultMessage.replace(
        '{0}',
        testDefinitions[ruleName].defaultMessageValue(field)
    );
};

export const getMessage = (field, ruleName) =>
    field.getAttribute(`data-${ruleName}-error`) || getDefaultMessage(field, ruleName);
