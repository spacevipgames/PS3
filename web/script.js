document.addEventListener("DOMContentLoaded", function () {
    const listContainer = document.getElementById("listContainer");

    // Adiciona evento para troca de listas
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
                fixDownloadLinks(); // Ajusta os links para apontar para Archive.org corretamente
            })
            .catch(error => {
                listContainer.innerHTML = "<p>Erro ao carregar a lista.</p>";
            });
    }

    function fixDownloadLinks() {
        document.querySelectorAll("#listContainer a").forEach(link => {
            const originalHref = link.getAttribute("href");

            if (originalHref && !originalHref.startsWith("http")) {
                const filename = originalHref.split('/').pop(); // Extrai o nome do arquivo
                const finalUrl = `https://dn721001.ca.archive.org/0/items/sony_playstation3_a_part1/${filename}`;

                console.log("Redirecionando para:", finalUrl);
                link.setAttribute("href", finalUrl);
                link.setAttribute("target", "_blank");

                // Garante que o clique leve diretamente ao Archive.org
                link.addEventListener("click", function (event) {
                    event.preventDefault();
                    window.location.href = finalUrl;
                });
            }
        });
    }
});
