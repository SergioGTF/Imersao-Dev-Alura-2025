const perguntaElemento = document.querySelector(".pergunta");
const respostasElemento = document.querySelector(".respostas");
const progressoElemento = document.querySelector(".progresso");
const textoFinal = document.querySelector(".fim span");
const conteudo = document.querySelector(".conteudo");
const conteudoFinal = document.querySelector(".fim");
const telaJogo = document.querySelector(".conteudo-jogo");
const menu = document.querySelector(".menu-dificuldade");

let indiceAtual = 0;
let acertos = 0;
let perguntas = [];

const perguntasFacil = [
  {
    pergunta: "Qual das alternativas representa uma linguagem de programação?",
    respostas: [
      { opcao: "HTML", correto: false },
      { opcao: "CSS", correto: false },
      { opcao: "Python", correto: true },
      { opcao: "Git", correto: false }
    ]
  },
  {
    pergunta: "Para que serve 'console.log()'?",
    respostas: [
      { opcao: "Exibir mensagens no console", correto: true },
      { opcao: "Criar variável", correto: false },
      { opcao: "Estilizar botão", correto: false },
      { opcao: "Enviar dados", correto: false }
    ]
  },
  {
    pergunta: "Qual destes é um tipo de dado primitivo?",
    respostas: [
      { opcao: "Boolean", correto: true },
      { opcao: "Function", correto: false },
      { opcao: "Array", correto: false },
      { opcao: "Object", correto: false }
    ]
  },
  {
    pergunta: "Qual tag HTML insere uma imagem?",
    respostas: [
      { opcao: "<img>", correto: true },
      { opcao: "<src>", correto: false },
      { opcao: "<image>", correto: false },
      { opcao: "<picture>", correto: false }
    ]
  },
  {
    pergunta: "CSS significa:",
    respostas: [
      { opcao: "Cascading Style Sheets", correto: true },
      { opcao: "Central Style Script", correto: false },
      { opcao: "Compact Style Syntax", correto: false },
      { opcao: "Colorful Style System", correto: false }
    ]
  }
];

const perguntasMedio = [
  {
    pergunta: "Qual a função do 'for' em JavaScript?",
    respostas: [
      { opcao: "Condição booleana", correto: false },
      { opcao: "Estrutura de repetição", correto: true },
      { opcao: "Função callback", correto: false },
      { opcao: "Expressão regular", correto: false }
    ]
  },
  {
    pergunta: "O que o CSS faz?",
    respostas: [
      { opcao: "Controla a estrutura", correto: false },
      { opcao: "Define estilo visual", correto: true },
      { opcao: "Gerencia banco de dados", correto: false },
      { opcao: "Compila código", correto: false }
    ]
  },
  {
    pergunta: "Qual o resultado de 2 + '2' no JavaScript?",
    respostas: [
      { opcao: "'22'", correto: true },
      { opcao: "4", correto: false },
      { opcao: "Erro", correto: false },
      { opcao: "undefined", correto: false }
    ]
  },
  {
    pergunta: "Como declarar uma variável em ES6?",
    respostas: [
      { opcao: "var", correto: false },
      { opcao: "let", correto: true },
      { opcao: "def", correto: false },
      { opcao: "new", correto: false }
    ]
  },
  {
    pergunta: "O que significa DOM?",
    respostas: [
      { opcao: "Document Object Model", correto: true },
      { opcao: "Digital Output Module", correto: false },
      { opcao: "Dynamic Ordered Map", correto: false },
      { opcao: "Document Optimization Method", correto: false }
    ]
  }
];

const perguntasDificil = [
  {
    pergunta: "O que significa 'hoisting' em JavaScript?",
    respostas: [
      { opcao: "Remoção de variáveis", correto: false },
      { opcao: "Elevar declarações ao topo", correto: true },
      { opcao: "Carregar CSS dinamicamente", correto: false },
      { opcao: "Executar código assíncrono", correto: false }
    ]
  },
  {
    pergunta: "Como declarar uma arrow function?",
    respostas: [
      { opcao: "function() => {}", correto: false },
      { opcao: "() => {}", correto: true },
      { opcao: "() -> {}", correto: false },
      { opcao: "=> () {}", correto: false }
    ]
  },
  {
    pergunta: "O que é uma *Promise* em JavaScript?",
    respostas: [
      { opcao: "Objeto de tempo", correto: false },
      { opcao: "Representa eventual conclusão ou falha", correto: true },
      { opcao: "Função assíncrona", correto: false },
      { opcao: "Declaração de erro", correto: false }
    ]
  },
  {
    pergunta: "Qual método transforma JSON em objeto?",
    respostas: [
      { opcao: "JSON.decode()", correto: false },
      { opcao: "JSON.parse()", correto: true },
      { opcao: "parseJSON()", correto: false },
      { opcao: "JSON.stringify()", correto: false }
    ]
  },
  {
    pergunta: "Como prevenir o comportamento padrão de um evento?",
    respostas: [
      { opcao: "stop()", correto: false },
      { opcao: "cancel()", correto: false },
      { opcao: "preventDefault()", correto: true },
      { opcao: "halt()", correto: false }
    ]
  }
];

function iniciarJogo(nivel) {
  if (nivel === "facil") perguntas = perguntasFacil;
  if (nivel === "medio") perguntas = perguntasMedio;
  if (nivel === "dificil") perguntas = perguntasDificil;

  menu.style.display = "none";
  telaJogo.style.display = "flex";
  conteudo.style.display = "flex";
  conteudoFinal.style.display = "none";

  indiceAtual = 0;
  acertos = 0;

  carregarPergunta();
}

function carregarPergunta() {
  progressoElemento.innerHTML = `${indiceAtual + 1}/${perguntas.length}`;
  const perguntaAtual = perguntas[indiceAtual];
  perguntaElemento.innerHTML = perguntaAtual.pergunta;
  respostasElemento.innerHTML = "";

  for (let resposta of perguntaAtual.respostas) {
    const botao = document.createElement("button");
    botao.classList.add("botao-resposta");
    botao.innerText = resposta.opcao;
    botao.onclick = () => {
      if (resposta.correto) acertos++;
      indiceAtual++;
      indiceAtual < perguntas.length ? carregarPergunta() : finalizarJogo();
    };
    respostasElemento.appendChild(botao);
  }
}

function finalizarJogo() {
  conteudoFinal.innerHTML = '<span></span>';
  textoFinal.innerHTML = `Você acertou ${acertos} de ${perguntas.length}`;

  conteudo.style.display = "none";
  conteudoFinal.style.display = "flex";

  const botaoReiniciar = document.createElement("button");
  botaoReiniciar.innerText = "Reiniciar";
  botaoReiniciar.classList.add("botao-resposta");
  botaoReiniciar.onclick = () =>
    iniciarJogo(
      perguntas === perguntasFacil
        ? "facil"
        : perguntas === perguntasMedio
        ? "medio"
        : "dificil"
    );

  const botaoMenu = document.createElement("button");
  botaoMenu.innerText = "Voltar ao Menu";
  botaoMenu.classList.add("botao-resposta");
  botaoMenu.onclick = voltarAoMenu;

  conteudoFinal.appendChild(textoFinal);
  conteudoFinal.appendChild(botaoReiniciar);
  conteudoFinal.appendChild(botaoMenu);
}

function voltarAoMenu() {
  telaJogo.style.display = "none";
  conteudoFinal.style.display = "none";
  menu.style.display = "block";
  conteudoFinal.innerHTML = '<span></span>';
}
