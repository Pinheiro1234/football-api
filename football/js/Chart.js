
document.addEventListener("DOMContentLoaded", function() {
    // Função para carregar todos os itens
 

    // Função para carregar os times
    async function loadTeams() {
        try {
            let response = await fetch('http://localhost:3000/teams');
            if (!response.ok) throw new Error('Erro ao carregar dados dos times');

            let teams = await response.json();
            populateDropdown("dropdownTeam1", teams); // Chama populateDropdown para dropdownTeam1
        } catch (error) {
            console.error("Erro ao carregar os times:", error);
        }
    }

    // Função para preencher um dropdown com dados
    function populateDropdown(dropdownId, items) {
        const dropdown = document.getElementById(dropdownId);
        dropdown.innerHTML = ''; // Limpar conteúdo existente
        items.forEach(item => {
            let option = document.createElement("option");
            option.value = item.id;       // Defina o valor conforme necessário
            option.textContent = item.name; // Ou outra propriedade relevante
            dropdown.appendChild(option);
        });
    }
    loadTeams();

});











debugger
let myChart; // Declara o gráfico fora da função para controle global

async function generateChart() {
    const selectedValue = document.getElementById("dropdownTeam1").value;

    try {
        // Faz o fetch para buscar dados da API

        const response = await fetch(`http://localhost:3000/teams/classification/${selectedValue}`);
        const data = await response.json();
        debugger

        // Extrai os dados que você deseja exibir no gráfico
        const { points, wins, draws, losses } = data;

        const ctx = document.getElementById('myChart').getContext('2d');


        // Dados para o gráfico, usando os valores obtidos da API
        debugger
        const chartData = {
            labels: ['Pontos', 'Vitórias', 'Empates', 'Derrotas'],
            datasets: [{
                label: 'Desempenho',
                data: [points, wins, draws, losses],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        };

        // Configuração do gráfico
        const config = {
            type: 'bar',
            data: chartData,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };

        // Verifica se o gráfico já existe e o destrói antes de criar um novo
        if (myChart) {
            myChart.destroy();
        }

        // Cria um novo gráfico
        myChart = new Chart(ctx, config);
    } catch (error) {
        console.error("Erro ao carregar dados da API:", error);
    }
}
