// Script para exibir listas de downloads e iniciar download automaticamente no PS3

document.addEventListener("DOMContentLoaded", function () {
    const listContainer = document.getElementById("listContainer");

    // Carregar a lista automaticamente ao iniciar a página
    loadList("a1.html");

    // Carregar nova lista ao clicar em um link de seleção
    document.querySelectorAll(".list-link").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const file = this.getAttribute("data-file");
            loadList(file);
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

            if (archiveFile) {
                // Ajusta o link corretamente para Archive.org
                archiveFile = `https://archive.org/download/sony_playstation3_a_part1/${encodeURIComponent(archiveFile)}`;

                link.setAttribute("href", archiveFile);
                link.setAttribute("rel", "noopener noreferrer");
                
                link.addEventListener("click", function (event) {
                    event.preventDefault();
                    
                    // Redireciona diretamente para o arquivo fora do GitHub Pages
                    window.location.replace(archiveFile);
                });
            }
        });
    }
});
