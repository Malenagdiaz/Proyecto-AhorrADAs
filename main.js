// ～✿Botones✿～
const balanceBtn = document.getElementById("balance-btn");
const categoriasBtn = document.getElementById("categorias-btn");
const reportesBtn = document.getElementById("reportes-btn");
const seccionB = document.getElementById("seccion-balance");
const seccionC = document.getElementById("seccion-categorias");
const seccionR = document.getElementById("seccion-reportes");

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
