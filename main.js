// ～✿Botones✿～
const balanceBtn = document.getElementById("balance-btn");
const categoriasBtn = document.getElementById("categorias-btn");
const reportesBtn = document.getElementById("reportes-btn");
const seccionB = document.getElementById("seccion-balance");
const seccionC = document.getElementById("seccion-categorias");
const seccionR = document.getElementById("seccion-reportes");
const filtrosBtn = document.getElementById("filtros-btn");
const filtros = document.getElementById("filtros");

balanceBtn.addEventListener("click", () => {
  seccionB.style.display = "block";
  seccionC.style.display = "none";
  seccionR.style.display = "none";
});

categoriasBtn.addEventListener("click", () => {
  seccionB.style.display = "none";
  seccionC.style.display = "block";
  seccionR.style.display = "none";
});

reportesBtn.addEventListener("click", () => {
  seccionB.style.display = "none";
  seccionC.style.display = "none";
  seccionR.style.display = "block";
});

// ～✿Categorías✿～
let categorias = JSON.parse(localStorage.getItem("categorias")) || [
  { id: uuidv4(), name: "Comida" },
  { id: uuidv4(), name: "Servicios" },
  { id: uuidv4(), name: "Salidas" },
  { id: uuidv4(), name: "Educación" },
  { id: uuidv4(), name: "Trabajo" },
  { id: uuidv4(), name: "Transporte" },
];

// ⋆⭒˚.⋆ Se guardan las categorías en el LOCALSTORAGE ⋆⭒˚.⋆
function guardarCategorias() {
  localStorage.setItem("categorias", JSON.stringify(categorias));
}

// ⋆⭒˚.⋆ Crea nueva categoría ⋆⭒˚.⋆
function crearCategoria(categoria) {
  const catElemento = document.createElement("div");
  catElemento.classList.add("flex", "justify-between", "mt-8", "items-center");
  catElemento.dataset.categoryId = categoria.id;

  catElemento.innerHTML = `
    <div>
      <span class="font-['Montserrat'] text-[#edfffa] text-lg bg-[#6a9cde] px-2 py-1 rounded-lg">${categoria.name}</span>
    </div>
    <div class="flex gap-3 items-center">
      <button class="editor-cat bg-[#6a9cde] px-3 py-1 rounded-lg">
        <i class="fa-solid fa-pencil text-xl text-[#edfffa] hover:text-[#005187] cursor-pointer"></i>
      </button>
      <button class="borrar-cat bg-[#6a9cde] px-3 py-1 rounded-lg">
        <i class="fa-regular fa-trash-can text-xl text-[#edfffa] hover:text-[#005187] cursor-pointer"></i>
      </button>
    </div>
  `;

  catElemento
    .querySelector(".borrar-cat")
    .addEventListener("click", () => mostrarModal(categoria.id));
  catElemento
    .querySelector(".editor-cat")
    .addEventListener("click", () => abrirEditor(categoria));

  return catElemento;
}

// ⋆⭒˚.⋆ Agrega la nueva categoría ⋆⭒˚.⋆
function agregarCategoria() {
  const categoriaNueva = document
    .getElementById("categorias-input")
    .value.trim();
  if (categoriaNueva) {
    const nuevaCategoria = { id: uuidv4(), name: categoriaNueva };
    categorias.push(nuevaCategoria);
    categoriasContenedor.appendChild(crearCategoria(nuevaCategoria));
    document.getElementById("categorias-input").value = "";
    guardarCategorias();
    actualizarFiltros();
  }
}

// ⋆⭒˚.⋆ Elimina ⋆⭒˚.⋆
function eliminarCategoria(categoriaId) {
  categorias = categorias.filter((categoria) => categoria.id !== categoriaId);
  guardarCategorias();
  actualizarCategorias();
  ocultarModal();
}

