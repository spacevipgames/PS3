<?php
// Verifica se o parâmetro "file" foi passado
if (!isset($_GET['file'])) {
    die("Erro: Nenhum arquivo especificado.");
}

// Obtém o nome do arquivo da URL
$file = $_GET['file'];

// Define a URL base do Archive.org
$baseUrl = "https://archive.org/download/sony_playstation3_a_part1/";

// Monta a URL final de download
$fileUrl = $baseUrl . urlencode($file);

// 🔥 Cookie Fixo 🔥
$cookieValue = "237063cb5b53d6175c282df626d055dd";

if (!$cookieValue) {
    die("Erro: Cookie de autenticação não definido.");
}

// Configura os cabeçalhos HTTP para a requisição com o cookie
$options = [
    "http" => [
        "header" => "Cookie: abtest-identifier=" . $cookieValue
    ]
];

$context = stream_context_create($options);

// Testa o acesso ao arquivo com o cookie
$response = file_get_contents($fileUrl, false, $context);

if ($response !== false) {
    // Redireciona o PS3 para iniciar o download com autenticação
    // Alterado o URL para o domínio correto onde está o PHP funcionando
    header("Location: https://spcgames.fwh.is/download.php?file=" . urlencode($file) . "&cookie=" . urlencode($cookieValue));
    exit();
} else {
    die("Erro ao acessar o arquivo.");
}
?>
