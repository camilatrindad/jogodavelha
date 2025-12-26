


🎮 Jogo da Velha Pro

Um Jogo da Velha moderno e responsivo, desenvolvido com HTML5, CSS3 e JavaScript puro. O projeto conta com um sistema de Ranking, níveis de dificuldade para o Robô e modo local para 2 Jogadores.


✨ Funcionalidades
🤖 Jogador vs Robô: Enfrente uma inteligência artificial com 3 níveis de dificuldade (Fácil, Médio e Imbatível).

👥 Modo 2 Jogadores: Jogue localmente com um amigo.

🏆 Sistema de Ranking: O placar de vitórias totais é salvo permanentemente no seu navegador (LocalStorage).

🎵 Áudio Imersivo: Música de fundo relaxante e efeitos sonoros para as jogadas e vitória.

📱 Design Responsivo: Interface otimizada para computadores, tablets e smartphones.

🛠️ Tecnologias Utilizadas
HTML5: Estrutura semântica e elementos de áudio.

CSS3: Layout moderno com Flexbox, CSS Grid, gradientes e animações.

JavaScript (ES6+): Lógica do jogo, IA com estratégia de cantos/centro e persistência de dados.

📁 Estrutura do Projeto
Plaintext

jogodavelha/
├── index.html        # Estrutura principal do jogo
├── style.css         # Estilização e design responsivo
├── script.js        # Lógica, IA e controle de áudio
└── sounds/           # Pasta para arquivos de áudio
    ├── fundo.mp3     # Música de fundo (Loop)
    ├── x.mp3         # Som da jogada do X
    ├── o.mp3         # Som da jogada do O
    └── vitoria.mp3   # Som de celebração ao vencer
🚀 Como Executar
Faça o download ou clone este repositório.

Certifique-se de que os arquivos de som estão dentro da pasta sounds/ com os nomes corretos.

Abra o arquivo index.html em qualquer navegador moderno.

Nota sobre áudio: Devido às políticas dos navegadores, a música de fundo começará a tocar assim que você clicar em qualquer lugar da tela (ou fizer a sua primeira jogada).

🧠 Inteligência do Robô
A dificuldade do robô foi programada da seguinte forma:

Fácil: Escolhe posições de forma totalmente aleatória.

Médio: Tenta vencer se tiver a chance e bloqueia o jogador, mas comete erros ocasionais.

Expert: Utiliza uma lógica de prioridades (Vencer > Bloquear > Ocupar Centro > Ocupar Cantos).
