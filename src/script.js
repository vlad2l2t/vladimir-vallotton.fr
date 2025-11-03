//Effet "torche" autour de la souris
const torch = document.querySelector('.torch');

document.addEventListener('mousemove', e => {
  torch.style.left = e.clientX + 'px';
  torch.style.top = e.clientY + 'px';
});

//Effet particules "cendres"
  // Configuration du canvas
  const canvas = document.getElementById('particules');
  const ctx = canvas.getContext('2d');

  // Tableau pour stocker les particules
  let particlesArray = [];
  // Nombre de particules (configurable)
  const PARTICLE_COUNT = 100;

  // Redimensionner le canvas à la taille de la fenêtre
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Création d’une particule
  class Particle {
    constructor() {
      this.reset();
    }
    //Propriétés initiales
    reset() {
      this.x = Math.random() * canvas.width; // position horizontale aléatoire
      this.y = canvas.height + Math.random() * canvas.height;
  // Distribute initial Y across the canvas so many particles are immediately visible
  this.y = Math.random() * canvas.height;
  this.size = Math.random() * 5 + 2; // taille de base (plus grande)
  this.speedY = Math.random() * 1.5 + 0.5; // vitesse verticale (légèrement plus rapide)
      this.speedX = (Math.random() - 0.5) * 0.2; // léger mouvement horizontal
  this.opacity = Math.random() * 0.4 + 0.2;  // opacité plus visible (0.2 - 0.6)
      // Palette: black, white, gray, light blue, dark blue
      const palettes = [
        [0, 0, 0],        // black
        [255, 255, 255],  // white
        [128, 128, 128],  // gray
        [173, 216, 230],  // light blue
        [10, 40, 100]     // dark blue
      ];
      const c = palettes[Math.floor(Math.random() * palettes.length)];
      this.color = `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${this.opacity})`;
      this.shapeType = Math.floor(Math.random() * 2); // 0=cercle, 1=carré
    }

    // Mettre à jour la position
    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      // Réinitialiser la particule si elle sort de l'écran
      if (this.y < 0 || this.x < 0 || this.x > canvas.width) {
        this.reset();
      }
    }

    // Dessiner la particule
    draw() {
      ctx.fillStyle = this.color;
      switch(this.shapeType) {
        case 0: // cercle
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 1: // rectangle
          ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size*1.5, this.size*1.5);
          break;
      }
    }
  }

  // Générer les particules
  function initParticles(count) {
    particlesArray = [];
    for (let i = 0; i < count; i++) {
      particlesArray.push(new Particle());
    }
  }
  initParticles(PARTICLE_COUNT);

  // Animation des particules
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();

//Effet de scroll particules (ne restent pas immobiles)
  window.addEventListener("scroll", () => {
  let scrollY = window.scrollY;
  document.querySelectorAll(".layer").forEach((el, index) => {
    let speed = (index + 1) * 0.2;
    el.style.transform = `translateY(${scrollY * speed}px)`;
  });
});
