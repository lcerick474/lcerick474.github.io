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
    vx: (Math.random() - 0.5) * 0.5, // era 1.5, muito mais lento
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

const links = document.querySelectorAll(".nav-links a");

links.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const destino = document.querySelector(this.getAttribute("href"));
    
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.3s ease";

    setTimeout(() => {
      destino.scrollIntoView();
      document.body.style.opacity = "1";
    }, 300);
  });
});

const menuBtn = document.querySelector(".menu-btn");
const sidebar = document.querySelector(".sidebar");

if (menuBtn && sidebar) {
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("aberta");
  });
}