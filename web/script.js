// Script para exibir listas de downloads e iniciar download automaticamente no PS3
document.addEventListener("DOMContentLoaded", function () {
    const listSelection = document.getElementById("listSelection");
    const listContainer = document.getElementById("listContainer");

    // Carregar a lista quando um link for clicado
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
                listContainer.innerHTML = "<p>Erro ao carregar a lista.</p>";
            });
    }

    function attachDownloadLinks() {
        document.querySelectorAll(".download-link").forEach(link => {
            link.addEventListener("click", function (event) {
                event.preventDefault();
                let archiveFile = this.getAttribute("href");

                // Verifica se já é uma URL completa
                if (!archiveFile.startsWith("http")) {
                    archiveFile = `https://dn721001.ca.archive.org/0/items/sony_playstation3_a_part1/${archiveFile}`;
                }

                // Redirecionar diretamente para a URL de download
                window.location.href = archiveFile;
            });
        });
    }

    // Definir o cookie de autenticação
    document.cookie = "abtest-identifier=237063cb5b53d6175c282df626d055dd; path=/";
});
