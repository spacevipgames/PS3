// Script para exibir listas de downloads e iniciar download automaticamente no PS3

document.addEventListener("DOMContentLoaded", function () {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    
    const container = document.getElementById("listContainer") || document.createElement("div");
    container.id = "listContainer";
    document.body.appendChild(container);

    function loadList(fileName) {
        fetch(fileName)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Arquivo de lista não encontrado: " + fileName);
                }
                return response.text();
            })
            .then(html => {
                container.innerHTML = html;
                setupDownloadLinks();
            })
            .catch(error => {
                container.innerHTML = `<p style="color: red;">Erro ao carregar a lista: ${error.message}</p>`;
            });
    }

    function setupDownloadLinks() {
        document.querySelectorAll("#listContainer a").forEach(link => {
            link.style.color = "white";
            link.setAttribute("target", "_blank");
        });
    }

    // Criar a lista de opções antes de configurar os eventos
    const listContainer = document.createElement("div");
    listContainer.innerHTML = `
        <h2 style="text-align: center;">Escolha uma Lista</h2>
        <ul id="listSelection" style="text-align: center; list-style: none; padding: 0;">
            <li><a href="#" class="list-link" data-file="a1.html">Lista A1</a></li>
            <li><a href="#" class="list-link" data-file="b1.html">Lista B1</a></li>
            <li><a href="#" class="list-link" data-file="b2.html">Lista B2</a></li>
        </ul>
    `;
    document.body.prepend(listContainer);

    // Event delegation para garantir que os links sempre respondam
    document.getElementById("listSelection").addEventListener("click", function (event) {
        if (event.target.classList.contains("list-link")) {
            event.preventDefault();
            loadList(event.target.dataset.file);
        }
    });
});
