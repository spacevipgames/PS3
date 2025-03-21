// Script para exibir listas de downloads e iniciar download automaticamente no PS3
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
                listContainer.innerHTML = "<p>Erro ao carregar a lista.</p>";
            });
    }

    function attachDownloadLinks() {
        document.querySelectorAll(".download-link").forEach(link => {
            let archiveFile = link.getAttribute("href").trim();
            
            if (!archiveFile.startsWith("http")) {
                archiveFile = `https://dn721001.ca.archive.org/0/items/sony_playstation3_a_part1/${encodeURIComponent(archiveFile)}`;
            }
            
            link.setAttribute("href", archiveFile);
            link.setAttribute("target", "_blank"); // Abre em uma nova aba para evitar bloqueio
            link.setAttribute("rel", "noopener noreferrer");
            link.setAttribute("download", ""); // Força o download automático
            
            link.addEventListener("click", function (event) {
                event.preventDefault();
                const a = document.createElement("a");
                a.href = archiveFile;
                a.target = "_blank";
                a.rel = "noopener noreferrer";
                a.download = "";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });
        });
    }

    // Definir os cookies de autenticação
    document.cookie = "abtest-identifier=4ddae50131c9f297496cba5d5dece3c3; path=/";
    document.cookie = "donation-identifier=e850cec1813f327e4507d817ccaa5fa6; path=/";
    document.cookie = "logged-in-sig=1774090604 1742554604 ezt7SDc1H6/28GqN9PvGitJJ45ibjK0cMrB+tO0fZvKnynYJg6K1rN3bIzB9v0DYNuJEupT+c6c82GG/dPce0rraZ38TlQ48tbtQ/Oi1Gg2oJF4s+QqhuyXGcIyGmQ4u90MgzbZJWF9dUpfPC4onMMfxYfTYdQgt/6GhWjQ3YlQ/UjVe9OmbDp3FaSKF3QHmqRZWySVW3RJ4GwUoF7pTU4qPrL7le49flKE0tEaoaIMrjzfVr5Pvy+sZX3QNmQZ6aQ6f4c39487xVzWTjDk7YM2ZwZtLdIKOo+bXA30CAMEPyhn9o5gvir11hj+Au9XeqSj8lneXhXPJCeZK6yrVJQ==; path=/";
    document.cookie = "logged-in-user=estabiomarcos740@gmail.com; path=/";
    document.cookie = "test-cookie=1; path=/";
});
