const formRegistro = document.getElementById('formRegistro');

formRegistro.addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  const password2 = document.getElementById('regPassword2').value;

  if (password !== password2) {
    alert('Las contraseñas no coinciden.');
    return;
  }

  // Guardamos usuario en sessionStorage
  const user = { email, password };
  sessionStorage.setItem('user', JSON.stringify(user));

  alert('Registro exitoso! Ahora puedes iniciar sesión.');
  window.location.href = 'login.html';
});
