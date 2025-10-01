const form = document.getElementById("form-cliente");
const tabela = document.getElementById("tabela-clientes").querySelector("tbody");
const btnCadastrar = document.getElementById("btnCadastrar");

btnCadastrar.addEventListener("click", (e) => {
  e.preventDefault(); //

  const nome = document.getElementById("nome").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const email = document.getElementById("email").value.trim();
  const endereco = document.getElementById("endereco").value.trim();

  if (!nome || !cpf || !telefone) {
    alert("Preencha nome, CPF e telefone.");
    return;
  }

  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${nome}</td>
    <td>${cpf}</td>
    <td>${telefone}</td>
    <td>${email}</td>
    <td>${endereco}</td>
  `;
  tabela.appendChild(tr);

  form.reset();
});
