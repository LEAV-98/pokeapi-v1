//Variables
const max = 300,
  min = 1; // 1-300
let random = Math.random() * (max - min + 1) + min;
let numero = Math.round(random);
const contenedor = document.querySelector(".main__contenedor");
let pokemonObj = {
  id: "",
  nombre: "",
  img: "",
  hp: "",
  ataque: "",
  defensa: "",
  ataque_especial: "",
  defensa_especial: "",
  velocidad: "",
  tipos: [],
};

app();

function app() {
  obtenerPokemon(numero);
}
function obtenerPokemon(numero) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`).then((respuesta) => {
    respuesta.json().then((pokemon) => {
      const { id, name } = pokemon;
      pokemonObj.id = id;
      pokemonObj.nombre = name;
      pokemonObj.img = pokemon.sprites.front_default;
      pokemonObj.tipos = pokemon.types;
      pokemon.stats.forEach((stat) => {
        const { base_stat } = stat;
        switch (stat.stat.name) {
          case "hp":
            pokemonObj.hp = base_stat;
            break;
          case "attack":
            pokemonObj.ataque = base_stat;
            break;
          case "defense":
            pokemonObj.defensa = base_stat;
            break;
          case "special-attack":
            pokemonObj.ataque_especial = base_stat;
            break;
          case "special-defense":
            pokemonObj.defensa_especial = base_stat;
            break;
          case "speed":
            pokemonObj.velocidad = base_stat;
        }
      });
      // console.log(pokemonObj)
      crearHTML();
    });
  });
}
function crearHTML() {
  const {
    nombre,
    img,
    hp,
    ataque,
    defensa,
    ataque_especial,
    defensa_especial,
    velocidad,
  } = pokemonObj;
  const button = document.createElement("BUTTON");
  button.textContent = "Random";
  button.onclick = function () {
    random = Math.random() * (max - min + 1) + min;
    numero = Math.round(random);
    limpiarHTML();

    obtenerPokemon(numero);
  };
  const contImg = document.createElement("DIV");
  const contTipo = document.createElement("DIV");
  const imagen = document.createElement("IMG");
  const contText = document.createElement("DIV");
  const pNombre = document.createElement("P");
  const pHp = document.createElement("p");
  const pAtaque = document.createElement("p");
  const pDefensa = document.createElement("p");
  const pAEspecial = document.createElement("p");
  const pDEspecial = document.createElement("p");
  const pVelocidad = document.createElement("p");
  imagen.src = pokemonObj.img;

  contImg.classList.add("contenedor-img");
  contText.classList.add("contenedor-text");
  contTipo.classList.add('contenedor-tipos')

  pNombre.textContent = `Nombre: ${nombre} `;
  pHp.textContent = `Hp: ${hp}`;
  pAtaque.textContent = `Ataque: ${ataque}`;
  pDefensa.textContent = `Defensa: ${defensa}`;
  pAEspecial.textContent = `Ataque Especial: ${ataque_especial}`;
  pDEspecial.textContent = `Defensa Especial: ${defensa_especial}`;
  pVelocidad.textContent = `Velocidad: ${velocidad}`;

  pokemonObj.tipos.forEach((tipo) => {
    console.log(tipo.type.name);
    const ptipo = document.createElement("P");
    ptipo.classList.add("card-tipo");
    switch (tipo.type.name) {
      case "bug":
        ptipo.classList.add("bicho");
        ptipo.textContent = "bicho";
        break;
      case "steel":
        ptipo.classList.add("acero");
        ptipo.textContent = "acero";
        break;
      case "grass":
        ptipo.classList.add("planta");
        ptipo.textContent = "planta";
        break;
      case "poison":
        ptipo.classList.add("veneno");
        ptipo.textContent = "veneno";
        break;
      case "normal":
        ptipo.classList.add("normal");
        ptipo.textContent = "normal";
        break;
      case "psychic":
        ptipo.classList.add("psiquico");
        ptipo.textContent = "psiquico";
        break;
      case "fire":
        ptipo.classList.add("fuego");
        ptipo.textContent = "fuego";
        break;
      case "water":
        ptipo.classList.add("agua");
        ptipo.textContent = "agua";
        break;
      case "ground":
        ptipo.classList.add("tierra");
        ptipo.textContent = "tierra";
        break;
      case "rock":
        ptipo.classList.add("roca");
        ptipo.textContent = "roca";
        break;
      case "dark":
        ptipo.classList.add("siniestro");
        ptipo.textContent = "siniestro";
        break;
      case "fairy":
        ptipo.classList.add("hada");
        ptipo.textContent = "hada";
        break;
      case "electric":
        ptipo.classList.add("electrico");
        ptipo.textContent = "electrico";
        break;
      case "fighting":
        ptipo.classList.add("lucha");
        ptipo.textContent = "lucha";
        break;
      case "dragon":
        ptipo.classList.add("dragon");
        ptipo.textContent = "dragon";
        break;
      case "flying":
        ptipo.classList.add("volador");
        ptipo.textContent = "volador";
    }
    contTipo.appendChild(ptipo);
  });

  contImg.appendChild(imagen);
  contText.appendChild(contTipo);
  contText.appendChild(pNombre);
  contText.appendChild(pHp);
  contText.appendChild(pAtaque);
  contText.appendChild(pDefensa);
  contText.appendChild(pAEspecial);
  contText.appendChild(pDEspecial);
  contText.appendChild(pVelocidad);
  contenedor.appendChild(contImg);
  contenedor.appendChild(contText);
  contenedor.appendChild(button);
}

function limpiarHTML() {
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }
}
