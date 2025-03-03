let a = '';
let b = '';
let operation = '';
let result = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const operators = ['+', '-', '*', '/'];

const out = document.querySelector('.calc-screen p');

function clearAll() {
    a = '';
    b = '';
    operation = '';
    result = false;
    out.textContent = '0';
}

// Привязка события очистки
document.querySelector('.btn-gray[value="AC"]')?.addEventListener('click', clearAll);

// Обработчик кликов по кнопкам
document.querySelector('.keys')?.addEventListener('click', (event) => {
    const target = event.target;
    if (!target.classList.contains('btn')) return;

    const key = target.value;

    // Обработка цифр и точки
    if (digit.includes(key)) {
        handleDigit(key);
        return;
    }

    // Обработка операторов
    if (operators.includes(key)) {
        handleOperator(key);
        return;
    }

    // Обработка равно
    if (key === '=') {
        calculate();
        return;
    }

    // Обработка смены знака (+/-)
    if (key === '+/-') {
        handleSignChange();
        return;
    }

    // Обработка процента (%)
    if (key === '%') {
        handlePercentage();
        return;
    }
});

function handleDigit(key) {
    if (b === '' && operation === '') {
        if (key === '.' && a.includes('.')) return;
        if (key === '0' && a === '0') return;
        a += key;
        out.textContent = a;
    } else if (result) {
        a = key === '.' ? '0.' : key;
        b = '';
        operation = '';
        result = false;
        out.textContent = a;
    } else {
        if (key === '.' && b.includes('.')) return;
        if (key === '0' && b === '0') return;
        b += key;
        out.textContent = b;
    }
}

function handleOperator(key) {
    if (a === '' || a === '.') return;
    
    if (b !== '') {
        calculate();
    }
    
    operation = key;
    out.textContent = operation;
}

function handleSignChange() {
    if (b === '' && operation === '' && a !== '' && a !== '.') {
        // Меняем знак первого числа
        a = (parseFloat(a) * -1).toString();
        out.textContent = a;
    } else if (b !== '' && operation !== '') {
        // Меняем знак второго числа
        b = (parseFloat(b) * -1).toString();
        out.textContent = b;
    }
}

function handlePercentage() {
    if (a === '' || a === '.') return;

    if (b === '' && operation === '') {
        // Если есть только первое число, процент от самого числа
        a = (parseFloat(a) / 100).toString();
        if (a.includes('.')) {
            a = parseFloat(a).toFixed(8).replace(/\.?0+$/, '');
        }
        out.textContent = a;
    } else if (b !== '' && operation !== '') {
        // Если есть второе число, процент от первого числа
        const percentage = (parseFloat(a) * parseFloat(b)) / 100;
        switch (operation) {
            case '+':
                a = (parseFloat(a) + percentage).toString();
                break;
            case '-':
                a = (parseFloat(a) - percentage).toString();
                break;
            case '*':
                a = (percentage).toString();
                break;
            case '/':
                if (percentage === 0) {
                    out.textContent = 'Error';
                    a = '';
                    b = '';
                    operation = '';
                    result = false;
                    return;
                }
                a = (parseFloat(a) / percentage).toString();
                break;
        }
        if (a.includes('.')) {
            a = parseFloat(a).toFixed(8).replace(/\.?0+$/, '');
        }
        result = true;
        b = '';
        operation = '';
        out.textContent = a;
    }
}

function calculate() {
    if (a === '' || b === '' || operation === '') return;

    const numA = parseFloat(a);
    const numB = parseFloat(b);

    switch (operation) {
        case '+':
            a = (numA + numB).toString();
            break;
        case '-':
            a = (numA - numB).toString();
            break;
        case '*':
            a = (numA * numB).toString();
            break;
        case '/':
            if (numB === 0) {
                out.textContent = 'Error';
                a = '';
                b = '';
                operation = '';
                result = false;
                return;
            }
            a = (numA / numB).toString();
            break;
    }

    if (a.includes('.')) {
        a = parseFloat(a).toFixed(8).replace(/\.?0+$/, '');
    }

    result = true;
    b = '';
    operation = '';
    out.textContent = a;
}

// Проверка на существование элементов
document.addEventListener('DOMContentLoaded', () => {
    if (!out || !document.querySelector('.keys')) {
        console.error('Error: Required DOM elements not found');
    }
});