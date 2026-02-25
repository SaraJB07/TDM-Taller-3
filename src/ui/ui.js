const modal = document.getElementById("pokemon-modal");
const pokimganeimg = document.getElementById("pokemon-img");
const cerrarModal = document.getElementById("close-modal");

export function showPokemon(pokemon) {
    if (!pokemon) return;

    // Datos del Pokémon
    document.getElementById("pokemon-img").src = pokemon.sprite;
    document.getElementById("pokemon-name").textContent = capitalize(pokemon.name);
    document.getElementById("pokemon-id").textContent = "#" + pokemon.id.toString().padStart(3, "0");

    // Tipos
    const typesDiv = document.querySelector(".types");
    typesDiv.innerHTML = "";
    pokemon.types.forEach(t => {
        const span = document.createElement("span");
        span.classList.add("type", t);
        span.textContent = capitalize(t);
        typesDiv.appendChild(span);

    });

    document.querySelector("#pokemon-img").onclick = () => showModal(pokemon);
}

export function showModal(pokemon) {
    if (!pokemon) return;

   modal.style.display = "block";

    document.getElementById("modal-img").src = pokemon.sprite;
    document.getElementById("modal-name").textContent = capitalize(pokemon.name);
    document.getElementById("modal-id").textContent = "#" + pokemon.id.toString().padStart(3, "0");

   const heightSpan = (pokemon.height / 10);
    const weightSpan = (pokemon.weight / 10);

    document.getElementById("modal-height").textContent = heightSpan;
    document.getElementById("modal-weight").textContent = weightSpan;

    document.getElementById("modal-abilities").textContent = pokemon.abilities.join(", ");

    const statsDiv = document.getElementById("modal-stats");
    statsDiv.innerHTML = "<h3>Estadisticas</h3>";
    pokemon.stats.forEach(s => {
        const span = document.createElement("span");
        span.innerHTML = `<strong>${capitalize(s.stat)}:</strong> ${s.base}`;
        statsDiv.appendChild(span);
    });
}
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);

}


    
cerrarModal.addEventListener("click", () => {        
    modal.style.display = "none";
});