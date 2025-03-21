// Script para exibir listas de downloads e iniciar download automaticamente no PS3
document.addEventListener("DOMContentLoaded", function () {
    const listContainer = document.getElementById("listContainer");

    // Carregar a lista por padrão ao iniciar
    loadList("a1.html");

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
                const archiveFile = this.getAttribute("href");
                const archiveUrl = `https://dn721001.ca.archive.org/0/items/sony_playstation3_a_part1/${archiveFile}`;

                // Redireciona o usuário para o link externo (permitido pelo GitHub Pages)
                window.location.href = archiveUrl;
            });
        });
    }

    // Definir o cookie de autenticação
    document.cookie = "abtest-identifier=237063cb5b53d6175c282df626d055dd; path=/";
});
