export class SearchComponent {
  constructor() {
    this.searchInput = document.getElementById('search-input');
    this.searchBox = this.searchInput.closest('.search-box');
    this.searchResults = document.getElementById('search-results');
    this.currentFocus = -1;

    // Datos de búsqueda
    this.searchData = [
      { title: 'Inicio', url: '#home', description: 'Página principal' },
      { title: 'Instalación', url: '#instalacion', description: 'Guía de instalación' },
      { title: 'Estructura', url: '#estructura', description: 'Estructura del proyecto' },
      { title: 'Pages y Locators', url: '#pages-locators', description: 'Implementación de Page Objects' },
      { title: 'Cucumber', url: '#cucumber', description: 'Tests con Cucumber' },
      { title: 'Ejecución', url: '#ejecucion', description: 'Ejecutar pruebas' },
      { title: 'Reportes', url: '#reportes', description: 'Ver reportes' },
      { title: 'Buenas Prácticas', url: '#buenas-practicas', description: 'Guía de buenas prácticas' }
    ];

    if (this.searchInput && this.searchResults) {
      this.setupEventListeners();
    } else {
      console.error('No se encontraron los elementos necesarios para la búsqueda');
    }
  }

  setupEventListeners() {
    let debounceTimeout;
    
    // Manejar la entrada de búsqueda con debounce
    this.searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        this.handleSearch(e.target.value);
      }, 200);
    });

    // Manejar la navegación con teclado
    this.searchInput.addEventListener('keydown', (e) => {
      const results = this.searchResults.getElementsByClassName('search-result-item');
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.currentFocus = Math.min(this.currentFocus + 1, results.length - 1);
        this.addActive(results);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.currentFocus = Math.max(this.currentFocus - 1, -1);
        this.addActive(results);
      } else if (e.key === 'Enter' && this.currentFocus > -1) {
        e.preventDefault();
        if (results[this.currentFocus]) {
          results[this.currentFocus].click();
        }
      } else if (e.key === 'Escape') {
        this.closeResults();
      }
    });

    // Cerrar resultados al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!this.searchBox.contains(e.target)) {
        this.closeResults();
      }
    });
  }

  handleSearch(query) {
    query = query.toLowerCase().trim();
    
    if (query.length < 2) {
      this.closeResults();
      return;
    }

    const results = this.searchData.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.description.toLowerCase().includes(query)
    );

    this.displayResults(results, query);
  }

  displayResults(results, query) {
    if (results.length === 0) {
      this.searchResults.innerHTML = '<div class="no-results">No se encontraron resultados</div>';
    } else {
      this.searchResults.innerHTML = results.map(result => `
        <a href="${result.url}" class="search-result-item">
          <div class="result-title">${this.highlightMatch(result.title, query)}</div>
          <div class="result-description">${this.highlightMatch(result.description, query)}</div>
        </a>
      `).join('');
    }

    this.searchResults.style.display = 'block';
  }

  highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  addActive(results) {
    if (!results) return;

    Array.from(results).forEach(result => result.classList.remove('active'));
    
    if (this.currentFocus >= 0) {
      results[this.currentFocus].classList.add('active');
    }
  }

  closeResults() {
    this.searchResults.style.display = 'none';
    this.currentFocus = -1;
  }
}

// Inicializar el componente de búsqueda cuando el DOM esté listo
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  new SearchComponent();
} else {
  document.addEventListener('DOMContentLoaded', () => {
    new SearchComponent();
  });
} 