// ⋆⭒˚.⋆ Edita ⋆⭒˚.⋆
function abrirEditor(categoria) {
  document.querySelector(".editor-categorias").style.display = "block";
  document.getElementById("seccion-categorias").style.display = "none";
  document.getElementById("input-categoria").value = categoria.name;

  document.querySelector(".editar-la-cat").addEventListener("click", () => {
    categoria.name = document.getElementById("input-categoria").value.trim();
    guardarCategorias();
    actualizarCategorias();
    cerrarEditor();
  });

  document
    .querySelector(".cancelar-cat")
    .addEventListener("click", cerrarEditor);
}

function cerrarEditor() {
  document.querySelector(".editor-categorias").style.display = "none";
  document.getElementById("seccion-categorias").style.display = "block";
}

// ⋆⭒˚.⋆ Actualiza las categorías ⋆⭒˚.⋆
function actualizarCategorias() {
  categoriasContenedor.innerHTML = "";
  categorias.forEach((categoria) =>
    categoriasContenedor.appendChild(crearCategoria(categoria))
  );
  actualizarFiltros();
}

// ⋆⭒˚.⋆ Modal para eliminar la categoría ⋆⭒˚.⋆
function mostrarModal(categoriaId) {
  document.getElementById("modal").classList.remove("hidden");
  document.getElementById("cubierta-modal").classList.remove("hidden");
  document
    .getElementById("btn-eliminar-cat")
    .addEventListener("click", () => eliminarCategoria(categoriaId));
}

function ocultarModal() {
  document.getElementById("modal").classList.add("hidden");
  document.getElementById("cubierta-modal").classList.add("hidden");
}

document.getElementById("btn-cancelar").addEventListener("click", ocultarModal);

// ⋆⭒˚.⋆ Sección filtros ⋆⭒˚.⋆

const categoriasContenedor = document.getElementById("categorias-contenedor");
const btnAgregarCategoria = document.getElementById("Btn-agregar-categoria");
const categoriasFiltros = document.getElementById("filtro-categoria");

// ⋆⭒˚.⋆ Categorías en el filtro ⋆⭒˚.⋆
function actualizarFiltros() {
  categoriasFiltros.innerHTML = "";
  categorias.forEach((categoria) => {
    categoriasFiltros.insertAdjacentHTML(
      "beforeend",
      `<option value="${categoria.name}">${categoria.name}</option>`
    );
  });
}

categorias.forEach((categoria) =>
  categoriasContenedor.appendChild(crearCategoria(categoria))
);
btnAgregarCategoria.addEventListener("click", agregarCategoria);
actualizarFiltros();

filtrosBtn.addEventListener("click", () => {
  if (filtrosBtn.innerText === "Ocultar Filtros") {
    filtrosBtn.innerText = "Mostrar Filtros";
    filtros.style.display = "none";
  } else {
    filtrosBtn.innerText = "Ocultar Filtros";
    filtros.style.display = "block";
  }
});

// ～✿Nuevas Operaciones✿～
const seccionBalance = document.getElementById("seccion-balance");
const seccionOperacion = document.querySelector(".seccion-operacion");
const divOp = document.querySelector(".div-op");
const sinResultados = document.querySelector(".sinResultados");

let operaciones = JSON.parse(localStorage.getItem("operaciones")) || [];
let operacionEditando = null;

function formatearFecha(fecha) {
  const fechaObj = new Date(fecha);
  let dia = fechaObj.getDate();
  let mes = fechaObj.getMonth() + 1;
  const año = fechaObj.getFullYear();

  if (dia < 10) dia = "0" + dia;
  if (mes < 10) mes = "0" + mes;

  return `${dia}/${mes}/${año}`;
}

function cargarOperacionesDesdeLocalStorage() {
  console.log("Operaciones cargadas desde localStorage:", operaciones);
  mostrarOperaciones();
}

function guardarOperacionesEnLocalStorage() {
  localStorage.setItem("operaciones", JSON.stringify(operaciones));
}

function toggleSecciones() {
  seccionBalance.classList.toggle("hidden");
  seccionOperacion.classList.toggle("hidden");
}

