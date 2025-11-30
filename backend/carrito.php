<?php
// carrito.php
// --------------
// Endpoint del carrito.
// Recibe la lista de productos del carrito con precios enviados por el cliente.
// Valida los precios comparando con tienda.json para evitar manipulaciones.

require_once "config.php";

// Validamos token
validar_token();

// Leemos el carrito enviado por el cliente
$input = json_decode(file_get_contents("php://input"), true);
$carritoCliente = $input["carrito"] ?? [];

// Cargamos la tienda para obtener los precios oficiales
$tienda = leer_json($TIENDA_FILE);
$productosServidor = $tienda["productos"] ?? [];

// Creamos un índice por id de producto para buscar rápido
$productosPorId = [];
foreach ($productosServidor as $p) {
    $productosPorId[$p["id"]] = $p;
}

$total = 0;

foreach ($carritoCliente as $item) {
    $id = $item["id"] ?? null;
    $precioCliente = $item["precio"] ?? null;
    $cantidad = $item["cantidad"] ?? 0;

    if (!$id || !isset($productosPorId[$id])) {
        http_response_code(400);
        echo json_encode(["error" => "Producto no válido en el carrito"]);
        exit;
    }

    $productoServidor = $productosPorId[$id];
    $precioServidor = $productoServidor["precio"];

    // Comprobamos que el precio del cliente = precio del servidor
    if (floatval($precioCliente) != floatval($precioServidor)) {
        http_response_code(400);
        echo json_encode(["error" => "Precio manipulado para el producto ID $id"]);
        exit;
    }

    // Sumamos al total
    $total += $precioServidor * $cantidad;
}

// Si todo está correcto, devolvemos OK y el total calculado en servidor
echo json_encode([
    "ok" => true,
    "mensaje" => "Compra realizada correctamente",
    "total" => $total
]);
