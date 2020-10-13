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
<button data-trainer-id="${trainer.id}">Add Pokemon</button>`

    const pokemonUl = document.createElement('ul')
    const pokemons = trainer.pokemons
    for(const pokemon of pokemons) {
        const pokemonLi = document.createElement('li')
        pokemonLi.innerHTML= `${pokemon.nickname} (${pokemon.species})<button class="release" data-pokemon-id='${pokemon.id}'>Release</button>`
        
    
        pokemonUl.append(pokemonLi)
        trainerCard.append(pokemonUl) 
        main.append(trainerCard) 
    }
    
//   <ul>
//     <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
//     <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
//     <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
//     <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
//     <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
//   </ul>
    
    
    
}
getTrainer()
})