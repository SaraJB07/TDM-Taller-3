const modal = document.getElementById("pokemon-modal");
const pokimganeimg = document.getElementById("pokemon-img");
const cerrarModal = document.getElementById("close-modal");

export function showPokemon(pokemon) {
    if (!pokemon) return;

    // Cambiar fondo del body según el primer tipo
    const body = document.body;
    body.className = 'bg-type'; // Quitar clases previas
    let mainType = null;
    if (pokemon.types && pokemon.types.length > 0) {
        mainType = pokemon.types[0];
        body.classList.add('bg-' + mainType);
    }

    // Cambiar color de botones según el tipo principal
    const btns = [
        document.getElementById('prev'),
        document.getElementById('next'),
        document.getElementById('type-filter'),
        document.getElementById('clear-filter')
    ];
    btns.forEach(btn => {
        if (btn && mainType) {
            btn.classList.remove(
                ...Array.from(btn.classList).filter(c => c.startsWith('btn-type-'))
            );
            btn.classList.add('btn-type-' + mainType);
        }
    });

    const card = document.querySelector('.card');
    card.classList.add('fade-out');

    setTimeout(() => {
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

        card.classList.remove('fade-out');
        card.classList.add('fade-in');

        setTimeout(() => {
            card.classList.remove('fade-in');
            // Mostrar efecto de escáner
            showScannerEffect(card);
        }, 300);
    }, 300);
}

// Efecto de escáner visual
function showScannerEffect(cardElement) {
    // Eliminar si ya existe
    const oldScanner = cardElement.querySelector('.scanner-line');
    if (oldScanner) oldScanner.remove();
    // Crear línea
    const scanner = document.createElement('div');
    scanner.className = 'scanner-line';
    cardElement.appendChild(scanner);
    // Eliminar después de la animación
    scanner.addEventListener('animationend', () => {
        scanner.remove();
    });
}

export function showModal(pokemon) {
    if (!pokemon) return;

   modal.style.display = "block";

    document.getElementById("modal-img").src = pokemon.sprite;
    document.getElementById("modal-name").textContent = capitalize(pokemon.name);
    document.getElementById("modal-id").textContent = "#" + pokemon.id.toString().padStart(3, "0");


    const mainType = pokemon.types && pokemon.types.length > 0 ? pokemon.types[0] : "normal";
    const heightElem = document.getElementById("modal-height");
    const weightElem = document.getElementById("modal-weight");
    const abilitiesElem = document.getElementById("modal-abilities");

    // Limpiar clases previas
    heightElem.className = "attr-box";
    weightElem.className = "attr-box";
    abilitiesElem.className = "attr-box";
    if(mainType) {
        heightElem.classList.add("border-type-" + mainType);
        weightElem.classList.add("border-type-" + mainType);
        abilitiesElem.classList.add("border-type-" + mainType);
    }

    heightElem.textContent = (pokemon.height / 10) + ' m';
    weightElem.textContent = (pokemon.weight / 10) + ' kg';
    abilitiesElem.textContent = pokemon.abilities.join(", ");

    const statsDiv = document.getElementById("modal-stats");
    statsDiv.innerHTML = "<h3>Estadísticas</h3>";
    pokemon.stats.forEach(s => {
        const statContainer = document.createElement("div");
        statContainer.className = "stat-row";

        const label = document.createElement("span");
        label.className = "stat-label";
        label.textContent = capitalize(s.stat);
        if (mainType) {
            label.classList.add('bg-type-' + mainType);
        }

        // Barra de estado visual
        const barWrapper = document.createElement("div");
        barWrapper.className = "stat-bar-wrapper";

        const bar = document.createElement("div");
        bar.className = "stat-bar";
        // Normalizar el valor de la barra (asumiendo 255 como máximo base stat)
        const percent = Math.min(100, Math.round((s.base / 255) * 100));
        bar.style.width = percent + "%";
        bar.textContent = s.base;

        barWrapper.appendChild(bar);
        statContainer.appendChild(label);
        statContainer.appendChild(barWrapper);
        statsDiv.appendChild(statContainer);
    });
}
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);

}


    
cerrarModal.addEventListener("click", () => {        
    modal.style.display = "none";
});