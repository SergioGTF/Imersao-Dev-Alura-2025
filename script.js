async function conversor() {
    let valor = prompt("Digite o valor em reais (R$) para converter:");
    if (isNaN(valor) || valor === "" || valor === null) {
        alert("Por favor, insira um valor numérico válido.");
        return;
    }
    try {
        let response = await fetch(
        "https://api.exchangerate-api.com/v4/latest/BRL"
        );
        let data = await response.json();
        let moedas = {
        "Dólar Americano (USD)": data.rates.USD,
        "Euro (EUR)": data.rates.EUR,
        "Libra Esterlina (GBP)": data.rates.GBP,
        "Iene Japonês (JPY)": data.rates.JPY,
        "Won Sul-Coreano (KRW)": data.rates.KRW,
        };
        let mensagem = `R$${valor} equivale a:\n`;
        for (let moeda in moedas) {
        let convertido = (valor * moedas[moeda]).toFixed(2);
        mensagem += `${moeda}: ${convertido}\n`;
        }
        alert(mensagem);
    } catch (error) {
        alert("Erro ao obter as taxas de câmbio. Tente novamente mais tarde.");
    }
}
