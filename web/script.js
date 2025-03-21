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
        var xhr = new XMLHttpRequest();
        xhr.open("GET", file, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                listContainer.innerHTML = xhr.responseText;
                attachDownloadLinks(); // Garante que os links são ajustados após carregar a lista
            } else if (xhr.readyState == 4) {
                listContainer.innerHTML = "<p>Erro ao carregar a lista.</p>";
            }
        };
        xhr.send();
    }

    function attachDownloadLinks() {
        document.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", function (event) {
                event.preventDefault();
                const archiveUrl = this.getAttribute("href");

                if (archiveUrl.startsWith("http")) {
                    // Se o link já contém um domínio, redireciona diretamente
                    window.location.href = archiveUrl;
                } else {
                    // Caso contrário, adiciona o domínio do Archive.org
                    const finalUrl = `https://dn721001.ca.archive.org/0/items/sony_playstation3_a_part1/${archiveUrl}`;
                    console.log("Redirecionando para:", finalUrl);
                    window.location.href = finalUrl;
                }
            });
        });
    }
});
