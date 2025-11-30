// categories.js
// -------------------------
// Página de categorías.
// - Comprueba autenticación
// - Muestra todas las categorías
// - Si hay ?categoria=ID en la URL, muestra los productos de esa categoría

function initCategories() {
    comprobarAuth();

    const tienda = obtenerTienda();
    if (!tienda) return;

    const params = new URLSearchParams(window.location.search);
    const idCatSeleccionada = params.get("categoria");

    const contCategorias = document.getElementById("listaCategorias");
    const contProductos = document.getElementById("listaProductos");
    const tituloProductos = document.getElementById("tituloProductos");

    /* === Listado de categorías === */
 tienda.categorias.forEach(c => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-3";

    col.innerHTML = `
        <div class="card h-100">
            <img src="${c.imagen}" class="card-img-top" alt="${c.nombre}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${c.nombre}</h5>
                <a href="categories.html?categoria=${c.id}" class="btn btn-primary mt-auto">
                    Ver productos
                </a>
            </div>
        </div>
    `;

    contCategorias.appendChild(col);
});

    /* === Productos de la categoría seleccionada === */
    if (idCatSeleccionada) {
        const cat = tienda.categorias.find(c => c.id == idCatSeleccionada);
        if (cat) {
            tituloProductos.textContent = "Productos de " + cat.nombre;
        }

        const productosCat = tienda.productos.filter(p => p.id_categoria == idCatSeleccionada);
        productosCat.forEach(p => {
            const col = document.createElement("div");
            col.className = "col-md-4 mb-3";
            col.innerHTML = `
                <div class="card product-card h-100">
                    <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${p.nombre}</h5>
                        <p class="card-text fw-bold">${p.precio.toFixed(2)} €</p>
                        <div class="mt-auto d-flex justify-content-between">
                            <button onclick="anadirAlCarrito(${p.id})" class="btn btn-primary btn-sm">Añadir</button>
                            <a href="product.html?id=${p.id}" class="btn btn-link btn-sm">Ver ficha</a>
                        </div>
                    </div>
                </div>
            `;
            contProductos.appendChild(col);
        });
    } else {
        tituloProductos.textContent = "Selecciona una categoría para ver los productos";
    }
}
