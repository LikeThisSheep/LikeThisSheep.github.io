
let mensaje = "EL TITAN DE LA PROGRAMACIÓN";
document.writeln("<h3>" + mensaje + "</h3>");

const timestamp = Date.now();
let mensajee = "Hoy es timestamp: " + timestamp;
document.writeln("<p>" + mensajee + "</p>");

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("formularionacimiento");
    
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    const dobInput = document.getElementById('dob');
    const dob = new Date(dobInput.value);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    const requiredAge = 18;

    if (age >= requiredAge) {
      alert("Edad verificada, tu tienes " + age + " años.");
    } else {
      dobInput.classList.add('is-invalid');
      const feedback = dobInput.nextElementSibling;
      if (feedback) {
        feedback.textContent = "Tienes que tener al menos " + requiredAge + " años.";
      }
    }
  });
});
