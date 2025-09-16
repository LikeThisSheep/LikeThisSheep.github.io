const formLogin = document.getElementById('formLogin');

formLogin.addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const user = JSON.parse(sessionStorage.getItem('user'));

  if (!user) {
    alert('No hay usuarios registrados.');
    return;
  }

  if (email === user.email && password === user.password) {
    alert('¡Login exitoso!');
    sessionStorage.setItem('loggedIn', 'true');
    window.location.href = 'UserVerify.html';
  } else {
    alert('Correo o contraseña incorrectos.');
  }
});
