import Formatter from "./formatter.js";

export default class DynamicCalculator{
  calculateTotal(unitaryInput, totalInput, amountInput) {
    this.setDefaultAmount(amountInput);
    const unitaryValue = parseFloat(unitaryInput.value.replace(',', '.'));
    const amountValue = parseFloat(amountInput.value);
    const totalValue = unitaryValue * amountValue || 0;
    totalInput.value = Formatter.formatarMoeda(totalValue);
  }

  calculateUnitary(unitaryInput, totalInput, amountInput) {
    this.setDefaultAmount(amountInput);
    const totalValue = parseFloat(totalInput.value.replace(',', '.'));
    const amountValue = parseFloat(amountInput.value);
    const unitaryValue = totalValue / amountValue || 0;
    unitaryInput.value = Formatter.formatarMoeda(unitaryValue);
  }

  setDefaultAmount(amountInput) {
    if (amountInput.value === '' || amountInput.value === '0') {
      amountInput.value = '1';
    }
  }

  calculateFinalItem() {
    function removeDot(value){
      const removed = value.replace(/\./g, '');
      const finalValue = parseFloat(removed.replace(',', '.')) ?? 0;

      if(!isNaN(finalValue)){
        return finalValue;
      }else {
        return false;
      }
    }

    const totalItems = document.querySelectorAll('.input-currency');
    const installationItem = document.getElementById('installation-item');
    const deliveryItem = document.getElementById('delivery-item');
    const discountItem = document.getElementById('discount-item');
    const finalItem = document.getElementById('final-item');

    let somaItens = 0;
    for (const item of totalItems) {
      const valorItem = removeDot(item.value);
      if(!isNaN(valorItem)){
        somaItens += valorItem;
      }
    }

    const valorInstallation = removeDot(installationItem.value);
    const valorDelivery = removeDot(deliveryItem.value);
    const valorDiscount = removeDot(discountItem.value);

    const totalFinal = somaItens - valorDiscount + valorInstallation + valorDelivery;
    finalItem.value = Formatter.formatarMoeda(totalFinal);
  }

  calculateInputExists(){
    const unitaryInput = document.getElementById('unitary-item-1');
    const totalInput = document.getElementById('total-item-1');
    const amountInput = document.getElementById('amount-item-1');

    const installationItem = document.getElementById('installation-item');
    const deliveryItem = document.getElementById('delivery-item');
    const discountItem = document.getElementById('discount-item');

    // Adiciona os event listeners para os campos de input
    unitaryInput.addEventListener('input', ()=>{
      this.calculateTotal(unitaryInput, totalInput, amountInput);
      this.calculateFinalItem();
    });
    totalInput.addEventListener('input', ()=> {
      this.calculateUnitary(unitaryInput, totalInput, amountInput);
      this.calculateFinalItem();
    });
    amountInput.addEventListener('input', ()=>{
      this.calculateTotal(unitaryInput, totalInput, amountInput);
      this.calculateFinalItem();
    });

    installationItem.addEventListener('input', ()=>{
      this.calculateFinalItem();
    });

    deliveryItem.addEventListener('input', ()=>{
      this.calculateFinalItem();
    });

    discountItem.addEventListener('input', ()=>{
      this.calculateFinalItem();
    });

    // Atribui os elementos da classe CSS 'input-currency' a this.totalItems
    this.totalItems = document.querySelectorAll('.input-currency');

    // Adiciona event listeners aos elementos de this.totalItems
    this.totalItems.forEach((item) => {
      item.addEventListener('input', () => {
        this.calculateFinalItem();
      });
    });
  }
}
