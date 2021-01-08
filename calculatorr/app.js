const App = (() => {
    const calcButtons = document.getElementsByClassName('calc-button');
    const entryEl = document.querySelector('.entry');
    const resultEl = document.querySelector('.result');

    const parse = str => {
        return Function(`'use strict'; return (${str})`)();
    }

    const parsePercent = value => {
        const arr = value.split('%').map(x => +x);
        if(arr.length > 2) {
            return alert('You can only use two groups of numbers at most when making percents.');
        } else {
            const x = arr[0];
            const y = arr[1];
            return y === 0 ? (x / 100) : (x * y) / 100;
        }
    }

    const workable = input => {
        const validClasses = ['number', 'operator', 'dot', 'percent'];
        return validClasses.some(validClass => input.classList.contains(validClass));
    }

    const passValue = input => {
        const value  = input.getAttribute('value');
        entryEl.value += value;
    }

    const execute = input => {
        const inputValue = input.getAttribute('value');

        switch(inputValue) {
            case 'c':
                entryEl.value = '';
                resultEl.value = 0;
                break;
            case 'backspace':
                entryEl.value = entryEl.value.slice(0, -1);
                break;
            case 'equal':
                resultEl.value = entryEl.value.split('').includes('%') ? parsePercent(entryEl.value) : parse(entryEl.value)
                entryEl.value = '';
                break;
        }
    }

    const init = () => {
        resultEl.value = 0;
        
        for(let button of calcButtons) {
            button.addEventListener('click', function() {
                const value = this;
                workable(value) ? passValue(value) : execute(value);
            })
        }
    }

   
    return {
        init
    }

})();

App.init();