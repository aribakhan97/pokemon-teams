document.addEventListener("DOMContentLoaded", () => {
  const BASE_URL = "http://localhost:3000"
  const TRAINERS_URL = `${BASE_URL}/trainers/`
  const POKEMONS_URL = `${BASE_URL}/pokemons/`

  const getTrainer = () =>{
  fetch(TRAINERS_URL) 
  .then(response => response.json())
  .then(trainers => {
      for(const trainer of trainers){
          buildCard(trainer)
      }
      })
  }

  const buildCard = (trainer) => {
      const main = document.querySelector('main')
      const trainerCard = document.createElement('div')
      trainerCard.classList.add('card')
      trainerCard.dataset.trainerId = trainer.id
      trainerCard.innerHTML = `
        <p> ${trainer.name} </p>
        <button data-trainer-id="${trainer.id}">Add Pokemon</button>
      `

      const pokemonUl = document.createElement('ul')
      const pokemons = trainer.pokemons
      for(const pokemon of pokemons) {
          const pokemonLi = document.createElement('li')
          pokemonLi.innerHTML= `${pokemon.nickname} (${pokemon.species})<button class="release" data-pokemon-id='${pokemon.id}'>Release</button>`
          
      
          pokemonUl.append(pokemonLi)
          trainerCard.append(pokemonUl) 
          main.append(trainerCard) 
      }
  }

  const clickListener = () => {
    const main = document.querySelector('main')
    main.addEventListener('click', e => {

      if(e.target.matches('.release')) {
        const pokemonLi = e.target.parentElement
        const pokemonId = e.target.dataset.pokemonId

        deletePokemon(pokemonId)
        pokemonLi.remove()
      } else if(e.target.textContent === 'Add Pokemon') {
        const trainerId = e.target.dataset.trainerId

        addPokemon(trainerId)
      }
    })
  }

  const deletePokemon = pokemonId => {
    const options = {
      method: "DELETE"
    }
    fetch(POKEMONS_URL + pokemonId, options)
      .then(console.log)
  }

  const addPokemon = trainerId => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({trainer_id: trainerId})
    }
    

    fetch(POKEMONS_URL, options)
      .then(response => response.json())
      .then(pokemon => addPokemonLi(pokemon))
      // .catch(error => console.log(error))
  }

  const addPokemonLi = pokemon => {
    const pokemonLi = document.createElement('li')
    const trainerCard = document.querySelector(`[data-trainer-id="${pokemon.trainer_id}"]`)
    const pokemonUl = trainerCard.querySelector('ul')

    pokemonLi.innerHTML= `
      ${pokemon.nickname} (${pokemon.species})
      <button class="release" data-pokemon-id='${pokemon.id}'>Release</button>
    `
    pokemonUl.append(pokemonLi)
  }
  



  getTrainer()
  clickListener()

})