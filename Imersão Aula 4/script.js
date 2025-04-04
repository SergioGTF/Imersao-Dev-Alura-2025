const jogadores = [
    { nome: "Kratos", forca: 95, img: "https://th.bing.com/th/id/OIP.M9QEcBJKeMOkk4pnFvNGDQHaEK?rs=1&pid=ImgDetMain" },
    { nome: "Atreus", forca: 70, img: "https://th.bing.com/th/id/R.486a8a16a55f246b127a4bc3ee139d4c?rik=3zT8KzyzqH3hSA&riu=http%3a%2f%2fnoset.com.br%2fwp-content%2fuploads%2f2018%2f03%2fgod-of-war-atreus-key-art-01-ps4-us-19oct17-1.png&ehk=V0V%2b04WzUWBL0j6Y%2fdEVWKfAZuQDtf3kvD%2b2x4cNvfA%3d&risl=&pid=ImgRaw&r=0" },
    { nome: "Thor", forca: 90, img: "https://th.bing.com/th/id/OIP.akf3SgPOVjQy2cTDEALkxwHaEK?rs=1&pid=ImgDetMain" },
    { nome: "Freya", forca: 80, img: "https://wallpapercave.com/wp/wp12235759.jpg" },
    { nome: "Odin", forca: 85, img: "https://th.bing.com/th/id/OIP._M3S9N0Ti4klh2DZbiznRAHaHa?rs=1&pid=ImgDetMain" },
    { nome: "Tyr", forca: 75, img: "https://th.bing.com/th/id/R.489a94bc77160b941d70ed39bd61cf27?rik=m0LuA12Bn0gYbg&riu=http%3a%2f%2fimages6.fanpop.com%2fimage%2fphotos%2f44200000%2fgow5-tyr-god-of-war-44231230-1080-1350.jpg&ehk=%2b%2fAno42J9PwTXILP1pTrLUaGxk4jiaccWXXtB63EC98%3d&risl=&pid=ImgRaw&r=0" },
    { nome: "Baldur", forca: 88, img: "https://th.bing.com/th/id/OIP._eQsVgB37odGTrhYEAp3KQHaJQ?rs=1&pid=ImgDetMain" },
    { nome: "Sindri", forca: 60, img: "https://th.bing.com/th/id/OIP.42nR3mSVnx9Ufvf9_m0SDgHaHa?rs=1&pid=ImgDetMain" },
    { nome: "Brok", forca: 65, img: "https://th.bing.com/th/id/OIP.GX3UwXMK5gK31amON1o6VgAAAA?rs=1&pid=ImgDetMain" }
  ];
  
  let timeJogador = [];
  let timeComputador = [];
  
  const botoesDiv = document.getElementById("botoes-jogadores");
  const infoJogador = document.getElementById("informacoesJogador");
  const infoComputador = document.getElementById("informacoesComputador");
  const resultadoFinal = document.getElementById("resultadoFinal");
  const btnResultado = document.getElementById("resultadoBtn");
  const btnReiniciar = document.getElementById("reiniciarBtn");
  
  function criarCardsJogadores() {
    botoesDiv.innerHTML = "";
    jogadores.forEach(jogador => {
      const card = document.createElement("div");
      card.classList.add("card-jogador");
      card.innerHTML = `
        <img src="${jogador.img}" alt="${jogador.nome}">
        <strong>${jogador.nome}</strong><br>
        Força: ${jogador.forca}
      `;
      card.onclick = () => escolherJogador(jogador, card);
      botoesDiv.appendChild(card);
    });
  }
  
  function escolherJogador(jogador, cardElement) {
    if (timeJogador.length < 3 && !timeJogador.includes(jogador)) {
      timeJogador.push(jogador);
      cardElement.classList.add("selecionado");
    }
    if (timeJogador.length === 3) {
      desabilitarCards();
      escolherTimeComputador();
      btnResultado.style.display = "inline-block";
      btnReiniciar.style.display = "inline-block";
    }
  }
  
  function desabilitarCards() {
    const cards = document.querySelectorAll(".card-jogador");
    cards.forEach(card => card.style.pointerEvents = "none");
  }
  
  function escolherTimeComputador() {
    while (timeComputador.length < 3) {
      const aleatorio = jogadores[Math.floor(Math.random() * jogadores.length)];
      if (!timeComputador.includes(aleatorio) && !timeJogador.includes(aleatorio)) {
        timeComputador.push(aleatorio);
      }
    }
  }
  
  function calcularForca(time) {
    return time.reduce((soma, j) => soma + j.forca, 0);
  }
  
  function exibirResultado() {
    const forcaJ = calcularForca(timeJogador);
    const forcaC = calcularForca(timeComputador);
  
    infoJogador.innerText = `Seu time: ${timeJogador.map(j => j.nome).join(", ")} (Força: ${forcaJ})`;
    infoComputador.innerText = `Time do Computador: ${timeComputador.map(j => j.nome).join(", ")} (Força: ${forcaC})`;
  
    if (forcaJ > forcaC) {
      resultadoFinal.innerText = "Você venceu!";
    } else if (forcaJ < forcaC) {
      resultadoFinal.innerText = "Você perdeu!";
    } else {
      resultadoFinal.innerText = "Empate!";
    }
  }
  
  function reiniciarJogo() {
    timeJogador = [];
    timeComputador = [];
    infoJogador.innerText = "";
    infoComputador.innerText = "";
    resultadoFinal.innerText = "";
    btnResultado.style.display = "none";
    btnReiniciar.style.display = "none";
    criarCardsJogadores();
  }
  
  btnResultado.addEventListener("click", exibirResultado);
  btnReiniciar.addEventListener("click", reiniciarJogo);
  
  criarCardsJogadores();
  