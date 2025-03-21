document.addEventListener("DOMContentLoaded", function () {
    function loadList(file) {
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Lista não encontrada.');
                }
                return response.text();
            })
            .then(html => {
                document.getElementById("listContainer").innerHTML = html;
                attachDownloadListeners();
            })
            .catch(error => {
                document.getElementById("listContainer").innerHTML = "<p>Lista não encontrada.</p>";
            });
    }

    function attachDownloadListeners() {
        document.querySelectorAll(".download-link").forEach(link => {
            link.addEventListener("click", function (event) {
                event.preventDefault();
                const url = this.getAttribute("href");
                window.location.href = url;
            });
        });
    }

    document.querySelectorAll(".list-link").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const file = this.getAttribute("data-file");
            loadList(file);
        });
    });

    // Se houver um hash na URL, carregar a lista correspondente
    const initialFile = window.location.hash.replace("#", "");
    if (initialFile) {
        loadList(initialFile);
    }
});
