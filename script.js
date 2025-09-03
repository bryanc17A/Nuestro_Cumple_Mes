// Datos de acceso (puedes cambiarlo si quieres)
const validUser = 'Alison_Bryan';
const validPass = '01022025';

// Elementos DOM
const loginSection = document.getElementById('loginSection');
const mainContent = document.getElementById('mainContent');
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('error-message');
const logoutBtn = document.getElementById('logoutBtn');
const imageMenuItems = document.querySelectorAll('.image-menu li');
const contentSections = document.querySelectorAll('.content-section');

function showSection(sectionId) {
  contentSections.forEach(section => {
    if (section.id === sectionId) {
      section.classList.remove('hidden');
    } else if (section.id !== 'loginSection') {
      section.classList.add('hidden');
    }
  });

  imageMenuItems.forEach(item => {
    if (item.dataset.section === sectionId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Login y manejo sesión
loginForm.addEventListener('submit', e => {
  e.preventDefault();

  const username = loginForm.username.value.trim();
  const password = loginForm.password.value.trim();

  if (username === validUser && password === validPass) {
    // Guardamos sesión en localStorage para mantener el login
    localStorage.setItem('loggedIn', 'true');

    loginSection.classList.add('hidden');
    mainContent.classList.remove('hidden');

    showSection('section1');
    errorMessage.textContent = '';
  } else {
    errorMessage.textContent = 'Usuario o contraseña incorrectos.';
  }
});

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('loggedIn');
  mainContent.classList.add('hidden');
  loginSection.classList.remove('hidden');
  loginForm.reset();
  errorMessage.textContent = '';
  // Remover estado activo en menú
  imageMenuItems.forEach(item => item.classList.remove('active'));
});

// Control de menú imágenes
imageMenuItems.forEach(item => {
  item.addEventListener('click', () => {
    showSection(item.dataset.section);
  });
});

// Comprobar sesión en carga
window.addEventListener('load', () => {
  if (localStorage.getItem('loggedIn') === 'true') {
    loginSection.classList.add('hidden');
    mainContent.classList.remove('hidden');
    showSection('section1');
  }
});
