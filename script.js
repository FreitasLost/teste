// Variáveis para armazenar os votos
let votes = {
    Pablo: 0,
    Datena: 0,
    GuilhermeBoulos: 0,
    Tabata: 0,
    RicardoNunes: 0
};

// Verificar se o usuário já votou
function hasVoted() {
    return localStorage.getItem('hasVoted') === 'true';
}

// Salvar o voto no armazenamento local
function saveVote(option) {
    localStorage.setItem('hasVoted', 'true');
    localStorage.setItem('vote', option);
}

// Limpar o voto do armazenamento local
function clearVote() {
    localStorage.removeItem('hasVoted');
    localStorage.removeItem('vote');
}

// Função para submeter o voto
function submitVote() {
    if (hasVoted()) {
        alert("Você já votou uma vez. Para mudar seu voto, clique no botão 'Mudar meu voto'.");
        return;
    }

    const options = document.getElementsByName('option');
    let selectedOption = null;

    for (const option of options) {
        if (option.checked) {
            selectedOption = option.value;
            break;
        }
    }

    if (selectedOption) {
        // Incrementar o voto para a opção selecionada
        votes[selectedOption]++;
        saveVote(selectedOption);
        updateResults();
        document.getElementById('result').innerHTML = `Você votou na ${selectedOption}`;
        document.getElementById('changeVoteButton').style.display = 'block';
        
        // Adiciona o confete
        confetti();
    } else {
        alert("Por favor, selecione uma opção antes de votar.");
    }
}

// Função para mudar o voto
function changeVote() {
    clearVote();
    document.getElementById('votingForm').style.display = 'block';
    document.getElementById('result').innerHTML = '';
    document.getElementById('changeVoteButton').style.display = 'none';
}

// Atualizar a contagem de votos e a opção líder
function updateResults() {
    // Atualizar a contagem de votos na interface
    document.getElementById('countPabloResult').innerText = votes.Pablo;
    document.getElementById('countDatenaResult').innerText = votes.Datena;
    document.getElementById('countGuilhermeBoulosResult').innerText = votes.GuilhermeBoulos;
    document.getElementById('countTabataResult').innerText = votes.Tabata;
    document.getElementById('countRicardoNunesResult').innerText = votes.RicardoNunes;

    // Determinar qual opção está ganhando
    let leadingOption = "Nenhuma ainda";
    let maxVotes = 0;

    for (let option in votes) {
        if (votes[option] > maxVotes) {
            maxVotes = votes[option];
            leadingOption = option;
        }
    }

    document.getElementById('leadingOption').innerText = leadingOption;
}

// Inicializar o formulário e resultados
function initialize() {
    if (hasVoted()) {
        document.getElementById('votingForm').style.display = 'none';
        document.getElementById('result').innerHTML = 'Você já votou uma vez. Para mudar seu voto, clique no botão abaixo.';
        document.getElementById('changeVoteButton').style.display = 'block';
    }
    updateResults();
}

initialize();
