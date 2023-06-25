class ItemManager {
  constructor() {
    this.counterItems = 2;
    document.getElementById('add-items').addEventListener('click', this.addInputsItem.bind(this));
  }

  addInputsItem(){

    // Cria o Item
    const containerItem = document.createElement('div');
    containerItem.classList.add('col-12');

    const itemLabel = document.createElement('label');
    itemLabel.setAttribute('for', `item-${this.counterItems}`);
    itemLabel.classList.add('form-label');
    itemLabel.textContent = 'Item';

    const itemInput = document.createElement('input');
    itemInput.setAttribute('type', 'text');
    itemInput.classList.add('form-control');
    itemInput.setAttribute('id', `item-${this.counterItems}`);
    itemInput.setAttribute('name', `item-${this.counterItems}`);
    itemInput.setAttribute('placeholder', 'Lona Brilho - 100cm x 100cm - Banner');

    containerItem.appendChild(itemLabel);
    containerItem.appendChild(itemInput);

    //Cria a Quantidade
    const containerAmount = document.createElement('div');
    containerAmount.classList.add('col-4');

    const amountLabel = document.createElement('label');
    amountLabel.setAttribute('for', `amount-item-${this.counterItems}`);
    amountLabel.classList.add('form-label');
    amountLabel.textContent = 'Quantidade';

    const amountInput = document.createElement('input');
    amountInput.setAttribute('type', 'number');
    amountInput.classList.add('form-control');
    amountInput.setAttribute('id', `amount-item-${this.counterItems}`);
    amountInput.setAttribute('name', `amount-item-${this.counterItems}`);
    amountInput.setAttribute('placeholder', '1');

    containerAmount.appendChild(amountLabel);
    containerAmount.appendChild(amountInput);

    //Cria o Valor Unitário
    const containerUnitary = document.createElement('div');
    containerUnitary.classList.add('col-4');

    const unitaryLabel = document.createElement('label');
    unitaryLabel.setAttribute('for', `unitary-item-${this.counterItems}`);
    unitaryLabel.classList.add('form-label');
    unitaryLabel.textContent = 'V. Unitário';

    const groupUnitary = document.createElement('div');
    groupUnitary.classList.add('input-group');

    const unitarySpan = document.createElement('span');
    unitarySpan.classList.add('input-group-text');
    unitarySpan.setAttribute('id', `unitary-item-group-${this.counterItems}`);
    unitarySpan.textContent = 'R$';

    const unitaryInput = document.createElement('input');
    unitaryInput.setAttribute('type', 'text');
    unitaryInput.classList.add('form-control', 'input-currency');
    unitaryInput.setAttribute('placeholder', '90,00');
    unitaryInput.setAttribute('aria-label', '90,00');
    unitaryInput.setAttribute('aria-describedby', `unitary-item-group-${this.counterItems}`);
    unitaryInput.setAttribute('id', `unitary-item-${this.counterItems}`);
    unitaryInput.setAttribute('name', `unitary-item-${this.counterItems}`);
    unitaryInput.addEventListener('change', function(event) {
      let valorInput = event.target.value;
      valorInput = valorInput.replace(",", ".");
      const valorFormatado = formatarMoeda(parseFloat(valorInput));
      event.target.value = valorFormatado;
    });

    groupUnitary.appendChild(unitarySpan);
    groupUnitary.appendChild(unitaryInput);

    containerUnitary.appendChild(unitaryLabel);
    containerUnitary.appendChild(groupUnitary);

    //Cria o Valor Total
    const containerTotal = document.createElement('div');
    containerTotal.classList.add('col-4');

    const totalLabel = document.createElement('label');
    totalLabel.setAttribute('for', `total-item-${this.counterItems}`);
    totalLabel.classList.add('form-label');
    totalLabel.textContent = 'V. Total';

    const groupTotal = document.createElement('div');
    groupTotal.classList.add('input-group');

    const totalSpan = document.createElement('span');
    totalSpan.classList.add('input-group-text');
    totalSpan.setAttribute('id', `total-item-group-${this.counterItems}`);
    totalSpan.textContent = 'R$';

    const totalInput = document.createElement('input');
    totalInput.setAttribute('type', 'text');
    totalInput.classList.add('form-control', 'input-currency');
    totalInput.setAttribute('placeholder', '90,00');
    totalInput.setAttribute('aria-label', '90,00');
    totalInput.setAttribute('aria-describedby', `total-item-group-${this.counterItems}`);
    totalInput.setAttribute('id', `total-item-${this.counterItems}`);
    totalInput.setAttribute('name', `total-item-${this.counterItems}`);
    totalInput.addEventListener('change', function(event) {
      let valorInput = event.target.value;
      valorInput = valorInput.replace(",", ".");
      const valorFormatado = formatarMoeda(parseFloat(valorInput));
      event.target.value = valorFormatado;
    });

    groupTotal.appendChild(totalSpan);
    groupTotal.appendChild(totalInput);

    containerTotal.appendChild(totalLabel);
    containerTotal.appendChild(groupTotal);

    //Cria botão para remover
    const removeButtonContainer = document.createElement('div');
    removeButtonContainer.classList.add('col-12', 'd-flex', 'justify-content-center');

    const buttonRemove = document.createElement('button');
    buttonRemove.classList.add('btn', 'btn-danger', 'mt-2');
    buttonRemove.setAttribute('type', 'button');
    buttonRemove.setAttribute('id', `remove-items-${this.counterItems}`);
    buttonRemove.textContent = 'Remover';

    removeButtonContainer.appendChild(buttonRemove);

    //Cria o Divider
    const divider = document.createElement('hr');
    divider.classList.add('p-0', "m-0", "my-2");
    divider.setAttribute('id', `divider-${this.counterItems}`);

    //Adiciona todos os elementos na tela
    const addItem = document.getElementById("newItem");
    addItem.appendChild(containerItem);
    addItem.appendChild(containerAmount);
    addItem.appendChild(containerUnitary);
    addItem.appendChild(containerTotal);
    addItem.appendChild(removeButtonContainer);
    addItem.appendChild(divider);


    // Adiciona o EventListener de clique ao botão de remoção
    buttonRemove.addEventListener('click', () => {
      // Obtém o ID do botão clicado
      const idButton = buttonRemove.id;
      const idFinal = idButton.split('-');

      this.removeInputsItem(idFinal[2], buttonRemove);
    });

    this.counterItems ++;
  }

  removeInputsItem(id, button){

    const referenceInput = document.getElementById(`item-${id}`);
    if(referenceInput){
      const inputRemove = referenceInput.parentElement;
      inputRemove.remove();
    }

    const referenceAmount = document.getElementById(`amount-item-${id}`);
    if(referenceAmount){
      const amoutRemove = referenceAmount.parentElement;
      amoutRemove.remove();
    }

    const referenceUnitary = document.getElementById(`unitary-item-${id}`);
    if(referenceUnitary){
      const unitaryRemove = referenceUnitary.parentElement.parentElement;
      unitaryRemove.remove();
    }

    const referenceTotal = document.getElementById(`total-item-${id}`);
    if(referenceTotal){
      const totalRemove = referenceTotal.parentElement.parentElement;
      totalRemove.remove();
    }

    const referenceButtonRemove = document.getElementById(`remove-items-${id}`);
    if(referenceButtonRemove){
      const buttonRemoveAction = referenceButtonRemove.parentElement;
      buttonRemoveAction.remove();
    }

    const dividerRemove = document.getElementById(`divider-${id}`);
    if(dividerRemove){
      dividerRemove.remove();
    }

    // Remove o EventListener de clique do botão de remoção
    button.removeEventListener("click", this.removeInputsItem);

    this.counterItems --;
  }
}

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
