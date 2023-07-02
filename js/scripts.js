import ItemManager from './classes/itemManager.js';
import Formatter from './classes/formatter.js';
import InputFormatter from './classes/inputFormatter.js';
import DynamicCalculator from './classes/dynamicCalculator.js';
import FormPrinter from './classes/formPrinter.js';

//PRELOAD
window.addEventListener('load', () => {
  const preload = document.getElementById('preload');
  preload.classList.remove('d-flex');
  preload.classList.add('d-none');
});

//************************************************************************
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

const idOrder = new InputFormatter(
  document.getElementById('idOrder'),
  Formatter.formatarIdOrder
);

const orderDate = new InputFormatter(
  document.getElementById('order-date'),
  Formatter.formatarData
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

//Inserir data de hoje como padrão
function dataAtual(){
  const dataAtual = new Date();
  const dia = String(dataAtual.getDate()).padStart(2, '0');
  const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
  const ano = dataAtual.getFullYear();

  return dia + '/' + mes + '/' + ano;
}
document.getElementById('order-date').value = dataAtual();

//Inserir ID como padrão
const orderData = localStorage.getItem('order-data');
if(orderData){
  const parseData = JSON.parse(orderData);
  const valueCount = String(parseInt(parseData.idOrder)+1);
  if(valueCount.length === 4){
    document.getElementById('idOrder').value = valueCount;
  }else if(valueCount.length === 3){
    document.getElementById('idOrder').value = `0${valueCount}`;
  }else if(valueCount.length === 2){
    document.getElementById('idOrder').value = `00${valueCount}`;
  }else if(valueCount.length === 1){
    document.getElementById('idOrder').value = `000${valueCount}`;
  }
}

//************************************************************************ */

//Calculo do Valor Unitário e Valor Total do item existente
const dynamicCalculator = new DynamicCalculator();
dynamicCalculator.calculateInputExists();
dynamicCalculator.calculateFinalItem();

//************************************************************************ */

// Crie uma instância da classe FormPrinter
const formPrinter = new FormPrinter('gerar-pedido');

