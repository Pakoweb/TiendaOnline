<?php
// productos_vistos.php
// --------------
// Endpoint para Productos Vistos Recientemente.
// El enunciado indica que la lista de productos vistos se almacena en el localStorage,
// así que aquí simplemente validamos el token y devolvemos una respuesta básica.

require_once "config.php";

// Validamos el token enviado por el cliente
validar_token();

// Devolvemos una respuesta simple
echo json_encode([
    "ok" => true,
    "mensaje" => "Endpoint productos_vistos activo. La gestión se realiza en el cliente (localStorage)."
]);
