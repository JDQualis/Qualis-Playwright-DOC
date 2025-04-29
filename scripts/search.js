loadComponent('header-container', 'components/header.html', () => {
    initHeader();
  
    // 💡 MOVER ESTO DENTRO
    const searchInput = document.getElementById('search-input');
    const resultsBox = document.getElementById('search-results');
  
    searchInput?.addEventListener('input', async () => {
      const query = searchInput.value.trim().toLowerCase();
  
      if (query.length === 0) {
        resultsBox.innerHTML = '';
        resultsBox.classList.remove('active');
        return;
      }
  
      const res = await fetch('search-index.json');
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
    });
  });
  