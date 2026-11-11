/* =====================================================================
   UI compartida: iconos propios (SVG) y selector de "Lectura fácil".
   Cárgalo al inicio del <body>: <script src="ui.js"></script>
   ===================================================================== */
(function () {
  // ---------- Lectura fácil (se aplica antes de pintar para evitar parpadeo) ----------
  const CLAVE_FUENTE = "mesa-dnd-lectura-facil";
  function cargarAtkinson() {
    if (document.getElementById("fuente-atkinson")) return;
    const l = document.createElement("link");
    l.id = "fuente-atkinson"; l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&display=swap";
    document.head.appendChild(l);
  }
  let activa = false;
  try { activa = localStorage.getItem(CLAVE_FUENTE) === "1"; } catch {}
  if (activa) { document.documentElement.classList.add("lectura-facil"); cargarAtkinson(); }

  window.alternarLectura = function () {
    const on = !document.documentElement.classList.contains("lectura-facil");
    document.documentElement.classList.toggle("lectura-facil", on);
    if (on) cargarAtkinson();
    try { localStorage.setItem(CLAVE_FUENTE, on ? "1" : "0"); } catch {}
    document.querySelectorAll("[data-lectura]").forEach(b => b.setAttribute("aria-pressed", on));
  };
  window.botonLectura = () =>
    `<button class="btn-fuente" data-lectura aria-pressed="${document.documentElement.classList.contains("lectura-facil")}" onclick="alternarLectura()" title="Cambia a una tipografía de alta legibilidad">Aa <span>Lectura fácil</span></button>`;

  // ---------- Iconos (24×24, trazo) ----------
  const P = {
    mapa: "M3 6.5l6-2.5 6 2.5 6-2.5v13.5l-6 2.5-6-2.5-6 2.5z M9 4v13.5 M15 6.5V20",
    espadas: "M14.5 17.5L3 6V3h3l11.5 11.5 M13 19l6-6 M16 16l4 4 M19 21l2-2 M9.5 14.5L21 3h-3L6.5 14.5 M5 13l6 6 M8 16l-4 4 M3 19l2 2",
    escudo: "M12 3l8 3v6c0 5-3.5 8-8 9.5C7.5 20 4 17 4 12V6z M12 7v10 M8.5 11h7",
    cofre: "M3 10a4 4 0 014-4h10a4 4 0 014 4v10H3z M3 12.5h18 M10.5 11h3v4h-3z",
    dado: "M12 2.5l8.5 5v9l-8.5 5-8.5-5v-9z M12 7.5l-5 8.5h10z M12 2.5v5 M3.5 7.5L7 16 M20.5 7.5L17 16 M7 16l5 5.5 5-5.5",
    libro: "M2.5 5.5c3-1.2 6.2-1 9.5.9 3.3-1.9 6.5-2.1 9.5-.9v13.4c-3-1.1-6.2-.9-9.5 1-3.3-1.9-6.5-2.1-9.5-1z M12 6.4v13.4",
    casa: "M3 11l9-7 9 7 M5 9.5V20h14V9.5 M10 20v-5.5h4V20",
    persona: "M12 12a4 4 0 100-8 4 4 0 000 8z M4 21c.5-4 3.7-6 8-6s7.5 2 8 6",
    grupo: "M9 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7z M2.5 20c.4-3.6 3-5.5 6.5-5.5s6.1 1.9 6.5 5.5 M16 4.5a3.5 3.5 0 010 6.5 M18 14.8c2 .7 3.3 2.4 3.5 5.2",
    etiqueta: "M3 12.5V4h8.5l9.5 9.5-8.5 8.5z M7.5 8h.01",
    montana: "M2 20l7-12 4 6.5 3-4 6 9.5z",
    pregunta: "M12 22a10 10 0 100-20 10 10 0 000 20z M9.5 9.2a2.6 2.6 0 015 .6c0 1.7-2.5 2.1-2.5 3.7 M12 17h.01",
    rayo: "M13 2L4.5 13.5H11L10 22l8.5-12H12z",
    burbuja: "M4 5h16v11H10l-5 4v-4H4z M8 9.5h8 M8 12.5h5",
    gema: "M6.5 3h11l4 6-9.5 12L2.5 9z M2.5 9h19 M9.5 3L12 21l2.5-18",
    moneda: "M12 21a9 9 0 100-18 9 9 0 000 18z M12 6.5v11 M14.8 9.2c-.6-.8-1.6-1.2-2.8-1.2-1.7 0-3 .8-3 2s1.3 1.6 3 2 3 .9 3 2.1-1.3 2-3 2c-1.3 0-2.4-.5-3-1.3",
    arbol: "M12 22v-5 M12 2.5l5.5 7.5h-3l4.5 6.5H5L9.5 10h-3z",
    vela: "M9 10.5h6V21H9z M12 10.5V8 M12 3c1.6 1.4 1.6 3.4 0 4.5-1.6-1.1-1.6-3.1 0-4.5z M6 21h12",
    mascara: "M3 6c3 1.2 6 1.2 9 0 3 1.2 6 1.2 9 0 0 7.5-4 12.5-9 12.5S3 13.5 3 6z M7 10.2c.8-.6 1.7-.6 2.5 0 M14.5 10.2c.8-.6 1.7-.6 2.5 0 M9 14.3c2 1.4 4 1.4 6 0",
    pico: "M4 20l8.5-8.5 M10.5 9.5l4 4 M5 7.5c4.5-3.5 10-3.5 14.5 0-3.5-.5-6.5.5-9 3 M19.5 7.5c-.5 3.5-2 6.5-4.5 9",
    carpa: "M2 20.5h20 M3.5 20.5L12 5l8.5 15.5 M12 5V2.5l3 1.2-3 1.2 M9 20.5l3-6 3 6",
    corazon: "M12 20s-8-5-8-11a4.5 4.5 0 018-2.6A4.5 4.5 0 0120 9c0 6-8 11-8 11z",
    reloj: "M6 2.5h12 M6 21.5h12 M7 2.5c0 5.5 10 4 10 9.5S7 16 7 21.5 M17 2.5c0 5.5-10 4-10 9.5s10 4 10 9.5",
    pluma: "M20 3.5C13 4 7.5 9 5.5 17.5L4 21 M5.5 17.5C12 16.5 17 12 19 6 M8.5 14h5",
    mas: "M12 5v14 M5 12h14",
    cerrar: "M6 6l12 12 M18 6L6 18",
    siguiente: "M5 12h13 M13 6.5l5.5 5.5-5.5 5.5",
    anterior: "M19 12H6 M11 6.5L5.5 12l5.5 5.5",
    check: "M5 12.5l4.5 4.5L19 7.5",
    imprimir: "M6.5 9V3h11v6 M6.5 17.5H4V10.5h16v7h-2.5 M7 14h10v7H7z",
    brujula: "M12 21.5a9.5 9.5 0 100-19 9.5 9.5 0 000 19z M15.5 8.5l-2 5-5 2 2-5z",
    calavera: "M12 3a8 8 0 00-8 8c0 2.8 1.6 4 3 5v3.5h10V16c1.4-1 3-2.2 3-5a8 8 0 00-8-8z M9 11.5h.01 M15 11.5h.01 M10 19.5v-2 M14 19.5v-2",
    llama: "M12 21.5c-3.6 0-6.5-2.6-6.5-6.3 0-4.4 4-6.4 4.4-11.2 2.6 1.7 4 3.8 4.2 6.1 1-.6 1.7-1.6 2-2.9 1.5 1.9 2.4 4 2.4 6.3 0 4.6-2.9 8-6.5 8z",
    reiniciar: "M4.5 12a7.5 7.5 0 102.2-5.3 M4.5 3.5v4h4",
    arco: "M6 3c7 2.5 11.5 8 13 15 M6 3l13 15 M4 13.5L19 18.5 M3 12l1.5 4 4 1.5",
    farol: "M9 3h6 M12 3V2 M7.5 6h9l-1 13h-7z M6.5 19h11 M10 10h4 M12 10v5",
    sobre: "M3 5.5h18v13H3z M3 6l9 7 9-7",
    bolsa: "M7 7.5h10l2 13H5z M9 7.5a3 3 0 016 0 M12 13v3",
  };
  const sprite = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">${Object.entries(P).map(([k, d]) =>
    `<symbol id="i-${k}" viewBox="0 0 24 24"><path d="${d}"/></symbol>`).join("")}</svg>`;
  function inyectar() {
    if (document.getElementById("sprite-iconos")) return;
    const div = document.createElement("div"); div.id = "sprite-iconos"; div.innerHTML = sprite;
    document.body.prepend(div);
  }
  if (document.body) inyectar(); else document.addEventListener("DOMContentLoaded", inyectar);
  window.ico = (nombre, clase = "") => `<svg class="ico ${clase}" aria-hidden="true"><use href="#i-${nombre}"/></svg>`;
})();
