//Nueva Operación
document.addEventListener("DOMContentLoaded", function() {
  const nuevaOperacionBtn = document.getElementById("nueva-operacion-btn");
  const ventanaOperacion = document.getElementById("nueva-operacion-ventana");
  const cerrarVentanaBtn = document.getElementById("cerrar-ventana-btn");
  const nuevaOperacionForm = document.getElementById("nueva-operacion-form");

  nuevaOperacionBtn.addEventListener("click", function() {
    ventanaOperacion.classList.remove("hidden");
  });

  cerrarVentanaBtn.addEventListener("click", function() {
    ventanaOperacion.classList.add("hidden");
  });

  nuevaOperacionForm.addEventListener("submit", function(event) {
    event.preventDefault();