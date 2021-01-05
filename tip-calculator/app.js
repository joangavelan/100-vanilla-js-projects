const App = (() => {
    const errorMessagesBox = document.querySelector('.error-messages');
    const ERROR_MESSAGES = document.getElementsByClassName('error-message');
    const closeIcon = document.querySelector('.close');
    const billAmountInput = document.querySelector('.input__bill-amount');
    const billShareInput = document.querySelector('.input__bill-share');
    const rateInputEl = document.querySelector('.input__rate-select');
    const INPUTS = document.getElementsByClassName('input');
    const loadingBarsEl = document.querySelector('.loading-bars');
    const resultsEl = document.querySelector('.results');
    const BUTTONS = document.getElementsByClassName('btn');
    const calcButton = document.querySelector('.calc');
    const newCalcButton = document.querySelector('.new-calc');
    
    const showErrorMessage = (emptyInput) => {
        errorMessagesBox.classList.add('show');
        for(let errorMessage of ERROR_MESSAGES) {
            if(errorMessage.dataset.inputReference === emptyInput) errorMessage.classList.add('show');
            else errorMessage.classList.remove('show');
        }
    }
    
    const displayErrors = () => {
        const emptyInputs = [];
    
        for(let input of INPUTS) {
            input.value === '' ? emptyInputs.push(input.dataset.id) : null;
        }
    
        const emptyInput = emptyInputs[0];
        emptyInputs.length > 1 ? showErrorMessage('general') : showErrorMessage(emptyInput);
    }

    const loadingBars = (state) => {
        if(state === 'on') loadingBarsEl.classList.add('show');
        else if(state === 'off') loadingBarsEl.classList.remove('show');
        else console.log('You need to set a proper loading state: (on/off)')
    }
    
    const toggleButton = () => {
        calcButton.classList.toggle('show');
        newCalcButton.classList.toggle('show');
    }

    const beautifiedNum = x => x.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2});

    const getResults = (bill, share, rate) => {
        //loading while I get the results
        loadingBars('on');
        //converting str inputs into numbers
        bill = parseFloat(bill);
        share = parseFloat(share);
        rate = parseFloat(rate);
        //resolution and storage of results
        const tip = (rate * bill) / 100;
        const total = tip + bill;
        const each = total / share;
        //creating results markup
        const markup = `
            <p>Tip amount: <span>$ ${beautifiedNum(tip)}</span></p>
            <p>Total amount: <span>$ ${beautifiedNum(total)}</span></p>
            <p>Each person owes: <span>$ ${beautifiedNum(each)}</span></p>
        `
        //hiding loading bars and showing results after 2 seconds - initial calc button toggled to new tip calc button
        setTimeout(() => {
            loadingBars('off');
            resultsEl.innerHTML = markup;
            toggleButton();
        }, 2000);
    }

    const inputState = (state) => {
        for(let input of INPUTS) {
            if(state === 'disabled') input.setAttribute('disabled', true);
            else if(state === 'enabled') input.removeAttribute('disabled');
            else console.log('You need to set a proper input state: (enabled/disabled)')
        }
    }

    const calcButtonState = (state) => {
        if(state === 'calculating') {
            calcButton.textContent = 'Calculating...';
            calcButton.disabled = true;
        }
        else if('initial') {
            calcButton.textContent = 'Calculate';
            calcButton.removeAttribute('disabled');
        }
        else console.log('You need to set a proper calc-button state: (calculating/initial)')
    }

    const reset = () => {
        billAmountInput.value = '';
        billShareInput.value = '';
        rateInputEl.value = '';
        resultsEl.innerHTML = '';
        inputState('enabled');
        toggleButton();
        billAmountInput.focus();
        calcButtonState('initial');
    }
    
    const removeErrorMessagesBox = () => errorMessagesBox.classList.remove('show');
    
    const listeners = () => {
        //-calc- and -new tip calc- button functionalities
        for(let button of BUTTONS) {
            button.addEventListener('click', () => {
                if(button.classList.contains('calc')) {
                    const bill = billAmountInput.value;
                    const share = billShareInput.value;
                    const rate = rateInputEl.value;
        
                    if(bill && share && rate) {
                        getResults(bill,share,rate);
                        removeErrorMessagesBox();
                        inputState('disabled');
                        calcButtonState('calculating');
                    } 
                    else displayErrors();
                }
                else reset();
            })
        }
        //closes error messages box
        closeIcon.addEventListener('click', removeErrorMessagesBox)
    }

    return {
        listeners
    }
})();

App.listeners();