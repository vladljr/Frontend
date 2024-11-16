const FormTarefas = document.getElementById('FormTarefas');
const ListaTarefas = document.getElementById('ListaTarefas');

const filtroCompletoBtn = document.getElementById('filtrocompleto');
const filtroPendentesBtn = document.getElementById('filtropendentes');

const novaTarefaInput = document.getElementById('novaTarefa')

let filtrarConcluidas = false;

FormTarefas.addEventListener('submit', (event) => {
    event.preventDefault();

    const nomeTarefa = document.getElementById('NomeTarefa').value;
    const dataConclusao = document.getElementById('DataConclusao').value;

    const novaTarefa = {
        nome: nomeTarefa,
        dataConclusao: dataConclusao,
        completo: false
    };

    tarefas.push(novaTarefa);
    renderTasks();
    FormTarefas.reset();

});

function renderTasks() {
    ListaTarefas.innerHTML = '';

    tarefas.forEach((tarefa) => {
        const li = document.createElement('li');
        li.textContent = `${tarefa.nome} (Deve ser concluída em: ${tarefa.dataConclusao})`;

        const completoButton = document.createElement('button');
        completoButton.textContent = 'Concluir';
        completoButton.onclick = () => {
            tarefa.completo = true;
            renderTasks();
        };
        li.appendChild(completoButton);

        ListaTarefas.appendChild(li);
    });
}

filtroCompletoBtn.addEventListener('click', () => {
    renderTasks(tarefas.filter(tarefa => tarefa.completo));
});

filtroPendentesBtn.addEventListener('click', () => {
    renderTasks(tarefas.filter(tarefa => !tarefa.completo));
});

function adicionarTarefa() {
    const tarefa = novaTarefaInput.value;
    if (tarefa === '') {
        return;
    }

    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
        li.classList.toggle('concluida');
    });

    const textoTarefa = document.createTextNode(tarefa);
    const data = new Date();
    const dataFormatada = data.toLocaleDateString();
    const dataElemento = document.createElement('span');
    dataElemento.textContent = `(Concluir até: ${dataFormatada})`;

    li.appendChild(checkbox);
    li.appendChild(textoTarefa);
    li.appendChild(dataElemento);
    ListaTarefas.appendChild(li);

    novaTarefaInput.value = '';
}

function filtrarTarefaMaisUrgente() {
    const tarefas = document.querySelector('#ListaTarefas li');
    let tarefaMaisUrgente = null;

    tarefas.forEach(tarefa => {
        const dataElemento = tarefa.querySelector('span');
        const dataString = dataElemento.textContent.split(':')[1].trim();
        const data = new Date(dataString);

        if (!tarefaMaisUrgente || data < tarefaMaisUrgente.data) {
            tarefaMaisUrgente = {
                elemento: tarefa,
                data
            };
        } else {
            alert("A lista de tarefas está vazia ou não é um array!");
        }
        filtrarTarefaMaisUrgente();
    });

    if (tarefaMaisUrgente) {
        tarefaMaisUrgente.elemento.classList.add('mais-urgente');
    }
}

function filtrarTarefas() {
    filtrarConcluidas = !filtrarConcluidas;

    const tarefas = document.querySelectorAll('#listaTarefas li');
    tarefas.forEach(tarefa => {
        const checkbox = tarefa.querySelector('input[type="checkbox"]');
        if (filtrarConcluidas) {
            tarefa.style.display = checkbox.checked ? 'list-item': 'none';
        } else {
            tarefa.style.display = 'list-item';
        }
    })
}

let tarefas = [
    {nome: "Tarefa 1", dataConclusao: "2024-11-30", prioridade: "alta"},
    {nome: "Tarefa 2", dataConclusao: "2024-11-28", prioridade: "média"},
    {nome: "Tarefa 3", dataConclusao: "2024-11-24", prioridade: "baixa"},
    {nome: "Tarefa 4", dataConclusao: "2024-11-20", prioridade: "alta"}
];

function prioridadeValor(prioridade) {
    switch (prioridade) {
        case "alta":
            return 1;
        case "média":
            return 2;
        case "baixa":
            return 3;
        default:
            return 4;
    }
}

function ordenarTarefas(tarefas, criterio = prioridade) {
    return tarefas.sort((a, b) => {
        if (criterio === "prioridade") {
            return prioridadeValor(a.prioridade) - prioridadeValor(b.prioridade) || new Date(a.dataConclusao) - new Date(b.dataConclusao);
        } else if (criterio === "data") {
            return new Date(a.dataConclusao) - new Date(b.dataConclusao) || prioridadeValor(a.prioridade) - prioridadeValor(b.prioridade);
        }
        return 0;
    });
}

function salvarEdit() {
    const novoTexto = document.getElementById('editarTarefa').value;
    tarefas[editingIndex] = {text: novoTexto};
    document.getElementById('editarForm').style.display = 'none';
}

const tarefasSalvas = localStorage.getItem('tarefas');
tarefas = JSON.parse(tarefasSalvas) || [];

console.log("Ordenado por prioridade: ");
console.log(ordenarTarefas(tarefas, "prioridade"));

console.log("Ordenado por data de conclusão: ");
console.log(ordenarTarefas(tarefas, "data"));