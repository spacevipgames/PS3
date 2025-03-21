// Script para exibir listas de downloads e iniciar download automaticamente no PS3

document.addEventListener("DOMContentLoaded", function () {
    const listSelection = document.getElementById("listSelection");
    const listContainer = document.getElementById("listContainer");

    // Carregar a lista automaticamente ao iniciar a página
    loadList("a1.html");

    // Adicionar evento para mudar de lista
    document.querySelectorAll(".list-link").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const file = this.getAttribute("data-file");
            if (file) {
                loadList(file);
            }
        });
    });

    function loadList(file) {
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao carregar a lista.");
                }
                return response.text();
            })
            .then(data => {
                listContainer.innerHTML = data;
                attachDownloadLinks();
            })
            .catch(error => {
                console.error("Erro ao carregar a lista:", error);
                listContainer.innerHTML = "<p>Erro ao carregar a lista.</p>";
            });
    }

    function attachDownloadLinks() {
        document.querySelectorAll(".download-link").forEach(link => {
            let archiveFile = link.getAttribute("data-file") ? link.getAttribute("data-file").trim() : "";

            if (archiveFile && !archiveFile.startsWith("http")) {
                archiveFile = `https://archive.org/download/sony_playstation3_a_part1/${encodeURIComponent(archiveFile)}`;
            }

            if (archiveFile) {
                link.setAttribute("href", archiveFile);
                link.setAttribute("target", "_blank"); // Abre em uma nova aba
                link.setAttribute("rel", "noopener noreferrer");
                link.setAttribute("download", ""); // Força o download automático
            }
        });
    }
});
