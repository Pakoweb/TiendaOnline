// login.js
// -------------------------
// Controla el formulario de login.
// Envía las credenciales al backend (login.php),
// y si son correctas guarda el token y la tienda en localStorage.

document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;
    const error = document.getElementById("error");

    error.textContent = "";

    try {
        // Llamada al backend para hacer login
        const resp = await fetch(BASE_URL + "/login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ usuario, password })
        });

        if (!resp.ok) {
            const dataError = await resp.json();
            error.textContent = dataError.error || "Error en el login";
            return;
        }

        const data = await resp.json();

        // Guardamos token y tienda en localStorage
        guardarToken(data.token);
        guardarTienda(data.tienda);

        // Redirigimos al dashboard
        window.location.href = "dashboard.html";
    } catch (err) {
        error.textContent = "Error de conexión con el servidor";
    }
});
