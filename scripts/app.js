document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("conteudo");

  async function ensureStylesheet(href) {
    if (document.querySelector(`link[data-dynamic="${href}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.dataset.dynamic = href;
    document.head.appendChild(link);
  }

  function ensureScript(src, globalCheck) {
    return new Promise((resolve, reject) => {
      if (globalCheck && window[globalCheck]) return resolve();
      if (document.querySelector(`script[data-dynamic="${src}"]`)) return resolve();
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.dataset.dynamic = src;
      s.onload = resolve;
      s.onerror = reject;
      document.body.appendChild(s);
    });
  }

  async function loadPage(page) {
    const res = await fetch(page);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");

    const pageStyles = [...doc.querySelectorAll('link[rel="stylesheet"]')].map(l => l.getAttribute("href"));
    for (const href of pageStyles) {
      if (href) await ensureStylesheet(href);
    }

    container.innerHTML = doc.body.innerHTML;

    if (page.includes("dashboard")) {
      await ensureScript("https://cdn.jsdelivr.net/npm/chart.js", "Chart");
      await ensureScript("/scripts/dashboard.js");
      if (typeof window.initDashboard === "function") {
        window.initDashboard();
      }
    }
  }

  document.querySelectorAll("[data-page]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.getAttribute("data-page");
      loadPage(page);
    });
  });
});
