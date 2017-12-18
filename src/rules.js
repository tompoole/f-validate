const testDefinitions = {
    required: {
        condition: field => { return field.hasAttribute('required') || field.hasAttribute('data-val-required'); },
        test: field => {
            // Required checkbox & radio, 1 should be checked.
            if (field.type === 'radio') {
                const radioInputs = document.querySelectorAll(`[name='${field.name}']:checked`);
                return (radioInputs.length > 0);
            }
            if (field.type === 'checkbox') {
                return (field.checked === true);
            }
            return (field.value.trim()).length > 0;
        },
        // dataAttr: 'val-required',
        // errorAttr: 'val-required-error',
        // errorMessage: 'This field is required.'
    },
    maxlength: {
        condition: field => { return field.hasAttribute('maxlength') || field.hasAttribute('data-val-maxlength'); },
        test: field => {
            return (field.value.trim()).length <= parseInt(field.getAttribute('maxlength') || field.getAttribute('data-val-maxlength'), 10);
        },
        // dataAttr: 'val-maxlength',
        // errorAttr: 'val-maxlength-error',
        // errorMessage: 'This field must not exceed %s characters in length.'
    },
    minlength: {
        condition: field => { return field.hasAttribute('minlength') || field.hasAttribute('data-val-minlength'); },
        test: field => {
            // if the field is empty, should validate as true
            if (field.value === '') {
                return true;
            }
            return (field.value.trim()).length >= parseInt(field.getAttribute('minlength') || field.getAttribute('data-val-minlength'), 10);
        },
        // dataAttr: 'val-minlength',
        // errorAttr: 'val-minlength-error',
        // errorMessage: 'This field must be at least %s characters in length.'
    },
    // Allows definition of a rule to validate the input value using Regular Expressions (RegEx)
    pattern: {
        condition: field => { return field.hasAttribute('pattern') || field.hasAttribute('data-val-regex'); },
        test: field => {
            //escape characters that have special meaning inside a regular expression in field value
            const fieldValue = field.value.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
            const pattern = field.getAttribute('pattern') || field.getAttribute('data-val-regex');
            return new RegExp(`^(?:${pattern})$`, 'gim').test(fieldValue);
        },
        // dataAttr: 'val-regex',
        // errorAttr: 'val-regex-error',
        // errorMessage: 'This field contains a value that isn’t accepted.'
    },
    // email: {
    //     condition: field => { return field.getAttribute('type') === 'email'; },
    //     test: field => {
    //         //TODO: This line below is in master and breaks the JS build task so I've removed it from the linter
    //         /* eslint-disable */
    //         return /^[a-zA-Z0-9.!#$%&’*+\/=?\^_`{|}~\-]+@[a-zA-Z0-9\-]+(?:\.[a-zA-Z0-9\-]+)*$/.test(field.value);
    //         /* eslint-enable */
    //     },
    //     dataAttr: 'val-email',
    //     errorAttr: 'val-email-error',
    //     errorMessage: 'This field must contain a valid email address.'
    // },
    // matches: {
    //     condition: field => { return field.hasAttribute('data-val-equalto'); },
    //     test: field => {
    //         const dataValue = field.getAttribute('data-val-equalto').replace('*.', '');
    //         return field.value === document.querySelector(`input[name=${dataValue}]`).value;
    //     },
    //     dataAttr: 'val-equalto',
    //     errorAttr: 'val-equalto-error',
    //     errorMessage: 'This field does not match the %s field.'
    // },
    // custom: {
    //     condition: field => {
    //         const hasCustomFunction = field.hasAttribute('data-val-custom'),
    //             hasCustomError = field.hasAttribute('data-val-custom-error');
    //         if (hasCustomError && !hasCustomFunction) {
    //             console.error('Specify data-val-custom along with data-val-custom-error attribute. Register custom validation function via Validate.addCustomValidationFunction', this);
    //         }
    //         return hasCustomFunction;
    //     },
    //     test: () => {
    //         // Function body must be overriden via Validate.addCustomValidationFunction
    //         console.error('Specify name of custom validation function in data-val-custom attribute. Then register custom validation function via Validate.addCustomValidationFunction', this);
    //     },
    //     dataAttr: 'val-custom',
    //     errorAttr: 'val-custom-error',
    //     errorMessage: 'Custom validation failed.'
    // }
};

export default testDefinitions;

// /**
// * getTestDefinitions
// *
// * Returns the test definitions as an array of objects
// */
// function getTestDefinitions () {
//     const validationRules = [];

//     for (const testDefinition in testDefinitions) {
//         validationRules.push(testDefinition);
//     }
//     return validationRules;
// }

// export default getTestDefinitions;
