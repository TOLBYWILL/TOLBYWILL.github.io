// script.js
let playerPokemon;
let enemyPokemon;

const pokemons = {
    Pikachu: { health: 100, attack: 20 },
    Charmander: { health: 100, attack: 15 }
};

function selectPokemon(pokemon) {
    playerPokemon = { ...pokemons[pokemon] };
    enemyPokemon = { ...pokemons[Pikachu] }; // For simplicity, the enemy is always Pikachu

    document.getElementById('player-pokemon').innerText = `Your Pokémon: ${pokemon} (Health: ${playerPokemon.health})`;
    document.getElementById('enemy-pokemon').innerText = `Enemy Pokémon: Pikachu (Health: ${enemyPokemon.health})`;
    document.getElementById('attack-button').disabled = false;
}

function attack() {
    enemyPokemon.health -= playerPokemon.attack;
    document.getElementById('battle-log').innerText += `You attacked! Enemy health: ${enemyPokemon.health}\n`;

    if (enemyPokemon.health <= 0) {
        document.getElementById('battle-log').innerText += "You win!";
        document.getElementById('attack-button').disabled = true;
        return;
    }

    playerPokemon.health -= enemyPokemon.attack || 0; // Simple enemy attack
    document.getElementById('battle-log').innerText += `Enemy attacked! Your health: ${playerPokemon.health}\n`;

    if (playerPokemon.health <= 0) {
        document.getElementById('battle-log').innerText += "You lose!";
        document.getElementById('attack-button').disabled = true;
    }
}
