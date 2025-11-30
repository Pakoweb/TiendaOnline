<?php


// Endpoint para Productos Vistos Recientemente.Se guardan en local storage


require_once "config.php";

// Validamos el token enviado por el cliente
validar_token();

// Devolvemos una respuesta simple
echo json_encode([
    "ok" => true,
    "mensaje" => "Endpoint productos_vistos activo. La gestión se realiza en el cliente (localStorage)."
]);
