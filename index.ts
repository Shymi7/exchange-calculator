function isInputValid(input: string): boolean {
    const decimalNumbersLimit = 2;
    const maxNumber = 999999999.99; //greatest number that can be calculated
    const inputAsNumber = Number(input);

    if (isNaN(inputAsNumber))//check if input is a number
        return false;

    if (inputAsNumber <= 0)//check if input isn't lesser than 0
        return false;

    if (inputAsNumber > maxNumber)//check if input isn't too big
        return false;

    if (!Number.isInteger(inputAsNumber)) {//check if input hasn't too many decimal numbers
        const decimalNumbers = input.includes('.') ? input.split('.')[1] : input.split(',')[1];
        if (decimalNumbers.length > decimalNumbersLimit)
            return false;
    }

    //return true if everything is ok
    return true;
}

//how much PLN is worth 1 unit of given currency
async function receiveExchangeValueFromAPI(currency: string = 'gbp'): Promise<number> {
    const urlToApi = 'http://api.nbp.pl/api/exchangerates/rates/a/gbp/?format=json';
    console.log('asdfasdf');
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
    const decimalNumbers = 2;

    //calculating value
    const result = mode == 'fromGBPtoPLN' ? ( inputValue * exchangeRate ) : ( inputValue / exchangeRate );

    //formatting result to number with 2 decimal number
    return Number(result.toFixed(decimalNumbers));
}

const exchangeRate = receiveExchangeValueFromAPI('gbp')
    .then((result)=>{
        document.querySelector<HTMLInputElement>('#exchange-rate-value')!.innerText = result.toFixed(2);
        return result;
    });

const sendInput = document.querySelector<HTMLInputElement>('#send-input')!;
const receiveInput = document.querySelector<HTMLInputElement>('#receive-input')!;


sendInput.addEventListener('input', async () => {
    const value = sendInput.value
    if (isInputValid(value)) {
        document.querySelector<HTMLInputElement>('#send-input-frame')!
            .style.backgroundColor = '#FFFFFFFF';

        receiveInput.value = String(
            convertCurrency('fromGBPtoPLN', Number(value), await exchangeRate));

    } else {
        document.querySelector<HTMLInputElement>('#send-input-frame')!
            .style.backgroundColor = '#FF6B6BFF';
    }
})

receiveInput.addEventListener('input', async () => {
    const value = receiveInput.value
    if (isInputValid(value)) {
        document.querySelector<HTMLInputElement>('#receive-input-frame')!
            .style.backgroundColor = '#FFFFFFFF';

        sendInput.value = String(
            convertCurrency('fromPLNtoGBP', Number(value), await exchangeRate));

    } else {
        document.querySelector<HTMLInputElement>('#receive-input-frame')!
            .style.backgroundColor = '#FF6B6BFF';
    }
})
