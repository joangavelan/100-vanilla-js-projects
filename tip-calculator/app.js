const App = (() => {
    const errorMessagesBox = document.querySelector('.error-messages');
    const errorMessages = document.getElementsByClassName('error-message');
    const closeIcon = document.querySelector('.close');
    const billAmountInput = document.querySelector('.input__bill-amount');
    const billShareInput = document.querySelector('.input__bill-share');
    const rateInputEl = document.querySelector('.input__rate-select');
    const INPUTS = document.getElementsByClassName('input');
    const loadingBarsEl = document.querySelector('.loading-bars');
    const resultsEl = document.querySelector('.results');
    const BUTTONS = document.getElementsByClassName('btn');
    const defaultCalcBtn = document.querySelector('.default');
    const newCalcBtn = document.querySelector('.new');
    
    const showErrorMessage = (reference) => {
        errorMessagesBox.classList.add('show');
        for(let errorMessage of errorMessages) {
            if(errorMessage.dataset.errorReference === reference) errorMessage.classList.add('show');
            else errorMessage.classList.remove('show');
        }
    }
    
    const displayErrors = () => {
        const emptyValues = [];
    
        for(let input of INPUTS) {
            input.value === '' ? emptyValues.push(input.dataset.id) : null;
        }
    
        const emptyInput = emptyValues[0];
        emptyValues.length > 1 ? showErrorMessage('general') : showErrorMessage(emptyInput);
    }

    const loadingBars = (status) => {
        if(status === 'on') {
            loadingBarsEl.classList.add('show');
            defaultCalcBtn.disabled = true;
        }
        else if(status === 'off') {
            loadingBarsEl.classList.remove('show');
            defaultCalcBtn.removeAttribute('disabled');
        }
        else console.log('You need to set a proper status: (on/off)')
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
        //hiding loading bars and showing results after 2 seconds
        setTimeout(() => {
            loadingBars('off')
            resultsEl.innerHTML = markup;
            toggleButton();
        }, 2000);
    }
    
    const toggleButton = () => {
        defaultCalcBtn.classList.toggle('show');
        newCalcBtn.classList.toggle('show');
    }

    const inputStatus = (status) => {
        for(let input of INPUTS) {
            if(status === 'disabled') input.setAttribute('disabled', true);
            else if(status === 'enabled')  input.removeAttribute('disabled');
            else console.log('You need to set a proper status: (enabled/disabled)')
        }
    }

    const reset = () => {
        billAmountInput.value = '';
        billShareInput.value = '';
        rateInputEl.value = '';
        resultsEl.innerHTML = '';
        inputStatus('enabled');
        toggleButton();
        billAmountInput.focus();
        defaultCalcBtn.textContent = 'Calculate';
    }
    
    const removeErrorMessagesBox = () => errorMessagesBox.classList.remove('show');
    
    const listeners = () => {
        //button functionalities
        for(let button of BUTTONS) {
            button.addEventListener('click', () => {
                if(button.classList.contains('default')) {
                    const bill = billAmountInput.value;
                    const share = billShareInput.value;
                    const rate = rateInputEl.value;
        
                    if(bill && share && rate) {
                        getResults(bill,share,rate);
                        removeErrorMessagesBox();
                        inputStatus('disabled');
                        defaultCalcBtn.textContent = 'Calculating...';
                    } 
                    else displayErrors();
                }
                else reset();
            })
        }
        // console.log(startCalcButton)
        //closes error messages box
        closeIcon.addEventListener('click', removeErrorMessagesBox)
    }

    return {
        listeners
    }
})();

App.listeners();