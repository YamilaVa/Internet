/* ================================
   app.js – Lógica de la página
   - Enlaces externos robustos (formulario)
   - Scroll suave a secciones internas
   ================================ */

/* -------- Función openSafe(url) --------
   Intenta abrir una URL en una pestaña nueva con parámetros de seguridad.
   Si el navegador bloquea popups, usa fallback: abre en la misma pestaña. */
function openSafe(url) {
  // window.open intenta abrir en nueva pestaña con 'noopener' y 'noreferrer'
  const win = window.open(url, "_blank", "noopener,noreferrer");
  // Si fue bloqueado, win será null → abrimos en la misma pestaña
  if (!win) window.location.href = url;
}

/* -------- Manejador de clic para botones del formulario --------
   Atacha el comportamiento robusto a todos los botones con id 'openFormBtn' y 'openFormBtn2' */
function attachFormHandlers() {
  // Selecciona ambos botones por ID
  const ids = ["openFormBtn", "openFormBtn2"];
  ids.forEach((id) => {
    const el = document.getElementById(id);          // Obtiene el elemento con ese id
    if (!el) return;                                  // Si no existe, omite

    // Obtiene la URL desde data-url (fuente única confiable)
    const url = el.getAttribute("data-url") || el.href;

    // Agrega un listener de click
    el.addEventListener("click", function (e) {
      e.preventDefault();                             // Evita que el navegador procese el <a> por defecto
      openSafe(url);                                  // Llama a openSafe para abrir el link de forma segura
    });
  });
}

/* -------- Scroll suave para enlaces internos --------
   Mejora UX al navegar a secciones (#ancla) dentro de la misma página */
function enableSmoothScroll() {
  // Selecciona todos los <a> cuyos href empiezan con '#'
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");     // Lee el destino (ej: "#ofimatica")
      if (targetId.length > 1) {                      // Evita el caso de '#' solo
        e.preventDefault();                           // Cancela comportamiento por defecto
        const el = document.querySelector(targetId);  // Busca el elemento destino
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); // Desplazamiento suave
      }
    });
  });
}

/* -------- Punto de entrada --------
   'DOMContentLoaded' asegura que el DOM esté cargado antes de manipularlo */
document.addEventListener("DOMContentLoaded", function () {
  attachFormHandlers();  // Activa los botones del formulario con apertura robusta
  enableSmoothScroll();  // Activa el scroll suave en los enlaces internos
});