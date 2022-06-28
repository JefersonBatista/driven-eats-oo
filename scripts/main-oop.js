class Pedido {
  constructor() {
    this.prato = null;
    this.bebida = null;
    this.sobremesa = null;
  }

  setPrato(prato) {
    this.prato = prato;
  }

  setBebida(bebida) {
    this.bebida = bebida;
  }

  setSobremesa(sobremesa) {
    this.sobremesa = sobremesa;
  }

  verificar() {
    if (this.prato && this.bebida && this.sobremesa) {
      btnPedir.classList.add("ativo");
      btnPedir.disabled = false;
      btnPedir.innerHTML = "Fazer pedido";
    }
  }

  getPrecoTotal() {
    return this.prato.preco + this.bebida.preco + this.sobremesa.preco;
  }

  getEncodedText() {
    const encodedText = encodeURIComponent(
      `Olá, gostaria de fazer o pedido: \n- Prato: ${
        this.prato.nome
      } \n- Bebida: ${this.bebida.nome} \n- Sobremesa: ${
        this.sobremesa.nome
      } \nTotal: R$ ${pedido.getPrecoTotal().toFixed(2)}`
    );

    return encodedText;
  }
}

const pedido = new Pedido();

const btnConfirmar = document.querySelector(".confirmar");
const btnCancelar = document.querySelector(".cancelar");
const btnPedir = document.querySelector(".fazer-pedido");

class Produto {
  constructor({ nome, imagem, descricao, preco, selecionar }) {
    this.nome = nome;
    this.imagem = imagem;
    this.descricao = descricao;
    this.preco = preco;
    this.selecionar = selecionar;
  }

  getView() {
    const view = document.createElement("div");
    view.classList.add("opcao");
    view.addEventListener("click", () => {
      this.selecionar(view, this);
    });
    view.innerHTML = `
          <img src="${this.imagem}" />
          <div class="titulo">${this.nome}</div>
          <div class="descricao">${this.descricao}</div>
          <div class="fundo">
              <div class="preco">R$ ${this.preco.toFixed(2)}</div>
              <div class="check">
                  <ion-icon name="checkmark-circle"></ion-icon>
              </div>
          </div>
      `;

    return view;
  }
}

const pratos = [
  new Produto({
    nome: "Estrombelete de Frango",
    imagem: "img/frango_yin_yang.png",
    descricao: "Um pouco de batata, um pouco de salada",
    preco: 140.9,
    selecionar: selecionarPrato,
  }),
  new Produto({
    nome: "Asa de Boi",
    imagem: "img/frango_yin_yang.png",
    descricao: "Com molho shoyu",
    preco: 14.9,
    selecionar: selecionarPrato,
  }),
  new Produto({
    nome: "Carne de Monstro",
    imagem: "img/frango_yin_yang.png",
    descricao: "Com batata assada e farofa",
    preco: 14.9,
    selecionar: selecionarPrato,
  }),
];

const bebidas = [
  new Produto({
    nome: "Coquinha gelada",
    imagem: "img/coquinha_gelada.png",
    descricao: "Lata 350ml",
    preco: 4.9,
    selecionar: selecionarBebida,
  }),
  new Produto({
    nome: "Caldo de Cana",
    imagem: "img/coquinha_gelada.png",
    descricao: "Copo 600ml",
    preco: 4.9,
    selecionar: selecionarBebida,
  }),
  new Produto({
    nome: "Corote Gelado",
    imagem: "img/coquinha_gelada.png",
    descricao: "Garrafa 400ml",
    preco: 4.9,
    selecionar: selecionarBebida,
  }),
];

const sobremesas = [
  new Produto({
    nome: "Pudim",
    imagem: "img/pudim.png",
    descricao: "Gosto de doce de leite",
    preco: 7.9,
    selecionar: selecionarSobremesa,
  }),
  new Produto({
    nome: "Flam",
    imagem: "img/pudim.png",
    descricao: "Gosto de chocolate",
    preco: 7.9,
    selecionar: selecionarSobremesa,
  }),
  new Produto({
    nome: "Brigadeiro",
    imagem: "img/pudim.png",
    descricao: "3 unidades",
    preco: 7.9,
    selecionar: selecionarSobremesa,
  }),
];

function selecionarPrato(elemento, { nome, preco }) {
  const selecionado = document.querySelector(".prato .selecionado");
  if (selecionado !== null) {
    selecionado.classList.remove("selecionado");
  }
  elemento.classList.add("selecionado");

  pedido.setPrato({
    nome,
    preco,
  });
  pedido.verificar();
}

function selecionarBebida(elemento, { nome, preco }) {
  const selecionado = document.querySelector(".bebida .selecionado");
  if (selecionado !== null) {
    selecionado.classList.remove("selecionado");
  }
  elemento.classList.add("selecionado");

  pedido.setBebida({ nome, preco });
  pedido.verificar();
}

function selecionarSobremesa(elemento, { nome, preco }) {
  const selecionado = document.querySelector(".sobremesa .selecionado");
  if (selecionado !== null) {
    selecionado.classList.remove("selecionado");
  }
  elemento.classList.add("selecionado");

  pedido.setSobremesa({ nome, preco });
  pedido.verificar();
}

function confirmarPedido() {
  const modal = document.querySelector(".overlay");
  modal.classList.remove("escondido");

  document.querySelector(".confirmar-pedido .prato .nome").innerHTML =
    pedido.prato.nome;
  document.querySelector(".confirmar-pedido .prato .preco").innerHTML =
    pedido.prato.preco.toFixed(2);

  document.querySelector(".confirmar-pedido .bebida .nome").innerHTML =
    pedido.bebida.nome;
  document.querySelector(".confirmar-pedido .bebida .preco").innerHTML =
    pedido.bebida.preco.toFixed(2);

  document.querySelector(".confirmar-pedido .sobremesa .nome").innerHTML =
    pedido.sobremesa.nome;
  document.querySelector(".confirmar-pedido .sobremesa .preco").innerHTML =
    pedido.sobremesa.preco.toFixed(2);

  document.querySelector(".confirmar-pedido .total .preco").innerHTML = pedido
    .getPrecoTotal()
    .toFixed(2);
}

function cancelarPedido() {
  const modal = document.querySelector(".overlay");
  modal.classList.add("escondido");
}

function enviarZap() {
  const telefoneRestaurante = 553299999999;

  const urlWhatsapp = `https://wa.me/${telefoneRestaurante}?text=${pedido.getEncodedText()}`;
  window.open(urlWhatsapp);
}

const pratosContainer = document.querySelector(".opcoes.prato");
pratos.forEach((prato) => pratosContainer.appendChild(prato.getView()));
const bebidasContainer = document.querySelector(".opcoes.bebida");
bebidas.forEach((bebida) => bebidasContainer.appendChild(bebida.getView()));
const sobremesasContainer = document.querySelector(".opcoes.sobremesa");
sobremesas.forEach((sobremesa) =>
  sobremesasContainer.appendChild(sobremesa.getView())
);

btnConfirmar.addEventListener("click", () => {
  enviarZap();
});

btnCancelar.addEventListener("click", () => {
  cancelarPedido();
});

btnPedir.addEventListener("click", () => {
  confirmarPedido();
});
