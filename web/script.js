// Script para exibir listas de downloads e iniciar download automaticamente no PS3

document.addEventListener("DOMContentLoaded", function () {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    
    const container = document.getElementById("listContainer");
    const cookieValue = "237063cb5b53d6175c282df626d055dd"; // Valor do cookie abtest-identifier
    
    function getBaseURL(url) {
        const match = url.match(/https:\/\/(dn\d+)/);
        return match ? match[0] : "";
    }

    function loadList(fileName) {
        fetch(fileName)
            .then(response => response.text())
            .then(html => {
                container.innerHTML = html;
                setupDownloadLinks();
            })
            .catch(error => console.error("Erro ao carregar a lista:", error));
    }

    function setupDownloadLinks() {
        document.querySelectorAll("a").forEach(link => {
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

        fetch(url, {
            method: "GET",
            headers: {
                "Cookie": `abtest-identifier=${cookieValue}`
            }
        })
        .then(response => {
            if (response.ok) {
                window.location.href = url;
            } else {
                console.error("Falha ao iniciar o download");
            }
        })
        .catch(error => console.error("Erro ao acessar o link:", error));
    }

    document.querySelectorAll(".list-link").forEach(link => {
        link.style.color = "white";
        link.addEventListener("click", function (event) {
            event.preventDefault();
            loadList(this.dataset.file);
        });
    });

    // Exibir as listas disponíveis
    const listContainer = document.createElement("div");
    listContainer.innerHTML = `
        <h2>Escolha uma Lista</h2>
        <ul>
            <li><a href="#" class="list-link" data-file="a1.html">Lista A1</a></li>
            <li><a href="#" class="list-link" data-file="b1.html">Lista B1</a></li>
            <li><a href="#" class="list-link" data-file="b2.html">Lista B2</a></li>
        </ul>
    `;
    document.body.prepend(listContainer);
});
