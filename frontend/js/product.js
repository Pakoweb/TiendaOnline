// product.js
// -------------------------
// Página de ficha de producto.
// - Comprueba autenticación.
// - Obtiene el id de la URL (?id=).
// - Busca el producto en la tienda guardada en localStorage.
// - Muestra nombre, precio, imagen y descripción.
// - Registra el producto como "visto" en localStorage.
// - Permite añadir el producto al carrito.

function initProduct() {
    // Comprobamos que el usuario está autenticado
    comprobarAuth();

    // Obtenemos la tienda del localStorage
    const tienda = obtenerTienda();
    if (!tienda) return;

    // Leemos el parámetro ?id= de la URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    // Contenedor donde se mostrará la ficha de producto
    const cont = document.getElementById("productoDetalle");

    // Buscamos el producto por id en la tienda
    const producto = tienda.productos.find(p => p.id == id);
    if (!producto) {
        cont.innerHTML = "<p>Producto no encontrado</p>";
        return;
    }

    // Registramos este producto como "visto" en localStorage
    registrarProductoVisto(producto.id);

    // Pintamos la ficha del producto
    cont.innerHTML = `
        <div class="card product-card-detail p-3">
            <div class="row g-3">
                <div class="col-md-6 text-center">
                    <img src="${producto.imagen}" class="img-fluid rounded" alt="${producto.nombre}">
                </div>
                <div class="col-md-6 d-flex flex-column">
                    <h2>${producto.nombre}</h2>
                    <p class="fs-4 fw-bold">${producto.precio.toFixed(2)} €</p>
                    <p>${producto.descripcion || "Sin descripción disponible."}</p>

                    <button class="btn btn-primary mt-auto" onclick="anadirAlCarrito(${producto.id})">
                        Añadir al carrito
                    </button>
                </div>
            </div>
        </div>
    `;
}
