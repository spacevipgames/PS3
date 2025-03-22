<?php
// Verificar se a URL do arquivo foi fornecida
if (isset($_GET['file'])) {
    $fileUrl = $_GET['file'];

    // Aqui você pode usar a técnica do cookie para autenticação
    // Por exemplo, você pode coletar os cookies e passá-los na requisição

    // Exemplo básico para enviar o cookie e obter o conteúdo
    $cookie = $_COOKIE['your_cookie_name']; // Substitua pelo nome real do seu cookie

    // Usar cURL para resolver o link com autenticação de cookie
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $fileUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_COOKIE, "your_cookie_name=$cookie"); // Substitua pelo nome do seu cookie
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

    // Executar a requisição
    $response = curl_exec($ch);
    $info = curl_getinfo($ch);
    curl_close($ch);

    // Verifique se a resposta foi bem-sucedida
    if ($info['http_code'] == 200) {
        // Se o download for bem-sucedido, redirecione o PS3 para o link resolvido
        echo json_encode(['success' => true, 'downloadLink' => $fileUrl]);
    } else {
        // Caso contrário, retorne um erro
        echo json_encode(['success' => false, 'message' => 'Erro ao resolver o download.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Nenhum arquivo fornecido.']);
}
?>
