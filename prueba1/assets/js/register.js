const regionesYcomunas = {
  "Arica y Parinacota": ["Arica", "Camarones", "Putre"],
  "Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte"],
  "Antofagasta": ["Antofagasta", "Calama", "Tocopilla"],
  "Atacama": ["Copiapó", "Caldera", "Vallenar"],
  "Coquimbo": ["La Serena", "Coquimbo", "Ovalle"],
  "Valparaíso": ["Valparaíso", "Viña del Mar", "San Antonio"],
  "Metropolitana de Santiago": ["Santiago", "Puente Alto", "Maipú"],
  "O’Higgins": ["Rancagua", "San Fernando", "Santa Cruz"],
  "Maule": ["Talca", "Curicó", "Linares"],
  "Ñuble": ["Chillán", "San Carlos", "Coihueco"],
  "Biobío": ["Concepción", "Los Ángeles", "Coronel"],
  "La Araucanía": ["Temuco", "Villarrica", "Angol"],
  "Los Ríos": ["Valdivia", "La Unión", "Río Bueno"],
  "Los Lagos": ["Puerto Montt", "Osorno", "Castro"],
  "Aysén": ["Coyhaique", "Aysén", "Chile Chico"],
  "Magallanes": ["Punta Arenas", "Puerto Natales", "Porvenir"]
};

document.addEventListener("DOMContentLoaded", () => {
  const regionSelect = document.getElementById("registerRegion");
  const comunaSelect = document.getElementById("registerComuna");

 
  Object.keys(regionesYcomunas).forEach(region => {
    const option = document.createElement("option");
    option.value = region;
    option.textContent = region;
    regionSelect.appendChild(option);
  });

  
  regionSelect.addEventListener("change", () => {
    const region = regionSelect.value;
    comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>';

    if (regionesYcomunas[region]) {
      regionesYcomunas[region].forEach(comuna => {
        const option = document.createElement("option");
        option.value = comuna;
        option.textContent = comuna;
        comunaSelect.appendChild(option);
      });
    }
  });
});

const formRegistro = document.getElementById('formRegistro');

formRegistro.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value.trim();
  const password2 = document.getElementById('registerPassword2').value.trim();
  const region = document.getElementById('registerRegion').value;
  const comuna = document.getElementById('registerComuna').value;

 
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

  
  if (!region) {
    alert("Debe seleccionar una región.");
    return;
  }
  if (!comuna) {
    alert("Debe seleccionar una comuna.");
    return;
  }

  
  const user = { email, password, region, comuna };
  sessionStorage.setItem('user', JSON.stringify(user));

  alert("Registro exitoso ,Ahora puedes iniciar sesión.");
  window.location.href = "login.html";
});
