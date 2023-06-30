import OrderData from "./classes/orderData.js";

const orderData = new OrderData();
orderData.getData();
orderData.populateHTML();
orderData.openPrint();

console.log(orderData);
