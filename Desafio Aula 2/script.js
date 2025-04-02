function jogar(jogadorEscolha) {
    const opcoes = ['Pedra', 'Papel', 'Tesoura'];
    const regras = {
        'Pedra': 'Tesoura',
        'Papel': 'Pedra',
        'Tesoura': 'Papel'
    };

    const computadorEscolha = opcoes[Math.floor(Math.random() * opcoes.length)];

    let resultado = '';

    if (jogadorEscolha === computadorEscolha) {
        resultado = 'Empate!';
    } else if (regras[jogadorEscolha] === computadorEscolha) {
        resultado = 'Você venceu!';
    } else {
        resultado = 'Você perdeu!';
    }

    return {
        escolhaJogador: jogadorEscolha,
        escolhaComputador: computadorEscolha,
        resultado: resultado
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const botoes = document.querySelectorAll('.opcao');

    botoes.forEach(botao => {
        botao.addEventListener('click', () => {
            const escolhaJogador = botao.getAttribute('data-escolha');
            const resultado = jogar(escolhaJogador);
            document.getElementById('escolha-jogador').textContent = `Você escolheu: ${resultado.escolhaJogador}`;
            document.getElementById('escolha-computador').textContent = `Computador escolheu: ${resultado.escolhaComputador}`;
            document.getElementById('resultado').textContent = `Resultado: ${resultado.resultado}`;
        });
    });
});