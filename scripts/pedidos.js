const form = document.getElementById("form-pedido");
const tabela = document.getElementById("tabela-pedidos").querySelector("tbody");

let contador = 1;

function atualizarTotal() {
  const qtd = parseFloat(document.getElementById("quantidade").value) || 0;
  const valor = parseFloat(document.getElementById("valor").value) || 0;
  document.getElementById("total").value = (qtd * valor).toFixed(2);
}

document.getElementById("quantidade").addEventListener("input", atualizarTotal);
document.getElementById("valor").addEventListener("input", atualizarTotal);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const cliente = document.getElementById("cliente").value.trim();
  const produto = document.getElementById("produto").value.trim();
  const qtd = parseInt(document.getElementById("quantidade").value);
  const valor = parseFloat(document.getElementById("valor").value);
  const total = (qtd * valor).toFixed(2);

  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${contador++}</td>
    <td>${cliente}</td>
    <td>${produto}</td>
    <td>${qtd}</td>
    <td>R$ ${total}</td>
    <td>Pendente</td>
    <td>
      <button class="btn-editar">Editar</button>
      <button class="btn-excluir">Excluir</button>
    </td>
  `;
  tabela.appendChild(tr);

  form.reset();
  document.getElementById("total").value = "";
});
