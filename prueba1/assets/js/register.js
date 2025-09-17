const formRegistro = document.getElementById('formRegistro');

formRegistro.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value.trim();
  const password2 = document.getElementById('registerPassword2').value.trim();

  if (!email) {
    alert("El correo es requerido.");
    return;
  }
  if (email.length > 100) {
    alert("El correo no puede superar los 100 caracteres.");
    return;
  }
  const emailRegex = /^[\w.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
  if (!emailRegex.test(email)) {
    alert("Solo se permiten correos con dominio @duoc.cl, @profesor.duoc.cl o @gmail.com");
    return;
  }


  if (!password) {
    alert("La contraseña es requerida.");
    return;
  }
  if (password.length < 4 || password.length > 10) {
    alert("La contraseña debe tener entre 4 y 10 caracteres.");
    return;
  }


  if (password !== password2) {
    alert("Las contraseñas no coinciden.");
    return;
  }

 
  const user = { email, password };
  sessionStorage.setItem('user', JSON.stringify(user));

  alert("Registro exitoso Ahora puedes iniciar sesión.");
  window.location.href = "login.html";
});
