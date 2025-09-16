if (sessionStorage.getItem('loggedIn') !== 'true') {
  alert('Debes iniciar sesión primero.');
  window.location.href = 'sesion/login.html';
}

document.getElementById('logout').addEventListener('click', function() {
  sessionStorage.removeItem('loggedIn');
  alert('Sesión cerrada');
  window.location.href = 'sesion/login.html';
});
