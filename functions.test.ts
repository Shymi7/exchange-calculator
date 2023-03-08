import {isInputValid, convertCurrency, receiveExchangeRateFromAPI} from "./functions";

describe('isInputValid function ', () => {
    describe("should return true if html input element's value (after conversion to number)", () => {
        //technically js converts <input> to string, so function takes string as an argument
        test(' is short integer', () => {
            expect(isInputValid('1231')).toBe(true);
        });
        test(' is real number with two decimal digits, separated with "."', () => {
            expect(isInputValid('1231.23')).toBe(true);
        });
        test(' is real number with two decimal digits, separated with ","', () => {
            expect(isInputValid('1231,2')).toBe(true);
        });


    });

    describe("should return false if html input element's value (after conversion to number)", () => {
        test(' is not a number', () => {
            expect(isInputValid('asdfasdf')).toBe(false);
        });
        test(' is negative number', () => {
            expect(isInputValid('-123')).toBe(false);
        });
        test(' is too big', () => {
            expect(isInputValid('9999999999999')).toBe(false);
        });
        test(' has too many decimal digits', () => {
            expect(isInputValid('23,562')).toBe(false);
        });


    });
});

describe('convertCurrency function returns', () => {
    const exchangeRate = 5.28;

    //note that it returns rounded value
    test(' valid value of exchanging GBP to PLN', () => {
        expect(convertCurrency('fromGBPtoPLN', 56, exchangeRate)).toBe(295.68);
    });
    test(' valid value of exchanging PLN to GBP ', () => {
        expect(convertCurrency('fromPLNtoGBP', 23.5, exchangeRate)).toBe(4.45);
    });

});