function agregarOperacion() {
  const descripcion = document.getElementById("descripcion-operacion").value;
  const monto = parseFloat(document.getElementById("monto").value);
  const tipo = document.getElementById("tipo-operacion").value;
  const categoria = document.getElementById("cat-operacionCat").value;
  const fecha = document.getElementById("fecha").value;

  if (!descripcion || !categoria || !fecha || monto <= 0) return;

  const operacion = { descripcion, monto, tipo, categoria, fecha };

  if (operacionEditando === null) {
    operaciones.push(operacion);
  } else {
    operaciones[operacionEditando] = operacion;
    operacionEditando = null;
  }

  guardarOperacionesEnLocalStorage();
  actualizarBalance();
  mostrarOperaciones();
  limpiarFormulario();
  toggleSecciones();
}

function limpiarFormulario() {
  document.getElementById("descripcion-operacion").value = "";
  document.getElementById("monto").value = "";
  document.getElementById("tipo-operacion").value = "Ganancia";
  document.getElementById("cat-operacionCat").value = "";
  document.getElementById("fecha").value = "";
}

function actualizarBalance() {
  let ganancias = 0,
    gastos = 0;

  operaciones.forEach(({ monto, tipo }) => {
    tipo === "Ganancia" ? (ganancias += monto) : (gastos += monto);
  });

  document.querySelector(".monto").textContent = `+$${ganancias}`;
  document.querySelector(".gastos").textContent = `-$${gastos}`;
  document.querySelector(".total").textContent = `$${ganancias - gastos}`;
}

function mostrarOperaciones() {
  const contenedorOperaciones = document.getElementById("operaciones");
  contenedorOperaciones.innerHTML = "";

  if (operaciones.length === 0) {
    sinResultados.classList.remove("hidden");
    divOp.classList.add("hidden");
  } else {
    sinResultados.classList.add("hidden");

    operaciones.forEach((operacion, index) => {
      contenedorOperaciones.innerHTML += `
    <div class="w-[100%] flex justify-between items-center text-[#edfffa] bg-[#6a9cde] p-4 rounded-lg mb-4"> <!-- Aquí se añadió mb-4 para el margin-bottom -->
      <div class="flex justify-between items-center w-full p-2">
        <p class="w-1/4 font-['Montserrat']">${operacion.descripcion}</p>
        <p class="w-1/4 font-['Montserrat']">${operacion.categoria}</p>
        <p class="w-1/5 font-['Montserrat']">${formatearFecha(
          operacion.fecha
        )}</p>
        <p class="w-1/5 font-['Montserrat']">${
          operacion.tipo === "Ganancia" ? "+" : "-"
        }$${operacion.monto}</p>
      </div>
      <div class="flex flex-row items-center space-x-2"> 
        <button class="btn-editar font-['Montserrat']" onclick="editarOperacion(${index})">Editar</button>
        <button class="btn-eliminar font-['Montserrat']" onclick="eliminarOperacion(${index})">Eliminar</button>
      </div>
    </div>
  `;
    });

    divOp.classList.remove("hidden");
  }
}

function eliminarOperacion(index) {
  operaciones.splice(index, 1);
  guardarOperacionesEnLocalStorage();
  actualizarBalance();
  mostrarOperaciones();
  if (operaciones.length === 0) divOp.classList.add("hidden");
}

function editarOperacion(index) {
  const operacion = operaciones[index];
  operacionEditando = index;

  document.getElementById("descripcion-operacion").value =
    operacion.descripcion;
  document.getElementById("monto").value = operacion.monto;
  document.getElementById("tipo-operacion").value = operacion.tipo;
  document.getElementById("cat-operacionCat").value = operacion.categoria;
  document.getElementById("fecha").value = operacion.fecha;

  toggleSecciones();
}

cargarOperacionesDesdeLocalStorage();

document
  .querySelector(".btn-operacion")
  .addEventListener("click", toggleSecciones);
document
  .querySelector(".btn-agregarOp")
  .addEventListener("click", agregarOperacion);
document
  .querySelector(".btn-cancelarOp")
  .addEventListener("click", toggleSecciones);
