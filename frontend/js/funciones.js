// funciones.js
// -------------------------
// Archivo con funciones comunes para todo el frontend.
// - Gestión de localStorage (token, tienda, carrito, productos vistos)
// - Comprobación de autenticación
// - Redirección si no está logueado
// - Función de logout
// - Función para añadir al carrito
// - Función para registrar productos vistos

// Claves de localStorage
const LS_TOKEN = "token";
const LS_TIENDA = "tienda";
const LS_CARRITO = "carrito";
const LS_VISTOS = "productos_vistos";

// Ruta base del backend (carpeta donde están los PHP)
const BASE_URL = "../backend";

/* =========================
   GESTIÓN DE TOKEN / LOGIN
   ========================= */

function guardarToken(token) {
    localStorage.setItem(LS_TOKEN, token);
}

function obtenerToken() {
    return localStorage.getItem(LS_TOKEN);
}

/**
 * Devuelve true si hay token (usuario autenticado)
 */
function estaAutenticado() {
    return !!obtenerToken();
}

/**
 * Comprueba si el usuario está autenticado.
 * Si no, redirige a login.html.
 * Usar al inicio de las páginas privadas.
 */
function comprobarAuth() {
    if (!estaAutenticado()) {
        window.location.href = "login.html";
    }
}

/**
 * Cierra sesión:
 * - Borra token
 * - Borra tienda
 * - Borra carrito
 * - Borra productos vistos
 * - Redirige a login.html
 */
function logout() {
    localStorage.removeItem(LS_TOKEN);
    localStorage.removeItem(LS_TIENDA);
    localStorage.removeItem(LS_CARRITO);
    localStorage.removeItem(LS_VISTOS);
    window.location.href = "login.html";
}

/* =========================
   GESTIÓN DE TIENDA (JSON)
   ========================= */

function guardarTienda(tienda) {
    localStorage.setItem(LS_TIENDA, JSON.stringify(tienda));
}

function obtenerTienda() {
    const data = localStorage.getItem(LS_TIENDA);
    return data ? JSON.parse(data) : null;
}

/* =========================
   GESTIÓN DE CARRITO
   ========================= */

function obtenerCarrito() {
    const data = localStorage.getItem(LS_CARRITO);
    return data ? JSON.parse(data) : [];
}

function guardarCarrito(carrito) {
    localStorage.setItem(LS_CARRITO, JSON.stringify(carrito));
}

/**
 * Añade un producto al carrito a partir del id.
 * Si ya existe, incrementa cantidad.
 */
function anadirAlCarrito(idProducto) {
    const tienda = obtenerTienda();
    if (!tienda) return;

    const producto = tienda.productos.find(p => p.id == idProducto);
    if (!producto) return;

    const carrito = obtenerCarrito();
    const existente = carrito.find(item => item.id == idProducto);

    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });
    }

    guardarCarrito(carrito);
    alert("Producto añadido al carrito");
}

/* =========================
   PRODUCTOS VISTOS
   ========================= */

function obtenerProductosVistos() {
    const data = localStorage.getItem(LS_VISTOS);
    return data ? JSON.parse(data) : [];
}

function guardarProductosVistos(lista) {
    localStorage.setItem(LS_VISTOS, JSON.stringify(lista));
}

/**
 * Registra un producto como "visto".
 * - Evita duplicados
 * - Lo pone al principio de la lista
 * - Limita la lista a 10 productos
 */
function registrarProductoVisto(idProducto) {
    const vistos = obtenerProductosVistos();
    const filtrados = vistos.filter(id => id != idProducto);
    filtrados.unshift(idProducto);
    const limitados = filtrados.slice(0, 10);
    guardarProductosVistos(limitados);
}
