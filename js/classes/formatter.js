export default class Formatter {
  static formatarDocumento(documento) {
    const numeros = documento.replace(/\D/g, '');

    if (numeros.length === 11) {
      return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (numeros.length === 14) {
      return numeros.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    } else {
      return documento;
    }
  }

  static formatarWhatsapp(numero) {
    const numeros = numero.replace(/\D/g, '');

    if (numeros.length === 10) {
      return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (numeros.length === 11) {
      return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else {
      return numero;
    }
  }

  static formatarCEP(cep) {
    const numeros = cep.replace(/\D/g, '');

    if (numeros.length === 8) {
      return numeros.replace(/(\d{5})(\d{3})/, '$1-$2');
    } else {
      return cep;
    }
  }

  static formatarMoeda(valor) {
    let formataValor = valor.toFixed(2);
    formataValor = formataValor.replace(".", ",");

    const partes = formataValor.split(",");
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    formataValor = partes.join(",");

    return formataValor;
  }
}
