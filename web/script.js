// Script para exibir listas de downloads e iniciar download automaticamente no PS3

document.addEventListener("DOMContentLoaded", function () {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    
    const container = document.getElementById("listContainer");

    function getBaseURL(url) {
        const match = url.match(/https:\/\/(dn\d+)/);
        return match ? match[0] : "";
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

        fetch(url, {
            method: "GET",
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

    // Adicionar evento para carregar a lista quando um link for clicado
    document.getElementById("listSelection").addEventListener("click", function (event) {
        if (event.target.classList.contains("list-link")) {
            event.preventDefault();
            loadList(event.target.dataset.file);
        }
    });

    // Exibir automaticamente a primeira lista ao carregar
    loadList("a1.html");
});
