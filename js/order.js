import OrderData from "./classes/orderData.js";

//PRELOAD
window.addEventListener('load', () => {
  const preload = document.getElementById('preload');
  preload.classList.remove('d-flex');
  preload.classList.add('d-none');
});

//CHAMADA DAS AÇÕES
const orderData = new OrderData();
orderData.getData();
orderData.populateHTML();
orderData.openPrint();

console.log(orderData);
