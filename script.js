const casas = document.querySelectorAll(".casa");
const mensagem = document.getElementById("mensagem");

const seletorDificuldade = document.getElementById("dificuldade");
const seletorModo = document.getElementById("modoJogo");

const placarXEl = document.getElementById("placarX");
const placarOEl = document.getElementById("placarO");
const placarEEl = document.getElementById("placarE");
const rankXEl = document.getElementById("rankX");
const rankOEl = document.getElementById("rankO");

let jogoAtivo = true;
let vezDoJogador = true;
let jogadorAtual = "X";


let placar = {
  X: Number(localStorage.getItem("placarX")) || 0,
  O: Number(localStorage.getItem("placarO")) || 0,
  E: Number(localStorage.getItem("placarE")) || 0
};

let ranking = {
  X: Number(localStorage.getItem("rankingX")) || 0,
  O: Number(localStorage.getItem("rankingO")) || 0
};

const combinacoesVitoria = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function iniciar() {
  atualizarPlacarUI();
  carregarConfiguracoes();
  adicionarEventos();
}

iniciar();

function adicionarEventos() {
  casas.forEach((casa, index) => {
    casa.addEventListener("click", () => cliqueCasa(casa, index));
  });

  seletorDificuldade.addEventListener("change", salvarConfiguracoes);
  
 
  seletorModo.addEventListener("change", () => {
    if (seletorModo.value === "2jogadores") {
      seletorDificuldade.parentElement.style.opacity = "0.3";
      seletorDificuldade.style.pointerEvents = "none";
    } else {
      seletorDificuldade.parentElement.style.opacity = "1";
      seletorDificuldade.style.pointerEvents = "auto";
    }
    salvarConfiguracoes();
    reiniciar();
  });
}

function cliqueCasa(casa, index) {
  if (!jogoAtivo || casa.textContent !== "") return;

  if (seletorModo.value === "robo") {
    if (!vezDoJogador) return;
    jogar(index, "X");
    if (!verificarFim("X")) pensarRobo();
  } else {
   
    jogar(index, jogadorAtual);
    if (!verificarFim(jogadorAtual)) {
        jogadorAtual = jogadorAtual === "X" ? "O" : "X";
        mensagem.textContent = `Vez do Jogador ${jogadorAtual}`;
    }
  }
}

function jogar(index, jogador) {
  casas[index].textContent = jogador;
  casas[index].classList.add(jogador.toLowerCase());
  
  vezDoJogador = (seletorModo.value === "robo") ? (jogador !== "X") : true;
}

function pensarRobo() {
  mensagem.textContent = "🤖 Robô pensando...";
  mensagem.classList.add("pensando");

  setTimeout(() => {
    mensagem.classList.remove("pensando");
    const jogada = escolherJogadaRobo();
    jogar(jogada, "O");
    if (!verificarFim("O")) {
        mensagem.textContent = "Sua vez (X)";
        vezDoJogador = true;
    }
  }, 8000); 
}

function escolherJogadaRobo() {
  const nivel = seletorDificuldade.value;
  if (nivel === "facil") return jogadaAleatoria();
  if (nivel === "medio") return jogadaEstrategica();
  
  return Math.random() < 0.85 ? jogadaEstrategica() : jogadaAleatoria();
}

function jogadaAleatoria() {
  const disponiveis = casasVazias();
  return disponiveis[random(disponiveis.length)];
}

function jogadaEstrategica() {
  return (
    tentarVitoria("O") ??
    tentarVitoria("X") ??
    (casas[4].textContent === "" ? 4 : escolherCanto()) ??
    jogadaAleatoria()
  );
}

function tentarVitoria(jogador) {
  for (let [a,b,c] of combinacoesVitoria) {
    const valores = [casas[a].textContent, casas[b].textContent, casas[c].textContent];
    if (valores.filter(v => v === jogador).length === 2 && valores.includes("")) {
      return [a,b,c][valores.indexOf("")];
    }
  }
  return null;
}

function escolherCanto() {
  const cantos = [0,2,6,8].filter(i => casas[i].textContent === "");
  return cantos.length ? cantos[random(cantos.length)] : null;
}

function verificarFim(jogador) {
  if (venceu(jogador)) {
    finalizarJogo(jogador);
    return true;
  }
  if (casasVazias().length === 0) {
    finalizarEmpate();
    return true;
  }
  return false;
}

function venceu(jogador) {
  return combinacoesVitoria.some(
    ([a,b,c]) =>
      casas[a].textContent === jogador &&
      casas[b].textContent === jogador &&
      casas[c].textContent === jogador
  );
}

function finalizarJogo(jogador) {
  jogoAtivo = false;
  placar[jogador]++;
  ranking[jogador]++;
  salvarDados();
  atualizarPlacarUI();
  mensagem.textContent = `🏆 Vitória do ${jogador}!`;
}

function finalizarEmpate() {
  jogoAtivo = false;
  placar.E++;
  salvarDados();
  atualizarPlacarUI();
  mensagem.textContent = "😐 Empate!";
}

function casasVazias() {
  return [...casas]
    .map((c, i) => c.textContent === "" ? i : null)
    .filter(i => i !== null);
}

function random(max) {
  return Math.floor(Math.random() * max);
}

function atualizarPlacarUI() {
  placarXEl.textContent = placar.X;
  placarOEl.textContent = placar.O;
  placarEEl.textContent = placar.E;
  rankXEl.textContent = ranking.X;
  rankOEl.textContent = ranking.O;
}

function salvarDados() {
  localStorage.setItem("placarX", placar.X);
  localStorage.setItem("placarO", placar.O);
  localStorage.setItem("placarE", placar.E);
  localStorage.setItem("rankingX", ranking.X);
  localStorage.setItem("rankingO", ranking.O);
}

function carregarConfiguracoes() {
  const dSalva = localStorage.getItem("dificuldade");
  const mSalvo = localStorage.getItem("modoJogo");
  if (dSalva) seletorDificuldade.value = dSalva;
  if (mSalvo) seletorModo.value = mSalvo;
}

function salvarConfiguracoes() {
  localStorage.setItem("dificuldade", seletorDificuldade.value);
  localStorage.setItem("modoJogo", seletorModo.value);
}

function reiniciar() {
  casas.forEach(c => {
    c.textContent = "";
    c.className = "casa";
  });
  jogoAtivo = true;
  vezDoJogador = true;
  jogadorAtual = "X";
  mensagem.textContent = "Sua vez (X)";
}



const musicaFundo = document.getElementById("musicaFundo");

    musicaFundo.volume = 0.2; 
    musicaFundo.loop = true;  

function tocarMusicaEvento() {
    if (musicaFundo && musicaFundo.paused) {
        musicaFundo.play().then(() => {
            console.log("Música iniciada!"); 
            document.removeEventListener("click", tocarMusicaEvento);
            document.removeEventListener("touchstart", tocarMusicaEvento);
        }).catch(error => {
            console.log("Aguardando interação real...");
        });
    }
}

document.addEventListener("click", tocarMusicaEvento);
document.addEventListener("touchstart", tocarMusicaEvento);