// Menu no celular, destaque do link da seção atual e animação ao rolar
(function () {
  document.documentElement.classList.add("js");

  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();

  var botao = document.querySelector(".menu-btn");
  var menu = document.getElementById("menu");
  function fechar() {
    menu.classList.remove("aberto");
    botao.setAttribute("aria-expanded", "false");
    botao.setAttribute("aria-label", "Abrir menu");
  }
  botao.addEventListener("click", function () {
    var aberto = menu.classList.toggle("aberto");
    botao.setAttribute("aria-expanded", aberto ? "true" : "false");
    botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) fechar(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") fechar(); });

  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("visivel"); });
    return;
  }

  var aparecer = new IntersectionObserver(function (itens) {
    itens.forEach(function (i) {
      if (i.isIntersecting) { i.target.classList.add("visivel"); aparecer.unobserve(i.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { aparecer.observe(el); });

  var links = {};
  document.querySelectorAll(".menu a[href^='#']").forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
  var secoes = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var atual = new IntersectionObserver(function (itens) {
    itens.forEach(function (i) {
      if (i.isIntersecting && links[i.target.id]) {
        Object.keys(links).forEach(function (k) { links[k].classList.remove("ativo"); });
        links[i.target.id].classList.add("ativo");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  secoes.forEach(function (s) { atual.observe(s); });
})();
