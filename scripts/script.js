'use strict';

let totalBill = 0;
let totalPeople = 0;
let tipSelected = 0;

const isNumeric = function(number){
    return !isNaN(number) && isFinite(number);
};



const totalBillPerPerson = function(totalTip) {
    const totalPerPerson = ((totalBill + totalTip) / totalPeople).toFixed(2);

    const amountPerPerson = document.getElementById('total-amount-per-person');

    if(isNumeric(totalPerPerson)){
        return (amountPerPerson.innerHTML = `$${totalPerPerson}`)
    }
}
const tipPerPerson = function(){
    const totalTip = totalBill * (tipSelected / 100);

    const tipPerPersonNode = document.getElementById('total-tip-per-person');

    if(isNumeric((totalTip/totalPeople).toFixed(2))){
        totalBillPerPerson(totalTip);
        return (tipPerPersonNode.innerHTML = `$${(totalTip / totalPeople).toFixed(2)}`);
    }
}

//to get no. of people

const peopleInput = function(event){
    totalPeople = Number(event.target.value);

    if(totalPeople <= 0){
        document.getElementById('people-error-message').style.display = 'block';
    } else {
        document.getElementById('people-error-message').style.display = 'none';
        tipPerPerson();
    }
};

const billInput = function(){
    totalBill = Number(document.getElementById('bill-charge').value);

    if(totalBill <= 0){
        document.getElementById('bill-error-message').style.display ='block';
    } else {
        document.getElementById('bill-error-message').style.display ='none';
    }
};

const tipInput = function (event) {
    let tipNode = document.getElementsByClassName('tip-value-active')[0];

    if(tipNode !== undefined){
        tipNode.classList.remove('tip-value-active');
    }

    event.target.className += ' tip-value-active';

    tipSelected = Number(event.target.value);

    if(tipSelected < 0){
        document.getElementById('tip-error-message').style.display ='block';
    } else {
        document.getElementById('tip-error-message').style.display ='none';
        tipPerPerson();
    }
};

const resetEverything = function () {
    const inputNodeList = document.getElementsByTagName('input');

    for (const node of inputNodeList) {
        node.value = '';
    }
    totalBill = 0;
    totalPeople = 0;
    tipSelected = 0;

    let buttonNodeList = document.getElementsByTagName('button');

    for (const node of buttonNodeList) {
        if (node.classList.contains('tip-value-active')) {
            node.classList.remove('tip-value-active');
        }
    }

    const errorNodeList = document.getElementsByClassName('error-message');
    for (const node of errorNodeList) {
        node.style.display = 'none';
    }

    document.getElementById('total-tip-per-person').innerText = '$0.00';
    document.getElementById('total-amount-per-person').innerText = '$0.00';
};

resetEverything();