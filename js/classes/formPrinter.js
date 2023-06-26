export default class FormPrinter {
  constructor(formId) {
    this.formId = formId;
    this.form = document.getElementById(formId);
    this.printButton = this.form.querySelector('button[type="submit"]');

    this.printButton.addEventListener('click', this.handlePrint.bind(this));
  }

  handlePrint(event) {
    event.preventDefault();

    const formData = new FormData(this.form);
    const formValues = Object.fromEntries(formData.entries());

    const items = {};

    for (const key in formValues) {
      if (key.startsWith('item-')) {
        const itemId = key.split('-')[1];
        const itemName = formValues[`item-${itemId}`];
        const itemAmount = formValues[`amount-item-${itemId}`];
        const itemUnitary = formValues[`unitary-item-${itemId}`];
        const itemTotal = formValues[`total-item-${itemId}`];

        items[itemId] = {
          name: itemName,
          amount: itemAmount,
          unitary: itemUnitary,
          total: itemTotal
        };
        delete formValues[`item-${itemId}`];
        delete formValues[`amount-item-${itemId}`];
        delete formValues[`unitary-item-${itemId}`];
        delete formValues[`total-item-${itemId}`];
      }
    }

    const organizedFormValues = {
      ...formValues,
      items: items
    };

    console.log(organizedFormValues);
  }

  validateForm(formValues) {
    // Lógica de validação dos dados do formulário
  }

  createDataFile(formValues) {
    // Lógica para criar um arquivo data.json
  }
}
