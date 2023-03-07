"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertCurrency = exports.receiveExchangeRateFromAPI = exports.isInputValid = void 0;
function isInputValid(input) {
    const decimalDigitsLimit = 2;
    const maxNumber = 999999999.99; //greatest number that can be calculated
    const inputAsNumber = Number(//converts string to number
    input.replace(',', '.') //replaces ',' to '.' so comma separated values are valid
    );
    if (isNaN(inputAsNumber)) //check if input is a number
        return false;
    if (inputAsNumber <= 0) //check if input isn't lesser than 0
        return false;
    if (inputAsNumber > maxNumber) //check if input isn't too big
        return false;
    if (!Number.isInteger(inputAsNumber)) { //check if input hasn't too many decimal digits
        const decimalDigits = input.includes('.') ? input.split('.')[1] : input.split(',')[1];
        if (decimalDigits.length > decimalDigitsLimit)
            return false;
    }
    //return true if everything is ok
    return true;
}
exports.isInputValid = isInputValid;
//how much PLN is worth 1 unit of given currency
function receiveExchangeRateFromAPI(currency = 'gbp') {
    return __awaiter(this, void 0, void 0, function* () {
        const urlToApi = 'http://api.nbp.pl/api/exchangerates/rates/a/gbp/?format=json';
        console.log('asdfasdf');
        try {
            //receiving data from API
            const response = yield fetch(urlToApi);
            const data = yield response.json();
            return data.rates[0].mid; //how much PLN is worth 1 GBP
        }
        catch (error) {
            console.log(error);
            return 0; //0 is default if API doesn't work
        }
    });
}
exports.receiveExchangeRateFromAPI = receiveExchangeRateFromAPI;
function convertCurrency(mode, inputValue, exchangeRate) {
    const decimalDigits = 2;
    //calculating value
    const result = mode == 'fromGBPtoPLN' ? (inputValue * exchangeRate) : (inputValue / exchangeRate);
    //formatting result to number with two decimal digits
    return Number(result.toFixed(decimalDigits));
}
exports.convertCurrency = convertCurrency;
