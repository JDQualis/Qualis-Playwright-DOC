const fs = require('fs');
const path = require('path');

// Leer el contenido de los componentes
const headerContent = fs.readFileSync(path.join(__dirname, '../components/header.html'), 'utf8');
const sidebarContent = fs.readFileSync(path.join(__dirname, '../components/sidebar.html'), 'utf8');

// Leer el index.html
let indexContent = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');

// Reemplazar los placeholders con el contenido real
indexContent = indexContent.replace('<div id="header-container"></div>', `<div id="header-container">${headerContent}</div>`);
indexContent = indexContent.replace('<div id="sidebar-container"></div>', `<div id="sidebar-container">${sidebarContent}</div>`);

// Escribir el archivo final
fs.writeFileSync(path.join(__dirname, '../dist/index.html'), indexContent);

// Copiar otros archivos necesarios
const filesToCopy = [
  'styles.css',
  'scripts/search.js',
  'scripts/search-index.js',
  'scripts/header.js'
];

filesToCopy.forEach(file => {
  const sourcePath = path.join(__dirname, '..', file);
  const targetPath = path.join(__dirname, '../dist', file);
  
  // Crear directorio si no existe
  const targetDir = path.dirname(targetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  fs.copyFileSync(sourcePath, targetPath);
}); 