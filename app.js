let listaDeNumeroSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroSecreto();
let tentativas = 1;

function exibirTestoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2}); // Feature adicional (não nativa do JavaScript - adicionado no HTML)
}

function exibirMensagemInicial() {
exibirTestoNaTela('h1', 'Jogo do Número Secreto');
exibirTestoNaTela('p', 'Selecione um número de 1 a 10');
}

exibirMensagemInicial(); // IMPORTANTE: é preciso já chamar a função exibirMensagemInicial no início 

function verificarChute() {
    let chute = document.querySelector('input').value; // Pegar somente o valor do input
    if (chute == numeroSecreto) {
        exibirTestoNaTela('h1', 'Você acertou o número secreto!');
        let palavavraTentativa = tentativas > 1 ? 'tentativas' : "tentativa"; // Operador ternário
        let mensagemTentativas = `Você acertou o número secreto com ${tentativas} ${palavavraTentativa}!`;
        exibirTestoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); // Habilitar o botão reiniciar quando o jogador acertar o número
    } else {
        if (chute > numeroSecreto) {
            exibirTestoNaTela('p', `O número secreto é menor que ${chute}.`);
        } else {
            exibirTestoNaTela('p', `O número secreto é maior que ${chute}.`);
        }
        tentativas ++; 
        limpaCampo();
    }
}

function gerarNumeroSecreto() {
    let numeroEscolhido = parseInt(Math.random()* numeroLimite + 1); // O numeroEscolhido serve para que se possa evitar gerar numeros repetidos
    let quantidadeDeElementosNaLista = listaDeNumeroSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumeroSorteados = [];
    }

    if (listaDeNumeroSorteados.includes(numeroEscolhido)) {
        return gerarNumeroSecreto();
    } else {
        listaDeNumeroSorteados.push(numeroEscolhido);
        console.log(listaDeNumeroSorteados);
        return numeroEscolhido;
    }
}

function limpaCampo() { // Função para limpar o número digitado pelo usuário
    chute = document.querySelector('input');
    chute.value = NaN;
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroSecreto();
    limpaCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true); // Desabilitar o botão quando iniciado um novo jogo, true como parametro 2 para confirmar.
}