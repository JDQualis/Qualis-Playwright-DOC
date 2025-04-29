// scripts/search.js

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
  
    if (!searchInput || !searchResults) return;
  
    searchInput.addEventListener('input', function (e) {
      const searchTerm = e.target.value.toLowerCase();
      const content = document.querySelector('.content');
      const headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6');
  
      searchResults.innerHTML = '';
  
      if (searchTerm === '') {
        searchResults.classList.remove('active');
        return;
      }
  
      const matches = Array.from(headings).filter(heading =>
        heading.textContent.toLowerCase().includes(searchTerm)
      );
  
      if (matches.length > 0) {
        searchResults.classList.add('active');
        matches.forEach(match => {
          const resultItem = document.createElement('div');
          resultItem.className = 'search-result-item';
          resultItem.textContent = match.textContent;
          resultItem.addEventListener('click', () => {
            match.scrollIntoView({ behavior: 'smooth', block: 'start' });
            searchInput.value = '';
            searchResults.classList.remove('active');
          });
          searchResults.appendChild(resultItem);
        });
      } else {
        searchResults.classList.remove('active');
      }
    });
  
    // Cerrar resultados si clickeás afuera
    document.addEventListener('click', function (e) {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.remove('active');
      }
    });
  });
  