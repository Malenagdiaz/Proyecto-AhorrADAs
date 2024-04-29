// ～✿Botones✿～
const balanceBtn = document.getElementById("balance-btn");
const categoriasBtn = document.getElementById("categorias-btn");
const reportesBtn = document.getElementById("reportes-btn");
const seccionB = document.getElementById("seccion-balance");
const seccionC = document.getElementById("seccion-categorias");
const seccionR = document.getElementById("seccion-reportes");

balanceBtn.addEventListener("click", () => {
  seccionB.classList.remove("hidden");
  seccionC.classList.add("hidden");
  seccionR.classList.add("hidden");
});

categoriasBtn.addEventListener("click", () => {
  seccionB.classList.add("hidden");
  seccionC.classList.remove("hidden");
  seccionR.classList.add("hidden");
});

reportesBtn.addEventListener("click", () => {
  seccionB.classList.add("hidden");
  seccionC.classList.add("hidden");
  seccionR.classList.remove("hidden");
});

// ～✿Menú Hamburguesa✿～
document.getElementById("abrir-menu").addEventListener("click", () => {
  document
    .getElementById("ventana-menu")
    .classList.remove("max-[980px]:hidden");
  document.getElementById("abrir-menu").classList.add("hidden");
  document.getElementById("cerrar-menu").classList.remove("hidden");
});

document.getElementById("cerrar-menu").addEventListener("click", () => {
  document.getElementById("ventana-menu").classList.add("max-[980px]:hidden");
  document.getElementById("abrir-menu").classList.remove("hidden");
  document.getElementById("cerrar-menu").classList.add("hidden");
});

// ～✿Filtros✿～

// Oculta y muestra los filtros
const filtrosBtn = document.getElementById("filtros-btn");
const filtros = document.getElementById("filtros");

filtrosBtn.addEventListener("click", () => {
  if (filtrosBtn.innerText === "Ocultar Filtros") {
    filtrosBtn.innerText = "Mostrar Filtros";
    filtros.style.display = "none";
  } else {
    filtrosBtn.innerText = "Ocultar Filtros";
    filtros.style.display = "block";
  }
});

// ～✿Categorias✿～

// categorias x defecto
const categorias = [
  {
    id: uuidv4(),
    name: "Comida",
  },
  {
    id: uuidv4(),
    name: "Servicios",
  },
  {
    id: uuidv4(),
    name: "Salidas",
  },
  {
    id: uuidv4(),
    name: "Educación",
  },
  {
    id: uuidv4(),
    name: "Trabajo",
  },
  {
    id: uuidv4(),
    name: "Transporte",
  },
];

// Agrega las nuevas categorías

const categoriasContenedor = document.getElementById("categorias-contenedor");
const categoriasInput = document.getElementById("categorias-input");
const btnAgregarCategoria = document.getElementById("Btn-agregar-categoria");

function crearCategoria(categoria) {
  const catElemento = document.createElement("div");
  catElemento.classList.add("flex", "justify-between", "mt-8", "items-center");

  catElemento.innerHTML = `
      <div>
        <span class="font-['Montserrat'] text-[#edfffa] text-lg bg-[#6a9cde] px-2 py-1 rounded-lg">${categoria.name}</span>
      </div>
      <div class="flex gap-3 items-center">
        <button class="editor-cat bg-[#6a9cde] px-3 py-1 rounded-lg"><i class="fa-solid fa-pencil text-xl text-[#edfffa] hover:text-[#005187] cursor-pointer"></i></button>
        <button class="borrar-cat bg-[#6a9cde] px-3 py-1 rounded-lg"><i class="fa-regular fa-trash-can text-xl text-[#edfffa] hover:text-[#005187] cursor-pointer"></i></button>
      </div>
    `;
  // Ventana modal para confirmar o cancelar la eliminación de la categoría
  const borrarCat = catElemento.querySelector(".borrar-cat");
  borrarCat.addEventListener("click", mostrarModal);

  function mostrarModal() {
    document.getElementById("modal").classList.remove("hidden");
    document.getElementById("cubierta-modal").classList.remove("hidden");

    const categoryId = catElemento.dataset.categoryId;

    document
      .getElementById("btn-eliminar-cat")
      .addEventListener("click", () => {
        const index = categorias.findIndex((cat) => cat.id === categoryId);
        categorias.splice(index, 1);
        catElemento.remove();

        ocultarModal();

        document
          .getElementById("btn-eliminar-cat")
          .removeEventListener("click", eliminarCategoria);
      });

    document
      .getElementById("btn-cancelar")
      .addEventListener("click", ocultarModal);
  }

  function ocultarModal() {
    document.getElementById("modal").classList.add("hidden");
    document.getElementById("cubierta-modal").classList.add("hidden");
  }

  function eliminarCategoria() {
    const index = categorias.findIndex((cat) => cat.id === categoria.id);
    categorias.splice(index, 1);
    catElemento.remove();
    ocultarModal();
  }

  document
    .getElementById("btn-cancelar")
    .addEventListener("click", ocultarModal);

  return catElemento;
}

function agregarCategoria() {
  const categoriaNueva = categoriasInput.value.trim();
  if (categoriaNueva !== "") {
    const catNueva = {
      id: uuidv4(),
      name: categoriaNueva,
    };
    categorias.push(catNueva);
    const nuevaCatElmto = crearCategoria(catNueva);
    categoriasContenedor.appendChild(nuevaCatElmto);
    categoriasInput.value = "";

    // Edita las categorias nuevas
    const btnEditor = nuevaCatElmto.querySelector(".editor-cat");
    btnEditor.addEventListener("click", editorCategorias);
  }
}

categorias.forEach((categoria) => {
  const categoriaElemento = crearCategoria(categoria);
  categoriasContenedor.appendChild(categoriaElemento);

  // Edita las categorias existentes
  const editorCat = categoriaElemento.querySelector(".editor-cat");
  editorCat.addEventListener("click", editorCategorias);
});

btnAgregarCategoria.addEventListener("click", agregarCategoria);

// Abre el editor de categorías
function editorCategorias() {
  document.querySelector(".editor-categorias").style.display = "block";
  document.getElementById("seccion-categorias").style.display = "none";
}

// Cierra el editor de categorías
document.querySelector(".cancelar-cat").addEventListener("click", () => {
  document.querySelector(".editor-categorias").style.display = "none";
  document.getElementById("seccion-categorias").style.display = "block";
});

// Muestra los nombres de las categorias en los filtros
const categoriasFiltros = document.getElementById("filtro-categoria");

categorias.forEach((categoria) => {
  categoriasFiltros.insertAdjacentHTML(
    "beforeend",
    `<option value="${categoria.name}">${categoria.name}</option>`
  );
});
