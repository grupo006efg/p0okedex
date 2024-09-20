// Selecionando os elementos HTML
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');
const pokemonInfo = document.getElementById('pokemon-info');

// Função para buscar o Pokémon pela PokéAPI
async function fetchPokemon(pokemon) {
  try {
    // Buscando os dados da API pelo nome ou número
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
    
    if (response.ok) {
      const data = await response.json();
      
      // Exibindo as informações do Pokémon
      displayPokemon(data);
    } else {
      pokemonInfo.innerHTML = `<p>Pokémon não encontrado. Tente novamente!</p>`;
    }
  } catch (error) {
    pokemonInfo.innerHTML = `<p>Ocorreu um erro ao buscar o Pokémon. Verifique sua conexão.</p>`;
  }
}

// Função para exibir as informações do Pokémon
function displayPokemon(data) {
  pokemonInfo.innerHTML = `
    <img src="${data.sprites.front_default}" alt="${data.name}">
    <h2>${data.name} (#${data.id})</h2>
    <p>Altura: ${(data.height / 10).toFixed(1)}m</p>
    <p>Peso: ${(data.weight / 10).toFixed(1)}kg</p>
    <p>Tipo: ${data.types.map(type => type.type.name).join(', ')}</p>
  `;
}

// Adicionando evento de clique no botão de busca
searchBtn.addEventListener('click', () => {
  const pokemon = searchInput.value.trim();
  
  if (pokemon) {
    fetchPokemon(pokemon);
  } else {
    pokemonInfo.innerHTML = `<p>Por favor, insira um nome ou número de Pokémon.</p>`;
  }
});
