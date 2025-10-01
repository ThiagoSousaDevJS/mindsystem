// Dados do usuário
const usuario = {
  id: 1024,
  nome: "João Victor"
};


document.getElementById("user-info").innerHTML = `${usuario.nome}<br>[ID: ${usuario.id}]`;


const perfil = document.getElementById("perfil");
const perfilMenu = document.getElementById("perfil-menu");

perfil.addEventListener("click", function (event) {
  event.stopPropagation();
  perfil.classList.toggle("open");

  if (perfil.classList.contains("open")) {
    perfilMenu.style.display = "block";
  } else {
    perfilMenu.style.display = "none";
  }
});

document.addEventListener("click", function () {
  perfil.classList.remove("open");
  perfilMenu.style.display = "none";
});



document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.has-submenu > a').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const li = trigger.parentElement;
      const isOpen = li.classList.toggle('open');
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');


      document.querySelectorAll('.has-submenu').forEach(other => {
        if (other !== li) {
          other.classList.remove('open');
          const a = other.querySelector('a');
          if (a) a.setAttribute('aria-expanded', 'false');
        }
      });
    });
  });
});

if (localStorage.getItem("logado") !== "true") {
  window.location.href = "login.html";
}

function logout() {
  localStorage.removeItem("logado");
  window.location.href = "login.html";
}
