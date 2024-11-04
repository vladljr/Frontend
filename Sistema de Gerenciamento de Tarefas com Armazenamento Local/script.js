document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const notifications = document.getElementById('notifications');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let filterStatus = 'all';
    let filterPriority = null;

    taskForm.addEventListener('submit', addTask);
    document.getElementById('filter-status').addEventListener('click', toggleFilterStatus);
    document.getElementById('filter-priority').addEventListener('click', filterByPriority);

    loadTasks();
    showNotifications();

    function addTask(event) {
        event.preventDefault();
        const name = document.getElementById('task-name').value;
        const deadline = document.getElementById('task-deadline').value;
        const priority = document.getElementById('task-priority').value;
        const task = { name, deadline, priority, completed: false };
        tasks.push(task);
        updateLocalStorage();
        loadTasks();
        taskForm.reset();
    }

    function loadTasks() {
        taskList.innerHTML = '';
        const filteredTasks = tasks.filter(task => {
            if (filterStatus === 'completed') return task.completed;
            if (filterStatus === 'pending') return !task.completed;
            return true;
        }).sort((a, b) => {
            if (filterPriority === 'alta') return a.priority === 'alta' ? -1 : 1;
            if (filterPriority === 'média') return a.priority === 'média' ? -1 : 1;
            if (filterPriority === 'baixa') return a.priority === 'baixa' ? -1 : 1;
            return 0;
        });

        filteredTasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskItem.innerHTML = `
                <span class="${new Date(task.deadline) - new Date() < 86400000 ? 'urgent' : ''}">
                    ${task.name} - ${task.deadline} - ${task.priority}
                </span>
                <button onclick="toggleCompletion(${index})">${task.completed ? 'Desfazer' : 'Concluir'}</button>
                <button onclick="editTask(${index})">Editar</button>
                <button onclick="deleteTask(${index})">Excluir</button>
            `;
            taskList.appendChild(taskItem);
        });
    }

    function toggleCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        updateLocalStorage();
        loadTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        updateLocalStorage();
        loadTasks();
    }

    function editTask(index) {
        const name = prompt("Novo nome da tarefa:", tasks[index].name);
        const deadline = prompt("Nova data de conclusão (YYYY-MM-DD):", tasks[index].deadline);
        const priority = prompt("Nova prioridade (alta/média/baixa):", tasks[index].priority);
        if (name && deadline && priority) {
            tasks[index] = { ...tasks[index], name, deadline, priority };
            updateLocalStorage();
            loadTasks();
        }
    }

    function toggleFilterStatus() {
        filterStatus = filterStatus === 'all' ? 'completed' : filterStatus === 'completed' ? 'pending' : 'all';
        this.innerText = filterStatus === 'all' ? 'Filtrar por Status' : filterStatus === 'completed' ? 'Mostrar Pendentes' : 'Mostrar Todos';
        loadTasks();
    }

    function filterByPriority() {
        filterPriority = filterPriority === null ? 'alta' : filterPriority === 'alta' ? 'média' : filterPriority === 'média' ? 'baixa' : null;
        this.innerText = filterPriority ? `Ordenar por: ${filterPriority}` : 'Filtrar por Prioridade';
        loadTasks();
    }

    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function showNotifications() {
        const urgentTasks = tasks.filter(task => new Date(task.deadline) - new Date() < 86400000 && !task.completed);
        if (urgentTasks.length) {
            notifications.innerHTML = `<strong>Tarefas urgentes:</strong> ${urgentTasks.map(task => task.name).join(', ')}`;
        } else {
            notifications.innerHTML = '';
        }
    }
});