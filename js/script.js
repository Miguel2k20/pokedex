var form = document.getElementById('form')
var buttonPrevent = document.getElementById('buttonPrevent')
var buttonNext = document.getElementById('buttonNext')
var pokemonActual = 0

// constRenderPokemon(pokemonActual.toString())

form.addEventListener('submit', submitForm)
buttonPrevent.addEventListener('click', function () { updatePokemon(0); })
buttonNext.addEventListener('click', function () { updatePokemon(1); })

function submitForm(event) {
  event.preventDefault();

  const input = document.getElementById('inputName');
  constRenderPokemon(input.value);
  input.value = ""
}

function updatePokemon(params) {
  if (params === 1 && pokemonActual < 1025) {
    pokemonActual += 1;
  } else if (params === 0 && pokemonActual > 1) {
    pokemonActual -= 1;
  }

  constRenderPokemon(pokemonActual.toString());
}

async function fetchPokemon(paramns) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${paramns.toLowerCase()}`);
    if (!response.ok) {
      throw new Error('Pokemon não encontrado');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar o Pokémon:', error);
    return null;
  }
}

async function constRenderPokemon(paramns) {
  const pokemonNumber = document.getElementById('number');
  const pokemonName = document.getElementById('name');
  const pokemonPhoto = document.getElementById('pokemon-photo');

  pokemonNumber.innerHTML = "";
  pokemonPhoto.src = "./images/pokebolaGif.gif";
  pokemonName.innerHTML = "Procurando . . .";

  const data = await fetchPokemon(paramns);

  if (data) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = `${data.id} - `;
    pokemonPhoto.src = data.sprites.versions['generation-v']['black-white'].animated.front_default ?? data.sprites.front_default;
    pokemonActual = data.id
  } else {
    pokemonName.innerHTML = "Pokemon não encontrado :(";
    pokemonNumber.innerHTML = "";
    pokemonPhoto.src = "./images/pikachu2.webp";
    pokemonActual = 0
  }
}

function randomNumber(min, max) {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}
