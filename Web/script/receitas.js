const API_URL = "https://localhost:7186/Receita/";

// FUNÇÕES CONFERIR RECEITAS (receitas.html)

window.onload = () => {
    loadReceitas();
}

async function loadReceitas() {
    const tbody = document.querySelector('#receitas-table tbody');
    tbody.innerHTML = '';

    try {
        const response = await fetch(API_URL);
        const receitas = await response.json();
        
        receitas.forEach(r => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${r.receitaId}</td>
            <td>${r.nomeReceita}</td>
            <td>${r.tipo}</td>
            <td>${r.ingredientes}</td>
            <td class="actions">
                <a href="./configuracao.html?id=${r.receitaId}">
                    <button style="margin: auto;">Editar</button>
                </a>
            </td>`;
            tbody.appendChild(row);
        });
    } catch (error) {
        alert("Erro ao carregar receitas");
    }
}

