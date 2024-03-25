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

console.log(categorias);

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
        <button class="editor-cat bg-[#6a9cde] px-3 py-1 rounded-lg"><i class="fa-solid fa-pencil text-xl text-[#edfffa] hover:text-[#005187]"></i></button>
        <button class="borrar-cat bg-[#6a9cde] px-3 py-1 rounded-lg"><i class="fa-regular fa-trash-can text-xl text-[#edfffa] hover:text-[#005187]"></i></button>
      </div>
    `;
  // Elimina las categorías
  const borrarCat = catElemento.querySelector(".borrar-cat");
  borrarCat.addEventListener("click", () => {
    const index = categorias.findIndex((cat) => cat.id === categoria.id);
    categorias.splice(index, 1);
    catElemento.remove();
  });

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
