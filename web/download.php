<?php
if (isset($_GET['url'])) {
    $url = $_GET['url'];
    $cookie = $_COOKIE['abtest-identifier']; // Obtenha o cookie necessário para autenticação
    
    // Requisição para download do arquivo
    $options = [
        'http' => [
            'header' => "Cookie: abtest-identifier=" . $cookie
        ]
    ];
    $context = stream_context_create($options);
    $data = file_get_contents($url, false, $context);
    
    // Defina o nome do arquivo para o download
    $fileName = basename($url);
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="' . $fileName . '"');
    echo $data;
} else {
    echo "URL de download não fornecida.";
}
?>
