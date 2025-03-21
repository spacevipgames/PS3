// Script para exibir listas de downloads e iniciar download automaticamente no PS3

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("listContainer");
    const cookieValue = "237063cb5b53d6175c282df626d055dd"; // Valor do cookie abtest-identifier

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
            link.addEventListener("click", function (event) {
                event.preventDefault();
                startDownload(this.href);
            });
        });
    }

    function startDownload(url) {
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
        link.addEventListener("click", function (event) {
            event.preventDefault();
            loadList(this.dataset.file);
        });
    });
});
