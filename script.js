document.addEventListener('DOMContentLoaded', () => {

    //======================================================================
    // LÓGICA DO CLIMA
    //======================================================================
    const apiKey = '30ffcd582cf3beb160435305c304731c'; // Sua chave da API OpenWeatherMap
    const cidade = 'Samambaia, BR';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

    const climaCidade = document.getElementById('clima-cidade');
    const climaTemp = document.getElementById('clima-temperatura');
    const climaCondicao = document.getElementById('clima-condicao');
    const climaIcone = document.getElementById('clima-icone');
    const climaUmidade = document.getElementById('clima-umidade');
    const climaVento = document.getElementById('clima-vento');

    async function obterClima() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);
            const dados = await response.json();

            if (climaCidade) climaCidade.textContent = dados.name;
            if (climaTemp) climaTemp.textContent = dados.main.temp;
            if (climaCondicao) climaCondicao.textContent = dados.weather[0].description;
            if (climaIcone) {
                climaIcone.src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`;
                climaIcone.alt = `Ícone do clima: ${dados.weather[0].description}`;
            }
            if (climaUmidade) climaUmidade.textContent = dados.main.humidity;
            if (climaVento) climaVento.textContent = dados.wind.speed;
        } catch (error) {
            console.error("Falha ao obter dados do clima:", error);
            if (climaCidade) climaCidade.textContent = "Não foi possível carregar o clima.";
        }
    }

    obterClima();
    setInterval(obterClima, 20 * 60 * 1000); // Atualiza clima a cada 20 minutos

    //======================================================================
    // LÓGICA DO RELÓGIO
    //======================================================================
    const relogioContainer = document.getElementById('relogio-container');

    /**
     * Função para atualizar o relógio na tela a cada segundo.
     */
    function atualizarRelogio() {
        if (relogioContainer) {
            const agora = new Date();
            // Formata a data e hora para o padrão brasileiro (pt-BR)
            const opcoesData = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const dataFormatada = new Intl.DateTimeFormat('pt-BR', opcoesData).format(agora);
            const horaFormatada = agora.toLocaleTimeString('pt-BR');

            // Combina e exibe a data e hora no container
            relogioContainer.innerHTML = `${dataFormatada}<br>${horaFormatada}`;
        }
    }

    // --- Inicialização do Relógio ---
    atualizarRelogio(); // Mostra a hora imediatamente, sem esperar 1 segundo
    setInterval(atualizarRelogio, 1000); // Atualiza o relógio a cada segundo

});
//======================================================================
// LÓGICA DO RELÓGIO
//======================================================================
let porcentagem = 35;

let barraProgresso = document.getElementById('barraProgresso');
let textoPorcentagem = document.getElementById('textoPorcentagem');

barraProgresso.style.width = porcentagem + '%';
barraProgresso.setAttribute('aria-valuenow', porcentagem);

textoPorcentagem.innerHTML = `Estamos com <b style="font-weight: 700; color: #0d6efd;">${porcentagem}%</b> completos!`;

//===============================
//ANTI SCREEN LOCK
//===============================
document.addEventListener('DOMContentLoaded', () => {
    $("#anti-screen-lock").get(0).play().catch(error => {
        console.error("Erro ao travar a tela:", error);
    });
});