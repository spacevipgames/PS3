document.addEventListener("DOMContentLoaded", function () {
    const listSelection = document.getElementById("listSelection");
    const listContainer = document.getElementById("listContainer");

    // Carregar a lista automaticamente ao iniciar a página
    loadList("a1.html");

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
                console.error("Erro ao carregar a lista:", error);
                listContainer.innerHTML = "<p>Erro ao carregar a lista.</p>";
            });
    }

    function attachDownloadLinks() {
        document.querySelectorAll(".download-link").forEach(link => {
            let archiveFile = link.getAttribute("href").trim();

            // Corrigir a URL, garantindo que seja absoluta e válida
            if (!archiveFile.startsWith("http")) {
                archiveFile = `https://archive.org/download/sony_playstation3_a_part1/${encodeURIComponent(archiveFile)}`;
            }

            link.setAttribute("href", archiveFile);
            link.setAttribute("target", "_blank"); // Abre em nova aba
            link.setAttribute("rel", "noopener noreferrer");
            link.setAttribute("download", ""); // Força o download

            link.addEventListener("click", function (event) {
                event.preventDefault();
                
                // Criar um link invisível e simular um clique para iniciar o download
                const a = document.createElement("a");
                a.href = archiveFile;
                a.setAttribute("download", "");
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });
        });
    }
});
