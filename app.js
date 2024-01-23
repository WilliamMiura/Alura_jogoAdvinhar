let arrayDawnNumbers = [];
let limitNumber = 10;
let choiceNumber = randomNumber();
let numberTry = 1;

function generateArray() {
    for (let i = 1; i < (limitNumber + 1); i++) {
        arrayDawnNumbers.push(i);
    }
}
generateArray();

function showTextScreen(tag, text) {
    let field = document.querySelector(tag);
    field.textContent = text;
    responsiveVoice.speak(text, 'Brazilian Portuguese Female', {rate:1.17});
}

function showStartMessage() {
    showTextScreen('h1', 'Jogo do número secreto');
    showTextScreen('p', `Escolha um número de 1 a ${limitNumber}`);
}
showStartMessage();

function randomNumber() {
    let randomNumber = Math.floor(Math.random() * limitNumber) + 1; 
    return randomNumber;
}

function verifyNumber() {
    let inputValue = parseInt(document.querySelector('input').value);
    let msgTry = numberTry > 1 ? 'tentativas' : 'tentativa';
    if (inputValue === choiceNumber) {
        showTextScreen('h1', 'Você ganhou!');
        showTextScreen('p', `Você descobriu o número secreto com ${numberTry} ${msgTry}!`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        if (arrayDawnNumbers.includes(choiceNumber)) {
            arrayDawnNumbers.splice(arrayDawnNumbers.indexOf(choiceNumber), 1);
        }
    } else {
        if (inputValue < choiceNumber) {
            showTextScreen('p', 'O número Secreto é maior!');
        } else {
            showTextScreen('p', 'O número Secreto é menor!');
        }
    }
    numberTry++;
}

if (arrayDawnNumbers.length === 0) {
    generateArray();
}

function resetGame() {
    arrayDawnNumbers = [];
    numberTry = 1;
    generateArray();
    let inputNumber = document.querySelector('input');
    inputNumber.value = '';
    showStartMessage();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
