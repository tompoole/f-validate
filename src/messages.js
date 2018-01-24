import testDefinitions from './rules';
import CONSTANTS from './constants';

export const getInlineErrorElement = field => {
    const nextSibling = field.nextElementSibling;

    if (nextSibling && nextSibling.classList.contains(CONSTANTS.cssClasses.formError)) {

        return nextSibling;
    }

    return false;
};

export const displayInlineMessage = (errorElement, customMessage, field) => {

    let updateElement = errorElement;

    if (!errorElement) {
        updateElement = document.createElement('p');
        updateElement.classList.add(CONSTANTS.cssClasses.formError);
        field.parentNode.insertBefore(updateElement, field.nextSibling);
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

    return testDefinitions[ruleName].defaultMessage.replace('{0}', testDefinitions[ruleName]
        .defaultMessageValue(field));
};

export const getMessage = (field, ruleName) => field.getAttribute(`data-${ruleName}-error`)
    || getDefaultMessage(field, ruleName);

