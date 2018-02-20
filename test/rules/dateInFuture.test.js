import TestUtils from 'js-test-buddy';
import FormValidation from '../../src';
import stubDate from '../helpers/stubDate';

describe('dateInFuture validation rules', () => {

    // Represents the current date to test against
    stubDate('Oct 16, 2018');

    it('should return invalid if both year and month are untouched', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                <div data-val-group
                                    data-val-dateinfuture>
                                     <select data-val-dateinfuture-type="year">
                                        <option value="" ></option>
                                        <option value="2018">2018</option>
                                    </select>
                                    <select data-val-dateinfuture-type="month">
                                        <option value="" ></option>
                                        <option value="01">01</option>
                                    </select>
                                </div>
                            </form>`);

        const form = document.querySelector('form');
        const validateForm = new FormValidation(form);

        // Act
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(false);

    });

    it('should return valid if year selected is beyond current year', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                <div data-val-group
                                    data-val-dateinfuture>
                                     <select data-val-dateinfuture-type="year">
                                        <option value="" ></option>
                                        <option value="2018">2018</option>
                                        <option value="2019">2019</option>
                                        <option value="2020" selected>2020</option>
                                    </select>
                                    <select data-val-dateinfuture-type="month">
                                        <option value="" ></option>
                                        <option value="01" selected>01</option>
                                    </select>
                                </div>
                            </form>`);

        const form = document.querySelector('form');
        const validateForm = new FormValidation(form);

        // Act
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(true);

    });

    it('should return valid if year selected is current year, and month is current month', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                    <div data-val-group
                                        data-val-dateinfuture>
                                    <select data-val-dateinfuture-type="year">
                                        <option value="" ></option>
                                        <option value="2018" selected>2018</option>
                                        <option value="2019">2019</option>
                                        <option value="2020">2020</option>
                                    </select>
                                    <select data-val-dateinfuture-type="month">
                                        <option value="" ></option>
                                        <option value="10" selected>10</option>
                                    </select>
                                </div>
                            </form>`);

        const form = document.querySelector('form');
        const validateForm = new FormValidation(form);

        // Act
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(true);

    });

    it('should return valid if year selected is current year, and month selected is future month', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                    <div data-val-group
                                        data-val-dateinfuture>
                                        <select data-val-dateinfuture-type="year">
                                            <option value="" ></option>
                                            <option value="2018" selected>2018</option>
                                            <option value="2019">2019</option>
                                            <option value="2020">2020</option>
                                        </select>
                                        <select data-val-dateinfuture-type="month">
                                            <option value="" ></option>
                                            <option value="11" selected>11</option>
                                        </select>
                                    </div>
                                </form>`);

        const form = document.querySelector('form');
        const validateForm = new FormValidation(form);

        // Act
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(true);

    });

    it('should return invalid if year selected is current year, and month selected is previous month', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                <div data-val-group
                                    data-val-dateinfuture>
                                    <select data-val-dateinfuture-type="year">
                                        <option value="" ></option>
                                        <option value="2018" selected>2018</option>
                                        <option value="2019">2019</option>
                                        <option value="2020">2020</option>
                                    </select>
                                    <select data-val-dateinfuture-type="month">
                                        <option value="" ></option>
                                        <option value="9" selected>9</option>
                                    </select>
                                </div>
                            </form>`);

        const form = document.querySelector('form');
        const validateForm = new FormValidation(form);

        // Act
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(false);

    });

    it('should return false if year selected is next year, and month is untouched', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                <div data-val-group
                                    data-val-dateinfuture>
                                    <select data-val-dateinfuture-type="year">
                                        <option value="" ></option>
                                        <option value="2018">2018</option>
                                        <option value="2019" selected>2019</option>
                                        <option value="2020">2020</option>
                                    </select>
                                    <select data-val-dateinfuture-type="month">
                                        <option value="" ></option>
                                    </select>
                                </div>
                            </form>`);

        const form = document.querySelector('form');
        const validateForm = new FormValidation(form);

        // Act
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(false);

    });

});
