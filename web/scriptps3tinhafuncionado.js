// Script para exibir listas de downloads e iniciar downloads automaticamente no PS3
document.addEventListener("DOMContentLoaded", function () {
    const listContainer = document.getElementById("listContainer");

    // Carregar a lista padrão ao iniciar (a1.html)
    loadList("a1.html");

    // Carregar lista quando um link for clicado
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
                const archiveFile = this.getAttribute("href");
                const domain = this.getAttribute("data-domain") || "https://dn721001.ca.archive.org"; // Domínio padrão
                const archiveUrl = `${domain}/0/items/sony_playstation3_a_part1/${archiveFile}`;
                
                // Criar um link invisível para iniciar o download automaticamente
                const a = document.createElement("a");
                a.href = archiveUrl;
                a.download = "";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });
        });
    }

    // Definir o cookie de autenticação
    document.cookie = "abtest-identifier=237063cb5b53d6175c282df626d055dd; path=/";
});
