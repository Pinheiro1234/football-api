document.addEventListener("DOMContentLoaded", function() {


    async function loadAllRounds() {
        try {
            let response = await fetch('http://localhost:3000/rounds');
            if (!response.ok) throw new Error('Erro ao carregar todos os itens');

            let round = await response.json();
            populateDropdownRound("dropdownRound", round); // Chama populateDropdown para dropdownAllItems

        } catch (error) {
            console.error("Erro ao carregar todos os itens:", error);
        }
    }
    
    
    function populateDropdownRound(dropdownId, items) {
        const dropdown = document.getElementById(dropdownId);
        dropdown.innerHTML = ''; // Limpar conteúdo existente
        items.forEach(item => {
            let option = document.createElement("option");
            option.value = item.id;       // Defina o valor conforme necessário
            option.textContent = item.name; // Ou outra propriedade relevante
            dropdown.appendChild(option);
        });
    }

    loadAllRounds();

})

        async function searchMatches() {
            debugger
            const selectedRound = parseInt(document.getElementById('dropdownRound').value, 10);
            const matchesContainer = document.getElementById('matches-container');
            matchesContainer.innerHTML = ''; // Limpa resultados anteriores
            debugger
            try {
                // Faz a chamada à API para obter dados de partidas
                const response = await fetch(`http://localhost:3000/rounds/${selectedRound}/matches`);
                
                if (!response.ok) {
                    throw new Error('Erro ao buscar dados da API');
                }

                const data = await response.json();

                if (data.length === 0) {
                    alert("Nenhuma partida encontrada para a rodada selecionada.");
                    return;
                }
                
                
                // Para cada partida, cria um container e exibe as informações
                data.forEach(match => {
                    const matchContainer = document.createElement('section');
                    matchContainer.className = 'match-container';
                    matchContainer.style.display = 'block'; // Exibe o container
                    matchContainer.innerHTML = `
                        <div class="match-header"> ${match.round}</div>
                        <div class="match-info">
                            <div class="team">
                                <div class="team-name">${match.teamHome.name}</div>
                                <div class="team-score">${match.teamHomeGoals}</div>
                            </div>
                            <div class="team">
                                <div class="team-name">${match.teamVisit.name}</div>
                                <div class="team-score">${match.teamVisitGoals}</div>
                            </div>
                        </div>
                        <div class="match-date">Data: ${new Date(match.date).toLocaleDateString('pt-BR')}</div>
                    `;

                    matchesContainer.appendChild(matchContainer);
                });
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao carregar as partidas.');
            }
        }