const API_URL = "https://localhost:7186/Receita/";

// FUNÇÕES ATUALIZAR RECEITAS (configuracao.html)

window.onload = () => {
    resetForm();

    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get("id");

    if (!id) {
        return;
    }

    editarReceita(id);
    
}

async function salvarReceita() {
    const id = document.getElementById('receita-id').value;
    const nome = document.getElementById('nome-receita').value;
    const tipo = document.getElementById('tipo-receita').value;
    const ingredientes = document.getElementById('ingredientes-receita').value;

    if(!nome || !tipo || !ingredientes){
        alert('Valores inválidos inseridos');
        return;
    }

    const payload = {nomeReceita: nome, tipo: tipo, ingredientes: ingredientes};

    try {
        let response;

        if (id) {
            response = await fetch(`${API_URL}${id}`, {
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(payload)
            });
        } else {
            response = await fetch(API_URL, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(payload)
            });
        }

        if (!response.ok){
            throw new Error('Erro ao salvar');
        }

        resetForm();
        window.location.href = "receitas.html";

    } catch (error) {
        alert("Erro ao salvar a receita");
    }

}

async function editarReceita (id) {

    try {

        const response = await fetch(`${API_URL}${id}`, {
            method: 'GET'
        });
        if (!response.ok) throw new Error("Erro ao buscar receita");

        const receita = await response.json();
        if (!receita) return;

        document.getElementById('receita-id').value = receita.receitaId || "";
        document.getElementById('nome-receita').value = receita.nomeReceita || "";
        document.getElementById('tipo-receita').value = receita.tipo || "";
        document.getElementById('ingredientes-receita').value = receita.ingredientes || "";

        document.getElementById('excluir').style.visibility = 'visible';
        document.getElementById('excluir').style.display = 'inline';

        document.getElementById('form-title').textContent = 'Editar Receita';
    
    } catch (error) {
        alert("Erro ao carregar a receita");
    }

}

async function excluirReceita() {
    const id = document.getElementById('receita-id').value;

    if (!confirm('Deseja realmente excluir essa receita?')) return;

    try {
        const response = await fetch(`${API_URL}${id}`, {
            method: 'DELETE'
        });

        if (response.status === 204){
            resetForm();
            window.location.href = "receitas.html";
        } else {
            throw new Error('Erro ao excluir receita');
        }
    } catch (error) {
        alert("Erro ao excluir receita");
    }
    
}

async function resetForm() {
    document.getElementById('receita-id').value = '';
    document.getElementById('nome-receita').value = '';
    document.getElementById('tipo-receita').value = '';
    document.getElementById('ingredientes-receita').value = '';

    document.getElementById('excluir').style.visibility = 'hidden';
    document.getElementById('excluir').style.display = 'none';

    document.getElementById('form-title').textContent = 'Adicionar Receita';
}
