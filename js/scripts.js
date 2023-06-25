import ItemManager from './classes/itemManager.js';
import Formatter from './classes/formatter.js';
import InputFormatter from './classes/inputFormatter.js';
import DynamicCalculator from './classes/dynamicCalculator.js';

//CHAMADA DE ADIÇÃO E REMOÇÃO DE ITENS DINAMICAMENTE
const itemManager = new ItemManager();

//************************************************************************
// CHAMADAS DE FORMATAÇÕES DOS INPUTS

const idClient = new InputFormatter(
  document.getElementById('id-client'),
  Formatter.formatarDocumento
);

const whatsapp = new InputFormatter(
  document.getElementById('whatsapp'),
  Formatter.formatarWhatsapp
);

const cep = new InputFormatter(
  document.getElementById('cep'),
  Formatter.formatarCEP
);

const unitaryItem = new InputFormatter(
  document.querySelector('#unitary-item-1'),
  (value) => Formatter.formatarMoeda(parseFloat(value.replace(",", ".")))
);

const totalItem = new InputFormatter(
  document.querySelector('#total-item-1'),
  (value) => Formatter.formatarMoeda(parseFloat(value.replace(",", ".")))
);

const installation = new InputFormatter(
  document.querySelector('#installation-item'),
  (value) => Formatter.formatarMoeda(parseFloat(value.replace(",", ".")))
);

const delivery = new InputFormatter(
  document.querySelector('#delivery-item'),
  (value) => Formatter.formatarMoeda(parseFloat(value.replace(",", ".")))
);

const discount = new InputFormatter(
  document.querySelector('#discount-item'),
  (value) => Formatter.formatarMoeda(parseFloat(value.replace(",", ".")))
);

const final = new InputFormatter(
  document.querySelector('#final-item'),
  (value) => Formatter.formatarMoeda(parseFloat(value.replace(",", ".")))
);


//**********************************************************************************

const unitaryInput = document.getElementById('unitary-item-1');
const totalInput = document.getElementById('total-item-1');
const amountInput = document.getElementById('amount-item-1');

const dynamicCalculator = new DynamicCalculator();

// Adiciona os event listeners para os campos de input
unitaryInput.addEventListener('input', ()=>{
  dynamicCalculator.calculateTotal(unitaryInput, totalInput, amountInput);
});
totalInput.addEventListener('input', ()=> {
  dynamicCalculator.calculateUnitary(unitaryInput, totalInput, amountInput);
});
amountInput.addEventListener('input', ()=>{
  dynamicCalculator.calculateTotal(unitaryInput, totalInput, amountInput);
});
