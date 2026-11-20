const visor = document.getElementById('visor');
const conta = document.getElementById('conta');

let atual = '0';         
let anterior = null;     
let operador = null;
let novoNumero = false;  

function atualizarVisor() {
    visor.textContent = atual;

    if (atual.length > 10) {
        visor.classList.add('pequeno');
    } else {
        visor.classList.remove('pequeno');
    }

    if (operador != null) {
        conta.textContent = anterior + ' ' + operador;
    } else {
        conta.textContent = '';
    }
}

function digitar(n) {
    if (novoNumero || atual == 'Erro') {
        atual = '0';
        novoNumero = false;
    }

    if (atual.length >= 15) return;

    if (atual == '0') {
        atual = n;
    } else {
        atual += n;
    }
    atualizarVisor();
}

function colocarPonto() {
    if (novoNumero || atual == 'Erro') {
        atual = '0';
        novoNumero = false;
    }

    if (!atual.includes('.')) {
        atual += '.';
    }
    atualizarVisor();
}

function escolherOperador(op) {
    if (atual == 'Erro') return;

    if (operador != null && !novoNumero) {
        calcular();
        if (atual == 'Erro') return;
    }

    anterior = atual;
    operador = op;
    novoNumero = true;
    atualizarVisor();
}

function calcular() {
    if (operador == null) return;

    const a = parseFloat(anterior);
    const b = parseFloat(atual);
    let resultado = 0;

    if (operador == '+') {
        resultado = a + b;
    } else if (operador == '-') {
        resultado = a - b;
    } else if (operador == '×') {
        resultado = a * b;
    } else if (operador == '÷') {
        if (b == 0) {
            erro('Não existe divisão por zero');
            return;
        }
        resultado = a / b;
    }

    if (!isFinite(resultado)) {
        erro('Número muito grande');
        return;
    }

    resultado = parseFloat(resultado.toPrecision(12));

    atual = String(resultado);
    anterior = null;
    operador = null;
    novoNumero = true;
    atualizarVisor();
}

function erro(msg) {
    atual = 'Erro';
    anterior = null;
    operador = null;
    novoNumero = true;
    atualizarVisor();
    conta.textContent = msg;
}

function limpar() {
    atual = '0';
    anterior = null;
    operador = null;
    novoNumero = false;
    atualizarVisor();
}

function apagar() {
    if (atual == 'Erro') {
        limpar();
        return;
    }
    if (novoNumero) return;

    atual = atual.slice(0, -1);
    if (atual == '' || atual == '-') {
        atual = '0';
    }
    atualizarVisor();
}


document.querySelectorAll('.btn').forEach(function (botao) {
    botao.addEventListener('click', function () {
        if (botao.dataset.num != undefined) {
            digitar(botao.dataset.num);
        } else if (botao.dataset.op != undefined) {
            escolherOperador(botao.dataset.op);
        } else {
            const acao = botao.dataset.acao;
            if (acao == 'limpar') limpar();
            if (acao == 'apagar') apagar();
            if (acao == 'ponto') colocarPonto();
            if (acao == 'igual') calcular();
        }
    });
});
