import Formatter from "./formatter.js";

export default class DynamicCalculator{
  calculateTotal(unitaryInput, totalInput, amountInput) {
    if(amountInput.value === '' || amountInput.value === 0){
      amountInput.value = 1;
    }
    const unitaryValue = parseFloat(unitaryInput.value.replace(',', '.'));
    const amountValue = parseFloat(amountInput.value);
    const totalValue = unitaryValue * amountValue || 0;
    totalInput.value = Formatter.formatarMoeda(totalValue);
  }

  calculateUnitary(unitaryInput, totalInput, amountInput) {
    if(amountInput.value === '' || amountInput.value === 0){
      amountInput.value = 1;
    }
    const totalValue = parseFloat(totalInput.value.replace(',', '.'));
    const amountValue = parseFloat(amountInput.value);
    const unitaryValue = totalValue / amountValue || 0;
    unitaryInput.value = Formatter.formatarMoeda(unitaryValue);
  }

  calculateInputExists(){
    const unitaryInput = document.getElementById('unitary-item-1');
    const totalInput = document.getElementById('total-item-1');
    const amountInput = document.getElementById('amount-item-1');

    // Adiciona os event listeners para os campos de input
    unitaryInput.addEventListener('input', ()=>{
      this.calculateTotal(unitaryInput, totalInput, amountInput);
    });
    totalInput.addEventListener('input', ()=> {
      this.calculateUnitary(unitaryInput, totalInput, amountInput);
    });
    amountInput.addEventListener('input', ()=>{
      this.calculateTotal(unitaryInput, totalInput, amountInput);
    });
  }
}
