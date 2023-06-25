import Formatter from "./formatter.js";

export default class InputFormatter {
  constructor(inputElement, formatterFunction) {
    this.inputElement = inputElement;
    this.formatterFunction = formatterFunction;
    this.addInputListener();
  }

  addInputListener() {
    this.inputElement.addEventListener('change', () => {
      this.inputElement.value = this.formatterFunction(this.inputElement.value);
    });
  }
}
