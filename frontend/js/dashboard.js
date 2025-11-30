// dashboard.js
// -------------------------
// Página principal tras el login.
// - Comprueba que el usuario esté autenticado
// - Carga desde localStorage los productos destacados
// - Carga categorías
// - Muestra productos vistos recientemente

function initDashboard() {
    // Aseguramos que el usuario está autenticado
    comprobarAuth();

    const tienda = obtenerTienda();
    if (!tienda) return;

    const contDest = document.getElementById("destacados");
    const contCat = document.getElementById("categorias");
    const contVistos = document.getElementById("vistos");

    /* === Productos destacados === */
    tienda.productos
        .filter(p => p.destacado)
        .forEach(p => {
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
            contDest.appendChild(col);
        });

    /* === Categorías === */
    tienda.categorias.forEach(c => {
        const col = document.createElement("div");
        col.className = "col-md-4 mb-3";
        col.innerHTML = `
            <div class="card h-100">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${c.nombre}</h5>
                    <a href="categories.html?categoria=${c.id}" class="btn btn-primary mt-auto">Ver productos</a>
                </div>
            </div>
        `;
        contCat.appendChild(col);
    });

    /* === Productos vistos recientemente === */
    const vistos = obtenerProductosVistos();
    vistos.forEach(id => {
        const p = tienda.productos.find(prod => prod.id == id);
        if (!p) return;

        const col = document.createElement("div");
        col.className = "col-md-4 mb-3";
        col.innerHTML = `
            <div class="card product-card h-100">
                <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${p.nombre}</h5>
                    <p class="card-text fw-bold">${p.precio.toFixed(2)} €</p>
                    <a href="product.html?id=${p.id}" class="btn btn-link mt-auto">Ver de nuevo</a>
                </div>
            </div>
        `;
        contVistos.appendChild(col);
    });
}
