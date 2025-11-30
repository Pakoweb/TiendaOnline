// cart.js
// -------------------------
// Página de carrito.
// - Comprueba autenticación
// - Carga el carrito del localStorage
// - Muestra productos y total
// - Envía el carrito al backend para validar precios
// - Si todo está OK, vacía el carrito

function initCart() {
    comprobarAuth();
    pintarCarrito();
}

/**
 * Pinta la lista de productos del carrito y el total.
 */
function pintarCarrito() {
    const carrito = obtenerCarrito();
    const contLista = document.getElementById("carritoLista");
    const contResumen = document.getElementById("carritoResumen");

    contLista.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        contLista.innerHTML = "<p>El carrito está vacío</p>";
        contResumen.innerHTML = "";
        return;
    }

    // Recorremos los productos del carrito
    carrito.forEach(item => {
        const subTotal = item.precio * item.cantidad;
        total += subTotal;

        // Creamos una fila usando Bootstrap
        const row = document.createElement("div");
        row.className = "row mb-2 border rounded p-2 align-items-center";
        row.innerHTML = `
            <div class="col-md-4">${item.nombre}</div>
            <div class="col-md-2">${item.precio.toFixed(2)} €</div>
            <div class="col-md-2">Cant: ${item.cantidad}</div>
            <div class="col-md-2">Subtotal: ${subTotal.toFixed(2)} €</div>
        `;
        contLista.appendChild(row);
    });

    contResumen.innerHTML = `<h3>Total: ${total.toFixed(2)} €</h3>`;
}

/**
 * Envía el carrito al backend para validar los precios y procesar la compra.
 */
async function realizarCompra() {
    const carrito = obtenerCarrito();
    const mensaje = document.getElementById("mensajeCarrito");

    if (carrito.length === 0) {
        mensaje.textContent = "No hay productos en el carrito";
        return;
    }

    const token = obtenerToken();

    try {
        const resp = await fetch(BASE_URL + "/carrito.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({ carrito })
        });

        const data = await resp.json();

        if (!resp.ok) {
            mensaje.textContent = data.error || "Error al procesar la compra";
            return;
        }

        // Compra OK: mostramos mensaje y vaciamos carrito
        mensaje.textContent = data.mensaje + " Total: " + data.total.toFixed(2) + " €";
        guardarCarrito([]);
        pintarCarrito();
    } catch (err) {
        mensaje.textContent = "Error de conexión con el servidor";
    }
}
