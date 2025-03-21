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
                fixDownloadLinks(); // Ajusta os links para apontar para Archive.org com cookies
            })
            .catch(error => {
                listContainer.innerHTML = "<p>Erro ao carregar a lista.</p>";
            });
    }

    function fixDownloadLinks() {
        document.querySelectorAll("#listContainer a").forEach(link => {
            const originalHref = link.getAttribute("href");

            if (originalHref && !originalHref.startsWith("http")) {
                const finalUrl = `https://dn721001.ca.archive.org/0/items/sony_playstation3_a_part1/${originalHref}`;
                link.setAttribute("href", finalUrl);
                link.setAttribute("target", "_blank"); 

                // Automatiza a extração do cookie e faz o download imediato
                link.addEventListener("click", function (event) {
                    event.preventDefault();
                    startDownloadWithCookies(finalUrl);
                });
            }
        });
    }

    function startDownloadWithCookies(url) {
        // Obtém os cookies do navegador, incluindo 'abtest-identifier'
        document.cookie.split(";").forEach(cookie => {
            let [name, value] = cookie.split("=");
            name = name.trim();

            if (name === "abtest-identifier") {
                const cookieValue = value.trim();
                console.log("Cookie encontrado:", cookieValue);

                // Faz o download automático com autenticação de cookie
                fetch(url, {
                    method: "GET",
                    headers: {
                        "Cookie": `abtest-identifier=${cookieValue}`
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Erro ao iniciar o download.");
                    }
                    window.location.href = url; // Redireciona para o download
                })
                .catch(error => console.error("Erro ao iniciar o download:", error));
            }
        });
    }
});
