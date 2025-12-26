const casas = document.querySelectorAll(".casa");
const mensagem = document.getElementById("mensagem");

/* ===== PLACAR (localStorage) ===== */
let placarX = Number(localStorage.getItem("placarX")) || 0;
let placarO = Number(localStorage.getItem("placarO")) || 0;
let placarE = Number(localStorage.getItem("placarE")) || 0;

const placarXEl = document.getElementById("placarX");
const placarOEl = document.getElementById("placarO");
const placarEEl = document.getElementById("placarE");

placarXEl.textContent = placarX;
placarOEl.textContent = placarO;
placarEEl.textContent = placarE;

/* ===== CONTROLE DO JOGO ===== */
let jogoAtivo = true;
let vezDoJogador = true;

const combinacoesVitoria = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

/* ===== CLIQUE DO JOGADOR ===== */
casas.forEach((casa) => {
  casa.addEventListener("click", () => {
    if (!jogoAtivo || !vezDoJogador || casa.textContent !== "") return;

    casa.textContent = "X";
    casa.classList.add("x");
    mensagem.textContent = "Vez do robô 🤖";
    vezDoJogador = false;

    if (verificarVitoria("X")) return;

    setTimeout(jogadaRobo, 1000);
  });
});

/* ===== JOGADA DO ROBÔ ===== */
function jogadaRobo() {
  if (!jogoAtivo) return;

  const vazias = [];
  casas.forEach((casa, i) => {
    if (casa.textContent === "") vazias.push(i);
  });

  if (vazias.length === 0) {
    registrarEmpate();
    return;
  }

  const escolha = vazias[Math.floor(Math.random() * vazias.length)];
  casas[escolha].textContent = "O";
  casas[escolha].classList.add("o");

  if (!verificarVitoria("O")) {
    mensagem.textContent = "Sua vez (X)";
    vezDoJogador = true;
  }
}

/* ===== VERIFICAR VITÓRIA ===== */
function verificarVitoria(jogador) {
  for (let combo of combinacoesVitoria) {
    const [a, b, c] = combo;

    if (
      casas[a].textContent === jogador &&
      casas[b].textContent === jogador &&
      casas[c].textContent === jogador
    ) {
      atualizarPlacar(jogador);
      mensagem.textContent =
        jogador === "X"
          ? "🎉 Você venceu!"
          : "🤖 O robô venceu!";
      jogoAtivo = false;
      return true;
    }
  }

  if ([...casas].every(c => c.textContent !== "")) {
    registrarEmpate();
    return true;
  }

  return false;
}

/* ===== EMPATE ===== */
function registrarEmpate() {
  placarE++;
  placarEEl.textContent = placarE;
  animar(placarEEl);
  localStorage.setItem("placarE", placarE);
  mensagem.textContent = "😐 Empate!";
  jogoAtivo = false;
}

/* ===== ATUALIZAR PLACAR ===== */
function atualizarPlacar(jogador) {
  if (jogador === "X") {
    placarX++;
    placarXEl.textContent = placarX;
    animar(placarXEl);
    localStorage.setItem("placarX", placarX);
  } else {
    placarO++;
    placarOEl.textContent = placarO;
    animar(placarOEl);
    localStorage.setItem("placarO", placarO);
  }
}

/* ===== ANIMAÇÃO DO PLACAR ===== */
function animar(elemento) {
  elemento.classList.remove("animar");
  void elemento.offsetWidth;
  elemento.classList.add("animar");
}

/* ===== REINICIAR JOGO ===== */
function reiniciar() {
  casas.forEach(casa => {
    casa.textContent = "";
    casa.classList.remove("x", "o");
  });

  jogoAtivo = true;
  vezDoJogador = true;
  mensagem.textContent = "Sua vez (X)";
}
