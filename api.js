const BASE_URL = "https://rickandmortyapi.com/api/character";

async function fetchTodosPersonajes() {
  const container = document.getElementById("api-container");
  try {
    container.innerHTML = `<span class="loading">Consultando...</span>`;

    const response = await fetch(BASE_URL);
    if (!response.ok) {
      container.innerHTML = `<span class="error">HTTP error! status: ${response.status}</span>`;
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    mostrarPersonajes(data.results);
  } catch (error) {
    container.innerHTML = `<span class="error">Error al obtener los personajes: ${error}</span>`;
    console.error("Error fetching data:", error);
  }
}

async function fetchPersonajesFiltrados(event) {
  event.preventDefault();
  const container = document.getElementById("api-container");
  try {
    container.innerHTML = `<span class="loading">Consultando...</span>`;

    const name = document.getElementById("name").value;
    const status = document.getElementById("status").value;
    const species = document.getElementById("species").value;
    const type = document.getElementById("type").value;
    const gender = document.getElementById("gender").value;

    const params = new URLSearchParams();
    if (name) params.append("name", name);
    if (status) params.append("status", status);
    if (species) params.append("species", species);
    if (type) params.append("type", type);
    if (gender) params.append("gender", gender);

    const url = `${BASE_URL}?${params.toString()}`;
    const response = await fetch(url);

    // La API devuelve 404 cuando el filtro no encuentra personajes.
    // No es un error real, es un resultado vacío.
    if (response.status === 404) {
      container.innerHTML = `<span class="error">No se encontraron personajes con esos filtros.</span>`;
      return false;
    }

    if (!response.ok) {
      container.innerHTML = `<span class="error">HTTP error! status: ${response.status}</span>`;
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    mostrarPersonajes(data.results);
  } catch (error) {
    container.innerHTML = `<span class="error">Error al obtener los personajes filtrados: ${error}</span>`;
    console.error("Error fetching data:", error);
  }
  return false;
}

function mostrarPersonajes(personajes) {
  const container = document.getElementById("api-container");

  let html = `<div class="personajes-grid">`;
  personajes.forEach((p) => {
    html += `
            <div class="personaje-card">
                <img src="${p.image}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>Estado: ${p.status}</p>
                <p>Especie: ${p.species}</p>
                <p>Género: ${p.gender}</p>
            </div>
        `;
  });
  html += `</div>`;
  container.innerHTML = html;
}
