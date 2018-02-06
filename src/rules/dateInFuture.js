import $ from '@justeat/f-dom';

export default {
    condition: field => field.hasAttribute('data-val-dateInFuture'),

    test: element => {

        const dateToday = new Date();
        const currentMonth = dateToday.getMonth() + 1;
        const currentYear = dateToday.getFullYear();

        const selectedMonthEl = $.first('[data-val-dateInFuture-type="month"]', element);
        const selectedYearEl = $.first('[data-val-dateInFuture-type="year"]', element);
        const selectedMonthVal = Number(selectedMonthEl.value);
        const selectedYearVal = Number(selectedYearEl.value);

        if (selectedYearVal > currentYear && selectedMonthVal > 0) {
            return true;
        }

        return selectedYearVal === currentYear && selectedMonthVal >= currentMonth;

    },

    touchedSelectors: ['[data-val-dateInFuture-type="month"]', '[data-val-dateInFuture-type="year"]'],

    defaultMessage: 'This date must be in the future.'
};
