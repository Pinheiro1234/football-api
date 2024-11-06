
// document.addEventListener('DOMContentLoaded', function () { 
//     $('#myTable').DataTable({
//         language: {
//             "sEmptyTable": "Nenhum registro encontrado",
//             "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
//             "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
//             "sInfoFiltered": "(Filtrados de _MAX_ registros)",
//             "sInfoPostFix": "",
//             "sInfoThousands": ".",
//             "sLengthMenu": "_MENU_ resultados por página",
//             "sLoadingRecords": "Carregando...",
//             "sProcessing": "Processando...",
//             "sZeroRecords": "Nenhum registro encontrado",
//             "sSearch": "Pesquisar",
//             "oPaginate": {
//                 "sNext": "Próximo",
//                 "sPrevious": "Anterior",
//                 "sFirst": "Primeiro",
//                 "sLast": "Último"
//             },
//             "oAria": {
//                 "sSortAscending": ": Ordenar colunas de forma ascendente",
//                 "sSortDescending": ": Ordenar colunas de forma descendente"
//             }
//         }
//     });
// });

async function carregarClassificacao() {
    try {
        const response = await fetch('http://localhost:3000/teams/classification'); // Substitua pela URL da sua API
        if (!response.ok) {
            throw new Error('Erro ao buscar dados da API');
        }
        const classificacao = await response.json();

        // Seleciona o tbody da tabela
        const tabelaBody = document.querySelector("#myTable tbody");

        // Limpa o conteúdo atual da tabela
        tabelaBody.innerHTML = "";

        // Itera pelos dados da classificação e cria linhas na tabela
        classificacao.forEach((item, index) => {
            const linha = document.createElement("tr");

            // Adiciona a posição
            const nomeCell = document.createElement("td");
            nomeCell.style.textAlign = "left"; // Alinha o conteúdo à esquerda

            // Criar a imagem
            const imgElement = document.createElement("img");
            imgElement.src = item.imgUrl;       // Substitua "imgUrl" pelo campo correto com a URL da imagem
            imgElement.alt = item.name;         // Substitua "name" pelo campo correto com o nome do time
            imgElement.style.width = "40px";    // Define a largura da imagem
            imgElement.style.height = "40px";   // Define a altura da imagem
            imgElement.style.marginRight = "8px"; // Adiciona um espaço entre a imagem e o nome

            // Adiciona a imagem e o nome na célula
            nomeCell.appendChild(imgElement);
            nomeCell.appendChild(document.createTextNode(item.name) );
            if (index >= classificacao.length - 4) {
                nomeCell.style.backgroundColor = "#d15469"; // Pinta a célula de pontos em vermelho
                nomeCell.style.color = "white";         // Define o texto em branco para maior contraste
            }
            linha.appendChild(nomeCell);
            
             // Adiciona a célula com os pontos

             const pointsCell = document.createElement("td");
             pointsCell.textContent = item.points; // Substitua "Points" pelo campo correto da sua API
             if (index >= classificacao.length - 4) {
                pointsCell.style.backgroundColor = "#d15469"; // Pinta a célula de pontos em vermelho
                pointsCell.style.color = "white";         // Define o texto em branco para maior contraste
            }
             linha.appendChild(pointsCell);

             const WinsCell = document.createElement("td");
             WinsCell.textContent = item.wins; // Substitua "Points" pelo campo correto da sua API
             if (index >= classificacao.length - 4) {
                WinsCell.style.backgroundColor = "#d15469"; // Pinta a célula de pontos em vermelho
                WinsCell.style.color = "white";         // Define o texto em branco para maior contraste
            }
             linha.appendChild(WinsCell);

             const drawsCell = document.createElement("td");
             drawsCell.textContent = item.draws; // Substitua "Points" pelo campo correto da sua API
             if (index >= classificacao.length - 4) {
                drawsCell.style.backgroundColor = "#d15469"; // Pinta a célula de pontos em vermelho
                drawsCell.style.color = "white";         // Define o texto em branco para maior contraste
            }
             linha.appendChild(drawsCell);

             const lossesCell = document.createElement("td");
             lossesCell.textContent = item.losses; // Substitua "Points" pelo campo correto da sua API
             if (index >= classificacao.length - 4) {
                lossesCell.style.backgroundColor = "#d15469"; // Pinta a célula de pontos em vermelho
                lossesCell.style.color = "white";         // Define o texto em branco para maior contraste
            }
             linha.appendChild(lossesCell);
            
            // Adiciona a linha na tabela
            tabelaBody.appendChild(linha);

           

        });
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Chama a função para carregar a classificação quando a página é carregada
window.onload = carregarClassificacao;


var lista = document.querySelector('nav ul');
var btn = document.querySelector('.menu-btn i');

function menuShow(){
    if (lista.classList.contains('open')) {
        lista.classList.remove('open');
    }
    else{
        lista.classList.add('open');
    }
}