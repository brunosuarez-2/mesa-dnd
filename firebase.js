/* =====================================================================
   Conexión con Firebase (compartida por todas las páginas).
   Uso: <script type="module" src="firebase.js"></script>
   Expone window.Nube y lanza el evento "nube-lista" cuando está listo.
   Si no hay internet o falta config.js, lanza "nube-error" y la página
   sigue funcionando en modo local.
   ===================================================================== */
const V = "12.18.0";
try {
  const [{ initializeApp }, A, D, { firebaseConfig }] = await Promise.all([
    import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`),
    import(`https://www.gstatic.com/firebasejs/${V}/firebase-auth.js`),
    import(`https://www.gstatic.com/firebasejs/${V}/firebase-database.js`),
    import("./config.js"),
  ]);
  const app = initializeApp(firebaseConfig);
  const auth = A.getAuth(app);
  const db = D.getDatabase(app);
  const r = p => D.ref(db, p);

  window.Nube = {
    usuario: () => auth.currentUser,
    alCambiarSesion: fn => A.onAuthStateChanged(auth, fn),
    entrarDM: () => A.signInWithPopup(auth, new A.GoogleAuthProvider()),
    entrarAnonimo: async () => auth.currentUser || (await A.signInAnonymously(auth)).user,
    salir: () => A.signOut(auth),
    leer: async p => (await D.get(r(p))).val(),
    escribir: (p, v) => D.set(r(p), v),
    actualizar: (p, v) => D.update(r(p), v),
    agregar: async (p, v) => { const n = D.push(r(p)); await D.set(n, v); return n.key; },
    nuevaClave: p => D.push(r(p)).key,
    borrar: p => D.remove(r(p)),
    // Devuelve una función para dejar de escuchar
    escuchar: (p, fn) => D.onValue(r(p), s => fn(s.val()), e => fn(null, e)),
    // Solo el DM puede leer la lista de mesas (lo deciden las reglas de seguridad)
    esDM: async () => {
      try { await D.get(D.query(r("mesas"), D.limitToFirst(1))); return true; }
      catch { return false; }
    },
  };
  window.dispatchEvent(new Event("nube-lista"));
} catch (e) {
  console.warn("Modo local: no se pudo conectar con Firebase.", e);
  window.NubeError = e;
  window.dispatchEvent(new Event("nube-error"));
}
