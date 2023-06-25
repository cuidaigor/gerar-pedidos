import ItemManager from './classes/itemManager.js';

const itemManager = new ItemManager();

//************************************************************************

function formatarDocumento(documento) {
  // Remove qualquer caractere que não seja número
  const numeros = documento.replace(/\D/g, '');

  // Verifica a quantidade de dígitos
  if (numeros.length === 11) {
    // CPF (formato: 000.000.000-00)
    return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else if (numeros.length === 14) {
    // CNPJ (formato: 00.000.000/0000-00)
    return numeros.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  } else {
    // Documento inválido (retorna o valor original)
    return documento;
  }
}

function formatarWhatsapp(numero) {
  // Remove qualquer caractere que não seja número
  const numeros = numero.replace(/\D/g, '');

  // Verifica a quantidade de dígitos
  if (numeros.length === 10) {
    //formato: (99) 9999-9999
    return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else if (numeros.length === 11) {
    //formato: (99) 99999-9999
    return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else {
    // Número inválido (retorna o valor original)
    return numero;
  }
}

function formatarCEP(cep) {
  // Remove qualquer caractere que não seja número
  const numeros = cep.replace(/\D/g, '');

  // Verifica a quantidade de dígitos
  if (numeros.length === 8) {
    //formato: 12345-000
    return numeros.replace(/(\d{5})(\d{3})/, '$1-$2');
  } else {
    // Número inválido (retorna o valor original)
    return cep;
  }
}

// Função para formatar o valor em moeda
function formatarMoeda(valor) {
  let formataValor = valor.toFixed(2);
  formataValor = formataValor.replace(".", ",");

  const partes = formataValor.split(",");
  partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  formataValor = partes.join(",");

  return formataValor;
}

const idClient = document.getElementById('id-client');
idClient.addEventListener('input', () => {
  idClient.value = formatarDocumento(idClient.value);
});

const whatsapp = document.getElementById('whatsapp');
whatsapp.addEventListener('input', () => {
  whatsapp.value = formatarWhatsapp(whatsapp.value);
});

const cep = document.getElementById('cep');
cep.addEventListener('input', () => {
  cep.value = formatarCEP(cep.value);
});

const unitaryItem = document.querySelector('#unitary-item-1');
unitaryItem.addEventListener('change', () => {
  unitaryItem.value = unitaryItem.value.replace(",", ".");
  unitaryItem.value = formatarMoeda(parseFloat(unitaryItem.value));
});

const totalItem = document.querySelector('#total-item-1');
totalItem.addEventListener('change', () => {
  totalItem.value = totalItem.value.replace(",", ".");
  totalItem.value = formatarMoeda(parseFloat(totalItem.value));
});

const installation = document.querySelector('#installation-item');
installation.addEventListener('change', () => {
  installation.value = installation.value.replace(",", ".");
  installation.value = formatarMoeda(parseFloat(installation.value));
});

const delivery = document.querySelector('#delivery-item');
delivery.addEventListener('change', () => {
  delivery.value = delivery.value.replace(",", ".");
  delivery.value = formatarMoeda(parseFloat(delivery.value));
});

const discount = document.querySelector('#discount-item');
discount.addEventListener('change', () => {
  discount.value = discount.value.replace(",", ".");
  discount.value = formatarMoeda(parseFloat(discount.value));
});

const final = document.querySelector('#final-item');
final.addEventListener('change', () => {
  final.value = final.value.replace(",", ".");
  final.value = formatarMoeda(parseFloat(final.value));
});
