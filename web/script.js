document.addEventListener("DOMContentLoaded", function () {
    var links = document.querySelectorAll(".list-link");
    links.forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            var file = this.getAttribute("data-file");
            carregarLista(file);
        });
    });
});

function carregarLista(file) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", file, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("listContainer").innerHTML = xhr.responseText;
        } else if (xhr.readyState == 4) {
            document.getElementById("listContainer").innerHTML = "Erro ao carregar a lista.";
        }
    };
    xhr.send();
}
