<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Downloads PS3</title>
    <style>
        body {
            background-color: black;
            color: white;
            text-align: center;
        }
        a {
            color: white;
            text-decoration: none;
        }
        ul {
            list-style: none;
            padding: 0;
        }
    </style>
</head>
<body>
    <div id="listSelectionContainer">
        <h2>Escolha uma Lista</h2>
        <ul id="listSelection">
            <li><a href="#" class="list-link" data-file="a1.html">Lista A1</a></li>
            <li><a href="#" class="list-link" data-file="b1.html">Lista B1</a></li>
            <li><a href="#" class="list-link" data-file="b2.html">Lista B2</a></li>
        </ul>
    </div>
    <div id="listContainer"></div>
    <script>
        document.addEventListener("DOMContentLoaded", function () {
            const container = document.getElementById("listContainer");
            
            function loadList(fileName) {
                fetch(fileName)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Arquivo de lista não encontrado: " + fileName);
                        }
                        return response.text();
                    })
                    .then(html => {
                        container.innerHTML = html;
                        setupDownloadLinks();
                    })
                    .catch(error => {
                        container.innerHTML = `<p style="color: red;">Erro ao carregar a lista: ${error.message}</p>`;
                    });
            }
            
            function setupDownloadLinks() {
                document.querySelectorAll("#listContainer a").forEach(link => {
                    link.style.color = "white";
                    link.setAttribute("target", "_blank");
                    
                    link.addEventListener("click", function (event) {
                        event.preventDefault();
                        let archiveFile = link.getAttribute("href");
                        if (archiveFile && !archiveFile.startsWith("http")) {
                            archiveFile = `https://archive.org/download/sony_playstation3_a_part1/${encodeURIComponent(archiveFile)}`;
                        }
                        window.location.href = archiveFile;
                    });
                });
            }
            
            document.querySelectorAll(".list-link").forEach(link => {
                link.addEventListener("click", function (event) {
                    event.preventDefault();
                    const file = this.getAttribute("data-file");
                    if (file) {
                        loadList(file);
                    }
                });
            });
        });
    </script>
</body>
</html>
