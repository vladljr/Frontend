alert("Olá! Este é o meu primeiro script!");
console.log("Mensagem exibida no console.");

console.log("Largura da janela: " + window.innerWidth);
console.log("Altura da janela: " + window.innerHeight);

(function() {
    localStorage.setItem("meuValor", "Olá, Local Storage!");
    const valorRecuperado = localStorage.getItem("meuValor");
    console.log("Valor recuperado do Local Storage: " + valorRecuperado);
})();

const meuDiv = document.createElement("div");
meuDiv.id = "meuDiv";
document.body.appendChild(meuDiv);

(function() {
    meuDiv.textContent = "Este é o meu div!";
    meuDiv.style.color = "blue";
    meuDiv.style.fontSize = "20px";
    meuDiv.style.backgroundColor = "lightyellow";
    meuDiv.style.padding = "10px";
})();

(function() {
    const paragrafo = document.querySelector("p");
    if (paragrafo) {
        paragrafo.textContent = "Texto modificado!";
        paragrafo.style.backgroundColor = "lightgreen";
    }
})();

(function() {
    const imagem = document.querySelector("img");
    if (imagem) {
        imagem.setAttribute("title", "Imagem dinâmica");
    }
})();

(function() {
    const botao = document.createElement("button");
    botao.textContent = "Clique para mudar o texto do div";
    botao.onclick = function() {
        meuDiv.textContent = "Texto do div foi mudado!";
    };
    document.body.appendChild(botao);
})();

(function() {
    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            console.log("A tecla Enter foi pressionada!");
        }
    });
})();

(function() {
    const lista = document.createElement("ul");
    document.body.appendChild(lista);

    function adicionarItem() {
        const li = document.createElement("li");
        li.textContent = "Novo item ";

        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.onclick = function() {
            lista.removeChild(li);
        };

        li.appendChild(botaoRemover);
        lista.appendChild(li);
    }

    const botaoAdicionar = document.createElement("button");
    botaoAdicionar.textContent = "Adicionar Item";
    botaoAdicionar.onclick = adicionarItem;
    document.body.appendChild(botaoAdicionar);
})();
