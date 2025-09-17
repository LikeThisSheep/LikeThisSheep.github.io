// Los comentarios los pongo para que se me haga más facil explicarlo y no olvidarme pq luego me da flojera aprendermelo otra vez xdXDDxDXddxDDXDxdD

(() => {
  'use strict';

  // Estos son los dominios permitidos goku
  const allowedDomains = [
    '@duoc.cl',
    '@profesor.duoc.cl',
    '@gmail.com'
  ];

  // Estas son las referencias
  const form = document.getElementById('contactForm');
  const fullname = document.getElementById('fullname');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  const charCount = document.getElementById('charCount');
  const successAlert = document.getElementById('successAlert');

  // Contador caracteres comentario
  const updateCharCount = () => {
    charCount.textContent = message.value.length;
  };
  message.addEventListener('input', updateCharCount);
  updateCharCount();

  // Validación de email con dominio
  function isEmailAllowed(value) {
    if (!value) return true; // Correo no es requerido según requisitos
    const trimmed = value.trim();
    // Validación de forma de email 
    const basicFormatOk = /\S+@\S+\.\S+/.test(trimmed);
    if (!basicFormatOk) return false;
    const lower = trimmed.toLowerCase();
    return allowedDomains.some(d => lower.endsWith(d));
  }

  // Reglas de los campos
  function validateFields() {
    let ok = true;

    // Nombre: requerido + max 100
    const nameVal = fullname.value.trim();
    if (nameVal.length === 0 || nameVal.length > 100) {
      fullname.classList.add('is-invalid');
      fullname.classList.remove('is-valid');
      ok = false;
    } else {
      fullname.classList.remove('is-invalid');
      fullname.classList.add('is-valid');
    }

    // Correo: opcional, si existe max 100 + formato + dominios permitidos
    const emailVal = email.value.trim();
    if (emailVal.length > 0) {
      if (emailVal.length > 100 || !isEmailAllowed(emailVal)) {
        email.classList.add('is-invalid');
        email.classList.remove('is-valid');
        ok = false;
      } else {
        email.classList.remove('is-invalid');
        email.classList.add('is-valid');
      }
    } else {
      //(no requerido)
      email.classList.remove('is-invalid');
      email.classList.remove('is-valid');
    }

    // requerido + max 500
    const msgVal = message.value.trim();
    if (msgVal.length === 0 || msgVal.length > 500) {
      message.classList.add('is-invalid');
      message.classList.remove('is-valid');
      ok = false;
    } else {
      message.classList.remove('is-invalid');
      message.classList.add('is-valid');
    }

    return ok;
  }

  // Validación on input para feedback inmediato
  [fullname, email, message].forEach(el => {
    el.addEventListener('input', () => {
      validateFields();
    });
  });

  // Envío
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const valid = validateFields();


    form.classList.add('was-validated');

    if (!valid) {
      return;
    }


    successAlert.classList.remove('d-none');
    form.reset();
    [fullname, email, message].forEach(el => {
      el.classList.remove('is-valid', 'is-invalid');
    });
    updateCharCount();
  });
})();
