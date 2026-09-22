import './style.css';
import type { Gif } from './models/gif.interface';
import { clearGifDetail, renderGifDetail } from './components/gif-detail';
import { renderGallery } from './components/gallery';
import { renderStatus } from './components/status';
import { RequestStatus } from './models/request-status.enum';
import { getTrendingGifs, searchGifsFromApi } from './services/gif.service';

// Variable de estado para almacenar los datos que llegan de internet
let currentGifs: Gif[] = [];

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('No se encontró el elemento #app.');
}

app.innerHTML = `
  <main class="app-shell">
    <header class="hero">
      <p class="eyebrow">EC1 - Consumo de GIPHY API</p>
      <h1>GIFinder</h1>
      <p>Explora contenido real desde internet.</p>
    </header>
    
    <form id="search-form" class="search-form">
      <label for="search-input">Buscar por título, autor o etiqueta</label>
      <div class="search-row">
        <input
          id="search-input"
          name="query"
          type="search"
          placeholder="Ejemplo: gato"
          autocomplete="off"
        />
        <button type="submit">Buscar</button>
      </div>
    </form>
    
    <p id="search-status" class="status" role="status" aria-live="polite"></p>
    
    <section id="gif-gallery" class="gallery" aria-label="Resultados"></section>
    
    <aside id="gif-detail" class="gif-detail-container" aria-live="polite"></aside>

    <footer class="giphy-attribution">
        <img src="/powered-by-giphy.png" alt="Powered by GIPHY" />
    </footer>
  </main>
`;

const form = document.querySelector<HTMLFormElement>('#search-form');
const input = document.querySelector<HTMLInputElement>('#search-input');
const gallery = document.querySelector<HTMLElement>('#gif-gallery');
const status = document.querySelector<HTMLParagraphElement>('#search-status');
const detailContainer = document.querySelector<HTMLElement>('#gif-detail');

if (!form || !input || !gallery || !status || !detailContainer) {
  throw new Error('No se pudo inicializar la interfaz.');
}

// Funciones de apoyo para manejar la UI
const showResults = (results: Gif[])=> {
  currentGifs = results;
  renderGallery(currentGifs, gallery);
  clearGifDetail(detailContainer);
  
  if (currentGifs.length === 0) {
    renderStatus(RequestStatus.Empty, status);
  } else {
    renderStatus(RequestStatus.Success, status, currentGifs.length);
  }
}

const showRequestError = (error: unknown) => {
  console.error(error);
  currentGifs = [];
  renderGallery(currentGifs, gallery);
  clearGifDetail(detailContainer);
  renderStatus(RequestStatus.Error, status);
}

// Función de carga inicial asíncrona
const loadTrending = async () => {
  try {
    renderStatus(RequestStatus.Loading, status);
    const trending = await getTrendingGifs();
    showResults(trending);
  } catch (error) {
    showRequestError(error);
  }
}

// Formulario asíncrono
form.addEventListener('submit', async (event: SubmitEvent) => {
  event.preventDefault();
  const query = input.value.trim();
  
  if (!query) return;
  
  try {
    renderStatus(RequestStatus.Loading, status);
    const results = await searchGifsFromApi(query);
    showResults(results);
  } catch (error) {
    showRequestError(error);
  }
});

input.addEventListener('input', () => {
  if (input.value.trim() !== '') {
    return;
  }
  
  loadTrending();
});

gallery.addEventListener('click', (event) => {
  const target = event.target;
  
  if (!(target instanceof Element)) {
    return;
  }
  
  const detailButton = target.closest<HTMLButtonElement>('[data-gif-id]');
  if (!detailButton) {
    return;
  }
  
  const gifId = detailButton.dataset.gifId;
  if (!gifId) {
    renderStatus(RequestStatus.Error, status);
    return;
  }
  
  // Buscar en la variable global dinámica en lugar del archivo local estático
  const selectedGif = currentGifs.find(gif => gif.id === gifId);
  if (!selectedGif) {
    renderStatus(RequestStatus.Error, status);
    return;
  }
  
  renderGifDetail(selectedGif, detailContainer);
});

detailContainer.addEventListener('click', (event) => {
  const target = event.target;
  
  if (!(target instanceof Element)) {
    return;
  }
  
  const closeButton = target.closest<HTMLButtonElement>('[data-action="close-detail"]');
  if (!closeButton) {
    return;
  }
  
  clearGifDetail(detailContainer);
});

// Inicialización de la vista
loadTrending();