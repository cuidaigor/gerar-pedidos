export default class FormPrinter {
  constructor(formId) {
    this.formId = formId;
    this.form = document.getElementById(formId);
    this.printButton = this.form.querySelector('button[type="submit"]');
    this.errors = {};

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

    try {
      this.validateForm(organizedFormValues);
      console.log(organizedFormValues);

      //Chama o método para gerar o arquivo de dados

    } catch (error) {
      console.error(error.message);
    }
  }

  validateForm(formValues) {
    this.errors = {};

    // Validar Cliente
    if (!formValues.client || typeof formValues.client !== 'string') {
      this.errors.client = 'O campo Cliente é obrigatório';
    }

    // Validar ID do Cliente
    const idClient = formValues['id-client'];
    if (idClient && !/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/.test(idClient)) {
      this.errors['id-client'] = 'O CPF ou CNPJ digitado não é válido.';
    }

    // Validar Whatsapp
    const whatsapp = formValues.whatsapp;
    if (whatsapp && !/^(\+\d{1,3})?\s*\(?(\d{2})\)?\s*\d{4,5}\-?\d{4}$/.test(whatsapp)) {
      this.errors.whatsapp = 'O Whatsapp digitado possui um formato inválido.';
    }

    // Validar Email
    const email = formValues.email;
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.errors.email = 'O Email digitado possui um formato inválido.';
    }

    //valida Endereço
    if (typeof formValues.address !== 'string') {
      this.errors.address = 'O Endereço digitado parece estranho.';
    }

    // Validar Número
    const number = formValues['address-number'];
    if (number && !/^(s\/n|\d+)$/.test(number)) {
      this.errors['address-number'] = 'Apenas "s/n" ou números.';
    }

    //valida Bairro
    if (typeof formValues.neighborhood !== 'string') {
      this.errors.neighborhood = 'O Bairro digitado parece estranho.';
    }

    //valida Complemento
    if (typeof formValues.complement !== 'string') {
      this.errors.complement = 'O Complemento digitado parece estranho.';
    }

    // Validar Cidade
    if (!formValues.city || typeof formValues.city !== 'string') {
      this.errors.city = 'O campo Cidade é obrigatório';
    }

    // Validar Cidade
    if (!formValues.state || typeof formValues.state !== 'string') {
      this.errors.state = 'O campo Estado é obrigatório';
    }

    // Validar CEP
    const cep = formValues['cep'];
    if (cep && !/^\d{5}-\d{3}$/.test(cep)) {
      this.errors['cep'] = 'O CEP possui um formato inválido';
    }

    // Validar ID do Pedido
    const idPedido = formValues['idOrder'];
    if (!idPedido) {
      this.errors['idOrder'] = 'O ID do Pedido é obrigatório.';
    } else if(idPedido.length !== 4 || isNaN(idPedido)){
      this.errors['idOrder'] = 'O ID do Pedido deve ter 4 dígitos.';
    }

    // Validar os Itens
    const items = formValues.items;
    for (const itemId in items) {
      const item = items[itemId];
      const nameItem = item.name;
      const amountItem = item.amount;
      const unitaryItem = item.unitary;
      const totalItem = item.total;

      //Validar Item
      if (!nameItem || typeof nameItem !== 'string') {
        this.errors[`item-${itemId}`] = 'O item é obrigatório.';
      }

      //Validar Quantidade
      if (!amountItem || amountItem === 0) {
        this.errors[`amount-item-${itemId}`] = 'A quantidade é obrigatória.';
      }

      //Validar Valor Unitário
      if (!unitaryItem || unitaryItem === '0,00') {
        this.errors[`unitary-item-${itemId}`] = 'O valor unitário é obrigatório.';
      } else {
        const regex = /^\d{1,3}(?:\.\d{3})*(?:,\d{2})?$/;

        if (!regex.test(unitaryItem)) {
          this.errors[`unitary-item-${itemId}`] = 'Formato incorreto.';
        }
      }

      //Validar Valor Total
      if (!totalItem || totalItem === '0,00') {
        this.errors[`total-item-${itemId}`] = 'O valor total é obrigatório.';
      } else {
        const regex = /^\d{1,3}(?:\.\d{3})*(?:,\d{2})?$/;

        if (!regex.test(totalItem)) {
          this.errors[`total-item-${itemId}`] = 'Formato incorreto.';
        }
      }
    }

    // Validar Instalação
    const installationItem = formValues['installation-item'];
    if (!installationItem && installationItem !== 0) {
      this.errors['installation-item'] = 'A taxa de instalação é obrigatória.';
    }

    // Validar Entrega
    const deliveryItem = formValues['delivery-item'];
    if (!deliveryItem && deliveryItem !== 0) {
      this.errors['delivery-item'] = 'A taxa de entrega é obrigatória.';
    }

    // Validar Desconto
    const discountItem = formValues['discount-item'];
    if (!discountItem && discountItem !== 0) {
      this.errors['discount-item'] = 'A taxa de entrega é obrigatória.';
    }

    // Validar Final
    const finalItem = formValues['final-item'];
    if (!finalItem && finalItem !== 0) {
      this.errors['final-item'] = 'O valor final é obrigatória.';
    }else{
      const regex = /^\d{1,3}(?:\.\d{3})*(?:,\d{2})?$/;
        if (!regex.test(finalItem)) {
          this.errors['final-item'] = 'Formato incorreto.';
        }
    }

    if (Object.keys(this.errors).length > 0) {
      this.addValidationClasses();
      // Adiciona as classes de validação para os inputs inválidos
      for (const key in this.errors) {
        const input = this.form.querySelector(`[name="${key}"]`);
        const parentDiv = input.parentElement;
        parentDiv.classList.add('has-validation');
        parentDiv.classList.add('has-error');

        // Verifica se já existe uma div de feedback de validação
        let feedbackDiv = parentDiv.querySelector('.invalid-feedback');
        if (!feedbackDiv) {
          feedbackDiv = document.createElement('div');
          feedbackDiv.classList.add('invalid-feedback');
          parentDiv.appendChild(feedbackDiv);
        }

        // Define a mensagem de erro na div de feedback de validação
        feedbackDiv.innerText = this.errors[key];
      }
      throw new Error('O formulário contém erros. Por favor, verifique os campos destacados.');
    }else {
      this.addValidationClasses();
    }
  }

  addValidationClasses() {
    const inputs = this.form.querySelectorAll('input, select');
    inputs.forEach((input) => {
      const fieldName = input.name;
      const isValid = !(fieldName in this.errors);
      const classToAdd = isValid ? 'is-valid' : 'is-invalid';
      const classToRemove = isValid ? 'is-invalid' : 'is-valid';

      input.classList.add(classToAdd);
      input.classList.remove(classToRemove);
    });
  }

  createDataFile(formValues) {
    // Lógica para criar um arquivo data.json
  }
}
