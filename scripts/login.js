

const btnLogin = document.querySelector(".btn-login");
const btnRegister = document.querySelector(".btn-register");


btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  const email = document.querySelector('input[type="email"]').value.trim();
  const senha = document.querySelector('input[type="password"]').value.trim();

  if (email && senha) {
   
    localStorage.setItem("logado", "true"); 
    window.location.href = "index.html";
  } else {
    alert("Preencha e-mail e senha.");
  }
});


btnRegister.addEventListener("click", () => {
  alert("Redirecionar para tela de cadastro futuramente.");
});
