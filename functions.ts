function isInputValid(input: string): boolean {
    const decimalDigitsLimit = 2;
    const maxNumber = 999999999.99; //greatest number that can be calculated

    const inputAsNumber = Number(//converts string to number
        input.replace(',', '.')//replaces ',' to '.' so comma separated values are valid
    );

    if (isNaN(inputAsNumber))//check if input is a number
        return false;

    if (inputAsNumber < 0)//check if input isn't lesser than 0
        return false;

    if (inputAsNumber > maxNumber)//check if input isn't too big
        return false;

    if (!Number.isInteger(inputAsNumber)) {//check if input hasn't too many decimal digits
        const decimalDigits = input.includes('.') ? input.split('.')[1] : input.split(',')[1];
        if (decimalDigits.length > decimalDigitsLimit)
            return false;
    }

    //return true if everything is ok
    return true;
}


//how much PLN is worth 1 unit of given currency
async function receiveExchangeRateFromAPI(currency: string = 'gbp'): Promise<number> {
    const urlToApi = 'http://api.nbp.pl/api/exchangerates/rates/a/gbp/?format=json';
    try {
        //receiving data from API
        const response = await fetch(urlToApi);
        const data = await response.json();
        return data.rates[0].mid;//how much PLN is worth 1 GBP

    } catch (error) {
        console.log(error);
        return 0; //0 is default if API doesn't work
    }
}


function convertCurrency(mode: 'fromGBPtoPLN' | 'fromPLNtoGBP', inputValue: number, exchangeRate: number): number {
    const decimalDigits = 2;

    //calculating value
    const result = mode == 'fromGBPtoPLN' ? ( inputValue * exchangeRate ) : ( inputValue / exchangeRate );

    //formatting result to number with two decimal digits
    return Number(result.toFixed(decimalDigits));
}

export {isInputValid, receiveExchangeRateFromAPI, convertCurrency};
