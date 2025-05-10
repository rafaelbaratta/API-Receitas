const API_URL = "https://localhost:7186/Receita/por-imc/";

// FUNÇÕES CALCULADORA DE IMC (index.html)

async function calcularIMC() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100;

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0){
        alert("Por favor, informe um peso e uma altura válidos!");
        return;
    }

    const imc = weight / (height * height);

    buscarReceita(imc);
}

function buscarReceita(imc) {
    fetch(`${API_URL}${imc}`).then(response => {
        if(!response.ok){
            throw new Error('Erro de requisição');
        }
        return response.json();
    }).then(data => {

        document.getElementById('tipo').value = data.tipo || '';
        document.getElementById('receita').value = data.nomeReceita || '';
        document.getElementById('ingredientes').value = data.ingredientes || '';

        document.getElementById('tipo').disabled = false;
        document.getElementById('receita').disabled = false;
        document.getElementById('ingredientes').disabled = false;

    })
    .catch(error =>{
        alert("Erro ao procurar uma receita");
    });
}
