import "./style.css";
import type { Gif } from "./models/gif.interface";

const MEDIA_URL = "https://media.giphy.com/media";
const gifs: Gif[] = [
  {
    id: "cat-01",
    title: "Gato programando",
    // MEDIA_URL evita repetir la parte común de las direcciones.
    // Cada objeto completa la URL mediante una template string.
    url: `${MEDIA_URL}/JIX9t2j0ZTN9S/giphy.gif`,
    username: "gifinder",
    tags: ["gato", "programación", "computadora"],
    rating: "g",
  },
  {
    id: "celebration-01",
    title: "Celebración del equipo",
    url: `${MEDIA_URL}/g9582DNuQppxC/giphy.gif`,
    tags: ["equipo", "éxito", "celebración"],
    rating: "g",
  },
  {
    id: "coding-01",
    title: "Código en progreso",
    url: `${MEDIA_URL}/13HgwGsXF0aiGY/giphy.gif`,
    username: "developer",
    tags: ["código", "desarrollo", "teclado"],
    rating: "pg",
  },
  {
    id: "idea-01",
    title: "Nueva idea",
    url: `${MEDIA_URL}/l0HlRnAWXxn0MhKLK/giphy.gif`,
    tags: ["idea", "creatividad", "solución"],
    rating: "g",
  },
];

gifs.forEach((gif, index) => {
  console.log(`${index + 1}. ${gif.title}`);
});

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) {
  throw new Error("No se encontró el elemento #app.");
}

app.innerHTML = `
    <main class="app-shell">
        <header class="hero">
            <p class="eyebrow">EC1 - Fundamentos de TypeScript</p>
            <h1>GIFinder</h1>
            <p>Explora una colección local de GIFs.</p>
        </header>
        <form id="search-form" class="search-form">
            <label for="search-input">Buscar por título, autor o etiqueta</label>
            <div class="search-row">
                <input id="search-input" name="query" type="search" placeholder="Ejemplo: gato" autocomplete="off" />
                <button type="submit">Buscar</button>
            </div>
        </form>
        <p id="search-status" class="status" aria-live="polite"></p>
        <section id="gif-gallery" class="gallery" aria-label="Resultados"></section>
    </main>
`;

// --- PASO 8: SELECCIONAR Y VALIDAR LOS ELEMENTOS ---
const form = document.querySelector<HTMLFormElement>("#search-form");
const input = document.querySelector<HTMLInputElement>("#search-input");
const gallery = document.querySelector<HTMLElement>("#gif-gallery");
const status = document.querySelector<HTMLParagraphElement>("#search-status");

if (!form || !input || !gallery || !status) {
  throw new Error("No se pudo inicializar la interfaz de búsqueda.");
}

// --- PASO 9: NORMALIZAR EL TEXTO ---
// Quita espacios en blanco y convierte todo a minúsculas
function normalizeText(value: string): string {
  return value.trim().toLocaleLowerCase("es-MX");
}

// --- PASO 10: COMPROBAR SI UN GIF COINCIDE ---
function matchesQuery(gif: Gif, query: string): boolean {
  const searchableText = [
    gif.title,
    gif.username ?? "", // Si no hay username, pone texto vacío
    gif.description ?? "", // ¡PUNTO 4 DEL DESAFÍO! Agregamos la descripción a la búsqueda
    ...gif.tags, // Separa el arreglo de tags
  ].join(" "); // Une todo en un solo texto gigante

  return normalizeText(searchableText).includes(query);
}

// --- PASO 11: FILTRAR LA COLECCIÓN ---
function searchGifs(collection: Gif[], value: string): Gif[] {
  const query = normalizeText(value);
  if (!query) {
    return [...collection];
  }
  return collection.filter((gif) => matchesQuery(gif, query));
}

// --- PASO 12: TRANSFORMAR UN OBJETO EN TARJETA HTML ---
function createGifCard(gif: Gif): string {
  const {
    title,
    url,
    username = "Autor no disponible",
    tags,
    rating,
    description = "Sin descripción", // ¡PUNTO 3 DEL DESAFÍO! Valor por defecto
  } = gif;

  return `
        <article class="gif-card">
            <img src="${url}" alt="${title}" loading="lazy" />
            <div class="gif-card_content">
                <h2>${title}</h2>
                <p>${username} - Clasificación ${rating.toUpperCase()}</p>
                <p><em>${description}</em></p> <!-- ¡PUNTO 3 DEL DESAFÍO! Mostramos la descripción -->
                <p class="tags">
                    ${tags.map((tag) => `#${tag}`).join(" ")}
                </p>
            </div>
        </article>
    `;
}

// --- PASO 13: RENDERIZAR LA COLECCIÓN ---
function renderGifs(collection: Gif[]): void {
    const total = collection.length;
    const label = total === 1 ? 'resultado' : 'resultados';
    status!.textContent = `${total} ${label}`;
    if (total === 0) {
        gallery!.innerHTML = `
            <p class="empty-state">
                No se encontraron GIFs. Prueba con otra palabra.
            </p>
        `;
        return;
    }
    gallery!.innerHTML = collection.map(createGifCard).join('');
}

// --- PASO 14: CONECTAR EL FORMULARIO ---
form.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault(); // Evita que la página se recargue
  const results = searchGifs(gifs, input.value);
  renderGifs(results);
});

input.addEventListener("input", () => {
  if (input.value.trim() === "") {
    renderGifs(gifs); // Si el usuario borra todo, regresan todos los GIFs
  }
});

// --- PASO 15: APLICAR FIND Y MOSTRAR LA GALERÍA INICIAL ---
const firstSafeGif = gifs.find((gif) => gif.rating === "g");
console.log(`Primer GIF clasificación G: ${firstSafeGif?.title ?? "Ninguno"}`);

// ¡Esta es la línea que dibuja las tarjetas al abrir la app!
renderGifs(gifs);
