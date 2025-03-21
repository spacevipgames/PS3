document.addEventListener("DOMContentLoaded", function () {
    const cookieValue = "237063cb5b53d6175c282df626d055dd"; // Valor fixo do cookie
    const listContainer = document.getElementById("list-container");
    const searchInput = document.getElementById("search");
    const backButton = document.getElementById("back-button");
    const indexContainer = document.getElementById("index-container");
    
    function loadList(filename) {
        fetch(filename)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
                const links = doc.querySelectorAll("a");
                
                listContainer.innerHTML = "";
                links.forEach(link => {
                    const href = link.getAttribute("href");
                    if (href.endsWith(".iso") || href.endsWith(".pkg")) {
                        const fullUrl = new URL(href, filename).href;
                        const downloadLink = document.createElement("a");
                        downloadLink.href = fullUrl;
                        downloadLink.textContent = link.textContent;
                        downloadLink.classList.add("download-link");
                        downloadLink.onclick = function (event) {
                            event.preventDefault();
                            startDownload(fullUrl);
                        };
                        listContainer.appendChild(downloadLink);
                        listContainer.appendChild(document.createElement("br"));
                    }
                });
                indexContainer.style.display = "none";
                listContainer.style.display = "block";
                backButton.style.display = "block";
            });
    }
    
    function startDownload(url) {
        fetch(url, {
            method: "GET",
            headers: {
                "Cookie": `abtest-identifier=${cookieValue}`
            }
        }).then(response => {
            if (response.ok) {
                window.location.href = url;
            } else {
                alert("Erro no download!");
            }
        });
    }
    
    searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase();
        document.querySelectorAll(".download-link").forEach(link => {
            if (link.textContent.toLowerCase().includes(query)) {
                link.style.display = "block";
            } else {
                link.style.display = "none";
            }
        });
    });
    
    document.querySelectorAll(".list-button").forEach(button => {
        button.addEventListener("click", function () {
            const listFile = this.getAttribute("data-list");
            loadList(listFile);
        });
    });
    
    backButton.addEventListener("click", function () {
        listContainer.style.display = "none";
        backButton.style.display = "none";
        indexContainer.style.display = "block";
    });
});
