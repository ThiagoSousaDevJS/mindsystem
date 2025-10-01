// Base de dados simulada por vendedor e mês
const baseDados = {
  joao: {
    "2025-09": { vendas: [12, 19, 14, 20, 25, 18], categorias: [32000, 12000, 8000, 15000], ticket: [80, 180, 420], produtos: [220, 180, 140, 120, 100] },
    "2025-10": { vendas: [10, 15, 12, 18, 20, 22], categorias: [25000, 15000, 11000, 9000], ticket: [75, 170, 400], produtos: [200, 160, 150, 130, 90] }
  },
  maria: {
    "2025-09": { vendas: [8, 12, 11, 15, 18, 14], categorias: [28000, 15000, 9000, 11000], ticket: [70, 160, 380], produtos: [210, 170, 150, 120, 110] },
    "2025-10": { vendas: [9, 10, 12, 14, 16, 18], categorias: [30000, 12000, 8000, 10000], ticket: [65, 155, 370], produtos: [190, 150, 140, 110, 100] }
  },
  carlos: {
    "2025-09": { vendas: [6, 9, 8, 12, 11, 10], categorias: [21000, 9000, 7000, 9000], ticket: [60, 150, 350], produtos: [160, 150, 130, 110, 100] },
    "2025-10": { vendas: [7, 8, 9, 11, 13, 12], categorias: [22000, 10000, 8000, 9500], ticket: [62, 152, 360], produtos: [170, 160, 140, 120, 105] }
  }
};

// Paleta de cores reutilizável
const PALETA_CORES = [
  "#4f7cff",
  "#37d67a",
  "#ff5c5c",
  "#ff9f43",
  "#9b59b6",
  "#f1c40f",
  "#1abc9c",
  "#e67e22"
];

// Instâncias dos gráficos
let graficos = {};

function criarGrafico(id, tipo, labels, dados, cores, border = true) {
  const el = document.getElementById(id);
  if (!el) return null;
  const ctx = el.getContext("2d");

  const bgCores = Array.isArray(cores) ? cores : Array(dados.length).fill(cores);

  return new Chart(ctx, {
    type: tipo,
    data: {
      labels,
      datasets: [{
        label: id,
        data: dados,
        backgroundColor: Array.isArray(bgCores) ? bgCores.map(c => c + "80") : bgCores,
        borderColor: border ? bgCores : undefined,
        borderWidth: tipo === "line" ? 2 : 1,
        pointRadius: tipo === "line" ? 4 : 0,
        pointHoverRadius: tipo === "line" ? 6 : 0,
        fill: tipo === "line" ? true : true,
        tension: tipo === "line" ? 0.4 : 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: !(id === "chartLinha" || id === "chartHbar"),
          labels: {
            generateLabels: (chart) => {
              const dataset = chart.data.datasets[0];
              return chart.data.labels.map((label, i) => ({
                text: label,
                fillStyle: dataset.backgroundColor[i],
                strokeStyle: dataset.borderColor ? dataset.borderColor[i] : dataset.backgroundColor[i],
                lineWidth: 1,
                hidden: false,
                index: i
              }));
            }
          }
        }
      },
      scales: {
        x: { grid: { color: "rgba(0,0,0,0.05)" } },
        y: { grid: { color: "rgba(0,0,0,0.05)" } }
      },
      indexAxis: id === "chartHbar" ? "y" : "x"
    }
  });
}

function carregarGraficos(mes, vendedor) {
  let dados;

  if (vendedor === "todos") {
    const vendedores = Object.keys(baseDados);
    dados = { vendas: [], categorias: [], ticket: [], produtos: [] };
    vendedores.forEach(v => {
      const info = baseDados[v][mes];
      if (info) {
        info.vendas.forEach((val, i) => dados.vendas[i] = (dados.vendas[i] || 0) + val);
        info.categorias.forEach((val, i) => dados.categorias[i] = (dados.categorias[i] || 0) + val);
        info.ticket.forEach((val, i) => dados.ticket[i] = (dados.ticket[i] || 0) + (val / vendedores.length));
        info.produtos.forEach((val, i) => dados.produtos[i] = (dados.produtos[i] || 0) + val);
      }
    });
  } else {
    dados = baseDados[vendedor] && baseDados[vendedor][mes];
  }

  if (!dados) {
    alert("Não há dados para este mês/vendedor.");
    return;
  }

  const dias = ["01", "05", "10", "15", "20", "25"];
  const categoriasLbl = ["Eletrônicos", "Acessórios", "Casa", "Games"];
  const ticketLbl = ["Baixo", "Médio", "Alto"];
  const produtosLbl = ["Carregador 20W", "Fone BT", "Mouse Gamer", "Webcam HD", "SSD 480GB"];

  Object.values(graficos).forEach(g => g && g.destroy());

  graficos.chartLinha = criarGrafico("chartLinha", "line", dias, dados.vendas, "#4f7cff");
  graficos.chartBarras = criarGrafico("chartBarras", "bar", categoriasLbl, dados.categorias, PALETA_CORES.slice(0, categoriasLbl.length));
  graficos.chartRosca = criarGrafico("chartRosca", "doughnut", ticketLbl, dados.ticket, PALETA_CORES.slice(0, ticketLbl.length), false);
  graficos.chartHbar = criarGrafico("chartHbar", "bar", produtosLbl, dados.produtos, PALETA_CORES.slice(0, produtosLbl.length));
}

window.initDashboard = function initDashboard() {
  const $mes = document.getElementById("mes");
  const $vend = document.getElementById("vendedor");
  const $btn = document.getElementById("aplicar-filtros");

  // Inicial
  const mesIni = $mes?.value || "2025-09";
  const vendIni = $vend?.value || "todos";
  carregarGraficos(mesIni, vendIni);

  // Eventos
  if ($btn) {
    $btn.onclick = () => {
      carregarGraficos($mes.value, $vend.value);
    };
  }
};
