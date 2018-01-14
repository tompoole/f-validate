
export default {
    condition: field => field.hasAttribute('maxlength') || field.hasAttribute('data-val-maxlength'),

    test: field => field.value.trim().length <= parseInt(field.getAttribute('maxlength')
        || field.getAttribute('data-val-maxlength'), 10)
};
