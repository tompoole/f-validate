import $ from '@justeat/f-dom';

export default {
    condition: field => field.hasAttribute('data-val-dateInFuture'),

    test: element => {

        const dateToday = new Date();
        const currentMonth = dateToday.getMonth() + 1;
        const currentYear = dateToday.getFullYear();

        const selectedMonth = Number($.first('[data-val-dateInFuture-type="month"]', element).value);
        const selectedYear = Number($.first('[data-val-dateInFuture-type="year"]', element).value);

        if (selectedYear > currentYear && selectedMonth > 0) {
            return true;
        }

        return selectedYear === currentYear && selectedMonth > currentMonth;

    },

    defaultMessage: 'This date must be in the future.'
};
