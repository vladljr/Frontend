document.getElementById('meuFormulario').addEventListener('submit', function(event) {
    event.preventDefault(); 

    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (!nome || !email || !senha) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    
    const genero = document.querySelector('input[name="genero"]:checked').value;
    const pais = document.getElementById('pais').value;
    const comentarios = document.getElementById('comentarios').value;

    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `<h2>Dados Enviados:</h2>
                              <p>Nome: ${nome}</p>
                              <p>Email: ${email}</p>
                              <p>Senha: ${senha}</p>
                              <p>Gênero: ${genero}</p>
                              <p>País: ${pais}</p>
                              <p>Comentários: ${comentarios}</p>`;

    
    document.querySelector('h1').innerText = 'Formulário Enviado com Sucesso!';

    
    document.body.style.backgroundColor = '#d4edda'; 
});