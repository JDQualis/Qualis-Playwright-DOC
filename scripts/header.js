// scripts/header.js (dark mode)
window.initHeader = function () {
    const toggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
  
    if (localStorage.getItem('theme') === 'dark') {
      html.classList.add('dark');
      html.classList.remove('light');
      toggle.checked = true;
    } else {a
      html.classList.remove('dark');
      html.classList.add('light');
      toggle.checked = false;
    }
  
    toggle?.addEventListener('change', () => {
      if (toggle.checked) {
        html.classList.add('dark');
        html.classList.remove('light');
        localStorage.setItem('theme', 'dark');
      } else {
        html.classList.remove('dark');
        html.classList.add('light');
        localStorage.setItem('theme', 'light');
      }
    });
  };
  