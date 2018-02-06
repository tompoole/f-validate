import TestUtils from 'js-test-buddy';
import FormValidation from '../../src';
import stubDate from '../helpers/stubDate';

describe('dateInFuture validation rules', () => {

    stubDate('Oct 16, 2020');

    it('should return true if year selected is beyond current year', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                <div class="validation-group"
                                    data-val-dateinfuture>
                                     <select data-val-dateinfuture-type="year">
                                        <option value="" ></option>
                                        <option value="2021" selected></option>
                                    </select>
                                    <select data-val-dateinfuture-type="month">
                                        <option value="" ></option>
                                        <option value="01" selected></option>
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

    it('should return true if year selected is current year, and month is current month', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                    <div class="validation-group"
                                        data-val-dateinfuture>
                                    <select data-val-dateinfuture-type="year">
                                        <option value="" ></option>
                                        <option value="2020" selected></option>
                                    </select>
                                    <select data-val-dateinfuture-type="month">
                                        <option value="" ></option>
                                        <option value="10" selected></option>
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

    it('should return true if year selected is current year, and month selected is future month', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                    <div class="validation-group"
                                        data-val-dateinfuture>
                                        <select data-val-dateinfuture-type="year">
                                            <option value="" ></option>
                                            <option value="2020" selected></option>
                                        </select>
                                        <select data-val-dateinfuture-type="month">
                                            <option value="" ></option>
                                            <option value="11" selected></option>
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

    it('should return false if year selected is current year, and month selected is previous month', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                <div class="validation-group"
                                    data-val-dateinfuture>
                                    <select data-val-dateinfuture-type="year">
                                        <option value="" ></option>
                                        <option value="2020" selected></option>
                                    </select>
                                    <select data-val-dateinfuture-type="month">
                                        <option value="" ></option>
                                        <option value="9" selected></option>
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
                                <div class="validation-group"
                                    data-val-dateinfuture>
                                    <select data-val-dateinfuture-type="year">
                                        <option value="" ></option>
                                        <option value="2021" selected></option>
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
