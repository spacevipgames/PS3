// Script para exibir listas de downloads e iniciar download automaticamente no PS3

document.addEventListener("DOMContentLoaded", function () {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    
    const container = document.getElementById("listContainer") || document.createElement("div");
    container.id = "listContainer";
    document.body.appendChild(container);

    const cookieValue = "237063cb5b53d6175c282df626d055dd"; // Valor do cookie abtest-identifier
    
    function getBaseURL(url) {
        try {
            const parsedURL = new URL(url);
            return parsedURL.origin; // Retorna a origem do domínio
        } catch (error) {
            console.error("URL inválida:", error);
            return "";
        }
    }

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
            link.addEventListener("click", function (event) {
                event.preventDefault();
                startDownload(this.href);
            });
        });
    }

    function startDownload(url) {
        const baseURL = getBaseURL(url);
        if (!baseURL) {
            console.error("URL base inválida");
            return;
        }

        console.log("Iniciando download:", url);

        // Abrir a URL diretamente no navegador, sem fazer `fetch()`
        window.location.href = url;
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

    // Carregar a primeira lista automaticamente ao abrir a página
    loadList("a1.html");
});
