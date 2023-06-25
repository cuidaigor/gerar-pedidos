import Formatter from "./formatter.js";
import DynamicCalculator from "./dynamicCalculator.js";
class ItemManager {
  constructor() {
    this.counterItems = 2;
    this.addButton = document.getElementById('add-items');
    this.newItemContainer = document.getElementById('newItem');

    this.addButton.addEventListener('click', this.addItem.bind(this));

    this.dynamicCalculator = new DynamicCalculator();
  }

  createDivElement(classList){
    const divElement = document.createElement('div');
    divElement.classList.add(...classList)

    return divElement;
  }

  createLabelElement(forItem, classList, textContent) {
    const labelElement = document.createElement('label');
    labelElement.setAttribute('for', forItem);
    labelElement.classList.add(...classList);
    labelElement.textContent = textContent;

    return labelElement;
  }

  createInputElement(type, classList, idItem, nameItem, placeholder, ariaLabel, ariaDescribedby, changeHandler){
    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', type);
    inputElement.classList.add(...classList);
    inputElement.setAttribute('id', idItem);
    inputElement.setAttribute('name', nameItem);
    inputElement.setAttribute('placeholder', placeholder);
    if(ariaLabel){
      inputElement.setAttribute('aria-label', ariaLabel);
    }
    if(ariaDescribedby){
      inputElement.setAttribute('aria-describedby', ariaDescribedby);
    }
    if(changeHandler){
      inputElement.addEventListener('change', changeHandler);
    }

    return inputElement;
  }

  createSpanElement(classList, idItem, textContent){
    const spanElement = document.createElement('span');
    spanElement.classList.add(...classList);
    spanElement.setAttribute('id', idItem);
    spanElement.textContent = textContent;

    return spanElement;
  }

  createButtonElement(classList, type, idItem, textContent){
    const buttonElement = document.createElement('button');
    buttonElement.classList.add(...classList);
    buttonElement.setAttribute('type', type);
    buttonElement.setAttribute('id', idItem);
    buttonElement.textContent = textContent;

    return buttonElement;
  }

  createHrElement(classList, idItem) {
    const hrElement = document.createElement('hr');
    hrElement.classList.add(...classList);
    hrElement.setAttribute('id', idItem);

    return hrElement;
  }

  addItem(){
    // Cria o Item
    const itemId = `item-${this.counterItems}`;

    const itemContainer = this.createDivElement(['col-12']);
    const itemLabel = this.createLabelElement(itemId, ['form-label'], 'Item');
    const itemInput = this.createInputElement(
      'text',
      ['form-control'],
      itemId,
      itemId,
      'Lona Brilho - 100cm x 100cm - Banner'
    );

    itemContainer.appendChild(itemLabel);
    itemContainer.appendChild(itemInput);

    //Cria a Quantidade
    const amountId = `amount-item-${this.counterItems}`;

    const amountContainer = this.createDivElement(['col-4']);
    const amountLabel = this.createLabelElement(amountId, ['form-label'], 'Quantidade');
    const amountInput = this.createInputElement(
      'number',
      ['form-control'],
      amountId,
      amountId,
      '1'
    );

    amountContainer.appendChild(amountLabel);
    amountContainer.appendChild(amountInput);

    amountInput.addEventListener('input', () => {
      this.dynamicCalculator.calculateTotal(unitaryInput, totalInput, amountInput);
      this.dynamicCalculator.calculateFinalItem();
    });

    //Cria o Valor Unitário
    const unitaryId = `unitary-item-${this.counterItems}`;

    const unitaryContainer = this.createDivElement(['col-4']);
    const unitaryLabel = this.createLabelElement(unitaryId, ['form-label'], 'V. Unitário');
    const groupUnitary = this.createDivElement(['input-group']);
    const unitarySpan = this.createSpanElement(['input-group-text'], `unitary-item-group-${this.counterItems}`, 'R$');
    const unitaryInput = this.createInputElement(
      'text',
      ['form-control', 'input-soma'],
      unitaryId,
      unitaryId,
      '90,00',
      '90,00',
      `unitary-item-group-${this.counterItems}`,
      this.formatCurrencyInput
    );

    groupUnitary.appendChild(unitarySpan);
    groupUnitary.appendChild(unitaryInput);
    unitaryContainer.appendChild(unitaryLabel);
    unitaryContainer.appendChild(groupUnitary);

    unitaryInput.addEventListener('input', () => {
      this.dynamicCalculator.calculateTotal(unitaryInput, totalInput, amountInput);
      this.dynamicCalculator.calculateFinalItem();
    });

    //Cria o Valor Total
    const totalId = `total-item-${this.counterItems}`;

    const totalContainer = this.createDivElement(['col-4']);
    const totalLabel = this.createLabelElement(totalId, ['form-label'], 'V. Total');
    const groupTotal = this.createDivElement(['input-group']);
    const totalSpan = this.createSpanElement(['input-group-text'], `total-item-group-${this.counterItems}`, 'R$');
    const totalInput = this.createInputElement(
      'text',
      ['form-control', 'input-currency', 'input-soma'],
      totalId,
      totalId,
      '90,00',
      '90,00',
      `total-item-group-${this.counterItems}`,
      this.formatCurrencyInput
    );

    groupTotal.appendChild(totalSpan);
    groupTotal.appendChild(totalInput);
    totalContainer.appendChild(totalLabel);
    totalContainer.appendChild(groupTotal);

    totalInput.addEventListener('input', () => {
      this.dynamicCalculator.calculateUnitary(unitaryInput, totalInput, amountInput);
      this.dynamicCalculator.calculateFinalItem();
    });

    //Cria botão para remover
    const removeButtonContainer = this.createDivElement(['col-12', 'd-flex', 'justify-content-center']);
    const buttonRemove = this.createButtonElement(
      ['btn', 'btn-danger', 'mt-2'], 'button',
      `remove-items-${this.counterItems}`,
      'Remover'
    );
    removeButtonContainer.appendChild(buttonRemove);

    //Cria o Divider
    const divider = this.createHrElement(['p-0', 'm-0', 'my-2'], `divider-${this.counterItems}`);

    // Adiciona o EventListener de clique ao botão de remoção
    buttonRemove.addEventListener('click', () => {
      this.removeItem(itemContainer);
      this.removeItem(amountContainer);
      this.removeItem(unitaryContainer);
      this.removeItem(totalContainer);
      this.removeItem(removeButtonContainer);
      this.removeItem(divider);
    });

    //Adiciona todos os elementos na tela
    this.newItemContainer.appendChild(itemContainer);
    this.newItemContainer.appendChild(amountContainer);
    this.newItemContainer.appendChild(unitaryContainer);
    this.newItemContainer.appendChild(totalContainer);
    this.newItemContainer.appendChild(removeButtonContainer);
    this.newItemContainer.appendChild(divider);

    this.counterItems ++;
  }

  removeItem(element) {
    element.remove();
    this.counterItems--;
  }

  formatCurrencyInput(event) {
    let value = event.target.value;
    value = value.replace(',', '.');
    const formattedValue = Formatter.formatarMoeda(parseFloat(value));
    event.target.value = formattedValue;
  }
}

export default ItemManager;
