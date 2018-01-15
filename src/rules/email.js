import CONSTANTS from '../constants';

export default {
    condition: field => field.getAttribute('type') === 'email',

    test: field => CONSTANTS.email.test(field.value)
};
