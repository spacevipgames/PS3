document.addEventListener("DOMContentLoaded", function () {
    const listSelection = document.getElementById("listSelection");
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
        var xhr = new XMLHttpRequest();
        xhr.open("GET", file, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                listContainer.innerHTML = xhr.responseText;
                fixDownloadLinks(); // Corrige os links após carregar a lista
            } else if (xhr.readyState == 4) {
                listContainer.innerHTML = "<p>Erro ao carregar a lista.</p>";
            }
        };
        xhr.send();
    }

    function fixDownloadLinks() {
        document.querySelectorAll("#listContainer a").forEach(link => {
            const originalHref = link.getAttribute("href");
            if (originalHref && !originalHref.startsWith("http")) {
                // Corrige o link para apontar para o Archive.org
                const finalUrl = `https://dn721001.ca.archive.org/0/items/sony_playstation3_a_part1/${originalHref}`;
                link.setAttribute("href", finalUrl);
                link.setAttribute("target", "_blank"); // Garante que abre corretamente
            }
        });
    }
});
