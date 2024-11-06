document.addEventListener("DOMContentLoaded", function() {
    // Função para carregar todos os itens
    async function loadAllItems() {
        try {
            let response = await fetch('http://localhost:3000/dates');
            if (!response.ok) throw new Error('Erro ao carregar todos os itens');

            let data = await response.json();
            populateDropdownDate("dropdownAllItems", data); // Chama populateDropdown para dropdownAllItems

        } catch (error) {
            console.error("Erro ao carregar todos os itens:", error);
        }
    }

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

    // Função para carregar os times
    async function loadTeams() {
        try {
            let response = await fetch('http://localhost:3000/teams');
            if (!response.ok) throw new Error('Erro ao carregar dados dos times');

            let teams = await response.json();
            populateDropdown("dropdownTeam1", teams); // Chama populateDropdown para dropdownTeam1
            populateDropdown("dropdownTeam2", teams); // Chama populateDropdown para dropdownTeam2
        } catch (error) {
            console.error("Erro ao carregar os times:", error);
        }
    }

    function populateDropdownDate(dropdownId, items) {
        const dropdown = document.getElementById(dropdownId);
        dropdown.innerHTML = ''; // Limpar conteúdo existente
        items.forEach(item => {
            let option = document.createElement("option");
            option.value = item.id;       // Defina o valor conforme necessário
            option.textContent = item.day; // Ou outra propriedade relevante
            dropdown.appendChild(option);
        });
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



    // Carregar todos os itens e os times ao carregar a página
    loadAllItems();
    loadAllRounds();
    loadTeams();

});

document.getElementById('create').addEventListener('click', async function() {
    // Variáveis que deseja enviar na requisição
    debugger
    const dropdownAllItems = parseInt(document.getElementById("dropdownAllItems").value, 10)
    const dropdownRound = parseInt(document.getElementById("dropdownRound").value, 10);
    const dropdownTeam1 = parseInt(document.getElementById("dropdownTeam1").value, 10);
    const HomeGoals = parseInt(document.getElementById("HomeGoals").value, 10);
    const dropdownTeam2 = parseInt(document.getElementById("dropdownTeam2").value, 10);
    const VisitGoals = parseInt(document.getElementById("VisitGoals").value, 10);
    
    // Colocando as variáveis dentro de um objeto 'data'
    const data = {
       
    };
    
    try {
        // Configurando a requisição com fetch e passando o objeto 'data' no body como JSON
        const response = await fetch('http://localhost:3000/matches', {
            method: 'POST', // Use o método adequado para sua API, como POST, GET, PUT, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dateId: dropdownAllItems,
                roundId: dropdownRound,
                teamHomeId: dropdownTeam1,
                teamHomeGoals: HomeGoals,
                teamVisitId: dropdownTeam2,
                teamVisitGoals: VisitGoals
            })
        });
        
        // Verificando se a resposta foi bem-sucedida
        if (!response.ok) {
            debugger
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        
        // Tratando os dados de resposta
        const dados = await response.json();
        debugger
        console.log('Dados recebidos:', dados);
        document.getElementById('formcreate').reset();
        window.location.href = '/Create';  // Redireciona para a página de cadastro limpa

    } catch (error) {
        console.error('Erro:', error);
    }
});