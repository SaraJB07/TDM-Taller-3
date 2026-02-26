import { fetchPokemon } from "./services/api.js";
import { showPokemon } from "./ui/ui.js";

let allPokemon = [];
let filteredPokemon = [];
let currentIndex = 0;
let allTypes = new Set();

// Cargar los primeros 151 Pokémon y tipos
async function init() {
    for (let i = 1; i <= 151; i++) {
        const p = await fetchPokemon(i);
        if (p) {
            allPokemon.push(p);
            p.types.forEach(t => allTypes.add(t));
        }
    }
    filteredPokemon = [...allPokemon];
    fillTypeFilter();
    showCurrent();
}

function fillTypeFilter() {
    const select = document.getElementById("type-filter");
    select.innerHTML = '<option value="">Todos los tipos</option>';
    Array.from(allTypes).sort().forEach(type => {
        const opt = document.createElement("option");
        opt.value = type;
        opt.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        select.appendChild(opt);
    });
}

function showCurrent() {
    if (filteredPokemon.length === 0) return;
    const poke = filteredPokemon[currentIndex];
    showPokemon(poke);
}

document.getElementById("type-filter").addEventListener("change", e => {
    const type = e.target.value;
    if (!type) {
        filteredPokemon = [...allPokemon];
    } else {
        filteredPokemon = allPokemon.filter(p => p.types.includes(type));
    }
    currentIndex = 0;
    showCurrent();
});

document.getElementById("clear-filter").addEventListener("click", () => {
    document.getElementById("type-filter").value = "";
    filteredPokemon = [...allPokemon];
    currentIndex = 0;
    showCurrent();
});

// Navegación
document.querySelector("#next").addEventListener("click", () => {
    if (filteredPokemon.length === 0) return;
    currentIndex = (currentIndex + 1) % filteredPokemon.length;
    showCurrent();
});

document.querySelector("#prev").addEventListener("click", () => {
    if (filteredPokemon.length === 0) return;
    currentIndex = (currentIndex - 1 + filteredPokemon.length) % filteredPokemon.length;
    showCurrent();
});

// Inicial
init();