import Formatter from "./formatter.js";

export default class OrderData {
  constructor() {
    this.client = '';
    this.idClient = '';
    this.whatsapp = '';
    this.email = '';
    this.address = '';
    this.addressNumber = '';
    this.neighborhood = '';
    this.complement = '';
    this.city = '';
    this.state = '';
    this.cep = '';
    this.idOrder = '';
    this.orderDate = '';
    this.subtotal = '';
    this.installationItem = '';
    this.deliveryItem = '';
    this.discountItem = '';
    this.finalItem = '';
    this.items = {};
  }

  getData() {
    const data = localStorage.getItem('order-data');
    if (data) {
      const parsedData = JSON.parse(data);
      this.client = parsedData.client;
      this.idClient = parsedData['id-client'];
      this.whatsapp = parsedData.whatsapp;
      this.email = parsedData.email;
      this.address = parsedData.address;
      this.addressNumber = parsedData['address-number'];
      this.neighborhood = parsedData.neighborhood;
      this.complement = parsedData.complement;
      this.city = parsedData.city;
      this.state = parsedData.state;
      this.cep = parsedData.cep;
      this.idOrder = parsedData.idOrder;
      this.orderDate = parsedData['order-date'];
      this.subtotal = parsedData.subtotal;
      this.installationItem = parsedData['installation-item'];
      this.deliveryItem = parsedData['delivery-item'];
      this.discountItem = parsedData['discount-item'];
      this.finalItem = parsedData['final-item'];
      this.items = parsedData.items;
    }
  }

  populateHTML() {
    //Variáveis
    const isCPF = this.idClient.length == 14 ? true : false;
    const completeAdress = `
                              ${this.address}${this.addressNumber != '' ? ', '+this.addressNumber : ''}
                              ${this.address != '' ? '- '+this.neighborhood : this.neighborhood}
                              ${this.neighborhood != '' ? '- '+this.city+'-'+this.state : this.city+'-'+this.state}
                              ${this.cep != '' ? '- '+this.cep : ''}
                          `;

    //Altera título da página
    document.title = `DColor-Pedido#DC${this.idOrder}`;

    //dados do cliente
    document.getElementById('client').textContent = this.client;
    if(this.idClient && isCPF){
      document.getElementById('id-client').innerHTML = `<span class="fw-bold">CPF: </span>${this.idClient}`;
    }else if(this.idClient && !isCPF) {
      document.getElementById('id-client').innerHTML = `<span class="fw-bold">CNPJ: </span>${this.idClient}`;
    }
    document.getElementById('address').textContent = completeAdress;
    document.getElementById('email').textContent = this.email;
    document.getElementById('whatsapp').textContent = this.whatsapp;

    //Dados do pedido
    document.getElementById('idOrderTop').textContent = `Pedido #DC${this.idOrder}`;
    document.getElementById('idOrder').textContent = `Pedido #DC${this.idOrder}`;
    document.getElementById('order-date').textContent = Formatter.formatarDataImp(this.orderDate);

    //Itens do pedido
    const tbody = document.getElementById('items');
      // Mapeia os itens e cria as linhas da tabela dinamicamente
    const rows = Object.keys(this.items).map((key) => {
      const item = this.items[key];
      const row = document.createElement('tr');
      // Define o conteúdo de cada célula da linha
      row.innerHTML = `
        <th scope="row">${key}</th>
        <td class="item-description">${item.name}</td>
        <td class="unitary-item">${item.unitary}</td>
        <td class="amount-item">${item.amount}</td>
        <td class="text-end total-item">${item.total}</td>
      `;

      return row;
    });
      // Adiciona as linhas na tabela
    rows.forEach((row) => {
      tbody.appendChild(row);
    });

    //Valores adicionais e finais do pedido
    document.getElementById('subtotal').textContent = `R$ ${this.subtotal}`;
    document.getElementById('installation').textContent = `R$ ${this.installationItem}`;
    document.getElementById('delivery').textContent = `R$ ${this.deliveryItem}`;
    document.getElementById('discount').textContent = `R$ ${this.discountItem}`;
    document.getElementById('final').textContent = `R$ ${this.finalItem}`;
  }

  openPrint() {
    window.onload = () => {
      window.print();
      window.onafterprint = () => {
        window.location.href = "index.html";
      }
    }
  }

}
