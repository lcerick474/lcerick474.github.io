const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const particulas = [];
const quantidade = 40;

for (let i = 0; i < quantidade; i++) {
  particulas.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    raio: Math.random() * 3 + 1,
  });
}

function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particulas.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.raio, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(100, 150, 255, 0.3)";
    ctx.fill();
  });

  particulas.forEach((a, i) => {
    particulas.slice(i + 1).forEach((b) => {
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < 150) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(100, 150, 255, ${(1 - dist / 150) * 0.2})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    });
  });

  requestAnimationFrame(animar);
}

animar();

const navbar = document.querySelector(".navbar");

function mostrarSecao(id) {
  const secaoAtual = document.querySelector(".pagina.ativa");
  const proximaSecao = document.getElementById(id);
  const isMobile = window.innerWidth <= 768;

  if (secaoAtual === proximaSecao) return;

  if (secaoAtual) {
    secaoAtual.classList.add("saindo");
    setTimeout(() => secaoAtual.classList.remove("ativa", "saindo"), 400);
  }

  setTimeout(
    () => {
      proximaSecao.classList.add("ativa");

      // stagger nos elementos
      const elementos = proximaSecao.querySelectorAll(
        "h2, .sobre-conteudo, .habilidades-categorias, .projetos-grid, .contato-links, #form-contato, .container-sobre",
      );

      elementos.forEach((el) => el.classList.remove("animar", "visivel"));

      elementos.forEach((el, i) => {
        el.classList.add("animar");
        setTimeout(() => el.classList.add("visivel"), i * 150);
      });
    },
    isMobile ? 0 : 200,
  ); // no mobile não espera, anima na hora

  if (id === "hero") {
    navbar.classList.remove("visivel");
  } else {
    navbar.classList.add("visivel");
  }

  document
    .querySelectorAll(".navbar a")
    .forEach((a) => a.classList.remove("ativo"));
  const linkAtivo = document.querySelector(`.navbar a[data-secao="${id}"]`);
  if (linkAtivo) linkAtivo.classList.add("ativo");
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[onclick]").forEach((el) => {
    const secao = el.getAttribute("onclick").match(/'(.+)'/)[1];
    el.setAttribute("data-secao", secao); // salva a seção no elemento
    el.removeAttribute("onclick");
    el.addEventListener("click", (e) => {
      e.preventDefault();
      mostrarSecao(secao);
    });
  });
});

// Efeito blur contato
document.querySelectorAll(".contato-links a").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    document.querySelector("#contato").classList.add("blur-ativo");
    document.body.classList.add("blur-ativo-contato");
    el.classList.add("em-foco");
  });

  el.addEventListener("mouseleave", () => {
    document.querySelector("#contato").classList.remove("blur-ativo");
    document.body.classList.remove("blur-ativo-contato");
    el.classList.remove("em-foco");
  });
});

// EmailJS
(function () {
  emailjs.init("4qjveRf92FVc4r2Si");
})();

document
  .getElementById("form-contato")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const btn = document.getElementById("btn-enviar");
    const status = document.getElementById("status");

    btn.textContent = "Enviando...";
    btn.disabled = true;

    const params = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      mensagem: document.getElementById("mensagem").value,
    };

    emailjs
      .send("service_jtb3z7p", "template_miq5o52", params)
      .then(() => {
        status.textContent = "✅ Mensagem enviada com sucesso!";
        status.style.color = "#a855f7";
        document.getElementById("form-contato").reset();
      })
      .catch(() => {
        status.textContent = "❌ Erro ao enviar. Tenta de novo!";
        status.style.color = "#f87171";
      })
      .finally(() => {
        btn.textContent = "Enviar mensagem";
        btn.disabled = false;
      });
  });
