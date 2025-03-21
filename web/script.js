// Script para exibir listas de downloads e iniciar download automaticamente no PS3

document.addEventListener("DOMContentLoaded", function () {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    
    const container = document.getElementById("listContainer") || document.createElement("div");
    container.id = "listContainer";
    document.body.appendChild(container);

    function loadList(fileName) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", fileName, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    container.innerHTML = xhr.responseText;
                    setupDownloadLinks();
                } else {
                    container.innerHTML = `<p style="color: red;">Erro ao carregar a lista: ${xhr.statusText}</p>`;
                }
            }
        };
        xhr.send();
    }

    function setupDownloadLinks() {
        document.querySelectorAll("#listContainer a").forEach(link => {
            link.style.color = "white";
            link.setAttribute("target", "_blank");
            link.addEventListener("click", function (event) {
                event.preventDefault();
                
                // URL original do link
                let originalUrl = link.getAttribute("href");
                
                // Verifica se o link já contém um domínio completo, se não, adiciona o domínio correto
                if (!originalUrl.startsWith("http")) {
                    originalUrl = "https://dn721001.ca.archive.org/0/items/sony_playstation3_a_part1/" + originalUrl;
                }
                
                // Redireciona o usuário para o link formatado
                window.location.href = originalUrl;
            });
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
    
    // Carregar automaticamente a primeira lista para evitar tela vazia no PS3
    loadList("a1.html");
});
