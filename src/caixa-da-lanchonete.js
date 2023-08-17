class CaixaDaLanchonete {
    constructor() {
      this.cardapio = {
        cafe: 3.0,
        chantily: 1.5, //extra do cafe
        suco: 6.2,
        sanduiche: 6.5,
        queijo: 2.0, //extra do sanduiche
        salgado: 7.25,
        combo1: 9.5,
        combo2: 7.5,
      };
  
      this.descontoDinheiro = 0.05;
      this.acrescimoCredito = 0.03;
    }
  
    calcularValorDaCompra(formaDePagamento, itens) {
      let valorTotal = 0;
      let temItens = false;
  
      for (const item of itens) {
        const [codigoItem, quantidade] = item.split(",");
  
        if (codigoItem in this.cardapio) {
          temItens = true;
          valorTotal += this.cardapio[codigoItem] * quantidade;
  
          if (codigoItem === "cafe" && quantidade > 0) {
            valorTotal += this.cardapio["chantily"] * quantidade;
          } else if (codigoItem === "sanduiche" && quantidade > 0) {
            valorTotal += this.cardapio["queijo"] * quantidade;
          }
        } else if (codigoItem === "combo1") {
          temItens = true;
          valorTotal += this.cardapio["combo1"];
        } else if (codigoItem === "combo2") {
          temItens = true;
          valorTotal += this.cardapio["combo2"];
        } else {
          return "Item inválido!";
        }
      }
  
      if (!temItens) {
        return "Não há itens no carrinho de compra!";
      }
  
      if (itens.length === 0) {
        return "Quantidade inválida!";
      }
  
      if (formaDePagamento === "dinheiro") {
        valorTotal -= valorTotal * this.descontoDinheiro;
      } else if (formaDePagamento === "credito") {
        valorTotal += valorTotal * this.acrescimoCredito;
      } else if (formaDePagamento !== "debito") {
        return "Forma de pagamento inválida!";
      }
  
      const valorFormatado = valorTotal.toFixed(2).replace(".", ",");
      return `R$ ${valorFormatado}`;
    }
  }
  
  // Exemplo de uso:
  const lanchonete = new CaixaDaLanchonete();
  const itensCarrinho = ["sanduiche,2","suco,2"];
  const formaPagamento = "credito";
  const valorTotalCompra = lanchonete.calcularValorDaCompra(
    formaPagamento,
    itensCarrinho
  );
  console.log(`Valor total da compra: ${valorTotalCompra}`);
  export { CaixaDaLanchonete };