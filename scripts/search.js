loadComponent('header-container', 'components/header.html', () => {
  initHeader();

  // Esperar un breve tiempo o usar MutationObserver si es dinámico
  setTimeout(() => {
    const searchInput = document.getElementById('search-input');
    const resultsBox = document.getElementById('search-results');

    if (!searchInput || !resultsBox) {
      console.warn('⚠️ No se encontró el input o el contenedor de resultados');
      return;
    }

    searchInput.addEventListener('input', async () => {
      const query = searchInput.value.trim().toLowerCase();

      if (query.length === 0) {
        resultsBox.innerHTML = '';
        resultsBox.classList.remove('active');
        return;
      }

      try {
        const res = await fetch('./search-index.json'); // usa ruta relativa
        const data = await res.json();

        const filtered = data.flatMap(section => {
          return section.headings
            .filter(h => h.toLowerCase().includes(query))
            .map(h => ({
              title: h,
              url: section.url
            }));
        });

        resultsBox.innerHTML = filtered.map(item =>
          `<div class="search-result-item" onclick="location.href='${item.url}'">${item.title}</div>`
        ).join('');

        resultsBox.classList.toggle('active', filtered.length > 0);
      } catch (error) {
        console.error('❌ Error al cargar el índice de búsqueda:', error);
        resultsBox.innerHTML = '<div class="search-error">Error al buscar</div>';
      }
    });
  }, 300); // ajustá el tiempo si es necesario
});
