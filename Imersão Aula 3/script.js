let planetaHabitavel = null;
let contadorTemporal = 0;
let missaoCompleta = false;

function iniciarMissao() {
    planetaHabitavel = Math.floor(Math.random() * 3) + 1;
    contadorTemporal = 0;
    missaoCompleta = false;
    
    document.getElementById('botaoIniciar').style.display = 'none';
    document.getElementById('areaJogo').style.display = 'block';
    document.getElementById('botaoFinalizar').style.display = 'none';
    document.getElementById('resultado').textContent = '';
    
    atualizarDicaTemporal();
}

function atualizarDicaTemporal() {
    contadorTemporal++;
    const anosTerra = contadorTemporal * 7;
    document.getElementById('dicaTemporal').textContent = 
        `Tempo Terra: ${anosTerra} anos | Explorando...`;
    
    if (contadorTemporal >= 10 && !missaoCompleta) {
        document.getElementById('resultado').innerHTML = `⏳ Tempo esgotado! Falha na missão.`;
        document.getElementById('botaoFinalizar').style.display = 'block';
    }
}

function explorarPlaneta(planeta) {
    if (missaoCompleta) return;
    
    const resultado = document.getElementById('resultado');
    
    if (planeta === planetaHabitavel) {
        missaoCompleta = true;
        resultado.innerHTML = `Planeta ${nomePlaneta(planeta)} é habitável!<br>✅ Missão cumprida!`;
        document.getElementById('botaoFinalizar').style.display = 'block';
    } else {
        resultado.innerHTML = `Planeta ${nomePlaneta(planeta)} inóspito!`;
        
        setTimeout(atualizarDicaTemporal, 1000);
    }
}

function finalizarJogo() {
    document.getElementById('areaJogo').style.display = 'none';
    document.getElementById('botaoIniciar').style.display = 'block';
}

function nomePlaneta(numero) {
    return ["Miller (Ondas Gigantes)", "Mann (Gelo Falso)", "Edmunds (Esperança)"][numero-1];
}