document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("content");
    const listas = ["A1", "A2", "B1", "B2", "C1", "C2", "Z1", "Z2"];
    const basePath = "./"; // Ajuste conforme necessário
    const cookieValue = "237063cb5b53d6175c282df626d055dd"; // Valor do cookie abtest-identifier
    let currentList = "";

    function showMainMenu() {
        container.innerHTML = "<h2>Escolha uma Lista:</h2>";
        listas.forEach(lista => {
            let btn = document.createElement("button");
            btn.textContent = `Lista ${lista}`;
            btn.onclick = () => loadList(lista);
            container.appendChild(btn);
            container.appendChild(document.createElement("br"));
        });
    }

    function loadList(listName) {
        currentList = listName;
        fetch(`${basePath}${listName.toLowerCase()}.html`)
            .then(response => response.text())
            .then(html => {
                container.innerHTML = `
                    <h2>Lista ${listName}</h2>
                    <input type="text" id="search" placeholder="Pesquisar..." onkeyup="filterFiles()">
                    <div id="fileList">${html}</div>
                    <button onclick="showMainMenu()">Voltar</button>`;
                attachDownloadEvents();
            })
            .catch(() => container.innerHTML = `<h2>Erro ao carregar a lista ${listName}</h2><button onclick="showMainMenu()">Voltar</button>`);
    }

    function attachDownloadEvents() {
        document.querySelectorAll("#fileList a").forEach(link => {
            link.addEventListener("click", function (event) {
                event.preventDefault();
                let fileUrl = link.href;

                // Criar uma requisição com cookie para iniciar o download
                fetch(fileUrl, {
                    method: "GET",
                    headers: {
                        "Cookie": `abtest-identifier=${cookieValue}`
                    }
                })
                .then(response => {
                    if (!response.ok) throw new Error("Erro ao iniciar download");
                    return response.blob();
                })
                .then(blob => {
                    let a = document.createElement("a");
                    a.href = URL.createObjectURL(blob);
                    a.download = fileUrl.split("/").pop();
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    console.log("📥 Download iniciado:", fileUrl);
                })
                .catch(error => console.error("Erro no download:", error));
            });
        });
    }

    window.filterFiles = function () {
        let input = document.getElementById("search").value.toLowerCase();
        document.querySelectorAll("#fileList a").forEach(link => {
            link.style.display = link.textContent.toLowerCase().includes(input) ? "" : "none";
        });
    };

    showMainMenu();
});

