
export default {
    condition: field => field.hasAttribute('minlength') || field.hasAttribute('data-val-minlength'),

    test: field => {
        // if the field is empty, should validate as true
        if (field.value === '') {
            return true;
        }

        return field.value.trim().length >= parseInt(field.getAttribute('minlength')
            || field.getAttribute('data-val-minlength'), 10);
    }
};
